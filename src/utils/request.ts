import { createAlova } from 'alova'
import GlobalFetch from 'alova/GlobalFetch'
import VueHook from 'alova/vue'
import { Session } from './storage'

const tokenHeader = 'Authorization'

const alovaInstance = createAlova({
  baseURL: 'https://jsonplaceholder.typicode.com',
  statesHook: VueHook,
  requestAdapter: GlobalFetch(),
  beforeRequest(method) { // 请求前的钩子
    // 假设我们需要添加token到请求头
    method.config.headers[tokenHeader] = Session.get('token');
  }
})