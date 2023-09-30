<template>
  <div class="container">
    <!-- 轮播图 -->
    <Swipe />
    <!-- 新闻提示 -->
    <NoticeBar :text="'使用系统遇到问题？企业微信联系 邓森'" />
    <!--  -->
    <Grid />
    <!-- 分隔符 -->
    <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
    >
      动态信息
    </van-divider>
    <!-- 卡片 开始 -->
    <!-- 发布时间 -->
    <div v-for="item in dataList">
      <van-divider>发布时间：{{ requestTime(item.created_at) }}</van-divider>
      <div class="card" @click="goDetailPage(item.id)">
        <img :src="item.img" class="card-img" v-lazy="item.img" />
        <div class="card-body">
          <h2 class="card-title">{{ item.intro }}</h2>
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
import { requestTime } from '@/utils/util'
import ServerAPIs from '@/api/ServerAPI.js'
const router = useRouter()
let dataList = ref([])
let limit = 3
let page = 0
onMounted(() => {
  getArticleListData()
})
const getArticleListData = async () => {
  let option = {
    limit,
    page,
  }
  const res = await ServerAPIs.getArticleList(option)
  if (res.status === 1) {
    dataList.value = res.data
  }
}
const goDetailPage = (id: number) => {
  router.push({ name: 'Article', query: { id } })
}
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
  height: 22vh;
}
.card-body {
  padding: 10px;
}
.card-title {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: 20px;
  line-height: 20px;
}
</style>
