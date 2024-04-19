<template>
  <el-header>
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
          style="font-family: '微软雅黑体'; font-size: 14px"
        >
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-if="current" :to="current.path">{{
            current.label
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <!-- 右侧 -->
    <div class="r-conten">
      <el-dropdown class="el_dropdown">
        <el-space :size="8">
          <el-avatar
            shape="square"
            :size="40"
            src="https://ice.frostsky.com/2024/04/18/7f1f5acf8f45032e26fb73f6db9f2e24.jpeg"
          />
          <span>admin</span>
          <el-icon class="icons">
            <arrow-down />
          </el-icon>
        </el-space>

        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useCollapseStore } from "@/stores/collapse.js";
import { useBreadcrumbStore } from "@/stores/breadcrumb.js";

const breadcrumbStore = useBreadcrumbStore();
const collapseStore = useCollapseStore();
const changeCollapse = () => {
  collapseStore.collapse = !collapseStore.collapse;
};

const current = computed(() => {
  return breadcrumbStore.breadcrumb;
});
</script>
<style scoped>
.el-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  padding: 0;
  margin: 0;
  height: 60px;
}

.l-content {
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 10px;
}

.r-content {
  display: flex;
  align-items: center;
  height: 100%;
}

.el_dropdown {
  display: flex;
  height: 100%;
  align-items: center;
}

.icons {
  margin-right: 10px;
  width: 23px;
  height: 23px;
}

.font_common {
  font-family: "微软雅黑";
  font-size: 14px;
}
</style>