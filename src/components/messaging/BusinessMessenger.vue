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
</script>

