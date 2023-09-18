<template>
  <div class="container" ref="container">
    <div ref="allHeight">
      <div class="bgc-img" ref="bgc_img">
        <img :src="activity.img" alt="" />
      </div>
      <div class="content">
        <div class="card-body" ref="content">
          <div class="tip">{{ activity.duration ? '进行中' : '已结束' }}</div>
          <div class="card-title">
            <h1>{{ activity.title }}</h1>
          </div>
          <div class="card-content">
            <div><span>活动地点：</span>{{ activity.place }}</div>
            <div><span>征集范围：</span>{{ activity.scope }}</div>
            <div><span>征集人数：</span>{{ activity.number }}</div>
            <div><span>发布单位：</span>{{ activity.publisher }}</div>
            <div>
              <span>活动日期：</span>{{ requestTime(activity.start) }}至{{
                requestTime(activity.end)
              }}
            </div>
            <div><span>志愿时长：</span>{{ activity.duration }}</div>
            <div><span>联系人：</span>{{ activity.contact }}</div>
            <div><span>联系方式：</span>{{ activity.contact_way }}</div>

            <div><span>活动说明：</span>{{ activity.detail }}</div>
            <div><span>活动规则：</span>{{ activity.rule }}</div>
          </div>
        </div>
      </div>

      <van-button
        ref="button_sign"
        round
        :class="isDisable ? 'disable' : 'able'"
        size="large"
        type="primary"
        :disabled="isDisable"
        @click="ClickSignUp()"
        >{{ isDisable ? '已报名' : '个人报名' }}
      </van-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { isSignUp, SignUp } from '@/api/ServerApi'
import { useRoute } from 'vue-router'
import { getLocalData } from '@/utils/util'
import { requestTime } from '@/utils/util'
import { showSuccessToast, showFailToast } from 'vant'
const route = useRoute()
let activity = ref({})
let isDisable = ref(false)
// 根据id获取信息
const getData = () => {
  const arr = getLocalData('activities')
  arr.forEach((item: any) => {
    if (item.id == route.query.id) {
      activity.value = item
    }
  })
}

const ClickSignUp = async () => {
  const id = route.query.id
  const res = await SignUp(id)
  console.log(res)
  if (res.status == 1) {
    isDisable.value = true
    showSuccessToast(res.msg)
  } else {
    showFailToast(res.msg)
  }
}
// 进入页面查询是否已报名
const CurrentIsSignUp = async () => {
  const id = route.query.id

  const { isreg: res } = await isSignUp(id)

  if (res) {
    isDisable.value = true
  }
}
onMounted(() => {
  getData()
  CurrentIsSignUp()
})
</script>

<style scoped lang="scss">
.container {
  margin: 3px;
  position: relative;
  text-align: center;
}
.bgc-img {
  height: 249px;
  width: 100%;
}
.bgc-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}
.content {
  height: 400px;
}
.content .card-body {
  position: absolute;
  z-index: 1;
  min-height: 300px;
  width: 90%;
  left: 0;
  right: 0;
  top: 220px;
  margin: auto;
  background-color: whitesmoke;
  text-align: left;
  border-radius: 5px;
  box-shadow: 2px 2px 9px #3b2e32;
  padding: 10px;
}
.content .card-body .card-title {
  margin-top: 10px;
  font-size: 12px;
  color: red;
  letter-spacing: 2px;
}

.card-content div {
  margin-top: 5px;
  font-size: 14px;
}

.van-button {
  position: relative;
  margin-top: -10px;
}
.van-button--large {
  width: 80%;
  height: 45px;
}

.tip {
  text-align: center;
  z-index: 1;
  border-radius: 5px;
  height: 28px;
  width: 68px;
  position: absolute;
  background: linear-gradient(to right, #8ec5fc, #3e9cfc);
  color: white;
  font-family: KaiTi, serif;
  font-size: 18px;
  right: 0px;
  top: 0px;
}
.able {
  background: linear-gradient(to bottom, #16d9e3 0%, #30c7ec 47%, #46aef7 100%);
}
/* 按钮禁止 */
.disable {
  background-color: gray;
  color: white;
  cursor: not-allowed;
}
</style>
@/api/ServerAPI
