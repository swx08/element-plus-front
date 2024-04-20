import { createApp } from 'vue'
import './style/index.scss';
import App from './App.vue'
import router from "./router/index";
import pinia from "@/stores/index";
import { createPersistedState } from "pinia-persistedstate-plugin";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
//暗黑模式导入
import "element-plus/theme-chalk/dark/css-vars.css";
// 引入中文语言包
import zhCn from "element-plus/es/locale/lang/zh-cn";
//引入路由鉴权
import './permission';
const persist = createPersistedState();
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
