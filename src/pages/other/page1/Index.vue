<template>
  <div style="height: 200vh">
    <el-card style="width: 100%; height: 100vh" shadow="never">
      <div style="margin-bottom: 50px;">其他</div>
      <div class="mb-4">
        <el-button type="primary" v-has="`btn:other:add`" plain
          >添加其他</el-button
        >
        <el-button type="warning" v-has="`btn:other:remove`" plain>修改其他</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref,onMounted} from 'vue'

</script>
<style scoped>
</style>