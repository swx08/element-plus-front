<template>
  <div class="message-input">
    <input
      type="text"
      v-model="newMessage"
      @keyup.enter="sendMessage"
      placeholder="Enter your message..."
    />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script>
import { ref, defineEmits } from 'vue';

export default {
  name: 'MessageInput',
  setup() {
    const newMessage = ref('');
    const emit = defineEmits(['send-message']);

    const sendMessage = () => {
      if (newMessage.value.trim() !== '') {
        emit('send-message', {
          user: 'You',
          text: newMessage.value,
          id: Date.now() // 为每条消息分配一个唯一的 ID
        });
        newMessage.value = '';
      }
    };

    return {
      newMessage,
      sendMessage
    };
  }
};
</script>

<style scoped lang="scss">
.message-input {
  display: flex;
  align-items: center;
  padding: 10px;
}

input {
  flex: 1;
  margin-right: 10px;
}
</style>