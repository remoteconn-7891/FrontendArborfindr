<script setup>
import { ref } from "vue";
import ws from "@/services/websocketService";

const messages = ref([]);
const messageValue = ref("");

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    messages.value.push(data);
};

const sendMessage = () => {
    ws.send(JSON.stringify({ username: "User", message: messageValue.value }));
    messageValue.value = "";
};

const unreadMessages = ref(0);

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  messages.value.push(data);

  // Increase unread count if the message isn't from the user
  if (data.username !== "User") {
    unreadMessages.value++;
  }

<span v-if="unreadMessages > 0" class="notification-badge">
  {{ unreadMessages }}
</span>

};

</script>

