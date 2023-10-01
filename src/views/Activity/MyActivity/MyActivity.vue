<template>
  <div>
    <div class="container">
      <van-tabs v-model:active="active" sticky>
        <div v-if="isSended">
          <van-tab title="进行中">
            <div v-if="progressData.length != 0">
              <!-- 懒加载、垂直居中、 -->
              <div class="card" v-for="item in progressData" :key="item.act_id">
                <div class="card-left">
                  <img :src="item.img" v-lazy="item.img" />
                </div>
                <div class="card-right">
                  <div class="card-header">
                    <h2>{{ item.title }}</h2>
                    <button
                      class="cancel-button"
                      @click="Cancellation(item.act_id)"
                    >
                      取消
                    </button>
                  </div>
                  <div class="card-description">
                    <p>{{ item.detail }}</p>
                  </div>
                </div>
              </div>
            </div>
            <van-empty
              v-else
              image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
              description="暂无数据"
            />
          </van-tab>
          <van-tab title="已结束">
            <div v-if="overData">
              <!-- 懒加载、垂直居中、 -->
              <div class="card" v-for="item in progressData" :key="item.act_id">
                <div class="card-left">
                  <img :src="item.img" v-lazy="item.img" />
                </div>
                <div class="card-right">
                  <div class="card-header">
                    <h2>{{ item.title }}</h2>
                    <button
                      class="cancel-button"
                      @click="Cancellation(item.act_id)"
                    >
                      取消
                    </button>
                  </div>
                  <div class="card-description">
                    <p>{{ item.detail }}</p>
                  </div>
                </div>
              </div>
            </div>
            <van-empty
              v-else
              image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
              description="暂无数据"
            />
          </van-tab>
        </div>
        <van-skeleton v-else>
          <template #template>
            <div :style="{ display: 'flex', width: '100%' }">
              <van-skeleton-image />
              <div :style="{ flex: 1, marginLeft: '16px' }">
                <van-skeleton-paragraph row-width="60%" />
                <van-skeleton-paragraph row-width="90%" />
                <van-skeleton-paragraph row-width="90%" />
              </div>
            </div>
          </template>
        </van-skeleton>
      </van-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { showConfirmDialog, showSuccessToast, showFailToast } from 'vant'
const activityStore = useStore().activity
let active = ref(0)
const { progressData, overData, isSended } = storeToRefs(activityStore)
onMounted(() => {
  activityStore.getSignUpData()
})
const Cancellation = (id: number) => {
  showConfirmDialog({
    title: '警告',
    message: '您确认要取消报名吗？',
  })
    .then(async () => {
      // on confirm
      const status = await activityStore.cancelSignup(id)
      console.log(status)

      if (status) {
        showSuccessToast('操作成功！')
        activityStore.getSignUpData()
      } else {
        showFailToast('操作失败！')
      }
    })
    .catch(() => {
      // on cancel
    })
}
</script>

<style scoped lang="scss">
.card {
  display: flex;
  // width: 400px;
  margin: 20px auto;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-left {
  flex: 1;
}

.card-left img {
  width: 100%;
  height: auto;
  object-fit: cover;
  margin: 10px;
  border-radius: 10%;
}

.card-right {
  flex: 2;
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
}

.cancel-button {
  background-color: red;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #ff3333;
}

.card-description {
  margin-top: 10px;
}
</style>
