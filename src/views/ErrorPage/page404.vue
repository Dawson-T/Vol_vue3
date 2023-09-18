<template>
  <div id="root">
    <div class="box-404-wrap">
      <div class="box">
        <div class="d-flex flex-column align-items-center">
          <div class="text-wrap">
            <h1 data-t="404" class="h1">404</h1>
          </div>
          <div class="text-center mt-2">页面不存在或者您没有权限访问。</div>
          <div class="mt-4">
            <button @click="goBack" class="btn btn-primary">返回</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => {
  router.back()
}
</script>
<style scoped lang="scss">
@import '@/assets/css/page404';
</style>
