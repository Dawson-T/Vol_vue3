<template>
  <div>
    <form onsubmit="return false">
      <textarea
        v-model="uploadFormData.context"
        class="context"
        id=""
        cols="50"
        rows="10"
        placeholder="快来和大家交流志愿服务心得吧！"
      ></textarea>
      <!-- 
      after-read：回调
      multiple：是否开启图片多选，部分安卓机型不支持
      max-count：最大支持六张照片 
      preview-full-image：支持预览图片
      accept：仅支持图片
      -->
      <van-uploader
        v-model="fileList"
        :after-read="afterRead"
        multiple
        upload-text="选择图片"
        max-count="6"
        accept="image/*"
        preview-full-image
        @delete="deleteImg($event, file)"
      />
      <van-button type="primary" cltype="success" @click="submitForm"
        >发布</van-button
      >
    </form>
  </div>
</template>

<script setup lang="ts">
import { uploadImgData, uploadFormDataFn } from '@/api/ServerApi'
import { showSuccessToast, showFailToast } from 'vant'
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import AhoCorasick from 'ahocorasick'
// 压缩图片函数
import { compressionFile } from '@/utils/util'
const router = useRouter()

const msgMap = {
  sucMsg: '上传成功',
  errMsg: '上传失败',
  beforeInput: '请先输入',
  reUpload: '请勿反复提交',
  errUnknown: '发生未知错误',
}
let fileList = ref([]) // 展示图片上传情况
// 表单数据
let uploadFormData = reactive({
  context: '',
  images: [] as any,
})
let disable = ref(true) // 开启提交按钮

// 提交表单
const submitForm = async () => {
  // 检查是否满足提交条件
  const isReadyToSubmit = disable.value && uploadFormData.context

  if (isReadyToSubmit) {
    // 敏感词过滤和图片处理
    const imageStr = uploadFormData.images.join('|')
    const filteredContext = sensitiveWordsFilter(uploadFormData.context)
    try {
      // 调用上传表单数据函数
      const res = await uploadFormDataFn(
        filteredContext,
        imageStr ? imageStr : undefined
      )
      console.log(res)

      if (res.status === 1) {
        showSuccessToast(msgMap.sucMsg)
        router.push('/community')
      } else {
        showFailToast(res.msg)
      }
    } catch (error) {
      showFailToast(msgMap.errUnknown)
    }
  } else {
    if (!disable) {
      showFailToast(msgMap.reUpload)
    } else {
      showFailToast(msgMap.beforeInput)
    }
  }
}

// 点击上传后的回调
const afterRead = async (file) => {
  try {
    // 压缩图
    const base64 = await compressionFile(file)
    // 不压缩
    // const base64 = file.content
    const res = await uploadImgData(base64)
    uploadFormData.images.push(res.image)
    file.status = 'true'
    file.message = msgMap.sucMsg
  } catch (error) {
    file.status = 'false'
    file.message = msgMap.errMsg
  } finally {
    file.status = 'done'
    file.message = ''
  }
}
// 过滤敏感词 返回过滤后的字符
const sensitiveWordsFilter = (str) => {
  // 需要敏感词汇集，这里仅做测试
  const sensitiveWord: string[] = ['sb', '傻逼', '笨蛋', 'nt', '草']
  let ac = new AhoCorasick(sensitiveWord)

  let results = ac.search(str)
  const newChar = '*'
  let filteredStr = str

  results.forEach((item) => {
    filteredStr =
      filteredStr.substr(0, item[0]) + newChar + filteredStr.substr(item[0] + 1)
  })

  return filteredStr
}

// 取消照片 回调
const deleteImg = (e, file) => {
  console.log(e, file)
}
</script>

<style scoped lang="scss">
.context {
  margin: 5px;
  width: 100%;
  font-family: $globalFontFamily;
  border: none;
  caret-color: blue;
  font-size: 15px;
}
.uploadImg {
  height: 40px;
  width: 100%;
  .items {
    margin-right: 25px;
    height: 40px;
    width: 40px;
  }
}
</style>
@/api/ServerAPI
