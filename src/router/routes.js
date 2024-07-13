// 路由配置

//常量路由
export const constantRoutes = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/components/layout/Index.vue"),
    redirect: "/home",
    meta: {
      title: "",
      hidden: false,
      icon: "",
    },
    children: [
      {
        path: "/home",
        name: "Home",
        component: () => import("@/pages/home/Index.vue"),
        meta: {
          title: "首页",
          hidden: false,
          icon: "House",
        },
      },
    ],
  },
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
    path: "/register",
    name: "Register",
    component: () => import("@/pages/register/Index.vue"),
    meta: {
      title: "注册",
      hidden: true,
      icon: "UploadFilled",
    },
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/pages/404/Index.vue"),
    meta: {
      title: "404",
      hidden: true,
      icon: "UploadFilled",
    },
  },
];

//异步路由(动态路由)
export const asyncRoutes = [
  {
    path: "/permission",
    name: "Permission",
    component: () => import("@/components/layout/Index.vue"),
    meta: {
      title: "权限管理",
      hidden: false,
      icon: "Lock",
    },
    redirect: "/permission/user",
    children: [
      {
        path: "/permission/user",
        name: "User",
        component: () => import("@/pages/permission/user/Index.vue"),
        meta: {
          title: "用户管理",
          hidden: false,
          icon: "User",
        },
      },
      {
        path: "/permission/role",
        name: "Role",
        component: () => import("@/pages/permission/role/Index.vue"),
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "Switch",
        },
      },
      {
        path: "/permission/menu",
        name: "Menu",
        component: () => import("@/pages/permission/menu/Index.vue"),
        meta: {
          title: "菜单管理",
          hidden: false,
          icon: "Grid",
        },
      },
    ],
  },
  {
    path: "/system",
    name: "System",
    component: () => import("@/components/layout/Index.vue"),
    redirect: "/system/notice",
    meta: {
      title: "系统管理",
      hidden: false,
      icon: "Setting",
    },
    children: [
      {
        path: "/system/dict",
        name: "Dict",
        component: () => import("@/pages/system/dict/Index.vue"),
        meta: {
          title: "字典管理",
          hidden: false,
          icon: "SetUp",
        },
      },
      {
        path: "/system/dict_data",
        name: "DictData",
        component: () => import("@/pages/system/dict_data/Index.vue"),
        meta: {
          title: "字典数据",
          hidden: true,
          icon: "",
        },
      },
      {
        path: "/system/notice",
        name: "Notice",
        component: () => import("@/pages/system/notice/Index.vue"),
        meta: {
          title: "公告管理",
          hidden: false,
          icon: "Message",
        },
      },
      {
        path: "/system/log",
        name: "Log",
        component: () => import("@/pages/system/log/Index.vue"),
        meta: {
          title: "日志管理",
          hidden: false,
          icon: "Memo",
        },
      },
    ],
  },
];

//任意路由
export const anyRoute = {
  path: "/:pathMatch(.*)*",
  redirect: "/404",
  name: "any",
  meta: {
    title: "任意路由",
    hidden: true,
    icon: "",
  },
};