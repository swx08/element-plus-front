<template>
  <el-aside :class="{ collapse: collapseStore.collapse ? true : false }">
    <Logo />
    <el-scrollbar class="scrollbar">
      <Meun :menuList="routes" />
    </el-scrollbar>
  </el-aside>
</template>

<script setup>
import Logo from "@/components/common/logo/Index.vue";
import Meun from "@/components/common/menu/Index.vue";
//引入路由
import routes from "@/router/routes.js";
import { useCollapseStore } from "@/stores/models/collapse/collapse.js";

const collapseStore = useCollapseStore();
</script>

<style scoped lang="scss">
.el-aside {
  width: $base-menu-side-width;
  height: 100vh;
  .scrollbar {
    height: calc(100vh - $base-menu-logo-height);
  }

  // 左侧菜单收缩样式
  &.collapse {
    width: $base-menu-min-side-width;
  }
}

.el-menu-vertical {
  border-right: none;
}
</style>
