<template>
  <div class="layout-container">
    <!-- 左侧菜单栏 -->
    <div class="layout-sider" :class="{collapse: collapseStore.collapse ? true : false}">
      <Logo />
      <el-scrollbar class="scrollbar">
        <Aside />
      </el-scrollbar>
    </div>

    <!-- 顶部 -->
    <div class="layout-header" :class="{collapse: collapseStore.collapse ? true : false}">
      <Header />
      <el-divider></el-divider>
      <RouterTags />
    </div>

    <!-- 内容展示区 -->
    <div class="layout-main" :class="{collapse: collapseStore.collapse ? true : false}">
      <Main />
    </div>
  </div>
</template>


<script setup>
import Logo from "@/components/common/logo/Index.vue";
import Aside from "@/components/aside/Index.vue";
import Main from "@/components/main/Index.vue";
import Header from "@/components/header/Index.vue";
import RouterTags from "@/components/common/tags/Index.vue";
import { useCollapseStore } from "@/stores/collapse.js";

const collapseStore = useCollapseStore();
</script>


<style scoped lang="scss">
.layout-container {
  width: 100%;
  height: 100vh;
  // 左侧菜单样式
  .layout-sider {
    height: 100vh;
    width: $base-menu-side-width;
    background: $base-menu-side-background;

    .scrollbar{
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
    }

    // 左侧菜单收缩样式
    &.collapse{
      width: $base-menu-min-side-width;
    }
  }
  // 顶部样式
  .layout-header {
    width: calc(100% - $base-menu-side-width);
    height: $base-menu-header-height;
    background: $base-menu-header-background;
    // 顶部位置定位
    position: fixed;
    top: 0px;
    left: $base-menu-side-width;

    // 左侧菜单收缩样式
    &.collapse{
      width: calc(100% - $base-menu-min-side-width);
      left: $base-menu-min-side-width;
    }
  }
  // 内容展示区样式
  .layout-main {
    width: calc(100% - $base-menu-side-width);
    height: calc(100vh - $base-menu-header-height);
    background: $base-menu-main-background;
    // 内容展示区位置定位
    position: absolute;
    top: $base-menu-header-height;
    left: $base-menu-side-width;
    overflow: auto;

    // 左侧菜单收缩样式
    &.collapse{
      width: calc(100% - $base-menu-min-side-width);
      left: $base-menu-min-side-width;
    }
  }
}

:deep(.el-divider--horizontal){
  margin: 0;
}
</style>