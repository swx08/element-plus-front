<template>
  <el-main>
    <router-view />
  </el-main>
</template>

<script setup>
import { useBreadcrumbStore } from "@/stores/breadcrumb.js";
import { ref, onMounted, computed } from "vue";

const breadcrumbStore = useBreadcrumbStore();
</script>


<style scoped>
.el-main {
  padding: 20px;
  margin: 0;
}
</style>