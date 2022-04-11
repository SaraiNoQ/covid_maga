<template>
    <div>
        <el-table
            ref="tableRef"
            row-key="date"
            :data="filterTableData"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            class="hover:cursor-pointer" 
        >
            <el-table-column label="No." type="index" width="50" align="center"/>
            <el-table-column
            prop="date"
            label="Date"
            sortable
            width="200"
            column-key="date"
            />
            <el-table-column prop="name" label="Name" width="200" />
            <el-table-column prop="address" label="Destination"/>
            <el-table-column prop="reason" label="Reason" width="250"/>

            <el-table-column
                prop="tag"
                label="Tag"
                width="80"
            >
                <template #default="scope">
                    <el-tag
                    :type="scope.row.tag === 'Home' ? '' : 'success'"
                    disable-transitions
                    >{{ scope.row.tag }}</el-tag
                    >
                </template>
            </el-table-column>

            <el-table-column align="center" width="180">
                <template #header>
                    <el-input v-model="search" size="default" placeholder="Name to search" />
                </template>
                <template #default="scope">
                    <el-button size="small"
                    type="success"
                    @click="handleAllow(scope.$index, scope.row)"
                    v-if="!denyArray.includes(scope.$index)&&!allowArray.includes(scope.$index)"
                    >Allow</el-button
                    >
                    <el-button
                    size="small"
                    type="danger"
                    @click="handleDeny(scope.$index, scope.row)"
                    v-if="!denyArray.includes(scope.$index)&&!allowArray.includes(scope.$index)"
                    >Deny</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import dayjs from 'dayjs'

interface User {
    date: string
    name: string
    address: string
    tag: string
    reason?: string
}

export default defineComponent({
    setup() {
        const search = ref<string>('')
        const tableData: User[] = [
            {
                date: dayjs('1411111').format('YYYY-MM-DD HH:MM:ss'),
                name: '2020081092(Student-QIqi)',
                address: 'No. 189, Grove St, Los Angeles11111111111111111111sagsahhsdh1111111111',
                tag: 'Home',
                reason: '222222ahsfhjhryjyr22222222222222222'
            },
            {
                date: dayjs('1131111').format('YYYY-MM-DD HH:MM:ss'),
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                tag: 'Office',
            },
            {
                date: dayjs('1211111').format('YYYY-MM-DD HH:MM:ss'),
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                tag: 'Home',
            },
            {
                date: dayjs('1111111').format('YYYY-MM-DD HH:MM:ss'),
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                tag: 'Office',
            },
            {
                date: dayjs('1911111').format('YYYY-MM-DD HH:MM:ss'),
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                tag: 'Office',
            },
            {
                date: dayjs('1811111').format('YYYY-MM-DD HH:MM:ss'),
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                tag: 'Home',
            },
            {
                date: dayjs('711111').format('YYYY-MM-DD HH:MM:ss'),
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                tag: 'Office',
            },
            {
                date: dayjs('611111').format('YYYY-MM-DD HH:MM:ss'),
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                tag: 'Office',
            },
            {
                date: dayjs('511111').format('YYYY-MM-DD HH:MM:ss'),
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                tag: 'Home',
            },
            {
                date: dayjs('411111').format('YYYY-MM-DD HH:MM:ss'),
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                tag: 'Office',
            },
            {
                date: dayjs('211111').format('YYYY-MM-DD HH:MM:ss'),
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                tag: 'Home',
            },
            {
                date: dayjs('311111').format('YYYY-MM-DD HH:MM:ss'),
                name: 'Tom',
                address: 'No. 189, Grove St, Los Angeles',
                tag: 'Office',
            },
        ]
        const filterTableData = computed(() =>
            tableData.filter(
                (data) =>
                !search.value ||
                data.name.toLowerCase().includes(search.value.toLowerCase())
            )
        )

        const allowArray = ref<number[]>([]);
        const denyArray = ref<number[]>([]);
        const tableRowClassName = (
            { row, rowIndex}: {
            row: User
            rowIndex: number
            }) => {
            if (denyArray.value.includes(rowIndex)) {
                return 'danger-row'
            } else if (allowArray.value.includes(rowIndex)) {
                return 'success-row'
            }
            return ''
        }

        return {
            tableData,
            search,
            filterTableData,
            tableRowClassName,
            allowArray,
            denyArray
        }
    },
    methods: {
        handleAllow (index: number, row: User) {
            this.allowArray.push(index)
            console.log(this.allowArray);
        },
        handleDeny (index: number, row: User) {
            this.denyArray.push(index)
            console.log(this.denyArray);
        }
    }
})
</script>

<style lang="scss" scoped>
::v-deep(.el-table .danger-row) {
  --el-table-tr-bg-color: var(--el-color-danger-light-9);
}
::v-deep(.el-table .success-row) {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>