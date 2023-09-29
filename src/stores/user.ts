// 用户信息仓库
import { defineStore } from 'pinia'
// 枚举
import { Names } from './store-name'

// 接口
import { oauthUser, getCurrentPermission } from '@/api/user'
// 本地缓存函数
import { setLocalData, getLocalData, removeLocalData } from '@/utils/util'

const userStore = defineStore(Names.USER, {
  state: () => ({
    userInfo: {
      name: <string>'',
      mobile: <string>'',
      gender: <string>'', //性别 男：0，女：1
      avatar: <string>'', // 头像
    },
    confirmAdmin: <boolean>false,
    Permission: <string>'',
  }),
  getters: {},
  actions: {
    // 获取用户信息
    async getUserInfo() {
      try {
        const code = window.location.href.split('code=')[1].split('#')[0]
        const result = await oauthUser(code)
        let userInfo
        if (result.status) {
          userInfo = result.data
        }
        setLocalData('userinfo', userInfo)
        setLocalData('token_expires_at', Date.now() + 7 * 24 * 60 * 60 * 1000) // 7天后过期
      } catch (e) {}
    },
    // 设置用户信息
    setUserInfo() {
      const resUserInfo = getLocalData('userinfo')
      if (resUserInfo) {
        this.userInfo.name = resUserInfo.name
        this.userInfo.mobile = resUserInfo.mobile
        this.userInfo.gender = resUserInfo.gender
        this.userInfo.avatar = resUserInfo.avatar
      }
    },
    // 展示权限
    async ConfirmCurrentPermission() {
      // const myAuth = {
      //   isAdmin: '',
      //   authority:'',
      // }
      const permissionMapping: { [key: number]: string } = {
        1: '超级管理员',
        2: '管理员',
        0: '普通用户',
      }
      const result = await getCurrentPermission()
      let currentPermission = result.status
      if (currentPermission === 1) {
        this.confirmAdmin = true
        this.Permission = permissionMapping[currentPermission]
      } else {
        this.confirmAdmin = false
        this.Permission = permissionMapping[currentPermission]
      }
    },
    // 退出登录
    logOut() {
      removeLocalData('userinfo')
      removeLocalData('token_expires_at')
      location.reload()
    },
  },
})
export default userStore
