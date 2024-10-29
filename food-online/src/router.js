import { createRouter, createWebHistory } from 'vue-router';
import Login from './components/Login/Login.vue';
import Home from './components/Home/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
    },
    {
        path: '/Home',
        name: 'Home',
        component: Home
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;