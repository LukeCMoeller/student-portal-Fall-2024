<template>
  <div class="AdminForm">
    <!-- Dialogs go here -->
    
    <LoadingIndicator v-if="isLoading" />

    <div class="grid" v-else>
      <!-- Alert goes here-->

      <!-- Review Applications Header -->
      <div class="col-12">
          <h3 :class="styles.h3StyleTop">Review Applications</h3>
      </div>
        <div class="col-12">
          <h3 :class="styles.h3StyleBot">Total Applications: {{ applications.length }}</h3>
      </div>

      <!-- Action Buttons -->
      <div class="col-12" :class="styles.button-container">
          <Button label="Reset Sort" @click="resetSortConfig" />
          <div>
            <Button
              @click="handleDisable"
              type="button"
              id="disable_application"
              variant="danger"
              style="margin-right: 8px"
              :disabled="isNoApplicationsChecked"
            >
              Disable Application(s)
            </Button>
            <Button
              @click="handleDownloadSelected"
              type="button"
              id="download_selected"
              variant="success"
              style="margin-right: 8px"
              :disabled="isNoApplicationsChecked"
            >
              Download Selected
            </Button>
            <Button
              @click="handleEmailSelected"
              type="button"
              id="email_selected"
              variant="secondary"
              style="margin-right: 8px"
              :disabled="isNoApplicationsChecked"
            >
              Email Selected
            </Button>
          </div>
      </div>

      <!-- Applications Table -->
      <div class="col-12">
        <div :class="styles.custom-table-container">
            <DataTable :value="applications" stripedRows>
                <Column field="firstName" header="First Name" />
                <Column field="lastName" header="Last Name" />
                <Column field="eid" header="EID" />
                <Column field="email" header="Email" />
                <Column field="wid" header="WID" />
                <Column field="advisor" header="Advisor" />
                <Column field="semester" header="Semester" />
                <Column field="waiver" header="Waiver" />
                <Column field="status" header="Status" />
                <Column field="review" header="Review" />
                <Column field="edit" header="Edit" />
                <Column field="adminNotes" header="Admin Notes" />
                <Column field="dars" header="DARS Update" />
            </DataTable>
        </div>
      </div>

      <!-- Pagination goes here -->
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
import Dialog from 'primevue/dialog';
import styles from '../../styles/AdminForm.module.css'; 

export default {
    components: {
    Button,
    Dialog,
    DataTable,
    Column,
  },
  data() {
    return {
      // Define all reactive data properties here
      styles,
      showNotesModal: ref(false),
      showReviewModal: ref(false),
      currentNotes: ref(''),
      showApplicationModal: ref(false),
      isLoading: ref(false),
      showAlert: ref(false),
      alertStatus: ref('success'),
      statusMessage: ref(''),
      applications: ref([]),
      currentItems: ref([]),
      courses: ref([]),
      filters: ref({
        firstName: '',
        lastName: '',
        eid: '',
        email: '',
        advisor: 'All',
        semester: 'All',
        waiver: 'Both',
        status: 'All',
      }),
      checkedStates: ref({}),
      sortConfig: ref({ key: '', direction: 'ascending' }),
      currentPage: ref(1),
      itemsPerPage: ref(10),
      totalPages: ref(1),
      currentEId: ref(null),
      currentAppId: ref(null),
      currentReviewApp: ref(null),
      advisorOptions: ref([]),
      semesterOptions: ref([]),
      filteredApplications: ref([]),
    };
  },
  computed: {
    isNoApplicationsChecked() {
      return Object.values(this.checkedStates).every(isChecked => !isChecked);
    },
  },
  methods: {
    // Define all methods like handleCheckboxChange, handleSort, handleFilterChange, etc. here
    fetchCourses(wid) { 
      if (!WID){
        this.error("WID is undefined, cannot fetch courses.");
        console.error("WID is undefined, cannot fetch courses.");
        return;
      }
      try{ //below items commented out because causes program to crash. im assuming due to it not beign set up yet but it may just be wrong
          //const response = await fetch(`http://localhost:3002/api/courses?id=${wid}`);
          //const data = await response.json();
          //setCourses(data.courses);  
      } catch (error){
        console.error('Failed to fetch courses: ${error.message}');
        this.error('Failed to fetch courses: ${error.message}');
      }
    },
    saveNotes(appId, notes) { /* Save notes logic */ 
      isLoading.value = true;
        const sanitizedInput = sanitizeForServer(notes);
        fetch(`http://localhost:3002/api/saveNotes?appId=${appId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ notes: sanitizedInput })
        })
        .then(response => response.json())
        .then(data => {
            fetchApplications();
            statusMessage.value  = `Notes saved for wid: ${appId} successfully.`;
            salertStatus.value  = 'success';
            showAlert.value  = true;
        })
        .catch(error => {
            console.error(error);
            statusMessage.value  = `Failed to save notes for wid: ${appId}!`;
            alertStatus.value  = 'danger';
            showAlert.value  = true;
        })
        .finally(() => {
            isLoading.value = false;
        }); 
    },
    closeReviewModal() { /* Close review modal logic */
      showReviewModal.value = false;
        refreshApplications();
        currentReviewApp.value = null;
     },
    refreshApplications() { /* Refresh applications logic */ 
      fetchApplications();  
    },
    handleCheckAllChange(event) { /* Handle check all checkbox change */ 
      const isChecked = event.target.checked;
        const newCheckedStates = applications.reduce((acc, app) => {
            acc[app.wid] = isChecked;  
            return acc;
        }, {});
        checkedStates.value = newCheckedStates;
    },
    handleSort(key) { /* Handle sorting */ 
      let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        sortConfig.value = { key, direction };
    },
    handleFilterChange(e) { /* Handle filter change */ 
      const { name, value } = e.target;
      currentPage.value = 1;
      filters.value = (prevFilters) => ({
        ...prevFilters,
        [name]: value,
      });  
    },
    handleCheckboxChange(appId, isChecked) { /* Handle individual checkbox change */ 
      checkedStates.value = prevStates => ({ ...prevStates, [appId]: isChecked });
    },
    handlePageChange(page) { /* Handle page change */ 
      currentPage.value = pageNumber;
    },
    handleChangeItemsPerPage() { /* Handle change of items per page */ },
    handleReview(wid) { /* Handle review action */ 
      const application = applications.find(app => app.wid === appId);
        currentReviewApp.value = application;
        fetchCourses(appId);
        showReviewModal.value = true;
    },
    handleEdit(eid) { 
      currentEId.value = Eid;
      showApplicationModal.value = true; 
    },
    closeApplicationModal() {
        showApplicationModal.value = false;
        currentAppId = null; 
    },
    handleViewNotes(wid, notes) { /* Handle view notes action */ 
      currentNotes.value = notes;
        console.log(notes);
        currentAppId.value = appId;
        showNotesModal.value = true;
    },
    formatDate(dateString) { /* Format date logic */ 
      const date = new Date(dateString);
        const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const timeOptions = { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
        const formattedDate = date.toLocaleDateString('en-US', dateOptions);
        const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
        return `${formattedDate} at ${formattedTime}`;
    },
    handleDisable() { /* Handle disable action */ 
      const disabledIds = Object.entries(checkedStates).filter(([id, isChecked]) => isChecked).map(([id]) => id); 
        this.isLoading(true); // Start loading
        fetch('http://localhost:3002/api/disableApplications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: disabledIds })
        })
        .then(response => response.json())
        .then(data => {
            if (data.disabledIds && data.disabledIds.length > 0) {
                statusMessage.value = `The following applications have been disabled successfully, wid(s): ${data.disabledIds.join(', ')}`;  
                alertStatus.value = 'success';
                showAlert.value = true;
                fetchApplications();
            }
            
        })
        .catch((error) => {
            console.error('Error:', error);
            statusMessage.value = 'Failed to disable applications.';
            alertstatus.value = 'danger';
            showAlert.value = true;
        })
        .finally(() => {
          this.isLoading(false);  
        });
    },
    handleDownloadSelected(applications, checkedStates) { /* Handle download selected applications */ 
      // Filter applications to include only those that are checked
      const filteredApps = applications.filter(app => checkedStates[app.wid]);
    // exclude 'Review' and 'Edit' columns
    const data = filteredApps.map(app => ({
        "First Name": app.first_name,
        "Last Name": app.last_name,
        "EID": app.eid,
        "Email": app.email,
        "WID": app.wid,
        "Advisor": app.advisor,
        "Semester": app.semester,
        "Waiver": app.waiver ? "Yes" : "No",
        "Status": app.status,
        "Admin Notes": app.notes,
        "DARS Update": formatDate(app.d_update)  
    }));

    // Convert data to CSV
    const csv = unparse(data);

    // Create a blob link to download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'download.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    },
    handleEmailSelected() { /* Handle email selected applications */ 
      const emailIds = Object.entries(checkedStates).filter(([id, isChecked]) => isChecked).map(([id]) => id);
    
        isLoading.value = true; // Start loading
        fetch('http://localhost:3002/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ids: emailIds })
        })
        .then(response => response.json())
        .then(data => {
            statusMessage.value  ='Emails have been sent successfully.';
            AlertStatus.value  = 'success';
            showAlert.value  = true;
        })
        .catch((error) => {
            console.error('Error sending email:', error);
            statusMessage.value  = `Failed to send emails: ${error.message}`;
            AlertStatus.value  = 'danger';
            showAlert.value  = true;
        })
        .finally(() => {
            isLoading.value = false;  
        });
    },
  },
};
</script>