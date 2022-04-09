import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import instance from '../plugins/axios'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        children: [
            {
                path: '/home/dashboard',
                name: 'Dashboard',
                component: () => import('@/views/dashboard/DashIndex.vue')
            },
            {
                path: '/home/gather',
                name: 'Gather',
                component: () => import('@/views/gather/GatherIndex.vue')
            },
            {
                path: '/home/query',
                name: 'Query',
                component: () => import('@/views/query/QueryIndex.vue')
            },
            {
                path: '/home/student',
                name: 'Student',
                component: () => import('@/views/register/RegisterIndex.vue')
            },
            {
                path: '/home/authorize',
                name: 'Authorize',
                component: () => import('@/views/authorize/AuthorizeIndex.vue')
            },
            {
                path: '/home/statistics',
                name: 'Statistics',
                component: () => import('@/views/statistics/StatisticsIndex.vue')
            }
        ]
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

router.beforeEach(async (to, from, next) => {
    const toPath = ['/', '/register']
    if (toPath.includes(to.path)) next()
    const token: string | null = window.localStorage.getItem('token')
    if (!token) {
        return next('/')
    }
    const formData: FormData = new FormData()
    formData.append('token', <string>token)
    const res = await instance.post('/token', formData)
    if (res.success) {
        next()
        return
    }
    else next('/')
})

export default router