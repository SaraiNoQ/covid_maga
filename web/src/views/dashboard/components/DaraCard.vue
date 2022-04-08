<template>
    <div class="p-6 max-w-xl mx-auto w-72 bg-white rounded-xl shadow-md flex items-center justify-around space-x-4
    group hover:cursor-pointer">
        <div class="flex-shrink-0">
            <div class="w-14 h-14 block rounded-md stroke-current" :class="data.hover">
                <!-- <svg-icon class="mx-auto w-5" name="google-brands" viewBox="0 0 60 60"></svg-icon> -->
                <font-awesome-icon :icon="data.icon" class="text-5xl my-1" :class="data.color"/>
            </div>
        </div>
        <div class="pr-12">
            <div class="text-2xl font-medium text-black">{{data.name}}</div>
            <h1 class="text-gray-500">{{data.number}}</h1>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['data'],
    setup() {
    },
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