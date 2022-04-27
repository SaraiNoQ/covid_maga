<template>
<div>
  <alert-message :message="errorInfo" type="error" ref="alertRef"/>
  <alert-message message="录 入 成 功！" type="success" ref="successRef"/>
  <h2 class="mt-4 text-3xl text-green-600 font-semibold">学 生 信 息 录 入</h2>
    <div class="rg-shadow mt-2 w-[75vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] mx-auto bg-gray-200 pt-4 pr-12 pb-2">
        <el-form
          :model="form"
          label-width="120px"
          :rules="rules">
          <el-form-item label="Name" prop="name">
            <el-input v-model="form.name" />
          </el-form-item>
          
          <el-form-item label="Gender" prop="gender">
            <el-radio-group v-model="form.resource">
              <el-radio label="male" />
              <el-radio label="female" />
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Number" prop="number">
              <el-input v-model="form.number" />
          </el-form-item>

          <el-form-item label="Major" prop="major">
              <el-input v-model="form.major" />
          </el-form-item>

          <el-form-item label="Upload">
            <el-upload
              class="upload-demo"
              multiple
              ref="upload_img"
              action=""
              accept=".jpg, .jpeg, .png"
              :limit="1"
              :auto-upload="false"
              :on-exceed="handleExceed"
            >
                <template #trigger>
                  <el-button type="primary">select file</el-button>
                  <div class="text-red-500 ml-4 text-xs">
                    jpg/png files with a size less than 500KB.
                  </div>
                </template>
                <!-- <el-button class="ml-3" type="success" @click="submitUpload">
                  upload to server
                </el-button> -->
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="onSubmit" :loadong="buttonLoading">Create</el-button>
            <el-button @click="onReset">Reset</el-button>
          </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'
import Axios from '../../plugins/axios'

import AlertMessage from '../../components/AlertMessage.vue'

export default defineComponent({
  components: { AlertMessage },
  setup() {
    const form = reactive({
      name: '',
      resource: '',
      major: '',
      number: ''
    })

    // 表单输入验证
    const validateNumber = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('学号不能为空'))
      } else if (value.length !== 10) {
        callback(new Error('请输入正确的学号'))
      } else {
        callback()
      }
    }
    const validateName = (rule: any, value: any, callback: any) => {
      if (value.length < 2) {
        callback(new Error('请输入正确的姓名'))
      } else {
        callback()
      }
    }
    const rules = reactive({
      name: [{ validator: validateName, trigger: 'blur' }],
      gender: [{ required: true, trigger: 'blur' }],
      number: [{ validator: validateNumber, trigger: 'blur' }],
      major: [{ required: true, trigger: 'blur' }]
    })

    // 调用组件
    const alertRef = ref<any>(null)
    const successRef = ref<any>(null)
    const errorInfo = ref<string>('录 入 失 败！')
    const buttonLoading = ref<Boolean>(false)
    const onSubmit = async () => {
      buttonLoading.value = true
      const formData = new FormData()
      formData.append('student_name', form.name)
      formData.append('student_number', form.number)
      formData.append('student_gender', form.resource)
      formData.append('student_major', form.major)
      // if (upload_img.value) formData.append('student_image', upload_img.value)
      const res = await Axios.post('/student/create', formData)
      // @ts-ignore
      if (res.success) {
        await successRef.value.setDis()
      } // @ts-ignore 
      else if (res.error.data.code === '20102') {
        errorInfo.value = '注 册 学 生 已 存 在！'
        await alertRef.value.setDis()
      }
      buttonLoading.value = false
    }

    const onReset = () => {
      form.name = ''
      form.resource = ''
      form.major = ''
      form.number = ''
      form.resource = 'male'
      upload_img.value!.clearFiles()
    }

    const upload_img = ref<UploadInstance>()
    const handleExceed: UploadProps['onExceed'] = (files) => {
      upload_img.value!.clearFiles()
      const file = files[0] as UploadRawFile
      file.uid = genFileId()
      upload_img.value!.handleStart(file)
    }
    const submitUpload = () => {
      upload_img.value!.submit()
    }
    return {
        onSubmit,
        onReset,
        handleExceed,
        submitUpload,
        form,
        upload_img,
        rules,
        alertRef,
        successRef,
        errorInfo,
        buttonLoading
    }
  },
})
</script>

<style lang="scss" scoped>
::v-deep(.el-upload--text) {
    align-items: flex-end;
    @media screen and (max-width: 830px) {
        display: block;
    }
}

::v-deep(.el-input__inner) {
    width: 335px;
}

.rg-shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>