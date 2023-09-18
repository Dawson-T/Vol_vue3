// 社区模块仓库
import { Names } from './store-name'
import { defineStore } from 'pinia'
import {
  GetAllUserInfo,
  GetManageInfo,
  CancelPermission,
  AuthAdminPermission,
} from '@/api/admin'
import { getLocalData, setLocalData } from '@/utils/util'

const adminUserInfoStore = defineStore(Names.ADMINUSERINFO, {
  state: () => ({
    // 管理员列表
    AdminList: [],
    // 全部列表
    list: [],
    // -- 权限控制界面
    message: '',
    user: undefined,
  }),
  getters: {},
  actions: {
    // 全部用户信息
    GetData() {
      GetAllUserInfo().then((res) => {
        this.list = res.data
        setLocalData('UserList', this.list)
      })
    },
    // 管理员信息
    GetManageData() {
      GetManageInfo().then((res) => {
        this.AdminList = res.data
        setLocalData('AdminList', this.AdminList)
      })
    },

    /**
     * 单个用户信息
     * @param currentId 当前用户id
     */
    async getUserData(currentId: any) {
      const AdminListData = getLocalData('AdminList')
      const UserListData = getLocalData('UserList')
      // 先从管理员中找
      this.user = AdminListData.find(
        // @ts-ignore
        (admin) => admin.id == currentId
      )
      if (!this.user) {
        // @ts-ignore
        this.user = UserListData.find((user) => user.id == currentId)
      }
    },
    // 单个用户信息更新
    async updateUserData(currentId: any) {},
    /**
     * 授权
     * @param currentPermission 当前权限
     * @param id 当前用户id
     */
    async setPermission({ value: currentPermission }: any, id: any) {
      const roleToPermissionType: { [key: string]: number } = {
        超级管理员: 1,
        管理员: 2,
        普通用户: 0,
      }

      let permissionType = roleToPermissionType[currentPermission]

      let permissionPromise
      if (permissionType === 1 || permissionType === 2) {
        console.log(permissionType)

        // 超级管理员或管理员
        permissionPromise = await AuthAdminPermission(id, permissionType)
      } else if (permissionType === 0) {
        permissionPromise = await CancelPermission(id)
      }
      if (permissionPromise && permissionPromise.status === 1) {
        return 1
      } else {
        return 0
      }
    },
  },
})
export default adminUserInfoStore
