<template>
  <div :class="$style.HomePage">
    <div class="grid flex-column">

<div class="col-12 sml">
  <div :class="$style.appHeader">
    <h1 :class="$style.h1Style">CS Applications</h1>
    <h4 :class="$style.h4Style">Welcome to the CS Applications System</h4>
  </div>
</div>

<div class="col-12  sm-full">
  <div :class="$style.applyBoxStyle" style="background-color: #d1d1d1" >
    <h2 :class="$style.h2Style">Requirements</h2>
    <p :class="$style.pStyleApply">In order to be considered for admission to the professional program, a student must have:</p>
    <ol :class="$style.customList">
      <div >
      <li :class="$style.pListApply">Passed all pre-professional program courses with a C or better</li>
      <li :class="$style.pListApply">Achieved at least a 2.3 GPA on all pre-professional courses (including transfer courses)</li>
    </div>
    </ol>
  </div>
</div>

<div class="col-12  sm-full">
  <div :class="$style.applyBoxStyle" style="background-color: #d1d1d1">
    <h2 :class="$style.h2Style">Apply</h2>
    <p :class="$style.pStyleApply">When you are ready to apply, click the button below!</p>
    <br />
    <router-link to="/Apply" :class="$style['link-no-decoration']">
      <div :class="$style.buttonContainer">
        <Button label="Apply Now" />
      </div>
    </router-link>
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
    $style() {
      return styles;
    },
  },
};
</script>