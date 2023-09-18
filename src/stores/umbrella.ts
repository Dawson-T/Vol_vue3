import { Names } from './store-name'
import { defineStore } from 'pinia'
import { GetUmbrellaData } from '@/api/admin'
const umbrellaStore = defineStore(Names.UMBRELLA, {
  state: () => ({
    // 全部列表
    list: [],
    // 未过期
    inDue: [],
    // 已过期
    overDue: [],
  }),
  getters: {},
  actions: {
    // 获取全部数据
    async GetData() {
      let result = await GetUmbrellaData(10)
      if (result.status === 1) {
        this.list = result.data
      }
      console.log(this.list);
      
    },
    // 逾期时间
    getOverDue: (borrow_time) => {
      const diff = new Date().getTime() - new Date(borrow_time).getTime()
      return diff / 1000 / 60 / 60
    },
  },
})
export default umbrellaStore
