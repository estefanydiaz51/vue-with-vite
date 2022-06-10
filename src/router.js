import { createRouter, createWebHistory } from 'vue-router';
import Home from './views/Home.vue';
import Editar from './views/Editar.vue';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import { useUserStore } from './stores/user'

const requireAuth = async ( to, from, next ) => {
    const userStore = useUserStore();
    userStore.loadingSession = true;
    const user = await userStore.currentUser();
    if ( user ) {
        next();
    } else {
        next('/login');
    }
    userStore.loadingSession = false;
}

const routes = [
    {
        path: '/',
        component: Home,
        name: 'home',
        beforeEnter: requireAuth
    },
    {
        path: '/editar/:id',
        component: Editar,
        name: 'editar',
        beforeEnter: requireAuth
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/register',
        name: 'register',
        component: Register
    }
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;