<template>
  <header :class="styles.headerContainer">
    <div :class="styles.headerTop">
      <a href="https://ksu.edu">
        <img :src="logo" alt="Logo" :class="styles.logo" />
      </a>
      <div :class="styles.divider"></div>
      <a href="https://cs.ksu.edu" style="text-decoration: none;">
        <h1 :class="styles.headerTitle">Computer Science Student Portal</h1>
      </a>
      <Button
        label="Logout"
        icon="pi pi-sign-out"
        @click="logout"
        severity="danger"
        style="margin-left: auto; margin-right: 1rem;"
      />
    </div>
    <nav :class="styles.navSection">
      <ul :class="styles.navList">
        <li v-for="item in navItems" :key="item.link" :class="styles.navItemContainer">
          <RouterLink :to="item.link" :class="styles.navItem">{{ item.label }}</RouterLink>
          <div :class="styles.dividerNav"></div>
        </li>
        <li v-if="showAdminLink" :class="styles.navItemContainer">
          <div :class="styles.dividerNav"></div>
          <RouterLink to="/admin" :class="styles.navItem">Admin</RouterLink>
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

export default defineComponent({
  name: 'Header',
  components: {
    Button,
  },
  setup() {
    const user = true;//inject('UserContext');

    const logout = () => {
      window.location = '/api/logout';
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
