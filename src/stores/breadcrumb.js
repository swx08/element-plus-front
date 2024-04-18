/**
 * 设置面包屑
 */
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBreadcrumbStore = defineStore("breadcrumb", () => {
  const breadcrumb = ref(null);
  const tagList = ref([
    {
      path: "home",
      name: "home",
      label: "首页",
    },
  ]);

  const setBreadcrumb = (newBreadcrumb) => {
    console.log(newBreadcrumb);
    if (newBreadcrumb.name === "home") {
      breadcrumb.value = null;
    } else {
      breadcrumb.value = newBreadcrumb;
      //去重逻辑，防止多个相同的面包屑添加进去
      let result = tagList.value.findIndex(
        (item) => item.name === newBreadcrumb.name
      );
      result === -1 ? tagList.value.push(newBreadcrumb) : "";
    }
  };

  return {
    tagList,
    breadcrumb,
    setBreadcrumb,
  };
});
