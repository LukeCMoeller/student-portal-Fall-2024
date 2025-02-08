<!--Home page for the student portal-->
<template>
  <div :class="shared['flex-centered']">
    <div :class="styles['home-container']" class="w-12 xl:w-6 md:w-9">
    <div class="grid" style="width:100%;">
      <div class="col-8 col-offset-2 xl:col-12 xl:col-offset-0">
        <!--Header-->
        <div :class="shared['app-header']">
          <h1 :class="shared['h1-style']">CS Student Portal</h1>
          <h4 :class="shared['h4-style']">Welcome to the CS Student Portal System</h4>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
//Primevue components
import Button from '@/components/common/Button.vue';

//CSS
import styles from '@/components/styles/HomePage.module.css';
import shared from '@/components/styles/Shared.module.css';

export default {
  name: 'HomePage',
  components: {
    Button,
  },
  setup(){
    return {styles, shared}
  },
};
</script>