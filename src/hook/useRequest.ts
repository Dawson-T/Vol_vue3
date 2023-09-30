import http from '@/utils/request'
import { type AxiosInstance, type AxiosRequestConfig } from 'axios'
type Callback = (requestFn: AxiosInstance) => void
type response = {
  status: number
  msg: string
  data: any
}
export async function useRequest() {
  const errorMessage = ref<string | null>(null)
  const data = ref<any>(null)
  const useGetData = async (callback: Callback) => {
    try {
      const response = await callback
      data.value = response.data
    } catch (error: any) {
      errorMessage.value = '网络请求错误: ' + error.message
    } finally {
    }
  }
}
