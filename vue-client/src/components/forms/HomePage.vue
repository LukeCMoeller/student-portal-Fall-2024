<template>
  <div :class="$style.HomePage">
    <div class="p-m-4">
      <div :class="$style.appHeader">
        <h1 :class="$style.h1Style">CS Applications</h1>
        <h4 :class="$style.h4Style">Welcome to the CS Applications System</h4>
      </div>
    </div>

    <div class="p-grid p-justify-center p-m-4">
      <div class="p-col-12 p-md-5" :class="$style.boxStyle" style="background-color: #d1d1d1">
        <h2 :class="$style.h2Style">Requirements</h2>
        <p>In order to be considered for admission to the professional program, a student must have:</p>
        <ol :class="$style.customList">
          <li>Passed all pre-professional program courses with a C or better</li>
          <li>Achieved at least a 2.3 GPA on all pre-professional courses (including transfer courses)</li>
        </ol>
      </div>

      <div class="p-col-12 p-md-5 p-md-offset-2" :class="$style.applyBoxStyle" style="background-color: #d1d1d1">
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
</template>

<script>
import Button from '../common/Button.vue';
import styles from '../../styles/HomePage.module.css';

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