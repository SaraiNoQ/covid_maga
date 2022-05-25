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
                        id="exampleCheck2"
                        :v-model="rememberMe"
                        @click="changeRememberMe"
                        :checked="rememberMe"
                      >
                      <label class="form-check-label inline-block text-gray-800 text-sm" for="exampleCheck2">记住我</label>
                    </div>
                    <button type="button" @click="forgetPasswd"
                      class="text-sm text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
                      data-bs-toggle="modal" data-bs-target="#exampleModal"
                    >忘记密码?</button>

                    <!-- Modal -->
                    <div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                      id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                      <div class="modal-dialog relative w-auto pointer-events-none">
                        <div
                          class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                          <div
                            class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                            <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">如何找回密码?</h5>
                            <button type="button"
                              class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                              data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body relative p-4">
                            你可以通过联系你的管理员来重置你的密码。
                          </div>
                          <div
                            class="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
                            <button type="button" class="px-6
                              py-2.5
                              bg-purple-600
                              text-white
                              font-medium
                              text-xs
                              leading-tight
                              uppercase
                              rounded
                              shadow-md
                              hover:bg-purple-700 hover:shadow-lg
                              focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0
                              active:bg-purple-800 active:shadow-lg
                              transition
                              duration-150
                              ease-in-out" data-bs-dismiss="modal">确 定</button>
                          </div>
                        </div>
                      </div>
                    </div>

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
import { onBeforeMount, reactive, ref } from "vue-demi"
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
const rememberMe = ref<boolean>(false)
const changeRememberMe = () => {
  rememberMe.value = !rememberMe.value
}
const login = async () => {
    isLoading.value = true
    const formData = new FormData()
    formData.append('user_name', loginForm.username)
    formData.append('password', loginForm.password)
    const res = await Axios.post('/normal/login', formData)
    // @ts-ignore
    if (res.success) {
      if (rememberMe.value) {
        localStorage.setItem('user_name_output', loginForm.username)
        localStorage.setItem('password_output', loginForm.password)
        localStorage.setItem('remember_output', 'true')
      } else {
        try {
          localStorage.removeItem('user_name_output')
          localStorage.removeItem('password_output')
          localStorage.removeItem('remember_output')
        } catch (error) {
          console.log(error)
        }
      }
      // @ts-ignore
      const rs = res.success.result
      // 设置token和个人信息
      store.commit('setStuToken', rs.token)
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

const forgetPasswd = () => {
  console.log('forget password')
}

onBeforeMount(async () => {
  const token = localStorage.getItem('token_output')
  if (token) {
    const fd = new FormData()
    fd.append('token', token)
    const res = await Axios.post('/token', fd)
    // @ts-ignore
    if (res.success) {
      // localStorage中设置student
      // @ts-ignore
      localStorage.setItem('student', JSON.stringify(res.success.res))
      router.replace('/output/card')
    }
  } else {
    const account = localStorage.getItem('user_name_output')
    const password = localStorage.getItem('password_output')
    const remember = localStorage.getItem('remember_output') === 'true'
    if (account && password) {
      loginForm.username = account
      loginForm.password = password
      rememberMe.value = remember
    }
  }
})
</script>
