const ws = new WebSocket("ws://yourserver.com/ws/chat/");

ws.onopen = () => {
    console.log("Connected to WebSocket");
};

ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Received:", data);
};

ws.onerror = (error) => {
    console.error("WebSocket Error:", error);
};

export default ws;
