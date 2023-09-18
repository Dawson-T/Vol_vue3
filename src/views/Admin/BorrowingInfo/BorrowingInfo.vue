<template>
  <div>
    <!-- 借伞信息页 -->
    <van-tabs v-model:active="active" sticky>
      <van-tab title="待归还">
        <div class="content" v-if="inDue">
          <table>
            <thead>
              <tr>
                <th>姓名</th>
                <th>性别</th>
                <!-- <th>学号</th> -->
                <th>借伞时间</th>
                <th>还伞</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in list" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.gender ? '女' : '男' }}</td>
                <!-- <td>{{ item.studentNum }}</td> -->
                <td>
                  {{ formatChatTime(item.borrow_time) }}
                </td>
                <td>{{ item.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <van-empty
          v-else
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="暂无数据"
      /></van-tab>
      <van-tab title="已归还">
        <div class="content" v-if="overDue.length">
          <table>
            <thead>
              <tr>
                <th>姓名</th>
                <th>性别</th>
                <th>借伞时间</th>
                <th>逾期天数</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in overDue" :key="index">
                <td>{{ item.name }}</td>
                <td>{{ item.gender ? '女' : '男' }}</td>
                <td>
                  {{ formatChatTime(item.borrow_time) }}
                </td>
                <td>{{ OverTime(item.borrow_time) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <van-empty
          v-else
          image="https://img01.yzcdn.cn/vant/custom-empty-image.png"
          description="暂无数据"
        />
      </van-tab>
    </van-tabs>
    <!-- content -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { formatChatTime } from '@/utils/util'
import { storeToRefs } from 'pinia'
import { useStore } from '@/stores'
let active = ref(0)
let inDue = ref([])
let overDue = ref([])
let threshold = 48 * 60 * 60 * 1000
const umbrellaStore = useStore().umbrella
let { list } = storeToRefs(umbrellaStore)
onMounted(() => {
  umbrellaStore.GetData()
})
</script>

<style scoped lang="scss">
.container {
  margin-left: 10px;
  margin-right: 10px;
  min-height: 100px;
  background-color: skyblue;
}
.title-container {
  display: flex;
}
.left-title {
  width: 50%;
  color: #000;
  font-size: 24px;
  text-align: center;
}
.right-title {
  width: 50%;
  text-align: center;
}
.title-container .active {
  color: red;
  border-bottom: 3px solid red;
}
.right-title {
  color: #000;
  font-size: 24px;
}

table {
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #000;
  padding: 5px;
  text-align: left;
}
.content {
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
