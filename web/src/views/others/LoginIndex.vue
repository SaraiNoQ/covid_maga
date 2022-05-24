<template>
    <div>
        <AlertMessage :message="errorInfo" type="error" ref="errorRef"/>
        <div class="flex justify-center items-center mt-[15vh]">
            <div class="m-5">
              <div class="block p-6 rounded-lg shadow-lg bg-white w-[80vw] max-w-md">
                <form>
                  <div class="form-group mb-6 block md:flex" @keyup.enter="login">
                    <label for="exampleInputEmail2" class="form-label inline-block mb-2 w-12 my-auto ml-2 mr-6 text-gray-700">账 号</label>
                    <input type="email" class="form-control
                      block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputEmail2"
                      aria-describedby="emailHelp" placeholder="Enter email"
                      v-model="loginForm.username">
                  </div>
                  <div class="form-group mb-6 block md:flex ">
                    <label for="exampleInputPassword2" class="form-label inline-block mb-2 w-12 my-auto ml-2 mr-6 text-gray-700">密 码</label>
                    <input type="password" class="form-control block
                      w-full
                      px-3
                      py-1.5
                      text-base
                      font-normal
                      text-gray-700
                      bg-white bg-clip-padding
                      border border-solid border-gray-300
                      rounded
                      transition
                      ease-in-out
                      m-0
                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInputPassword2"
                      placeholder="Password"
                      v-model="loginForm.password">
                  </div>
                  <div class="flex justify-between items-center mb-6">
                    <div class="form-group form-check">
                      <input type="checkbox"
                        class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        id="exampleCheck2">
                      <label class="form-check-label inline-block text-gray-800 text-sm" for="exampleCheck2">记住我</label>
                    </div>
                    <a href="#!"
                      class="text-sm text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">忘记密码?</a>
                  </div>
                  <button type="submit" class="
                    w-full
                    px-6
                    py-2.5
                    bg-blue-600
                    text-white
                    font-medium
                    text-base
                    leading-tight
                    uppercase
                    rounded
                    shadow-md
                    hover:bg-blue-700 hover:shadow-lg
                    focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                    active:bg-blue-800 active:shadow-lg
                    transition
                    duration-150
                    ease-in-out"
                    @click.prevent="login"
                    v-if="!isLoading"
                    >登  陆</button>
                    <div v-else class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                </form>
              </div>
            </div>
        </div>
    </div>
    
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue-demi"
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Axios from '../../plugins/axios'

import AlertMessage from '../../components/AlertMessage.vue'

const router = useRouter()
const store = useStore()

const isLoading = ref<Boolean>(false)

interface LoginState {
  username: string
  password: string
}

const loginForm = reactive<LoginState>({
  username: '',
  password: '',
})
const errorRef = ref<any>(null)
const errorInfo = ref<string>('')
const login = async () => {
    isLoading.value = true
    const formData = new FormData()
    formData.append('user_name', loginForm.username)
    formData.append('password', loginForm.password)
    const res = await Axios.post('/login', formData)
    // @ts-ignore
    if (res.success) {
        // @ts-ignore
        const rs = res.success.result
        // 设置token和个人信息
        store.commit('setToken', rs.token)
        // logout时要删掉
        localStorage.setItem('student', JSON.stringify(rs.res))
        router.replace('/output/card')
    } else {
        // @ts-ignore
        errorInfo.value = res.error.data.message ? res.error.data.message : 'login fail! Please check your email or password!'
        isLoading.value = false
        await errorRef.value.setDis()
    }
}
</script>
