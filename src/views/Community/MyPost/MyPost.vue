<template>
  <div v-if="myPost.length !== 0">
    <div class="card" v-for="item in myPost" :key="item.id">
      <div class="card-header">
        <div class="avatar">
          <img :src="item.avatar" />
        </div>
        <!-- 删除 -->
        <div class="name">{{ item.username }}</div>
        <div class="time">
          {{ formatChatTime(item.updated_at) }}
        </div>
        <div @click="deleteCard(item.id)" class="fix">
          <van-icon size="25px" name="delete-o" />
        </div>
        <!-- 修改更新 -->
        <div @click="changeCard(item.id)" class="change">
          <van-icon size="25px" name="setting" />
        </div>
      </div>
      <div class="mid-container">
        <div class="card-text">{{ item.context }}</div>
        <!-- 单图 -->
        <div class="img-container" v-if="item.images !== null">
          <van-image
            v-for="(imgUrl, imgIndex) in item.images.split('|')"
            :key="imgIndex"
            @click="preview(item.images.split('|'), imgIndex)"
            width="10rem"
            height="10rem"
            fit="contain"
            radius="10px"
            :src="imgUrl"
          >
            <template v-slot:error><van-icon name="replay" />加载失败</template>
          </van-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStore } from '@/stores'
import { showConfirmDialog, showSuccessToast, showFailToast } from 'vant'
import { formatChatTime } from '@/utils/util'
const community = useStore().community
const { myPost } = storeToRefs(community)
onMounted(() => {
  community.getMyPost()
})
// 删除帖子
const deleteCard = (id) => {
  showConfirmDialog({
    title: '警告',
    message: '您确认要删除帖子吗？',
  })
    .then(async () => {
      // on confirm
      const res = await community.deleteMyPost(id)
      if (res) {
        showSuccessToast('删除成功！')
        community.getMyPost()
      } else {
        showFailToast('删除失败！')
      }
    })
    .catch(() => {
      // on cancel
    })
}
</script>

<style scoped lang="scss">
.container {
  margin: 8px;
}
.card {
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr auto;
  margin-bottom: 15px;
  position: relative;
}

.card-header {
  display: flex;
  /* align-items: center; */
  line-height: 20px;
  padding: 10px;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
}

.mid-container {
  width: 90%;
  padding: 10px;
}
.mid-container .card-text {
  font-size: 14px;
  font-family: $globalFontFamily;
  margin-bottom: 2px;
}
.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.name {
  font-family: $globalFontFamily;
}

.card-image {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.van-image {
  margin-right: 5px;
}

.card-image .van-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  margin-right: 5px;
}
.time {
  font-size: 12px;
  color: $globalFontFamily;
  position: absolute;
  top: 35px;
  left: 60px;
}
.fix {
  margin-left: 35vw;
  padding-right: 1vw;
}
</style>
