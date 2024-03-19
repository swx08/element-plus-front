import { createWebHistory, createRouter } from "vue-router";
//引入路由
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(),
  routes: routes
});

// 前置路由
router.beforeEach((to, from, next) => {
  next()
});

export default router;
