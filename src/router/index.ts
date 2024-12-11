import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/pages/DashboardPage.vue';
import DashboardPage from '../components/pages/DashboardPage.vue';
import RegisterPage from '../components/pages/RegisterPage.vue';
import profile from '../components/pages/profile.vue';
import SearchArborists from '../components/pages/SearchArborists.vue';



const routes = [
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
  { path: '/dashboard', component: DashboardPage },
  { path: '/profile', component: profile }, 
  { path: '/search', component: SearchArborists },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


export default router;