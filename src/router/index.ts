import { createRouter, createWebHistory } from 'vue-router'
import HomeownerHome from '../components/auth/homeowner/HomeownerHome.vue';
import HomeownerLogin from '../components/auth/homeowner/HomeownerLogin.vue';
import HomeownerRegister from '../components/auth/homeowner/HomeownerRegister.vue';
import HomeownerUpdatePassword from '@/components/auth/homeowner/HomeownerUpdatePassword.vue';
import HomeownerConfirmUpdatedPassword from '@/components/auth/homeowner/HomeownerConfirmUpdatedPassword.vue';
import HomeownerDashboard from '../components/auth/homeowner/HomeownerDashboard.vue';
import SearchArborists from '../components/auth/search_arborists/SearchArborists.vue';
import BusinessDashboard from '../components/auth/business_network/BusinessDashboard.vue';
import BusinessLogin from '../components/auth/business_network/BusinessLogin.vue';
import BusinessRegister from '../components/auth/business_network/BusinessRegister.vue';





const routes = [
  { path: '/', component: HomeownerHome }, // Redirect `/` to `/login`
  { path: '/login', component: HomeownerLogin},
  { path: '/register', component: HomeownerRegister},
  { path: '/update-password', component: HomeownerUpdatePassword},
  { path: '/confirm-updated-password', component: HomeownerConfirmUpdatedPassword},
  { path: '/homeowner-dashboard', component: HomeownerDashboard, name: 'homeownerDashboard'},
  { path: '/search', component: SearchArborists },
  { path: '/business_dashboard', component: BusinessDashboard},
  { path: '/business_login', component: BusinessLogin},
  { path: '/business_register', component: BusinessRegister},
  { path: '/business_message', component: BusinessMessenger},
  { path: '/message_list', component: MessageList},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


export default router;