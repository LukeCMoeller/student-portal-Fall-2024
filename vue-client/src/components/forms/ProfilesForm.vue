<template>
  <div :class="$style.ProfilesForm">
    <div class="p-m-4">
      <div class="p-grid p-justify-center p-m-4">
        <div class="p-col-12 p-md-8" :class="$style.formContainer" style="background-color: #d1d1d1">
          <h3 :class="$style.h3Style">Update your user profile:</h3>

          <form @submit.prevent="submitForm">
            <!-- First Name Field -->
            <div class="p-field p-grid p-mb-3">
                <label for="firstName" class="p-col-12 p-md-2">First Name</label>
                <div class="p-col-12 p-md-10">
                    <InputText id="firstName" v-model="firstName" placeholder="Enter your first name" />
                </div>
            </div>

            <!-- Last Name Field -->
            <div class="p-field p-grid p-mb-3">
            <label for="lastName" class="p-col-12 p-md-2">Last Name</label>
            <div class="p-col-12 p-md-10">
                <InputText id="lastName" v-model="lastName" placeholder="Enter your last name" />
            </div>
            </div>

            <!-- Email Field -->
            <div class="p-field p-grid p-mb-3">
            <label for="email" class="p-col-12 p-md-2">Email</label>
            <div class="p-col-12 p-md-10">
                <InputText id="email" v-model="email" placeholder="Enter your email" />
            </div>
            </div>

            <!-- Submit Button -->
            <div class="p-field p-grid p-mb-3">
            <div class="p-col-12 p-md-10 p-offset-md-2">
                <button type="button" :class="$style.btnUpdate" @click="ToCodeLater">Submit</button>
            </div>
            </div>
        </form>
        </div>
      </div>
    </div>

    <footer :class="$style.footer">
      <div class="p-m-4">
        <p>CS Applications - Contact webmaster@cs.ksu.edu for help</p>
      </div>
    </footer>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import styles from '../../styles/ProfileForm.module.css';

export default {
  name: 'ProfilesForm',
  components: {
    InputText,
  },
  methods: {
    ToCodeLater(event) {
      if (event) {
        alert('Hello person again');
      }
    }
  },
  setup() {
    const firstName = '';
    const lastName = '';
    const email = '';
    const wid = '';

    return { firstName, lastName, email, wid };
  },
  computed: {
    $style() {
      return styles;
    },
  },
};
</script>
