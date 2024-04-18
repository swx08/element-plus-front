// 路由配置
const routes = [
  {
    //登录页面
    path: "/",
    component: () => import("@/components/layout/Index.vue"),
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/pages/home/Index.vue"),
      },
      {
        path: "user",
        name: "user",
        component: () => import("@/pages/user/Index.vue"),
      },
      {
        path: "page1",
        name: "page1",
        component: () => import("@/pages/other/page1/Index.vue"),
      },
      {
        path: "page2",
        name: "page2",
        component: () => import("@/pages/other/page2/Index.vue"),
      },
    ],
  },
  // {
  //   path: "/:pathMatch(.*)*",
  //   name: "NotFound",
  //   component: () => import("@/views/404/NotFound.vue"),
  // },
];
  
export default routes