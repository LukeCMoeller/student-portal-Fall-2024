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
          <!-- Editing roles -->
          <div class="flex justify-content-center" style="padding-top: 3rem;">
            <div class="border-round-sm flex flex-column align-items-center"
                style="background-color: #d1d1d1; border: 3px solid #512888; width: 40rem;">
                <div :class="styles['table']"> 
                  <DataTable :value="allUsers.data" removableSort paginator :rows="8" stripedRows>
                    <Column header="Users">
                      <template #body="{ data }">
                        {{ data.first_name + " " + data.last_name }}
                      </template>
                    </Column>
                    <Column header="Roles">
                      <template #body="{ data }">
                        <div class="flex gap-3 align-items-center">
                          <div class="flex align-items-center gap-1" v-for="role in ['api', 'reviewer', 'admin']" :key="role">
                            <Checkbox
                              v-model="data.roles"
                              :value="role"
                              @change="() => updateRole(data)"
                            />
                            <label>{{ role }} </label>
                          </div>
                        </div>
                      </template>
                    </Column>
                  </DataTable>
                </div>
            </div>
          </div> 
          <!-- Admin Controls -->
          <div class="flex justify-content-center" style="padding-top: 3rem;">
            <div class="border-round-sm flex flex-column align-items-center"
                style="background-color: gray; border: 3px solid #757575; height: 22rem; width: 40rem;">
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
                  :onclick = "updateDiscordUsers"
                />
                <label for="studentDiscord">Students:</label>
              </IftaLabel>
              
              <Button @click="RefreshStudent(selectedStudent)" class="btn-submit">
              Submit
              </Button>

              <h4 :class="styles['text']" class="text-white text-center mt-3">
                Select a .csv report from KSIS to import:
              </h4>
              <label for="reportImport" :class="styles['text']" class="text-white text-center mt-3">Select a file:</label>
              <input type="file" id="reportImport" name="reportImport" accept="text/csv"> 
              <Button @click="ParseEnrollmentReport" class="btn-submit">
              Import
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useAdminStore } from '@/stores/AdminStore.js';
import Papa from 'papaparse';

//primevue components
import Button from 'primevue/button';
import IftaLabel from 'primevue/iftalabel';
import Select from 'primevue/select';
import { useToast } from 'primevue/usetoast'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';
//styles
import styles from '@/components/styles/AdminPage.module.css';
import shared from '@/components/styles/Shared.module.css';

import discordText from '@/components/assets/DiscordText.png';


export default {
  name: 'Admin',
  components: { Button, IftaLabel, Select, DataTable, Column, Checkbox},
  setup() {
    const toast = useToast();
    const adminStore = useAdminStore();
    
    const allUsers = ref([]);
    const discordUsers = {};
    const studentOptions = ref([]);
    const fetchUsers = async() => {
      allUsers.value = await adminStore.getAllUsers();
    }
    onMounted(fetchUsers);
    const selectedStudent = ref("");
    

    const updateDiscordUsers = async() => {
    const users = allUsers.value.data;
    console.log(users);
      for(let i = 0; i < users.length; i++){
        const user = users[i];
        if(user.discord_id !== null){
          const fullName = `${user.first_name} ${user.last_name}`;
          discordUsers[fullName] = user.discord_id;
        }
      }
       studentOptions.value = Object.keys(discordUsers);
    }
    
    const RefreshDiscord = async () => {
      const booltest = await adminStore.refreshDiscord();
      if(booltest === true){
        toast.add({ severity: 'success', summary: 'Discord Updated', detail: 'All Students roles updated. ', life: 3000, });
      }else{
        toast.add({ severity: 'error', summary: 'Error', detail: 'Error on attempted action', life: 3000, });
      }
      
    };
    const updateRole = async (user) =>{
      //change the thing to match
      await adminStore.updateUserRoles(user.id, user.roles);
    }
    const RefreshStudent = async (studentID) => {
      const discordID = discordUsers[studentID];
      if(!discordID){
        toast.add({ severity: 'error', summary: 'Student Not Found', detail: 'Could not find Discord ID for ${studentID}.', life: 3000, });
      }

        const booltest = await adminStore.refreshStudent(discordID);
        if(booltest === true){
          toast.add({ severity: 'success', summary: 'Student sucessfully added', detail: 'Student ' + studentID + ' has updated discord roles.', life: 3000, });
        }else{
          toast.add({ severity: 'error', summary: 'Error', detail: 'Error on attempted action for ' + studentID, life: 3000, });
        }
        
      };

    const ParseEnrollmentReport = () => {
      const report = document.getElementById("reportImport").files[0]
      Papa.parse(report, {header: true, complete: ImportEnrollmentReport})
    }

    const ImportEnrollmentReport = async(results, file) => {
      console.log(results)
        const result = await adminStore.importEnrollmentReport(results);
        if (result) {
          toast.add({severity: 'success', summary: 'KSIS report has been imported', life: 3000})}
        else {
          toast.add({severity: 'error', summary: 'Error importing KSIS report', life: 3000}) }
    }

    return { styles, shared, discordText, selectedStudent, studentOptions, RefreshDiscord, RefreshStudent, ParseEnrollmentReport, updateDiscordUsers, allUsers, updateRole };
  }
};
</script>
