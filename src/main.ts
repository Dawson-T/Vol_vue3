import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 全局样式设置
import '@/styles/index.scss'
// iconfont
import './assets/iconfont/iconfont.css'
import App from './App.vue'
import router from './router'

// 按需引入
import vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
const app = createApp(App)

app.use(vant)
app.use(Lazyload, {
  lazyComponent: true,
})
app.use(createPinia())
console.log(
  '%c常青藤志愿服务云平台 v2.0.0 -by CO ',
  'background-color: #030307 ; color: #fadfa3 ; font-weight: bold ; ' +
    'font-size: 14px ;  ' +
    "font-family: 'american typewriter' ; "
)
app.use(router)

app.mount('#app')
