<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <!-- <el-breadcrumb-item :to="{ path: '/home' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item>promotion management</el-breadcrumb-item>
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item> -->

    <el-breadcrumb-item
      v-for="(item, index) in currentNavigation"
      :to="{ path: item.path }"
      :key="index">{{ item.name }}
    </el-breadcrumb-item>

  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { ref, watch } from 'vue';
import { RouteLocationMatched, useRouter } from 'vue-router'

const router = useRouter()
const currentNavigation = ref<Array<RouteLocationMatched>>([])
const initBreadcrumbList = () => {
  currentNavigation.value = router.currentRoute.value.matched
  // 当前路由的完整路由表
  // console.log(router.currentRoute.value.matched)
}

watch(() => router.currentRoute.value.matched, initBreadcrumbList)
</script>