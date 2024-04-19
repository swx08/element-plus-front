import { createApp } from 'vue'
import './style/index.scss';
import App from './App.vue'
import router from "./router/index";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-persistedstate-plugin";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
// 引入中文语言包
import zhCn from "element-plus/es/locale/lang/zh-cn";


const persist = createPersistedState();
const pinia = createPinia();
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(ElementPlus, {
  locale: zhCn,
});

//挂载到全局
app.use(pinia);
pinia.use(persist);
app.use(router);
app.mount("#app");
