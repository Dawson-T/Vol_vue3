<template>
  <div class="container">
    <van-dropdown-menu active-color="#1989fa">
      <van-dropdown-item v-model="value1" :options="option1" />
    </van-dropdown-menu>
    <!-- 全部用户 -->
    <div v-if="value1 === 0">
      <InfoCard
        v-for="item in list"
        :key="item.id"
        :avatar="item.avatar"
        :name="item.name"
        :permissions="item.role ? item.role : ''"
        :onButtonClick="onButtonClick"
        :id="item.id"
        :gender="item.gender ? 'pink' : 'skyblue'"
      />
    </div>
    <!-- 管理员用户 -->
    <div v-else>
      <InfoCard
        v-for="item in AdminList"
        :key="item.id"
        :avatar="item.avatar"
        :name="item.name"
        :permissions="
          item.role ? (item.role == 1 ? '超级管理员' : '管理员') : ''
        "
        :onButtonClick="onButtonClick"
        :gender="item.gender ? 'pink' : 'skyblue'"
        :id="item.id"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import InfoCard from '@/components/UserInfoCard/UserInfoCard.vue'
import { useStore } from '@/stores'
import { storeToRefs } from 'pinia'
const adminUserInfo = useStore().adminUserInfo
let value1 = ref(0)
let option1 = reactive([
  { text: '全部用户', value: 0 },
  { text: '管理员', value: 1 },
])
let { AdminList, list } = storeToRefs(adminUserInfo)
onMounted(() => {
  adminUserInfo.GetData()
  adminUserInfo.GetManageData()
})
const onButtonClick = () => {}
</script>

<style scoped lang="scss">
.container {
  margin: 5px;
  min-height: 100px;
  width: 100%;
}
</style>
