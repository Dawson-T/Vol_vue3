<template>
  <div>
    <div class="profile" @click="login">
      <div class="profile__avatar">
        <van-icon
          name=" icon-morentouxiang"
          class-prefix="iconfont"
          size="80"
        />
        <div class="profile__name">点击登录</div>
      </div>
    </div>
    <section>
      <ul @click="toastFn">
        <li v-for="item in menuItems">
          <div href="#"><van-icon :name="item.icon" />{{ item.text }}</div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { oauthUrl } from '@/api/user'
import { showToast } from 'vant'

const menuItems = [
  { icon: 'manager-o', text: '志愿者认证' },
  { icon: 'records', text: '志愿者报名' },
  { icon: 'guide-o', text: '使用指南' },
  { icon: 'search', text: '关于青队' },
  { icon: 'setting-o', text: '设置' },
]
const login = async () => {
  oauthUrl().then((res: any) => {
    if (res.status) {
      // 开发模式的跳转地址
      let url = res.authorizeUrl
      window.location.href = url
    }
  })
}

const toastFn = () => {
  showToast('登录之后可以体验更多功能')
}
</script>

<style scoped lang="scss">
/* 个人信息样式 */
.profile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.iconfont {
  display: flex;
  justify-content: center;
  align-items: center;
}

.profile__name {
  // margin-top: -20%;
  font-size: 18px;
  text-align: center;
  color: #666;
}

/* 设置主体样式 */
section {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
section ul {
  list-style: none;
  padding: 0;
}
section li {
  margin-bottom: 10px;
}
section div {
  display: block;
  padding: 10px;
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  background-color: #f6f6f6;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}
section div .van-icon {
  margin-right: 3px;
}

section div:hover {
  background-color: #e6e6e6;
}
</style>
