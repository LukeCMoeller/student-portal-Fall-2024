<template>
    <div :class="styles.ApplicationForm">
      <div class="grid nested-grid">
        <div class="col-12">
            <div :class="styles.appHeader">
                <h1 :class="styles.h1Style">Computer Science Apps</h1>
                <h2 :class="styles.h2Style">Professional Program Application</h2>
            </div>
        </div>
        <div class="col">
            <form @submit.prevent="handleSubmit" id="applyForm">
                <div class="grid">
                    <div class="col-4">
                        <FloatLabel variant="in">
                        <InputText id="studentName" v-model="studentData.name" variant="filled" style="width: 20vw;"/>
                        <label for="studentName">Name:</label>
                        </FloatLabel>
                    </div>
                    <div class="col-4">
                        <FloatLabel variant="in">
                        <InputText id="wid" v-model="studentData.wid" variant="filled" style="width: 20vw;"/>
                        <label for="wid">WID:</label>
                        </FloatLabel>
                    </div>
                    <div class="col-4">
                        <FloatLabel variant="in">
                        <Select 
                        id="advisor" 
                        v-model="selectedAdvisor" 
                        :options="advisorOptions" 
                        showClear
                        style="width: 20vw;" 
                        />
                        <label for="advisor">Advisor:</label>
                        </FloatLabel>
                    </div>
                    
                    <div class="col-12">
                        <div>
                        <div :class="styles['custom-message-1']">
                            <p>To be accepted to the Computer Science Professional Program, you must complete the following Pre-Professional Courses <em>with a grade of C or better</em> and <em>with a 2.3 cumulative</em> GPA <strong>within these courses</strong>.</p>
                            <p>Any courses you are currently taking can be marked as <em>In Progress</em>. Any courses that you do not plan on taking need to be marked <em>Waiver Requested</em> and the reasons you are asking for the waiver must be explained below.</p>
                        </div>
                        </div>
                    </div>

                    <div class="col-12">
                        <div :class="styles['custom-table-container']"> 
                            <DataTable :value="courses" stripedRows class="styles.customTable">
                                <Column field="class_descr" header="Course" />
                                <Column field="course_id" header="Course ID" />
                                <Column field="status" header="Status" />
                                <Column field="grade" header="Grade" />
                            </DataTable>
                    </div>
                    </div>
                    
                    <div class="col-6">
                        <div :class="styles['custom-message-1']">
                        <p>Please use this space to add any comments that should be made regarding these classes.</p>
                        <p>If you requested a waiver for any of these classes, please explain in detail the reasons you are requesting a waiver for meeting all of the requirements for entrance into the Computer Science Professional Program. You may also be required to meet with the curriculum committee to evaluate the waiver request.</p>
                        </div>
                    </div>
                    <div class="col-6">
                        <Textarea 
                        placeholder="Add comments or additional information here" 
                        v-model="additionalInfo" 
                        rows="7" cols="75"
                        autoResize
                        />
                    </div>
                    <div class="col-12">
                        <div :class="styles['buttonContainer']">
                        <button type="button" :class="styles.btnSubmit">
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            </form>
        </div>
    </div>
    </div>
  </template>
  
  <script>
  import { shallowRef, ref } from 'vue';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import Alert from 'primevue/message';
  import FloatLabel from 'primevue/floatlabel';
  import Select from 'primevue/select';
  import Textarea from 'primevue/textarea';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import styles from '../../styles/ApplicationForm.module.css'; 

  
  export default {
    name: 'ApplicationForm',
    components: {
      InputText,
      Textarea,
      Select,
      Button,
      Alert,
      FloatLabel,
      DataTable,
      Column
    },
    setup() {
      const studentData = ref({wid: 1234, name: "Test Student"});
      const courses = shallowRef([
        {class_descr: "Required", course_id: "CIS642", status: "Passed", grade: "A"},
        {class_descr: "Required", course_id: "CIS505", status: "Passed", grade: "B"},
        {class_descr: "Not Required", course_id: "CIS625", status: "Failed", grade: "D"},
      ]);
      const loading = shallowRef(false);
      const statusMessage = shallowRef('');
      const alertStatus = shallowRef('info');
      const showAlert = shallowRef(false);
      const selectedAdvisor = shallowRef('');
      const courseUpdates = shallowRef({});
      const submitting = shallowRef(false);
      const additionalInfo = shallowRef('');
      const hardcodedGPA = "3.5";
  
        const statusOptions = [
        { value: "Complete", label: "Complete" },
        { value: "In-Progress", label: "In Progress" },
        { value: "transferred", label: "Transferred" },
        { value: "retaking", label: "Retaking" },
        { value: "waiver-requested", label: "Waiver Requested" },
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
            "Advisor1", "Advisor2"
        ];

        return {styles, studentData, courses, loading, statusMessage, alertStatus, showAlert, selectedAdvisor, courseUpdates, submitting, additionalInfo, hardcodedGPA, advisorOptions}
    }
}
  
</script>