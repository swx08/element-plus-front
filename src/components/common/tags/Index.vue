<!-- 封装面包屑展示组件 -->
<template>
  <div class="tags">
    <el-tag
      v-for="(item, index) in tags"
      :key="index"
      size="large"
      :color="route.name === item.name ? '#d9ecff' : '#fff'"
      :closable="item.name !== 'Home'"
      @click="changRouter(item)"
      :style="{color: route.name === item.name ? 'rgb(77, 112, 255)' : ''}"
      @close="handleClose(item, index)"
      class="el_tags"
    >
      {{ item.meta.title }}
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
const handleClose = (item, index) => {
  let length = tags.value.length - 1;
  //移除pina中的面包屑
  breadcrumbStore.clearTags(item);
  if (item.name !== route.name) {
    return;
  }
  if (index === length) {
    router.push({ name: tags.value[index - 1].name });
  } else {
    router.push({ name: tags.value[index].name });
  }
};
</script>
<style scoped>
.tags {
  height: 32.2px;
  width: 100%;
  background-color: #fff;
  display: flex;
}

.el_tags {
  font-family: "微软雅黑体";
  font-size: 14px;
}

:deep(.el-tag){
  border-radius: 0;
}
</style>