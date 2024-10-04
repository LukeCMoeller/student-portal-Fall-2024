// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Error from './components/common/ErrorPage.vue';
import Apply from './components/forms/ApplicationForm.vue';
import Profile from './components/forms/ProfilesForm.vue';
import Admin from './components/forms/AdminForm.vue';
import Home from './components/forms/HomePage.vue';
import { useTokenStore } from './stores/TokenStore';

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
    return { path: '/auth/login' }
  }
}

const requireUser = () => {
  const tokenStore = useTokenStore()
  if (tokenStore.is_user || tokenStore.is_admin) {
    return true
  } else {
    return { path: '/auth/login' }
  }
}

const routes = [
  { 
    path: '/', 
    component: Home,
    beforeEnter: requireUser 
  },

  { 
    path : '/error', 
    component: Error,
    beforeEnter: requireUser 
  },

  { 
    path: '/home', 
    component: Home,
    beforeEnter: requireUser 
  },

  { 
    path: '/apply', 
    component: Apply,
    beforeEnter: requireUser 
  },

  { 
    path : '/profile', 
    component: Profile,
    beforeEnter: requireUser 
  },

  { 
    path: '/admin', 
    component: Admin,
    beforeEnter: requireAdmin
  },

  {
    path: '/auth/login',
    component: Error
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async function (to) {
  const tokenStore = useTokenStore()
  if (!tokenStore.token) {
    await tokenStore.getToken()
  }
  if (!tokenStore.token) {
    await tokenStore.refreshToken()
  }
})

export default router;