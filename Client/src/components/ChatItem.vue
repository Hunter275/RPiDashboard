<template>
  <div class="chat">
    <div class="messages">
      <div v-for="(message, index) in messages" :key="index" class="message">
        {{ message }}
      </div>
    </div>
    <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Type a message...">
  </div>
</template>

<script>
import socket from '../socket';

export default {
  data() {
    return {
      messages: [],
      newMessage: ''
    };
  },
  created() {
    socket.on('message', (message) => {
      this.messages.push(message);
    });
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== '') {
        socket.emit('message', this.newMessage);
        this.newMessage = '';
      }
    }
  }
};
</script>

<style>
.chat {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.messages {
  flex: 1;
  overflow-y: auto;
}
.message {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
input {
  padding: 10px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
}
</style>
