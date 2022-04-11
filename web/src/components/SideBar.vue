<template>
    <div className='fixed top-0 left-0 h-screen w-16 m-0
            flex flex-col z-50
          bg-gray-900 text-white shadow-lg'>
        <div 
        class="sidebar-icon group fa-xl"
        @mouseover="sendFocus($event)"
        @mouseout="sendNoFocus($event)"
        @click="toDashboard"
        :class="{ denycur: isdeny }">
            <font-awesome-icon icon="fire"/>
            <span class="sidebar-tooltip group-hover:scale-100">tips</span>
        </div>

        <div class="w-14 h-1 mx-auto bg-gray-700"></div>

        <!-- 收集用户信息 -->
        <div class="sidebar-icon group fa-xl" @click="toGather" :class="{ denycur: isdeny }">
            <font-awesome-icon icon="id-card"/>
            <span class="sidebar-tooltip group-hover:scale-100">Gather Info
                <font-awesome-icon icon="fingerprint"/>
            </span>
        </div>

        <!--  注册学生 -->
        <div class="sidebar-icon group fa-xl" @click="toStudent" :class="{ denycur: isdeny }">
            <font-awesome-icon icon="users-viewfinder"/>
            <span class="sidebar-tooltip group-hover:scale-100">Query Student
                <font-awesome-icon icon="magnifying-glass"/>
            </span>
        </div>
    
        <!-- 审批 -->
        <div class="sidebar-icon group fa-xl" @click="toAuthorize" :class="{ denycur: isdeny }">
            <font-awesome-icon icon="user-shield"/>
            <span class="sidebar-tooltip group-hover:scale-100">Authorize
                <font-awesome-icon icon="shield-halved"/>
            </span>
        </div>


        <!-- 统计用户 -->
        <div class="sidebar-icon group fa-xl" @click="toStatistics" :class="{ denycur: isdeny }">
            <font-awesome-icon icon="chart-column"/>
            <span class="sidebar-tooltip group-hover:scale-100">Statistic
                <font-awesome-icon icon="chart-pie"/>
            </span>
        </div>

        <div class="w-14 h-1 mx-auto bg-gray-700"></div>

        <div class="sidebar-icon group fa-xl">
            <font-awesome-icon icon="gear"/>
            <span class="sidebar-tooltip group-hover:scale-100">Settings
                <font-awesome-icon icon="screwdriver-wrench"/>
            </span>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
    setup() {
        const focus = ref<boolean>(false)
        const isdeny = ref<boolean>(false)

        const router = useRouter()

        const toGather = async () => {
            isdeny.value = true
            await router.push('/home/gather')
            isdeny.value = false
        }
        const toStudent = async () => {
            isdeny.value = true
            await router.push('/home/student')
            isdeny.value = false
        }
        const toAuthorize = async () => {
            isdeny.value = true
            await router.push('/home/authorize')
            isdeny.value = false
        }
        const toStatistics = async () => {
            isdeny.value = true
            await router.push('/home/statistics')
            isdeny.value = false
        }
        const toDashboard = async () => {
            isdeny.value = true
            await router.push('/home/dashboard')
            isdeny.value = false
        }

        return {
            focus,
            router,
            toDashboard,
            toGather,
            toAuthorize,
            toStudent,
            toStatistics,
            isdeny
        }

    },
    methods: {
        sendFocus (e: Event) {
            this.focus = true
        },
        sendNoFocus (e: Event) {
            this.focus = false
        }
    }
})
</script>

<style scoped>
.denycur {
    cursor: not-allowed;
}
.hidden {
    display: none;
}

.test {
    height: 100%;
    width: 68px;
}
</style>


