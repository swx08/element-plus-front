import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index";
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-persistedstate-plugin";

const persist = createPersistedState();
const pinia = createPinia();
const app = createApp(App);
//挂载到全局
app.use(pinia);
pinia.use(persist);
app.use(router);
app.mount("#app");
