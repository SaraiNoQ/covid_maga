<template>
<div>
    <AlertMessage :message="errorInfo" type="error" ref="alertRef"/>
    <AlertMessage :message="successInfo" type="success" ref="successRef"/>
    <PageHeader />
    <h2 class="mt-4 text-3xl text-green-600 font-semibold">行 程 打 卡</h2>
    <div class="search-form mt-5 mx-0 w-[100vw] xl:w-[60vw] xl:mx-auto">
        <el-form
            label-position="left"
            label-width="80px"
            :model="searchForm"
            class="search-tab"
            :rules="rules"
        >
            <el-form-item label="身 份 选 择">
                <el-select v-model="searchForm.authValue" placeholder="" class="option-input">
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="居 住 地 区">
                <el-select v-model="searchForm.liveValue" placeholder="" class="option-input">
                    <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="健 康 状 况">
                <el-select v-model="searchForm.bodyValue" placeholder="" class="option-input">
                    <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="目 的 地">
                <div class="search-input">
                    <el-input v-model="searchForm.destination" placeholder=""></el-input>
                </div>
            </el-form-item>
            <el-form-item label="事  由">
                <div class="search-input">
                    <el-input v-model="searchForm.reason" placeholder=""></el-input>
                </div>
            </el-form-item>
            <el-form-item label="时  长" class="time-input" prop="timeValue">
                <el-date-picker
                    v-model="searchForm.timeValue"
                    type="datetimerange"
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    />
            </el-form-item>
            <el-form-item label="其  他">
                <el-input
                    v-model="searchForm.textareaValue"
                    :autosize="{ minRows: 3, maxRows: 6 }"
                    type="textarea"
                    placeholder="不超过200字"
                    class="option-input"
                />
            </el-form-item>
        </el-form>
        <div class="flex justify-center items-center mx-auto pl-20">
            <el-button class="search-button" type="success" @click="search">提 交 打 卡</el-button>
            <div class="w-30 font-serif tracking-normal text-base text-green-500">
                    <p>{{isMake ? '今日已打卡' : '今日未打卡'}}</p>
                </div>
            </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, reactive, ref } from 'vue-demi'
import dayjs from 'dayjs'

import Axios from '../../plugins/axios'
import AlertMessage from '../../components/AlertMessage.vue'
import PageHeader from '../../components/PageHeader.vue'

export default defineComponent({
    components: {
        AlertMessage,
        PageHeader,
    },
    setup() {
        const searchForm = reactive({
            reason: '',
            destination: '',
            timeValue: '',
            textareaValue: '',
            authValue: '',
            liveValue: '',
            bodyValue: ''
        })

        // 从localstorage中获取学号
        // 后台录入时需要手动记录学号
        const stuNum = ref<string>(JSON.parse(localStorage.getItem('student') as string).user_name)

        // 验证表单的prop命名必须和绑定的值相同
        const validateTime = (_rule: any, value: any, callback:any) => {
            const startTime: string = dayjs(new Date()).format('YYYY-MM-DD')
            const endTime: string = dayjs(value[1]).format('YYYY-MM-DD')
            // console.log(startTime, endTime, dayjs(startTime).diff(endTime, 'day'))
            if (dayjs(startTime).isAfter(endTime)) {
                callback(new Error('请选择正确的时间'))
            }else if (dayjs(startTime).diff(endTime, 'day') < -7) {
                callback(new Error('请假时间不能超过7天'))
            } else {
                callback()
            }
        }
        const rules = reactive({
            timeValue: [{ validator: validateTime, trigger: 'blur' }]
        })

        const alertRef = ref<any>(null)
        const successRef = ref<any>(null)
        const errorInfo = ref<string>('打 卡 失 败！')
        const successInfo = ref<string>('打 卡 成 功！')

        const isMake = ref<Boolean>(false)
        onBeforeMount(async () => {
            const fd = new FormData()
            fd.append('student_id', stuNum.value)
            const res = await Axios.post('/journey/record', fd)
            // @ts-ignore
            if (res.success) {
                isMake.value = true
            }
        })

        return {
            searchForm,
            options1: [
                {
                    value: 'student',
                    label: '学生'
                },
                {
                    value: 'teacher',
                    label: '教师'
                }
            ],
            options2: [
                {
                    value: 'konggang',
                    label: '航空港校区'
                },
                {
                    value: 'longquan',
                    label: '龙泉校区'
                },
                {
                    value: 'else',
                    label: '校外地区'
                }
            ],
            options3: [
                {
                    value: 'green',
                    label: '绿码'
                },
                {
                    value: 'yellow',
                    label: '黄码'
                },
                {
                    value: 'red',
                    label: '红码'
                }
            ],
            alertRef,
            successRef,
            errorInfo,
            successInfo,
            rules,
            stuNum,
            isMake
        }
    },
    methods: {
        async search() {
            const formData = new FormData()
            formData.append('student_id', this.stuNum)
            formData.append('journey_category', this.searchForm.authValue)
            formData.append('live_zone', this.searchForm.liveValue)
            formData.append('healthy_status', this.searchForm.bodyValue)
            formData.append('journey_destination', this.searchForm.destination)
            formData.append('journey_reason', this.searchForm.reason)
            formData.append('journey_start_time', dayjs(this.searchForm.timeValue[0]).format('YYYY-MM-DD'))
            formData.append('journey_end_time', dayjs(this.searchForm.timeValue[1]).format('YYYY-MM-DD'))
            formData.append('journey_info', this.searchForm.textareaValue)
            // console.log(this.searchForm.timeValue[0]);
            const res = await Axios.post('/journey/create', formData)
            
            try {
                // @ts-ignore
                if (res.success.message === 'create journey success!') {
                    await this.successRef.setDis()
                } // @ts-ignore 
                else if (res.success.message === 'update journey success!') {
                    this.successInfo = '更 新 成 功！'
                    await this.successRef.setDis()
                }
            } catch (error) {
                // @ts-ignore
                if (res.error) {
                    await this.alertRef.setDis()
                }
            }
        }
    }
})
</script>

<style lang="scss" scoped>
.search-form {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    padding: 30px 0px 18px 0px;

    .search-tab {
        margin: 0px 20% 0 20%;
        @media screen and (max-width: 830px) {
            margin: 0px 5% 0 5%;
        }

        .search-input {
            width: 90%;
        }

        .option-input {
            width: 90%;
        }

        .time-input {
            width: 90%;
        }

        .check-books {
            display: flex;
        }

        .first-check {
            display: inline-block;
            margin-right: 28px;
        }
    }

    .search-button {
        width: 120px;
        margin-right: 50px;
    }
}
</style>