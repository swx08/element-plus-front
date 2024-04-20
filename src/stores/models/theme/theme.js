import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore("theme", () => {
  //判断是否切换主题，主要用于弹出抽屉
  const theme = ref(false);
  //侧边栏菜单背景默认偏黑色
  const bgColor = ref("#191a23");
  //字体颜色默认黑色
  const fontColor = ref("#fff");
  //判断是否是暗黑模式，默认不是暗黑模式
  const isDark = ref(false);

  const changeSideTheme = (val) => {
    if (val === 'light') {
      bgColor.value = "#fff";
      fontColor.value = "#000000";
    } else {
      bgColor.value = "#191a23";
      fontColor.value = "#fff";
    }
  }

  return {
    theme,
    bgColor,
    fontColor,
    changeSideTheme,
    isDark,
  };
});