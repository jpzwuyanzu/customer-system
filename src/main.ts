import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router/index";
import { createPinia } from "pinia";
import 'ant-design-vue/dist/reset.css';
import './style.css'
import App from './App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(ElementPlus)
app.use(pinia)
app.use(router).use(Antd).mount('#app')

