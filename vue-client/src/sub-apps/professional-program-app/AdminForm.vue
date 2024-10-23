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
      showNotesModal: false,
      showReviewModal: false,
      showApplicationModal: false,
      isLoading: false,
      showAlert: false,
      alertStatus: 'success',
      statusMessage: '',
      applications: [],
      currentItems: [],
      filters: {
        firstName: '',
        lastName: '',
        eid: '',
        email: '',
        advisor: 'All',
        semester: 'All',
        waiver: 'Both',
        status: 'All',
      },
      checkedStates: {},
      sortConfig: { key: '', direction: 'ascending' },
      currentPage: 1,
      itemsPerPage: 10,
      totalPages: 1,
      currentEId: null,
      currentAppId: null,
      currentReviewApp: null,
      advisorOptions: [],
      semesterOptions: [],
      filteredApplications: [],
    };
  },
  computed: {
    isNoApplicationsChecked() {
      return Object.values(this.checkedStates).every(isChecked => !isChecked);
    },
  },
  methods: {
    // Define all methods like handleCheckboxChange, handleSort, handleFilterChange, etc. here
    saveNotes(appId, notes) { /* Save notes logic */ },
    closeReviewModal() { /* Close review modal logic */ },
    refreshApplications() { /* Refresh applications logic */ },
    handleCheckAllChange() { /* Handle check all checkbox change */ },
    handleSort(key) { /* Handle sorting */ },
    handleFilterChange() { /* Handle filter change */ },
    handleCheckboxChange(wid, isChecked) { /* Handle individual checkbox change */ },
    handlePageChange(page) { /* Handle page change */ },
    handleChangeItemsPerPage() { /* Handle change of items per page */ },
    handleReview(wid) { /* Handle review action */ },
    handleEdit(eid) { /* Handle edit action */ },
    handleViewNotes(wid, notes) { /* Handle view notes action */ },
    formatDate(date) { /* Format date logic */ },
    resetSortConfig() { this.sortConfig = { key: null, direction: 'ascending' }; },
    handleDisable() { /* Handle disable action */ },
    handleDownloadSelected() { /* Handle download selected applications */ },
    handleEmailSelected() { /* Handle email selected applications */ },
  },
};
</script>