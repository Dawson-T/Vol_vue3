<template>
  <div class="waiting-countdown">
    <p>{{ countdown }} 秒后自动跳转...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from '@/stores'
const router = useRouter()
const userStore = useStore().user
let countdown = ref(3)
onMounted(() => {
  login()
  // 开始倒计时
  let interval = setInterval(() => {
    countdown.value--
    if (countdown.value === 0 || localStorage.getItem('userinfo')) {
      clearInterval(interval) // 倒计时结束时清除定时器
      router.replace('/my')
    }
  }, 1000)
})

// // 验证是否含有code部分
const isCode = () => {
  return window.location.href.includes('code=')
}

const login = () => {
  if (isCode()) {
    userStore.getUserInfo()
  }
}
</script>

<style scoped></style>
