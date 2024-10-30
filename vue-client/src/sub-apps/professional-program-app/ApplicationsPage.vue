<template>
    <div>
        <AdminForm v-if="IsAdminMode"/>
        <ApplicationForm v-else />
    </div>
</template>

<script>
import ApplicationForm from './ApplicationForm.vue';
import AdminForm from './AdminForm.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'ApplicationsPage',
  components: {
    ApplicationForm,
    AdminForm
  },
  computed: {
    ...mapGetters(['IsAdminMode']), 
  },
};
</script>