// 导入定义 store 的函数和 ref 函数
import { defineStore } from "pinia";
import router from "@/router/index";
// 导入常量路由配置
import { constantRoutes, asyncRoutes, anyRoute } from "@/router/routes.js";
//引入lodash深拷贝函数
import cloneDeep from "lodash/cloneDeep";
import { doLogin, getUserInfo } from "@/api/user/index";
import { SET_TOKEN, REMOVE_TOKEN } from "@/stores/models/token/token.js";

//用于过滤当前用户需要展示的异步路由
const filterAsyncRoute = (asyncRoute, route) => {
  return asyncRoute.filter((item) => {
    if (route.includes(item.name)) {
      if (item.children && item.children.length > 0) {
        item.children = filterAsyncRoute(item.children, route);
      }
      return true;
    }
  });
};

// 定义名为 useUserStore 的 store
let useUserStore = defineStore("User", {
  state: () => {
    return {
      token: localStorage.getItem("TOKEN"),
      menuRoutes: constantRoutes,
      username: "",
      avatar: "",
      buttons: [],
    };
  },

  actions: {
    //登录方法
    async login(user) {
      let res = await doLogin(user);
      if (res.code === 200) {
        this.token = res.data;
        //本地存储token
        SET_TOKEN(res.data);
        return res;
      } else {
        return Promise.reject(new Error(res.message));
      }
    },

    //获取当前用户的数据
    async userInfo() {
      let res = await getUserInfo();
      if (res.code === 200) {
        this.menuRoutes = constantRoutes;
        this.username = res.data.user.username;
        this.avatar = res.data.user.username;
        if (res.data.routes !== undefined) {
          this.buttons = res.data.permissions;
          //计算当前用户的异步路由,需要进行深拷贝处理，否则页面刷新后路由会错乱
          let userAsyncRoutes = filterAsyncRoute(
            cloneDeep(asyncRoutes),
            res.data.routes
          );
          //菜单需要的路由数据整理完毕，相当于数组合并，
          //这里注意一定要把任意路由加到数组最后，否则会导致页面显示白屏
          this.menuRoutes = [...constantRoutes, ...userAsyncRoutes, anyRoute];
          //动态路由追加
          userAsyncRoutes.forEach((route) => {
            router.addRoute(route);
          });
        }
        return "ok";
      } else {
        return Promise.reject(new Error(res.message));
      }
    },

    //退出登录
    logout() {
      this.token = "";
      this.username = "";
      this.avatar = "";
      //删除本地token数据
      REMOVE_TOKEN();
      //跳转登录页
      router.push({ name: "Login" });
    },
  },
});

export default useUserStore;
