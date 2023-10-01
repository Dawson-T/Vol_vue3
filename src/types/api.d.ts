/** 所有 api 接口的响应数据都应该准守该格式 */
interface ApiResponseData<T> {
  status: number
  data: T
  msg: string
}

declare module 'axios' {
  interface AxiosRequestConfig {
    needtoken?: boolean;
  }
}
