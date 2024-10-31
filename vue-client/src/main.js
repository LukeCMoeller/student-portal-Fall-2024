import './assets/main.css'
import { createApp } from 'vue'
import {createPinia} from 'pinia'
import Aura from '@primevue/themes/aura';
import { definePreset } from '@primevue/themes';
import PrimeVue from 'primevue/config'
import App from './App.vue'
import userStore from './stores/AdminStore'
import router from './router'
import Logger from 'js-logger'
import setupInterceptors from './services/interceptors'
import ToastService from 'primevue/toastservice'

const kPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{purple.50}',
            100: '{purple.400}',
            200: '{purple.400}',
            300: '{purple.400}',
            400: '{purple.400}',
            500: '{purple.500}',
            600: '{purple.600}',
            700: '{purple.700}',
            800: '{purple.800}',
            900: '{purple.900}',
            950: '{purple.950}'
        }
    }
});
Logger.useDefaults()
Logger.setLevel(import.meta.env.DEV ? Logger.DEBUG : Logger.WARN)
console.log('Log Level: ' + Logger.getLevel().name)

setupInterceptors()

createApp(App)
.use(PrimeVue, {
    theme: {
        preset: kPreset,
        options: {
            prefix: 'p',
            darkModeSelector: 'system',
            cssLayer: false
        }
    }
 })
.use(router)
.use(userStore)
.use(createPinia())
.use(ToastService)
.mount('#app')

