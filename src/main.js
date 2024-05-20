import { createApp } from 'vue'
//引入全局样式文件
import './style/index.scss';
import App from './App.vue';
//引入路由文件
import router from "./router/index";
//引入pina
import pinia from "@/stores/index";
//引入pina持久化插件
import { createPersistedState } from "pinia-persistedstate-plugin";
//引入ElementPlus图标库
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
//引入ElementPlus
import ElementPlus from "element-plus";
//引入ElementPlus样式
import "element-plus/dist/index.css";
//暗黑模式导入
import "element-plus/theme-chalk/dark/css-vars.css";
// 引入中文语言包
import zhCn from "element-plus/es/locale/lang/zh-cn";
//引入路由鉴权文件
import './permission';
//引入自定义指令文件
import { hasButton } from '@/button/has';
//引入SVG
import "virtual:svg-icons-register";
//引入自定义插件用来注册全局组件
import globalComponent from "@/plugins";

const app = createApp(App);
const persist = createPersistedState();
hasButton(app);
// 注册ElementPlus图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 注册ElementPlus中文语言包
app.use(ElementPlus, {
  locale: zhCn,
});

//将各种实例挂载到全局
//安装自定义插件
app.use(globalComponent);
app.use(pinia);
pinia.use(persist);
app.use(router);
app.mount("#app");
