import { createRouter, createWebHashHistory, createWebHistory, RouteRecordRaw } from "vue-router"
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
                component: () => import('@/views/dashboard/DashIndex.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/home/gather',
                name: 'Gather',
                component: () => import('@/views/gather/GatherIndex.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/home/student',
                name: 'Student',
                component: () => import('@/views/register/RegisterIndex.vue')
                // component: () => import('@/views/query/QueryIndex.vue')
            },
            {
                path: '/home/authorize',
                name: 'Authorize',
                component: () => import('@/views/authorize/AuthorizeIndex.vue'),
            },
            {
                path: '/home/statistics',
                name: 'Statistics',
                component: () => import('@/views/statistics/StatisticsIndex.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/home/settings',
                name: 'Settings',
                component: () => import('@/views/setting/SettingIndex.vue'),
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/home/dynamic',
                name: 'Dynamic',
                component: () => import('@/views/dynamic/DynamicIndex.vue'),
                meta: {
                    keepAlive: true
                }
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
    },
    {
        path: '/register/vertify',
        name: 'Vertify',
        component: () => import('@/components/VertifyCode.vue')
    },
    {
        path: '/login/output',
        name: 'OutLogin',
        component: () => import('@/views/others/LoginIndex.vue')
    },
    {
        path: '/output/card',
        name: 'MakeCard',
        component: () => import('@/views/others/MakeCard.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const toPath = ['/', '/register', '/register/vertify', '/login/output']
    if (toPath.includes(to.path)) next()
    const token: string | null = window.localStorage.getItem('token')
    if (!token) {
        return next('/')
    }
    const formData: FormData = new FormData()
    formData.append('token', <string>token)
    const res = await instance.post('/token', formData)
    // @ts-ignore
    if (res.success) {
        next()
        return
    }
    else next('/')
})

export default router