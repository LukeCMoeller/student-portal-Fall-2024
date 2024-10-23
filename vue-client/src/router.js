// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Error from './components/common/ErrorPage.vue'
import Apply from './sub-apps/professional-program-app/ApplicationForm.vue'
import Profile from './sub-apps/profile-app/ProfilesForm.vue'
import Admin from './sub-apps/professional-program-app/AdminForm.vue'
import Home from './components/forms/HomePage.vue'
import { useTokenStore } from './stores/TokenStore'

/**
 * Route guard to confirm the user is an administrator
 *
 * @returns Boolean: true if the user is an admin, otherwise false
 */
const requireAdmin = () => {
  const tokenStore = useTokenStore()
  if (tokenStore.is_admin) {
    return true
  } else {
    tokenStore.getToken()
  }
}

const routes = [
  { path: '/', component: Home },
  { path: '/home', component: Home },
  { path: '/apply', component: Apply },
  { path : '/profile', component: Profile },
  { path: '/admin', component: Admin, beforeEnter: requireAdmin },
  { path: '/:catchAll(.*)', component: Error }
];


const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async function (to) {
  const tokenStore = useTokenStore()
  if (!tokenStore.token) {
    await tokenStore.getToken()
  }
})

export default router;