import './assets/main.css'
import { createApp } from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from './router'
import Logger from 'js-logger'
import setupInterceptors from './services/interceptors'

Logger.useDefaults()
Logger.setLevel(import.meta.env.DEV ? Logger.DEBUG : Logger.WARN)
console.log('Log Level: ' + Logger.getLevel().name)

setupInterceptors()

createApp(App)
.use(router)
.use(createPinia())
.mount('#app')

