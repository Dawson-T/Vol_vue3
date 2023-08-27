<template>
  <div>
    <h1 class="title">
      <van-icon name="arrow-left" @click="back" class="back" />
    </h1>
    <form onsubmit="return false">
      <textarea
        class="context"
        id=""
        cols="50"
        rows="10"
        placeholder="请务必发布清晰照片，指明拾取或遗失位置"
        v-model="option.context"
      ></textarea>
      <!-- 
      after-read：回调
      multiple：是否开启图片多选，部分安卓机型不支持
      max-count：最大支持六张照片 
      preview-full-image：支持预览图片
      accept：仅支持图片
      -->
      <van-uploader
        v-model="option.images"
        :after-read="afterRead"
        multiple
        upload-text="选择图片"
        max-count="6"
        accept="image/*"
        preview-full-image
      />

      <van-button type="primary" @click="submitForm">发布</van-button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
</script>

<style scoped></style>
