<template>
    <div>
        <Alert-Message :message="alertMessage" type="error" ref="alertRef"/>
        <Alert-Message :message="successMessage" type="success" ref="successRef"/>

        <div class="mx-auto mt-6 bg-white rounded-lg w-[90%] md:w-3/5 lg:w-1/2 box-border">
            <div class="head py-5 px-6 items-center border-y-[0.01rem]">
                <h1 class="text-xl text-left font-bold">个人设置</h1>
                <div class="mt-1 text-sm text-left text-gray-500">头像设置/账号信息设置</div>
            </div>
            <div class="head py-5 px-6 items-center border-y-[0.01rem]">
                <!-- <h1 class="text-base text-left font-bold mb-2">头像设置</h1> -->
                <div>
                    <el-upload
                        class="avatar-uploader"
                        :show-file-list="false"
                        action=""
                        :auto-upload="false"
                        accept=".jpg, .jpeg, .png"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :on-change="onChange"
                        :on-exceed="handleExceed"
                        :limit="1"
                        ref="upload_img">
                            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                            <el-avatar
                                :size="102"
                                class="cursor-pointer"
                                v-if="imageUrl"
                                :src="imageUrl"></el-avatar>
                            <el-avatar
                                :size="102"
                                class="cursor-pointer"
                                v-else> user </el-avatar>
                    </el-upload>
                </div>

                
                <!-- <div class="relative block h-5">
                    <div class="absolute top-0 left-[40%]">
                        <button
                            class="border border-gray-700 rounded-lg h-5 py-0 px-2 text-xs min-w-min ml-2 text-gray-700"
                            @click="cancel">取消</button>
                        <button
                            class="border border-orange-400 rounded-lg h-5 py-0 px-2 text-xs min-w-min ml-2 text-orange-400"
                            @click="save">保存</button>
                    </div>
                </div> -->

                <!-- 昵称+简介设置 -->
                <div class="mt-6 mr-6 ml-[-30px] md:ml-0">
                    <el-form
                    label-width="100px"
                    :model="formLabelAlign"
                    >
                        <el-form-item label="昵称">
                            <div class="w-[100%] ">
                                <el-input v-model="formLabelAlign.name" @input="focusName"/>
                                <div class="relative mt-2 text-left ">
                                    <span class="text-xs align-top text-gray-400">4～30个字符，支持中英文、数字</span>
                                    <div class="absolute right-0 top-0" v-show="visible.name">
                                        <button
                                            class="border border-gray-700 rounded-lg h-5 py-0 px-2 text-xs min-w-min ml-2 text-gray-700"
                                            @click="cancelName">取消</button>
                                        <button
                                            class="border border-orange-400 rounded-lg h-5 py-0 px-2 text-xs min-w-min ml-2 text-orange-400"
                                            @click="saveName">保存</button>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                        
                      
                        <el-form-item label="简介">
                            <div class="w-[100%] ">
                                <el-input v-model="formLabelAlign.info" @input="focusInfo"/>
                                <div class="relative mt-2 text-left text-gray-400">
                                    <span class="text-xs align-top">1～140个字符</span>
                                    <div class="absolute right-0 top-0" v-show="visible.info">
                                        <button
                                            class="border border-gray-700 rounded-lg h-5 py-0 px-2 text-xs min-w-min ml-2 text-gray-700"
                                            @click="cancelIntroduction">取消</button>
                                        <button
                                            class="border border-orange-400 rounded-lg h-5 py-0 px-2 text-xs min-w-min ml-2 text-orange-400"
                                            @click="saveIntroduction">保存</button>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <!-- 密码设置 -->
            <div class="head py-5 px-6 border-y-[0.01rem]">

                <!-- 初始密码设置 -->
                <div class="flex items-center justify-center">
                    <div class="w-[92%]">
                        <h3 class="text-left text-base">密码</h3>
                        <div class="mt-1 text-left text-gray-500 text-sm">未设置</div>
                    </div>
                    <div class="ml-4">
                        <button class="h-auto text-blue-600 bg-transparent text-sm
                            cursor-pointer text-center w-10"
                            @click="changePasswordVisible">{{passwordVisible ? '收起' : '编辑'}}</button>
                    </div>
                </div>

                <!-- 展开：重置密码 -->
                <div v-if="passwordVisible">
                    <!-- 密码表单 -->
                    <el-form
                        label-width="0"
                        :model="formPassword"
                        size="large"
                        class="mt-6"
                    >
                        <el-form-item>
                            <div class="w-[65%] lg:w-[60%]">
                                <el-input v-model="formPassword.firstPsw" placeholder="输入新密码"/>
                            </div>
                            <div class="ml-3 text-gray-400">
                                8 位以上数字和字母
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="w-[65%] lg:w-[60%] ">
                                <el-input v-model="formPassword.secondPsw" placeholder="再次输入新密码"/>
                            </div>
                        </el-form-item>
                    </el-form>

                    <!-- 提交按钮 -->
                    <div class="relative h-10 w-full">
                        <button
                            type="button"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            class="absolute inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out
                            left-0 w-[65%] lg:w-[60%]"
                            @click="submitChangePsw"
                        >提交</button>
                    </div>
                </div>
            </div>

            <div class="head py-5 px-6 border-y-[0.01rem]">
                <div class="flex items-center justify-center">
                    <div class="w-[92%]">
                        <h3 class="text-left text-base">绑定手机</h3>
                        <div class="mt-1 text-left text-gray-500 text-sm">+86191****0360</div>
                    </div>
                    <div class="ml-4">
                        <button class="h-auto text-blue-600 bg-transparent text-sm
                            cursor-pointer text-center w-10"
                            @click="changePhoneVisible">{{phoneVisible ? '收起' : '编辑'}}</button>
                    </div>
                </div>
                <!-- 编辑时渲染：绑定手机 -->
                <div v-if="phoneVisible">
                    <el-form
                        label-width="0"
                        :model="formPhone"
                        size="large"
                        class="mt-6"
                    >
                        <el-form-item>
                            <div class="w-[65%] lg:w-[60%]">
                                <el-input v-model="formPhone.number" placeholder="输入手机号"/>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="w-[65%] lg:w-[60%] flex">
                                <el-input v-model="formPhone.code" placeholder="验证码"/>
                                <button
                                    type="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    class="inline-block px-6 py-2.5 bg-blue-100 text-blue-400 font-medium text-xs tracking-widest leading-tight uppercase rounded hover:bg-blue-200 hover:shadow-lg 
                                    w-[140%] lg:w-[80%] ml-2"
                                >发送验证码</button>
                            </div>
                        </el-form-item>
                    </el-form>
                    <div class="relative h-10 w-full">
                        <button
                            type="button"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            class="absolute inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out
                            left-0 w-[65%] lg:w-[60%]"
                            :class="{ noInput: noInput }"
                        >提交</button>
                    </div>
                </div>
            </div>

            <div class="head py-5 px-6 border-y-[0.01rem]">
                <div class="flex items-center justify-center">
                    <div class="w-[92%]">
                        <h3 class="text-left text-base">绑定邮箱</h3>
                        <div class="mt-1 text-left text-gray-500 text-sm">{{currentUserName}}</div>
                    </div>
                    <div class="ml-4">
                        <button class="h-auto text-blue-600 bg-transparent text-sm
                            cursor-pointer text-center w-10"
                            @click="changeEmailVisible">{{emailVisible ? '收起' : '编辑'}}</button>
                    </div>
                </div>
                <!-- 编辑时渲染：改绑邮箱 -->
                <div v-if="emailVisible">
                    <el-form
                        label-width="0"
                        :model="formEmail"
                        size="large"
                        class="mt-6"
                    >
                        <el-form-item>
                            <div class="w-[65%] lg:w-[60%]">
                                <el-input v-model="formEmail.email" placeholder="输入新邮箱"/>
                            </div>
                        </el-form-item>
                        <el-form-item>
                            <div class="w-[65%] lg:w-[60%] flex">
                                <el-input v-model="formEmail.code" placeholder="验证码"/>
                                <button
                                    type="button"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                    class="inline-block px-6 py-2.5 bg-blue-100 text-blue-400 font-medium text-xs tracking-widest leading-tight uppercase rounded hover:bg-blue-200 hover:shadow-lg 
                                    w-[140%] lg:w-[80%] ml-2"
                                >发送验证码</button>
                            </div>
                        </el-form-item>
                    </el-form>
                    <div class="relative h-10 w-full">
                        <button
                            type="button"
                            data-mdb-ripple="true"
                            data-mdb-ripple-color="light"
                            class="absolute inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out
                            left-0 w-[65%] lg:w-[60%]"
                            :class="{ noInput: noInput1 }"
                        >提交</button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { reactive, ref, onBeforeMount, watch, computed } from "vue-demi"
import { genFileId } from 'element-plus'
import type { UploadProps, UploadRawFile } from 'element-plus'

import Axios from '../../plugins/axios'
import AlertMessage from '../../components/AlertMessage.vue'
const store = useStore()
const router = useRouter()

interface UserInformation {
    user_name: string,
    nick_name: string,
    user_info: string,
    is_admin?: number | Boolean,
    id?: number
}
interface UserForm {
    name?: string,
    info?: string
}
interface ButtonVisible {
    name: Boolean,
    info: Boolean
}

// 当前user_name
const currentUserName = computed(() => {
    const str: string = getUserName()
    return `${str.substr(0, 3)}****${str.substr(7)}`
})

const imageUrl = ref<string>('')
const upload_img = ref()

const formLabelAlign: UserForm = reactive<UserForm>({
    name: '',
    info: ''
})

// 页面加载完成前获取个人信息
onBeforeMount(async() => {
    const userName: string = JSON.parse(localStorage.getItem('user') as string).user_name
    const res = await Axios.get('/information?user_name=' + userName)
    // @ts-ignore
    if (res.success) {
        // @ts-ignore
        const userInfo: UserInformation = res.success.result
        formLabelAlign.name = userInfo.nick_name ? userInfo.nick_name : ''
        formLabelAlign.info = userInfo.user_info ? userInfo.user_info : ''
    }
})

// alert-message组件
const alertRef = ref<any>(null)
const successRef = ref<any>(null)
const alertMessage = ref<string>('')
const successMessage = ref<string>('')

// 文件上传成功的钩子
const handleAvatarSuccess = (res, file) => {
    imageUrl.value = 'cdn测试域名' + res.key;
    console.log('imageUrl', imageUrl.value)
}
// 判断图片格式的钩子
const beforeAvatarUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
        console.log('上传头像图片只能是 JPG 格式!');
    }
    if (!isLt2M) {
        console.log('上传头像图片大小不能超过 2MB!');
    }
    return isJPG && isLt2M;
}

// fileList改变时触发钩子
let flag = 0
const onChange = async (file, fileList) => {
    flag++
    if (flag % 2 !== 0) {
        if (!beforeAvatarUpload(file.raw)) {
            alertMessage.value = '上传头像的格式错误!'
            await alertRef.value.setDis()
            return
        }
        const res = await getBase64(file.raw)
        // base64编码转成二进制
        // @ts-ignore
        var arr = res.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        var obj = new Blob([u8arr], {type:mime});
        var fd = new FormData();
        fd.append('user_image', obj, 'image.png')

        const userName = JSON.parse(localStorage.getItem('user') as string).user_name
        fd.append('user_name', userName)
        
        const resp = await Axios.post('/image', fd)
        console.log('uploading', resp, obj)
        // 初始化imageUrl
        imageUrl.value = ''
        try {
            // @ts-ignore
            if (resp.success) {
                successMessage.value = '头像修改成功!'
                await successRef.value.setDis()
                // @ts-ignore
                const filePath = `D:/GitHub/project/covid_maga/server/src/uploads/${resp.success.result.file_path}`
                imageUrl.value = filePath
            }
        } catch (error) {
            console.log('error')    
        }
    }
    // console.log('changed', file, fileList, flag)
}

// 只允许有一张照片
const handleExceed: UploadProps['onExceed'] = (files) => {
  upload_img.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload_img.value!.handleStart(file)
}


// 当输入框获得鼠标点击事件时更新该组件
// 是否展示保存和取消按钮
const visible: ButtonVisible = reactive<ButtonVisible>({
    name: false,
    info: false
})
const focusName = () => {
    visible.name = true
}
const focusInfo = () => {
    visible.info = true
}


// 修改昵称
const cancelName = () => {
    formLabelAlign.name = ''
}

const saveName = async () => {
    if (!formLabelAlign.name) {
        alertMessage.value = '请输入正确的昵称!'
        await alertRef.value.setDis()
        return
    }
    try {
        if (formLabelAlign.name.length < 4 || formLabelAlign.name.length > 30) {
            alertMessage.value = '昵称在4-30个字符长度之间!'
            await alertRef.value.setDis()
            return
        }
    } catch (error) {
        console.error(error)   
    }
    const formData: FormData = new FormData()
    const userName: string = JSON.parse(localStorage.getItem('user') as string).user_name
    const nickName: string = formLabelAlign.name
    formData.append('nick_name', nickName)
    formData.append('user_name', userName)

    const res = await Axios.patch('/information', formData)
    // @ts-ignore
    if (res.success) {
        successMessage.value = '昵称修改成功!'
        afterChangeInfo({ nick_name: nickName })
        await successRef.value.setDis()
    } else {
        alertMessage.value = '网络异常...修改失败!'
        await alertRef.value.setDis()
    }
}

// 修改简介
const cancelIntroduction = () => {
    formLabelAlign.info = ''
}

const saveIntroduction = async () => {
    if (!formLabelAlign.info) {
        alertMessage.value = '请输入正确的简介!'
        await alertRef.value.setDis()
        return
    }
    try {
        if (formLabelAlign.info.length < 1 || formLabelAlign.info.length > 140) {
            alertMessage.value = '简介在1-140个字符长度之间!'
            await alertRef.value.setDis()
            return
        }
    } catch (error) {
        console.error(error)   
    }
    const formData: FormData = new FormData()
    const userName: string = JSON.parse(localStorage.getItem('user') as string).user_name
    const userInfo: string = formLabelAlign.info
    formData.append('nick_name', userInfo)
    formData.append('user_name', userName)

    const res = await Axios.patch('/information', formData)
    // @ts-ignore
    if (res.success) {
        successMessage.value = '简介修改成功!'
        afterChangeInfo({ user_info: userInfo })
        await successRef.value.setDis()
    } else {
        alertMessage.value = '网络异常...修改失败!'
        await alertRef.value.setDis()
    }
}

interface changeInfo {
    nick_name?: string,
    user_info?: string
}
// 修改完成之后要修改localStorage中的数据
const afterChangeInfo = (data: changeInfo) => {
    const userInfo: UserInformation = JSON.parse(localStorage.getItem('user') as string)
    if (data.nick_name) {
        userInfo.nick_name = data.nick_name
    }
    if (data.user_info) {
        userInfo.user_info = data.user_info
    }
    localStorage.setItem('user', JSON.stringify(userInfo))
}

// base编码
const getBase64 = (file) => {
    return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult: string | ArrayBuffer | null = ''
        reader.readAsDataURL(file);
        reader.onload = function () {
            imgResult = reader.result;
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.onloadend = function () {
            resolve(imgResult);
        };
    });
}

// token
const token: string = localStorage.getItem('token') as string
const getUserName = () => {
    return JSON.parse(localStorage.getItem('user') as string).user_name
}

/* 重置密码 */
interface PasswordForm {
    firstPsw?: string,
    secondPsw?: string
}
const formPassword: PasswordForm = reactive<PasswordForm>({
    firstPsw: '',
    secondPsw: ''
})
// 输入框是否可见
const passwordVisible = ref<Boolean>(false)
const changePasswordVisible = () => {
    passwordVisible.value = !passwordVisible.value
}

const submitChangePsw = async () => {
    if (formPassword.firstPsw && formPassword.firstPsw === formPassword.secondPsw && formPassword.firstPsw.length >= 8) {
        const formData = new FormData()
        const userName = getUserName()
        formData.append('token', token)
        formData.append('user_name', userName)
        formData.append('new_password', formPassword.firstPsw)
        const res = await Axios.patch('/passwd', formData)
        console.log('psw', res);
        // @ts-ignore
        if (res.success) {
            successMessage.value = '密码修改成功！请重新登录...'
            await successRef.value.setDis()
            store.commit('removeToken')
            localStorage.removeItem('user')
            router.replace('/')
        }
    }
}

interface PhoneForm {
    number?: string,
    code?: string
}
const formPhone: PhoneForm = reactive<PhoneForm>({
    number: '',
    code: ''
})
// 监听按钮样式
const noInput = ref<Boolean>(true)
watch(formPhone, (newValue: PhoneForm) => {
    if (newValue.number && (newValue.code as string).length === 4) {
        noInput.value = false
    } else {
        noInput.value = true
    }
})
// 输入框是否可见
const phoneVisible = ref<Boolean>(false)
const changePhoneVisible = () => {
    phoneVisible.value = !phoneVisible.value
}

// 邮箱功能
interface EmailForm {
    email?: string,
    code?: string
}
const formEmail: EmailForm = reactive<EmailForm>({
    email: '',
    code: ''
})
const emailVisible = ref<Boolean>(false)
const changeEmailVisible = () => {
    emailVisible.value = !emailVisible.value
}
const noInput1 = ref<Boolean>(true)
watch(formEmail, (newValue: EmailForm) => {
    if (newValue.email && (newValue.code as string).length === 4) {
        noInput1.value = false
    } else {
        noInput1.value = true
    }
})


</script>

<style lang="scss" scoped>
.head {
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
    // font-size: 15px;
    color: #121212;
    font-size: 19px;
}

.noInput {
    color: #fff !important;
    background-color: rgb(161, 196, 250) !important;
}

:deep(.el-form-item__label) {
    padding: 0 25px 0 0;
}


:deep(.el-form-item__content) {
    line-height: 16px;
}

:deep(.el-input__inner) {
    background-color: rgb(240, 241, 244);
    border-radius: 8px;
}

:deep(.el-form-item) {
    margin-bottom: 15px;
}
</style>
