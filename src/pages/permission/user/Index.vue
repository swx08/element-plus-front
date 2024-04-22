<template>
  <div style="height: 200vh">
    <el-card style="width: 100%; height: 100vh" shadow="never">
      <div style="margin-bottom: 50px;">用户管理</div>
      <div class="mb-4">
        <el-button type="primary" v-has="`btn:user:add`" plain
          >添加用户</el-button
        >
        <el-button type="success" plain>查看用户</el-button>
        <el-button type="warning" plain>修改用户</el-button>
        <el-button type="danger" plain>删除用户</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
</script>
<style scoped>
</style>