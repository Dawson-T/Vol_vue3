<template>
  <!-- 登录状态 -->
  <div v-if="Permission">
    <header>
      <img :src="userInfo.avatar" alt="头像" />
      <h1>{{ userInfo.name }}</h1>
      <span>{{ `(${Permission})` }}</span>
    </header>
    <section>
      <ul>
        <li>
          <router-link class="a" to=""
            ><van-icon name="manager-o" />&nbsp志愿者认证</router-link
          >
        </li>
        <li>
          <router-link class="a" to="/myactivity"
            ><van-icon name="records-o" />&nbsp志愿者报名</router-link
          >
        </li>
        <li>
          <router-link class="a" to="/mypost"
            ><van-icon name="coupon-o" />&nbsp我的帖子</router-link
          >
        </li>
        <li>
          <router-link class="a" to=""
            ><van-icon name="guide-o" />&nbsp使用指南</router-link
          >
        </li>
        <li v-if="confirmAdmin">
          <div class="a" @click="isPc">
            <van-icon name="setting-o" />&nbsp后台管理
          </div>
        </li>
        <!-- <li>
          <router-link class="a" to=""
            ><van-icon name="setting-o" />&nbsp设置</router-link
          >
        </li> -->
        <li @click="logOut">
          <router-link class="a" to=""
            ><van-icon name="revoke" />&nbsp退出登录</router-link
          >
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import util from '@/utils/util'
import { showToast } from 'vant'
const router = useRouter()
const userStore = useStore().user
// 用户信息 权限名称  权限级别 --storeToRefs转成响应式数据
const { userInfo, confirmAdmin, Permission } = storeToRefs(userStore)
onMounted(() => {
  userStore.setUserInfo()
  userStore.ConfirmCurrentPermission()
})
// 检测登录后是否有重定向链接 跳转 --企业微信url的replace有问题暂时不用
// const handleLoginSuccess = () => {
//   let redirectPath = sessionStorage.getItem('redirectPath')
//   if (redirectPath) {
//     // 清除 redirectPath
//     sessionStorage.removeItem('redirectPath')
//     // 跳转回之前的页面
//     sessionStorage.setItem('redirectPathAfter', route.fullPath)
//     router.replace(redirectPath)
//   } else {
//     return
//   }
// }
function isPc() {
  if (util.isMobile()) {
    showToast('请在PC端登录')
  } else {
    router.push('admin')
  }
}
// 退出登录
const logOut = () => {
  userStore.logOut()
}
</script>
<style scoped lang="scss">
/* 设置头部样式 */
header {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-right: 20px;
  }
  h1 {
    font-size: 24px;
    font-weight: bold;
    color: #333;
  }
  span {
    font-size: 18px;
  }
}
/* 设置主体样式 */
section {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    margin-bottom: 10px;
  }
  .a {
    display: block;
    padding: 10px;
    color: #333;
    text-decoration: none;
    border-radius: 5px;
    background-color: #f6f6f6;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    .van-icon {
      margin-right: 3px;
    }
  }
  a {
    &:hover {
      background-color: #e6e6e6;
    }
  }
}
</style>
