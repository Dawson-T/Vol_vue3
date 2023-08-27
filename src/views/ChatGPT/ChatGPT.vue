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
      <div v-for="(item, index) in Message" :key="index">
        <div class="chat_left clearfix" v-if="item.isbot">
          <div class="chat_left_item_1">
            <img src="@/assets/images/gpt.webp" />
          </div>
          <div class="chat_left_item_2">
            <div class="chat_time">{{ item.time }}</div>
            <div class="chat_left_content" v-html="item.msg"></div>
          </div>
        </div>
        <!--右边 -->
        <div class="chat_right" v-else>
          <div class="chat_right_item_1">
            <img class="avatar" :src="avatar" alt="avatar" />
          </div>
          <div class="chat_right_item_2">
            <div class="chat_right_time">{{ item.time }}</div>
            <div class="chat_right_content">
              {{ item.msg }}
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
        v-model="context"
        placeholder="请提问..."
        ref="input"
      ></textarea>

      <div class="chat_commit" @click="commit" id="button">发送</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showToast, Loading } from 'vant'
import { ref, reactive, nextTick, onMounted, onUnmounted } from 'vue'
import { currentChatTime } from '@/utils/util'
import axios from 'axios'
import { transformMarkdown } from '@/utils/util'

let chat_context_item = ref(null)
let context = ref('')
let Message = reactive([])
let botMessage = reactive([])
let throttle = ref(false) // 节流阀
let avatar = ref('') // 头像
let inputTop = ref(0) // 输入框距离页面顶部的距离
let keyboardHeight = ref(0) // 软键盘的高度
import { showLoadingToast, closeToast } from 'vant'
// 获取中间对话元素
const myElement = ref<HTMLElement | null>(null)
// 获取输入框
const input = ref<HTMLElement | null>(null)

onMounted(() => {
  // 获取本地头像、聊天记录
  getLocalData()
})
onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})

// 从本地获取页面信息
// chatall所有对话内容用于页面展示，chatbot是用户和AI的对话用于请求
const getLocalData = () => {
  const chatAll = localStorage.getItem('chatall')
  const ChatAllData = chatAll ? JSON.parse(chatAll) : []
  const botMsg = localStorage.getItem('chatbot')
  const botData = botMsg ? JSON.parse(botMsg) : []
  const userInfo = localStorage.getItem('userinfo')
  if (userInfo) {
    avatar = JSON.parse(userInfo).avatar
  }
  if (chatAll) {
    ChatAllData.forEach((e) => {
      //@ts-ignore
      Message.push(e)
    })
    if (botMsg) {
      botData.forEach((e) => {
        //@ts-ignore
        botMessage.push(e)
      })
    }
    pullBottom()
    window.addEventListener('resize', onResize)
  }
}

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

const onFocus = () => {
  // 获取输入框距离页面顶部的距离
  if (input.value) {
    inputTop.value = input.value.getBoundingClientRect().top
  }
}

const onResize = () => {
  // 获取窗口可见区域的高度
  const windowHeight =
    document.documentElement.clientHeight || window.innerHeight
  if (input.value) {
    // 计算软键盘的高度
    keyboardHeight.value =
      windowHeight - inputTop.value - input.value.offsetHeight
  }
}

// 机器人回复
const botReturn = async () => {
  let flag
  // 设置API请求URL
  const apiUrl = 'https://api.openai.com/v1/chat/completions'

  // 设置请求参数
  const params = {
    model: 'gpt-3.5-turbo',
    messages: botMessage.slice(-3),
    max_tokens: 500,
    temperature: 0.5,
    stream: true, // 流式输出
  }
  const LocalOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer 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',
    },
    timeout: 10000, // 超时时间
  }
  axios
    .post(apiUrl, params, LocalOptions)
    .then((res) => {
      if (res.status === 200) {
        const obj = {
          role: 'assistant',
          content: res.data.choices[0].message.content,
        }
        // @ts-ignore
        // AI回答内容
        botMessage.push(obj)
        // 转成markdown
        const result = transformMarkdown(res.data.choices[0].message.content)
        // 一条AI回答数据
        const option = {
          isbot: true,
          time: currentChatTime(),
          msg: result,
        }
        //@ts-ignore
        Message.push(option)

        pullBottom()
        throttle.value = false
      }
      localStorage.setItem('chatbot', JSON.stringify(botMessage))
      localStorage.setItem('chatall', JSON.stringify(Message))
    })
    .catch(() => {
      const option = {
        isbot: true,
        time: currentChatTime(),
        msg: '似乎出了一点问题，请稍后再试...',
      }
      closeToast()
      //@ts-ignore
      Message.push(option)
      pullBottom()
      throttle.value = false
      localStorage.setItem('chatbot', JSON.stringify(botMessage))
      localStorage.setItem('chatall', JSON.stringify(Message))
    })
}

// 提交
const commit = () => {
  if (!throttle.value) {
    const toast = showLoadingToast({
      message: '请稍后，AI正在思考~',
      duration: 0,
      forbidClick: true,
    })
    const option = {
      isbot: false,
      time: currentChatTime(),
      msg: handleInput(context),
    }
    if (option.msg === '') {
      showToast('请输入内容')
      return
    }
    throttle.value = true

    //@ts-ignore
    Message.push(option)
    const botMsg = { role: 'user', content: option.msg }
    //@ts-ignore
    botMessage.push(botMsg)
    pullBottom()
    context.value = ''
    botReturn()
  }
}
</script>

<style scoped lang="scss">
.chat_commento {
  width: 100%;
  height: 600px;
  margin: auto;
  border-radius: 10px;
  border: 2px solid #f4f5f7;
  background-color: #f7f9fb;
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
  min-height: 120px;
  margin-top: 20px;
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
  width: 55%;
  min-height: 100px;
  float: left;
  margin-top: 10px;
  .chat_left_chat {
    float: left;
  }
  .chat_left_content {
    padding: 15px;
    margin-top: 10px;
    background-color: #f4f5f7;
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
  height: 120px;
  margin-top: 20px;
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
  width: 55%;
  height: 100px;
  float: right;
  margin-top: 10px;
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
  max-width: 230px;
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
