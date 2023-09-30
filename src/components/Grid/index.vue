<template>
  <van-grid icon-size="35px" :column-num="3" clickable>
    <!-- icon前面要加一个空格才能显示图标 -->
    <van-grid-item
      icon=" icon-xiaoyuanzixun-01"
      icon-prefix="iconfont"
      text="校园帮"
      to="/campushelp"
    >
    </van-grid-item>
    <van-grid-item
      icon=" icon-umbrella"
      icon-prefix="iconfont"
      text="爱心雨伞"
      to="/borrowumbrella"
    />
    <van-grid-item
      icon=" icon-yuangongfengcai"
      icon-prefix="iconfont"
      text="志愿风采"
      to="/"
    />
    <van-grid-item
      icon=" icon-baoming"
      icon-prefix="iconfont"
      text="志愿活动报名"
      to="/activity"
    />
    <van-grid-item
      icon=" icon-icon-quanxian"
      icon-prefix="iconfont"
      text="权限申请"
      to="/permission"
    />
    <van-grid-item
      icon="  icon-fankui"
      icon-prefix="iconfont"
      text="意见反馈"
      to="/feedback"
    />
  </van-grid>
</template>
\