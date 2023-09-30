<template>
  <div class="container">
    <div class="img"><img src="@/assets/images/志愿活动.webp" /></div>
    <van-button @click="goPublish" round block type="info">发布活动</van-button>
    <van-button @click="goDelete" round block type="info">删除活动</van-button>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const goDelete = () => {
  router.push('/deleteactiviesDetail')
}
const goPublish = () => {
  router.push('/publishactivesDetail')
}
</script>

<style scoped lang="scss">
.container {
  margin: 10px;
}

.img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.van-button {
  margin-bottom: 10px;
  margin-top: 20px;
  background-image: $globalButtonColor;
}
</style>
