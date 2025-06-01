<template>
  <div>
    <h2>Business Messenger</h2>
    <span v-if="unreadMessages > 0" class="notification-badge">
      {{ unreadMessages }}
    </span>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">
        {{ msg.username }}: {{ msg.message }}
      </li>
    </ul>
    <input v-model="messageValue" placeholder="Type a message..." />
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ws from "@/services/websocketService";

const messages = ref([]);
const messageValue = ref("");
const unreadMessages = ref(0);

// Handle incoming messages
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  messages.value.push(data);

  // Increase unread count if the message isn't from the user
  if (data.username !== "User") {
    unreadMessages.value++;
  }
};

// Send a new message
const sendMessage = () => {
  ws.send(JSON.stringify({ username: "User", message: messageValue.value }));
  messageValue.value = "";
};
</script>

<style scoped>
.notification-badge {
  background-color: red;
  color: white;
  padding: 5px 10px;
  border-radius: 50%;
  font-size: 14px;
}
</style>

