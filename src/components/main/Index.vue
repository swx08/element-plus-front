<template>
  <router-view v-slot="{ Component }">
  <transition name="fade">
    <component :is="Component" v-if="flag"/>
  </transition>
</router-view>
</template>

<script setup>
import { ref, watch, nextTick } from "vue";
import { useRefreshStore } from '@/stores/refresh.js';

const useRefresh = useRefreshStore();
//控制当前组件是否销毁重建
const flag = ref(true);

//监听pina中存储的refresh是否改变，若改变则说明刷新
watch(() => useRefresh.refresh, () => {
  //点击刷新按钮，路由组件销毁
  flag.value = false;
  //紧接着又重新创建组件，相当于重新发送请求
  nextTick(() => {
    flag.value = true;
  })
})
</script>


<style scoped>
.fade-enter-from{
  opacity: 0;
}

.fade-enter-active{
  transition: all 0.5s;
}

.fade-enter-to{
  opacity: 1;
}
</style>