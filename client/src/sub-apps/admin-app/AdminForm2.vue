<template>
<div :class="shared['flex-centered']">
    <div :class="styles['home-container']" class="w-12 xl:w-6 md:w-9">
    <div class="grid">
      <div class="col-12 col-offset-2 xl:col-12 xl:col-offset-0">
        <!--Header-->
        <div :class="shared['app-header']">
          <h1 :class="shared['h1-style']">Future admin page</h1>
          <h4 :class="shared['h4-style']">Will contain admin accessibility</h4>
        </div>
        <RouterLink :to="{ name: 'home' }" :class="shared['no-decoration']">
              <div :class="shared['flex-centered']">
                <Button buttonText="Admin Button!"/>
              </div>  
            </RouterLink>
      </div>
    </div>
  </div>
</div>
</template>

<script>
//Primevue components
import Button from '../../components/common/Button.vue';

//CSS
import styles from '../../styles/HomePage.module.css';
import shared from '../../styles/Shared.module.css';

export default {
  name: 'Admin',
  components: {
    Button,
  },
  setup(){
    return {styles, shared}
  },
};
</script>