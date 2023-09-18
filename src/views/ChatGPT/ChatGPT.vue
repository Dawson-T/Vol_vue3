<template>
  <div class="chat_commento">
    <!-- top -->
    <div class="chat_top">
      <span class="Text">ChatGPT</span>
    </div>
    <!-- line -->
    <div class="line"></div>
    <!-- middle -->
    <div class="chat_middle" id="chat_middle_item" ref="myElement">
      <!-- 左边 -->
      <div v-for="item in dialogData" :key="item.id">
        <van-divider >{{
          formatChatTime(item.time)
        }}</van-divider>
        <div class="chat_left clearfix" v-if="item.type === 1">
          <div class="chat_left_item_1">
            <img src="@/assets/images/gpt.webp" />
          </div>
          <div class="chat_left_item_2">
            <div class="chat_left_content" v-html="item.text"></div>
          </div>
        </div>
        <!--右边 -->
        <div class="chat_right" v-else>
          <div class="chat_right_item_1">
            <img class="avatar" :src="avatar" alt="avatar" />
          </div>
          <div class="chat_right_item_2">
            <div class="chat_right_content">
              {{ item.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- line -->
    <div class="line"></div>
    <!-- foot -->
    <div class="chat_foot">
      <!-- context -->
      <textarea
        class="chat_context"
        id="chat_context_item"
        cols="30"
        rows="10"
        v-model="inputValue"
        placeholder="请提问..."
        ref="input"
      ></textarea>
      <div class="chat_commit" @click="onSendChat" id="button">发送</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showToast } from 'vant'
import { ref, reactive, nextTick, toRaw } from 'vue'
import { formatChatTime } from '@/utils/util'

import { transformMarkdown } from '@/utils/util'
import { getChatGPTAnswer } from '@/api/ServerApi'
import { getLocalData } from '@/utils/util'
let throttle = ref(false) // 节流阀
let avatar = ref('') // 头像
const inputValue = ref('')
const dialogData: Array<any> = reactive([])

// 获取中间对话元素
const myElement = ref<HTMLElement | null>(null)
// 获取输入框
const input = ref<HTMLElement | null>(null)
let user = getLocalData('userinfo')
avatar.value = user ? user.avatar : ''
// type: 2 是自己 1 是AI
let id = 0
let chatDataFormat = (time: number, type: number, text: string) => {
  return {
    time,
    type,
    text,
    id: id++,
  }
}
// 计算超时三分钟
let isShowTime = (id: number) => {
  const timestamp1 = new Date().getTime()
  const temp = dialogData
  //@ts-ignore
  const timestamp2 = toRaw(temp)[0].time

  const timeDifference = Math.abs(timestamp1 - timestamp2)
  const threeMinutesInMilliseconds = 3 * 60 * 1000 // 3分钟的毫秒数
  return timeDifference >= threeMinutesInMilliseconds
}

// 请求数据
let onRequest = (content: string) => {
  return new Promise(async (solve) => {
    if (!user) {
      let buffer = chatDataFormat(
        new Date().getTime(),
        1,
        '请登录后再使用本功能~'
      )
      solve(buffer)
      return
    }
    let key = '97957ed45a4c72ff80fd0776d1472c60'
    console.log(content)

    let result = await getChatGPTAnswer(key, content)
    console.log(result)

    if (result.status == 0) {
      let buffer = chatDataFormat(
        new Date().getTime(),
        1,
        '似乎出了一点问题，请稍后再试...'
      )
      solve(buffer)
      return
    }
    let html = transformMarkdown(result.data)
    let buffer = chatDataFormat(new Date().getTime(), 1, html)
    solve(buffer)
  })
}

let onSendChat = async () => {
  if (handleInput(inputValue) === '') {
    showToast('请输入内容')
    return
  } else {
    const value = inputValue.value
    inputValue.value = ''
    dialogData.push(chatDataFormat(new Date().getTime(), 2, value))
    dialogData.push(
      chatDataFormat(new Date().getTime(), 1, '请稍后，正在思考哟~')
    )

    dialogData.push(await onRequest(value))
    console.log(dialogData)
  }
}

dialogData.push(
  chatDataFormat(
    new Date().getTime(),
    1,
    '你好！~~ 我是智能AI助手，您有任何问题都可以询问我哟，我将尽我所能解决您的问题！'
  )
)
// 默认触底
const pullBottom = async () => {
  await nextTick(() => {
    if (myElement.value) {
      myElement.value.scrollTop = myElement.value.scrollHeight
    }
  })
}

// 去除空格
const handleInput = (text: any) => {
  // 定义正则表达式，匹配是否含有空格和特殊字符
  const pattern = /^[^<>%^&*()+={}|[\]\\]+$/
  // 去除首尾空格
  text = text.value.trim()
  // 返回处理后的字符串
  return text
}
</script>

<style scoped lang="scss">
.chat_commento {
  width: 100%;
  height: 600px;
  margin: auto;
  border-radius: 10px;
  border: 2px solid #f4f5f7;
}
.clearfix {
  &::after {
    content: '';
    display: block;
    clear: both;
    width: 0;
    height: 0;
    line-height: 0;
    visibility: hidden;
  }
}
/* top */
.chat_top {
  width: 100%;
  height: 50px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
  padding-left: 20px;
  font-size: 20px;
  line-height: 50px;
  box-sizing: border-box;
  font-weight: 550;
  border-width: 0px;
  display: inline;
  .Text {
    background: linear-gradient(to right, #ff6b6b, #556270);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
/* middle */
/* 左边 */
.chat_middle {
  width: 100%;
  height: 500px;
  position: relative;
  box-sizing: border-box;
  overflow: auto;
  border-width: 0px;
}
.chat_left {
  width: 100%;
  // height: 100px;
}
.chat_left_item_1 {
  width: 35px;
  height: 35px;
  background-color: #fff;
  float: left;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  line-height: 50px;
  color: white;
  border-radius: 25px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.chat_left_item_2 {
  width: 75%;

  float: left;

  .chat_left_chat {
    float: left;
  }
  .chat_left_content {
    padding: 15px;
    margin-top: 3%;
    background-color: #fff;

    display: inline-block;
    border-radius: 10px;
    border-top-left-radius: 0px;
    width: auto;
    overflow: scroll;
    line-height: 20px;
    font-size: 14px;
  }
}
pre {
  code {
    width: 100%;
  }
  .language-javascript {
  }
}
/* 右边 */
.chat_right {
  width: 100%;
  // min-height: 100px;
}
.chat_right::after {
  content: '';
  display: table;
  clear: both;
}
.chat_right_item_1 {
  width: 35px;
  height: 35px;
  float: right;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  text-align: center;
  line-height: 50px;
  color: white;
  border-radius: 25px;
}
.chat_right_item_2 {
  width: 75%;
  // height: 100px;
  float: right;
  // margin-top: 10px;
}
.chat_right_time {
  width: 100%;
  text-align: right;
}
.chat_right_content {
  float: right;
  padding: 15px;
  border-radius: 10px;
  margin-top: 10px;
  border-top-right-radius: 0px;
  background-color: #be79df;
  color: white;
  max-width: 18rem;
  overflow: scroll;
  line-height: 20px;
  font-size: 14px;
}
.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
/* foot */
.chat_foot {
  width: 100%;
  height: 120px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  position: relative;
}
.chat_context {
  width: 100%;
  height: 100%;
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
</style>
@/api/ServerAPI
