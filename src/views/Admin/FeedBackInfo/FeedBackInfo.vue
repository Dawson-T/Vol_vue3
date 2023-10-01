<template>
  <div>
    <div class="container">
      <div>
        <div v-if="list.length !== 0">
          <!-- 懒加载、垂直居中、 -->
          <van-card
            centered
            v-for="item in list"
            :key="item.id"
            :desc="item.context"
          >
            <template #footer>
              <div class="time" v-if="item.hasct == 0">
                {{ `联系人方式：${item.contact}` }}
              </div>
              <div v-else class="time">匿名</div>
            </template>
          </van-card>
        </div>
        <van-empty
          v-else
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="暂无数据"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GetFeedBackInfo } from '@/api/admin'
let list = ref([])
let contact = '138xxxxxxx'
onMounted(() => {
  goDetail()
})
const goDetail = async () => {
  let res = await GetFeedBackInfo()

  list.value = res.data
}
</script>

<style scoped lang="scss">
.container {
  min-height: 100px;
  width: 100%;
  margin: 5px;
}

.van-card {
  box-shadow: 0 0 10px rgba(0, -0.5, 0, 0.5);
  border-radius: 10px;
  margin-top: 10px;
}
.van-card__desc {
  --van-card-font-size: 18px;
}

.time {
  font-size: 15px;
  color: #bdbdbd;
}
</style>
