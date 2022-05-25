<template>
    <div>
        <!-- Navbar -->
        <nav class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
          <div class="px-6 w-full flex flex-wrap items-center justify-between">
            <div class="flex items-center">
              <button
                class="navbar-toggler border-0 py-3 lg:hidden leading-none text-xl bg-transparent text-gray-600 hover:text-gray-700 focus:text-gray-700 transition-shadow duration-150 ease-in-out mr-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContentY"
                aria-controls="navbarSupportedContentY"
                aria-expanded="false"
                aria-label="Toggle navigation"
                @click="clickHeader"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  class="w-5"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                  ></path>
                </svg>
              </button>
            </div>
            <div class="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
              <ul class="navbar-nav mr-auto lg:flex lg:flex-row">
                <li class="nav-item">
                  <a class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">首页</a>
                </li>
                <!-- <li class="nav-item">
                  <a class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">Features</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">Pricing</a>
                </li> -->
                <li class="nav-item mb-2 lg:mb-0">
                  <a class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">关于</a>
                </li>
              </ul>
            </div>
            <div class="hover:cursor-pointer mr-4" v-if="displayIcon">
                <el-dropdown trigger="click" @command="handleCommand">
                  <span class="flex items-center">
                    <p class="mr-2">{{ userName }}</p>
                    <el-avatar :size="40"> user </el-avatar>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item command="user">User</el-dropdown-item>
                      <el-dropdown-item divided command="logout">Log out</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
          </div>
        </nav>
        <!-- Navbar -->
    </div>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue-demi'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const router = useRouter()
const store = useStore()

const userName: string = (JSON.parse(localStorage.getItem('student') as string)).nick_name

const emits = defineEmits([
  'setAlert'
])
const handleCommand = async (command: string | number | object) => {
    if (command === 'logout') {
        setTimeout(() => {
            store.commit('removeStuToken')
            localStorage.removeItem('student')
            router.replace('/login/output')
        }, 1000)
        emits('setAlert', '正 在 登 出...')
    }
    if (command === 'user') {
        console.log('user')
    }
}

const displayIcon = ref(true)
const clickHeader = () => {
    displayIcon.value = !displayIcon.value
}
</script>
