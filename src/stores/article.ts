import { defineStore } from 'pinia'
import { Names } from './store-name'
const newsStore = defineStore(Names.NEWS, {
  state: () => ({}),
  getters: {},
  actions: {},
})
export default newsStore
