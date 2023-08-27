<template>
  <div>
    <UnLoginPage v-if="!show" />
    <isLoginPage v-else />
  </div>
</template>

<script setup lang="ts">
import UnLoginPage from '@/views/Mine/Unlogin/Unlogin.vue'
import isLoginPage from '@/views/Mine/IsLoginPage/IsLoginPage.vue'
import { onMounted, ref } from 'vue'
import { showFailToast } from 'vant'
let show = ref(false)
const isLogin = (): boolean => {
  const userinfo = localStorage.getItem('userinfo')
  const tokenExpiresAt = localStorage.getItem('token_expires_at')
  if (userinfo && tokenExpiresAt) {
    const expiresAt = JSON.parse(tokenExpiresAt)
    if (Date.now() < expiresAt) {
      return true // 未过期
    }
  }
  return false
}
onMounted(() => {
  if (isLogin()) {
    show.value = true
  } else {
    show.value = false
  }
})
</script>

<style scoped></style>
