<template>
  <div>
    <div v-if="progressData">
      <!-- 懒加载、垂直居中、 -->
      <div class="card" v-for="item in activities" :key="item.act_id">
        <div class="card-left">
          <img :src="item.img" v-lazy="item.img" />
        </div>
        <div class="card-right">
          <div class="card-header">
            <h2>{{ item.title }}</h2>
            <button class="cancel-button" @click="showInfo(item.id)">
              详情
            </button>
          </div>
          <div class="card-description">
            <p>{{ item.detail }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { requestTime } from '@/utils/util'
import { getActivities } from '@/api/ServerAPI'
const router = useRouter()
let progressData = ref([])

let activities = ref([])
// types.ts

onMounted(() => {
  getActivitiesData()
})
const showInfo = (id: number) => {
  router.push({ name: 'ActivitiesShow', query: { id } })
}
const getActivitiesData = async () => {
  const result = await getActivities(requestTime(Date()), 10)
  console.log(result)

  if (result.status !== 1) {
    return
  } else {
    activities.value = result.data
  }
}
</script>

<style scoped lang="scss">
.card {
  display: flex;
  // width: 400px;
  margin: 20px auto;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-left {
  flex: 1;
}

.card-left img {
  width: 100%;
  height: auto;
  object-fit: cover;
  margin: 10px;
  border-radius: 10%;
}

.card-right {
  flex: 2;
  padding: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
}

.cancel-button {
  background-color: red;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button:hover {
  background-color: #ff3333;
}

.card-description {
  margin-top: 10px;
}
</style>
