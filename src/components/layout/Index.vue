<template>
  <div class="common-layout">
    <el-container>
      <!-- 左侧菜单栏 -->
      <Aside />
      <el-container>
        <el-header>
          <Header />
        </el-header>
        <Main />
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import Aside from "@/components/aside/Index.vue";
import Main from "@/components/main/Index.vue";
import Header from "@/components/header/Index.vue";
</script>


<style scoped lang="scss">
.common-layout {
  width: 100%;
  height: 100vh;
  .el-container {
    width: 100%;
    height: 100vh;
    .el-header {
      padding: 0;
      margin: 0;
      height: $base-menu-header-height;
      width: auto;
    }
  }
}
:deep(.el-divider--horizontal) {
  margin: 0;
}
</style>