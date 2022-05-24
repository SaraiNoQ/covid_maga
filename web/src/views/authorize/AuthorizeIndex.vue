<template>
    <div>
        <AlertMessage :message="alertMessage" type="error" ref="alertRef"/>
        <AlertMessage :message="successMessage" type="success" ref="successRef"/>

        <el-dialog v-model="dialogFormVisible" title="修改学生信息">
          <el-form :model="dialogData">
            <el-form-item label="日期" :label-width="140">
              <el-input v-model="dialogData.date" disabled />
            </el-form-item>
            <el-form-item label="学号" :label-width="formLabelWidth">
              <el-input v-model="dialogData.id" disabled />
            </el-form-item>
            <el-form-item label="目的地" :label-width="formLabelWidth">
              <el-input v-model="dialogData.address" disabled/>
            </el-form-item>
            <el-form-item label="事由" :label-width="formLabelWidth">
              <el-input v-model="dialogData.reason" disabled />
            </el-form-item>
            <el-form-item label="状态" :label-width="formLabelWidth">
               <el-switch v-model="dialogData.record" disabled/>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button
                class="dialog-footer__btn"
                type="danger"
                @click="denyButton"
              >禁止</el-button>
              <el-button
                type="primary"
                @click="allowButton"
              >允许</el-button>
            </span>
          </template>
        </el-dialog>

        <el-table
            ref="tableRef"
            row-key="date"
            :data="filterTableData"
            style="width: 100%"
            :row-class-name="tableRowClassName"
            class="hover:cursor-pointer"
            v-loading="loading"
            @row-click="handleRowClick"
        >
            <el-table-column label="序号" type="index" width="60" align="center"/>
            <el-table-column
                prop="createAt"
                label="申请时间"
                width="160"
                column-key="date"
                align="center"
            />
            <el-table-column
                prop="date"
                label="请假时长"
                width="200"
                column-key="date"
                align="center"
            />
            <el-table-column prop="name" label="身份号" width="150" align="center"/>
            <el-table-column prop="address" label="目的地" align="center" width="250" />
            <el-table-column prop="reason" label="事由" align="center" />

            <el-table-column
                prop="tag"
                label="身份"
                width="80"
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
import { computed, defineComponent, onBeforeMount, reactive, ref } from 'vue-demi'

import dayjs from 'dayjs'
import Axios from '../../plugins/axios'

interface User {
    date: string,
    name: string,
    address: string,
    tag: string,
    reason: string,
    record: string | boolean,
    id: string,
    index?: number,
    createAt?: string,
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

        // 渲染表格
        const tableData = ref<User[]>([])
        const allowArray = ref<number[]>([]);
        const denyArray = ref<number[]>([]);
        const loading = ref<boolean>(false)
        onBeforeMount(async() => {
            loading.value = true
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
                console.log('data', respData)
                
                let index = 0
                for (let i = 0; i < respData.length; i++, index++) {
                    try {
                        const userInfo: User = {
                            date: `${dayjs(respData[i].journey_start_time).format('YYYY-MM-DD')} -- ${dayjs(respData[i].journey_end_time).format('YYYY-MM-DD')} `,
                            name: respData[i].student_id,
                            address: respData[i].journey_destination,
                            tag: respData[i].journey_category,
                            reason: respData[i].journey_reason,
                            id: respData[i].journey_id,
                            record: respData[i].record_status,
                            createAt: dayjs(respData[i].createdAt).format('YYYY-MM-DD HH:mm:ss')
                        }
                        tableData.value.push(userInfo)
                        console.log('record', userInfo);
                        
                        // 如果record为1，就存入allow，为2，就存入deny
                        if (userInfo.record === '1') {
                            console.log('arr', allowArray);
                            allowArray.value.push(index)
                        } else if (userInfo.record === '2') {
                            denyArray.value.push(index)
                        }
                    } catch (error) {
                        index--
                        continue
                    }
                    
                }
            }
            loading.value = false
        })

        // 搜索栏
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
                row.index = rowIndex
                if (denyArray.value.includes(rowIndex)) {
                    return 'danger-row'
                } else if (allowArray.value.includes(rowIndex)) {
                    return 'success-row'
                }
                return ''
        }

        // click-table
        const dialogFormVisible = ref<boolean>(false)
        const dialogData = reactive<User>({
            date: '',
            id: '',
            name: '',
            address: '',
            tag: '',
            reason: '',
            record: '',
            index: -1,
            createAt: ''
        })
        const formLabelWidth = '140px'
        const handleRowClick = async (row: User, column) => {
            dialogData.date = row.date
            dialogData.id = row.id
            dialogData.name = row.name
            dialogData.address = row.address
            dialogData.tag = row.tag
            dialogData.reason = row.reason
            dialogData.record = row.record === '1' ? true : false
            dialogData.index = row.index

            dialogFormVisible.value = true
        }
        const allowButton = async () => {
            const fd = new FormData()
            fd.append('journey_id', dialogData.id)
            fd.append('record_status', '1')
            const res = await Axios.patch('/journey/authority', fd)
            // @ts-ignore
            if (res.success) {
                denyArray.value = denyArray.value.filter((e) => e !== dialogData.index)
                allowArray.value.push(dialogData.index as number)
                dialogData.record = true
                successMessage.value = '修改成功!'
                await successRef.value.setDis()
            }
        }
        const denyButton = async () => {
            const fd = new FormData()
            fd.append('journey_id', dialogData.id)
            fd.append('record_status', '2')
            const res = await Axios.patch('/journey/authority', fd)
            // @ts-ignore
            if (res.success) {
                allowArray.value = allowArray.value.filter((e) => e !== dialogData.index)
                denyArray.value.push(dialogData.index as number)
                dialogData.record = false
                successMessage.value = '修改成功!'
                await successRef.value.setDis()
            }
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
            successRef,
            loading,
            handleRowClick,
            dialogFormVisible,
            dialogData,
            formLabelWidth,
            allowButton,
            denyButton
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
:deep(.el-table .danger-row) {
  --el-table-tr-bg-color: var(--el-color-danger-light-9);
}
:deep(.el-table .success-row) {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}

:deep(.el-input__inner) {
    width: 385px;
}

.dialog-footer {
    .dialog-footer__btn {
        margin: 0 20px;
    }
}

:deep(.el-dialog__footer) {
    margin: 0 auto;
    display: flex;
    justify-content: center
}
</style>