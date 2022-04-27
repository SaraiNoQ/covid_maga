<template>
    <div class="m-4">
        <el-calendar v-model="value"></el-calendar>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import dayjs from 'dayjs'
const value = ref<string>(dayjs(new Date()).format('YYYY-MM'))
</script>

<style lang="scss" scoped>
:deep(.el-calendar__body) {
    height: 290px;
    .el-calendar-day {
        height:38px;
    }
    .el-calendar-table {
        margin-top: -20px;
    }
}
</style>
