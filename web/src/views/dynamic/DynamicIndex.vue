<script setup lang="ts">
import { World, Model } from "lingo3d-vue"
import { ref } from "vue-demi";
const animation = ref('waving')
const flag = ref(false)

const toDancing = () => {
  animation.value = 'dancing'
  flag.value = !flag.value
}
const mouseOver = () => {
  if (!flag.value) {
    animation.value = 'idle'
  }
}
const mouseOut = () => {
  if (!flag.value) {
    animation.value = 'waving'
  }
}
</script>

<template>
  <div>
    <World skybox="gs.jpg">
      <Model
        src="animeGril.fbx"
        :scale="6"
        toon 
        :animations="{
          idle: 'Idle.fbx',
          waving: 'Waving.fbx',
          dancing: 'Dancing.fbx'
        }"
        :animation="animation"
        />
    </World>
    <button class="button" @click="toDancing" @mouseover="mouseOver" @mouseout="mouseOut"></button>
  </div>
</template>

<style lang="scss" scoped>
.button {
  z-index: 50;
  position: absolute;
  left: 45%;
  top: 25%;
  min-width: 150px;
  min-height: 250px;
  display: block;
}
</style>