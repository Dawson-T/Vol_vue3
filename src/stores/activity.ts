// 志愿活动模块仓库
import { Names } from './store-name'
import { defineStore } from 'pinia'
import { getActivities, getSignUpData, SignUp } from '@/api/ServerAPI'
import {
  setLocalData,
  getLocalData,
  mergeObjectsByDifferentId,
  requestTime,
} from '@/utils/util'
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
    storeLoading: false,
    finished: false,
    throttle: false, // 节流阀
    progressData: undefined, // 个人报名信息
    overData: undefined,
    isSended: false,
    storeErrorMsg: '',
  }),
  getters: {},
  actions: {
    // 获取活动数据
    async getActivityData() {
      try {
        this.storeErrorMsg = ''
        const { data: res } = await getActivities(requestTime(Date()), 5)
        setLocalData('activities', res)
        this.setActivityData()
      } catch {
        this.storeErrorMsg = '获取失败'
      } finally {
      }
    },
    // 缓存获取页面数据
    setActivityData() {
      this.activities = getLocalData('activities')
    },
    // 下拉刷新的回调
    async onPullDownRefresh() {
      try {
        this.storeLoading = true
        this.storeErrorMsg = ''
        const { data: res } = await getActivities(requestTime(Date()), 5)
        this.activities = mergeObjectsByDifferentId(this.activities, res)
        setLocalData('activities', this.activities)
      } catch {
        this.storeErrorMsg = '刷新失败'
      } finally {
        this.storeLoading = false
      }
    },
    // 触底刷新的回调
    async onReachBottom() {
      try {
        this.storeErrorMsg = ''
        this.storeLoading = true
        let time = requestTime(
          this.activities[this.activities.length - 1].created_at
        )
        const { data: res } = await getActivities(time, 5)
        // 数据为空
        if (res.length == 0) {
          return false
        } else {
          this.activities = mergeObjectsByDifferentId(this.activities, res)
          setLocalData('activities', this.activities)
          return true
        }
      } catch {
        this.storeErrorMsg = '刷新失败'
      } finally {
        this.storeLoading = false
      }
    },
    // 个人报名信息
    async getSignUpData() {
      const { data: res } = await getSignUpData()
      this.progressData = res
      this.isSended = true
    },
    // 取消报名
    async cancelSignup(id: number) {
      const { status: res } = await SignUp(id)

      if (res == 1) {
        return true
      } else {
        return false
      }
    },
  },
})
export default activityStore
