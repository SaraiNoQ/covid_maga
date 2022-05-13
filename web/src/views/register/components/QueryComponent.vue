<template>
    <div>
        <el-table :data="studentsData" style="width: 100%">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
            <el-table-column label="Operations">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
                >Edit</el-button
                >
                <el-button
                size="small"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >Delete</el-button
                >
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script setup lang="ts">
import { onBeforeMount, reactive, ref } from "vue-demi";
import Axios from '../../../plugins/axios';
import AlertMessage from '../../../components/AlertMessage.vue'

interface Form {
    name: string;
    number: string;
    major: string;
    gender: string;
    image: Blob | null;
}


const data = defineProps<{
    tableData: Form[];
}>()

const studentsData = ref<Form[]>([])
onBeforeMount(() => {
    console.log('data', data.tableData);
    // studentsData.value = data.tableData
})

const handleEdit = (index, row)  => {}
const handleDelete = (index, row) => {}
</script>