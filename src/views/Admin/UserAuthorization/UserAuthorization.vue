<template>
  <div class="container">
    <div>
      <div v-if="list">
        <!-- 懒加载、垂直居中、 -->
        <van-card
          v-for="item in list"
          :key="item.id"
          lazy-load
          centered
          @click="goDetail(item.user_id)"
          :desc="item.reason"
          :title="`${item.role === 1 ? '超级管理员' : '管理员'}权限申请`"
        >
          <template #footer>
            <div class="time">申请时间：{{ requestTime(item.created_at) }}</div>
            <div class="no-active" v-if="item.status === 0">待处理</div>
            <div class="active" v-else>已处理</div>
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
</template>

<script setup lang="ts">
import { getPermissionList } from '@/api/admin'
import { requestTime } from '@/utils/util'
const router = useRouter()
let list = ref(undefined)
onMounted(() => {
  getList()
})
const goDetail = (id: number) => {
  router.push({ path: '/userauthorizationdetail', query: { id } })
}
const getList = async () => {
  const res = await getPermissionList()
  list.value = res.data
}
</script>

<style scoped lang="scss">
.container {
  margin: 5px;
}
:deep(.van-card) {
  box-shadow: 0 0 10px rgba(0, -0.5, 0, 0.5);
  border-radius: 10px;
  margin-top: 10px;
}
:deep(.van-card__title) {
  font-size: 18px;
  line-height: 30px;
}
:deep(.van-card__desc) {
  font-size: 16px;
}
:deep(.van-card__footer) {
  font-size: 18px;
  display: flex;
  justify-content: space-between;
}
.time {
  font-size: 15px;
}
.no-active {
  color: red;
}
.active {
  color: green;
}
</style>
