<template>
    <!--Entry point for the Applications Page-->
    <div>
        <AdminForm v-if="IsAdminMode"/>
        <ApplicationForm v-else />
    </div>
</template>

<script>
//CSS
import ApplicationForm from './ApplicationForm.vue';
import AdminForm from './AdminForm.vue';
import {mapState} from 'pinia'
import {useAdminStore} from '../../stores/AdminStore.js'

//Components
import { mapGetters } from 'vuex';

export default {
  name: 'ApplicationsPage',
  components: {
    ApplicationForm,
    AdminForm
  },
  computed: {
    ...mapState(useAdminStore, ['IsAdminMode']), 
  },
};
</script>