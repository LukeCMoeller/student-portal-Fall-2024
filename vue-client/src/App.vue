<script setup>
import Footer from './components/layout/Footer.vue'
import Header from './components/layout/Header.vue'
import { RouterView } from 'vue-router'
import './App.css';

</script>

<template>
    <div className="appContainer"> 
      <Header/>
      <div className="contentBackground">
        <RouterView />
      </div> 
      <Footer/>
    </div>
</template>

