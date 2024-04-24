---
icon: pen-to-square
date: 2024-04-23
category:
  - 项目
tag:
  - 文档
  - 项目
star: true
sticky: true
---


# 通用后台管理系统


## 一、基础配置

### 1、全局样式

**使用scss样式**

>**安装：npm install -D sass**



**全局样式index.scss**

```scss
// 引入清除默认样式
@import "./reset.scss";

//滚动条样式设置
/* 隐藏滚动条 */
::-webkit-scrollbar {
    display: none;
}
```

**去除默认样式reset.scss**

```scss
* {
    box-sizing: border-box;
    background-repeat: no-repeat;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

body {
    margin: 0;
    line-height: 1;
}

article,
aside,
footer,
header,
nav,
section,
main,
figcaption,
figure,
menu,
details {
    display: block;
}

audio,
canvas,
video {
    display: inline-block;
}

img {
    display: block;
    border: 0;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin: 0;
    padding: 0;
    font-weight: normal;
}

p {
    margin: 0;
    padding: 0;
}

address,
cite,
dfn,
em,
var {
    font-style: normal;
}

ul,
ol {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

a {
    background-color: transparent;
    font-size: inherit;
    color: inherit;
    text-decoration: none;

    &:active,
    &:hover {
        outline: 0;
    }
}

:focus {
    outline: 0;
}

button,
input,
select,
textarea {
    margin: 0;
    font-size: inherit;
}

button,
html [type="button"],
[type="reset"],
[type="submit"] {
    padding: 0;
    border: 0;
    color: inherit;
    background-color: transparent;
    -webkit-appearance: button;
    cursor: pointer;
}

button::-moz-focus-inner,
input::-moz-focus-inner {
    border: 0;
    padding: 0;
}

input {
    padding: 0;
    line-height: normal;

    &::-webkit-input-placeholder {
        font-weight: 300;
    }

    &::-ms-input-placeholder {
        font-weight: 300;
    }

    &::-moz-placeholder {
        font-weight: 300;
    }
}

[type="number"] {
    -moz-appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
        margin: 0;
        height: auto;
        -webkit-appearance: none;
    }
}

[type="search"] {
    -webkit-appearance: textfield;

    &::-webkit-search-cancel-button,
    &::-webkit-search-decoration {
        -webkit-appearance: none;
    }
}

textarea {
    overflow: auto;
    resize: none;
    -webkit-appearance: none;
}

select {
    -webkit-appearance: none;
    background-color: #fff;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}
```



**想在全局使用scss变量，需要在vite.config.js中配置一个全局变量文件**

```scss
//设置全局样式

// 左侧菜单宽度
$base-menu-side-width: 220px;
//左侧折叠后的宽度
$base-menu-min-side-width: 64px;
// 左侧菜单背景颜色
// $base-menu-side-background: linear-gradient(to right, #141e30, #243b55);
$base-menu-side-background: #191a23;

// 顶部导航高度
$base-menu-header-height: 94px;
//顶部上半部分高度
$base-top-header-height: 60px;
//顶部下半部分高度
$base-bottom-header-height: 32.2px;
// 顶部背景颜色
$base-menu-header-background: #fff;

// 内容展示区背景颜色
$base-menu-main-background: #eee;

// 左侧Logo高度
$base-menu-logo-height: 60px;
// 左侧Logo文字大小
$base-logo-title-size: 18px;
// 左侧Logo背景
// $base-logo-background: linear-gradient(to right, #141e30, #243b55);
$base-logo-background: #191a23;
```



**vite.config.js配置**

```js
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
//引入path路径，用于路径别名
import path from "path";

// 导出 Vite 配置
export default defineConfig(({ command, mode }) => {
  //加载各环境下的配置
  let env = loadEnv(mode, process.cwd());
  return {
    base: "./", // 开发或生产环境服务的公共基础路径
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // 路径别名
      },
    },
    server: {
      host: true, // 监听所有地址
      port: 3000,
      proxy: {
        //设置代理，必须填
        [env.VITE_APP_BASE_API]: {
          //目标代理服务器地址：部署时将localhost改成自己服务器的地址即可
          target: env.VITE_SERVE,
          changeOrigin: true, //是否设置同源，输入是的
          //重写路径
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    plugins: [vue()],
    //scss样式配置：global.scss中的变量可以全局使用
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/style/global.scss";',
        },
      },
    },
  };
});
```





### 2、环境变量

```bash
# 变量必须以 VITE_ 为前缀才能暴露给外部读取：import.meta.env
NODE_ENV = 'development'
VITE_APP_TITLE = '通用后台管理系统模板'
VITE_APP_BASE_API = '/api'
VITE_SERVE = 'http://localhost:9800'
```

```bash
# 变量必须以 VITE_ 为前缀才能暴露给外部读取：import.meta.env
NODE_ENV = 'production'
VITE_APP_TITLE = '通用后台管理系统模板'
VITE_APP_BASE_API = '/api'
VITE_SERVE = 'http://localhost:8080'
```



### 3、全局设置

```js
// 配置全局的一些参数：如：logo以及logo标题
export default {
  //项目Logo标题
  title: "后台管理系统",
  logo: "https://s2.loli.net/2024/04/20/e7oAhmNiLkpKfGQ.png",

  // 是否隐藏Logo
  logoHidden: false,
};

```



### 4、main.js入口文件

```js
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
//引入路由鉴权文件，也就是前置路由文件
import './permission';

const app = createApp(App);
const persist = createPersistedState();
// 注册ElementPlus图标库
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
// 注册ElementPlus中文语言包
app.use(ElementPlus, {
  locale: zhCn,
});

//将各种实例挂载到全局
app.use(pinia);
pinia.use(persist);
app.use(router);
app.mount("#app");

```



### **5、vite.config.js配置文件**

```js
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
//引入path路径，用于路径别名
import path from "path";

// 导出 Vite 配置
export default defineConfig(({ command, mode }) => {
  //加载各环境下的配置
  let env = loadEnv(mode, process.cwd());
  return {
    base: "./", // 开发或生产环境服务的公共基础路径
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"), // 路径别名
      },
    },
    server: {
      host: true, // 监听所有地址
      port: 3000,
      proxy: {
        //设置代理，必须填
        [env.VITE_APP_BASE_API]: {
          //目标代理服务器地址：部署时将localhost改成自己服务器的地址即可
          target: env.VITE_SERVE,
          changeOrigin: true, //是否设置同源，输入是的
          //重写路径
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    plugins: [vue()],
    //scss样式配置：global.scss中的变量可以全局使用
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import "./src/style/global.scss";',
        },
      },
    },
  };
});
```



### 6、App.vue过渡效果

```vue
<template>
  <router-view v-slot="{ Component }">
      <!-- 添加动画效果 -->
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
</template>

<style>
/* 设置根元素的高度为100% */
#app {
  height: 100%;
}

/* 设置进入动画效果 */
.fade-enter-active {
  transition: opacity 0.5s, transform 0.5s;
}

/* 设置从出动画效果 */
.fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
```



### 7、页面加载效果

**直接在html文件中加入以下核心代码即可**

```html
<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>通用后台管理系统</title>
</head>

<body>
  <div id="app">
    <!-- 加载动画 -->
    <style>
      html,
      body,
      #app {
        width: 100%;
        height: 100%;
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
        overflow: hidden;
      }

      .loader,
      .loader:before,
      .loader:after {
        border-radius: 50%;
        width: 2.5em;
        height: 2.5em;
        animation-fill-mode: both;
        animation: loadAnimation 1.8s infinite ease-in-out;
      }

      .loader {
        color: #406eeb;
        font-size: 10px;
        margin: 80px auto;
        position: relative;
        text-indent: -9999em;
        transform: translateZ(0);
        animation-delay: -0.16s;
        top: 0;
        transform: translate(-50%, 0);
      }

      .loader:before,
      .loader:after {
        content: "";
        position: absolute;
        top: 0;
      }

      .loader:before {
        left: -3.5em;
        animation-delay: -0.32s;
      }

      .loader:after {
        left: 3.5em;
      }

      @keyframes loadAnimation {

        0%,
        80%,
        100% {
          box-shadow: 0 2.5em 0 -1.3em;
        }

        40% {
          box-shadow: 0 2.5em 0 0;
        }
      }
    </style>
    <div class="loader"></div>
  </div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```





## 二、侧边栏

### **1、布局**

**主要包括Logo组件和菜单栏组件**

```vue
<!-- 侧边栏组件 -->
<template>
  <el-aside :class="{ collapse: collapseStore.collapse ? true : false }">
    <!-- 使用Logo组件 -->
    <Logo /> 
    <el-scrollbar class="scrollbar">
      <!-- 使用Menu组件，传递menuList属性 -->
      <Meun :menuList="userStore.menuRoutes" /> 
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import Logo from "@/components/common/logo/Index.vue";
import Meun from "@/components/common/menu/Index.vue";
// 导入折叠状态管理模块
import { useCollapseStore } from "@/stores/models/collapse/collapse.js"; 
// 导入常量路由配置
import useUserStore from "@/stores/models/user/user.js";

//主要是获取常量路由数据传递给子组件（菜单组件Menu）
const userStore = useUserStore();
// 使用折叠状态管理模块
const collapseStore = useCollapseStore();
</script>

<style scoped lang="scss">
.el-aside {
  width: $base-menu-side-width; // 设置侧边栏宽度
  height: 100vh; // 设置侧边栏高度
  .scrollbar {
    height: calc(100vh - $base-menu-logo-height); // 设置滚动条容器高度
  }

  // 左侧菜单收缩样式
  &.collapse {
    width: $base-menu-min-side-width; // 设置折叠状态下侧边栏宽度
  }
}

.el-menu-vertical {
  border-right: none; // 设置垂直菜单样式，去掉右边边框
}
</style>
```



### 2、Logo部分

**Logo抽离出一个单独的组件**

```vue
<template>
  <div
    class="logo"
    v-if="!setting.logoHidden"
    :style="{background: themeStore.bgColor}"
    :class="{ collapse: collapseStore.collapse ? true : false }"
  >
    <el-space :size="10">
      <el-avatar :size="45" :src="setting.logo"></el-avatar>
      <span class="logo_title" :style="{color: themeStore.fontColor}" v-if="!collapseStore.collapse">{{
        setting.title
      }}</span>
    </el-space>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
//引入全局设置
import setting from "@/setting.js";
import { useCollapseStore } from "@/stores/models/collapse/collapse.js";
import { useThemeStore } from "@/stores/models/theme/theme.js";

//用于控制侧边栏收缩和展开时的控制
const collapseStore = useCollapseStore();

//用于控制主题色切换时的控制
const themeStore = useThemeStore();
</script>


<style scoped lang="scss">
.logo {
  // 和侧边栏宽度保持一致
  width: $base-menu-side-width;
  display: flex;
  justify-content: center;
  align-items: center;
  height: $base-menu-logo-height;

  // 左侧菜单收缩样式
  &.collapse {
    width: $base-menu-min-side-width;
  }

  .logo_title {
    font-family: "微软雅黑体";
    font-size: $base-logo-title-size;
  }
}
</style>
```





### 3、动态菜单栏部分

```vue
<template>
  <el-menu
    class="el-menu-vertical"
    :text-color="themeStore.fontColor"
    :background-color="themeStore.menuBgColor"
    active-text-color="#409EFF"
    :collapse="collapseStore.collapse"
    :collapse-transition="false"
    :style="{ background:themeStore.bgColor}"
  >
    <!-- 一级菜单 -->
    <template v-for="(item, index) in noChildren">
      <el-menu-item
        :index="item.path"
        :key="index"
        @click="changeRouter(item)"
        class="el_menu_"
        v-if="!item.meta.hidden"
      >
        <component class="icons" :is="item.icon" />
        <template #title>{{ item.meta.title }}</template>
      </el-menu-item>
    </template>

    <!-- 二级菜单 -->
    <template v-for="(item, index) in hasChildren()" :key="index">
      <template v-if="item.children && item.children.length === 1">
        <el-menu-item
          :index="item.children[0].path"
          :key="index"
          @click="changeRouter(item.children[0])"
          class="el_menu_"
          v-if="!item.children[0].meta.hidden"
        >
          <component class="icons" :is="item.children[0].meta.icon" />
          <template #title>{{ item.children[0].meta.title }}</template>
        </el-menu-item>
      </template>

      <template v-else>
        <el-sub-menu :index="item.path">
          <template #title>
            <component class="icons" :is="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              :index="subItem.path"
              v-for="(subItem, index) in item.children"
              :key="index"
              @click="changeRouter(subItem)"
              class="el_menu_"
            >
              <component class="icons" :is="subItem.meta.icon" />
              <span>{{ subItem.meta.title }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
      </template>
    </template>
  </el-menu>
</template>

<script setup>
import { computed, ref } from "vue";
import router from "@/router/index.js";
import { useCollapseStore } from "@/stores/models/collapse/collapse.js";
import { useBreadcrumbStore } from "@/stores/models/breadcrumb/breadcrumb.js";
import { useThemeStore } from "@/stores/models/theme/theme.js";

const themeStore = useThemeStore();
const breadcrumbStore = useBreadcrumbStore();
//接收父组件传进来的路由数据
const props = defineProps({
  menuList: [],
});

//控制侧边栏收缩和展开时的控制
const collapseStore = useCollapseStore();

//过滤出无子菜单的路由
const noChildren = () => {
  return props.menuList.filter((item) => !item.children);
};

//过滤出菜单路由，有子菜单的路由
const hasChildren = () => {
  return props.menuList.filter((item) => item.children);
};

//路由跳转
const changeRouter = (item) => {
  //点击菜单时路由跳转
  router.push(item.path);

  //点击菜单时获取头部面包屑路由展示数据，这一步在下面头部展示面包屑路由非常重要。
  breadcrumbStore.setBreadcrumb(item);
};
</script>

<script>
export default {
  name: "Menu",
};
</script>


<!-- 样式 -->
<style lang="scss" scoped>
.el-menu-vertical {
  border-right: none;
  height: 100vh;
}

:deep(.el-menu-item:hover) {
  background: #79bbff !important;
  color: #fff !important;
}
:deep(.el-submenu__title:hover) {
  background: #79bbff !important;
  color: #fff !important;
}
:deep(.el-menu-item.is-active) {
  background: #3370ff !important;
  color: #fff !important;
}
:deep(.el-submenu__title.is-active) {
  background: #3370ff !important;
  color: #fff !important;
}

.icons {
  width: 16px;
  height: 16px;
  margin-right: 7px;
}
</style>
```



### 4、侧边栏收缩

**通过点击头部的收缩按钮使用Pinia存储收缩标志collapse是true还是false来判断，本地存储后在下面任何一个位置都可使用。**

```js
// 导入 pinia 库中的 defineStore 方法
import { defineStore } from "pinia";
// 导入 vue 库中的 ref 方法
import { ref } from "vue";

// 定义名为 useCollapseStore 的 store
export const useCollapseStore = defineStore("collapse", () => {
  // 创建一个名为 collapse 的响应式数据，并初始化为 false
  const collapse = ref(false);

  // 定义名为 setCollapse 的方法，用于设置 collapse 的值
  const setCollapse = (newCollapse) => {
    collapse.value = newCollapse;
  };

  // 返回 collapse 和 setCollapse 方法
  return {
    collapse,
    setCollapse,
  };
});
```





## 三、头部

### 1、布局

```vue
<template>
  <div>
    <div class="top">
      <!-- 左侧 -->
      <Left />
      <!-- 右侧 -->
      <Right />
    </div>
      <!-- 分割线 -->
    <el-divider></el-divider>
    <RouterTags />
    <!-- 主题设置弹出框 -->
    <Drawer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import RouterTags from "@/components/common/tags/Index.vue";
import Left from "@/components/header/left/Index.vue";
import Right from "@/components/header/right/Index.vue";
import Drawer from "@/components/header/drawer/Index.vue";
</script>


<style scoped lang="scss">
.top {
  height: $base-top-header-height;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
```



### 2、一级面包屑

**实现思路：首页固定不变，当切换路由时放置在首页后即可**

```vue
<template>
  <!-- 左侧 -->
  <div class="l-content">
    <div>
      <el-icon
        v-if="!collapseStore.collapse"
        class="icons"
        @click="changeCollapse"
        ><Fold
      /></el-icon>
      <el-icon
        class="icons"
        v-if="collapseStore.collapse"
        @click="changeCollapse"
        ><Expand
      /></el-icon>
    </div>

    <div>
      <el-breadcrumb
        separator="/"
        style="font-family: '微软雅黑体'; font-size: 14px; margin-left: 10px"
      >
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="current" :to="current.path">{{
          current.meta.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCollapseStore } from "@/stores/models/collapse/collapse.js";
import { useBreadcrumbStore } from "@/stores/models/breadcrumb/breadcrumb.js";

const breadcrumbStore = useBreadcrumbStore();
const collapseStore = useCollapseStore();
const changeCollapse = () => {
  collapseStore.collapse = !collapseStore.collapse;
};

//使用computed计算属性当前路由，这个数据从哪里来的呢？
//实在菜单组件Menu中点击路由跳转方法时使用Pinia保存，便于这里面包屑展示路由
const current = computed(() => {
  return breadcrumbStore.breadcrumb;
});
</script>
<style scoped lang="scss">
.l-content {
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.font_common {
  font-family: "微软雅黑";
  font-size: 14px;
}
</style>
```

```js
// 导入pinia库中的defineStore函数和vue库中的ref函数
import { defineStore } from "pinia";
import { ref } from "vue";

// 定义Breadcrumb模块的store
export const useBreadcrumbStore = defineStore("breadcrumb", () => {
  // 使用ref创建响应式的breadcrumb变量，并初始化为null
  const breadcrumb = ref(null);
  // 使用ref创建响应式的tagList数组，并初始化包含一个对象
  const tagList = ref([
    {
      path: "/home",
      name: "Home",
      meta: {
        title: "首页",
        hidden: false,
        icon: "Avatar",
      },
    },
  ]);

  // 设置动态面包屑
  const setBreadcrumb = (newBreadcrumb) => {
    // 如果新面包屑的name为"Home"，则将breadcrumb置为null，否则赋值为newBreadcrumb
    if (newBreadcrumb.name === "Home") {
      breadcrumb.value = null;
    } else {
      breadcrumb.value = newBreadcrumb;
      // 去重逻辑，防止多个相同的面包屑添加进去
      let result = tagList.value.findIndex(
        (item) => item.name === newBreadcrumb.name
      );
      // 如果未找到相同的面包屑，则将newBreadcrumb添加到tagList中
      result === -1 ? tagList.value.push(newBreadcrumb) : "";
    }
  };

  // 清除标签
  const clearTags = (newTags) => {
    // 删除tagList中指定name的元素，返回索引
    let result = tagList.value.findIndex((item) => item.name === newTags.name);
    // 根据索引位置删除指定元素
    tagList.value.splice(result,1);
  };

  return {
    // 返回tagList, breadcrumb, setBreadcrumb和clearTags供外部访问
    tagList,
    breadcrumb,
    setBreadcrumb,
    clearTags,
  };
});
```



### 3、二级面包屑

**跟一级面包屑实现思路差不多，默认展示首页，其余的路由每切换一次往数组中存放，首页路由不做处理，还要做放置重复路由添加的相同路由去重。**

==抽离出一个组件使用，方便复用==

```vue
<!-- 封装面包屑展示组件 -->
<template>
  <div class="tags">
    <el-tag
      v-for="(item, index) in tags"
      :key="index"
      size="large"
      :effect="route.name === item.name ? 'dark' : 'light'"
      :closable="item.name !== 'Home'"
      @click="changRouter(item)"
      @close="handleClose(item, index)"
      class="el_tags"
    >
      {{ item.meta.title }}
    </el-tag>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useBreadcrumbStore } from "@/stores/models/breadcrumb/breadcrumb.js";
import { useRoute } from "vue-router";
import router from "@/router/index.js";

const route = useRoute();
const breadcrumbStore = useBreadcrumbStore();
const tags = ref([]);
    
//面包屑数据从菜单组件路由切换时进行本地缓存
tags.value = breadcrumbStore.tagList;

//点击面包屑切换路由
const changRouter = (item) => {
  router.push(item.path);
};

//移除面包屑逻辑
const handleClose = (item, index) => {
  let length = tags.value.length - 1;
  //移除pina中的面包屑
  breadcrumbStore.clearTags(item);
  if (item.name !== route.name) {
    return;
  }
    //第一种情况：从最后一个面包屑依次关闭过来，就将路由往前一个面包屑跳转。
  if (index === length) {
    router.push({ name: tags.value[index - 1].name });
  } else {
      //第二种情况：从中间一个面包屑开始关闭过来，就将路由往后一个面包屑跳转。
    router.push({ name: tags.value[index].name });
  }
};
</script>
<style scoped lang="scss">
.tags {
  height: $base-bottom-header-height;
}

.el_tags {
  font-family: "微软雅黑体";
  font-size: 14px;
}

:deep(.el-tag){
  border-radius: 0;
}
</style>
```



### 4、刷新功能

**由俩组件联动实现，头部的右侧组件点击刷新按钮时本地存储一个Refresh标识位，Main展示区组件使用watch函数监听Refresh的变化**



**头部右侧组件核心代码**

```js
<template>
    <el-tooltip content="刷新" placement="bottom">
      <el-button @click="doRefresh" circle icon="Refresh"></el-button>
    </el-tooltip>
</template>

<script setup>
    import { useRefreshStore } from "@/stores/models/refresh/refresh.js";
//刷新标志进行本地存储
const doRefresh = () => {
  useRefresh.refresh = !useRefresh.refresh;
};
</script>
```



**Main展示区组件：**

```vue
<template>
  <el-main :style="{background: themeStore.isDark ? '' : 'rgb(245,245,245)'}">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </el-main>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useRefreshStore } from "@/stores/models/refresh/refresh.js";
import { useThemeStore } from "@/stores/models/theme/theme.js";

const themeStore = useThemeStore();
const useRefresh = useRefreshStore();
//控制当前组件是否销毁重建
const flag = ref(true);

//监听pina中存储的refresh是否改变，若改变则说明刷新
watch(
  () => useRefresh.refresh,
  () => {
    //点击刷新按钮，路由组件销毁
    flag.value = false;
    //紧接着又重新创建组件，相当于重新发送请求
    nextTick(() => {
      flag.value = true;
    });
  }
);
</script>


<style scoped lang="scss">
.el-main{
  width: auto;
}

.fade-enter-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
```



### 5、全屏功能

**使用到了插件screenfull**

>**安装npm install screenfull**



**点击全屏按钮触发事件：核心代码**

```js
//全屏
const changeScreen = () => {
  if (screenfull.isEnabled) {
      //可以来回切换全屏/非全屏
    screenfull.toggle();
  } else {
    ElMessage({
      message: "您的浏览器不支持全屏！",
      type: "warning",
    });
  }
};
```



### 6、主题设置

#### 主题颜色

**点击主题颜色弹出颜色拾取器进行颜色选择：核心逻辑**

```js
//修改主题颜色
const changeThemeColor = () => {
  //通知js修改根节点的样式对象的属性与属性值
  let html = document.documentElement;
  themeStore.menuBgColor = color.value;
  //可以设置一个单独的文件进行主题颜色修改配置
  html.style.setProperty("--el-color-primary", color.value);
};
```



#### 暗黑模式

**使用组件库提供的暗黑模式**

**需要在main.js入口文件中引入样式：**

```js
import "element-plus/theme-chalk/dark/css-vars.css";
```



```js
//暗黑模式切换
const change = () => {
  //获取html根节点
  let html = document.documentElement;
  if (dark.value) {
    themeStore.isDark = true;
  } else {
    themeStore.isDark = false;
  }
  //判断html是否有类名dark
  dark.value ? (html.className = "dark") : (html.className = "");
};
```



#### **简约白/商务黑/设置默认**

**实现思路就是通过本地缓存一些必要的值，修改时进行相应颜色的改变即可**

```js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  //判断是否切换主题，主要用于弹出抽屉
  const theme = ref(false);
  //侧边栏背景默认偏黑色
  const bgColor = ref("linear-gradient(to right, #141e30, #243b55)");
  //侧边栏菜单背景默认偏黑色
  const menuBgColor = ref("#545c64");
  //字体颜色默认白色
  const fontColor = ref("#fff");
  //判断是否是暗黑模式，默认不是暗黑模式
  const isDark = ref(false);

  //修改侧边栏主题色：简约白 / 商务黑
  const changeSideTheme = (val) => {
    if (val === "light") {
      bgColor.value = "#fff";
      fontColor.value = "#000000";
    } else {
      bgColor.value = "#191a23";
      fontColor.value = "#fff";
    }
  };

  //设置默认主题样式
  const setDefaultTheme = () => {
    //侧边栏背景默认偏黑色
    bgColor.value = "linear-gradient(to right, #141e30, #243b55)";
    //侧边栏菜单背景默认偏黑色
    menuBgColor.value = "#545c64";
    //字体颜色默认白色
    fontColor.value = "#fff";
  }

  return {
    theme,
    bgColor,
    fontColor,
    changeSideTheme,
    isDark,
    menuBgColor,
    setDefaultTheme,
  };
});
```



## 四、主展示区

**过渡效果：将Main组件单独抽离出来**

```vue
<template>
  <el-main :style="{background: themeStore.isDark ? '' : 'rgb(245,245,245)'}">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </el-main>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useRefreshStore } from "@/stores/models/refresh/refresh.js";
import { useThemeStore } from "@/stores/models/theme/theme.js";

const themeStore = useThemeStore();
const useRefresh = useRefreshStore();
//控制当前组件是否销毁重建
const flag = ref(true);

//监听pina中存储的refresh是否改变，若改变则说明刷新
watch(
  () => useRefresh.refresh,
  () => {
    //点击刷新按钮，路由组件销毁
    flag.value = false;
    //紧接着又重新创建组件，相当于重新发送请求
    nextTick(() => {
      flag.value = true;
    });
  }
);
</script>


<style scoped lang="scss">
.el-main{
  width: auto;
}


//过渡效果css设置    
.fade-enter-active {
  transition: opacity 0.5s, transform 0.5s;
}
//过渡效果css设置
.fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
//过渡效果css设置
.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
```



## 五、动态路由

### 实现思路

**将所有路由分为常量路由、异步路由、任意路由，这些路由是什么呢？**

- **常量路由：任何角色都可以访问的路由**
- **异步路由：特定角色可以访问的路由**
- **任意路由：当匹配不到任何路由时兜底访问的路由**

### 拆分路由

```js
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
```



### 常量路由添加

**在router/index.js文件中注册常量路由**

==注意：这里会有一个疑问？明明路由拆分文件中有常量路由constantRoutes，为什么这里routes注册的却是从userStore仓库里引进来的路由userStore.menuRoutes，这里必须是这样，因为后期用户登录后需要重新动态添加路由，不使用这个刷新页面时会有一个非常严重的bug。页面出现白屏😥==

```js
// 从"vue-router"中导入createWebHistory和createRouter方法
import { createWebHistory, createRouter } from "vue-router";
// 导入常量路由配置
import useUserStore from "../stores/models/user/user";
import pinia from "@/stores";

const userStore = useUserStore(pinia);
const router = createRouter({
  // 创建基于HTML5 history模式的history实例
  history: createWebHistory(),
  // 设置路由配置
  routes: userStore.menuRoutes,
});

// 导出路由
export default router;

```



### 动态路由添加

**以上是常量路由配置，这时登录后台谁都只能访问这些菜单，那么什么时机获取某个角色拥有的异步菜单路由呢？一般我们在用户登录完成后路由跳转时在前置路由中进行异步路由数据的获取。**



**下面我们来重点分析用户仓库中有哪些操作？**

```js
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
        this.username = res.data.user.username;
        this.avatar = res.data.user.username;
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
    },
  },
});

export default useUserStore;
```



**用户仓库重点有三个函数分别时登录(login)，获取用户数据(userInfo)、退出登录(logout)。**

- **登录(login)：登录函数在Login.vue组件中使用，当用户登录完成后会返回token，我们将token进行本地存储**
- **获取用户数据(userInfo)：主要是在前置路由中第一次登录时获取当前用户的异步路由数据以及用户名和头像等信息。核心是将获取到的异步路由动态添加到路由中，下面会重点分析。**
- **退出登录(logout)：做一些本地存储数据的删除操作。**



**前置路由：抽离到一个单独的文件中**

```js
//路由鉴权文件
import router from "./router";
//引入nprogress进度条
import nprogress from "nprogress";
//引入全局配置
import setting from "./setting.js";
//引入nprogress样式
import "nprogress/nprogress.css";
import useUserStore from "@/stores/models/user/user.js";
nprogress.configure({ showSpinner: false });

//全局前置路由
router.beforeEach(async (to, from, next) => {
  //进度条开始动
  nprogress.start();
  //获取token判断用户是否登录
  const userStore = useUserStore();
  let username = userStore.username;
  let token = userStore.token;
  if (token) {
    //用户已登录
    if (to.path === "/login") {
      next("/");
    } else {
      if (username) {
        next();
      } else {
        try {
          //获取当前用户的异步路由数据
          await userStore.userInfo();
          //必须要这样写，否则路由还未加载完就执行next()会有bug
          next({ ...to });
        } catch (error) {
          //做一些token过期的操作
          userStore.logout();
          next({ path: "/login", query: { redirect: to.path } });
        }
      }
    }
  } else {
    //用户未登录
    if (to.path === "/login") {
      next();
    } else {
      next({ path: "/login" });
    }
  }
});

//全局后置路由
router.afterEach((to, from) => {
  //切换浏览器标题
  document.title = `${setting.title} - ${to.meta.title}`;
  //进度条结束
  nprogress.done();
});
```





## 六、按钮权限

### 自定义指令

**在跟目录下新建button文件夹再创建has.js文件**

```js
import pinia from "@/stores";
import useUserStore from "../stores/models/user/user";

const uesrStore = useUserStore(pinia);
export const hasButton = (app) => {
  
    //全局自定义指令v-has，实现按钮权限判断
    app.directive('has', {
        //代办使用这个全局自定义指令的Dom/组件挂载完毕时会执行一次
        mounted(el, options) {
            //el为元素，options是指令的选项对象
            if (!uesrStore.buttons.includes(options.value)) {
                //说明没有权限，直接删除元素即可
                el.remove();
                //以下是禁用
                //el.disabled = true;
          }
        },
    })
};
```



**在main.js入口文件中引入**

```js
//引入自定义指令文件
import { hasButton } from '@/button/has';

const app = createApp(App);
hasButton(app);
```



**页面中使用**

```vue
<template>
  <div style="height: 200vh">
    <el-card style="width: 100%; height: 100vh" shadow="never">
      <div style="margin-bottom: 50px;">其他</div>
      <div class="mb-4">
        <el-button type="primary" v-has="`btn:other:add`" plain
          >添加其他</el-button
        >
        <el-button type="warning" v-has="`btn:other:update`" plain>修改其他</el-button>
      </div>
    </el-card>
  </div>
</template>
```



**通过自定义的指令在需要进行权限设定的按钮或者其他组件上绑定v-has即可判断**