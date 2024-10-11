<script setup>
import { RouterView } from 'vue-router';
import Footer from './components/layout/Footer.vue';
import { useTokenStore } from './stores/TokenStore';
import ProtectedAdminRoute from './components/common/ProtectedAdminRoute.vue';
import ErrorPage from './components/common/ErrorPage.vue';
import './App.css';
const tokenStore = useTokenStore();

tokenStore.tryToken();
</script>

<template>
        <div className="appContainer"> 
          <!--<Header/>-->
          <div className="contentBackground">
            <nav>
    <RouterLink to="/">Go to Home</RouterLink>
    <RouterLink to="/about">Go to About</RouterLink>
    <RouterLink to="/error">Go to Error</RouterLink>
    <RouterLink to="/apply">Go to Apply</RouterLink>
    <RouterLink to="/profile">Go to Profile</RouterLink>
    <RouterLink to="/admin">Go to Admin</RouterLink>
  </nav>
  <RouterView/>
          </div> 
          <Footer/>
        </div>
</template>
<!-- old stuff in this comment 
import Header from './components/layout/Header.vue';  
import Footer from './components/layout/Footer.vue'; 
import ApplicationForm from './components/forms/ApplicationForm.jsx';
import ProfilesForm from './components/forms/ProfilesForm.jsx';
import HomePage from './components/forms/HomePage.jsx';
import AdminForm from './components/forms/AdminForm.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './context/UserContext.jsx'; 
//import TicketForwarder from './utils/TicketForwarder.js';



-->