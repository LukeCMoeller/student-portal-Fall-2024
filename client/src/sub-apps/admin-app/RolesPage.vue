<template>
  <div :class="shared['flex-centered']">
    <div :class="shared['content-container']">
      <div class="grid" style="width: 100%;">
        <div class="col-8 col-offset-2 xl:col-8 xl:col-offset-2">
          
          <!-- Header -->
          <div :class="shared['app-header']">
            <h1 :class="shared['h1-style']">Role Control Panel</h1>
            <h4 :class="shared['h4-style']">Welcome aboard captain</h4>
          </div>
          <!-- Editing roles -->
          <div> 
            <DataTable v-model:filters="filters" :value="allUsers.data" removableSort paginator :rows="8" stripedRows showGridlines style="border-radius: 10px; overflow: hidden;"
            :globalFilterFields="['user']">
            <template #header>
                <div class="flex justify-end">
                    <IconField>
                        <InputIcon>
                            <i class="pi pi-search" style="padding-right: 20px"/>
                        </InputIcon>
                        <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>
              <Column field="user" header="User" style="max-width: 5rem">
                <template #body="{ data }">
                  {{ data.first_name + " " + data.last_name }}
                </template>
              </Column>
              <Column header="Roles">
                <template #body="{ data }">
                  <div class="flex gap-4 items-center">
                    <div class="flex items-center gap-2" v-for="role in ['reviewer', 'admin']" :key="role">
                      <Checkbox
                        v-model="data.roles"
                        :value="role"
                        @change="() => updateRole(data)"
                      />
                      <label>{{ role }}</label>
                    </div>
                  </div>
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useAdminStore } from '@/stores/AdminStore.js';

//primevue components
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import IftaLabel from 'primevue/iftalabel';
import Select from 'primevue/select';
import { useToast } from 'primevue/usetoast'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';
import { FilterMatchMode } from '@primevue/core/api';

//styles
import styles from '@/components/styles/AdminPage.module.css';
import shared from '@/components/styles/Shared.module.css';


export default {
  name: 'RolesPage',
  components: { Button, InputText, IftaLabel, Select, DataTable, Column, Checkbox},
  setup() {
    const toast = useToast();
    const adminStore = useAdminStore();
    const allUsers = ref([]);
    const studentOptions = ref([]);

    // Calls the function before anything else happens to properly get all users
    const fetchUsers = async() => {
      const response = await adminStore.getAllUsers();
      //For filtering the data table by name
      response.data.forEach(u => {
        u.user = `${u.first_name} ${u.last_name}`;
      });
      allUsers.value = response;
    }
    onMounted(fetchUsers);
    const selectedStudent = ref("");

    //Datatable filters
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      user: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    });
    
    // Updates the role of the user so that can access more or less
    const updateRole = async (user) =>{
      await adminStore.updateUserRoles(user.id, user.roles);
    }

    return { styles, shared, filters, selectedStudent, studentOptions, allUsers, updateRole };
  }
};
</script>
