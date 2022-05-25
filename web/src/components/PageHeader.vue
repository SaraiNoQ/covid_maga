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
                  <a class="nav-link block pr-2 lg:px-2 py-2 text-gray-600
                  hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                    href="http://8.130.13.28/"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                  >首页</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link block pr-2 lg:px-2 py-2 text-gray-600
                  hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                  href="http://8.130.13.28/#/virus_report"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                  >动态</a>
                </li>
                <!-- <li class="nav-item">
                  <a class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">Pricing</a>
                </li> -->
                <li class="nav-item mb-2 lg:mb-0">
                  <a class="nav-link block pr-2 lg:px-2 py-2 text-gray-600 cursor-pointer
                  hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light"
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                  >关于</a>
                </li>

                <!-- Modal -->
                <div class="modal fade fixed top-0 left-0 hidden w-full h-full outline-none overflow-x-hidden overflow-y-auto"
                    id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog relative w-auto pointer-events-none">
                    <div
                        class="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
                        <div
                        class="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
                        <h5 class="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">关于打卡</h5>
                        <button type="button"
                            class="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                            data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body relative p-4">
                            打卡系统是一个基于Vue.js的简单的打卡系统，可以记录每天的打卡记录，并且可以查看所有的打卡记录。
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
              </ul>
            </div>
            <div class="hover:cursor-pointer mr-2" v-if="displayIcon">
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
  'setAlert',
  'setWarning'
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
        emits('setWarning', '该 功 能 还 在 开 发 中，敬 请 期 待！')
    }
}

const displayIcon = ref(true)
const clickHeader = () => {
    displayIcon.value = !displayIcon.value
}
</script>
