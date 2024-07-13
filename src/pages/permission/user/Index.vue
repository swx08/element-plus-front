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
            <span>状态：</span>
            <el-select v-model="searchUser.status" placeholder="状态" style="width: 200px">
              <el-option v-for="(item, index) in statusData" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-col>
        </el-row>

        <div class="right-btn">
          <el-space :size="40">
            <el-button type="primary" v-permission="`permission:user:query`" @click="handleSearch">查询</el-button>
            <el-button @click="handleReset" v-permission="`permission:user:reset`">重置</el-button>
          </el-space>
        </div>
      </div>
    </template>

    <!-- 批量删除 -->
    <div style="height: 60px;">
      <el-popconfirm title="确认批量删除？" confirm-button-text="确定" cancel-button-text="取消" @confirm="handlerBatchDelete">
        <template #reference>
          <el-button :disabled="disabled" type="danger" :icon="Delete" v-permission="`permission:user:delete`">
            批量删除
          </el-button>
        </template>
      </el-popconfirm>
    </div>

    <el-table @selection-change="handleSelectionChange" :data="tableData" v-loading="loading" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column fixed prop="id" label="用户编号" width="120" />
      <el-table-column fixed prop="username" label="用户名称" width="160" />
      <el-table-column prop="phone" label="手机号" width="180" />
      <el-table-column prop="email" label="邮箱" width="200" />
      <el-table-column prop="status" label="状态" width="120">
        <template #default="scope">
          <el-switch style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            @change="handleChangeStatus(scope.row.id)" v-model="scope.row.checked" inline-prompt :active-icon="Check"
            :inactive-icon="Close" />
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" width="200" />
      <el-table-column fixed="right" label="选项" width="220">
        <template #default="scope">
          <el-button v-permission="`permission:user:update`" :icon="Edit" type="primary" link
            @click="handleEchoUser(scope.row.id)">修改</el-button>
          <el-popconfirm title="确认删除该用户？" confirm-button-text="确定" cancel-button-text="取消"
            @confirm="handleRemoveUser(scope.row.id)" width="160px">
            <template #reference>
              <el-button v-permission="`permission:user:delete`" :icon="Delete" type="danger" link>删除</el-button>
            </template>
          </el-popconfirm>
          <el-dropdown trigger="click" style="padding: 4px 0 0 10px;">
            <el-button :icon="DArrowRight" v-permission="`permission:user:more`" type="primary" link>
              更多
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>
                  <el-button v-permission="`permission:user:resetpwd`" :icon="Lock" link type="primary"
                    @click="handleResetPwdOpen(scope.row.id)">
                    重置密码
                  </el-button>
                </el-dropdown-item>
                <el-dropdown-item>
                  <el-button :icon="Position" v-permission="`permission:user:assign`" link type="primary"
                    @click="handleRoleOpen(scope.row)">
                    分配角色
                  </el-button>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-style">
      <el-pagination @change="handlePaginationChange" v-model:current-page="pageNo" :page-size="pageSize"
        layout="prev, pager, next" :total="total" />
    </div>
  </el-card>

  <!-- 分配角色抽屉 -->
  <el-drawer @close="onClose" size="24%" v-model="drawerOpen" title="分配角色">
    <template #default>
      <el-form>
        <el-form-item label="用户名称">
          <el-input v-model="tempUserName" disabled></el-input>
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
        <el-button plain type="primary" @click="handleRoleSave">
          确认
        </el-button>
      </div>
    </template>
  </el-drawer>

  <!-- 修改用户弹框 -->
  <el-dialog @close="handlerCancel" v-model="updateUserOpen" title="修改用户" width="500">
    <el-form :model="user" ref="formRef" :rules="rules">
      <el-form-item label="用户名称" prop="username" :label-width="140">
        <el-input style="width: 80%" v-model="user.username" autocomplete="off" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone" :label-width="140">
        <el-input style="width: 80%" v-model="user.phone" autocomplete="off" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="140">
        <el-input style="width: 80%" v-model="user.email" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="handleSaveUser"> 确认 </el-button>
      <el-button @click="handlerCancel">取消</el-button>
    </template>
  </el-dialog>

  <!-- 重置密码弹框 -->
  <el-dialog @close="handlerCancel" v-model="resetPwdOpen" title="修改密码" align-center width="400">
    <el-form :model="resetUserPwd" ref="formRef" :rules="rules">
      <el-form-item label="新密码" prop="password" :label-width="100">
        <el-input type="password" show-password placeholder="新密码" style="width: 90%" v-model="resetUserPwd.password"
          autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="handleResetPwd"> 确认 </el-button>
      <el-button @click="handlerCancel">取消</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { findUserList, queryRoles, saveRoles, queryEchoUserInfo, updateUserInfo, deleteUser, resetPwd, updateUserStatus, batchDelete } from "@/api/user";
import { queryRoleList } from "@/api/role";
import { User, Edit, Delete, DArrowRight, Lock, Position,Check,Close } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { queryDictLabel } from "@/api/dict_data";
import { USER_CONSTANT } from "@/constant/dictType.js";

//表格数据
const saveLoading = ref(false);
const loading = ref(true);
const tableData = ref([]);
const pageNo = ref(1);
const pageSize = ref(10);
const total = ref(0);
const updateUserOpen = ref(false);
const resetPwdOpen = ref(false);
const drawerOpen = ref(false);
const tempUserName = ref("");
//搜索用户名
const searchUser = ref({
  username: '',
  phone: '',
  status: null
});
//重置密码
const resetUserPwd = ref({
  id: null,
  password: ''
});
const user = ref({});
//所有角色数据
const roleList = ref([]);
//是否全选，默认不
const checkAll = ref(false);
//多选默认选中数据
const checkedRoles = ref([]);
const isIndeterminate = ref(false);
const statusData = ref([]);
const disabled = ref(true);

onMounted(() => {
  getUserList();
  getAllRoleList();
  getDictTypeStatus();
});

//获取用户分页数据
const getUserList = () => {
  findUserList(pageNo.value, pageSize.value, searchUser.value).then((res) => {
    if (res.code === 200 && res.data !== null) {
      tableData.value = res.data.data;
      total.value = res.data.total;
      loading.value = false;
    } else {
      loading.value = false;
    }
  });
};

//监听分页变化
const handlePaginationChange = (current, page) => {
  pageNo.value = current;
  pageSize.value = page;
  getUserList();
}

//查询字典状态
const getDictTypeStatus = () => {
  queryDictLabel(USER_CONSTANT).then((res) => {
    if (res.code === 200) {
      statusData.value = res.data;
    }
  })
}

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

//用户数据回显
const handleEchoUser = (id) => {
  queryEchoUserInfo(id).then((res) => {
    if (res.code === 200) {
      user.value = res.data;
      updateUserOpen.value = true;
    }
  })
}

//取消修改用户弹框
const handlerCancel = () => {
  updateUserOpen.value = false;
  resetPwdOpen.value = false;
  resetUserPwd.value = {
    id: null,
    password: ''
  }
}

//修改用户
const handleSaveUser = () => {
  formRef.value.validate((valid) => {
    if(valid){
      saveLoading.value = true;
      updateUserInfo(user.value).then((res) => {
        if (res.code === 200) {
          ElMessage({
            message: "修改成功",
            type: "success",
          });
          updateUserOpen.value = false;
          saveLoading.value = false;
          getUserList();
        } else {
          saveLoading.value = false;
        }
      })
    }
  })
}

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

//分配角色
const handleRoleSave = () => {
  saveLoading.value = true;
  saveRoles(tempUserName.value, checkedRoles.value).then((res) => {
    if (res.code === 200) {
      saveLoading.value = false;
      ElMessage({
        message: "角色分配成功",
        type: "success",
      });
      drawerOpen.value = false;
      checkedRoles.value = [];
    } else {
      saveLoading.value = false;
    }
  })
}

//单选删除用户
const handleRemoveUser = (id) => {
  deleteUser(id).then((res) => {
    if (res.code === 200) {
      ElMessage({
        message: "删除成功",
        type: "success",
      });
      getUserList();
    }
  })
}

//批量选择
var userIds = [];
const handleSelectionChange = (users) => {
  if (users.length > 0) {
    //过滤出已选中的用户id
    userIds = users.map((item) => item.id);
    disabled.value = false;
  } else {
    disabled.value = true;
  }
}

//批量删除用户
const handlerBatchDelete = () => {
  batchDelete(userIds).then((res) => {
    if (res.code === 200) {
      ElMessage({
        message: "删除成功",
        type: "success",
      });
      getUserList();
    }
  })
}

//重置密码
const handleResetPwdOpen = (id) => {
  resetUserPwd.value.id = id;
  resetPwdOpen.value = true;
}

//重置密码
const handleResetPwd = (id) => {
  formRef.value.validate((valid) => {
    if(valid){
      saveLoading.value = true;
      resetPwd(resetUserPwd.value).then((res) => {
        if (res.code === 200) {
          ElMessage({
            message: "密码重置成功",
            type: "success",
          })
          resetPwdOpen.value = false;
          saveLoading.value = false;
          resetUserPwd.value = {};
        } else {
          saveLoading.value = false;
        }
      })
    }
  })
}

//分配角色抽屉
const handleRoleOpen = (item) => {
  tempUserName.value = item.username;
  saveLoading.value = true;
  queryRoles(item.id).then((res) => {
    if (res.code === 200) {
      checkedRoles.value = res.data;
      saveLoading.value = false;
      drawerOpen.value = true;
    } else {
      saveLoading.value = false;
    }
  })
}

const onClose = () => {
  drawerOpen.value = false;
  tempUserName.value = '';
}

//修改用户状态
const handleChangeStatus = (id) => {
  updateUserStatus(id).then((res) => {
    if (res.code === 200) {
      ElMessage({
        message: "用户状态已修改",
        type: "success",
      });
    }
  })
}

const formRef = ref();
const rules = ref({
  username: [
    {
      required: true,
      message: '请输入用户名称',
      trigger: 'change',
    },
  ],
  phone: [
    {
      required: true,
      message: '请输入手机号',
      trigger: 'change',
    },
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'change',
    },
  ],
  password: [
    {
      required: true,
      message: '请输入新密码',
      trigger: 'change',
    },
  ],
})
</script>
<style scoped lang="scss">
.dialog-footer {
  margin-top: 40px;
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

.pagination-style {
  height: 120px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center
}
</style>