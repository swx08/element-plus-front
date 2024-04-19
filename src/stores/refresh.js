import { defineStore } from "pinia";
import { ref } from "vue";

export const useRefreshStore = defineStore("refresh", () => {
  const refresh = ref(false);
  return {
    refresh
  };
});