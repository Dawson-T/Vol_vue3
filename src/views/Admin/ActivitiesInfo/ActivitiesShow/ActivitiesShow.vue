<template>
  <div class="container">
    <!-- 这里的title改成活动名 -->
    <Table :items="items" />
  </div>
</template>

<script setup lang="ts">
import { getActivityDetail } from '@/api/admin'
const route = useRoute()
let items = ref([])
onMounted(() => {
  getActivitiesData()
})
const getActivitiesData = async () => {
  const id = route.query.id
  const result = await getActivityDetail(id)
  if (result.status !== 1) {
    return
  } else {
    items.value = result.data
  }
}
</script>

<style scoped></style>
