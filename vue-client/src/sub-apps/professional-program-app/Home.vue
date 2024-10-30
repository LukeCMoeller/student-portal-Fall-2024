<template>
  <div :class="style.HomePage">
    <div :class="style.homeContainer" class="w-12 xl:w-6 md:w-9">
    <div class="grid">

<div class="col-8 col-offset-2 xl:col-12 xl:col-offset-0">
  <div :class="style.appHeader">
    <h1 :class="style.h1Style">CS Applications</h1>
    <h4 :class="style.h4Style">Welcome to the CS Applications System</h4>
  </div>
</div>

<div class="col-8 col-offset-2 xl:col-6 xl:col-offset-0">
  <div :class="style.applyBoxStyle" style="background-color: #d1d1d1" >
    <h2 :class="style.h2Style">Requirements</h2>
    <p :class="style.pStyleApply">In order to be considered for admission to the professional program, a student must have:</p>
    <ol :class="style.customList">
      <div >
      <li :class="style.pListApply">Passed all pre-professional program courses with a C or better</li>
      <li :class="style.pListApply">Achieved at least a 2.3 GPA on all pre-professional courses (including transfer courses)</li>
    </div>
    </ol>
  </div>
</div>

<div class="col-8 col-offset-2 xl:col-6 xl:col-offset-0">
  <div v-if="IsAdminMode" :class="style.applyBoxStyle" style="background-color: #d1d1d1;">
    <h2 :class="style.h2Style">Review Applications</h2>
    <p :class="style.pStyleApply">When you are ready to review student cs applications, click the button below!</p>
    <br />
    <router-link :to="{ name: 'apply' }" :class="style['link-no-decoration']">
      <div :class="style.buttonContainer">
        <Button label="Apply Now" />
      </div>
    </router-link>
  </div>
  <div v-else :class="style.applyBoxStyle" style="background-color: #d1d1d1;">
    <h2 :class="style.h2Style">Apply</h2>
    <p :class="style.pStyleApply">When you are ready to apply, click the button below!</p>
    <br />
    <router-link :to="{ name: 'apply' }" :class="style['link-no-decoration']">
      <div :class="style.buttonContainer">
        <Button label="Apply Now" />
      </div>
    </router-link>
  </div>
</div>


</div>
</div>
</div>
</template>

<script>
import Button from '../../components/common/Button.vue';
import styles from '../../styles/HomePage.module.css';
import '/node_modules/primeflex/primeflex.css'
import { mapGetters } from 'vuex';

export default {
  name: 'HomePage',
  components: {
    Button,
  },
  computed: {
    ...mapGetters(['IsAdminMode']), 
    style() {
      return styles;
    },
  },
};
</script>