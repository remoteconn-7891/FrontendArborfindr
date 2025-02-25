import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/pages/Home.vue';
import LoginPage from '../components/pages/LoginPage.vue';
import RegisterPage from '../components/pages/RegisterPage.vue';
import UpdatePassword from '@/components/pages/UpdatePassword.vue';
import ConfirmUpdatedPassword from '@/components/pages/ConfirmUpdatedPassword.vue';
import HomeownerDashboard from '../components/pages/HomeownerDashboard.vue';
import SearchArborists from '../components/pages/SearchArborists.vue';





const routes = [
  { path: '/', component: Home }, // Redirect `/` to `/login`
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: 'update-password', component: UpdatePassword},
  { path: 'confirm-updated-password', component: ConfirmUpdatedPassword},
  { path: '/homeowner-dashboard', component: HomeownerDashboard, name: 'homeownerDashboard'},
  { path: '/search', component: SearchArborists },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


export default router;