<template>
  <div
    :style="{
      background: themeStore.isDark ? '' : '#fff',
      padding: '20px',
      height: '200vh',
    }"
  >
    <el-button>首页</el-button>

    <div>
      <el-pagination
        v-model:current-page="currentPage1"
        :page-size="100"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, prev, pager, next"
        :total="1000"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <div class="mb-4">
      <el-button>Default</el-button>
      <el-button type="primary">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>

    <div class="mb-4">
      <el-button plain>Plain</el-button>
      <el-button type="primary" plain>Primary</el-button>
      <el-button type="success" plain>Success</el-button>
      <el-button type="info" plain>Info</el-button>
      <el-button type="warning" plain>Warning</el-button>
      <el-button type="danger" plain>Danger</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useThemeStore } from "@/stores/models/theme/theme.js";

const themeStore = useThemeStore();
</script>

<style scoped lang="scss">
</style>
