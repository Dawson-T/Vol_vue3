<template>
  <div v-if="user">
    <InfoCard
      :avatar="user.avatar"
      :name="user.name"
      :permissions="
        user.role ? (user.role == 1 ? '超级管理员' : '管理员') : '普通用户'
      "
      :id="user.id"
      :gender="user.gender ? 'pink' : 'skyblue'"
      :onButtonClick="onButtonClick"
    />
    <van-form @submit="permission">
      <van-field
        readonly
        clickable
        label="权限授权"
        placeholder="请选择"
        required
        :rules="[{ required: true, message: '请选择权限' }]"
        v-model="valueData"
        size="large"
        @click="showPicker = true"
      />
      <!-- 注意！ ！ ！vant2->vant4  v-model="showPicker"->v-model:show="showPicker" -->
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker
          title="权限组"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-popup>

      <div style="margin: 10px">
        <van-button round block type="primary" native-type="submit"
          >授权</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { showToast } from 'vant'
let showPicker = ref(false)
let valueData = ref('')
import InfoCard from '@/components/UserInfoCard/UserInfoCard.vue'
import { useStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { showSuccessToast, showFailToast } from 'vant'
const route = useRoute()
const router = useRouter()
const adminUserInfo = useStore().adminUserInfo
const { user } = storeToRefs(adminUserInfo)
// [
//       { text: '杭州', value: 'Hangzhou' },
//       { text: '宁波', value: 'Ningbo' },
//       { text: '温州', value: 'Wenzhou' },
//       { text: '绍兴', value: 'Shaoxing' },
//       { text: '湖州', value: 'Huzhou' },
//     ]
// 注意！ ！ ！vant2->vant4 必须用 对象数组 格式 ,text和value必传
// https://vant-contrib.gitee.io/vant/#/zh-CN/picker
const columns = reactive([
  { text: '超级管理员', value: '超级管理员' },
  { text: '管理员', value: '管理员' },
  { text: '普通用户', value: '普通用户' },
])
const id = route.query.id
onMounted(() => {
  adminUserInfo.getUserData(id)
})
const permission = async () => {
  let result = await adminUserInfo.setPermission(valueData, id)
  if (result == 1) {
    showSuccessToast('操作成功！')
    router.push({ path: '/userinfo' })
  } else {
    showFailToast('操作失败！')
  }
}
const onConfirm = ({ selectedOptions }: any) => {
  valueData.value = selectedOptions[0].text
  showPicker.value = false
}

const onCancel = () => {
  showToast('取消')
  showPicker.value = false
}
const onButtonClick = () => {}
</script>

<style scoped></style>
