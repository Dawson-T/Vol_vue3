<template>
  <div>
    <div class="container">
      <van-tabs v-model:active="active" sticky>
        <van-tab title="进行中">
          <div v-if="progressData">
            <!-- 懒加载、垂直居中、 -->
            <van-card
              v-for="item in progressData"
              :key="item.id"
              lazy-load
              centered
              :desc="item.detail"
              :title="item.title"
              :thumb="item.img"
            >
              <template #footer>
                <van-button size="normal" @click="Cancellation(item.id)"
                  >取消报名</van-button
                >
              </template>
            </van-card>
          </div>
          <van-empty
            v-else
            image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
            description="暂无数据"
          />
        </van-tab>
        <van-tab title="已结束">
          <div v-if="overData">12346</div>
          <van-empty
            v-else
            image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
            description="暂无数据"
          />
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { showConfirmDialog, showSuccessToast, showFailToast } from 'vant'
const activityStore = useStore().activity
let active = ref(0)
const { progressData, overData } = storeToRefs(activityStore)
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

<style scoped lang="scss"></style>
