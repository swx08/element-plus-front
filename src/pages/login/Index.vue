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
            后台管理系统
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
import { ref, onMounted } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import router from "@/router/index.js";
import { ElNotification } from "element-plus";

const loading = ref(false);
const loginForm = ref();
const user = ref({
  username: "admin",
  password: "admin123",
});

const rules = ref({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});

const submitForm = () => {
  loginForm.value.validate((valid) => {
    if (valid) {
      loading.value = true;
      setTimeout(() => {
        loading.value = false;
        ElNotification({
          title: "登录成功",
          message: "欢迎回来",
          type: "success",
        });
        router.push("/home");
      }, 2000);
      // doLogin(user.value).then((res) => {
      //   if (res.code === 200) {
      //     authStore.setAuthorization(res.data);
      //     router.push("about");
      //   }
      // });
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