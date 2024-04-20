import component from "element-plus/es/components/tree-select/src/tree-select-option.mjs";

// 路由配置
const routes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("@/pages/login/Index.vue"),
    meta: {
      title: "登录",
      hidden: true,
      icon: "UploadFilled",
    },
  },
  {
    path: "/",
    component: () => import("@/components/layout/Index.vue"),
    redirect: "/home",
    meta: {
      title: "layout",
      hidden: false,
      icon: "Odometer",
    },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/pages/home/Index.vue"),
        meta: {
          title: "首页",
          hidden: false,
          icon: "Avatar",
        },
      },
    ],
  },
  {
    path: "/permission",
    name: "Layout",
    component: () => import("@/components/layout/Index.vue"),
    meta: {
      title: "权限管理",
      hidden: false,
      icon: "Lock",
    },
    children: [
      {
        path: "/user",
        name: "User",
        component: () => import("@/pages/permission/user/Index.vue"),
        meta: {
          title: "用户管理",
          hidden: false,
          icon: "UserFilled",
        },
      },
      {
        path: "/role",
        name: "Role",
        component: () => import("@/pages/permission/role/Index.vue"),
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "UserFilled",
        },
      },
      {
        path: "/menu",
        name: "Menu",
        component: () => import("@/pages/permission/menu/Index.vue"),
        meta: {
          title: "菜单管理",
          hidden: false,
          icon: "UserFilled",
        },
      },
    ],
  },
  {
    path: "/other",
    name: "Other",
    component: () => import("@/components/layout/Index.vue"),
    meta: {
      title: "其他",
      hidden: false,
      icon: "Avatar",
    },
    children: [
      {
        path: "/other/page1",
        name: "Page1",
        component: () => import("@/pages/other/page1/Index.vue"),
        meta: {
          title: "页面1",
          hidden: false,
          icon: "Promotion",
        },
      },
      {
        path: "/other/page2",
        name: "Page2",
        component: () => import("@/pages/other/page2/Index.vue"),
        meta: {
          title: "页面2",
          hidden: false,
          icon: "Promotion",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/404/Index.vue"),
    meta: {
      title: "404",
      hidden: true,
      icon: "",
    },
  },
];

export default routes;
