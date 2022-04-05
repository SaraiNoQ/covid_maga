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


    <data-card :data="'1,928'"/>
</template>


<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from 'vuex';

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
        return {
            name,
            newName,
            saveName
        };
    },
    components: { DataCard }
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