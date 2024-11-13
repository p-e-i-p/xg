import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import "element-plus/dist/index.css"
import App from '@/App.vue'

//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//导入路由
import router from "@/router"
//引入仓库
import pinia from './store'
import * as ElementPlusIconVue from "@element-plus/icons-vue"

const app=createApp(App)
app.use(ElementPlus,{
  locale:zhCn
});
for(const [key,component]of Object.entries(ElementPlusIconVue)){
  app.component(key,component)
}
app.use(pinia)
app.use(router)
app.mount('#app')

