<template>
  <!-- 头部搜索 -->
  <el-card style="width: 100%" shadow="never">
    <!-- 顶部搜索区 -->
    <template #header>
      <div style="display: flex;">
        <el-row :gutter="10" class="a-row-search">
          <el-col :lg="8">
            <span>字典名称：</span>
            <el-input style="width: 200px" v-model="searchDict.name" placeholder="字典名称"></el-input>
          </el-col>
          <el-col :lg="8">
            <span>字典类型：</span>
            <el-select v-model="searchDict.type" placeholder="字典类型" style="width: 200px">
              <el-option v-for="(item,index) in typeData" :key="index" :label="item" :value="item">{{ item
                }}</el-option>
            </el-select>
          </el-col>
          <el-col :lg="8">
            <span>状态：</span>
            <el-select v-model="searchDict.status" placeholder="状态" style="width: 200px">
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
      <el-button type="primary" :icon="CirclePlus" v-permission="`permission:role:add`" @click="handlerAddDictOpen">
        新增
      </el-button>
    </div>

    <el-table :data="tableData" v-loading="loading" style="width: 100%">
      <el-table-column fixed prop="id" label="字典编号" width="140" />
      <el-table-column fixed prop="name" label="字典名称" width="180" />
      <el-table-column prop="type" label="字典类型" width="180">
        <template #default="scope">
          <el-link @click="goToDictData(scope.row)" :underline="false" type="primary">{{ scope.row.type }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="160">
        <template #default="scope">
          <el-switch style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
            @change="handleChangeStatus(scope.row.id)" v-model="scope.row.checked" inline-prompt :active-icon="Check"
            :inactive-icon="Close" />
        </template>
      </el-table-column>
      <el-table-column prop="remark" label="备注" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="220" />
      <el-table-column fixed="right" label="选项" width="180">
        <template #default="scope">
          <el-button v-permission="`permission:role:update`" link :icon="Edit" type="primary"
            @click="handleEchoDict(scope.row.id)">修改</el-button>
          <el-popconfirm title="确认删除该字典类型？" confirm-button-text="确定" cancel-button-text="取消"
            @confirm="handleRemoveDict(scope.row.id)" width="160px">
            <template #reference>
              <el-button v-permission="`permission:role:delete`" link :icon="Delete" type="danger">删除</el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="pagination-style">
      <el-pagination @change="handlePaginationChange" v-model:current-page="pageNo" :page-size="pageSize"
        layout="prev, pager, next" :total="total" />
    </div>
  </el-card>

  <!-- 新增弹框 -->
  <el-dialog @close="handlerCancel" v-model="addDictOpen" :title="dictType.id === undefined ? '添加字典' : '修改字典'"
    width="500">
    <el-form :model="dictType" ref="formRef" :rules="rules">
      <el-form-item label="字典名称" prop="name" :error="dictTypeErr.name" :label-width="140">
        <el-input placeholder="字典名称" style="width: 80%" v-model="dictType.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="字典类型" prop="type" :error="dictTypeErr.type" :label-width="140">
        <el-input placeholder="字典类型：sys_user_status" style="width: 80%" v-model="dictType.type" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注" prop="remark" :error="dictTypeErr.remark" :label-width="140">
        <el-input :rows="4" type="textarea" placeholder="备注" style="width: 80%" v-model="dictType.remark"
          autocomplete="off" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleSaveDict"> 确认 </el-button>
        <el-button @click="handlerCancel">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { addDictType, findDictList, queryAllTypeData, updateDictStatus, removeDict, echoDict, updateDict } from "@/api/dict";
import { ElMessage } from "element-plus";
import { Lock, Edit, Delete, Check, Close, CirclePlus } from "@element-plus/icons-vue";
import router from "@/router";

//表格数据
const tableData = ref([]);
const pageNo = ref(1);
const pageSize = ref(10);
const total = ref(0);
const addDictOpen = ref(false);
const searchDict = ref({
  name: "",
  type: "",
  status: null
});
const dictType = ref({});
const dictTypeErr = ref({});
const saveLoading = ref(false);
const loading = ref(true);
const typeData = ref([]);

onMounted(() => {
  getDictList();
  getDictType();
});

//获取字典类型分页数据
const getDictList = () => {
  findDictList(pageNo.value, pageSize.value, searchDict.value).then((res) => {
    if (res.code === 200 && res.data !== null) {
      tableData.value = res.data.data;
      total.value = res.data.total;
      loading.value = false;
    } else {
      loading.value = false;
      tableData.value = [];
    }
  });
};

//查询字段类型数据
const getDictType = () => {
  queryAllTypeData().then((res) => {
    if (res.code === 200) {
      typeData.value = res.data;
    }
  })
}

//监听分页变化
const handlePaginationChange = (current, page) => {
  pageNo.value = current;
  pageSize.value = page;
  getDictList();
}

//重置
const handleReset = () => {
  searchDict.value = {
    name: "",
    type: "",
    status: null
  }
  getDictList();
}

//查询
const handleSearch = () => {
  if ((searchDict.value.name !== "") || (searchDict.value.type !== "") || (searchDict.value.status !== null)) {
    saveLoading.value = true;
    getDictList();
    saveLoading.value = false;
  }
}

//新增字典 
const handlerAddDictOpen = () => {
  dictType.value = {};
  addDictOpen.value = true;
}
const handlerCancel = () => {
  addDictOpen.value = false;
}

//处理保存字典的操作
const handleSaveDict = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      saveLoading.value = true;
      if(dictType.value.id === undefined) {
        addDictType(dictType.value).then((res) => {
          if (res.code === 200) {
            ElMessage({
              type: 'success',
              message: '新增成功！'
            });
            getDictList();
            addDictOpen.value = false;
            dictType.value = {};
          } else {
            dictTypeErr.value = res.data;
          }
        });
      } else {
        updateDict(dictType.value).then((res) => {
          if (res.code === 200) {
            ElMessage({
              type: 'success',
              message: '修改成功！'
            })
            getDictList();
            addDictOpen.value = false;
            dictType.value = {};
          } else {
            saveLoading.value = false;
            if(res.data !== null){
              dictTypeErr.value = res.data;
            }
          }
        })
      }
    }
  })
}

//修改字典状态
const handleChangeStatus = (id) => {
  updateDictStatus(id).then((res) => {
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '状态修改成功！'
      })
      getDictList();
    }
  })
}

//删除字典
const handleRemoveDict = (id) => {
  removeDict(id).then((res) => {
    if (res.code === 200) {
      ElMessage({
        type: 'success',
        message: '删除成功！'
      })
      getDictList();
    }
  })
}

//跳转到字典数据页面
const goToDictData = (item) => {
  router.push({ name: 'DictData', query: { id: item.id,type: item.type } });
}

//修改字典数据回显
const handleEchoDict = (id) => {
  echoDict(id).then((res) => {
    if (res.code === 200) {
      dictType.value = res.data;
      addDictOpen.value = true;
    }
  })
}

const formRef = ref();
const rules = ref({
  name: [
    {
      required: true,
      message: '请输入字典名称',
      trigger: 'change',
    },
  ],
  type: [
    {
      required: true,
      message: '请输入字典类型',
      trigger: 'change',
    },
  ],
  remark: [
    {
      required: true,
      message: '请输入字典备注',
      trigger: 'change',
    },
  ],
})
</script>


<style scoped lang="scss">
.permisson-role {
  height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

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

.pagination-style {
  height: 120px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center
}
</style>