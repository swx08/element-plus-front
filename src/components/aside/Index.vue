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