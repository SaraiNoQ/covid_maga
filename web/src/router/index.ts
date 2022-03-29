import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"


const routes: Array<RouteRecordRaw> = [
    {
        path: '/home',
        name: 'Home',
        component: () => import('../views/Home.vue')
    },
    {
        path: '/',
        name: 'Login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/Register.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router