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
import { ref, watch } from 'vue-demi';
import { useRouter } from 'vue-router'

const router = useRouter()
const currentNavigation = ref<Array<any>>([])
const initBreadcrumbList = () => {
  currentNavigation.value = router.currentRoute.value.matched
  // 当前路由的完整路由表
  // console.log('routerArr', router.currentRoute.value.matched)
}
if (currentNavigation.value.length === 0) {
  // 未获取到路由则直接调用当前路由
  const arr = router.currentRoute.value.fullPath.split('/').filter(item => item !== '')
  arr.forEach((e) => {
    // console.log('e', e.substring(0, 4));
    currentNavigation.value.push({
      name: e,
      path: e.substring(0, 4) === 'home' ? '/home' : `/home/${e}`
    })
  })
  // currentNavigation.value = router.currentRoute.value.fullPath.split('/').filter(item => item !== '')
}

watch(() => router.currentRoute.value.matched, initBreadcrumbList)
</script>