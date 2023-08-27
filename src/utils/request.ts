import axios from 'axios'
import type { InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios'
import { showFailToast } from 'vant'
import { getLocalData, removeLocalData, isLogin } from '@/utils/util'

interface CustomRequestConfig extends InternalAxiosRequestConfig {
  needToken?: boolean
}
//创建axios实例
let http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
})
//请求拦截器
http.interceptors.request.use((config: CustomRequestConfig) => {
  if (config.needToken) {
    if (isLogin()) {
      const userinfo = getLocalData('userinfo')
      if (userinfo) {
        config.headers['Authorization'] = `Bearer ${userinfo.sk}`
      }
    } else {
      removeLocalData('userinfo')
      removeLocalData('token_expires_at')
      showFailToast('当前未登录或身份认证已过期，请重新登录')
    }
  }
  // 设置请求的headers信息
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return config
})
//响应拦截器
http.interceptors.response.use((response) => {
  return response.data
})
export default http
