import { Method, createAlova, useRequest } from 'alova'
import GlobalFetch, { FetchRequestInit } from 'alova/GlobalFetch'
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
const error_code = [214, 215, 5, -1, 4]

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
    method.data = createSignature(method.data, method.config.name === 'refreshApi') // 添加签名信息
    method.config.headers[tokenHeader] = Local.get('tokenHeader') + token;
    method.config.headers['Content-Type'] = 'application/problem+json; charset=utf-8';
  },
  responded: {
    onSuccess: async (response, method) => {
      const json = await response.json();
      // 状态拦截
      if (response.status !== 200 || json.code !== 0) {
        await handleError(response, method, json)
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

const handleError = async (err: Response, method: Method<any, any, any, any, FetchRequestInit, Response, Headers>, json: any) => {
  if (json.code === -1) {
    console.error('系统错误');
    return
  } else if (json.code === 4) {
    console.error(t('message.common.tokenExpired'));
    return
  } else if (error_code.includes(json.code)) {
    ElMessage.error(json.msg)
    return
  }
  if (err.status === 401 && !err.url.includes('RefreshToken')) {
    const refreshToken = Local.get('refreshToken');
    if (refreshToken) {
      try {
        const { data, onSuccess, onError } = useRequest(() => getRefreshToken(), { force: true });
        onSuccess(() => {
          Local.set('token', data.value.token);
          Local.set('refreshToken', data.value.refreshToken);
          method.config.headers[tokenHeader] = Local.get('tokenHeader') + data.value.token;
          method.setName('refreshApi')
          return method.send();
        })
        onError((event) => {
          console.log('请求失败，错误信息为:', event.error);
          removeLogin()
          throw new Error(event.error);
        })
        return new Error(err.statusText);
      } catch (e) {
        removeLogin()
      }
    } else {
      removeLogin()
    }
  } else {
    return checkStatus(err.status)
  }
  console.error('error', err.status)
  // return new Error(err.statusText);
}


export default alovaInstance