<template>
  <!-- 头部搜索 -->
  <el-card style="width: 100%" shadow="never">
    <!-- 顶部搜索区 -->
    <template #header>
      <div style="display: flex;">
        <el-row :gutter="10" class="a-row-search">
          <el-col :lg="8">
            <span>字典类型：</span>
            <el-input style="width: 200px" v-model="searchDict.type" placeholder="字典类型"></el-input>
          </el-col>
          <el-col :lg="8">
            <span>字典标签：</span>
            <el-input style="width: 200px" v-model="searchDict.label" placeholder="字典标签"></el-input>
          </el-col>
          <el-col :lg="8">
            <span>状态：</span>
            <el-select v-model="searchDict.status" placeholder="状态" style="width: 200px">
              <el-option v-for="(item, index) in statusData" :key="index" :label="item.label" :value="item.value" />
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
      <el-space :size="20">
        <el-button type="primary" :icon="CirclePlus" v-permission="`permission:role:add`" @click="handlerAddDictOpen">
          新增
        </el-button>
        <el-popconfirm title="确认批量删除？" confirm-button-text="确定" cancel-button-text="取消" @confirm="handlerBatchDelete">
          <template #reference>
            <el-button :disabled="disabled" type="danger" :icon="Delete" v-permission="`permission:user:delete`">
              批量删除
            </el-button>
          </template>
        </el-popconfirm>
      </el-space>
    </div>

    <el-table @selection-change="handleSelectionChange" :data="tableData" v-loading="loading" style="width: 100%">
      <el-table-column type="selection" width="55" />
      <el-table-column fixed prop="id" label="字典编号" width="140" />
      <el-table-column fixed prop="type" label="字典类型" width="180" />
      <el-table-column prop="label" label="字典标签" width="180">
        <template #default="scope">
          <el-tag>{{ scope.row.label }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="value" label="字典键值" width="180">
        <template #default="scope">
          <el-tag type="warning">{{ scope.row.value }}</el-tag>
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
          <el-popconfirm title="确认删除该字典数据？" confirm-button-text="确定" cancel-button-text="取消"
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
  <el-dialog @close="handlerCancel" v-model="addDictOpen" :title="dictData.id === undefined ? '添加字典' : '修改字典'"
    width="500">
    <el-form :model="dictData" ref="formRef" :rules="rules">
      <el-form-item label="字典类型" prop="type" :error="dictDataErr.type" :label-width="140">
        <el-input disabled placeholder="字典类型" style="width: 80%" v-model="dictData.type" autocomplete="off" />
      </el-form-item>
      <el-form-item label="字典标签" prop="label" :error="dictDataErr.label" :label-width="140">
        <el-input placeholder="字典标签" style="width: 80%" v-model="dictData.label" autocomplete="off" />
      </el-form-item>
      <el-form-item label="字典键值" prop="value" :error="dictDataErr.value" :label-width="140">
        <el-input type="number" placeholder="字典键值" style="width: 80%" v-model="dictData.value" autocomplete="off" />
      </el-form-item>
      <el-form-item label="备注" prop="remark" :error="dictDataErr.remark" :label-width="140">
        <el-input :rows="4" type="textarea" placeholder="备注" style="width: 80%" v-model="dictData.remark"
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
import { addDictData, updateDict, findDictList, updateDictStatus, removeDict, echoDict, queryDictLabel, batchDelete } from "@/api/dict_data";
import { ElMessage } from "element-plus";
import { Lock, Edit, Delete, Check, Close, CirclePlus } from "@element-plus/icons-vue";
import { useRoute } from 'vue-router';
import { DICT_DATA_CONSTANT } from "@/constant/dictType.js";

//表格数据
const route = useRoute();
const tableData = ref([]);
const pageNo = ref(1);
const pageSize = ref(10);
const total = ref(0);
const addDictOpen = ref(false);
const searchDict = ref({
  type: "",
  label: "",
  status: null
});
const dictData = ref({
  type: ''
});
const dictDataErr = ref({});
const saveLoading = ref(false);
const loading = ref(true);
const statusData = ref([]);
searchDict.value.type = route.query.type;
const disabled = ref(true);

onMounted(() => {
  getDictList();
  getDictTypeStatus();
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

//监听分页变化
const handlePaginationChange = (current, page) => {
  pageNo.value = current;
  pageSize.value = page;
  getDictList();
}

//查询字典状态
const getDictTypeStatus = () => {
  queryDictLabel(DICT_DATA_CONSTANT).then((res) => {
    if (res.code === 200) {
      statusData.value = res.data;
    }
  })
}

//重置
const handleReset = () => {
  searchDict.value = {
    label: "",
    type: "",
    status: null
  }
  getDictList();
}

//查询
const handleSearch = () => {
  if ((searchDict.value.label !== "") || (searchDict.value.type !== "") || (searchDict.value.status !== null)) {
    saveLoading.value = true;
    getDictList();
    saveLoading.value = false;
  }
}

//新增字典 
const handlerAddDictOpen = () => {
  dictData.value.type = route.query.type;
  addDictOpen.value = true;
}
const handlerCancel = () => {
  addDictOpen.value = false;
  dictData.value = {};
}

//处理保存字典的操作
const handleSaveDict = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      saveLoading.value = true;
      if (dictData.value.id === undefined) {
        addDictData(dictData.value).then((res) => {
          if (res.code === 200) {
            saveLoading.value = false;
            ElMessage({
              type: 'success',
              message: '新增成功！'
            });
            getDictList();
            addDictOpen.value = false;
            dictData.value = {};
          } else {
            saveLoading.value = false;
            if (res.data !== null) {
              dictDataErr.value = res.data;
            }
          }
        });
      } else {
        updateDict(dictData.value).then((res) => {
          if (res.code === 200) {
            saveLoading.value = false;
            ElMessage({
              type: 'success',
              message: '修改成功！'
            })
            getDictList();
            addDictOpen.value = false;
            dictData.value = {};
          } else {
            saveLoading.value = false;
            if (res.data !== null) {
              dictDataErr.value = res.data;
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

//批量选择
var dictDataIds = [];
const handleSelectionChange = (dictData) => {
  if (dictData.length > 0) {
    dictDataIds = dictData.map((item) => item.id);
    disabled.value = false;
  } else {
    disabled.value = true;
  }
}

//批量删除用户
const handlerBatchDelete = () => {
  batchDelete(dictDataIds).then((res) => {
    if (res.code === 200) {
      ElMessage({
        message: "删除成功",
        type: "success",
      });
      getDictList();
    }
  })
}

//修改字典数据回显
const handleEchoDict = (id) => {
  echoDict(id).then((res) => {
    if (res.code === 200) {
      dictData.value = res.data;
      addDictOpen.value = true;
    }
  })
}

const formRef = ref();
const rules = ref({
  label: [
    {
      required: true,
      message: '请输入字典标签',
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
  value: [
    {
      required: true,
      message: '请输入字典键值',
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