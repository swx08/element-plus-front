<template>
  <div class="common-layout">
    <el-container>
      <Aside />
      <el-container class="r-container">
        <Header />
        <Main />
      </el-container>
    </el-container>
  </div>
</template>


<script setup>
import Header from "@/components/header/Index.vue";
import Aside from "@/components/aside/Index.vue";
import Main from "@/components/main/Index.vue";
import Footer from "@/components/footer/Index.vue";
import { ref, onMounted } from "vue";
</script>
<style scoped lang="less">
.el-container{
  flex-wrap: wrap;
}

.common-layout {
  height: 100%;
  .el-container {
    height: 100%;
  }
}
</style>