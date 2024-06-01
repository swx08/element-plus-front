<template>
  <el-row>
    <el-col :span="9">
      <div class="login-container-left">
        <div class="logo">
          <el-space :size="10">
            <svg-icon name="logo" />
            <span class="logo_title" :style="{ color: '#fff' }">{{
              setting.title
              }}</span>
          </el-space>
        </div>
        <div>
          <Carousel />
        </div>
      </div>
    </el-col>
    <el-col :span="15">
      <div class="login-container-right">
        <div class="form-container">
          <RegisterForm />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import { ref } from 'vue';
import setting from '@/setting';
import RegisterForm from "@/pages/register/form/Index.vue";
import Carousel from "@/pages/login/carousel/Index.vue";

</script>
<style scoped lang="scss">
.login-container-left {
  height: 100vh;
  width: 100%;
  background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);

  .logo {
    height: 90px;
    width: 100%;
    display: flex;
    padding-left: 25px;
    align-items: center;

    .logo_title {
      letter-spacing: 1px;
      font-family: "微软雅黑体";
      font-size: 20px;
    }
  }
}

.login-container-right {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .form-container {
    height: 350px;
    width: 350px;
  }
}
</style>