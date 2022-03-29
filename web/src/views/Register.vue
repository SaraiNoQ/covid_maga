<template>
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
                                <input type="text" class="form-control
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
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="floatingInput" placeholder="name@example.com">
                                <label for="floatingInput" class="text-gray-700">Nickname</label>
                            </div>
                        </div>
                        <div class="mb-4">
                            <div class="form-floating xl:w-108">
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
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="floatingInput" placeholder="name@example.com">
                                <label for="floatingInput" class="text-gray-700">Account</label>
                            </div>
                            <div class="text-gray-500 flex ml-2.5 mt-1 text-xs">Please use your email</div>
                        </div>
                        <div class="mb-4">
                            <div class="flex mb-[-8px]">
                                <div class="form-floating mr-2 xl:w-96">
                                    <input :type="passwdType" class="form-control
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
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="floatingInput" placeholder="name@example.com">
                                    <label for="floatingInput" class="text-gray-700">Password</label>
                                </div>
                                
                                <div class="form-floating mb-3 xl:w-96">
                                    <input :type="passwdType" class="form-control
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
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="floatingInput" placeholder="name@example.com">
                                    <label for="floatingInput" class="text-gray-700">Confirm</label>
                                </div>
                            </div>
                            <div class="text-gray-500 ml-2.5 flex text-xs">Use 8 or more characters</div>
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
                                >Sign in instead</button>

                                <button
                                class="w-20 px-6 py-2 text-white font-semibold text-sm leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out"
                                type="button"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                                style="background: linear-gradient(to right,#ee7724,#d8363a,#dd3675,#b44593);"
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
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        const option1 = ref<Boolean>(false)

        const changeCheck = () => {
            option1.value = !option1.value
            console.log(option1.value);
        }

        const passwdType = computed(() => {
            if (option1.value) return 'text'
            else return 'password'
        })
        return {
            passwdType,
            option1,
            changeCheck
        }
    },
})
</script>
