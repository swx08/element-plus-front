<template>
  <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
</template>

<style>
#app {
  height: 100%;
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
