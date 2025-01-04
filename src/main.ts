import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
axios.defaults.baseURL = 'http://localhost:8001';

// Set up axios default base URL using environment variable
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

// Optionally, use the API key in headers if needed
axios.interceptors.request.use(function (config) {
    config.headers['X-Binarybox-Api-Key'] = import.meta.env.VITE_APP_API_KEY;
    return config;
});

const pinia = createPinia();;

const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app');

