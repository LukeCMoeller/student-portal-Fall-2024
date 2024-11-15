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
import { useAdminStore } from '@/stores/AdminStore';
import { storeToRefs } from 'pinia'

export default {
  name: 'ApplicationsPage',
  components: {
    ApplicationForm,
    AdminForm
  },
  setup() {
    // Stores
    const adminStore = useAdminStore()
    //adminStore.hydrate()

    // Setup Stores
    const { IsAdminMode } = storeToRefs(adminStore)

    return{
      IsAdminMode
    }
  },
};
</script>