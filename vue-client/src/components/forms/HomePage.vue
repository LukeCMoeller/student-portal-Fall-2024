<template>
  <div :class="style.HomePage">
    <div :class="style.homeContainer" class="w-12 xl:w-6 md:w-9">
    <div class="grid">

<div class="col-8 col-offset-2 xl:col-12 xl:col-offset-0">
  <div :class="style.appHeader">
    <h1 :class="style.h1Style">CS Student Portal</h1>
    <h4 :class="style.h4Style">Welcome to the CS Student Portal System</h4>
  </div>
</div>

</div>
</div>
</div>
</template>

<script>
import Button from '../common/Button.vue';
import styles from '../../styles/HomePage.module.css';
import '/node_modules/primeflex/primeflex.css'

export default {
  name: 'HomePage',
  components: {
    Button,
  },
  computed: {
    style() {
      return styles;
    },
  },
};
</script>