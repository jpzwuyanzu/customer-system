import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from "./router/index";
import { createPinia } from "pinia";
import 'ant-design-vue/dist/reset.css';
import './style.scss'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'


const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

import Emoji from 'emoji-box'
import 'emoji-box/dist/style.css'
app.use(Emoji)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus)
app.use(pinia)
app.use(router).use(Antd).mount('#app')

app.config.globalProperties.filter = {
    getFile<T>(content: T) {
        //返回图片路径
        return   new URL(`./assets/images/${content}`, import.meta.url).href
    }
}
// 解决Vue中的全局变量和函数报错问题
interface Filter {
    getFile<T>(content: T): string
}
declare module 'vue' {
    export interface ComponentCustomProperties {
        filter: Filter,
        env: string
    }
}
