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
import { isLogin } from "@/utils/util";
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
