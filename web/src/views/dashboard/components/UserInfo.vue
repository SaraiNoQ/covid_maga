<template>
    <div class="hover:cursor-pointer">
        <el-dropdown trigger="click">
            <span class="el-dropdown-link">
                <el-avatar> user </el-avatar>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item>User</el-dropdown-item>
                    <el-dropdown-item>Sign up</el-dropdown-item>
                    <el-dropdown-item divided>Log out</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup() {
        
    },
})
</script>
