<template>
    <h1>注册{{ setting.title }}</h1>
    <el-form ref="loginForm" :model="user" :rules="rules">
        <el-form-item prop="username">
            <template #default>
                <el-input style="width: 90%" placeholder="用户名" :prefix-icon="User" v-model="user.username"></el-input>
            </template>
        </el-form-item>
        <el-form-item prop="password">
            <el-input style="width: 90%" placeholder="密码" :prefix-icon="Lock" type="password" show-password
                v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
            <el-input style="width: 90%" :prefix-icon="Cellphone" placeholder="手机号" v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item prop="email">
            <el-input style="width: 90%" placeholder="邮箱" v-model="user.email">
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <svg-icon name="email" width="15px" height="15px"></svg-icon>
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item>
            <el-button :loading="loading" style="width: 90%;" type="primary" color="#626aef"
                @click="doRegister">注册</el-button>
        </el-form-item>
        <el-form-item>
            <el-button style="width: 90%;" link @click="handleLogin">立即登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref} from "vue";
import { User, Lock, Cellphone } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import router from "@/router/index.js";
import setting from "@/setting.js";
import { register } from "@/api/user";

const loading = ref(false);
const loginForm = ref();
const user = ref({});

const rules = ref({
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
    email: [{ required: true, message: "请输入邮箱", trigger: "blur" }],
});

//登录提交
const doRegister = () => {
    loginForm.value.validate((valid) => {
        if (valid) {
            loading.value = true;
            register(user.value).then((res) => {
                if (res.code === 200) {
                    loading.value = false;
                    ElMessage({
                        type: 'success',
                        message: '注册成功！',
                    })
                    router.push('/login')
                } else {
                    loading.value = false;
                }
            });
        }
    });
};

//立即注册
const handleLogin = () => {
    router.push({ path: "/login" });
}
</script>
<style scoped lang='scss'>
h1 {
    margin-bottom: 40px;
    font-size: 26px;
    color: #333;
}
</style>