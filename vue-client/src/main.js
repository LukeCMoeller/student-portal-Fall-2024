import './assets/main.css';
import { createApp } from 'vue';
import {createPinia} from 'pinia';
import App from './App.vue';
import router from './router';

createApp(App)
.mount('#app')
.use(router)
.use(createPinia());
