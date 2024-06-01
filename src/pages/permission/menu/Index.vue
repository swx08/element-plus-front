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
    <el-table :data="menuData" v-loading="loading" height="50vh" style="width: 100%" row-key="id">
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
        <template #default="scope">
          <el-button :disabled="scope.row.type === 2 ? true : false" link type="primary" :icon="CirclePlus"
            @click="handlerAddMenuOpen(scope.row.title)" v-permission="`permission:menu:add`">
            新增
          </el-button>
          <el-button v-permission="`permission:menu:update`" link type="primary" :icon="Edit"
            @click="handleEchoMenu(scope.row.id)">修改</el-button>
          <el-popconfirm title="确认删除该菜单？" confirm-button-text="确定" cancel-button-text="取消"
            @confirm="handleRemoveMenu(scope.row.id)" width="160px">
            <template #reference>
              <el-button link type="danger" v-permission="`permission:menu:delete`" :icon="Delete">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
  </el-card>

  <!-- 新增 / 修改菜单弹框 -->
  <el-dialog v-model="addMenuOpen" @close="handlerCancel" :title="menu.id === undefined ? '添加菜单' : '修改菜单'" width="500">
    <el-form :model="menu" ref="formRef" :rules="rules" label-position="right">
      <el-form-item v-if="isDic" label="上级菜单" prop="parent" :label-width="140">
        <el-input style="width: 80%" disabled v-model="menu.parent" autocomplete="off" />
      </el-form-item>
      <el-form-item v-else label="上级菜单" prop="parent" :label-width="140">
        <el-input style="width: 80%" disabled v-model="menu.parent" autocomplete="off" />
      </el-form-item>
      <el-form-item label="菜单类型" prop="type" :label-width="140">
        <el-radio-group v-model="menu.type">
          <el-radio :value="0" v-if="isDic">目录</el-radio>
          <el-radio :value="1" v-if="isBtn" @click="handleMenu">菜单</el-radio>
          <el-radio :value="2" v-if="isBtn" @click="handleBtn">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="hasName" label="组件名称" prop="name" :label-width="140">
        <el-input style="width: 80%" placeholder="大写字母开头，如：Permission" v-model="menu.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="菜单名称" prop="title" :label-width="140">
        <el-input style="width: 80%" :placeholder="hasName ? '如：权限管理' : '如：用户删除'" v-model="menu.title"
          autocomplete="off" />
      </el-form-item>
      <el-form-item v-if="isBtn" label="权限标识" prop="permission" :label-width="140">
        <el-input style="width: 80%" placeholder="如：permission:user:add" v-model="menu.permission" autocomplete="off" />
      </el-form-item>
      <el-form-item v-if="isBtnEdit" label="组件路径" prop="component" :label-width="140">
        <el-input style="width: 80%" placeholder="如：/permission/user/index" v-model="menu.component"
          autocomplete="off" />
      </el-form-item>
      <el-form-item label="菜单状态" prop="status" :label-width="140">
        <el-radio-group v-model="menu.status">
          <el-radio :value="1">开启</el-radio>
          <el-radio :value="0">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" :loading="saveLoading" @click="handleSaveMenu">
          确定
        </el-button>
        <el-button @click="handlerCancel">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { queryMenuList, queryMenuListByLike, addMenu, echoMenu, updateMenu, removeMenu } from "@/api/menu";
import { Delete, Edit, CirclePlus } from '@element-plus/icons-vue';
import { verifyMenuName } from "@/utils/regexutils";
import { ElMessage } from 'element-plus'

const saveLoading = ref(false);
const loading = ref(true);
//新增菜单弹框
const addMenuOpen = ref(false);
const isDic = ref(false);
const isBtn = ref(false);
const isBtnEdit = ref(false);
const hasName = ref(true);
const menu = ref({});
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
      loading.value = false;
    } else {
      loading.value = false;
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

//新增菜单弹框取消回调
const handlerCancel = () => {
  addMenuOpen.value = false;
  menu.value = {};
  tempParent.value = "";
}

//新增目录弹框
const handlerAddDicMenuOpen = () => {
  isBtnEdit.value = false;
  isDic.value = true;
  isBtn.value = false;
  addMenuOpen.value = true;
  hasName.value = true;
  menu.value.parent = ref("主类目");
}

//新增菜单弹框
const tempParent = ref("");
const handlerAddMenuOpen = (item) => {
  isBtnEdit.value = true;
  isBtn.value = true;
  isDic.value = false;
  addMenuOpen.value = true;
  tempParent.value = item;
  menu.value.parent = ref(item);
}

//新增、修改菜单
const handleSaveMenu = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      //校验菜单权限标识和组件路径是否符合规范
      try {
        verifyMenuName(menu.value);
      } catch (error) {
        ElMessage({
          type: 'error',
          message: error.message,
        })
        return;
      }
      saveLoading.value = true;
      if (menu.value.id === undefined) {
        //新增菜单
        addMenu(menu.value).then((res) => {
          if (res.code === 200) {
            ElMessage({
              type: 'success',
              message: '新增成功！',
            });
            addMenuOpen.value = false;
            saveLoading.value = false;
            menu.value = {};
            getAllMenuData();
          } else {
            saveLoading.value = false;
          }
        })
      } else {
        //修改菜单
        updateMenu(menu.value).then((res) => {
          if (res.code === 200) {
            ElMessage({
              type: 'success',
              message: '修改成功！',
            });
            addMenuOpen.value = false;
            saveLoading.value = false;
            menu.value = {};
            getAllMenuData();
          } else {
            saveLoading.value = false;
          }
        });
      }
    }
  })
}

//点击菜单时
const handleMenu = () => {
  isDic.value = false;
  isBtn.value = true;
  isBtnEdit.value = true;
  hasName.value = true;
  menu.value = ref({});
  menu.value.parent = ref(tempParent.value);
}

//点击按钮时
const handleBtn = () => {
  isDic.value = false;
  isBtn.value = true;
  isBtnEdit.value = false;
  hasName.value = false;
  menu.value = ref({});
  menu.value.parent = ref(tempParent.value);
}

//回显菜单数据
const handleEchoMenu = (id) => {
  echoMenu(id).then((res) => {
    if (res.code === 200) {
      menu.value = res.data;
      if (menu.value.type === 0) {
        isDic.value = true;
        hasName.value = true;
        isBtn.value = false;
        isBtnEdit.value = false;
        addMenuOpen.value = true;
      } else if (menu.value.type === 1) {
        isDic.value = false;
        isBtn.value = true;
        isBtnEdit.value = true;
        hasName.value = true;
        addMenuOpen.value = true;
      } else {
        isDic.value = false;
        isBtn.value = true;
        isBtnEdit.value = false;
        hasName.value = false;
        addMenuOpen.value = true;
      }
    }
  })
}

//删除菜单
const handleRemoveMenu = (id) => {
  removeMenu(id).then((res) => {
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '菜单删除成功！',
      });
      getAllMenuData();
    }
  })
}

//表达验证
const formRef = ref();
const rules = ref({
  name: [
    {
      required: true,
      message: '请输入组件名称',
      trigger: 'change',
    },
  ],
  title: [
    {
      required: true,
      message: '请输入菜单名称',
      trigger: 'change',
    },
  ],
  type: [
    {
      required: true,
      message: '请选择菜单类型',
      trigger: 'change',
    },
  ],
  status: [
    {
      required: true,
      message: '请选择菜单状态',
      trigger: 'change',
    },
  ],
  permission: [
    {
      required: true,
      message: '请输入权限标识',
      trigger: 'change',
    },
  ],
  component: [
    {
      required: true,
      message: '请输入组件路径',
      trigger: 'change',
    },
  ],
})
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