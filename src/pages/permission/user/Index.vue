<template>
  <div style="height: auto">
    <!-- 头部搜索 -->
    <el-card style="width: 100%; margin-bottom: 10px" shadow="never">
      <el-row :gutter="10">
        <el-col :xs="12" :sm="12" :md="12" :lg="12" :xl="12">
          <el-input
            v-model="username"
            style="width: 35%"
            placeholder="请输入用户名"
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

    <!-- 表格数据展示 -->
    <el-card style="width: 100%" shadow="never">
      <div style="margin-bottom: 10px">
        <el-button
          v-has="`btn:user:add`"
          @click="handleAddUser"
          plain
          type="primary"
          >新增</el-button
        >
      </div>

      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="用户名" width="150" />
        <el-table-column prop="password" label="密码" width="120" />
        <el-table-column prop="roles" label="角色">
          <template #default="scope">
            <el-tag
              style="margin-right: 8px"
              v-for="(item, index) in scope.row.roles"
              :key="index"
              type="success"
              round
              effect="dark"
              :color="scope.row.username === 'admin' ? '#F56C6C' : ''"
              >{{ item }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="选项">
          <template #default="scope">
            <el-button
              :icon="User"
              type="primary"
              size="small"
              v-has="`btn:user:per:role`"
              @click="handleRole(scope.row)"
            >
              分配角色
            </el-button>
            <el-button
              v-has="`btn:user:update`"
              :icon="Edit"
              type="primary"
              size="small"
              >编辑</el-button
            >
            <el-button
              v-has="`btn:user:remove`"
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

    <!-- 分配角色抽屉 -->
    <el-drawer
      @close="handleDrawerClose"
      size="24%"
      v-model="isDrawer"
      title="分配角色"
    >
      <template #default>
        <el-form>
          <el-form-item label="用户名称">
            <el-input v-model="tempName" disabled=""></el-input>
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              全选
            </el-checkbox>
            <el-checkbox-group
              v-model="checkedRoles"
              @change="handleCheckedCitiesChange"
            >
              <el-checkbox
                v-for="role in roleList"
                :key="role"
                :label="role"
                :value="role"
              >
                {{ role }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>

        <div class="dialog-footer">
          <el-button plain type="primary" @click="handleAssign">
            确认
          </el-button>
        </div>
      </template>
    </el-drawer>

    <!-- 新增弹框 -->
    <div>
      <el-dialog
        style="border-radius: 5px"
        v-model="isDialog"
        align-center
        :show-close="false"
        title="新增用户"
        :width="300"
      >
        <div style="margin-top: 10px">
          <el-form label-position="left" :model="user">
            <el-form-item label="用户名" :label-width="60">
              <el-input v-model="user.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="密码" :label-width="60">
              <el-input
                show-password
                type="password"
                v-model="user.password"
                autocomplete="off"
              />
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
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { findUserList, save, queryRoles, saveRoles } from "@/api/user";
import { queryRoleList } from "@/api/role";
import { User, Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

//表格数据
const tableData = ref([]);
const pageNo = ref(1);
const pageSize = ref(10);
const total = ref(0);
//搜索用户名
const username = ref("");
const user = ref({
  username: "",
  password: "",
});
//所有角色数据
const roleList = ref([]);
//是否弹出分配角色抽屉
const isDrawer = ref(false);
//新增用户弹框
const isDialog = ref(false);
//是否全选，默认不
const checkAll = ref(false);
//多选默认选中数据
const checkedRoles = ref([]);
const isIndeterminate = ref(false);

onMounted(() => {
  getUserList();
  getAllRoleList();
});

//获取用户分页数据
const getUserList = () => {
  findUserList(pageNo.value, pageSize.value, username.value).then((res) => {
    if (res.code === 200 && res.data !== null) {
      tableData.value = res.data.data;
      total.value = res.data.total;
    }
  });
};

//获取所有角色数据
const getAllRoleList = () => {
  queryRoleList().then((res) => {
    if (res.code === 200) {
      roleList.value = res.data;
    }
  });
};

//分配角色弹出抽屉
const tempName = ref("");
const handleRole = (user) => {
  tempName.value = user.username;
  //根据用户id查询用户当前拥有的所有角色
  queryRoles(user.id).then((res) => {
    if (res.code === 200 && res.data !== null) {
      checkedRoles.value = res.data;
    }
  });
  isDrawer.value = !isDrawer.value;
};

//将一些共用的值
const setSomeValue = () => {
  isDrawer.value = false;
  tempName.value = "";
  checkedRoles.value = [];
};

//抽屉关闭时的回调
const handleDrawerClose = () => {
  setSomeValue();
};

//全选角色逻辑
const handleCheckAllChange = (val) => {
  checkedRoles.value = val ? roleList.value : [];
  isIndeterminate.value = !isIndeterminate.value;
};
const handleCheckedCitiesChange = (value) => {
  const checkedCount = value.length;
  checkAll.value = checkedCount === roleList.value.length;
  isIndeterminate.value =
    checkedCount > 0 && checkedCount < roleList.value.length;
};

//处理分配角色逻辑
const handleAssign = () => {
  console.log(checkedRoles.value);
  saveRoles(tempName.value, checkedRoles.value).then((res) => {
    if (res.code === 200) {
      ElMessage({
        message: "角色分配成功",
        type: "success",
      });
      getUserList();
      setSomeValue();
    }
  });
};

//取消新增用户
const handleConsole = () => {
  isDialog.value = false;
};

//新增用户按钮
const handleAddUser = () => {
  isDialog.value = true;
};

//保存新增用户
const saveRole = () => {
  save(user.value).then((res) => {
    if (res.code === 200) {
      ElMessage({
        message: "新增用户成功",
        type: "success",
      });
      isDialog.value = false;
      getUserList();
    }
  });
};
</script>
<style scoped lang="scss">
.dialog-footer {
  margin-top: 60px;
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>