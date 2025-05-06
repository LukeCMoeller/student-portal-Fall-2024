import AdminPage from './AdminPage.vue';
import DiscordPage from './DiscordPage.vue';

const routes = [
  { path: 'roles', name: 'roles', component: AdminPage },
  { path: 'discord', name:'discord', component: DiscordPage },
];

export default routes;