<template>
    <div :class="shared['flex-centered']">
      <div :class="shared['content-container']">
        <div class="grid" style="width: 100%;">
          <div class="col-8 col-offset-2 xl:col-8 xl:col-offset-2">
            
            <!-- Header -->
            <div :class="shared['app-header']">
              <h1 :class="shared['h1-style']">Discord Control Panel</h1>
              <h4 :class="shared['h4-style']">Welcome aboard captain</h4>
            </div>
            <!-- Discord Controls -->
          </div>
          <div class="col-6 col-offset-3">
            <div class="pt-2">
              <Card class="max-w-2xl shadow-4 surface-100 border-round-xl p-5 bg-white">
                <template #title>
                  <img :src="discordText" alt="discord text" 
                      style="margin: 15px; height: 80px; margin-left: auto; margin-right: auto; display: block; text-align: center; background-color: gray; padding: 10px; border-radius: 8px"/>
                </template>

                <template #content>
                  <!-- Refresh Discord Bot -->
                  <div class="mb-4">
                    <p class="mb-3 text-md text-color-secondary">
                      Click to manually refresh all student Discord roles for a new semester:
                    </p>
                    <Button label="Full Refresh" icon="pi pi-sync" @click="RefreshDiscord" class="w-full sm:w-auto" />
                  </div>

                  <Divider />

                  <!-- Refresh Individual Student -->
                  <div class="mb-4">
                    <p class="mb-3 text-md text-color-secondary">
                      Select a student to refresh their specific Discord roles:
                    </p>
                    <div class="flex flex-column sm:flex-row align-items-center gap-3 mb-3">
                      <Dropdown 
                        id="studentDiscord"
                        v-model="selectedStudent"
                        :options="studentOptions"
                        placeholder="Select Student"
                        showClear 
                        class="w-full sm:w-18rem"
                        @click="updateDiscordUsers"
                      />
                      <Button label="Refresh Roles" icon="pi pi-refresh" @click="RefreshStudent(selectedStudent)" :disabled="!selectedStudent"/>
                    </div>
                  </div>

                  <Divider />

                  <!-- Import Reports -->
                  <div class="mb-4">
                    <p class="mb-2 text-md text-color-secondary">Select a .csv report from KSIS to import:</p>

                    <div class="flex flex-column gap-3">
                      <!-- Student File Input -->
                      <div class="w-full flex flex-column gap-2">
                        <label class="text-sm">Student File:</label>
                        <InputText 
                          id="studentReportImport" 
                          type="file" 
                          accept=".csv" 
                          style="background-color: #d1d1d1; width:20rem;"/>
                        <Button 
                          label="Import Student Report" 
                          icon="pi pi-upload" 
                          style="width:20rem;"
                          @click="ParseStudentReport"/>
                      </div>

                      <!-- Enrollment File Input -->
                      <div class="w-full flex flex-column gap-2">
                        <label class="text-sm">Enrollment File:</label>
                        <InputText 
                          id="enrollmentReportImport" 
                          type="file" 
                          accept=".csv" 
                          style="background-color: #d1d1d1; width:20rem;" />
                        <Button 
                          label="Import Enrollment Report" 
                          icon="pi pi-upload" 
                          style="width:20rem;"
                          @click="ParseEnrollmentReport" />
                      </div>
                    </div>
                  </div>
                </template>
              </Card>
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
  import Card from 'primevue/card';
  import Divider from 'primevue/divider';
  import Dropdown from 'primevue/dropdown';
  import InputText from 'primevue/inputtext';
  
  //styles
  import styles from '@/components/styles/AdminPage.module.css';
  import shared from '@/components/styles/Shared.module.css';
  import discordText from '@/components/assets/DiscordText.png';
  
  
  export default {
    name: 'DiscordPage',
    components: { Button, InputText, Divider, Dropdown, Card, IftaLabel, Select, DataTable, Column, Checkbox},
    setup() {
      const toast = useToast();
      const adminStore = useAdminStore();
      
      const allUsers = ref([]);
      const discordUsers = {};
      const studentOptions = ref([]);

      // Calls the function before anything else happens to properly get all users
      const fetchUsers = async() => {
        allUsers.value = await adminStore.getAllUsers(); // Gets all users from the server
      }
      onMounted(fetchUsers);
      const selectedStudent = ref("");
      
      // Called upon pressing refresh button. Creates the list of discordUsers to be displayed
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
      // Called upon pressing the refresh button. resets all discord user roles. 
      const RefreshDiscord = async () => { 
        const result = await adminStore.refreshDiscord();
        if(result === true){
          toast.add({ severity: 'success', summary: 'Discord Updated', detail: 'All Students roles updated. ', life: 3000, });
        }else{
          toast.add({ severity: 'error', summary: 'Error', detail: 'Error on attempted action', life: 3000, });
        }
      };
      
      // Same as RefreshDiscord but for one student.
      const RefreshStudent = async (studentID) => {
        const discordID = discordUsers[studentID];
        if(!discordID){
          toast.add({ severity: 'error', summary: 'Student Not Found', detail: 'Could not find Discord ID for ${studentID}.', life: 3000, });
        }
          const result = await adminStore.refreshStudent(discordID);
          if(result === true){
            toast.add({ severity: 'success', summary: 'Student sucessfully added', detail: 'Student ' + studentID + ' has updated discord roles.', life: 3000, });
          }else{
            toast.add({ severity: 'error', summary: 'Error', detail: 'Error on attempted action for ' + studentID, life: 3000, });
          }
          
        };
  
      const ParseEnrollmentReport = () => {
        try{
          const report = document.getElementById("enrollmentReportImport").files[0]
          Papa.parse(report, {header: true, complete: ImportEnrollmentReport})
        }
        catch(error){
          toast.add({ severity: 'error', summary: 'File not selected', detail: 'Please select a file.', life: 3000, });
        }
      }
  
      const ImportEnrollmentReport = async(results, file) => {
          const result = await adminStore.importEnrollmentReport(results);
          if (result) {
            toast.add({severity: 'success', summary: 'KSIS enrollment report has been imported', life: 3000})}
          else {
            toast.add({severity: 'error', summary: 'Error importing KSIS report', life: 3000}) }
      }
  
      const ParseStudentReport = () => {
        try{
          const report = document.getElementById("studentReportImport").files[0]
          Papa.parse(report, {header: true, complete: ImportStudentReport})
        }catch(error){
          toast.add({ severity: 'error', summary: 'File not selected', detail: 'Please select a file.', life: 3000, });
        }
      }
  
      const ImportStudentReport = async(results, file) => {
          const result = await adminStore.importStudentReport(results);
          if (result) {
            toast.add({severity: 'success', summary: 'KSIS student report has been imported', life: 3000})}
          else {
            toast.add({severity: 'error', summary: 'Error importing KSIS report', life: 3000}) }
      }
  
      return { styles, shared, discordText, selectedStudent, studentOptions, RefreshDiscord, RefreshStudent, ParseEnrollmentReport, ParseStudentReport, updateDiscordUsers, allUsers };
    }
  };
  </script>
  