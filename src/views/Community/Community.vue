<template>
  <div class="container">
    <van-pull-refresh
      style="min-height: 100vh"
      v-model="isLoading"
      success-text="刷新成功"
      @refresh="onRefresh"
    >
      <van-list
        :immediate-check="false"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="fixed-box" @click="UploadPost">
          <van-icon color="#fff" size="40px" name="plus" />
        </div>
        <!-- 卡片开始 -->
        <div class="card" v-for="item in data.value" :key="item.id">
          <div class="card-header">
            <div class="avatar">
              <img :src="item.avatar" />
            </div>
            <div class="name">{{ item.username }}</div>
            <div class="time">
              {{ formatChatTime(item.created_at) }}
            </div>
          </div>
          <div class="mid-container">
            <div class="card-text">{{ item.context }}</div>
            <div v-if="item.images !== null">
              <van-image
                v-for="(imgUrl, imgIndex) in item.images.split('|')"
                :key="imgIndex"
                @click="preview(item.images.split('|'), imgIndex)"
                width="10rem"
                height="10rem"
                fit="contain"
                radius="10px"
                :src="imgUrl"
                v-lazy="imgUrl"
              >
                <template v-slot:error
                  ><van-icon name="replay" />加载失败</template
                >
              </van-image>
            </div>
          </div>
          <div class="card-footer">
            <div>
              <button style="display: flex; align-items: center" class="like">
                <van-icon
                  name="like-o"
                  size="25px"
                  :class="{ liked: item.islike == 1 }"
                  @click="clickLikes(item.id, $event)"
                />
                <span>{{ item.likes }}</span>
              </button>
            </div>
            <button
              style="display: flex; align-items: center"
              @click="goComments(item.id)"
            >
              <van-icon name="comment-o" size="25px" />
              <span>{{ item.comments }}</span>
            </button>
            <button style="display: flex; align-items: center">
              <van-icon name="share-o" size="25px" /><span>{{
                item.reposts
              }}</span>
            </button>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
import { Image as VanImage, showImagePreview } from 'vant'
import { postLiked, postIsLike, getCommunityData } from '@/api\/ServerAPI'
import {
  requestTime,
  formatChatTime,
  getLocalData,
  setLocalData,
  isLogin,
} from '@/utils/util'
import { ref, reactive, onMounted, toRaw, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const instance = getCurrentInstance()
const isLoading = ref(false)
const loading = ref(false)
const finished = ref(false)
const data = reactive<any>([]) // 装返回的全部数据
const throttle = ref(false) // 下拉刷新的节流阀

onMounted(async () => {
  getLocalCommunityData()
})

// 登录和未登录的接口不同
// const getAuthorizedData = async (time: any, limit: number) => {
//   const getCommunityDataWithAuth = async () => {
//     const authData = await getAuthCommunityData(requestTime(time), limit)
//     console.log(authData)
//     return authData.data
//   }

//   const getCommunityDataWithoutAuth = async () => {
//     const communityData = await getCommunityData(requestTime(time), limit)
//     return communityData.data
//   }
//   if (isLogin()) {
//     return await getCommunityDataWithAuth()
//   } else {
//     return await getCommunityDataWithoutAuth()
//   }
// }

// 获取本地帖子数据(无数据向服务器获取)
const getLocalCommunityData = async () => {
  const communityData = getLocalData('communityData')
  if (communityData) {
    data.value = communityData
  } else {
    let result = await getCommunityData(requestTime(null), 10)
    data.value = result.data
    setLocalData('communityData', toRaw(data).value)
  }
}

// 合并不同ID的数组对象(注意使用Set的问题)
const mergeObjectsByDifferentId = (arr1: any, arr2: any) => {
  let array = [...arr2, ...arr1]
  const result = array.filter((item, index) => {
    const i = array.findIndex((obj) => obj.id === item.id)
    return i === index
  })
  return result
}

// 下拉刷新的回调
const onRefresh = async () => {
  if (!throttle.value) {
    // 开启节流阀
    throttle.value = true
    // 修复下拉获取不到数据问题：
    // 请在页面中获取当前时间再传入dayjs，直接在dayjs中获取的时间是进入页面的时间，下拉刷新请求的时间还是在发布之前的时间
    const time = requestTime(Date())
    let result = await getCommunityData(time, 10)
    result = result.data

    // 响应式数组还原后再传入
    const mergeArray = mergeObjectsByDifferentId(toRaw(data).value, result)

    data.value = mergeArray
    localStorage.setItem('communityData', JSON.stringify(toRaw(data).value))
    isLoading.value = false
    // 关闭节流阀
    throttle.value = false
  }
}
// 触底回调
const onLoad = async () => {
  if (!throttle.value) {
    loading.value = true
    // 获取每条消息的最早时间
    const lastTime = data.value[data.value.length - 1].created_at
    const time = requestTime(lastTime)
    let result = await getCommunityData(time, 10)
    result = result.data
    // 追加过滤相同id的数组对象
    data.value = mergeObjectsByDifferentId(result, toRaw(data).value)
    setLocalData('communityData', toRaw(data).value)
    loading.value = false
    if (result.length === 0) {
      // 数据为空 设置已完成
      finished.value = true
    }
    // 关闭节流阀
    throttle.value = false
  }
}
// 图片缩放比例（4与2相比将ImagePreview更改成showImagePreview，用法基本不变）
const preview = (arr: string[], position: number) => {
  showImagePreview({
    images: arr,
    startPosition: position,
    maxZoom: 3,
    minZoom: 1 / 3,
  })
}

const clickLikes = (id: number, e: any) => {
  if (e.srcElement.classList.contains('liked')) {
    e.srcElement.classList.remove('liked')
    data.value.find((item: any) => {
      if (item.id == id) {
        item.likes--
        postLiked(id)
      }
    })
  } else {
    e.srcElement.classList.add('liked')
    data.value.find((item: any) => {
      if (item.id == id) {
        item.likes++
        postLiked(id)
      }
    })
  }
}
const UploadPost = () => {
  router.push('/uploadpost')
}
const goComments = (id: number) => {
  router.push({ path: '/comment', query: { id } })
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

.card-footer {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 10px;
}

.card-footer .van-icon {
  margin-right: 5px;
}
.card-footer button {
  border-radius: 5px;
  align-items: center;
  border: none;
  padding: 5px 10px;
  font-weight: bold;
  background-color: #fff;
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
  font-weight: bold;
}
.time {
  font-size: 12px;
  color: $globalFontFamily;
  position: absolute;
  top: 35px;
  left: 60px;
}
</style>
@/api/ServerAPI
