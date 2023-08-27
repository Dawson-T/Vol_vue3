// 志愿活动模块仓库
import { Names } from './store-name'
import { defineStore } from 'pinia'
import { requestTime } from '@/utils/util'
import { getActivities } from '@/api/ServerAPI'
import { setLocalData, getLocalData } from '@/utils/util'
import { mergeObjectsByDifferentId } from '@/utils/util'
import { getSignUpData, SignUp } from '@/api/ServerAPI'
// 类型约束
import type { Activities } from './stores.d'
const activityStore = defineStore(Names.ACTIVITY, {
  state: () => ({
    activities: <Activities[]>[],
    images: [
      {
        imgUrl: 'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1.png',
        index: 0,
      },
      {
        imgUrl: 'https://olrando.oss-cn-chengdu.aliyuncs.com/img/2.png',
        index: 1,
      },
      {
        imgUrl:
          'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1681282717071.jpeg',
        index: 2,
      },
      {
        imgUrl:
          'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1681282717075.jpeg',
        index: 3,
      },
    ],
    isLoading: false,
    loading: false,
    finished: false,
    throttle: false, // 节流阀
    // 个人报名信息
    progressData: undefined,
    overData: undefined,
  }),
  getters: {},
  actions: {
    // 获取活动数据
    async getActivityData() {
      const { data: res } = await getActivities(requestTime(Date()), 5)
      setLocalData('activities', res)
      this.setActivityData()
    },
    // 设置页面数据
    setActivityData() {
      this.activities = getLocalData('activities')
    },
    // 下拉刷新的回调
    async onPullDownRefresh() {
      const { data: res } = await getActivities(requestTime(Date()), 5)
      this.activities = mergeObjectsByDifferentId(this.activities, res)
      setLocalData('activities', this.activities)
    },
    // 触底刷新的回调
    async onReachBottom() {
      try {
        const option = {
          created_at: requestTime(
            this.activities[this.activities.length - 1].created_at
          ),
          limit: 5,
        }
        const { data: res } = await getActivities(option)
        if (res.length == 0) {
          return false
        } else {
          this.activities = mergeObjectsByDifferentId(this.activities, res)

          setLocalData('activities', this.activities)
          return true
        }
      } catch {}
    },
    // 个人报名信息
    async getSignUpData() {
      const { data: res } = await getSignUpData()
      this.progressData = res
    },
    // 取消报名
    async cancelSignup(id: number) {
      const { status: res } = await SignUp(id)
      if (res == 2) {
        return true
      } else {
        return false
      }
    },
  },
})
export default activityStore
