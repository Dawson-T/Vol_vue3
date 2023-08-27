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
import { ref, reactive } from 'vue'
import { ApplyPermission } from '@/api/user'
import { showSuccessToast, showFailToast } from 'vant'
let valueData = ref('')
let showPicker = ref(false)
let message = ref('')
const columns = reactive([
  { text: '超级管理员', value: '超级管理员' },
  { text: '管理员', value: '管理员' },
])
const onCancel = () => {
  showPicker.value = false
}
const onConfirm = ({ selectedOptions }: any) => {
  valueData.value = selectedOptions[0].text
  showPicker.value = false
}

const onSubmit = async () => {
  if (valueData.value == '超级管理员') {
    let { status: res } = await ApplyPermission(1, message.value)
    if (res == 1) {
      showSuccessToast('申请成功')
      message.value = ''
      valueData.value = ''
    } else {
      showFailToast('申请失败！')
    }
  } else if (valueData.value == '管理员') {
    let { status: res } = await ApplyPermission(2, message.value)
    if (res == 1) {
      showSuccessToast('申请成功')
      message.value = ''
      valueData.value = ''
    } else {
      showFailToast('申请失败！')
    }
  } else {
    showFailToast('申请失败！')
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
