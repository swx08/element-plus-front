<template>
  <el-main :style="{background: themeStore.isDark ? '' : 'rgb(245,245,245)'}">
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" v-if="flag" />
      </transition>
    </router-view>
  </el-main>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useRefreshStore } from "@/stores/models/refresh/refresh.js";
import { useThemeStore } from "@/stores/models/theme/theme.js";

const themeStore = useThemeStore();
const useRefresh = useRefreshStore();
//控制当前组件是否销毁重建
const flag = ref(true);

//监听pina中存储的refresh是否改变，若改变则说明刷新
watch(
  () => useRefresh.refresh,
  () => {
    //点击刷新按钮，路由组件销毁
    flag.value = false;
    //紧接着又重新创建组件，相当于重新发送请求
    nextTick(() => {
      flag.value = true;
    });
  }
);
</script>


<style scoped lang="scss">
.el-main{
  width: auto;
}

.fade-enter-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>