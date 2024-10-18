import './assets/main.css'
import { createApp } from 'vue'
import {createPinia} from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import Logger from 'js-logger'
import setupInterceptors from './services/interceptors'
import Aura from '@primevue/themes/aura'
Logger.useDefaults()
Logger.setLevel(import.meta.env.DEV ? Logger.DEBUG : Logger.WARN)
console.log('Log Level: ' + Logger.getLevel().name)

setupInterceptors()


createApp(App)
.use(PrimeVue, {theme: {
    preset: Aura
}})
.use(router)
.use(createPinia())
.mount('#app')

