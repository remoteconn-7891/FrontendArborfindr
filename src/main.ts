import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';
import App from './App.vue';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

const app = createApp(App);

// Set up axios default base URL
axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;

// Use the API key in your headers if needed
axios.interceptors.request.use(function (config) {
    config.headers['X-Binarybox-Api-Key'] = import.meta.env.VITE_APP_API_KEY;
    return config;
});

app.use(createPinia());
app.use(router);
app.mount('#app');
