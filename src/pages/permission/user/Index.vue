<template>
  <!-- 头部搜索 -->
  <el-card style="width: 100%" shadow="never">
    <!-- 顶部搜索区 -->
    <template #header>
      <div style="display: flex;">
        <el-row :gutter="10" class="a-row-search">
          <el-col :lg="8">
            <span>用户名称：</span>
            <el-input style="width: 200px" v-model="searchUser.username" placeholder="用户名称"></el-input>
          </el-col>
          <el-col :lg="8">
            <span>手机号码：</span>
            <el-input style="width: 200px" v-model="searchUser.phone" placeholder="手机号码"></el-input>
          </el-col>
          <el-col :lg="8">
            <span>用户状态：</span>
            <el-select v-model="searchUser.status" placeholder="用户状态" style="width: 200px">
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

    <el-table :data="tableData" style="width: 100%">
      <el-table-column fixed prop="id" label="用户编号" width="120" />
      <el-table-column fixed prop="username" label="用户名称" width="160" />
      <el-table-column prop="phone" label="手机号" width="180" />
      <el-table-column prop="email" label="邮箱" width="200" />
      <el-table-column prop="status" label="状态" width="120" />
      <el-table-column prop="createTime" label="创建时间" width="200" />
      <el-table-column fixed="right" label="选项" width="260">
        <template #default="scope">
          <el-button :icon="User" type="primary" link v-has="`btn:user:per:role`" @click="handleRole(scope.row)">
            分配角色
          </el-button>
          <el-button v-has="`btn:user:update`" :icon="Edit" type="primary" link>修改</el-button>
          <el-button v-has="`btn:user:remove`" :icon="Delete" type="danger" link>删除</el-button>
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

  <!-- 分配角色抽屉 -->
  <el-drawer @close="handleDrawerClose" size="24%" v-model="isDrawer" title="分配角色">
    <template #default>
      <el-form>
        <el-form-item label="用户名称">
          <el-input v-model="tempName" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="角色列表">
          <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">
            全选
          </el-checkbox>
          <el-checkbox-group v-model="checkedRoles" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="role in roleList" :key="role" :label="role" :value="role">
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
    <el-dialog style="border-radius: 5px" v-model="isDialog" align-center :show-close="false" title="新增用户" :width="300">
      <div style="margin-top: 10px">
        <el-form label-position="left" :model="user">
          <el-form-item label="用户名" :label-width="60">
            <el-input v-model="user.username" autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" :label-width="60">
            <el-input show-password type="password" v-model="user.password" autocomplete="off" />
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { findUserList, save, queryRoles, saveRoles } from "@/api/user";
import { queryRoleList } from "@/api/role";
import { User, Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";

//表格数据
const saveLoading = ref(false);
const tableData = ref([]);
const pageNo = ref(1);
const pageSize = ref(10);
const total = ref(0);
//搜索用户名
const searchUser = ref({
  username: '',
  phone: '',
  status: null
});
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
  findUserList(pageNo.value, pageSize.value, searchUser.value).then((res) => {
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

//重置
const handleReset = () => {
  searchUser.value = {
    username: '',
    phone: '',
    status: null
  }
  getUserList();
}

//查询
const handleSearch = () => {
  if ((searchUser.value.username !== "") || (searchUser.value.phone !== "") || (searchUser.value.status !== null)) {
    saveLoading.value = true;
    getUserList();
    saveLoading.value = false;
  }
}

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