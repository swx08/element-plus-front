<template>
  <!-- 右侧 -->
  <div class="r-content">
    <el-button @click="doRefresh" type="primary" circle icon="Refresh"></el-button>
    <el-button @click="changeScreen"  type="primary" circle icon="FullScreen"></el-button>
    <el-button
      style="margin-right: 15px"
      type="primary"
      circle
      icon="Setting"
    ></el-button>

    <el-dropdown>
      <el-space :size="8">
        <el-avatar
          shape="square"
          :size="40"
          src="https://ice.frostsky.com/2024/04/18/7f1f5acf8f45032e26fb73f6db9f2e24.jpeg"
        />
        <span>admin</span>
        <el-icon style="margin-right: 15px">
          <arrow-down />
        </el-icon>
      </el-space>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup>
import { useRefreshStore } from '@/stores/refresh.js';
import screenfull from 'screenfull';
import { ElMessage } from 'element-plus'

const useRefresh = useRefreshStore();

//刷新
const doRefresh = () => {
  useRefresh.refresh = !useRefresh.refresh;
}

//全屏
const changeScreen = () => {
  if (screenfull.isEnabled) {
		screenfull.toggle();
	} else {
    ElMessage({
      message: '您的浏览器不支持全屏！',
      type: 'warning'
    })
	}
}
</script>


<style scoped lang="scss">
.r-content {
    display: flex;
    align-items: center;
  }

.font_common {
  font-family: "微软雅黑";
  font-size: 14px;
}
</style>