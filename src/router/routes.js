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
          icon: "Avatar",
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
    path: "/404",
    name: "404",
    component: () => import("@/pages/404/Index.vue"),
    meta: {
      title: "404",
      hidden: true,
      icon: "UploadFilled",
    },
  }
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
          icon: "UserFilled",
        },
      },
      {
        path: "/permission/role",
        name: "Role",
        component: () => import("@/pages/permission/role/Index.vue"),
        meta: {
          title: "角色管理",
          hidden: false,
          icon: "UserFilled",
        },
      },
      {
        path: "/permission/menu",
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
    redirect: "/other/page1",
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
  }
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