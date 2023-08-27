<template>
  <div class="container">
    <!-- 轮播图 -->
    <Swipe />
    <!-- 新闻提示 -->
    <NoticeBar :text="'使用系统遇到问题？企业微信联系 邓森'" />
    <!--  -->
    <Gird />
    <!-- 分隔符 -->
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      动态信息
    </van-divider>
    <!-- 卡片 开始 -->
    <!-- 发布时间 -->
    <div v-for="item in imgList">
      <van-divider>发布时间：2023-04-02</van-divider>
      <div class="card">
        <img :src="item" class="card-img" v-lazy="item" />
        <div class="card-body">
          <h2 class="card-title">
            人工智能学院“小红帽”常青藤青年志愿者服务队123456
          </h2>
        </div>
      </div>
    </div>
    <!-- 卡片结束 -->

    <!-- 底线开始 -->
    <van-divider>没有更多了</van-divider>
    <!-- 底线结束 -->
  </div>
</template>

<script setup lang="ts">
import Swipe from '@/components/Swipe/index.vue'
import NoticeBar from '@/components/NoticeBar/index.vue'
import Gird from '@/components/Grid/index.vue'

import { ref } from 'vue'
const imgList = ref([
  'https://picsum.photos/500/300?random=1',
  'https://picsum.photos/500/300?random=2',
  'https://picsum.photos/500/300?random=3',
])
</script>

<style scoped>
.container {
  min-height: 110%;
  padding: 5px;
}
.container .van-card {
  background-color: #dcdcdc;
  border-radius: 40px;
  margin: 10px;
}

.card {
  width: 350px;
  margin: 0 auto;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;
}
.card-img {
  width: 100%;
  display: block;
  object-fit: cover;
  height: 150px;
}
.card-body {
  padding: 10px;
}
.card-title {
  width: 330px;
  font-size: 14px;
  font-family: KaiTi, STKaiti, 'Microsoft YaHei', sans-serif;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 20px;
  line-height: 20px;
}
</style>
