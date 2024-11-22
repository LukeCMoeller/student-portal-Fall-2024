// setupTests.js
import { config } from '@vue/test-utils';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import FocusTrap from 'primevue/focustrap';
import { vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router';

//Route imports
import Error from '@/components/common/ErrorPage.vue'
import Home from '@/components/forms/HomePage.vue'
import professionalRoutes from '@/sub-apps/professional-program-app/routes'
import ProfessionalProgram from '@/sub-apps/professional-program-app/ProfessionalProgram.vue'
import ProfileRoutes from '@/sub-apps/profile-app/ProfileRoutes'

//Mock Router
const router = createRouter({
  history: createWebHistory(),
  routes: [
      { path: '/', component: Home },
      { path: '/home', component: Home },
      { path: '/professional-program', component:ProfessionalProgram,
         children: professionalRoutes
      },
      { path : '/profile',
        children: ProfileRoutes
      },
      { path: '/:catchAll(.*)', component: Error }
  ]
})


// Install PrimeVue globally in tests
config.global.plugins = [PrimeVue, ConfirmationService, ToastService, router];

config.global.directives = {
  tooltip: Tooltip,
  focustrap: FocusTrap,
};