<template>
  <div class="logo" v-if="setting.logoHidden">
    <div class="logo-container">
      <el-space :size="5">
        <el-avatar :src="setting.logo"></el-avatar>
        <span class="logo_title" v-if="!collapseStore.collapse">{{
          setting.title
        }}</span>
      </el-space>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import setting from "@/setting.js";
import { useCollapseStore } from "@/stores/collapse.js";

const collapseStore = useCollapseStore();
</script>


<style scoped lang="scss">
.logo {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: $base-menu-logo-height;
  background-color: $base-logo-background;

  .logo-container {
    padding: 15px;
    .logo_title {
      margin-left: 10px;
      font-family: "微软雅黑体";
      color: #fff;
      font-size: $base-logo-title-size;
    }
  }
}
</style>