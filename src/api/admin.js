import http from '@/utils/request'
// 获取反馈信息
export const GetFeedBackInfo = () => {
  return http({
    method: 'POST',
    url: '/opt/getopts',
    needToken: true
  })
}

// 获取借伞记录
export const GetUmbrellaData = (limit) => {
  return http({
    method: 'POST',
    url: '/umb/getubs',
    data: { limit },
    needToken: true
  })
}

// 获取全部用户信息
export const GetAllUserInfo = () => {
  return http({
    method: 'POST',
    url: '/user/auth/getusers',
    needToken: true
  })
}

// 获取管理员信息
export const GetManageInfo = () => {
  return http({
    method: 'POST',
    url: '/user/auth/getauths',
    needToken: true
  })
}

// 授权管理
export const AuthAdminPermission = (id, role) => {
  return http({
    method: 'POST',
    url: 'auth/admin/setad',
    data: {
      user_id: id,
      role
    },
    needToken: true
  })
}

// 取消管理
export const CancelPermission = (id) => {
  return http({
    method: 'POST',
    url: 'auth/admin/delad',
    data: { user_id: `${id}` },
    needToken: true
  })
}

// 权限申请列表
export const getPermissionList = () => {
  return http({
    method: 'POST',
    url: '/user/auth/getapts',
    needToken: true
  })
}

// 权限处理
export const dealApplyPermission = (user_id, status) => {
  return http({
    method: 'POST',
    url: 'auth/admin/dealapply',
    data: {
      user_id: user_id,
      allow: status
    },
    needToken: true
  })
}

// 活动报名名单
export const getActivityDetail = (id) => {
  return http({
    method: 'POST',
    url: 'auth/act/actregs',
    data: { act_id: id },
    needToken: true
  })
}