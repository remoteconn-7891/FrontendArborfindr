import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/pages/LoginPage.vue';
import DashboardPage from '../components/pages/DashboardPage.vue';
import RegisterPage from '../components/pages/RegisterPage.vue';
import ProfilePage from '../components/pages/profile.vue';



const routes = [
  { path: '/', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/dashboard', component: DashboardPage },
  { path: '/profile', component: ProfilePage }, 
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;