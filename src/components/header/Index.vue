<template>
  <el-header>
    <!-- 左侧 -->
    <Left />

    <!-- 右侧 -->
    <Right />
  </el-header>
</template>

<script setup>
import Left from "@/components/header/left/Index.vue";
import Right from "@/components/header/right/Index.vue";
</script>


<style scoped lang="scss">
.el-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0;
  margin: 0;
  height: 60px;

  .l-content {
    display: flex;
    align-items: center;
    height: 100%;
    padding-left: 10px;
  }

  .r-content {
    display: flex;
    align-items: center;
  }
}
</style>