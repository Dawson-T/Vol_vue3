// 接口类型定义 --有空再做...
import { AxiosResponse } from 'axios'

interface OauthUrlResponse {
  // 定义响应的类型
  // 这里假设响应数据为任意类型
  data: any
  status: number
  statusText: string
  headers: any
  config: any
}

interface OauthUrlRequestData {
  redirect_uri: string
}

interface OauthUrl {
  (): Promise<AxiosResponse<OauthUrlResponse>>
}
