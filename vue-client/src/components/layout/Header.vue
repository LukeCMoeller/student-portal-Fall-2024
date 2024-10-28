<template>
  <header :class="styles.headerContainer">
    <div :class="styles.headerTop" style="background-color: gainsboro;display:grid; justify-content: end; grid-auto-flow: column; padding-top: .1rem">
      <p style="padding-right: 1rem;">Admin </p>
        <ToggleSwitch v-model="adminMode" style="margin-right:5vw" />

        <RouterLink :to="'/api/logout'" :class="styles.logout">Logout</RouterLink>
    </div>
    <div :class="styles.headerTop">
      <a href="https://ksu.edu" :class="styles.noBackground">
        <img :src="logo" alt="Logo" :class="styles.logo" style="height: 40px;" />
      </a>
      <div :class="styles.divider"></div>
      <a href="https://cs.ksu.edu" :class="styles.noBackground">
        <h1 :class="styles.headerTitle" class="">Computer Science Student Portal</h1>
      </a>

    </div>

    <nav :class="styles.navSection">
      <ul :class="styles.navList">
        <li :class="styles.navItemContainer" v-for="(item, index) in navItems">
            <RouterLink :key="index" :to="item.link" :class="styles.navItem">{{ item.label }} </RouterLink>
            <div v-if="index !== navItems.length - 1" :class="styles.dividerNav"></div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import { defineComponent, ref, watch } from 'vue';
import  Button  from 'primevue/button';
import logo from '../../img/ksuLogo.png';
import styles from '../../styles/Header.module.css';
import ToggleSwitch from 'primevue/toggleswitch';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'Header',
  components: {
    Button,
    ToggleSwitch,
  },
  setup() {
    const logout = () => {
      window.location = '/api/logout';
    };

    const store = useStore(); // Get the store instance
    const adminMode = ref(store.state.IsAdminMode);

    // Watch for changes to adminMode and update Vuex state accordingly
    watch(adminMode, (newVal) => {
      store.dispatch('updateIsAdminMode', newVal); // Dispatch the action with the new value
    });

    const showAdminLink = true;

    const navItems = [
      { label: 'Home', link: '/home' },
      { label: 'CS Applications', link: '/professional-program' },
      { label: 'Profile', link: '/profile' },
    ];

    return {
      logo,
      styles,
      logout,
      showAdminLink,
      navItems,
      adminMode
    };
  },
});
</script>
