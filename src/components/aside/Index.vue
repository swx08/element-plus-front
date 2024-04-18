<template>
  <el-aside :width="collapseStore.collapse ? '64px' : '200px'">
    <el-menu
      default-active="2"
      class="el-menu-vertical"
      background-color="linear-gradient(to right, #141e30, #243b55)"
      text-color="#fff"
      active-text-color="#409EFF"
      :collapse="collapseStore.collapse"
      :collapse-transition="false"
    >
      <!-- 一级菜单 -->
      <el-menu-item
        :index="item.path"
        v-for="(item, index) in noChildren()"
        :key="index"
        @click="changeRouter(item)"
        class="el_menu_"
      >
        <component class="icons" :is="item.icon" />
        <span>{{ item.label }}</span>
      </el-menu-item>

      <!-- 二级菜单 -->
      <el-sub-menu
        :index="item.path"
        v-for="(item, index) in hasChildren()"
        :key="index"
      >
        <template #title>
          <component class="icons" :is="item.icon" />
          <span>{{ item.label }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="subItem.path"
            v-for="(subItem, index) in item.children"
            :key="index"
            @click="changeRouter(subItem)"
            class="el_menu_"
          >
            <component class="icons" :is="subItem.icon" />
            <span>{{ subItem.label }}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </el-aside>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Location, Setting } from "@element-plus/icons-vue";
import router from "@/router/index.js";
import { useCollapseStore } from "@/stores/collapse.js";

const collapseStore = useCollapseStore();
const menuList = [
  {
    path: "home",
    name: "home",
    label: "首页",
    icon: "House",
    url: "/home/index",
  },
  {
    path: "user",
    name: "user",
    label: "用户管理",
    icon: "user",
    url: "/user/index",
  },
  {
    label: "其他",
    icon: "location",
    children: [
      {
        path: "page1",
        name: "page1",
        label: "页面1",
        icon: "setting",
        url: "/other/page1/index",
      },
      {
        path: "page2",
        name: "page2",
        label: "页面2",
        icon: "setting",
        url: "/other/page2/index",
      },
    ],
  },
];

//无子菜单过滤方法
const noChildren = () => {
  return menuList.filter((item) => !item.children);
};

//有子菜单过滤方法
const hasChildren = () => {
  return menuList.filter((item) => item.children);
};

//路由跳转
const changeRouter = (item) => {
  router.push(item.path);
};
</script>



<style lang="less" scoped>
.el-aside{
  height: 100vh;
}

.el-menu-vertical {
  border-right: none;
  height: 100vh;
  background-image: linear-gradient(to right, #141e30, #243b55);
}

:deep(.el-menu-item:hover){
  background: #1c88cf !important;
  color: #fff !important;
}
:deep(.el-submenu__title:hover) {
  background: #1c88cf !important;
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
  width: 18px;
  height: 18px;
}
</style>