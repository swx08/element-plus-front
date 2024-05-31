<template>
  <el-card style="width: 100%" shadow="never">
    <!-- 顶部搜索区 -->
    <template #header>
      <div style="display: flex;">
        <el-row :gutter="10" class="a-row-search">
          <el-col :lg="8">
            <span>菜单名称：</span>
            <el-input style="width: 200px" v-model="searchMenu.title" placeholder="菜单名称"></el-input>
          </el-col>
          <el-col :lg="8">
            <span>菜单类型：</span>
            <el-select v-model="searchMenu.type" placeholder="菜单类型" style="width: 200px">
              <el-option label="目录" :value="0">目录</el-option>
              <el-option label="菜单" :value="1">菜单</el-option>
              <el-option label="按钮" :value="2">按钮</el-option>
            </el-select>
          </el-col>
          <el-col :lg="8">
            <span>菜单状态：</span>
            <el-select v-model="searchMenu.status" placeholder="菜单状态" style="width: 200px">
              <el-option label="开启" :value="1">开启</el-option>
              <el-option label="关闭" :value="0">关闭</el-option>
            </el-select>
          </el-col>
        </el-row>

        <div class="right-btn">
          <el-space :size="40">
            <el-button type="primary" v-permission="`permission:menu:query`" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset" v-permission="`permission:menu:reset`">重置</el-button>
          </el-space>
        </div>
      </div>
    </template>

    <!-- 新增菜单区域 -->
    <div style="height: 60px;">
      <el-button type="primary" :icon="CirclePlus" v-permission="`permission:menu:add`" @click="handlerAddDicMenuOpen">
        新增
      </el-button>
    </div>

    <!-- 数据展示区 -->
    <el-table :data="menuData" height="50vh" style="width: 100%; margin-bottom: 20px;" row-key="id">
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
import { queryMenuList, queryRoleMenu, queryMenuListByLike } from "@/api/menu";
import { Delete, Edit, CirclePlus } from '@element-plus/icons-vue'

const searchMenu = ref({
  title: "",
  type: null,
  status: null
});

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

//模糊查询
const getMenuListByLike = () => {
  queryMenuListByLike(searchMenu.value).then((res) => {
    if (res.code === 200) {
      menuData.value = res.data;
      loading.value = false;
    }
  })
}

//重置
const handleReset = () => {
  searchMenu.value = {
    title: "",
    type: null,
    status: null
  };
  getAllMenuData();
}

//搜索
const handleSearch = () => {
  console.log(searchMenu.value)
  if ((searchMenu.value.title !== "") || (searchMenu.value.type !== null) || (searchMenu.value.status !== null)) {
    getMenuListByLike();
  }
}
</script>
<style scoped lang="scss">
.a-row-search {
  height: 60px;
  width: 85%;
  display: flex;
  align-items: center;
}

.right-btn {
  width: 15%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>