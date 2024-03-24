<template>
  <div>
    <client-only>
      <el-dialog
        v-model="dialogVisible"
        width="400"
        center
        align-center
        @close="clearData"
      >
      <div class="content" v-show="!forgetPas">
        <div class="login-type flex">
          <p :class="['type', {'type-active': loginType === '00'}]"
            @click="changeType('00')"
          >
            短信登录
          </p>
          <p :class="['type', {'type-active': loginType === '01'}]"
            @click="changeType('01')"
          >
            密码登录
          </p>
        </div>
        <div class="login-box flex-col" v-show="loginType === '00'">
          <el-form :model="messageLogin" :rules="rules" ref="messageFormRef">
            <el-form-item prop="phoneNum">
              <el-input
                class="login-input"
                v-model="messageLogin.phoneNum"
                placeholder="请输入手机号"
                :maxlength="11"
              />
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                class="login-input"
                v-model="messageLogin.code"
                placeholder="请输入短信验证码"
                :maxlength="6"
              />
            </el-form-item>
            <a :class="['get-code', {'get-code-disabled':codeTime > 0}]"
              @click="getCode(messageLogin.phoneNum)"
            >
              {{codeTime <= 0? '获取验证码': `${codeTime}秒后重发` }}
            </a>
          </el-form>
        </div>
        <div class="login-box flex-col" v-show="loginType === '01'">
          <el-form :model="passwordLogin" :rules="rules"  ref="passwordFormRef">
            <el-form-item prop="phoneNum">
              <el-input
                class="login-input"
                v-model="passwordLogin.phoneNum"
                placeholder="请输入手机号"
                :maxlength="11"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                class="login-input"
                v-model="passwordLogin.password"
                placeholder="请输入密码"
                show-password
                :maxlength="16"
              />
            </el-form-item>
          </el-form>
        </div>
        <p class="error-tip">{{ errorTip }}</p>
        <button class="btn primary-btn login" @click="handleLogin">登 录</button>
        <div class="flex login-remember">
          <span></span>
          <a v-show="loginType === '01'" @click="changeForgetPas(true)">忘了密码</a>
        </div>
        <p class="login-tip">未注册过的手机号，验证通过后自动注册账号</p>
      </div>
      <div class="content" v-show="forgetPas">
        <div class="flex forget-title">
          <el-icon class="back-btn" @click="changeForgetPas(false)" :size="26"><Back /></el-icon>
          <span class="type">忘记密码</span>
        </div>
        <div class="login-box flex-col">
          <el-form :model="forgetPasMsg" :rules="rules" ref="forgetFormRef">
            <el-form-item prop="phoneNum">
              <el-input
                class="login-input"
                v-model="forgetPasMsg.phoneNum"
                placeholder="请输入手机号"
                :maxlength="11"
              />
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                class="login-input"
                v-model="forgetPasMsg.code"
                placeholder="请输入短信验证码"
                :maxlength="6"
              />
            </el-form-item>
            <a :class="['get-code', {'get-code-disabled':codeTime > 0}]"
              @click="getCode(forgetPasMsg.phoneNum)"
            >
              {{codeTime <= 0? '获取验证码': `${codeTime}秒后重发` }}
            </a>
          <el-form-item prop="password">
            <el-input
              class="login-input"
              v-model="forgetPasMsg.password"
              placeholder="请输入密码（数字+字母, 8~16位）"
              :maxlength="16"
              show-password
            />
          </el-form-item>
          </el-form>
        </div>
        <p class="error-tip">{{ errorTip }}</p>
        <button class="btn primary-btn login" @click="eidtPas">修 改 密 码</button>
      </div>
      </el-dialog>
    </client-only>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import useStore from '~/composables/store'
import { storeToRefs } from 'pinia'
import { phoneNumValidate, passwordValidate } from '~/utils/validate'
import type { messageLoginType, passwordLoginType, forgetPasType, LoginResponse } from '~/types/login'
import { userLogin, codeLogin, sendCode, getUserInfo, forgetPassword } from '~/api/user'
import { setToken, setRefreshToken } from '~/utils/token'

const userStore = useStore.user()
const { dialogVisible } = storeToRefs(userStore)

// 登录方式 00：短信登录 01：密码登录
let loginType = ref('00')
// 短信登录
let messageLogin = reactive<messageLoginType>({
  phoneNum: '',
  code: ''
})
//密码登录
let passwordLogin = reactive<passwordLoginType>({
  phoneNum: '',
  password: ''
})
// 获取验证码倒计时
let codeTime = ref(0)
// 验证错误提示
let errorTip = ref('')

// 切换时，清空验证
const passwordFormRef = ref()
const messageFormRef = ref()
const forgetFormRef = ref()
const changeForgetPas = (val: boolean) => {
  forgetPas.value = val
  clearData()
  if (timer) {
    clearInterval(timer)
  }
  codeTime.value = 0
}
const changeType = (val: string) => {
  loginType.value = val
  clearData()
}
const clearData = () => {
  errorTip.value = ''
  passwordFormRef.value.clearValidate()
  messageFormRef.value.clearValidate()
  forgetFormRef.value.clearValidate()

  Object.keys(messageLogin).forEach( key => messageLogin[key] = '')
  Object.keys(passwordLogin).forEach( key => passwordLogin[key] = '')
  Object.keys(forgetPasMsg).forEach( key => forgetPasMsg[key] = '')
}

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

const handleLogin = async () => {
  errorTip.value = ''
  let valiRes = true
  if (loginType.value === '00') {
    await messageFormRef.value.validate((vali: boolean) => {
      if(!vali) {
        valiRes = false
      }
    })
  } else {
    await passwordFormRef.value.validate((vali: boolean) => {
      if(!vali) {
        valiRes = false
      }
    })
  }
  if (!valiRes) return

  let res: LoginResponse
  if(loginType.value === '00'){
    res = await codeLogin(messageLogin.phoneNum, messageLogin.code)
  } else {
    res = await userLogin(passwordLogin.phoneNum, passwordLogin.password)
  }
  if(res.code === 200){
    // 登录成功
    setToken(res.data.token)
    setRefreshToken(res.data.refreshToken)
    dialogVisible.value = false
    ElMessage({
      message: '登录成功',
      type: 'success',
    })
    const userInfoRes = await getUserInfo()
    if (userInfoRes.code === 200) {
      userStore.setUserInfo(userInfoRes.data)
    }
  } else {
    errorTip.value = res.message
  }
}

// 忘记密码
let forgetPas = ref(false)
let forgetPasMsg = reactive<forgetPasType>({
  phoneNum: '',
  password: '',
  code: ''
})

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
  let res = await sendCode(phoneNum, forgetPas.value? '02': '01')
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

const eidtPas = () => {
  errorTip.value = ''
  forgetFormRef.value.validate(async (vali: boolean) => {
    if(vali) {
      let res = await forgetPassword(forgetPasMsg.phoneNum, forgetPasMsg.password, forgetPasMsg.code)
      if(res.code === 200) {
        forgetPas.value = false
        ElMessage({
          message: '修改',
          type: 'success',
        })
      }
    } else {
      return false
    }
  })
}
</script>

<style lang="scss" scoped>
:deep(.el-dialog) {
  border-radius: 10px;
}
.content {
  height: 374px;
  .type {
    height: 20px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }
  .back-btn {
    margin: 0 10px 0 25px;
    cursor: pointer;
  }
  .forget-title {
    margin: -8px 0 -2px 0;
  }
}
.login-type {
  justify-content: space-around;
  .type-active {
    color: $primary;
  }
  .type-active::after {
    content: '';
    display: block;
    position: relative;
    top: 10px;
    left: 15px;
    width: 30px;
    height: 4px;
    background-color: $primary;
  }
}
.login-box {
  position: relative;
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
    right: 40px;
    color: $primary;
  }
  .get-code-disabled {
    color: $gray;
    cursor: auto;
  }
}
.error-tip {
  position: absolute;
  margin: -44px 0 0 28px;
  color: red;
}
.login {
  width: 300px;
  height: 44px;
  margin: 0 25px;
  border-radius: 4px;
  font-weight: bold;
}
.login-remember {
  margin: 10px 25px -10px 25px;
  justify-content: space-between;
}
.login-tip {
  margin: 30px 25px 0 25px;
  padding-top: 10px;
  font-size: 12px;
  color: $gray;
  border-top: 1px solid $grayLine;
}
</style>