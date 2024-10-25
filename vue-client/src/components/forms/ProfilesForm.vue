<template>
  <div :class="style.ProfilesForm">
    <div class="grid nested-grid">
      <div class="col-4 col-offset-4">
            <h3 :class="style.h3Style">Update your user profile:</h3>
      </div>
      <div class="col-12">
        <div :class="style.formContainer">
          
          <form @submit.prevent="submitForm" id="profileForm">
            <div class="grid flex align-items-stretch flex-wrap">
              <div class="col bg-white border-round-sm">
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
              <div class="col">
                <div style="background-color: gray; border: 3px solid #757575;  border-radius: 10px;" class="col border-round-sm">
                  <div class="col-12 sml">
                    <img :src="discordText" alt="discord text" style = "margin: 15px;" />
                    <br>
                    <h4 :class="style.text" style ="text-align: center; color:white">Click the button link below to connect to the offical K-State Discord</h4>
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
import discordIcon from '../../img/Discord.svg'
import discordText from '../../img/DiscordText.svg'
import { useUsersStore } from '@/stores/UserStore';
import { useTokenStore } from '@/stores/TokenStore';
import Logger from 'js-logger';

async function hydrateAndFindUser() {
  const usersStore = useUsersStore()
  const tokenStore = useTokenStore()
  await usersStore.hydrate();
  Logger.debug(tokenStore.id)
  const user = await usersStore.getUser(tokenStore.id)
  Logger.debug(user)
  return user
};

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
    const user = hydrateAndFindUser()

    const firstName = ref(user.first_name);
    const lastName = ref(user.last_name);
    const email = ref(user.email);
    const GitHub = ref('');
    
    return { firstName, lastName, email, GitHub, style, discordIcon, discordText };
  },
};
</script>
