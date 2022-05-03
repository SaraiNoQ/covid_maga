<template>
    <div>
        <Alert-Message :message="alertMessage" type="error" ref="alertRef"/>
        <Alert-Message :message="successMessage" type="success" ref="successRef"/>
        <el-table
            ref="tableRef"
            row-key="date"
            :data="filterTableData"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            class="hover:cursor-pointer" 
        >
            <el-table-column label="序号" type="index" width="60" align="center"/>
            <el-table-column
            prop="date"
            label="日期"
            sortable
            width="180"
            column-key="date"
            align="center"
            />
            <el-table-column prop="name" label="身份号" width="150" align="center"/>
            <el-table-column prop="address" label="目的地" align="center" />
            <el-table-column prop="reason" label="事由" width="290" align="center" />

            <el-table-column
                prop="tag"
                label="身份"
                width="90"
                align="center"
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
import { computed, defineComponent, onBeforeMount, ref } from 'vue-demi'

import dayjs from 'dayjs'
import Axios from '../../plugins/axios'

interface User {
    date: string
    name: string
    address: string
    tag: string
    reason: string
    record: string
    id: string
}

interface StuNum {
    student_id: Array<string>
}

export default defineComponent({
    setup() {
        const alertMessage = ref<string>('')
        const successMessage = ref<string>('')
        const alertRef = ref()
        const successRef = ref()

        const search = ref<string>('')

        const tableData = ref<User[]>([])
        const allowArray = ref<number[]>([]);
        const denyArray = ref<number[]>([]);
        onBeforeMount(async() => {
            const res = await Axios.get('/student/numbers')

            // @ts-ignore
            if (!res.success) {
                return
            }
            // @ts-ignore
            const students = res.success.result
            const form: StuNum = {
                student_id: []
            }
            students.forEach((e: any) => {
                form.student_id.push(e.student_number)
            })
            const res2 = await Axios.post('/journey/info', form)
            // @ts-ignore
            if (res2.success) {
                // @ts-ignore
                const respData = res2.success.data
                for (let i = 0; i < respData.length; i++) {
                    const userInfo: User = {
                        date: dayjs(respData[i].createdAt).format('YYYY-MM-DD'),
                        name: respData[i].student_id,
                        address: respData[i].journey_destination,
                        tag: respData[i].journey_category,
                        reason: respData[i].journey_reason,
                        id: respData[i].journey_id,
                        record: respData[i].record_status
                    }
                    tableData.value.push(userInfo)
                    // 如果record为1，就存入allow，为2，就存入deny
                    if (userInfo.record === '1') {
                        allowArray.value.push(i)
                    } else if (userInfo.record === '2') {
                        denyArray.value.push(i)
                    }
                }
            }
        })

        const filterTableData = computed(() =>
            tableData.value.filter(
                (data) =>
                !search.value ||
                data.name.toLowerCase().includes(search.value.toLowerCase())
            )
        )

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
            denyArray,
            successMessage,
            alertMessage,
            alertRef,
            successRef
        }
    },
    methods: {
        async handleAllow (index: number, row: User) {
            if (row.id && row.record) {
                const fd = new FormData()
                fd.append('journey_id', row.id)
                fd.append('record_status', '1')
                const res = await Axios.patch('/journey/authority', fd)
                // @ts-ignore
                if (res.success) {
                    this.allowArray.push(index)
                    this.successMessage = '授权成功！'
                    this.successRef.setDis()
                }
            }
        },
        async handleDeny (index: number, row: User) {
            if (row.id && row.record) {
                const fd = new FormData()
                fd.append('journey_id', row.id)
                fd.append('record_status', '2')
                const res = await Axios.patch('/journey/authority', fd)
                // @ts-ignore
                if (res.success) {
                    this.allowArray.push(index)
                    this.alertMessage = '授权成功！'
                    this.alertRef.setDis()
                }
            }
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