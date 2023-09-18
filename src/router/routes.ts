const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Mine/Waiting/Waiting.vue'),
  },

  // 上传帖子
  {
    path: '/uploadpost',
    name: 'UploadPost',
    component: () => import('@/views/Community/UploadPost/UploadPost.vue'),
    meta: { requireAuth: true },
  },
  // 我的帖子
  {
    path: '/mypost',
    name: 'Mypost',
    component: () => import('@/views/Community/MyPost/MyPost.vue'),
  },

  {
    path: '/comment',
    name: 'Comment',
    component: () => import('@/views/Community/Comment/Comment.vue'),
  },
  {
    path: '/campushelp',
    name: 'CampusHelp',
    component: () => import('@/views/CampusHelp/CampusHelp.vue'),
  },
  // 活动板块
  {
    path: '/activity',
    name: 'Activity',
    component: () => import('@/views/Activity/Activity.vue'),
  },
  // 我的活动报名
  {
    path: '/myactivity',
    name: 'MyActivity',
    component: () => import('@/views/Activity/MyActivity/MyActivity.vue'),
  },
  {
    path: '/activity/detail/',
    name: 'Detail',
    component: () => import('@/views/Activity/Detail/Detail.vue'),
  },
  // 后台管理

  // 反馈
  {
    path: '/feedback',
    name: 'Feedback',
    component: () => import('@/views/FeedBack/FeedBack.vue'),
  },
  {
    path: '/feedbackinfo',
    name: 'FeedBackInfo',
    component: () => import('@/views/Admin/FeedBackInfo/FeedBackInfo.vue'),
  },
  {
    path: '/permission',
    name: 'Permission',
    component: () => import('@/views/Permission/Permission.vue'),
  },
  {
    path: '/userauthorization',
    name: 'UserAuthorization',
    component: () =>
      import('@/views/Admin/UserAuthorization/UserAuthorization.vue'),
  },
  {
    path: '/userauthorizationdetail',
    name: 'UserAuthorizationDetail',
    component: () =>
      import(
        '@/views/Admin/UserAuthorization/UserAuthorizationDetail/UserAuthorizationDetail.vue'
      ),
  },
  // 报名名单
  {
    path: '/activitiesshow',
    name: 'ActivitiesShow',
    component: () =>
      import('@/views/Admin/ActivitiesInfo/ActivitiesShow/ActivitiesShow.vue'),
  },
  // 活动列表
  {
    path: '/activitieslist',
    name: 'ActivitiesList',
    component: () => import('@/views/Admin/ActivitiesInfo/ActivitiesList.vue'),
  },
  // 爱心雨伞首界面
  {
    path: '/borrowumbrella',
    name: 'BorrowUmbrella',
    component: () => import('@/views/BorrowUmbrella/BorrowUmbrella.vue'),
  },
  {
    path: '/borrowingInfopage',
    name: 'BorrowingInfoPage',
    component: () => import('@/views/Admin/BorrowingInfo/BorrowingInfo.vue'),
  },
  // NewsDetail
  {
    path: '/article',
    name: 'Article',
    component: () => import('@/views/Article/Article.vue'),
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/ErrorPage/page404.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
]
export default routes
