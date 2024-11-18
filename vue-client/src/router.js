// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Error from './components/common/ErrorPage.vue'
import Home from './components/forms/HomePage.vue'
import professionalRoutes from './sub-apps/professional-program-app/routes'
import ProfessionalProgram from './sub-apps/professional-program-app/ProfessionalProgram.vue'
import ProfileRoutes from './sub-apps/profile-app/ProfileRoutes'
import { useTokenStore } from './stores/TokenStore'
import { useUsersStore } from './stores/UserStore'


const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/professional-program', component:ProfessionalProgram,
     children: professionalRoutes
  },
  { path : '/profile',
    children: ProfileRoutes
  },
  { path: '/:catchAll(.*)', component: Error }
];


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async function (to) {
  const tokenStore = useTokenStore()
  //const userStore = useUsersStore()
  if (!tokenStore.token) {
    await tokenStore.getToken()
    //await userStore.loadCurrentUser()
  }
  if (tokenStore.token.profile_updated() === false) {
    router.push({path: '/profile'})
  }
})

export default router;