<template>
  <el-table
    :data="menuData"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
  >
    <el-table-column prop="label" label="名称" sortable />
     <el-table-column prop="button" label="权限值" sortable />
  </el-table>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { queryMenuList, queryRoleMenu } from "@/api/menu";

//菜单展示数据
const menuData = ref([]);
onMounted(() => {
  getAllMenuData();
})

//获取菜单数据 抽屉树形数据
const getAllMenuData = () => {
  queryMenuList().then((res) => {
    if (res.code === 200) {
      menuData.value = res.data;
    }
  });
};
</script>
<style scoped>
</style>