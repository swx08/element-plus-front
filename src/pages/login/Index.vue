<template>
  <div class="login-container">
    <div class="card">
      <el-form ref="loginForm" :model="user" :rules="rules">
        <div>
          <h1
            style="
              font-family: '华文楷体';
              font-weight: bold;
              text-align: center;
            "
          >
            {{ setting.title }}
          </h1>
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              margin: 10px 0 20px 0;
            "
          >
            <span>WELCOME!</span>
          </div>
        </div>
        <el-form-item prop="username">
          <template #default>
            <el-input
              :prefix-icon="User"
              size="large"
              v-model="user.username"
            ></el-input>
          </template>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            size="large"
            type="password"
            show-password
            v-model="user.password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            style="width: 100%; margin-top: 20px"
            size="large"
            type="primary"
            color="#626aef"
            @click="submitForm"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, renderList } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import useUserStore from "@/stores/models/user/user.js";
import router from "@/router/index.js";
import setting from "@/setting.js";

const userStore = useUserStore();
const loading = ref(false);
const loginForm = ref();
const user = ref({
  username: "admin",
  password: "111",
});

const rules = ref({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

//登录提交
const submitForm = () => {
  loginForm.value.validate(async (valid) => {
    if (valid) {
      try {
        //进到这里说明已经登录成功
        loading.value = true;
        await userStore.login(user.value);
        ElMessage({
          message: "登录成功",
          type: "success",
        });
        loading.value = false;
        router.push({ path: "/" });
      } catch (error) {
        loading.value = false;
      }
    }
  });
};
</script>
<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  background: url("@/assets/login/login2.png") no-repeat;
  background-size: cover;
}

.card {
  background-color: #fff;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  height: 340px;
  width: 300px;
  border-radius: 8px;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>