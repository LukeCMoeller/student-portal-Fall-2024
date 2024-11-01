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
              <div class="col-8 col-offset-2 xl:col-4 xl:col-offset-1 bg-white border-round-sm">
                <div class="col flex align-items-center justify-content-center">
                  <!-- First Name Field -->
                  <FloatLabel variant="in">
                    <InputText id="firstName" v-model="user.first_name" variant="filled"/>
                    <label for="firstName">First Name</label>
                  </FloatLabel>
                </div>

                <div class="col flex align-items-center justify-content-center">
                  <!-- Last Name Field -->
                  <FloatLabel variant="in">
                    <InputText id="lastName" v-model="user.last_name" variant="filled" />
                    <label for="lastName">Last Name</label>
                  </FloatLabel>
                </div>

                <div class="col flex align-items-center justify-content-center">
                  <!-- Email Field -->
                  <FloatLabel variant="in">
                    <InputText id="email" v-model="user.email" variant="filled" disabled />
                    <label for="email">Email</label>
                  </FloatLabel>
                </div>

                <div class="col flex align-items-center justify-content-center">
                  <!-- WID Field -->
                  <FloatLabel variant="in">
                    <InputText id="wid" v-model="user.wid" variant="filled" disabled />
                    <label for="wid">WID</label>
                  </FloatLabel>
                </div>

                <div class="col flex align-items-center justify-content-center">
                  <!-- Submit Button -->
                  <button type="button" class=" align-items-stretch" :class="style.btnUpdate" @click="save" :loading="loading">Save</button>
                </div>
              </div>

              <div class="col-8 col-offset-2 xl:col-4 xl:col-offset-2 flex flex-column align-items-center">
                <div class="col-12">
                  <div style="background-color: gray; border: 3px solid #757575; border-radius: 10px;" class="col border-round-sm">
                    <div class="col-12 sml">
                      <img :src="discordText" alt="discord text" style="margin: 15px;" />
                      <h4 :class="style.text" style="text-align: center; color:white">Click the button below to connect to the official K-State Discord</h4>
                    </div>
                    <div class="col flex align-items-center justify-content-center">
                      <button type="button" :class="style.btnUpdate" @click="DiscordLater">
                        <img :src="discordIcon" alt="discord Logo" width="25" height="25" />
                      </button>
                    </div>
                  </div>
                </div>

                <div class="col-12" style="margin-top: 20px;">
                  <div style="background-color: gray; border: 3px solid #757575; border-radius: 10px;" class="col border-round-sm">
                    <div class="col-12 sml">
                      <img :src="githubText" alt="github text" width="150" height="50" style="margin: 15px;" />
                      <h4 :class="style.text" style="text-align: center; color:white">Click the button below to link your GitHub account.</h4>
                    </div>
                    <div class="col flex align-items-center justify-content-center">
                      <button type="button" :class="style.btnUpdate"  @click="GithubLater">
                        <img :src="githubIcon" alt="github icon" width="25" height="25" />
                      </button>
                    </div>
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
import { useProfileStore } from '@/stores/ProfileStore';
import { storeToRefs } from 'pinia'
import Logger from 'js-logger';
import { useToast } from 'primevue/usetoast'
import TextField from '@/components/common/TextField.vue'

export default {
  name: 'ProfilesForm',
  components: {
    InputText,
    FloatLabel,
  },
  methods: {
    SaveProfile(event) {
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
    }, GithubLater(event) {
      if (event) {
        if(this.firstName === ''){
          alert(`Sending you to link with Github *super space sound effects*`);
        }else{
          alert(`Sending ${this.firstName} to link with Github *super space sound effects*`);
        }

      }
    }
  },
  setup() {
    // Stores
    const profileStore = useProfileStore()
    profileStore.hydrate()
    // Setup Stores
    const { user } = storeToRefs(profileStore)
    const toast = useToast()

    Logger.debug(user)

    //Save Button Code
    const errors = ref({})
    const message = ref('')
    const loading = ref(false)

    const save = async () => {
    loading.value = true
    errors.value = {}
    message.value = ''
    try {
      await profileStore.update()
      toast.add({ severity: 'success', summary: 'Success', detail: 'Profile Updated!', life: 3000 })
    } catch (error) {
      if (error.response.data.data) {
        errors.value = error.response.data.data
        message.value = 'The server rejected this submission. Please correct errors listed below'
      } else {
        message.value =
          'The server rejected this submission due to an SQL Error. Refresh and try again'
        }
      }
    loading.value = false
    }
    
    return { user, style, discordIcon, discordText, errors, message, loading, save};
  },
};
</script>
