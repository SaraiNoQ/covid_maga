<template>
  <div>
    <!-- 弹框提示 -->
    <alert-message :message="loginErrorInfo" type="error" ref="alertRef"/>
    <alert-message message="Login success! Please waiting..." type="success" ref="successRef"/>

    <!-- 忘记密码，已拆分成组件 -->
    <!-- <el-dialog v-model="dialogTableVisible" title="Reset Your Account">
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogTableVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogTableVisible = false"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog> -->

    <!-- 登陆界面 -->
    <section class="h-screen">
      <div class="px-6 h-full text-gray-800">
        <div
          class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
        >
          <div
            class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
          >
            <img
              src="../assets/login.webp"
              class="w-full"
              alt="Sample image"
            />
          </div>
          <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0" @keyup.enter="submitLogin()">
            <form>
              <div class="flex flex-row items-center justify-center lg:justify-start">
                <p class="text-lg mb-0 mr-4">Sign in with</p>
                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  class="inline-block p-3 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                >
                  <!-- QQ -->
                  <svg-icon name="qq-brands" viewBox="0 0 10 10" class="w-4 h-4"></svg-icon>
                </button>
    
                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  class="inline-block p-3 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                >
                <!-- 微信 -->
                  <svg-icon name="weixin-brands" viewBox="0 0 10 10"></svg-icon>
                </button>
    
                <button
                  type="button"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  class="inline-block p-3 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                >
                  <!-- Google -->
                  <svg-icon name="google-brands" viewBox="0 0 10 10"></svg-icon>
                </button>

                <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    class="inline-block p-3 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                    >
                    <!-- Apple -->
                    <svg-icon name="apple-brands" viewBox="0 0 10 10"></svg-icon>
                </button>

                <button
                    type="button"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    class="inline-block p-3 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mx-1"
                    @click="connectGithub"
                    >
                    <!-- Github -->
                    <svg-icon name="github-brands" viewBox="0 0 10 10"></svg-icon>
                </button>
              </div>
    
              <div
                class="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
              >
                <p class="text-center font-semibold mx-4 mb-0">Or</p>
              </div>
    
              <!-- Email input -->
              <div class="mb-6">
                <input
                  type="text"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Email address"
                  v-model="state.email"
                />
                <span v-if="v$.email.$error" class="float-left text-xs text-red-500 my-0.5 animate-pulse">
                    {{ v$.email.$errors[0].$message }}
                </span>
              </div>
    
              <!-- Password input -->
              <div class="mb-6">
                <input
                  type="password"
                  class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Password"
                  v-model="state.password"
                />
                <span v-if="v$.password.$error" class="float-left text-xs text-red-500 my-0.5 animate-pulse">
                    {{ v$.password.$errors[0].$message }}
                </span>
              </div>
    
              <div class="flex justify-between items-center mb-6">
                <div class="form-group form-check">
                  <input
                    type="checkbox"
                    class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="exampleCheck2"
                    :v-model="state.rememberMe"
                    @click="changeRememberMe"
                    :checked="state.rememberMe"
                  />
                  <label class="form-check-label inline-block text-gray-800" for="exampleCheck2"
                    >Remember me</label
                  >
                </div>
                <!-- <a href="#!" class="text-gray-800">Forgot password?</a> -->
                <forget-password/>
              </div>
    
              <div class="text-center lg:text-left">
                <button
                  type="button"
                  class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  @click="submitLogin()"
                  :class="{'cursor-not-allowed': loginDisabled}"
                  v-if="!isLoading"
                >
                  Login
                </button>
                <div v-else class="spinner-border animate-spin inline-block w-8 h-8 my-1 border-4 rounded-full" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
                <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <a
                    @click="gotoRegister"
                    class="text-red-600 hover:text-red-700 focus:text-red-700 cursor-pointer transition duration-200 ease-in-out"
                    >Register</a
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref, onBeforeMount, triggerRef } from 'vue-demi'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import useValidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import Axios from '../plugins/axios'

import AlertMessage from '../components/AlertMessage.vue'
import ForgetPassword from '../components/ForgetPassword.vue'

export default defineComponent({
    components: { AlertMessage, ForgetPassword },
    setup() {
      onBeforeMount(async () => {
        const token = localStorage.getItem('token')
        if (token) {
          const fd = new FormData()
          fd.append('token', token)
          const res = await Axios.post('/token', fd)
          // @ts-ignore
          if (res.success) {
            // localStorage中设置user
            // @ts-ignore
            localStorage.setItem('user', JSON.stringify(res.success.res))
            router.replace('/home')
          }
        } else {
          const account = localStorage.getItem('user_name')
          const password = localStorage.getItem('password')
          const remember = localStorage.getItem('remember') === 'true'
          if (account && password) {
            state.email = account
            state.password = password
            state.rememberMe = remember
          }
        }
      })
      // 注册vue-router和vuex
      const router = useRouter()
      const store = useStore()

      const state = reactive({
        email: '',
        password: '',
        rememberMe: false,
      })
      // 修改记住我
      const changeRememberMe = () => {
        state.rememberMe = !state.rememberMe
      }  

      // 使用computed使得validation组件获得动态响应的值
      const rules = computed(() => {
        return {
          email: { required, email },
          password: { required, minLength: minLength(6) }
        }
      })
      // 使用useValidate创建validation实例,负责验证输入格式是否正确
      const v$ = useValidate(rules, state)

      const alertRef = ref<any>(null)
      const successRef = ref<any>(null)
      const loginErrorInfo = ref<string>('login fail! Please check your email or password.')
      // @ts-ignore
      const loginDisabled = ref<Boolean>(false)
      // 加载动画
      const isLoading = ref<Boolean>(false)
      // 登陆方法
      const clickLogin = async () => {
        if (loginDisabled.value) { return }
        
        isLoading.value = true
        loginDisabled.value = true
        const formData = new FormData()
        formData.append('user_name', state.email)
        formData.append('password', state.password)
        const res = await Axios.post('/login', formData)
        // @ts-ignore
        if (res.success) {
          // remember me
          if (state.rememberMe) {
            localStorage.setItem('user_name', state.email)
            localStorage.setItem('password', state.password)
            localStorage.setItem('remember', 'true')
          } else {
            try {
              localStorage.removeItem('user_name')
              localStorage.removeItem('password')
              localStorage.removeItem('remember')
            } catch (error) {
              console.log(error)
            }
          }
          // 设置token和个人信息
          // @ts-ignore
          store.commit('setToken', res.success.result.token)
          // logout时要删掉
          // @ts-ignore
          localStorage.setItem('user', JSON.stringify(res.success.result.res))
          router.replace('/home')
        } else {
          // @ts-ignore
          loginErrorInfo.value = res.error.data.message ? res.error.data.message : 'login fail! Please check your email or password!'
          isLoading.value = false
          await alertRef.value.setDis()
        }
        loginDisabled.value = false
      }
      // const loginFail = () => {
      //   alertRef.value.setDis()
      // }

      // 跳转到注册页面
      const gotoRegister = () => {
        router.push('/register')
      }
      
      // 跳转到项目的github地址
      const connectGithub = () => {
        window.location.href = 'https://github.com/SaraiNoQ/covid_maga'
      }

      // 暴露给外部
      return {
        state,
        v$,
        alertRef,
        successRef,
        clickLogin,
        gotoRegister,
        loginErrorInfo,
        loginDisabled,
        connectGithub,
        isLoading,
        changeRememberMe
      }
    },
    // 提供给子组件使用的方法
    methods: {
      submitLogin () {
        this.v$.$validate()
        if (!this.v$.$error) {
          this.clickLogin()
        }
      }
    }
})
</script>

<style scoped>

</style>
