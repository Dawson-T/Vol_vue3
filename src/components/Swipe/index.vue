<template>
  <div class="container-swi">
    <!-- 前 -->
    <div class="foreground">
      <van-swipe
        loop
        class="my-swipe"
        :autoplay="3000"
        indicator-color="#1989fa"
        :touchable="false"
      >
        <van-swipe-item v-for="item in images" :key="item.index"
          ><img :src="item.imgUrl"
        /></van-swipe-item>
      </van-swipe>
    </div>
    <!-- 后 -->
    <div class="carousel background">
      <van-swipe loop class="my-swipe1" :autoplay="3000" :touchable="false">
        <van-swipe-item v-for="item in images" :key="item.index">
          <img :src="item.imgUrl" />
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script setup lang="ts">
const images = reactive([
  {
    imgUrl: 'https://olrando.oss-cn-chengdu.aliyuncs.com/img/duiqi.jpg',
    index: 0,
  },
  {
    imgUrl:
      'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1681282717068.jpeg',
    index: 1,
  },
  {
    imgUrl:
      'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1681282717071.jpeg',
    index: 2,
  },
  {
    imgUrl:
      'https://olrando.oss-cn-chengdu.aliyuncs.com/img/1681282717075.jpeg',
    index: 3,
  },
])
</script>

<style scoped lang="scss">
.container-swi {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.container .carousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  margin-bottom: 8px;
  margin-top: 8px;
}

.foreground {
  z-index: 2;
}

.background {
  z-index: 0;
  filter: blur(4px);
  opacity: 0.8;
}

.van-swipe-item {
  height: unset;
}

.my-swipe {
  border-radius: 20px 20px 20px 20px; /* 设置圆角半径 */
  height: 210px;
  width: 330px;
  margin-bottom: 20px;
  margin-top: 20px;
  box-shadow: 2px 2px 20px #3b2e32;
}

.my-swipe1 {
  border-radius: 20px 20px 20px 20px;
  height: 240px;
  width: 365px;
}

.my-swipe1 .van-swipe-item img {
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 20px 20px;
}

.my-swipe .van-swipe-item img {
  width: 100%;
  height: 100%;
  border-radius: 20px 20px 20px 20px;
}
</style>
