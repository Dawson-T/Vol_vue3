<template>
  <div>
    <van-pull-refresh
      style="min-height: 100vh"
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <van-list
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="all">
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
              <div class="tip card-tip">
                {{ item.duration ? '进行中' : '已结束' }}
              </div>
              <img :src="item.img" class="card-img" />
              <div class="card-body">
                <div class="card-title">
                  <h3 class="van-ellipsis">{{ item.title }}</h3>
                </div>
                <div class="card-content">
                  <div><span>征集范围：</span>{{ item.scope }}</div>
                  <div><span>征集人数：</span>{{ item.number }}</div>
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
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from '@/stores'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { requestTime } from '@/utils/util'
const activityStore = useStore().activity
const router = useRouter()
let { activities, images } = storeToRefs(activityStore)
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

// 下拉刷新
const onRefresh = () => {
  if (!throttle.value) {
    // 开启节流阀
    throttle.value = true
    //@ts-ignore
    activityStore.onPullDownRefresh()
    // 如果返回数据为空则设置已完成

    isLoading.value = false
    // 关闭节流阀
    throttle.value = false
  }
}

// 触底刷新
const onLoad = async () => {
  // 开启节流阀
  loading.value = true
  const flag = await activityStore.onReachBottom()
  loading.value = false
  // 无返回数据后
  if (!flag) {
    finished.value = true
  }
}
</script>

<style scoped lang="scss">
.all {
  margin: 10px;
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
      height: 15%;
      font-size: 35px;
      padding-top: 2%;
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
  right: 8px;
  top: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.card-tip {
  top: 0;
  right: -1px;
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
  justify-content: flex-start;
}
.card {
  height: 260px;
  width: 45%;
  margin-left: 3.5vw;
  margin-bottom: 3vh;
  box-shadow: 2px 2px 9px #3b2e32;
  position: relative;
  border-radius: 3px;
}
.card-img {
  border-radius: 5px 5px 0 0;
  height: 100px;
  width: 100%;
  object-fit: cover;
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
