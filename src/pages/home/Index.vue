<template>
  <div class="common">
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
  </div>
</template>

<script setup>
import { ref } from "vue";

</script>

<style scoped lang="less">

</style>
