<template>
  <Meun :menuList="routes" />
</template>

<script setup>
import Meun from "@/components/common/menu/Index.vue";
//引入路由
import routes from "@/router/routes.js";
</script>

<style scoped lang="scss">
.el-menu-vertical{
  border-right: none;
}
</style>
