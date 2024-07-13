<template>
  <el-menu class="el-menu-vertical" :text-color="themeStore.fontColor" :background-color="themeStore.menuBgColor"
    active-text-color="#409EFF" :collapse="collapseStore.collapse" :collapse-transition="false"
    :style="{ background: themeStore.bgColor }" router :default-active="breadcrumbStore.activeTag">
    <!-- 一级菜单 -->
    <template v-for="(item, index) in noChildren">
      <el-menu-item :index="item.path" :key="index" @click="changeRouter(item)" class="el_menu_"
        v-if="!item.meta.hidden">
        <component class="icons" :is="item.icon" />
        <template #title>{{ item.meta.title }}</template>
      </el-menu-item>
    </template>

    <!-- 二级菜单 -->
    <template v-for="(item, index) in hasChildren()" :key="index">
      <template v-if="item.children && item.children.length === 1">
        <el-menu-item :index="item.children[0].path" :key="index" @click="changeRouter(item.children[0])"
          class="el_menu_" v-if="!item.children[0].meta.hidden">
          <component class="icons" :is="item.children[0].meta.icon" />
          <template #title>{{ item.children[0].meta.title }}</template>
        </el-menu-item>
      </template>

      <template v-else>
        <el-sub-menu :index="item.path">
          <template #title>
            <component class="icons" :is="item.meta.icon" />
            <span>{{ item.meta.title }}</span>
          </template>
          <template v-for="(subItem, index) in item.children" :key="index">
            <el-menu-item v-if="!subItem.meta.hidden" :index="subItem.path" @click="changeRouter(subItem)"
              class="el_menu_">
              <component class="icons" :is="subItem.meta.icon" />
              <span>{{ subItem.meta.title }}</span>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </template>
  </el-menu>
</template>

<script setup>
import { computed, ref } from "vue";
import router from "@/router/index.js";
import { useCollapseStore } from "@/stores/models/collapse/collapse.js";
import { useBreadcrumbStore } from "@/stores/models/breadcrumb/breadcrumb.js";
import { useThemeStore } from "@/stores/models/theme/theme.js";

const themeStore = useThemeStore();
const breadcrumbStore = useBreadcrumbStore();
//接收父组件传进来的路由数据
const props = defineProps({
  menuList: [],
});

//控制侧边栏收缩和展开时的控制
const collapseStore = useCollapseStore();

//过滤出无子菜单的路由
const noChildren = () => {
  return props.menuList.filter((item) => !item.children);
};

//过滤出菜单路由，有子菜单的路由
const hasChildren = () => {
  return props.menuList.filter((item) => item.children);
};

//路由跳转
const changeRouter = (item) => {
  //点击菜单时路由跳转
  router.push(item.path);
  breadcrumbStore.activeTag = item.path;
  //点击菜单时获取头部面包屑路由展示数据
  breadcrumbStore.setBreadcrumb(item);
};
</script>

<script>
export default {
  name: "Menu",
};
</script>


<!-- 样式 -->
<style lang="scss" scoped>
.el-menu-vertical {
  border-right: none;
  height: 100vh;
}

:deep(.el-menu-item:hover) {
  background: #79bbff !important;
  color: #fff !important;
}

:deep(.el-submenu__title:hover) {
  background: #79bbff !important;
  color: #fff !important;
}

:deep(.el-menu-item.is-active) {
  background: #3370ff !important;
  color: #fff !important;
}

:deep(.el-submenu__title.is-active) {
  background: #3370ff !important;
  color: #fff !important;
}

.icons {
  width: 16px;
  height: 16px;
  margin-right: 7px;
}
</style>