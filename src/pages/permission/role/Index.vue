<template>
  <!-- 头部搜索 -->
  <el-card style="width: 100%" shadow="never">
    <!-- 顶部搜索区 -->
    <template #header>
      <div style="display: flex;">
        <el-row :gutter="10" class="a-row-search">
          <el-col :lg="8">
            <span>角色名称：</span>
            <el-input style="width: 200px" v-model="searchRole.name" placeholder="角色名称"></el-input>
          </el-col>
          <el-col :lg="8">
            <span>角色标识：</span>
            <el-input style="width: 200px" v-model="searchRole.code" placeholder="角色标识"></el-input>
          </el-col>
          <el-col :lg="8">
            <span>角色状态：</span>
            <el-select v-model="searchRole.status" placeholder="角色状态" style="width: 200px">
              <el-option label="开启" :value="1">开启</el-option>
              <el-option label="关闭" :value="0">关闭</el-option>
            </el-select>
          </el-col>
        </el-row>

        <div class="right-btn">
          <el-space :size="40">
            <el-button type="primary" v-permission="`permission:role:query`" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset" v-permission="`permission:role:reset`">重置</el-button>
          </el-space>
        </div>
      </div>
    </template>

    <!-- 新增角色区域 -->
    <div style="height: 60px;">
      <el-button type="primary" :icon="CirclePlus" v-permission="`permission:role:add`" @click="handlerAddRoleOpen">
        新增
      </el-button>
    </div>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="角色编号" width="140" />
      <el-table-column prop="name" label="角色名称" width="180" />
      <el-table-column prop="code" label="角色标识" width="180" />
      <el-table-column prop="status" label="状态" width="160">
        <template #default="scope">
          <el-switch :disabled="scope.row.code === 'admin'" v-model="scope.row.checked" inline-prompt :active-icon="Check" :inactive-icon="Close" />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="220" />
      <el-table-column fixed="right" label="选项" width="300">
        <template #default="scope">
          <el-button :icon="Lock" type="primary" link v-has="`btn:role:per`" @click="handleOpenDrawer(scope.row)">
            分配权限
          </el-button>
          <el-button v-has="`btn:role:update`" link :icon="Edit" type="primary">编辑</el-button>
          <el-button v-has="`btn:role:remove`" link :icon="Delete" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div style="margin-top: 20px">
      <el-pagination v-model:current-page="pageNo" :page-size="pageSize" :small="small" :disabled="disabled"
        :background="background" layout="total, prev, pager, next" :total="total" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" />
    </div>
  </el-card>

  <!-- 新增弹框 -->
  <div>
    <el-dialog style="border-radius: 5px" v-model="addRoleOpen" align-center :show-close="false" title="新增角色"
      :width="300">
      <div style="margin-top: 10px">
        <el-form :model="role">
          <el-form-item label="角色" :label-width="40">
            <el-input v-model="role.roleName" autocomplete="off" />
          </el-form-item>
          <el-form-item label="序号" :label-width="40">
            <el-input type="number" v-model="role.sort" autocomplete="off" />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="handleConsole">取消</el-button>
          <el-button type="primary" @click="saveRole"> 确认 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>

  <!-- 分配权限抽屉 -->
  <div>
    <el-drawer @close="handleDrawerClose" size="24%" v-model="isDrawer" title="分配权限">
      <template #default>
        <el-tree ref="tree" style="max-width: 600px" :data="menuData" show-checkbox node-key="id" :props="defaultProps"
          :default-checked-keys="checkedKeys" default-expand-all />

        <div class="confim">
          <el-button type="primary" plain @click="handleSavePermission">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { findRoleList, save, savePermission } from "@/api/role";
import { queryMenuList, queryRoleMenu } from "@/api/menu";
import { Lock, Edit, Delete, Check, Close, CirclePlus } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

//表格数据
const tableData = ref([]);
const pageNo = ref(1);
const pageSize = ref(10);
const total = ref(0);
const addRoleOpen = ref(false);
const searchRole = ref({
  name: "",
  code: "",
  status: null
});
//搜索用户名
const saveLoading = ref(false);
//新增角色弹框
const isDialog = ref(false);
//分配权限抽屉弹出
const isDrawer = ref(false);
const menuData = ref([]);
const defaultProps = {
  children: "children",
  label: "label",
};
//默认选中
const checkedKeys = ref([]);
//获取树节点的ref
const tree = ref(null);
//用来临时存储role的值
const tempRole = ref(null);

//收集角色表单内容
const role = ref({
  roleName: "",
  sort: null,
});

onMounted(() => {
  getRoleList();
});

//获取用户分页数据
const getRoleList = () => {
  findRoleList(pageNo.value, pageSize.value, searchRole.value).then((res) => {
    if (res.code === 200 && res.data !== null) {
      tableData.value = res.data.data;
      total.value = res.data.total;
    }
  });
};

//重置
const handleReset = () => {
  searchRole.value = {
    name: "",
    code: "",
    status: null
  }
  getRoleList();
}

//查询
const handleSearch = () => {
  if ((searchRole.value.name !== "") || (searchRole.value.code !== "") || (searchRole.value.status !== null)) {
    saveLoading.value = true;
    getRoleList();
    saveLoading.value = false;
  }
}

//新增角色弹框
const handlerAddRoleOpen = () => {
  addRoleOpen.value = true;
}

//获取菜单数据 抽屉树形数据
const getAllMenuData = () => {
  queryMenuList().then((res) => {
    if (res.code === 200) {
      menuData.value = res.data;
    }
  });
};

//新增角色按钮弹框
const handleAddRole = () => {
  isDialog.value = true;
};

//取消新增角色
const handleConsole = () => {
  isDialog.value = false;
};

//新增角色逻辑
const saveRole = () => {
  save(role.value).then((res) => {
    if (res.code === 200) {
      ElMessage({
        message: "新增角色成功",
        type: "success",
      });
      isDialog.value = false;
      getRoleList();
    }
  });
};

//分配权限抽屉弹出逻辑
const handleOpenDrawer = (role) => {
  tempRole.value = role;
  //获取当前角色所有的菜单权限的id
  queryRoleMenu(role).then((res) => {
    if (res.code === 200) {
      checkedKeys.value = res.data;
      getAllMenuData();
      isDrawer.value = true;
    }
  });
};

//抽屉关闭时的回调
const handleDrawerClose = () => {
  checkedKeys.value = [];
  tempRole.value = null;
  isDrawer.value = false;
  console.log("我是关闭");
};

//保存分配好的权限数据
const handleSavePermission = () => {
  let tempKeys = tree.value.getCheckedKeys();
  let halfKeys = tree.value.getHalfCheckedKeys();
  let finalKeys = tempKeys.concat(halfKeys);
  savePermission(finalKeys, tempRole.value.id).then((res) => {
    if (res.code === 200) {
      ElMessage({
        message: "分配权限成功",
        type: "success",
      });
      isDrawer.value = false;
    }
  });
};
</script>


<style scoped lang="scss">
.confim {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

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