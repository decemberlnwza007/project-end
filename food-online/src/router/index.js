import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login/Login.vue';
import Home from '../components/Home/Home.vue';
import Menu from '../components/Menu/Menu.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/home', name: 'Home', component: Home },
  { path: '/menu', name: 'Menu', component: Menu },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
