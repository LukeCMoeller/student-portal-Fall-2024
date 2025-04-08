<template>
  <div :class="shared['flex-centered']">
    <div :class="shared['content-container']">
      <div class="grid" style="width: 100%;">
        <div class="col-8 col-offset-2 xl:col-8 xl:col-offset-2">
          
          <!-- Header -->
          <div :class="shared['app-header']">
            <h1 :class="shared['h1-style']">Admin Control Panel</h1>
            <h4 :class="shared['h4-style']">Welcome aboard captain</h4>
          </div>
          <!-- Admin Controls -->
          <div class="col-10 col-offset-1 xl:col-6 xl:col-offset-3" style="padding-top: 3rem;">
            <div  :class="shared['flex-centered']" class="border-round-sm flex flex-column" 
                 style="background-color: gray; border: 3px solid #757575; height: 22rem; width: 80%;">
              
              <img :src="discordText" alt="discord text" class="m-3" style="height: 40px;" />
              
              <h4 :class="styles['text']" class="text-white text-center">
                Click the button below to refresh the Discord bot for a new semester
              </h4>
              <Button @click="RefreshDiscord" class="btn-submit" >
                Submit
              </Button>
              
              <h4 :class="styles['text']" class="text-white text-center mt-3">
                Select a student to refresh their specific account
              </h4>
              
              <IftaLabel variant="in" class="w-75">
                <Select 
                  id="studentDiscord" 
                  v-model="selectedStudent" 
                  :options="studentOptions" 
                  showClear 
                  :class="styles['input']" 
                />
                <label for="studentDiscord">Students:</label>
              </IftaLabel>
              
              <Button @click="RefreshStudent(selectedStudent)" class="btn-submit">
              Submit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useAdminStore } from '@/stores/AdminStore.js';

//primevue components
import Button from 'primevue/button';
import IftaLabel from 'primevue/iftalabel';
import Select from 'primevue/select';
import { useToast } from 'primevue/usetoast'
//styles
import styles from '@/components/styles/AdminPage.module.css';
import shared from '@/components/styles/Shared.module.css';

import discordText from '@/components/assets/DiscordText.png';


export default {
  name: 'Admin',
  components: { Button, IftaLabel, Select },
  setup() {
    const toast = useToast();
    const adminStore = useAdminStore();
    const selectedStudent = ref("");
    const studentOptions = ["Luke Moeller", "Josh Riddle","Struggle Student"];  
    const RefreshDiscord = async () => {
      const booltest = adminStore.refreshDiscord();
      if(booltest === true){
        toast.add({ severity: 'success', summary: 'Discord Updated', detail: 'All Students roles updated. ', life: 3000, });
      }else{
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error on attempted action', life: 3000, });
      }
      
    };

    const RefreshStudent = async (studentID) => {
      const booltest = adminStore.refreshStudent(studentID);
      if(booltest === true){
        toast.add({ severity: 'success', summary: 'Student sucessfully added', detail: 'Student ' + studentID + ' has updated discord roles.', life: 3000, });
      }else{
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error on attempted action for ' + studentID, life: 3000, });
      }
      
    };

    return { styles, shared, discordText, selectedStudent, studentOptions, RefreshDiscord, RefreshStudent };
  }
};
</script>
