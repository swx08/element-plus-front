import { defineStore } from "pinia";
import { ref } from "vue";

export const useCollapseStore = defineStore("collapse", () => {
  const collapse = ref(false);

  const setCollapse = (newCollapse) => {
    collapse.value = newCollapse;
  };

  return {
    collapse,
    setCollapse,
  };
});
