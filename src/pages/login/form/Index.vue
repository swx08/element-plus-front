<template>
    <h1>登录{{ setting.title }}</h1>
    <el-form ref="loginForm" :model="user" :rules="rules">
        <el-form-item prop="username">
            <template #default>
                <el-input style="width: 90%" :prefix-icon="User" v-model="user.username"></el-input>
            </template>
        </el-form-item>
        <el-form-item prop="password">
            <el-input style="width: 90%" @keyup.enter="submitForm" :prefix-icon="Lock" type="password" show-password
                v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item>
            <div class="form-item-forget">
                <el-checkbox v-model="user.remember">记住密码</el-checkbox>
                <el-button link type="primary" @click="submitForm">忘记密码</el-button>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button :loading="loading" style="width: 90%;" type="primary" color="#626aef"
                @click="submitForm">登录</el-button>
        </el-form-item>
        <el-form-item>
            <el-button style="width: 90%;" link @click="handleRegister">立即注册</el-button>
        </el-form-item>
    </el-form>
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
    username: "test",
    password: "123456",
    remember: true
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

//立即注册
const handleRegister = () => {
    router.push("/register");
}
</script>
<style scoped lang='scss'>
h1 {
    margin-bottom: 40px;
    font-size: 26px;
    color: #333;
}

.login-form-forgot {
    float: right;
}

.form-item-forget {
    display: flex;
    justify-content: space-between;
    width: 90%
}
</style>