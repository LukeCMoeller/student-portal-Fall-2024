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

//Components
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