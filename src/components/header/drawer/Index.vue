<template>
  <el-drawer size="15%" v-model="themeStore.theme" title="主题设置">
    <template #header>
      <el-space direction="vertical" :size="10">
        <!-- 主题颜色 -->
        <div>
          <el-space :size="30">
            <span>主题颜色</span>
            <el-color-picker
              v-model="color"
              show-alpha
              :predefine="predefineColors"
            />
          </el-space>
        </div>

        <!-- 暗黑模式 -->
        <div>
          <el-space :size="30">
            <span>暗黑模式</span>
            <el-switch
              v-model="dark"
              class="mt-2"
              inline-prompt
              :active-icon="Sunrise"
              :inactive-icon="MoonNight"
              @change="change"
            />
          </el-space>
        </div>
      </el-space>
    </template>
  </el-drawer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useThemeStore } from "@/stores/models/theme/theme.js";
import { Sunrise, MoonNight } from "@element-plus/icons-vue";

const themeStore = useThemeStore();
const color = ref("rgba(255, 69, 0, 0.68)");
const predefineColors = ref([
  "#ff4500",
  "#ff8c00",
  "#ffd700",
  "#90ee90",
  "#00ced1",
  "#1e90ff",
  "#c71585",
  "rgba(255, 69, 0, 0.68)",
  "rgb(255, 120, 0)",
  "hsv(51, 100, 98)",
  "hsva(120, 40, 94, 0.5)",
  "hsl(181, 100%, 37%)",
  "hsla(209, 100%, 56%, 0.73)",
  "#c7158577",
]);

const dark = ref(false);

//暗黑模式切换
const change = () => {
  //获取html根节点
  let html = document.documentElement;
  console.log(html);
  //判断html是否有类名dark
  dark.value ? (html.className = "dark") : (html.className = "");
};
</script>
