<template>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  data () {
    return {
      //
    }
  },
})
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
/**修改全局的滚动条*/
/**滚动条的宽度*/
::-webkit-scrollbar {
    width: 5px;/*竖向*/
    height: 5px;/*横向*/
}

/*滚动条的滑块*/
::-webkit-scrollbar-thumb {
    background-color: rgb(35, 157, 47);
    border-radius: 3px;
    cursor: pointer;
}
</style>
