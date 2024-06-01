<template>
    <el-badge is-dot>
        <el-tooltip content="消息通知" placement="bottom">
            <el-popover placement="bottom" :width="400" trigger="click">
                <template #reference>
                    <el-button @click="doRefresh" circle icon="Bell"></el-button>
                </template>
                <!-- 头部区域 -->
                <div class="header-tip">
                    <el-badge :value="data.length" :show-zero="false" :offset="[10, 5]">
                        <h2 style="font-size: 17px;font-weight: 600;">消息中心</h2>
                    </el-badge>
                    <el-button link type="primary" @click="handleClear">清空</el-button>
                </div>
                <!-- 内容区域 -->
                <div class="content-box">
                    <div style="height: 200px;">
                        <el-scrollbar height="200px">
                            <div v-for="(item, index) in data" :key="index" style="padding: 10px 15px 0 10px;">
                                <div style="display: flex;justify-content: space-between;">
                                    <el-tooltip content="点击设为已读" placement="top">
                                        <el-button type="primary" @click="handleUpdate(item, index)" link>
                                            <h3 :style="{ textDecoration: item.status === 1 ? 'line-through' : '' }">
                                                {{ item.title
                                                }}
                                            </h3>
                                        </el-button>
                                    </el-tooltip>

                                    <el-tag link type="success">续费通知</el-tag>
                                </div>
                                <p
                                    :style="{ color: item.status === 1 ? '#C0C4CC' : '#262626', textDecoration: item.status === 1 ? 'line-through' : '',marginTop: '10px' }">
                                    {{ item.content }}</p>

                                <el-divider style="margin: 10px 0 10px 0;" />
                            </div>
                            <!-- 暂无数据 -->
                            <el-empty :image-size="100" v-if="isEmpty" description="暂无数据" />
                        </el-scrollbar>
                    </div>
                    <div class="msg-footer">
                        <el-button link type="primary" @click="handleAllRead">全部已读</el-button>
                        <el-divider direction="vertical"></el-divider>
                        <el-button link type="primary">查看更多</el-button>
                    </div>
                </div>
            </el-popover>
        </el-tooltip>
    </el-badge>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isEmpty = ref(false);
const data = ref([
    {
        title: '续费通知',
        status: 0,
        content: '您的产品使用期限即将截止，如需继续使用产品请前往购把开朗看风景'
    },
    {
        title: '规则开通成功',
        status: 0,
        content: '您的产品使用期限即将截止，如需继续使用产品请前往购把开朗看风景'
    },
    {
        title: '续费通知',
        status: 0,
        content: '您的产品使用期限即将截止，如需继续使用产品请前往购把开朗看风景'
    },
    {
        title: '规则开通成功',
        status: 0,
        content: '您的产品使用期限即将截止，如需继续使用产品请前往购把开朗看风景'
    },
]);

//模拟修改消息状态
const handleUpdate = (item, index) => {
    data.value[index].status = data.value[index].status === 1 ? 0 : 1;
}

//模拟清空消息
const handleClear = () => {
    data.value = [];
    isEmpty.value = true;
}

//模拟全部已读
const handleAllRead = () => {
    data.value.forEach(item => {
        item.status = 1;
    })
}
</script>
<style scoped lang='scss'>
.header-tip {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    height: 40px;
}

.content-box {
    height: 240px;
}

p {
    //超出宽度时文本省略
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
}
.msg-footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    height: 40px;
}
</style>