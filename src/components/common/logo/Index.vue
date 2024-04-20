<template>
  <div
    class="logo"
    v-if="!setting.logoHidden"
    :class="{ collapse: collapseStore.collapse ? true : false }"
  >
    <el-space :size="10">
      <el-avatar :src="setting.logo"></el-avatar>
      <span class="logo_title" v-if="!collapseStore.collapse">{{
        setting.title
      }}</span>
    </el-space>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import setting from "@/setting.js";
import { useCollapseStore } from "@/stores/models/collapse/collapse.js";
const collapseStore = useCollapseStore();
</script>


<style scoped lang="scss">
.logo {
  width: $base-menu-side-width;
  display: flex;
  justify-content: center;
  align-items: center;
  height: $base-menu-logo-height;
  background-color: $base-logo-background;

  // 左侧菜单收缩样式
  &.collapse {
    width: $base-menu-min-side-width;
  }

  .logo_title {
    font-family: "微软雅黑体";
    color: #fff;
    font-size: $base-logo-title-size;
  }
}
</style>