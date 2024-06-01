<template>
  <div
    class="logo"
    v-if="!setting.logoHidden"
    :style="{background: themeStore.bgColor}"
    :class="{ collapse: collapseStore.collapse ? true : false }"
  >
    <el-space :size="10">
      <svg-icon name="logo"></svg-icon>
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