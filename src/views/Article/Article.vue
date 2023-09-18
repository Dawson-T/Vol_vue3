<template>
  <div class="container">
    <article v-if="list.length == 0">
      <h1>重庆工商大学人工智能学院“小红帽”常青藤青年志愿者服务队</h1>
      <p>发布日期: 2023-09-12</p>
      <van-divider />
      <div class="content" v-html="richText"></div>
    </article>
    <!-- 骨架屏 -->
    <ArticleView v-else />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef, onBeforeUnmount } from 'vue'
import { transformMarkdown } from '@/utils/util'
import ArticleView from '@/components/ArticleView/ArticleView.vue'
let list = ref([])
let richText = ref('<p>hello</p>')
let loading = ref(true)
const editorRef = shallowRef()
onMounted(() => {
  setTimeout(() => {
    richText.value =
      '<p>模拟 Ajax 异步设置内容</p><br/><p>模拟 Ajax 异步设置内容</p><br/><p>模拟 Ajax 异步设置内容</p><br/><p>模拟 Ajax 异步设置内容</p><br/><p>模拟 Ajax 异步设置内容</p><br/><p>模拟 Ajax 异步设置内容</p><br/><p>模拟 Ajax 异步设置内容</p><br/><p>模拟 Ajax 异步设置内容</p><br/>'
  }, 1500)
})
</script>

<style scoped lang="scss">
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

.content {
}
</style>
