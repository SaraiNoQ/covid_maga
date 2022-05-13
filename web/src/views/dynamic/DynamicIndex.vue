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
  <div class="flex">
    <div class="content"></div>
    <div class="world">
      <World skybox="bg.png">
        <div class="absolute right-2 bottom-2">
          <Model
            src="animeGril.fbx"
            :scale="5"
            toon 
            :animations="{
              idle: 'Idle.fbx',
              waving: 'Waving.fbx',
              dancing: 'Dancing.fbx'
            }"
            :animation="animation"
          />
        </div>
      </World>
      <button class="button" @click="toDancing" @mouseover="mouseOver" @mouseout="mouseOut"></button>
    </div>
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

.world {
  background-color: transparent !important;
}

.content {
  min-width: 80vw;
  min-height: 90vh;
}
</style>