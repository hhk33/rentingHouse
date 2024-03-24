<template>
  <div class="edit-password">
    <div class="login-box flex-col">
      <el-form :model="form" :rules="rules" ref="formRef">
        <el-form-item prop="phoneNum">
          <el-input
            class="login-input"
            v-model="form.phoneNum"
            placeholder="请输入手机号"
            :maxlength="11"
          />
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            class="login-input"
            v-model="form.code"
            placeholder="请输入短信验证码"
            :maxlength="6"
          />
        </el-form-item>
        <a :class="['get-code', {'get-code-disabled':codeTime > 0}]"
          @click="getCode(form.phoneNum)"
        >
          {{codeTime <= 0? '获取验证码': `${codeTime}秒后重发` }}
        </a>
        <el-form-item prop="password">
          <el-input
            class="login-input"
            v-model="form.password"
            placeholder="请输入密码（数字+字母, 8~16位）"
            :maxlength="16"
            show-password
          />
      </el-form-item>
      </el-form>
      <p class="error-tip">{{ errorTip }}</p>
      <button class="btn primary-btn login" @click="eidtPas">修 改 密 码</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { forgetPasType } from '~/types/login'
import { sendCode, editPassword } from '~/api/user'

let form = reactive<forgetPasType>({
  phoneNum: '',
  password: '',
  code: ''
})

let errorTip = ref('')

const checkPhoneNum = (rule: any, value: any, callback: any) => {
  if(phoneNumValidate.test(value)){
    callback()
  } else {
    if (errorTip.value === ''){
      errorTip.value = '请输入有效的手机号码'
    }
    callback(new Error(''))
  }
}
const checkCode = (rule: any, value: string, callback: any) => {
  if(value.length === 6) {
    callback()
  } else {
    if (errorTip.value === ''){
      errorTip.value = '请输入6位短信验证码'
    }
    callback(new Error(''))
  }
}
const checkPassword = (rule: any, value: string, callback: any) => {
  if(passwordValidate.test(value)){
    callback()
  } else {
    if (errorTip.value === ''){
      errorTip.value = '请输入8-16位的密码（数字+字母）'
    }
    callback(new Error(''))
  }
}

const rules = {
  phoneNum: [{ required: true, validator: checkPhoneNum, trigger: [] }],
  code: [{ required: true, validator: checkCode, trigger: [] }],
  password: [{ required: true, validator: checkPassword, trigger: [] }]
}

const formRef = ref()
const eidtPas = () => {
  errorTip.value = ''
  formRef.value.validate(async (vali: boolean) => {
    if(vali) {
      let res = await editPassword(form.phoneNum, form.password, form.code)
      if(res.code === 200) {
        ElMessage({
          message: '修改成功',
          type: 'success',
        })
      }
    } else {
      return false
    }
  })
}

const clearData = () => {
  errorTip.value = ''
  formRef.value.clearValidate()
  Object.keys(form).forEach( key => form[key] = '')
}

defineExpose({
  clearData
})

// 获取验证码倒计时
let codeTime = ref(0)

// 获取验证码
const getCode = async (phoneNum: string) => {
  if (codeTime.value > 0){
    return
  }
  errorTip.value = ''
  if(!phoneNum) {
    errorTip.value = '请输入手机号'
    return
  }
  let res = await sendCode(phoneNum, '03')
  if (res.code === 200) {
    codeTime.value = 60
    countDown()
  } else {
    ElMessage({
      message: res.message,
      type: 'error'
    })
  }
}

// 倒计时
let timer: NodeJS.Timeout | null = null
const countDown = () => {
  timer = setInterval(() => {
    codeTime.value--
    if(codeTime.value <= 0) {
      clearInterval(timer as NodeJS.Timeout)
    }
  }, 1000)
}
</script>

<style lang="scss" scoped>
.edit-password {
  display: flex;
  justify-content: center;
  .login-box {
    position: relative;
    width: 400px;
    margin: 40px 0 30px 0;
    justify-content: center;
    align-items: center;
    .login-input {
      width: 300px;
      height: 48px;
      margin: 10px 0;
    }
    .get-code {
    position: absolute;
    top: 100px;
    right: 60px;
    color: $primary;
  }
  .get-code-disabled {
    color: $gray;
    cursor: auto;
  }
  }
  .error-tip {
    position: absolute;
    bottom: 80px;
    left: 50px;
    color: red;
  }
  .login {
    width: 300px;
    height: 44px;
    margin: 40px 25px 0 25px;
    border-radius: 4px;
    font-weight: bold;
  }

}
</style>