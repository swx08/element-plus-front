<template>
  <el-card style="width: 100%" shadow="never">

    <!-- 数据展示区 -->
    <el-table :data="menuData" style="width: 100%; margin-bottom: 20px" row-key="id">
      <el-table-column fixed prop="id" label="菜单编号" width="140" />
      <el-table-column fixed prop="name" label="组件名称" width="160" />
      <el-table-column prop="title" label="菜单名称" width="160" />
      <el-table-column label="类型" width="120">
        <template #default="scope">
          <el-tag type="primary" v-if="scope.row.type === 0">目录</el-tag>
          <el-tag type="success" v-if="scope.row.type === 1">菜单</el-tag>
          <el-tag type="warning" v-if="scope.row.type === 2">按钮</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="permission" label="权限标识" width="200" />
      <el-table-column prop="component" label="组件路径" width="220" />
      <el-table-column prop="status" label="状态" width="120">
        <template #default="scope">
          <el-tag type="primary" v-if="scope.row.status === 1">开启</el-tag>
          <el-tag type="danger" v-if="scope.row.status === 0">关闭</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="240">
        <template #default>
          <el-button link type="primary" :icon="CirclePlus">
            新增
          </el-button>
          <el-button link type="primary" :icon="Delete">修改</el-button>
          <el-button link type="danger" :icon="Edit">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

</template>

<script setup>
import { ref, onMounted } from "vue";
import { queryMenuList, queryRoleMenu } from "@/api/menu";
import { Delete, Edit, CirclePlus} from '@element-plus/icons-vue'

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