<template>
  <van-pull-refresh
    style="min-height: 100vh"
    v-model="isLoading"
    success-text="刷新成功"
    @refresh="onPullDownRefresh"
  >
    <van-list
      class="van-clearfix"
      :immediate-check="false"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onReachBottom"
    >
      <div class="container">
        <!-- 头部 -->
        <div class="swipe-container">
          <h1 class="title-h1">最新活动</h1>
          <h2 class="tip">进行中</h2>
          <div class="my-swipe">
            <van-swipe
              loop
              :autoplay="3000"
              :show-indicators="false"
              :touchable="true"
            >
              <van-swipe-item v-for="item in images" :key="item.index"
                ><img :src="item.imgUrl"
              /></van-swipe-item>
            </van-swipe>
          </div>
        </div>
        <div class="title1">全部活动</div>
        <div class="card-container">
          <!-- 卡片 -->
          <div
            class="card"
            v-for="item in activities"
            :key="item.id"
            @click="goDetail(item.id)"
          >
            <div class="tip">
              {{ isOver(item.end) ? '进行中' : '已截止' }}
            </div>
            <img :src="item.img" class="card-img" />
            <div class="card-body">
              <div class="card-title">
                <h3 class="van-ellipsis">{{ item.title }}</h3>
              </div>
              <div class="card-content">
                <div><span>征集范围：</span>{{ item.scope }}</div>
                <div><span>征集人数：</span>{{ item.number }}人</div>
                <div class="van-ellipsis">
                  <span>发布单位：</span>{{ item.publisher }}
                </div>
                <div>
                  <span>活动日期：</span>{{ requestTime(item.start) }}至{{
                    requestTime(item.end)
                  }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script setup lang="ts">
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { requestTime } from '@/utils/util'
const activityStore = useStore().activity
const router = useRouter()
let { activities, images } = storeToRefs(activityStore)
let { storeLoading } = activityStore
// 节流阀
let throttle = ref(false)
let isLoading = ref(false)
let loading = ref(false)
let finished = ref(false)
onMounted(() => {
  activityStore.getActivityData()
})

const goDetail = (id: number | string) => {
  router.push({ path: '/activity/detail', query: { id } })
}

// 是否截止
const isOver = (time: any) => {
  if (!time) return
  const currentTime = new Date().getTime()
  return time > currentTime ? true : false
}

const onPullDownRefresh = async () => {
  isLoading.value = storeLoading
  await activityStore.onPullDownRefresh()
  isLoading.value = storeLoading
}

const onReachBottom = async () => {
  loading.value = storeLoading
  let flag = await activityStore.onReachBottom()
  if (!flag) {
    finished.value = true
  }
  loading.value = storeLoading
}
</script>

<style scoped lang="scss">
.container {
  padding: 5px;
  .swipe-container {
    position: relative;
    text-align: center;
    height: 265px;
    border-radius: 10px;
    box-shadow: 2px 2px 20px #3b2e32;
    &::before {
      left: 5px;
      top: 5px;
    }
    &::after {
      right: 5px;
      top: 5px;
    }
    .title-h1 {
      background: linear-gradient(to right, #ff7f50, #6495ed);
      font-family: $globalFontFamily;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
  .swipe-container::before,
  .swipe-container::after {
    content: '';
    position: absolute;
    top: 0;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: rgb(255, 42, 0);
  }
}

.my-swipe {
  display: flex;
  justify-content: center;
  align-items: center;
}
.van-swipe {
  border-radius: 20px 20px 20px 20px;
  height: 210px;
  width: 340px;
  margin-bottom: 20px;
  margin-top: 10px;
  .van-swipe-item {
    img {
      width: 100%;
      height: 100%;
      border-radius: 20px 20px 20px 20px;
    }
  }
}
.tip {
  z-index: 1;
  border-radius: 5px;
  height: 28px;
  width: 68px;
  position: absolute;
  background: linear-gradient(to right, #8ec5fc, #3e9cfc);
  color: white;
  font-family: KaiTi, serif;
  font-size: 18px;
  right: -1px;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.title1 {
  margin-top: 40px;
  margin-bottom: 40px;
  font-size: 35px;
  background: linear-gradient(to bottom, #ff0000, #ffff00);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 1rem;
}
.card {
  min-height: 260px;
  width: 47%;
  margin-bottom: 3vh;
  box-shadow: 5px 5px 20px #3b2e32;
  position: relative;
  border-radius: 20px 0;
}
.card-img {
  border-radius: 5px;
  width: 100%;
  object-fit: cover;
  border-radius: 20px 0 0 0;
}
.card-body {
  padding: 5px;
}
.card-content {
  div {
    margin-top: 5px;
  }
}
</style>
