<template>
    <!-- <div>
        <section class="text-center md:text-left" style="background-image: url(https://mdbcdn.b-cdn.net/img/Photos/Others/background2.jpg)">
          <div class="flex justify-center">
            <div class="max-w-3xl">
              <div class="block p-6 rounded-lg shadow-lg bg-white m-4">
                <div class="md:flex md:flex-row">
                  <div
                    class="md:w-96 w-36 flex justify-center items-center mb-6 lg:mb-0 mx-auto md:mx-0"
                  >
                    <img
                      src="https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg"
                      class="rounded-full shadow-md"
                      alt="woman avatar"
                    />
                  </div>
                  <div class="md:ml-6">
                    <p class="text-gray-500 font-light mb-6">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id quam sapiente
                      molestiae numquam quas, voluptates omnis nulla ea odio quia similique corrupti
                      magnam.
                    </p>
                    <p class="font-semibold text-xl mb-2 text-gray-800">Anna Smith</p>
                    <p class="font-semibold text-gray-500 mb-0">Product manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    </div> -->
    <div class="bg-white m-4 h-80">
      <section class="mb-20 text-gray-700">
      <div class="text-center mt-6">
        <div class="mb-0">
          <div class="flex justify-center mb-6">
            <el-avatar
              :size="108"
              :src="formLabelAlign.user_image"
              v-if="formLabelAlign.user_image"></el-avatar>
            <el-avatar
              :size="108"
              v-else> user </el-avatar>
          </div>
          <h5 class="text-xl font-semibold mb-4">{{formLabelAlign.nick_name}}</h5>
          <h6 class="font-semibold text-blue-600 mb-4">{{formLabelAlign.is_admin ? 'You are admin' : 'You are user'}}</h6>
          <p class="mb-4">
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="quote-left"
              class="w-6 pr-2 inline-block"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M464 256h-80v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8c-88.4 0-160 71.6-160 160v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48zm-288 0H96v-64c0-35.3 28.7-64 64-64h8c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24h-8C71.6 32 0 103.6 0 192v240c0 26.5 21.5 48 48 48h128c26.5 0 48-21.5 48-48V304c0-26.5-21.5-48-48-48z"
              ></path></svg>{{formLabelAlign.user_info}}
          </p>
        </div>
      </div>
    </section>
    </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, reactive } from 'vue-demi'
import Axios from '../plugins/axios'

import httpAPI from '../plugins/port'

interface User {
  id?: number,
  nick_name?: string,
  user_account?: string,
  user_info?: string,
  is_admin?: boolean | number,
  user_name?: string,
  user_image?: string
}

// 页面加载完成前获取个人信息
const formLabelAlign: User = reactive({
  nick_name: '',
  user_info: '',
  is_admin: 0,
  user_image: ''
})
onBeforeMount(async() => {
    const userName: string = JSON.parse(localStorage.getItem('user') as string).user_name
    const res = await Axios.get('/information?user_name=' + userName)
    // @ts-ignore
    if (res.success) {
      // @ts-ignore
      const userInfo: User = res.success.result
      formLabelAlign.nick_name = userInfo.nick_name ? userInfo.nick_name : ''
      formLabelAlign.user_info = userInfo.user_info ? userInfo.user_info : ''

      // 设置头像
      const imageUrlPrefix: string = httpAPI.imageUrlPrefix
      formLabelAlign.user_image =  userInfo.user_image ? `${imageUrlPrefix}${userInfo.user_image}` : ''
      formLabelAlign.is_admin = userInfo.is_admin ? userInfo.is_admin : 0
      console.log('waiting for image', formLabelAlign)
    }
})
</script>

<style lang="scss" scoped>
</style>
