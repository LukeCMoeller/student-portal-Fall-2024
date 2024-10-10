<script setup>
import Footer from './components/layout/Footer.vue'
import { RouterView } from 'vue-router'
//import { useTokenStore } from './stores/TokenStore';
//import ProtectedAdminRoute from './components/common/ProtectedAdminRoute.vue';
import './App.css';
//const tokenStore = useTokenStore();

//tokenStore.tryToken();
</script>
<template>
      <!--<UserProvider>-->
        <div className="appContainer"> 
          <!--<Header/>-->
          <div className="contentBackground">
            <nav>
              <RouterLink to="/">Go to Home</RouterLink>
              <RouterLink to="/error">Go to Error</RouterLink>
              <RouterLink to="apply">Go to Apply</RouterLink>
              <RouterLink to="/profile">Go to Profile</RouterLink>
              <RouterLink to="/admin">Go to Admin</RouterLink>
            </nav>
            <RouterView />
          </div> 
          <Footer/>
        </div>
    <!--</UserProvider>--> 
</template>