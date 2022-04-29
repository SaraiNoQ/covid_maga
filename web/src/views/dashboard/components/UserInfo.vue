<template>
    <div>
        <Alert-Message message="正 在 登 出......" type="success" ref="successRef"/>
        <div class="hover:cursor-pointer mr-4">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <el-avatar> user </el-avatar>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="user">User</el-dropdown-item>
                        <el-dropdown-item command="signup">Sign up</el-dropdown-item>
                        <el-dropdown-item divided command="logout">Log out</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import AlertMessage from '../../../components/AlertMessage.vue'
import { ref, defineComponent } from 'vue'

export default defineComponent({
    components: {
        AlertMessage
    },
    setup() {
        const router = useRouter()
        const store = useStore()

        const successRef = ref()
        const handleCommand = async (command: string | number | object) => {
            if (command === 'logout') {
                await successRef.value.setDis()
                store.commit('removeToken')
                localStorage.removeItem('user')
                router.replace('/')
            }
            if (command === 'signup') {
                router.push('/register')
            }
        }

        return {
            successRef,
            handleCommand
        }
    }
})
    





</script>
