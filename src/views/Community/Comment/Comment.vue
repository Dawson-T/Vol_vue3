<template>
  <div class="container">
    <!-- 卡片开始 -->
    <div class="card" v-for="item in data" :key="item.id">
      <div class="card-header">
        <div class="avatar">
          <img :src="item.avatar" />
        </div>
        <div class="name">{{ item.username }}</div>
        <div class="time">
          {{ requestTime(item.updated_at) }}
        </div>
      </div>

      <div class="mid-container">
        <div class="card-text">{{ item.context }}</div>
        <!-- 单图 -->
        <div v-if="item.images !== ''">
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
      <div class="card-footer">
        <button
          :ref="`likeDiv${item.id}`"
          @click="clickLikes(item.id)"
          style="display: flex; align-items: center"
          class="like"
        >
          <van-icon name="like-o" size="25px" />
          <span>{{ ` ${item.likes}` }}</span>
        </button>
        <button
          style="display: flex; align-items: center"
          class="chat"
          @click="goComments(item.id)"
        >
          <van-icon name="comment-o" size="25px" />
          <span>{{ ` ${item.comments}` }}</span>
        </button>
        <button style="display: flex; align-items: center" class="share">
          <van-icon name="share-o" size="25px" /><span>{{
            ` ${item.reposts}`
          }}</span>
        </button>
      </div>
    </div>
    <div class="comment-content">
      <!-- 评论区域 -->
      <div class="title-container"><span class="title">评论区</span></div>
      <div class="comment-card" v-for="(item, index) in comments" :key="index">
        <div class="card-header">
          <div class="avatar avatar-comment">
            <img :src="item.avatar" />
          </div>
          <div class="name">{{ item.username }}</div>
          <div class="time">
            {{ requestTime(item.updated_at) }}
          </div>
          <van-button @click="replay(item.id)" class="replay">回复</van-button>
        </div>
        <div class="comment-context">{{ item.context }}</div>
      </div>
      <div style="height: 8rem"></div>
      <div class="chat_foot">
        <!-- context -->
        <van-sticky :offset-top="60">
          <textarea
            class="chat_context"
            id="chat_context_item"
            cols="20"
            rows="10"
            v-model="context"
            placeholder="输入你想评论的内容"
            ref="input"
          ></textarea>

          <div class="chat_commit" @click="commit" id="button">发送</div>
        </van-sticky>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Image as VanImage,
  showToast,
  showSuccessToast,
  showFailToast,
} from 'vant'
import {
  postLiked,
  postIsLike,
  GetCommentsData,
  PostCommentsData,
} from '@/api/ServerApi'
import { requestTime, getLocalData } from '@/utils/util'
const route = useRoute()
const id = ref(0)
let data = ref([])
let comments = ref([])
let context = ref('')
const input = ref<HTMLInputElement | null>(null)
onMounted(() => {
  // 使用类型转换和处理可能为null的情况
  id.value = Number(route.query.id || 0)
  setCurrentData()
  GetComments()
})
// 设置当前页的内容
const setCurrentData = () => {
  const array = getLocalData('communityData')
  array.forEach((item) => {
    if (item.id == id.value) {
      data.value.push(item)
      return
    }
  })
}
// 获取评论信息
const GetComments = () => {
  GetCommentsData(id.value).then((res) => {
    res.data.forEach((item) => {
      comments.value.unshift(item)
    })
  })
}
// 聚焦键盘
const replay = (id: number) => {
  // 将光标置于输入框中
  nextTick(() => {
    input.value?.focus()
    // 打开键盘
    input.value?.select()
  })
}
// 评论发送
const commit = () => {
  const option = {
    post_id: id.value,
    context: context.value,
  }
  context.value = ''
  PostCommentsData(option).then((res) => {
    if (res.status == 1) {
      showSuccessToast(res.msg)
      GetComments()
    } else {
      showFailToast(res.msg)
    }
  })
}
// 点赞
const clickLikes = () => {
  showToast('点赞功能正在维护')
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
}
.card-header {
  display: flex;
  line-height: 20px;
  padding: 10px;
  position: relative;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.mid-container {
  width: 90%;
  padding: 10px;
  .card-text {
    font-size: 14px;
    font-family: $globalFontFamily;
  }
}
.name {
  font-weight: bold;
}
.card-image {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  .van-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    margin-right: 5px;
  }
}
.van-image {
  margin-right: 5px;
}
.card-footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
  .van-icon {
    margin-right: 5px;
  }
  button {
    border-radius: 5px;
    align-items: center;
    border: none;
    padding: 5px 10px;
    font-weight: bold;
    background-color: #fff;
  }
}
.fixed-box {
  z-index: 10;
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 60px;
  height: 60px;
  background-color: #ff292c;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, -0.5, 0, 0.5);
}
/* 爱心变红 */
.liked {
  color: red;
}
.time {
  font-size: 10x;
  position: absolute;
  top: 35px;
  left: 60px;
}
/* 回复 */
.replay {
  position: absolute;
  right: 20px;
  top: 20px;
}
/* 评论区域 */
.title-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
}
.title {
  font-size: 20px;
}
.comment-content {
  min-height: 100px;
  width: 100%;
  border-radius: 10px;
}
.comment-card {
  padding: 10px;
  min-height: 100px;
  width: 100%;
  border-radius: 10px;
  margin-top: 10px;
  background-color: #fff;
}
.comment-context {
  padding: 10px;
}
.chat_foot {
  width: 100%;
  height: 120px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: fixed;
  bottom: 0px;
}
.chat_context {
  width: 100%;
  height: 100px;
  font-size: 17px;
  box-sizing: border-box;
  outline: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border-radius: 10px;
  border-width: 0px;
  padding: 16px;
  resize: none;
  &::placeholder {
    color: black;
    font-weight: 500k;
  }
}
.chat_commit {
  width: 80px;
  height: 30px;
  color: white;
  background-color: #be79df;
  line-height: 30px;
  text-align: center;
  border-radius: 5px;
  position: absolute;
  right: 10px;
  bottom: 50px;
  margin-right: 10px;
}
.line {
  width: 100%;
  border-top: 1px;
  border-color: #f4f5f7;
  border-style: solid;
}
.loading {
  z-index: 1;
  display: inline;
}
</style>
@/api/ServerAPI
