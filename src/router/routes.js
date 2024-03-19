// 路由配置
const routes = [
    {
      //登录页面
      path: "/",
      name: "Main",
      component: () => import("@/pages/Main.vue"),
      meta: {
        title: "首页",
      },
    },
    // {
    //   path: "/:pathMatch(.*)*",
    //   name: "NotFound",
    //   component: () => import("@/views/404/NotFound.vue"),
    // },
]
  
export default routes