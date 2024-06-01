<template>
    <el-carousel :height="'calc(100vh - 90px)'">
        <el-carousel-item v-for="(item,index) in data" :key="index" class="container">
            <div>
                <h3>{{ item.title }}</h3>
                <div>
                    <svg-icon :name="item.svg" width="350px" height="350px"></svg-icon>
                </div>
            </div>
        </el-carousel-item>
    </el-carousel>
</template>
<script setup>
import { ref } from 'vue';

const data = ref([
    {
        title: '一款基于RBAC模型的权限管理系统',
        svg: 'carousel'
    },
    {
        title: '一款适合快速开发后台权限管理系统的基础框架',
        svg: 'carousel2'
    },
    {
        title: '一款能全面满足你功能需求的后台权限管理系统',
        svg: 'carousel3'
    },
])
</script>
<style scoped>
.container{
    display: flex;
    align-items: center;
    justify-content: center;
}

h3{
    color: #fff;
}
</style>