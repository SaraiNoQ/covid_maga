<template>
    <el-link type="warning" :underline="false" @click="displayDialog">forger password?</el-link>
    <!-- dialog -->
    <el-dialog v-model="dialogTableVisible" title="Reset Your Account" class="flex justify-center">
      <!-- form -->
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="110px"
        :label-position="'left'"
        class="sm:w-full md:w-80 mx-auto"
        size="large"
      >
        <el-form-item label="Account" prop="account">
          <el-input v-model="ruleForm.account" type="email" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Old Password" prop="originalPassword">
          <el-input
            v-model="ruleForm.originalPassword"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="New Password" prop="password">
          <el-input
            v-model="ruleForm.password"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Two Password" prop="passwordAgain">
          <el-input
            v-model="ruleForm.passwordAgain"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="resetForm(ruleFormRef)">Cancel</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
export default defineComponent({
    setup() {
        const dialogTableVisible = ref<Boolean>(false)
        const displayDialog = () => {
          dialogTableVisible.value = true
        }

        const ruleFormRef = ref<FormInstance>()

        const validatePass = (rule: any, value: any, callback: any) => {
          if (value === '') {
            callback(new Error('Please input new password'))
          } else {
            if (ruleForm.password !== '') {
              if (!ruleFormRef.value) return
              ruleFormRef.value.validateField('checkPass', () => null)
            }
            callback()
          }
        }
        const validatePassword = (rule: any, value: any, callback: any) => {
          if (value === '') {
            callback(new Error('Please input new password again'))
          } else if (value !== ruleForm.password) {
            callback(new Error("Two inputs don't match"))
          } else {
            callback()
          }
        }
        const validateAccount = (rule: any, value: any, callback: any) => {
          if (value === '') {
            callback(new Error('Please input your account'))
          } else if (value !== ruleForm.account) {
            callback(new Error("Two inputs don't match!"))
          } else {
            callback()
          }
        }
        const ruleForm = reactive({
          originalPassword: '',
          password: '',
          passwordAgain: '',
          account: ''
        })

        const rules = reactive({
          password: [{ validator: validatePass, trigger: 'blur' }, { min: 6,message: 'Please input 6 chars at last', trigger: ['blur', 'change'] }],
          account: [{ validator: validateAccount, trigger: 'blur' }, {
            type: 'email',
            message: 'Please input correct email address',
            trigger: ['blur', 'change'],
          }],
          passwordAgain: [{ validator: validatePassword, trigger: 'blur' }],
          originalPassword: [{ required: true, trigger: 'blur' }]
        })

        const { proxy } = getCurrentInstance()
        const submitForm = (formEl: FormInstance | undefined) => {
          if (!formEl) return
          formEl.validate(async (valid) => {
            if (valid) {
              const formData = new FormData()
              formData.append('user_name', ruleForm.account)
              formData.append('password', ruleForm.originalPassword)
              formData.append('new_password', ruleForm.password)
              const res = await proxy.$axios.post('/passwd', formData)
              console.log('changepsd', res);
              if (res.success) {
                alert('change password success!')
                dialogTableVisible.value = false
              } else {
                alert(res.error.data.result.message)
              }
            } else {
              return false
            }
          })
        }

        const resetForm = (formEl: FormInstance | undefined) => {
          if (!formEl) return
          dialogTableVisible.value = false
          formEl.resetFields()
        }

        return {
          ruleFormRef,
          dialogTableVisible,
          displayDialog,
          ruleForm,
          rules,
          submitForm,
          resetForm
        }
    },
})
</script>
