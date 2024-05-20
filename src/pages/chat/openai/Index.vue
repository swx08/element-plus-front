<template>
  <div class="chatroom">
    <div class="chat-header">
      <h2>{{ roomName }}</h2>
    </div>
    <div class="chat-messages">
      <div v-for="message in messages" :key="message.id">
        <span>{{ message.username }}: </span>
        {{ message.text }}
      </div>
    </div>
    <div class="chat-input">
      <input type="text" v-model="newMessage" @keyup.enter="sendMessage" />
      <button @click="sendMessage">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomName: 'Chat Room',
      messages: [],
      newMessage: ''
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        this.messages.push({
          id: Date.now(),
          username: 'You',
          text: this.newMessage
        });
        this.newMessage = '';
      }
    }
  }
};
</script>

<style scoped>
.chatroom {
  width: 400px;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 20px;
}

.chat-header {
  text-align: center;
  margin-bottom: 20px;
}

.chat-messages {
  height: 300px;
  overflow-y: scroll;
  margin-bottom: 20px;
}

.chat-input {
  display: flex;
}

.chat-input input {
  flex: 1;
  padding: 5px;
}

.chat-input button {
  padding: 5px 10px;
}
</style>
