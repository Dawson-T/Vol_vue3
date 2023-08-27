<template>

<van-notice-bar
    scrollable
    left-icon="volume-o"
    :text="text || '正在加紧开发中'"
  />

</template>

<script setup lang='ts'>
import { NoticeBar } from 'vant'
defineProps(['text'])
</script>

<style scoped >
</style>