<template>
    <div :class="shared['flex-centered']">
        <div :class="shared['content-container']">
      <div class="grid nested-grid" style="width:100%;">
        <div class="col-8 col-offset-2 xl:col-8 xl:col-offset-2">
            <!--Header-->
            <div :class="shared['app-header']">
                <h1 :class="shared['h1-style']">Professional Program Application</h1>
                <h4 :class="shared['h4-style']">Application For Entry Into the CS Professional Program</h4>
            </div>
        </div>
        <!--Form-->
        <div class="col-10 col-offset-1 xl:col-6 xl:col-offset-3">
            <form @submit.prevent="handleSubmit" id="applyForm" :class="styles['doc']">
                <div class="grid" style="padding-top: 3rem">

                    <!--Name field-->
                    <div class="col-10 col-offset-1">
                        <IftaLabel variant="in">
                        <InputText id="studentName" v-model="full_name" variant="filled" :class="styles['input']" readonly/>
                        <label for="studentName">Name:</label>
                        </IftaLabel>
                    </div>

                    <!--WID field-->
                    <div class="col-10 col-offset-1">
                        <IftaLabel variant="in">
                        <InputText id="wid" v-model="user.wid" variant="filled" :class="styles['input']" readonly/>
                        <label for="wid">WID:</label>
                        </IftaLabel>
                    </div>

                    <!--Advisor drop down-->
                    <div class="col-10 col-offset-1">
                        <IftaLabel variant="in">
                        <Select 
                        id="advisor" 
                        v-model="selectedAdvisor" 
                        :options="advisorOptions" 
                        showClear
                        :class="styles['input']"
                        />
                        <label for="advisor">Advisor:</label>
                        </IftaLabel>
                    </div>
                    
                    <!--Message-->
                    <div class="col-10 col-offset-1">
                        <div :class="styles['custom-message']">
                            <p>To be accepted to the Computer Science Professional Program, you must complete the following Pre-Professional Courses <em>with a grade of C or better</em> and <em>with a 2.3 cumulative</em> GPA <strong>within these courses</strong>.</p>
                            <p>Any courses you are currently taking can be marked as <em>In Progress</em>. Any courses that you do not plan on taking need to be marked <em>Waiver Requested</em> and the reasons you are asking for the waiver must be explained below.</p>
                        </div>
                    </div>

                    <!--Course table-->
                    <div class="col-12 col-offset-0 xl:col-10 xl:col-offset-1">
                        <div :class="styles['table']"> 
                            <DataTable :value="application_table" stripedRows id="appTable">
                                <Column field="class_descr" header="Course" />
                                <Column field="status" header="Status" />
                                <Column header="Waiver">
                                    <template #body="{ data }">
                                        <Checkbox v-model="data.waiver" binary/>
                                    </template>
                                </Column>
                                <Column field="grade" header="Grade" />
                            </DataTable>
                    </div>
                    </div>
                    
                    <!--Message-->
                    <div class="col-10 col-offset-1">
                        <div :class="styles['custom-message']">
                            <p>Please use this space to add any comments that should be made regarding these classes.</p>
                            <p>If you requested a waiver for any of these classes, please explain in detail the reasons you are requesting a 
                                waiver for meeting all of the requirements for entrance into the Computer Science Professional Program. 
                                <br>You may also be required to meet with the curriculum committee to evaluate the waiver request.</p> 
                        </div>
                    </div>

                    <!--Comments text area-->
                    <div class="col-10 col-offset-1">
                        <Textarea 
                        placeholder="Add comments or additional information here" 
                        v-model="additionalInfo" 
                        rows="7" cols="75"
                        autoResize
                        id="commentBox"
                        style="width:100%"
                        />
                    </div>

                    <!--Submit button-->
                    <div class="col-12">
                        <div :class="shared['flex-centered']" >
                        <Button id="submitBtn" type="button" :class="styles['btn-submit']" @click="SubmitApplication">
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
            </form>
        </div>
    </div>
    <div class="col-12 p-0 m-0">
        <!--Footer-->
        <div :class="styles['footer']">
            <p>CS Applications - Contact webmaster@cs.ksu.edu for help</p>
        </div>
        </div>
    </div>
    </div>
  </template>
  
  <script>

  //Components
  import { shallowRef, ref } from 'vue';

  //Primevue components
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import Alert from 'primevue/message';
  import IftaLabel from 'primevue/iftalabel';
  import Select from 'primevue/select';
  import Textarea from 'primevue/textarea';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import Checkbox from 'primevue/checkbox';
  import { useToast } from 'primevue/usetoast'

  //CSS
  import styles from '../../components/styles/ApplicationForm.module.css'; 
  import shared from '../../components/styles/Shared.module.css';

  //Stores
  import {useApplicationStore} from '@/stores/ApplicationStore.js'
  import {useProfileStore} from '@/stores/ProfileStore.js'
  import {storeToRefs} from 'pinia'

  //External Modules
  
  
  export default {
    name: 'ApplicationForm',
    components: {
      InputText,
      Textarea,
      Select,
      Button,
      Alert,
      IftaLabel,
      Checkbox,
      DataTable,
      Column
    },
    setup() {
      //Store setup
      const applicationStore = useApplicationStore()
      const profileStore = useProfileStore()
      if (process.env.NODE_ENV !== 'test') {
        applicationStore.hydrate()
        profileStore.hydrate()
      }
      const {application_table} = storeToRefs(applicationStore)
      const {user, full_name} = storeToRefs(profileStore)

      const toast = useToast()
      const loading = shallowRef(false);
      const statusMessage = shallowRef('');
      const alertStatus = shallowRef('info');
      const showAlert = shallowRef(false);
      const selectedAdvisor = ref("");
      const courseUpdates = shallowRef({});
      const submitting = shallowRef(false);
      //const additionalInfo = application.notes !== "" ? application.notes : shallowRef('');
      const additionalInfo = "";
      const hardcodedGPA = "3.5";
  
        const statusOptions = [
        { value: "Complete", label: "Complete" },
        { value: "In-Progress", label: "In Progress" },
        { value: "Unsubmitted", label: "Unsubmitted" }
      ];
  
        const gradeOptions = [
        { value: "n/a", label: "N/A" },
        { value: "A", label: "A" },
        { value: "B", label: "B" },
        { value: "C", label: "C" },
        { value: "D", label: "D" },
        { value: "F", label: "F"}
        ];
    
        const advisorOptions = [
            "David Invergo", "Sheryl Cornell"
        ];

        const errors = ref({})
        const message = ref('')

        const SubmitApplication = async () => {
            //Convert these alerts to Toast, probably, be consistent with that
            console.log(application_table)
            /*if(!selectedAdvisor.value || selectedAdvisor.value.trim() === ""){
                alert('Please select an advisor.')
                return;
            } else {
                loading.value = true
                errors.value = {}
                message.value = ''
                try {
                    await applicationStore.submit()
                    toast.add({ severity: 'success', summary: 'Success', detail: 'Application Submitted', life: 3000 })
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
            }*/
        };

        return {styles, shared, SubmitApplication, loading, statusMessage, alertStatus, showAlert, selectedAdvisor, courseUpdates, submitting, additionalInfo, hardcodedGPA, advisorOptions, user, application_table, full_name}
    }
}

</script>