<template>
  <div class="container">
    <article v-if="loading">
      <h1 v-html="richTextTitle"></h1>
      <p>发布日期: {{ requestTime(richTextTime) }}</p>
      <van-divider />
      <Editor
        id="wangEditor"
        mode="default"
        style="min-height: 301px; overflow-y: hidden"
        @onCreated="handleCreated"
        :defaultConfig="editorConfig"
        v-model="richTextContent"
      />
    </article>
    <!-- 骨架屏 -->
    <ArticleView v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue'
import ArticleView from '@/components/ArticleView/ArticleView.vue'
import ServerAPIs from '@/api/ServerAPI'
import { Editor } from '@wangeditor/editor-for-vue'
import { requestTime } from '@/utils/util'
import type { IEditorConfig } from '@wangeditor/editor'
import { useRoute } from 'vue-router'
const route = useRoute()

// 初始化 MENU_CONF 属性
const editorConfig: Partial<IEditorConfig> = {
  // TS 语法
  // const editorConfig = {                       // JS 语法
  MENU_CONF: {},
  // 其他属性...
}
let richTextObj = ref({ detail: '', title: '', created_at: '' })
let richTextTitle = ref('')
let richTextContent = ref('')
let richTextTime = ref('')
let loading = ref(false)
editorConfig.MENU_CONF['lineHeight'] = {
  lineHeightList: ['2.5'],
}
editorConfig.MENU_CONF['emotion'] = {
  emotions: '😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉'.split(' '), // 数组
}
editorConfig.MENU_CONF['fontFamily'] = { fontFamilyList: ['Tahoma'] }
const editorRef = shallowRef()
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  editor.disable()
}

onMounted(() => {
  getArticleDetailData()
})
// 获取文章详情
const getArticleDetailData = async () => {
  const id = route.query.id
  const res = await ServerAPIs.getArticleDetail(id)

  if (res.status === 1) {
    richTextObj.value = res.data
    richTextContent.value = richTextObj.value.detail
    richTextTitle.value = richTextObj.value.title
    richTextTime.value = richTextObj.value.created_at
    loading.value = true
  }
}
</script>

<style scoped>
header {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px 0;
}
.container {
  width: 100vw;
  min-height: 100vh;
  margin: 0 auto;
  padding: 5px;
  background-color: #fff;
  box-shadow: 0 2px 5px #ccc;
}
h1 {
  font-size: 18px;
}
p {
  font-size: 14px;
  line-height: 1.6;
}

:deep(#wangEditor .w-e-image-container img) {
  width: 100vw;
}
.content {
}
</style>
