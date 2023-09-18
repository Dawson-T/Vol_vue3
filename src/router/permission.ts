const permissionRoutes = [
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin/Admin.vue'),
  },
  // 用户信息
  {
    path: '/userinfo',
    name: 'Userinfo',
    component: () => import('@/views/Admin/UserInfo/UserInfo.vue'),
  },
  // 后台权限管理
  {
    path: '/userinfo_permission',
    name: 'userinfo_permission',
    component: () =>
      import(
        '@/views/Admin/UserInfo/UserinfoPermission/UserinfoPermission.vue'
      ),
  },
  // 后台活动管理
  {
    path: '/activiesmanage',
    name: 'ActivesManage',
    component: () => import('@/views/Admin/ActivesManage/ActivesManage.vue'),
  },
  // 活动删除
  {
    path: '/deleteactiviesDetail',
    name: 'DeleteActivesDetail',
    component: () =>
      import('@/views/Admin/ActivesManage/DeleteActives/DeleteActives.vue'),
  },
  // 活动发布页
  {
    path: '/publishactivesDetail',
    name: 'PublishActivesDetail',
    component: () =>
      import(
        '@/views/Admin/ActivesManage/PublishActivesDetail/PublishActivesDetail.vue'
      ),
  },
]

export default permissionRoutes