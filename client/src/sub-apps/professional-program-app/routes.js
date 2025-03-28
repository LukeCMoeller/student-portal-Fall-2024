import ProfessionalHome from './ProfessionalHome.vue';
import ApplicationPage from './ApplicationsForm.vue';
import ReviewPage from './AdminForm.vue'

const routes = [
  { path: '', name: 'home', component: ProfessionalHome },
  { path: 'apply', name:'apply', component: ApplicationPage },
  { path: 'review', name:'review', component: ReviewPage },
];

export default routes;