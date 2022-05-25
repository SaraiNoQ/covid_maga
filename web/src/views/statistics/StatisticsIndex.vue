<template>
    <div>
        <div class="mt-3 mx-auto w-[80vw] lg:grid lg:grid-cols-3 lg:w-[95vw]">
            <div id="chart1" class="mx-4 mt-5 bg-white"></div>
            <div id="chart2" class="mx-4 mt-5 bg-white"></div>
            <div id="chart3" class="mx-4 mt-5 bg-white"></div>
        </div>
        <div class="mt-4 mx-auto w-[80vw] lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:w-[95vw]">
            <div id="chart4" class="lg:row-span-2 mx-4 mt-5 bg-white"></div>
            <div id="chart5" class="mx-4 mt-5 bg-white"></div>
            <div id="chart6" class="mx-4 mt-5 bg-white"></div>
        </div>

        <PageFooter />
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue-demi';
import * as echarts from 'echarts';

import PageFooter from '../../components/PageFooter.vue'

export default defineComponent({
    components: {
        PageFooter
    },
    setup() {
        onMounted(() => {
            // @ts-ignore
            const myChart1 = echarts.init(document.getElementById('chart1'), null, {
                height: 350
            });
            // @ts-ignore
            const myChart2 = echarts.init(document.getElementById('chart2'), null, {
                height: 350
            });
            // @ts-ignore
            const myChart3 = echarts.init(document.getElementById('chart3'), null, {
                height: 350
            });
            // @ts-ignore
            const myChart4 = echarts.init(document.getElementById('chart4'), null, {
                height: 600
            });
            // @ts-ignore
            const myChart5 = echarts.init(document.getElementById('chart5'), null, {
                height: 300
            });
            // @ts-ignore
            const myChart6 = echarts.init(document.getElementById('chart6'), null, {
                height: 300
            });
            myChart1.setOption({
                title: {
                   text: '申请类型',
                   left: 'center',
                   top: 'center'
                 },
                 series: [
                   {
                     type: 'pie',
                     data: [
                       {
                         value: 1548,
                         name: 'Student'
                       },
                       {
                         value: 483,
                         name: 'Teacher'
                       },
                       {
                         value: 219,
                         name: 'Others'
                       }
                     ],
                     radius: ['40%', '70%']
                   }
                ]
            });
            myChart2.setOption({
                title: {
                    text: '出校人数',
                    top: 10,
                    left: 'center'
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                  },
                  yAxis: {
                    type: 'value'
                  },
                  series: [
                    {
                      data: [320, 400, 350, 380, 370, 410, 430],
                      type: 'bar',
                    //   showBackground: true,
                    //   backgroundStyle: {
                    //     color: 'rgba(220, 220, 220, 0.8)'
                    //   }
                    }
                  ]
            });
            myChart3.setOption({
                title: {
                    text: '申请占比',
                    top: 10,
                    left: 'center'
                },
                xAxis: {
                    data: ['2022-01', '2022-02', '2022-03', '2022-04']
                  },
                  yAxis: {},
                  series: [
                    {
                      data: [310, 272, 392, 283],
                      type: 'bar',
                      stack: 'x'
                    },
                    {
                      data: [-51, 40, -23, 30],
                      type: 'bar',
                      stack: 'x'
                    }
                  ]

            });
            myChart4.setOption({
                xAxis: { type: 'category' },
                yAxis: {  },
                series: [{ type: 'line' }, { type: 'line' }, { type: 'line' }],
                dataset: {
                    source: [
                        ['date', 'Teacher', 'Student', 'Review'],
                        ['2022-01', 235, 665, 308],
                        ['2022-02', 168, 748, 299],
                        ['2022-03', 191, 522, 212],
                        ['2022-04', 237, 410, 276]
                    ]
                },
                legend: {
                    orient: 'vertical',
                    top: 'center',
                    right: 10,
                },
            });
            myChart5.setOption({
                xAxis: { type: 'category' },
                yAxis: {  },
                series: [
                {
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                        opacity: 1
                    } 
                },
                {
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                        opacity: 0.5
                    } 
                },
                {
                    type: 'line',
                    smooth: true,
                    areaStyle: {
                        color: '#ff0',
                        opacity: 0.3
                    }
                }],
                dataset: {
                    source: [
                        ['date', 'Teacher', 'Student', 'Review'],
                        ['2022-01', 235, 665, 308],
                        ['2022-02', 168, 748, 299],
                        ['2022-03', 191, 522, 212],
                        ['2022-04', 237, 410, 276]
                    ]
                },
                legend: {
                    orient: 'vertical',
                    top: 'center',
                    right: 10,
                },
            });
            myChart6.setOption({
                xAxis: { type: 'category' },
                yAxis: {  },
                series: [{ type: 'line', smooth: true }, { type: 'line', smooth: true }, { type: 'line', smooth: true }],
                dataset: {
                    source: [
                        ['date', 'Teacher', 'Student', 'Review'],
                        ['2022-01', 235, 665, 308],
                        ['2022-02', 168, 748, 299],
                        ['2022-03', 191, 522, 212],
                        ['2022-04', 237, 410, 276]
                    ]
                },
                legend: {
                    orient: 'vertical',
                    top: 'center',
                    right: 10,
                },
            });
            
            window.onresize = function() {
                myChart1.resize();
                myChart2.resize();
                myChart3.resize();
                myChart4.resize();
                myChart5.resize();
                myChart6.resize();
            };
        });
    },
    beforeUnmount() {
        window.onresize = null;
        // @ts-ignore
        document.getElementById('chart1').removeAttribute('_echarts_instance_');
        // @ts-ignore
        document.getElementById('chart2').removeAttribute('_echarts_instance_');
        // @ts-ignore
        document.getElementById('chart3').removeAttribute('_echarts_instance_');
        // @ts-ignore
        document.getElementById('chart4').removeAttribute('_echarts_instance_');
        // @ts-ignore
        document.getElementById('chart5').removeAttribute('_echarts_instance_');
        // @ts-ignore
        document.getElementById('chart6').removeAttribute('_echarts_instance_');
    }
})
</script>