<template>
    <!-- <div class="mb-6 text-3xl font-extrabold text-center">home</div>

    <p class="mb-6 text-center">Name in store is: {{ name }}</p>

    <input
        v-model="newName"
        type="text"
        class="p-2 border border-gray-600 mr-4 rounded m-auto"/>

    <button
        @click="saveName"
        class="p-2 text-white bg-indigo-600 rounded">Submit
    </button> -->

    <div class="md:flex justify-between">
        <data-card v-for="(item, index) in chartData" :key="index" :data="item" class="mt-4"/>
    </div>
    <div id="test" class="mx-10 mt-5 bg-white"></div>
    <div class="mt-8 mx-10">
        <h2 class="text-3xl text-green-600 w-60 mb-4 ml-[-4rem]">Latest</h2>
        <time-line></time-line>
    </div>
</template>


<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from 'vuex';
import * as echarts from 'echarts';

import TimeLine from './components/TimeLine/index.vue'
import DataCard from './components/DaraCard.vue'
export default defineComponent({
    setup() {
        const store = useStore();
        const name = computed(() => {
            return store.state.user.name;
        });
        const newName = ref<string>("");
        const saveName = () => {
            store.dispatch("saveName", newName.value);
            // store.commit('setName', newName.value)
            newName.value = "";
        };

        const chartData = reactive([
            {
                name: "Teacher",
                number: "1,928",
                color: "text-blue-300",
                icon: 'user-graduate',
                hover: 'group-hover:bg-red-100'
            },
            {
                name: "Student",
                number: "1,928",
                color: "text-green-300",
                icon: 'user',
                hover: 'group-hover:bg-purple-100'
            },
            {
                name: "Review",
                number: "1,928",
                color: "text-yellow-300",
                icon: 'list',
                hover: 'group-hover:bg-green-100'
            }
        ]);
        onMounted(() => {
            const myChart = echarts.init(document.getElementById('test'), null, {
                height: 450
            });
            myChart.setOption({
                xAxis: { type: 'category' },
                yAxis: {  },
                series: [{ type: 'line' }, { type: 'line' }, { type: 'line' }],
                dataset: {
                    source: [
                        ['date', 'Teacher', 'Student', 'Review'],
                        ['2022-04-08', 235, 665, 308],
                        ['2022-04-09', 168, 748, 299],
                        ['2022-04-10', 191, 522, 212],
                        ['2022-04-11', 237, 410, 276]
                    ]
                },
                legend: {
                    orient: 'vertical',
                    top: 'center',
                    right: 10,
                },
            });
            
            window.onresize = function() {
                myChart.resize();
            };
        });
        
        return {
            name,
            newName,
            saveName,
            chartData
        };
    },
    components: { DataCard, TimeLine },
})
</script>

<style scoped>
.svg-icon {
  width: 3em;
  height: 3.5em;
  fill: currentColor;
  vertical-align: middle;
}
</style>