<template>
<div :class="shared['flex-centered']">
    <div :class="shared['content-container']">
    <div class="grid" style="width:100%;">
      <div class="col-8 col-offset-2 xl:col-8 xl:col-offset-2"> 
        <!--Header-->
        <div :class="shared['app-header']">
          <h1 :class="shared['h1-style']">Admin Control Panel</h1>
          <h4 :class="shared['h4-style']">Welcome aboard captain</h4>
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
import Button from '@/components/common/Button.vue';

//CSS
import styles from '@/components/styles/HomePage.module.css';
import shared from '@/components/styles/Shared.module.css';

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