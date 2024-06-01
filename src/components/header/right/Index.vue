<template>
  <!-- 右侧 -->
  <el-space :size="25" style="padding-right: 15px;">
    <el-tooltip content="刷新" placement="bottom">
      <el-button @click="doRefresh" circle icon="Refresh"></el-button>
    </el-tooltip>
    <el-tooltip content="全屏" placement="bottom">
      <el-button @click="changeScreen" circle icon="FullScreen"></el-button>
    </el-tooltip>
    <el-tooltip content="设置" placement="bottom">
      <el-button @click="changeTheme" circle icon="Setting"></el-button>
    </el-tooltip>

    <el-dropdown trigger="click">
      <el-space :size="12">
        <svg-icon name="man" width="37px" height="37px" />
        <span>{{ userStore.username }}</span>
        <el-icon style="margin-right: 20px">
          <arrow-down />
        </el-icon>
      </el-space>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <el-button icon="User" link>
              个人中心
            </el-button>
          </el-dropdown-item>
          <el-dropdown-item @click="doLogoOut">
            <el-button icon="SwitchButton" link>
              退出登录
            </el-button>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-space>
</template>

<script setup>
import { ref } from "vue";
import { useRefreshStore } from "@/stores/models/refresh/refresh.js";
import { useThemeStore } from "@/stores/models/theme/theme.js";
import { useBreadcrumbStore } from "@/stores/models/breadcrumb/breadcrumb.js";
import screenfull from "screenfull";
import { doLogout } from "@/api/user";
import { ElMessage } from "element-plus";
import useUserStore from "@/stores/models/user/user.js";
import router from "@/router/index";

const userStore = useUserStore();
const useRefresh = useRefreshStore();
const breadcrumbStore = useBreadcrumbStore();

//刷新
const doRefresh = () => {
  useRefresh.refresh = !useRefresh.refresh;
};

//全屏
const changeScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle();
  } else {
    ElMessage({
      message: "您的浏览器不支持全屏！",
      type: "warning",
    });
  }
};

//退出登录
const doLogoOut = () => {
  doLogout().then((res) => {
    if (res.code === 200) {
      userStore.logout();
      breadcrumbStore.removeBreadcrumb();
      //退出登录成功提示
      ElMessage({
        message: "退出登录成功！",
        type: "success",
      });
    }
  })
};

//主题设置相关数据
const themeStore = useThemeStore();
const changeTheme = () => {
  themeStore.theme = !themeStore.theme;
};
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