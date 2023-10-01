<template>
  <div>
    <div class="left-content">
      <div>
        <!--垂直居中、 -->
        <van-card
          v-for="item in activities"
          :key="item.id"
          centered
          :desc="item.detail"
          :title="item.title"
          :thumb="item.img"
        >
          <template #footer>
            <van-button size="normal" @click="delActivity(item.id)"
              >删除活动</van-button
            >
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showSuccessToast, showFailToast, showConfirmDialog } from 'vant'
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { DelActive } from '@/api/ServerAPI'
const activity = useStore().activity
const { activities } = storeToRefs(activity)
onMounted(() => {
  activity.getActivityData()
})
const delActivity = (id) => {
  showConfirmDialog({
    title: '警告',
    message: '您确定要删除活动',
  })
    .then(() => {
      DelActive(id).then((res) => {
        if (res.status == 1) {
          showSuccessToast(res.msg)
          activity.getActivityData()
        } else {
          showFailToast(res.msg)
          activity.getActivityData()
        }
      })
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss">
.container {
  margin-left: 10px;
  margin-right: 10px;
  min-height: 100px;
  /* background-color: skyblue; */
}
.title-container {
  display: flex;
}
.left-title {
  width: 50%;
  color: #000;
  font-size: 24px;
  text-align: center;
}
.right-title {
  width: 50%;
  text-align: center;
}
.title-container .active {
  color: red;
  border-bottom: 3px solid red;
}
.right-title {
  color: #000;
  font-size: 24px;
}

.van-card {
  box-shadow: 0 0 3px rgba(0, -0.5, 0, 0.5);
  margin: 5px;
  .van-card__title {
    font-size: 18px;
    color: red;
    line-height: 30px;
  }
  .van-card__desc {
    font-size: 14px;
    margin-top: 10px;
  }
}
</style>
@/api/ServerAPI
