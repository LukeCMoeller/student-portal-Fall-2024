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
            <span style="font-weight: bold; color: white;">{{ item.label }}</span>
          </a>
        </router-link>
        <a v-else v-bind="props.action">
          <span style=" color: white;">{{ item.label }}</span>
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

    const popupTop = ref(0);
    const popupLeft = ref(0);

  
    const items = computed(() => {
      const baseItems = ref([
        { label: 'Portal', route: '/home' },
        {
          label: 'Professional Program',
          items: [
            { label: 'Home', route: '/professional-program' },
            { label: 'Applications', route: '/professional-program/apply' }
          ]
        },
        { label: 'Profile', route: '/profile' },
      ]);
      return IsAdminMode.value 
        ? [...baseItems.value, { label: 'Admin', route: '/admin' }]
        : baseItems.value;
    });
    /* 
    const items = ref([
        {
            label: 'Portal',
            route: '/home'
        },
        {
          label: 'Professional Program',
          items: [{label: 'Home', route: '/professional-program'}, {label: 'Applications', route: '/professional-program/apply'}]
        },
        {
            label: 'Profile',
            route: '/profile'
        },
    ]);
*/
    const showPopup = (event, item) => {
      const rect = event.currentTarget.getBoundingClientRect();
      popupTop.value = rect.bottom + window.scrollY; // Position relative to the page
      popupLeft.value = rect.left; // Align with the left side of the item
      item.showPopup = true;
    };

    return {
      logo,
      styles,
      items,
      popupTop,
      popupLeft,
      showPopup,
      IsAdmin,
      IsAdminMode
    };
  },
});
</script>

<style>
.popup {
  position: absolute; /* Keep this as absolute */
  text-align: center;
  color: white;
  background-color: #482277;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 0.5rem 1.5rem 1rem 1.5rem;
  z-index: 0;
}
.subNavList {
  list-style-type: none;
  padding: 0; /* Remove default padding */
  margin: 0; /* Remove default margin */
}
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
