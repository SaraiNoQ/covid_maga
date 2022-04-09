<template>
    <h2 class="mt-4 text-3xl text-green-600 font-semibold">学 生 信 息 录 入</h2>
    <div class="rg-shadow mt-2 w-[75vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] mx-auto bg-gray-200 pt-4 pr-12 pb-2">
        <el-form :model="form" label-width="120px">
          <el-form-item label="Name">
            <el-input v-model="form.name" />
          </el-form-item>
          
          <el-form-item label="Gender">
            <el-radio-group v-model="form.resource">
              <el-radio label="male" />
              <el-radio label="female" />
            </el-radio-group>
          </el-form-item>

          <el-form-item label="Number">
              <el-input v-model="form.number" />
          </el-form-item>

          <el-form-item label="Major">
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
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button @click="onReset">Reset</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'


export default defineComponent({
    setup() {
        const form = reactive({
            name: '',
            resource: 'male',
            major: '',
            number: ''
        })
        const onSubmit = () => {
            console.log('submit')
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
            upload_img
        }
    },
})
</script>

<style lang="scss" scoped>
::v-deep .el-upload--text {
    align-items: flex-end;
    @media screen and (max-width: 830px) {
        display: block;
    }
}

::v-deep .el-input__inner {
    width: 335px;
}

.rg-shadow {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>