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


                <div class="mt-6 mr-6 ml-[-30px] md:ml-0">
                    <el-form
                    label-width="100px"
                    :model="formLabelAlign"
                    >
                        <el-form-item label="昵称">
                            <div class="w-[100%] ">
                                <el-input v-model="formLabelAlign.name" />
                                <div class="relative mt-2 text-left ">
                                    <span class="text-xs align-top text-gray-400">4～30个字符，支持中英文、数字</span>
                                    <div class="absolute right-0 top-0">
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
                                <el-input v-model="formLabelAlign.info" />
                                <div class="relative mt-2 text-left text-gray-400">
                                    <span class="text-xs align-top">1～140个字符</span>
                                    <div class="absolute right-0 top-0">
                                        <button class="border border-gray-700 rounded-lg h-5 py-0 px-2 text-xs min-w-min ml-2 text-gray-700">取消</button>
                                        <button class="border border-orange-400 rounded-lg h-5 py-0 px-2 text-xs min-w-min ml-2 text-orange-400">保存</button>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="head py-5 px-6 border-y-[0.01rem]
                flex items-center justify-center">
                <div class="w-[92%]">
                    <h3 class="text-left text-base">密码</h3>
                    <div class="mt-1 text-left text-gray-500 text-sm">未设置</div>
                </div>
                <div class="ml-4">
                    <button class="h-auto text-blue-600 bg-transparent text-sm
                        cursor-pointer text-center">编辑</button>
                </div>
            </div>
            <div class="head py-5 px-6 border-y-[0.01rem]
                flex items-center justify-center">
                <div class="w-[92%]">
                    <h3 class="text-left text-base">绑定手机</h3>
                    <div class="mt-1 text-left text-gray-500 text-sm">+86191****0360</div>
                </div>
                <div class="ml-4">
                    <button class="h-auto text-blue-600 bg-transparent text-sm
                        cursor-pointer text-center">编辑</button>
                </div>
            </div>
            <div class="head py-5 px-6 border-y-[0.01rem]
                flex items-center justify-center">
                <div class="w-[92%]">
                    <h3 class="text-left text-base">绑定邮箱</h3>
                    <div class="mt-1 text-left text-gray-500 text-sm">299******@qq.com</div>
                </div>
                <div class="ml-4">
                    <button class="h-auto text-blue-600 bg-transparent text-sm
                        cursor-pointer text-center">编辑</button>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script lang="ts" setup>
// import { defineComponent } from 'vue'
import { useStore } from 'vuex'
import { reactive, ref, onBeforeMount } from "vue-demi"
// import { onBeforeMount } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

import Axios from '../../plugins/axios'
import AlertMessage from '../../components/AlertMessage.vue';
const store = useStore()


interface UserInformation {
    user_name: string,
    nick_name: string,
    user_info: string,
    is_admin?: number
}
interface UserForm {
    name: string,
    info: string
}

const imageUrl = ref<string>('')
// const image = ref<UploadRawFile>()
const upload_img = ref()
const formLabelAlign: UserForm = reactive<UserForm>({
    name: '',
    info: ''
})
// 当输入框获得鼠标点击事件时更新该组件
// 是否展示保存和取消按钮
const nameVisible = ref<Boolean>(false)
const introductionVisible = ref<Boolean>(false)

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
    const formData: FormData = new FormData()
    const userName: string = JSON.parse(localStorage.getItem('user') as string).user_name
    formData.append('nick_name', formLabelAlign.name)
    formData.append('user_name', userName)

    const res = await Axios.patch('/information', formData)
    if (res.success) {
        successMessage.value = '昵称修改成功!'
        await successRef.value.setDis()
    } else {
        alertMessage.value = '网络异常...修改失败!'
        await alertRef.value.setDis()
    }
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
</script>

<style lang="scss" scoped>
.head {
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif;
    // font-size: 15px;
    color: #121212;
    font-size: 19px;
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
</style>
