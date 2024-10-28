<template>
  <div :class="style.ProfilesForm">
    <div class="nested-grid">
      <div class="col-8 col-offset-2 xl:col-6 xl:col-offset-3" :class="style.appHeader">
            <h1 :class="style.h1Style">Profile App</h1>
            <h4 :class="style.h4Style">Update your user profile:</h4>
      </div>
      <div class="col-12">
        <div :class="style.formContainer">
          
          <form @submit.prevent="submitForm" id="profileForm">
            <div class="grid flex align-items-stretch flex-wrap">
              <div class="col-6 col-offset-3 xl:col-6 xl:col-offset-0 bg-white border-round-sm">
                <div class="col flex align-items-center justify-content-center">
                  <!-- First Name Field -->
                  <FloatLabel variant="in">
                    <InputText id="firstName" v-model="firstName" variant="filled"/>
                    <label for="firstName">First Name</label>
                  </FloatLabel>
                </div>

                <div class="col flex align-items-center justify-content-center">
                  <!-- Last Name Field -->
                  <FloatLabel variant="in">
                    <InputText id="lastName" v-model="lastName" variant="filled" />
                    <label for="lastName">Last Name</label>
                  </FloatLabel>
                </div>

                <div class="col flex align-items-center justify-content-center">
                  <!-- Email Field -->
                  <FloatLabel variant="in">
                    <InputText id="email" v-model="email" variant="filled" />
                    <label for="email">Email</label>
                  </FloatLabel>
                </div>
                
                <div class="col flex align-items-center justify-content-center">
                  <!-- GitHub Field -->
                  <FloatLabel variant="in">
                    <InputText id="GitHub" v-model="GitHub" variant="filled" />
                    <label for="GitHub">GitHub</label>
                  </FloatLabel>
                </div>

                <div class="col flex align-items-center justify-content-center">
                  <!-- WID Field -->
                  <FloatLabel variant="in">
                    <InputText id="wid" v-model="wid" variant="filled" disabled />
                    <label for="wid">WID</label>
                  </FloatLabel>
                </div>

                <div class="col flex align-items-center justify-content-center ">
                  <!-- Submit Button -->
                  <button type="button" class=" align-items-stretch" :class="style.btnUpdate" @click="ToCodeLater">Submit</button>
                </div>

              </div>
              <div class="col-6 col-offset-3 xl:col-6 xl:col-offset-0">
                <div style="background-color: gray; border: 3px solid #757575;  border-radius: 10px;" class="col border-round-sm">
                  <div class="col-12 sml">
                    <img :src="discordText" alt="discord text" style = "margin: 15px;" />
                    <br>
                    <h4 :class="style.text" style ="text-align: center; color:white">Click the button below to connect to the offical K-State Discord</h4>
                  </div>
                  <div class="col flex align-items-center justify-content-center">
                  <!-- Submit Button -->
                  <button type="button" :class="style.btnUpdate" @click="DiscordLater"><img :src="discordIcon" alt="discord Logo" width="35" Height="35" /></button>
                </div>

                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>

    <div class="col-12 p-0 m-0">
      <div :class="style.footer">
        <p>CS Applications - Contact webmaster@cs.ksu.edu for help</p>
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
import discordIcon from '../../img/Discord.svg'
import discordText from '../../img/DiscordText.svg'
export default {
  name: 'ProfilesForm',
  components: {
    InputText,
    FloatLabel,
  },
  methods: {
    ToCodeLater(event) {
      if (event) {
        alert(`Attempting to submit form with values:\nFirst Name: ${this.firstName}\nLast Name: ${this.lastName}\nEmail: ${this.email}\nGitHub: ${this.GitHub}`);
      }
    },
    DiscordLater(event) {
      if (event) {
        if(this.firstName === ''){
          alert(`Sending you to link with discord *space sound effects*`);
        }else{
          alert(`Sending ${this.firstName} to link with discord *space sound effects*`);
        }

      }
    }
  },
  setup() {
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const GitHub = ref('');
    
    return { firstName, lastName, email, GitHub, style, discordIcon, discordText };
  },
};
</script>
