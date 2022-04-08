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

    <div class="flex justify-between">
        <data-card v-for="(item, index) in chartData" :key="index" :data="item" class=""/>
    </div>
    <div id="test" class="mx-12 mt-5 bg-red-100"></div>
</template>


<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import { useStore } from 'vuex';
import * as echarts from 'echarts';

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
                width: 800,
                height: 400
            });
            myChart.setOption({
                xAxis: {
                    data: ['A', 'B', 'C', 'D', 'E']
                },
                yAxis: {},
                series: [
                    {
                    data: [10, 22, 28, 43, 49],
                    type: 'line',
                    stack: 'x'
                    },
                    {
                    data: [5, 4, 3, 5, 10],
                    type: 'line',
                    stack: 'x'
                    }
                ]
            });
        });
        return {
            name,
            newName,
            saveName,
            chartData
        };
    },
    components: { DataCard },
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