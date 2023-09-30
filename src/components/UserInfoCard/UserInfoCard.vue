<template>
  <div class="card">
    <div class="left-column">
      <img :src="avatar" v-lazy="avatar" class="avatar" />
    </div>
    <div class="gender">
      <van-icon
        :color="gender"
        style="margin-left: 10px"
        size="18px"
        name="manager"
      />
    </div>
    <div class="middle-column">
      <div class="name">{{ name }}</div>
      <div class="permissions">{{ permissions }}</div>
    </div>
    <div class="right-column" v-if="!isShow">
      <van-popover
        v-model="showPopover"
        trigger="click"
        :actions="actions"
        @select="onSelect"
      >
        <template #reference>
          <van-button type="primary" color="#F2CA27"
            ><van-icon name="ellipsis"
          /></van-button>
        </template>
      </van-popover>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
let showPopover = ref(false)
let actions = reactive([{ text: '用户详情' }, { text: '权限管理' }])
// 用户操作按钮 是否显示
const isShow = computed(() => {
  if (route.path === '/userinfo_permission') {
    return 1
  } else {
    return 0
  }
})
const props = defineProps({
  avatar: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  permissions: {
    type: String,
    required: false,
  },
  onButtonClick: {
    type: Function,
    required: false,
  },
  id: {
    type: Number,
    required: false,
  },
})

const onSelect = (action) => {
  console.log(props.id)
  if (action.text === '权限管理') {
    router.push({ path: '/userinfo_permission', query: { id: props.id } })
  } else {
  }
}
</script>

<style scoped lang="scss">
.card {
  // font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80%;
  padding: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  .left-column {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .avatar {
      width: 90%;
      height: 90%;
      border-radius: 50%;
      object-fit: cover;
    }
  }

  .middle-column {
    flex: 3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding: 5px 10px;

    .name {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .permissions {
      font-size: 14px;
      color: #9293a0;
    }
  }

  .right-column {
    margin: 10px 20px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-button {
      border-radius: 50%;
    }
  }
}
</style>
