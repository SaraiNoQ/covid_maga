<template>
    <div class="mb-6 text-3xl font-extrabold text-center">home</div>

    <p class="mb-6 text-center">Name in store is: {{ name }}</p>

    <input
        v-model="newName"
        type="text"
        class="p-2 border border-gray-600 mr-4 rounded m-auto"/>

    <button
        @click="saveName"
        class="p-2 text-white bg-indigo-600 rounded">Submit
    </button>


    <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4
    group hover:cursor-pointer">
        <div class="flex-shrink-0">
            <div class="w-14 h-14 block rounded-md  
            group-hover:bg-red-200 group-hover:text-purple-500">
                <svg-icon class="mx-auto w-5" name="google-brands" viewBox="0 0 60 60"></svg-icon>
            </div>
        </div>
        <div>
            <div class="text-xl font-medium text-black">Teacher</div>
            <p class="text-gray-500">You have a new message!</p>
        </div>
    </div>
</template>


<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from 'vuex';
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
    }
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