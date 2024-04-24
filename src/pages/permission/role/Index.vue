<template>
  <div style="height: auto">
    <!-- 头部搜索 -->
    <el-card style="width: 100%; margin-bottom: 10px" shadow="never">
      <!-- 头部搜索框 -->
      <el-row :gutter="10">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-input
            v-model="roleName"
            style="width: 35%"
            placeholder="请输入角色名"
            size="large"
          >
          </el-input>
        </el-col>
        <el-col
          style="display: flex; justify-content: flex-end; align-items: center"
          :xs="12"
          :sm="12"
          :md="12"
          :lg="12"
          :xl="12"
        >
          <el-space :size="20">
            <el-button type="primary" plain>搜索</el-button>
            <el-button type="danger" plain>重置</el-button>
          </el-space>
        </el-col>
      </el-row>
    </el-card>

    <!-- 表格展示数据 -->
    <el-card style="width: 100%" shadow="never">
      <div style="margin-bottom: 10px">
        <el-button
          v-has="`btn:role:add`"
          @click="handleAddRole"
          plain
          type="primary"
          >新增</el-button
        >
      </div>

      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="roleName" label="角色" width="150" />
        <el-table-column fixed="right" label="选项">
          <template #default="scope">
            <el-button
              :icon="Lock"
              type="primary"
              size="small"
              v-has="`btn:role:per`"
              @click="handleOpenDrawer(scope.row)"
            >
              分配权限
            </el-button>
            <el-button
              v-has="`btn:role:update`"
              :icon="Edit"
              type="primary"
              size="small"
              >编辑</el-button
            >
            <el-button
              v-has="`btn:role:remove`"
              :icon="Delete"
              type="danger"
              size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div style="margin-top: 20px">
        <el-pagination
          v-model:current-page="pageNo"
          :page-size="pageSize"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>

    <!-- 新增弹框 -->
    <div>
      <el-dialog
        style="border-radius: 5px"
        v-model="isDialog"
        align-center
        :show-close="false"
        title="新增角色"
        :width="300"
      >
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
      <el-drawer
        @close="handleDrawerClose"
        size="24%"
        v-model="isDrawer"
        title="分配权限"
      >
        <template #default>
          <el-tree
            ref="tree"
            style="max-width: 600px"
            :data="menuData"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            :default-checked-keys="checkedKeys"
            default-expand-all
          />

          <div class="confim">
            <el-button type="primary" plain @click="handleSavePermission"
              >确认</el-button
            >
          </div>
        </template>
      </el-drawer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { findRoleList, save, savePermission } from "@/api/role";
import { queryMenuList, queryRoleMenu } from "@/api/menu";
import { Lock, Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

//表格数据
const tableData = ref([]);
const pageNo = ref(1);
const pageSize = ref(10);
const total = ref(0);
//搜索用户名
const roleName = ref("");
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
  findRoleList(pageNo.value, pageSize.value, roleName.value).then((res) => {
    if (res.code === 200 && res.data !== null) {
      tableData.value = res.data.data;
      total.value = res.data.total;
    }
  });
};

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
</style>