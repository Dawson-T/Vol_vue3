<template>
  <div class="feedback-container">
    <van-form @submit="onSubmit">
      <div class="textarea-wrapper">
        <textarea
          class="textarea"
          placeholder="请输入您的建议"
          v-model="successMSg"
        ></textarea>
      </div>
      <van-field name="switch" label="匿名提交">
        <template #input>
          <van-switch v-model="switchChecked" size="20" />
        </template>
      </van-field>

      <div v-if="!switchChecked">
        <van-field
          v-model="contact"
          name="联系方式"
          label="联系方式"
          placeholder="请输入您的联系方式"
          colon
          :rules="[{ pattern, required: true, message: '最大输入16位' }]"
        />
      </div>

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { feedBackPost } from '@/api/ServerApi'
import { showSuccessToast, showFailToast } from 'vant'
const pattern = /^.{0,16}$/
let isPost = ref(false)
let successMSg = ref('')
let switchChecked = ref(0)
let contact = ref('')

const onSubmit = async () => {
  if (!isPost.value) {
    if (switchChecked.value) {
      contact.value = ''
    }
    const option = {
      contact: contact.value,
      hasct: Number(switchChecked.value),
      context: successMSg.value,
    }

    try {
      const res = await feedBackPost(option)
      if (res.status) {
        showSuccessToast(res.msg)
        contact.value = ''
        successMSg.value = ''
      } else {
        showSuccessToast(res.msg)
      }
    } catch {
      showSuccessToast('未知错误！')
    }
  }
}
</script>

<style scoped lang="scss">
.feedback-container {
}
.textarea-wrapper {
  position: relative;
  margin: 20px 0;
}

.textarea {
  display: block;
  width: 100%;
  height: 5rem;
  padding: 0.6rem;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  caret-color: #409eff;
}
.textarea:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}
.van-button {
  background-image: linear-gradient(to right, #bc95c6 0%, #7dc4cc 100%);
}
</style>
@/api/ServerAPI
