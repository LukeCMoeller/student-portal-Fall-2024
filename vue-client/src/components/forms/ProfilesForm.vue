<template>
  <div :class="style.ProfilesForm">
    <div class="grid nested-grid">
      <div class="col-4 col-offset-4">
            <h3 :class="style.h3Style">Update your user profile:</h3>
      </div>
      <div class="col-12">
        <div :class="style.formContainer">
          
          <form @submit.prevent="submitForm" id="profileForm">
            <div class="grid">
              <div class="col bg-white border-round-sm">
                <div class="col">
                  <!-- First Name Field -->
                  <FloatLabel variant="in">
                    <InputText id="firstName" v-model="firstName" variant="filled"/>
                    <label for="firstName">First Name</label>
                  </FloatLabel>
                </div>

                <div class="col">
                  <!-- Last Name Field -->
                  <FloatLabel variant="in">
                    <InputText id="lastName" v-model="lastName" variant="filled" />
                    <label for="lastName">Last Name</label>
                  </FloatLabel>
                </div>

                <div class="col">
                  <!-- Email Field -->
                  <FloatLabel variant="in">
                    <InputText id="email" v-model="email" variant="filled" />
                    <label for="email">Email</label>
                  </FloatLabel>
                </div>

                <div class="col">
                  <!-- WID Field -->
                  <FloatLabel variant="in">
                    <InputText id="wid" v-model="wid" variant="filled" disabled />
                    <label for="wid">WID</label>
                  </FloatLabel>
                </div>
              
                <div class="col col-offset-3">
                  <!-- Submit Button -->
                  <button type="button" :class="style.btnUpdate" @click="ToCodeLater">Submit</button>
                </div>

              </div>
            </div>

          </form>
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="col">
        <div :class="style.footer">
          <p>CS Applications - Contact webmaster@cs.ksu.edu for help</p>
      </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import FloatLabel from 'primevue/floatlabel';
import style from '../../styles/ProfileForm.module.css';
import '/node_modules/primeflex/primeflex.css'
import { ref } from 'vue';

export default {
  name: 'ProfilesForm',
  components: {
    InputText,
    FloatLabel,
  },
  methods: {
    ToCodeLater(event) {
      if (event) {
        alert(`Attempting to submit form with values:\nFirst Name: ${this.firstName}\nLast Name: ${this.lastName}\nEmail: ${this.email}`);
      }
    }
  },
  setup() {
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    
    return { firstName, lastName, email, style };
  },
};
</script>
