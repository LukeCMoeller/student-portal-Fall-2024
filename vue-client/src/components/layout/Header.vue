<template>
  <header :class="styles.headerContainer">
    <div :class="styles.headerTop">
      <a href="https://ksu.edu">
        <img :src="logo" alt="Logo" :class="styles.logo" />
      </a>
      <div :class="styles.divider"></div>
      <a href="https://cs.ksu.edu" style="text-decoration: none;">
        <h1 :class="styles.headerTitle" class="text-lg md:text-6xl">Computer Science Student Portal</h1>
      </a>
      <Button
      label="Logout"
      icon="pi pi-sign-out"
      @click="logout"
      severity="danger"
      style="margin-left: auto; margin-right: 1rem; text-align: center; display: block;"
      />

    </div>
    <nav :class="styles.navSection">
      <ul :class="styles.navList">
        <li :class="styles.navItemContainer">
          <RouterLink :to="navItems[0].link" :class="styles.navItem">{{ navItems[0].label }}</RouterLink>
          <div :class="styles.dividerNav"></div>
          <RouterLink :to="navItems[1].link" :class="styles.navItem">{{ navItems[1].label }}</RouterLink>
          <div :class="styles.dividerNav"></div>
          <RouterLink :to="navItems[2].link" :class="styles.navItem">{{ navItems[2].label }}</RouterLink>
          <div v-if="showAdminLink" :class="styles.dividerNav"></div>
          <RouterLink v-if="showAdminLink" to="/admin" :class="styles.navItem">Admin</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { defineComponent, inject } from 'vue';
import  Button  from 'primevue/button';
import logo from '../../img/ksuLogo.png';
import styles from '../../styles/Header.module.css';
import {useTokenStore} from '../../stores/TokenStore.js';

export default defineComponent({
  name: 'Header',
  components: {
    Button,
  },
  setup() {
    const user = true;//inject('UserContext');

    const logout = () => {
      const tokenStore = useTokenStore();
      tokenStore.logout();
    };

    const showAdminLink = true;//user && user.admin;

    const navItems = [
      { label: 'CS Applications', link: '/home' },
      { label: 'Apply', link: '/apply' },
      { label: 'Profile', link: '/profile' },
    ];

    return {
      logo,
      styles,
      logout,
      showAdminLink,
      navItems,
    };
  },
});
</script>
