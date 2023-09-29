import http from '@/utils/request'

// 重定向地址
export const oauthUrl = () => {
  console.log(import.meta.env.VITE_REDIRECT_URL);
  return http({
    method: 'POST',
    url: '/user/login',
    data: {
      // 这里指向跳转的地址
      redirect_uri: encodeURI(`${import.meta.env.VITE_REDIRECT_URL}`),
    },
  })
}
// 获取用户信息
export const oauthUser = (code) => {
  return http({
    method: 'POST',
    url: '/user/getinfo',
    data: { code },
  })
}

// 申请权限
export const ApplyPermission = (role, reason) => {
  return http({
    method: 'POST',
    url: 'auth/admin/applyadm',
    data: { role, reason },
    needToken: true,
  })
}

// 获取当前权限
export const getCurrentPermission = () => {
  return http({
    method: 'POST',
    url: '/user/auth/me',
    needToken: true,
  })
}
