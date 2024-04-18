<!-- 封装一个面包屑展示组件 -->

<template>
  <div class="tags">
    <el-tag
      v-for="(item, index) in tags"
      :effect="route.name === item.name ? 'dark' : 'light'"
      size="large"
      :key="index"
      :closable="item.name !== 'home'"
      @click="changRouter(item)"
      style="margin: 5px"
      @close="handleClose(index)"
    >
      {{ item.label }}
    </el-tag>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useBreadcrumbStore } from "@/stores/breadcrumb.js";
import { useRoute } from "vue-router";
import router from "@/router/index.js";

const route = useRoute();
const breadcrumbStore = useBreadcrumbStore();
const tags = ref([]);
tags.value = breadcrumbStore.tagList;

//点击面包屑切换路由
const changRouter = (item) => {
  router.push(item.path);
};

//移除面包屑逻辑
const handleClose = (index) => {
  breadcrumbStore.tagList.splice(index, 1);
};
</script>
<style scoped>
.tags {
  height: 50px;
  width: 100%;
  background-color: #ddd;
  display: flex;
  padding: 5px;
}
</style>