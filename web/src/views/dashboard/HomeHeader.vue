<template>
    <div class="flex justify-between items-center mt-1 mx-3">
        <bread-crumb />
        <user-info />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue-demi'

import BreadCrumb from './components/BreadCrumb.vue'
import UserInfo from './components/UserInfo.vue'

export default defineComponent({
    components: { BreadCrumb, UserInfo },
    setup() {
        
    },
})
</script>
