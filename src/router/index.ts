import { createRouter, createWebHistory } from 'vue-router'
import { showLoadingToast, closeToast } from 'vant'
import { nextTick } from 'vue'
import indexRoutes from './routes'
import permissionRoutes from './permission'
import Home from '../views/Home/Home.vue'
import Community from '../views/Community/Community.vue'
import ChatGPT from '../views/ChatGPT/chatGPT.vue'
import My from '../views/Mine/Mine.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // 以下四个页面建议不要懒加载，弱网环境下体验会很差
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },

    {
      path: '/my',
      name: 'My',
      component: My,
    },
    {
      path: '/chatgpt',
      name: 'ChatGPT',
      component: ChatGPT,
    },
    {
      path: '/community',
      name: 'Community',
      component: Community,
    },
    // 基础功能页面
    ...indexRoutes,
    // 管理功能页面
    ...permissionRoutes,
  ],
})

router.beforeEach((to, from, next) => {
  // 在这里显示加载中的效果
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
    window.scrollTo(0, 0)
    next()
  }
})
router.afterEach((to) => {
  // setRouteChange(to)
})

// 需要登录验证的页面 UploadPost
export default router
