<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>姓名</th>
          <th>性别</th>
          <th>联系方式</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index">
          <td>{{ item.name }}</td>
          <td>{{ item.gender === 1 ? '女' : '男' }}</td>
          <td>{{ item.mobile }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
defineProps({
  items: {
    type: Array,
    required: true,
  },
})
</script>

<style scoped lang="scss">
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
</style>
