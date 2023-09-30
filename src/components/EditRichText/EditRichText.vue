<template>
  <div style="border: 2px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <div class="title_container">
      <input
        type="text"
        placeholder="标题"
        class="title"
        style="height: 50px; overflow-y: hidden"
        v-model="titleValueHtml"
      />
    </div>

    <hr />
    <Editor
      style="height: 100vh; overflow-y: hidden"
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script lang="ts" setup>
import '@wangeditor/editor/dist/css/style.css' // 引入 css
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { SlateElement, IEditorConfig } from '@wangeditor/editor'
import { compressionFile, getLocalData, setLocalData } from '@/utils/util'
import utils from '@/utils/util'
import {
  uploadImgData,
  getArticleDraft,
  updateArticleDraft,
  publishArticle,
} from '@/api/ServerAPI'
import { showFailToast, showSuccessToast } from 'vant'
type ImageElement = SlateElement & {
  src: string
  alt: string
  url: string
  href: string
  style: object
}
// 初始化 MENU_CONF 属性
let editorConfig: Partial<IEditorConfig> = {
  MENU_CONF: {},
  placeholder: '请输入内容...',
}
const mode = 'default'
let titleValueHtml = ref('')
let valueHtml = ref('')
let props = defineProps({
  // 封面照片
  imgSrc: {
    type: String,
    default: '',
  },
  // 摘要
  abstract: {
    type: String,
    default: '',
  },
})

onMounted(() => {
  getArticleDraftData()
})
const getArticleDraftData = async () => {
  const res = await getArticleDraft(1)
  console.log(res)
  titleValueHtml.value = res.data.title
  valueHtml.value = res.data.detail
}
// 更新草稿
const updateArticleDraftData = async () => {
  let option = {
    title: titleValueHtml.value,
    img: props.imgSrc,
    intro: props.abstract,
    detail: valueHtml.value,
  }
  let newOption = utils.removeEmptyProperties(option)
  const res = await updateArticleDraft(newOption)
  if (res.status === 1) {
    showSuccessToast('保存成功')
  }
}
// 发布文章
const publishArticleData = async () => {
  let option = {
    title: titleValueHtml.value,
    img: props.imgSrc,
    intro: props.abstract,
    detail: valueHtml.value,
  }
  // let newOption = utils.removeEmptyProperties(option)
  const res = await publishArticle(option)

  if (res.status === 1) {
    showSuccessToast('发布成功')
  } else {
    showFailToast('请将信息补充完整')
  }
}
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const toolbarConfig = {}
let newBase64 = ''
let url = ''
let alt = '图片'
let href = ''
// 自定义校验图片
function customCheckImageFn(
  src: string,
  alt: string,
  url: string
): boolean | undefined | string {
  if (!src) {
    return
  }
  if (src.indexOf('http') !== 0) {
    return '图片网址必须以 http/https 开头'
  }
  return true
  // 返回值有三种选择：
  // 1. 返回 true ，说明检查通过，编辑器将正常插入图片
  // 2. 返回一个字符串，说明检查未通过，编辑器会阻止插入。会 alert 出错误信息（即返回的字符串）
  // 3. 返回 undefined（即没有任何返回），说明检查未通过，编辑器会阻止插入。但不会提示任何信息
}
onMounted(() => {})
// 转换图片链接
function customParseImageSrc(src: string): string {
  if (src.indexOf('http') !== 0) {
    return `http://${src}`
  }
  return src
}
// 插入图片
editorConfig.MENU_CONF['insertImage'] = {
  onInsertedImage(imageNode: ImageElement | null) {
    console.log(imageNode)

    if (imageNode == null) return
    const { src, alt, url, href, style } = imageNode
    console.log(style)
  },
  checkImage: customCheckImageFn, // 也支持 async 函数
  parseImageSrc: customParseImageSrc, // 也支持 async 函数
}
// 编辑图片
editorConfig.MENU_CONF['editImage'] = {
  onUpdatedImage(imageNode: ImageElement | null) {
    if (imageNode == null) return
    const { src, alt, url } = imageNode
  },
  checkImage: customCheckImageFn, // 也支持 async 函数
  parseImageSrc: customParseImageSrc, // 也支持 async 函数
}
// 自定义上传
editorConfig.MENU_CONF['uploadImage'] = {
  async customUpload(file: File, insertFn: InsertFnType) {
    // file 即选中的文件
    // 自己实现上传，并得到图片 url alt href
    const fileName = file.name
    function blobToBase64(blob: File, callback: any) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        callback(reader.result)
      })
      reader.readAsDataURL(blob)
    }
    // 定义回调函数，以处理Base64编码的数据
    async function handleBase64Result(base64Data: Blob) {
      // 在这里进行进一步处理，将其发送到服务器
      newBase64 = await compressionFile(fileName, base64Data)
      const res = await uploadImgData(newBase64)
      url = res.image
      // 最后插入图片
      insertFn(url, alt, href)
    }
    // 转换Blob,并压缩图片
    blobToBase64(file, handleBase64Result)
  },
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}
defineExpose({
  updateArticleDraftData,
  getArticleDraftData,
  publishArticleData,
})
</script>

<style lang="scss" scoped>
.title_container {
  display: flex;
  justify-content: center;
  width: 100%;
}
.title {
  // margin: auto auto;
  border: none;
}
</style>
