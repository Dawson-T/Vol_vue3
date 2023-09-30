<template>
  <div class="box">
    <RouterView> </RouterView>
    <van-tabbar
      v-if="
        ['/', '/home', '/my', '/community', '/chatgpt'].includes(route.path)
      "
      route
      v-model="active"
      active-color="#ee0a24"
      inactive-color="#000"
      placeholder
    >
      <van-tabbar-item
        v-for="item in tabbarList"
        :icon="item.icon"
        replace
        :to="item.path"
        >{{ item.title }}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const active = ref(0)
const tabbarList = [
  {
    title: '首页',
    path: '/home',
    icon: 'wap-home-o',
  },
  {
    title: '志愿服务社区',
    path: '/community',
    icon: 'friends-o',
  },
  {
    title: 'ChatGPT',
    path: '/chatgpt',
    icon: 'comment-o',
  },
  {
    title: '我的',
    path: '/my',
    icon: 'user-o',
  },
]
</script>

<style scoped lang="scss">
.box {
  min-height: 100vh;
  background-color: $deepBackgroundColor;
  .van-tabbar-item {
    background-color: rgba(128, 128, 128, 0.06);
  }
}
</style>
