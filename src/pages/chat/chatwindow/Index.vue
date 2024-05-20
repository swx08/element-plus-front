<template>
  <div class="chat-window">
    <div class="message" v-for="message in messages" :key="message.id">
      <span class="username">{{ message.user }}</span>
      <span class="text">{{ message.text }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  name: 'ChatWindow',
  props: {
    messages: Array
  },
  setup(props) {
    // 这里不需要额外的逻辑，因为我们已经通过 props 接收了 messages
    return {};
  }
};
</script>

<style scoped lang="scss">
.chat-window {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  padding: 10px;
  box-sizing: border-box;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.username {
  font-weight: bold;
  margin-right: 5px;
}

.text {
  /* 根据需要添加样式 */
}
</style>