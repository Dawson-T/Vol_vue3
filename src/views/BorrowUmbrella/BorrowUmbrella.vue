<template>
  <div class="container">
    <div class="view">
      <img class="img" src="@/assets/images/爱心雨伞.jpg" />
    </div>
    <div class="btn-container">
      <!-- <img class="img" src="@/assets/images/cqt.webp" alt="" /> -->
      <button @click="scanQRCode('borrow')" class="btn left">
        <van-icon name="scan" style="margin-right: 5%" />扫码借伞
      </button>
      <button @click="scanQRCode('return')" class="btn right">
        <van-icon name="scan" style="margin-right: 5%" />扫码还伞
      </button>
    </div>
    <van-notice-bar
      left-icon="volume-o"
      scrollable
      background="#ecf9ff"
      color="#1989fa"
      text="爱心雨伞遮挡风雨，不要忘记送我回家喔"
    />
    <div class="content"><FlowChart></FlowChart></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { postUmbrella } from '@/api/ServerAPI'
import FlowChart from '@/components/FlowChart/FlowChart.vue'
import { getJDK } from '@/utils/JsSdkConfig'
import { showFailToast, showSuccessToast } from 'vant'
onMounted(() => {
  getCurrentPageJDK()
})
let upid = undefined
const getCurrentPageJDK = () => {
  const currentUrl = location.href
  getJDK(currentUrl)
}
const scanQRCode = (status) => {
  wx.scanQRCode({
    desc: 'scanQRCode desc',
    needResult: 1, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
    scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是条形码（一维码），默认二者都有
    success: (res) => {
      // 回调
      let result = res.resultStr //当needResult为1时返回处理结果
      const pattern = /upid:\s*([^,\}\s]+)/
      const match = result.match(pattern)
      upid = match[1]
      let option = {}
      if (status === 'return') {
        option = {
          upid: upid,
          type: 'return',
        }
      } else {
        option = {
          upid: upid,
          type: 'borrow',
        }
      }
      const rep = postUmbrella(option)
      if (rep.status === 1) {
        showSuccessToast(rep.msg)
      } else {
        showFailToast(res.msg)
      }
    },
    error: function (res) {
      if (res.errMsg.indexOf('function_not_exist') > 0) {
        showFailToast('版本过低请升级')
      }
    },
  })
}
</script>

<style scoped lang="scss">
.video {
  width: 100vw;
  height: 100vh;
}
.video-show {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vw;
  background: linear-gradient(to left, #fff, #fff) left top no-repeat,
    linear-gradient(to bottom, #fff, #fff) left top no-repeat,
    linear-gradient(to left, #fff, #fff) right top no-repeat,
    linear-gradient(to bottom, #fff, #fff) right top no-repeat,
    linear-gradient(to left, #fff, #fff) left bottom no-repeat,
    linear-gradient(to bottom, #fff, #fff) left bottom no-repeat,
    linear-gradient(to left, #fff, #fff) right bottom no-repeat,
    linear-gradient(to left, #fff, #fff) right bottom no-repeat;
  background-size: 2px 20px, 20px 2px, 2px 20px, 20px 2px;
}
.tip {
  width: 10vw;
  height: 10vw;
  background-color: rgb(20, 163, 20);
  border: 1px solid #ffffff;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.bgc-f4f4f4 {
  background-color: #363636;
}

.noShow {
  display: none;
}
.change {
  z-index: 100;
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  text-align: center;
  background-color: #fff;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  line-height: 60px;
  /* align-content: center; */
}
.el-icon-refresh {
  color: #000;
  font-size: 25px;
}
.view {
  width: 100%;
  height: 220px;
  min-height: 200px;
  border-radius: 10px;
}
.btn {
  position: absolute;
  height: 50px;
  width: 130px;
  background-image: linear-gradient(to right, #bc95c6 0%, #7dc4cc 100%);
  border-radius: 50px;
  color: white;
  font-size: 18px;
  z-index: 1;
}
.right {
  right: 50px;
}
.left {
  left: 50px;
}
.btn-container {
  width: 100%;
  height: 60px;
  background-color: #fdfdfd;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.content {
  height: 300px;
  width: 100%;
  background: linear-gradient(to bottom, #4343ef, #87cefa);

  margin-top: 10px;
  border-radius: 10px;
}
.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
@/utils/JsSDConfig
