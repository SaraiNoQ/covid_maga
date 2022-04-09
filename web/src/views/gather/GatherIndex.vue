<template>
    <h2 class="mt-4 text-3xl text-green-600 font-semibold">行 程 打 卡</h2>
    <div class="search-form mt-5 mx-0 w-[100vw] xl:w-[60vw] xl:mx-auto">
        <el-form label-position="left" label-width="80px" :model="searchForm" class="search-tab">
            <el-form-item label="身 份 选 择">
                <el-select v-model="searchForm.authValue" placeholder="please select your identity" class="option-input">
                    <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="居 住 地 区">
                <el-select v-model="searchForm.liveValue" placeholder="please select your zone" class="option-input">
                    <el-option
                    v-for="item in options2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="健 康 状 况">
                <el-select v-model="searchForm.bodyValue" placeholder="please select your healthy status" class="option-input">
                    <el-option
                    v-for="item in options3"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Destination">
                <div class="search-input">
                    <el-input v-model="searchForm.destination" placeholder="please input your destination"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="Reason">
                <div class="search-input">
                    <el-input v-model="searchForm.reason" placeholder="please input reason for your appliction"></el-input>
                </div>
            </el-form-item>
            <el-form-item label="Time" class="time-input">
                <el-date-picker
                    v-model="searchForm.timeValue"
                    type="datetimerange"
                    range-separator="To"
                    start-placeholder="Start date"
                    end-placeholder="End date"
                    />
            </el-form-item>
            <el-form-item label="Others">
                <el-input
                    v-model="searchForm.textareaValue"
                    :autosize="{ minRows: 3, maxRows: 6 }"
                    type="textarea"
                    placeholder="Please input"
                    class="option-input"
                />
            </el-form-item>
        </el-form>
        <div class="flex justify-center items-center mx-auto pl-20">
            <el-button class="search-button" type="success" @click="search">提 交 打 卡</el-button>
            <div class="w-30 font-serif tracking-normal text-base text-green-500">2020081092(Student-QIqi)</div>
        </div>
    </div>
    <div class="ml-16 mt-10"> 
        <h2 class="text-3xl text-green-500 w-60 mb-2 ml-[-1.5rem]">Historic Cards</h2>
        <div class="grid xl:grid-cols-2 grid-cols-1">
            <card-list />
            <card-list />
            <card-list />
            <card-list />
            <card-list />
            <card-list />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

import CardList from '@/views/gather/components/CardList.vue'

export default defineComponent({
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

        return {
            searchForm,
            options1: [
                {
                    value: '选项1',
                    label: 'Student'
                },
                {
                    value: '选项2',
                    label: 'Teacher'
                }
            ],
            options2: [
                {
                    value: '选项1',
                    label: '航空港校区'
                },
                {
                    value: '选项2',
                    label: '龙泉校区'
                },
                {
                    value: '选项3',
                    label: '校外地区'
                }
            ],
            options3: [
                {
                    value: '选项1',
                    label: '绿码'
                },
                {
                    value: '选项2',
                    label: '黄码'
                },
                {
                    value: '选项3',
                    label: '红码'
                }
            ]
        }
    },
    components: { CardList },
    methods: {
        search() {
            console.log(this.searchForm);
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
