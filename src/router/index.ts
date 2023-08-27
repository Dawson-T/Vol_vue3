import { createRouter, createWebHistory } from 'vue-router'
import { showLoadingToast, closeToast } from 'vant'
import { nextTick } from 'vue'
import { generateRoutes } from '../utils/RouterAutoInject'
generateRoutes()
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home/Home.vue'),
    },
    {
      path: '/my',
      name: 'my',
      component: () => import('../views/Mine/Mine.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Mine/Waiting/Waiting.vue'),
    },
    {
      path: '/chatgpt',
      name: 'ChatGpt',
      component: () => import('@/views/ChatGPT/chatGPT1.vue'),
    },
    {
      path: '/community',
      name: 'Community',
      component: () => import('@/views/Community/Community.vue'),
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
  ],
})

router.beforeEach((to, from, next) => {
  // 在这里显示加载中的效果，比如设置一个全局的加载中状态
  if (to.fullPath === '/my') {
    const toast = showLoadingToast({
      message: '加载中...',
      duration: 0,
      forbidClick: true,
    })
    // 监听页面加载完成事件
    nextTick(() => {
      closeToast()
      next() // 必须调用next()方法，否则路由不会继续切换
    })
    // window.scrollTo(0, 0);
  } else {
    // window.scrollTo(0, 0);
    next()
  }
})

// 需要登录验证的页面 UploadPost
export default router
