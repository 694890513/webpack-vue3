import { createAlova, useRequest } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'
import { Local } from './storage'
import { i18n } from '@/i18n/index';
import { IS_DEV } from './utils';
import createSignature from './signature';
import { ElMessage } from 'element-plus';
import { checkStatus } from './checkStatus';
import { getRefreshToken } from '@/api/common';

const tokenHeader = 'Authorization'
const { t } = i18n.global
const error_code = [214, 215, 5]

const alovaInstance = createAlova({
  baseURL: IS_DEV ? process.env.VITE_API_URL : process.env.VITE_API_URL,
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  timeout: 60000,
  beforeRequest(method) { // 请求前的钩子
    // 假设我们需要添加token到请求头
    if (method.config.name === 'getConfig') {
      method.baseURL = process.env.VITE_BASE_URL as string
      // method.data = createSignature(method.data, process.env.VITE_BASE_MERCHANT) // 添加签名信息
    }
    let token = method.config.name === 'refreshToken' ? Local.get('refreshToken') : Local.get('token');
    method.data = createSignature(method.data) // 添加签名信息
    method.config.headers[tokenHeader] = Local.get('tokenHeader') + token;
    method.config.headers['Content-Type'] = 'application/problem+json; charset=utf-8';
  },
  responded: {
    onSuccess: async (response, method) => {
      const json = await response.json();
      // 状态拦截
      if (response.status !== 200) {
        handleError(response, method)
      }
      console.log(json.code)
      switch (json.code) {
        case -1:
          return Promise.reject({ msg: 'System Error' })
        case 4:
          return Promise.reject({ msg: t('message.common.tokenExpired') })
      }
      if (error_code.includes(json.code)) {
        ElMessage.error(json.data.msg)
        return
      }
      return json.data;
    },
    // 请求失败的拦截器
    // 请求错误时将会进入该拦截器。
    // 第二个参数为当前请求的method实例，你可以用它同步请求前后的配置信息
    onError: async (err, method) => {
      console.log('onError', err)
    },

  }
})

const removeLogin = () => {
  console.log('removeLogin')
  return
  // Local.remove('token');
  // Local.remove('refreshToken');
  // Local.remove('tokenHeader');
}

const handleError = async (err: Response, method: any) => {
  if (err.status === 401 && !err.url.includes('RefreshToken')) {
    const refreshToken = Local.get('refreshToken');
    if (refreshToken) {
      try {
        const { data, onSuccess, onError } = useRequest(() => getRefreshToken(), { force: true });
        console.log('data', data)
        onSuccess(() => {
          Local.set('token', data.value.token);
          Local.set('refreshToken', data.value.refreshToken);
          method.config.headers[tokenHeader] = Local.get('tokenHeader') + data.value.token;
          return method.send();
        })
        onError((event) => {
          console.log('请求失败，错误信息为:', event.error);
          removeLogin()
          throw new Error(event.error);
        })
        return new Error(err.statusText);
      } catch (e) {
        // If the refresh token request fails, log the user out
        removeLogin()
      }
    } else {
      // If there is no refresh token, log the user out
      removeLogin()
    }
  } else {
    checkStatus(err.status)
  }
  return new Error(err.statusText);
}


export default alovaInstance