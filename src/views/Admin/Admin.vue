<!-- 后台管理首页 -->
<template>
  <div>
    <div class="container">
      <div class="header">
        <img
          class="header-img"
          src="https://olrando.oss-cn-chengdu.aliyuncs.com/img/1681282717075.jpeg"
          alt=""
        />
      </div>
      <van-grid :column-num="3" icon-size="35px" clickable>
        <van-grid-item
          v-for="item in list"
          icon-prefix="iconfont"
          :icon="item.icon"
          :to="item.path"
          :text="item.text"
        />
      </van-grid>
    </div>
  </div>
</template>

<script setup lang="ts">
let list = [
  { icon: ' icon-icon-quanxian', path: '/userauthorization', text: '权限审批' },
  {
    icon: ' icon-icon_xinyong_xianxing_jijin-207',
    path: '/activitieslist',
    text: '活动报名',
  },
  { icon: ' icon-fankui', path: '/feedbackinfo', text: '意见反馈' },
  { icon: ' icon-umbrella', path: '/borrowingInfopage', text: '爱心雨伞' },
  { icon: ' icon-xiaoyuanzixun-01', path: '/userinfo', text: '用户信息' },
  { icon: ' icon-fabu-', path: '/activiesmanage', text: '活动管理' },
  {
    icon: ' icon-fabu-',
    path: '/editarticle',
    text: '发布文章',
  },
  { icon: ' icon-fabu-', path: '/activiesmanage', text: '活动管理' },
  { icon: ' icon-fabu-', path: '/activiesmanage', text: '活动管理' },
]
const goPc = () => {
  console.log('去pc端')
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  margin: 10px;
  min-height: 100px;
  width: 100%;
  .header {
    z-index: 1;
    position: absolute;
    height: 200px;
    width: 100%;

    .header-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 0;
    }
  }
  .van-grid {
    display: flex;
    position: absolute;
    top: 200px;
    width: 100%;
  }
}
</style>
