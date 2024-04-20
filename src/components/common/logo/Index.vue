<template>
  <div
    class="logo"
    v-if="!setting.logoHidden"
    :style="{backgroundColor: themeStore.bgColor}"
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
import setting from "@/setting.js";
import { useCollapseStore } from "@/stores/models/collapse/collapse.js";
import { useThemeStore } from "@/stores/models/theme/theme.js";

const collapseStore = useCollapseStore();
const themeStore = useThemeStore();
</script>


<style scoped lang="scss">
.logo {
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