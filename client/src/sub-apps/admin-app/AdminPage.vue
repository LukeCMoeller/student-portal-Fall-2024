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
              <Button @click="RefreshDiscord" buttonText="Submit" class="btn-submit" />
              
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
              
              <Button @click="RefreshStudent(selectedStudent)" buttonText="Submit" class="btn-submit" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useUsersStore } from '@/stores/AdminStore.js';
import Button from 'primevue/button';
import IftaLabel from 'primevue/iftalabel';
import styles from '@/components/styles/AdminPage.module.css';
import shared from '@/components/styles/Shared.module.css';
import discordText from '@/components/assets/DiscordText.png';

export default {
  name: 'Admin',
  components: { Button, IftaLabel },
  setup() {
    const adminStore = useUsersStore();
    const selectedStudent = ref("");
    const studentOptions = [
      { label: "Jerald", value: "jerald" },
      { label: "Peter", value: "peter" },
      { label: "TestValue", value: "testValue" }
    ];
    
    const RefreshDiscord = async () => {
      adminStore.refreshDiscord();
    };

    const RefreshStudent = async (studentID) => {
      adminStore.refreshStudent(studentID);
    };

    return { styles, shared, discordText, selectedStudent, studentOptions, RefreshDiscord, RefreshStudent };
  }
};
</script>
