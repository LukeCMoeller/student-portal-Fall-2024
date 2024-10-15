import './assets/main.css'
import { createApp } from 'vue'
import {createPinia} from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import Aura from '@primevue/themes/aura'

createApp(App)
.use(PrimeVue, {theme: {
    preset: Aura
}})
.use(router)
.use(createPinia())
.mount('#app')

