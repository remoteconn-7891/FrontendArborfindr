<template>
  <div>
    <h2>Messages</h2>
    <ul>
      <li v-for="(msg, index) in messages" :key="index">
        <span>{{ msg.username }}: {{ msg.message }}</span>
        <button @click="editMessage(index)">Edit</button>
        <button @click="deleteMessage(index)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ws from "@/services/websocketService";

const messages = ref([]);

// Receive new messages
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  messages.value.push(data);
};

// Edit a message
const editMessage = (index) => {
  const newText = prompt("Edit your message:", messages.value[index].message);
  if (newText !== null) {
    const updatedMsg = { ...messages.value[index], message: newText };
    ws.send(JSON.stringify({ type: "update", data: updatedMsg }));
    messages.value[index] = updatedMsg;
  }
};

// Delete a message
const deleteMessage = (index) => {
  const msgToDelete = messages.value[index];
  ws.send(JSON.stringify({ type: "delete", data: msgToDelete }));
  messages.value.splice(index, 1);
};
</script>
