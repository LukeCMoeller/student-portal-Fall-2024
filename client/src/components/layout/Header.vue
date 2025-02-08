<template>
  <header :class="styles['headerContainer']">
    <!--Header bar-->
    <div :class="styles.headerTop" style="background-color: gainsboro; display: grid; justify-content: end; grid-auto-flow: column; padding-top: .1rem;">
      <p v-if="IsAdmin" style="padding-right: 1rem;">Admin Mode:</p>
        <!--Admin toggle-->
        <ToggleSwitch v-if="IsAdmin" v-model="IsAdminMode" style="margin-right:5vw" />
        <!--Logout-->
        <RouterLink :to="''" @click="logout" :class="styles['logout']">Logout</RouterLink>
    </div>
    <!--Header-->
    <div :class="styles.headerTop">
      <!--Header Icon-->
      <a href="https://ksu.edu" :class="styles.noBackground">
        <img :src="logo" alt="Logo" :class="styles.logo" style="height: 40px;" />
      </a>
      <div :class="styles.divider"></div>
      <!--Header Text-->
      <a href="https://cs.ksu.edu" :class="styles.noBackground">
        <h1 :class="styles.headerTitle">Computer Science Student Portal</h1>
      </a>
    </div>

    <!--Navbar-->
    <Menubar :model="items" style="margin: 0; padding: 0;">
  <template #item="{ item, props }">
    <router-link v-if="item.route" :to="item.route" style="padding: 0; background-color: transparent;">
      <a v-bind="props.action">
        <span 
          :style="{ color: 'white', fontWeight: item.root ? 'bold' : 'normal' }"
        >
          {{ item.label }}
        </span>
      </a>
    </router-link>
    <a v-else v-bind="props.action">
      <span 
        :style="{ color: 'white', fontWeight: item.root ? 'bold' : 'normal' }"
      >
        {{ item.label }}
      </span>
    </a>
  </template>
</Menubar>



  </header>
</template>

<script>
//CSS
import styles from '../styles/Header.module.css';

//Components
import { computed, defineComponent, ref} from 'vue';
import { useTokenStore } from '../../stores/TokenStore.js';
import adminMixin from '@/stores/adminMixin';

//Primevue components
import ToggleSwitch from 'primevue/toggleswitch';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';

//Images and icons
import logo from '../assets/ksuLogo.png';

export default defineComponent({
  name: 'Header',
  components: {
    ToggleSwitch,
    Menubar,
    InputText,
  },
  mixins: [adminMixin],
  methods: {
    logout(event) {
      const tokenStore = useTokenStore();
      tokenStore.logout();
    }
  },
  setup() {
    //Check for if the admin toggle is on
    const { IsAdmin, IsAdminMode } = adminMixin.setup();

  
    const items = computed(() => {
      const baseItems = ref([
        { label: 'Portal', route: '/home', root: true },
        {
          label: 'Professional Program', root: true,
          items: [
            { label: 'Home', route: '/professional-program' },
            { label: 'Applications', route: '/professional-program/apply' }
          ]
        },
        { label: 'Profile', route: '/profile', root: true },
      ]);
      return IsAdminMode.value 
        ? [...baseItems.value, { label: 'Admin', route: '/admin', root: true }]
        : baseItems.value;
    });

    return {
      logo,
      styles,
      items,
      IsAdmin,
      IsAdminMode
    };
  },
});
</script>

<style>

.p-menubar {
  background-color: #482277 !important;
  width: 100% !important; 
  border-color: #482277 !important; 
  border-radius: 0 !important;
  padding-left: 9vw !important;
}
.p-menubar-item-content:hover{
  background-color: transparent !important;
}
.p-menubar-item-link:hover{
  background-color: transparent !important;
  text-decoration: underline white 3px;
  text-underline-offset: 5px; 
}
.p-menubar-item-content{
  background-color: transparent !important;
}
.p-menubar-submenu{
  background-color: #482277 !important;
  border-color: #482277 !important;
  border-radius: 0 !important;
}
.p-menubar-root-list{
  background-color: #482277 !important;
  border-color: #482277 !important;
  border-radius: 0 !important;
  margin-left:0 !important;
}
</style>
