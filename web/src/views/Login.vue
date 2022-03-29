<template>
    <!-- <div class="absolute top-4 bg-red-100 rounded-lg py-5 px-6 mb-3 text-base text-red-700 scale-0
      inline-flex items-center justify-center alert-message" role="alert"
      :class=" {'transition-all duration-400 transform-gpu scale-100 ease-out': loginFail } ">
      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="w-4 h-4 mr-2 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path>
      </svg>
      A simple danger alert - check it out! 
    </div> -->
    <alert-message message="login fail! Please check your email or password." type="error" ref="alertRef"/>
    <alert-message message="Login success! Please waiting..." type="success" ref="successRef"/>
    <section class="h-screen">
      
      <div class="px-6 h-full text-gray-800">
        <div
          class="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6"
        >
          <div
            class="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0"
          >
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              class="w-full"
              alt="Sample image"
            />
          </div>
          <div class="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
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
                  />
                  <label class="form-check-label inline-block text-gray-800" for="exampleCheck2"
                    >Remember me</label
                  >
                </div>
                <a href="#!" class="text-gray-800">Forgot password?</a>
              </div>
    
              <div class="text-center lg:text-left">
                <button
                  type="button"
                  class="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  @click="submitLogin()"
                >
                  Login
                </button>
                <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <a
                    href="#!"
                    class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >Register</a
                  >
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import useValidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

import AlertMessage from '../components/AlertMessage.vue'

export default defineComponent({
    components: {AlertMessage},
    setup() {
      const router = useRouter()
      const state = reactive({
          email: '',
          password: ''
      })

      // 使用computed使得validation组件获得动态响应的值
      const rules = computed(() => {
        return {
          email: { required, email },
          password: { required, minLength: minLength(6) }
        }
      })

      const v$ = useValidate(rules, state)

      const alertRef = ref<any>(null)
      const successRef = ref<any>(null)
      const clickLogin = async () => {
        successRef.value.setDis()
        setTimeout(() => {   
          router.push('/home')
        },1000)
      }
      return {state,
        v$,
        alertRef,
        successRef,
        clickLogin,
      }
    },
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
