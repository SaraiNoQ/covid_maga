<template>
    <div>
        <!-- alert -->
        <alert-message :message="regist.fail" type="error" ref="errorRef"/>
        <!-- <alert-message :message="regist.success" type="success" ref="successRef"/> -->
        <section class="h-full gradient-form bg-gray-200 md:h-screen">
          <div class="container py-12 px-6 h-full mx-auto">
            <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
              <div class="xl:w-10/12">
                  <div class="block bg-white shadow-lg rounded-lg">
                  <div class="lg:flex lg:flex-wrap g-0">
                      <div class="lg:w-6/12 px-4 md:px-0">
                      <div class="p-12 md:mx-6">
                          <div class="text-center">
                              <img
                                  class="mx-auto h-10 w-48 md:w-64 md:h-14"
                                  src="@/icons/img/logo.png"
                                  alt="logo"
                              />
                              <h4 class="font-serif text-xl md:text-2xl font-semibold tracking-wider text-sky-600 mb-6 mt-2 pb-1">Create your Own Account</h4>
                          </div>
                          <form>
                              <div class="mb-4">
                                  <div class="form-floating xl:w-108">
                                      <input v-model="state.nickName" type="text" class="form-control
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
                                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                      :class="{'border-red-600': v$.nickName.$error}" id="floatingInput" placeholder="name@example.com">
                                      <label for="floatingInput" class="text-gray-700">Nickname</label>
                                  </div>
                              </div>
                              <div class="mb-4">
                                  <div class="form-floating xl:w-108">
                                      <input v-model="state.account" type="email" class="form-control
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
                                      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                      :class="{'border-red-600': v$.account.$error}" id="floatingInput" placeholder="name@example.com">
                                      <label for="floatingInput" class="text-gray-700">Account</label>
                                  </div>
                                  <div class="text-gray-500 flex ml-2.5 mt-1 text-xs" :class="{'text-red-600': v$.account.$error}">Please use your email</div>
                              </div>
                              <div class="mb-4">
                                  <div class="flex mb-[-8px]">
                                      <div class="form-floating mr-2 xl:w-96">
                                          <input v-model="state.password" :type="passwdType" class="form-control
                                          block
                                          w-full
                                          px-3
                                          text-base
                                          font-normal
                                          text-gray-700
                                          bg-white bg-clip-padding
                                          border border-solid border-gray-300
                                          rounded
                                          transition
                                          ease-in-out
                                          m-0
                                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                          :class="{'border-red-600': v$.password.$error}" id="floatingInput" placeholder="name@example.com">
                                          <label for="floatingInput" class="text-gray-700">Password</label>
                                      </div>

                                      <div class="form-floating mb-3 xl:w-96">
                                          <input v-model="state.confirm" :type="passwdType" class="form-control
                                          block
                                          w-full
                                          px-3
                                          text-base
                                          font-normal
                                          text-gray-700
                                          bg-white bg-clip-padding
                                          border border-solid border-gray-300
                                          rounded
                                          transition
                                          ease-in-out
                                          m-0
                                          focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                          :class="{'border-red-600': v$.confirm.$error}" id="floatingInput" placeholder="name@example.com">
                                          <label for="floatingInput" class="text-gray-700">Confirm</label>
                                      </div>
                                  </div>
                                  <div class="text-gray-500 ml-2.5 flex text-xs" :class="{'text-red-600': v$.password.$error && v$.confirm.$error}">Use 8 or more characters</div>
                              </div>

                              <!-- show password -->
                              <div class="form-check form-check-inline float-left mb-8">
                                  <input class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                      type="checkbox"
                                      id="inlineCheckbox1"
                                      :value="option1"
                                      @click="changeCheck">
                                  <label class="form-check-label inline-block text-gray-800" for="inlineCheckbox1">Show password</label>
                              </div>

                              <div class="text-center pt-1 pb-1 clear-left">
                                  <div class="flex justify-between items-center">
                                      <button type="button" class="inline-block h-12 px-6 py-1 mr-2 text-blue-600 text-sm font-medium m-[-16px]
                                      tracking-widest rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
                                      @click="router.push('/')"
                                      >Sign in instead</button>

                                      <button
                                      class="w-20 px-6 py-2 text-white font-semibold text-sm leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                                      type="button"
                                      data-mdb-ripple="true"
                                      data-mdb-ripple-color="light"
                                      style="background: linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593);"
                                      @click="submitNext"
                                      >
                                      Next
                                      </button>
                                  </div>
                                  <!-- <a class="text-gray-500" href="#!">Forgot password?</a> -->
                              </div>
                          </form>
                      </div>
                      </div>
                      <div
                      class="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                      style="background-color: #4158D0;
                      background-image: -webkit-linear-gradient(135deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
                      background-image: -moz-linear-gradient(135deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
                      background-image: -o-linear-gradient(135deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);
                      background-image: linear-gradient(135deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%);"
                      >
                      <div class="text-white px-4 py-6 md:p-12 md:mx-6">
                          <h4 class="text-xl font-semibold mb-6">Welcome to my COVID_19 manage project</h4>
                          <p class="text-sm">
                          base on Koa.js and Vue.js!!!<br/>
                          You could learn more information on https://github.com/SaraiNoQ/covid_maga 
                          </p>
                      </div>
                      </div>
                  </div>
                  </div>
              </div>
            </div>
          </div>
        </section>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, getCurrentInstance, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

import useValidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'

import AlertMessage from '../components/AlertMessage.vue'
export default defineComponent({
    components: { AlertMessage },
    setup() {
        const router = useRouter()
        const store = useStore()

        const errorRef = ref<any>(null)
        const successRef = ref<any>(null)
        const regist = reactive({
            fail: 'Register Failed!',
            success: ''
        })

        const state = reactive({
          nickName: '',
          account: '',
          password: '',
          confirm: ''
        })
        const rules = computed(() => {
            return {
                nickName: { required },
                account: { required, email },
                password: { required, minLength: minLength(8) },
                confirm: { sameAs: sameAs(state.password) }
            }
        })
        const v$ = useValidate(rules, state)

        // 显示是否展示密码明文
        const option1 = ref<Boolean>(false)
        const changeCheck = () => {
            option1.value = !option1.value
        }
        const passwdType = computed(() => {
            if (option1.value) return 'text'
            else return 'password'
        })

        const registFail = (error) => {
            regist.fail = error.data.message
            errorRef.value.setDis()
        }
        
        // @ts-ignore
        const { proxy } = getCurrentInstance()
        const register = async () => {
            const formData = new FormData()
            
            formData.append('nick_name', state.nickName)
            formData.append('user_name', state.account)
            formData.append('password', state.password)
            // @ts-ignore
            const res = await proxy.$axios.post('/captcha', formData)
            // console.log('register:', res.success ? res.success : res.error);
            if (res.success) {
                store.commit('setRegister', {
                    nick_name: state.nickName,
                    user_name: state.account,
                    password: state.password
                })
                router.push('/register/vertify')
            } else {
                registFail(res.error)
            }
            
        }

        return {
            errorRef,
            successRef,
            regist,
            v$,
            passwdType,
            option1,
            changeCheck,
            router,
            state,
            register
        }
    },
    methods: {
        submitNext() {
            this.v$.$validate()
            if (!this.v$.$error) {
                this.register()
            }
        }
    }
})
</script>
