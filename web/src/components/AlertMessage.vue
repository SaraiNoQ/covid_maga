<template>
    <div class="fixed top-2 py-3 px-6 mb-3 text-lg
      scale-0 inline-flex items-center justify-center
      z-[5000] rounded-lg  alert-message"
      :class=" { 'transition-all duration-400 transform-gpu scale-100 ease-out': display,
      'bg-red-100 text-red-700': $props.type === 'error',
      'bg-green-100 text-green-700': $props.type === 'success',
      'bg-yellow-100 text-yellow-700': $props.type === 'warning' }"
      role="alert">{{ message }}</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue-demi'

export default defineComponent({
    props: ['message', 'type'],
    setup(props) {
        console.log(props.message);
        
        const display = ref<Boolean>(false)
        const setDis = () => {
            return new Promise((resolve) => {
                display.value = true
                setTimeout(() => {
                    display.value = false
                    resolve(display.value)
                }, 1300)
            })
        }
        return { display, setDis }
    }
})
</script>

<style scoped lang="scss">
.alert-message {
  min-width: 400px;
  width: 40%;
  left: calc(50vw - 20%);
  @media screen and (max-width: 400px) {
    left: 0;
  }
  @media screen and (max-width: 768px) {
    min-width: 80%;
    max-width: 80%;
    left: calc(50vw - 40%);
  }
}
</style>
