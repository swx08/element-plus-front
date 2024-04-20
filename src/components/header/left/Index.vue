<template>
  <!-- 左侧 -->
  <div class="l-content">
    <div>
      <el-icon
        v-if="!collapseStore.collapse"
        class="icons"
        @click="changeCollapse"
        ><Fold
      /></el-icon>
      <el-icon
        class="icons"
        v-if="collapseStore.collapse"
        @click="changeCollapse"
        ><Expand
      /></el-icon>
    </div>

    <div>
      <el-breadcrumb
        separator="/"
        style="font-family: '微软雅黑体'; font-size: 14px; margin-left: 10px"
      >
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="current" :to="current.path">{{
          current.meta.title
        }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCollapseStore } from "@/stores/models/collapse/collapse.js";
import { useBreadcrumbStore } from "@/stores/models/breadcrumb/breadcrumb.js";

const breadcrumbStore = useBreadcrumbStore();
const collapseStore = useCollapseStore();
const changeCollapse = () => {
  collapseStore.collapse = !collapseStore.collapse;
};

const current = computed(() => {
  return breadcrumbStore.breadcrumb;
});
</script>
<style scoped lang="scss">
.l-content {
  display: flex;
  align-items: center;
  padding-left: 10px;
}

.font_common {
  font-family: "微软雅黑";
  font-size: 14px;
}
</style>