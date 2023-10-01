<template>
  <div>
    <UnLoginPage v-if="!show" />
    <isLoginPage v-else />
  </div>
</template>

<script setup lang="ts">
// 这两个不是在组件文件夹下不要删
import UnLoginPage from '@/views/Mine/Unlogin/Unlogin.vue'
import isLoginPage from '@/views/Mine/IsLoginPage/IsLoginPage.vue'
import { isLogin } from '@/utils/util'
let show = ref(false)

onMounted(() => {
  if (isLogin()) {
    show.value = true
  } else {
    show.value = false
  }
})
</script>

<style scoped></style>
