import { createApp } from 'vue'
import { createPinia } from 'pinia'
// 全局样式设置
import '@/styles/index.scss'
// iconfont
import './assets/iconfont/iconfont.css'
import App from './App.vue'
import router from './router'
import 'vant/lib/index.css'
import { Lazyload } from 'vant'
//#region unplugin-vue-components非vant官方插件解决方案不太完善，这里引入不要删，否则打包会缺少样式
// Toast
import { showToast, showSuccessToast, showFailToast } from 'vant'
import 'vant/es/toast/style'
// Dialog
import { showConfirmDialog } from 'vant'
import 'vant/es/dialog/style'
// #endregion

const app = createApp(App)
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
