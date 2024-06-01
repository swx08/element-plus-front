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
          <el-switch @change="handleChangeStatus(scope.row.id)" :disabled="scope.row.code === 'admin'" v-model="scope.row.checked" inline-prompt
            :active-icon="Check" :inactive-icon="Close" />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="220" />
      <el-table-column fixed="right" label="选项" width="300">
        <template #default="scope">
          <el-button :icon="Lock" type="primary" link v-has="`btn:role:per`" @click="handleOpenDrawer(scope.row)">
            分配权限
          </el-button>
          <el-button v-permission="`permission:role:update`" link :icon="Edit" type="primary"
            @click="handleEchoRole(scope.row.id)">修改</el-button>
          <el-popconfirm title="确认删除该角色？" confirm-button-text="确定" cancel-button-text="取消"
            @confirm="handleRemoveRole(scope.row.id)" width="160px">
            <template #reference>
              <el-button v-permission="`permission:role:delete`" link :icon="Delete" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
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
  <el-dialog @close="handlerCancel" v-model="addRoleOpen" :title="role.id === undefined ? '添加角色' : '修改角色'" width="500">
    <el-form :model="role" ref="formRef" :rules="rules">
      <el-form-item label="角色名称" prop="name" :label-width="140">
        <el-input placeholder="角色名称" style="width: 80%" v-model="role.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="角色标识" prop="code" :label-width="140">
        <el-input placeholder="角色标识" style="width: 80%" v-model="role.code" autocomplete="off" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSaveRole"> 确认 </el-button>
        <el-button @click="handlerCancel">取消</el-button>
      </div>
    </template>
  </el-dialog>

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
import { ref, onMounted } from "vue";
import { findRoleList, addRole, savePermission, echoRole, updateRole, removeRole, updateRoleStatus } from "@/api/role";
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
const role = ref({});

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

//修改角色弹框
const handleEchoRole = (id) => {
  echoRole(id).then((res) => {
    if (res.code === 200) {
      role.value = res.data;
      addRoleOpen.value = true;
    }
  })
}

//获取菜单数据 抽屉树形数据
const getAllMenuData = () => {
  queryMenuList().then((res) => {
    if (res.code === 200) {
      menuData.value = res.data;
    }
  });
};

//取消新增角色弹框
const handlerCancel = () => {
  addRoleOpen.value = false;
  role.value = {};
}

//新增、修改角色
const handleSaveRole = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      saveLoading.value = true;
      if (role.value.id === undefined) {
        addRole(role.value).then((res) => {
          if (res.code === 200) {
            ElMessage({
              type: 'success',
              message: '新增成功！'
            })
            addRoleOpen.value = false;
            saveLoading.value = false;
            role.value = {};
            getRoleList();
          } else {
            saveLoading.value = false;
          }
        })
      } else {
        updateRole(role.value).then((res) => {
          if (res.code === 200) {
            ElMessage({
              type: 'success',
              message: '修改成功！'
            })
            addRoleOpen.value = false;
            saveLoading.value = false;
            role.value = {};
            getRoleList();
          } else {
            saveLoading.value = false;
          }
        })
      }
    }
  })
}

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

//修改角色状态
const handleChangeStatus = (id) => {
  updateRoleStatus(id).then((res) => {
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '角色状态修改成功！'
      })
      getRoleList();
    }
  })
}

//删除角色
const handleRemoveRole = (id) => {
  removeRole(id).then((res) => {
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '删除成功！'
      })
      getRoleList();
    }
  })
}

const formRef = ref();
const rules = ref({
  name: [
    {
      required: true,
      message: '请输入角色名称',
      trigger: 'change',
    },
  ],
  code: [
    {
      required: true,
      message: '请输入角色标识',
      trigger: 'change',
    },
  ],
})
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