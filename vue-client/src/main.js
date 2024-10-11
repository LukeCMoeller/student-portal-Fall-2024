import './assets/main.css'
import { createApp } from 'vue'
import {createPinia} from 'pinia'
import PrimeVue from 'primevue/config';
import App from './App.vue'
import router from './router'

createApp(App)
.use(PrimeVue)
.use(router)
.use(createPinia())
.mount('#app')

