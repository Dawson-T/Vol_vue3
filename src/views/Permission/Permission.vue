<template>
  <div class="container">
    <van-form @submit="onSubmit">
      <van-field
        readonly
        clickable
        label="申请权限"
        placeholder="请选择"
        required
        :rules="[{ required: true, message: '请选择权限' }]"
        v-model="valueData"
        size="large"
        @click="showPicker = true"
      />
      <van-popup v-model:show="showPicker" round position="bottom">
        <van-picker
          title="权限组"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-popup>
      <van-field
        v-model="message"
        :rules="[{ required: true, message: '请填写申请理由' }]"
        rows="2"
        autosize
        size="large"
        label="申请理由"
        required
        type="textarea"
        maxlength="50"
        placeholder="请输入理由"
        show-word-limit
      />
      <div style="margin: 10px">
        <van-button round block type="primary" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">
import { ApplyPermission } from '@/api/user'
import { showSuccessToast, showFailToast } from 'vant'
let valueData = ref('')
let showPicker = ref(false)
let message = ref('')
const columns = reactive([
  { text: '超级管理员', value: '超级管理员' },
  { text: '管理员', value: '管理员' },
])

const msg = {
  errMsg: '申请失败',
  sucMsg: '申请成功',
}

interface PermissionMapping {
  [key: string]: number
}

const permissionMapping: PermissionMapping = {
  超级管理员: 1,
  管理员: 2,
}

const onCancel = () => {
  showPicker.value = false
}
const onConfirm = ({ selectedOptions }: any) => {
  valueData.value = selectedOptions[0].text
  showPicker.value = false
}

const onSubmit = async () => {
  const selectedPermission = permissionMapping[valueData.value]
  if (selectedPermission !== undefined) {
    let { status: res } = await ApplyPermission(
      selectedPermission,
      message.value
    )
    if (res == 1) {
      showSuccessToast(msg.sucMsg)
      message.value = ''
      valueData.value = ''
    } else {
      showFailToast(msg.errMsg)
    }
  } else {
    showFailToast(msg.errMsg)
  }
}
</script>
<style scoped lang="scss">
.container {
  margin: 10px;
}
.van-button {
  background-image: linear-gradient(to right, #bc95c6 0%, #7dc4cc 100%);
}
</style>
