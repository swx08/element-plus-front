<template>
  <el-header>
    <div class="l-content">
      <el-icon v-if="!collapseStore.collapse" size="23" @click="changeCollapse"
        ><Fold
      /></el-icon>
      <el-icon v-if="collapseStore.collapse" size="23" @click="changeCollapse"
        ><Expand
      /></el-icon>
    </div>

    <div class="r-conten"></div>
  </el-header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCollapseStore } from "@/stores/collapse.js";

const collapseStore = useCollapseStore();
const changeCollapse = () => {
  collapseStore.collapse = !collapseStore.collapse;
};
</script>
<style scoped>
.el-header {
  width: 100%;
  background-color: #fff;
  padding: 0;
  margin: 0;
  height: 60px;
}

.l-content{
  display: flex;
  align-items: center;
  height: 100%;
  padding-left: 10px;
}
</style>