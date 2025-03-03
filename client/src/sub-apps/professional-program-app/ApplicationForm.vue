<template>
    <div>
      <div class="grid nested-grid">
        <div class="col-10 col-offset-1 xl:col-6 xl:col-offset-3">
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
                        <InputText id="studentName" v-model="studentData.name" variant="filled" :class="styles['input']" />
                        <label for="studentName">Name:</label>
                        </IftaLabel>
                    </div>

                    <!--WID field-->
                    <div class="col-10 col-offset-1">
                        <IftaLabel variant="in">
                        <InputText id="wid" v-model="studentData.wid" variant="filled" :class="styles['input']" />
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
                            <DataTable :value="courses" stripedRows id="appTable">
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
                                You may also be required to meet with the curriculum committee to evaluate the waiver request.</p> 
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

  //CSS
  import styles from '../../components/styles/ApplicationForm.module.css'; 
  import shared from '../../components/styles/Shared.module.css';

  //Stores
  import {useApplicationStore} from '@/stores/ApplicationStore.js'
  import {useProfileStore} from '@/stores/ProfileStore.js'
  import {storeToRefs} from 'pinia'
  
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

      const {application, course_grades} = storeToRefs(applicationStore)
      const {user} = storeToRefs(profileStore)

      const studentData = ref({wid: user.wid, name: user.first_name + " " + user.last_name});
      const courses = ref([
        {class_descr: "CIS 115", status: "In-Progress", waiver: false, grade: course_grades.cis115},
        {class_descr: "CIS 116", status: "In-Progress", waiver: false, grade: course_grades.cis116},
        {class_descr: "CIS 200", status: "In-Progress", waiver: false, grade: course_grades.cis200},
        {class_descr: "CIS 300", status: "In-Progress", waiver: false, grade: course_grades.cis300},
        {class_descr: "CIS 301", status: "In-Progress", waiver: false, grade: course_grades.cis301},
        {class_descr: "ECE 241", status: "In-Progress", waiver: false, grade: course_grades.ece241},
        {class_descr: "MATH 200", status: "In-Progress", waiver: false, grade: course_grades.math200},
        {class_descr: "MATH 221", status: "In-Progress", waiver: false, grade: course_grades.math221},
      ]);
      const loading = shallowRef(false);
      const statusMessage = shallowRef('');
      const alertStatus = shallowRef('info');
      const showAlert = shallowRef(false);
      const selectedAdvisor = ref("");
      const courseUpdates = shallowRef({});
      const submitting = shallowRef(false);
      const additionalInfo = shallowRef('');
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

        const SubmitApplication = () => {
            if(!selectedAdvisor.value || selectedAdvisor.value.trim() === ""){
                alert('Please select an advisor.')
                return;
            }
            alert(`Form submitted!\nAdvisor: ${selectedAdvisor.value}`);
        };

        return {styles, shared, studentData, courses, SubmitApplication, loading, statusMessage, alertStatus, showAlert, selectedAdvisor, courseUpdates, submitting, additionalInfo, hardcodedGPA, advisorOptions, user, application, course_grades}
    }
}

</script>