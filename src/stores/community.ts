// 社区模块仓库
import { Names } from './store-name'
import { defineStore } from 'pinia'
import { getPersonData, deleteCard } from '@/api/ServerAPI'
import { requestTime } from '@/utils/util'
const communityStore = defineStore(Names.COMMUNITY, {
  state: () => ({
    // 个人帖子MyPost
    myPost: [],
  }),
  getters: {},
  actions: {
    // 获取个人发布的帖子
    async getMyPost() {
      const time = requestTime(Date())
      const { data: res } = await getPersonData(time, 10)
      this.myPost = res
    },
    async deleteMyPost(id: number) {
      const { status: res } = await deleteCard(id)

      if (res) {
        return true
      } else {
        return false
      }
    },
  },
})
export default communityStore
