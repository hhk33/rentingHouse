<template>
  <div class="container">
    <div class="show-box">
      <div class="alert">
        <el-alert
          v-if="applyStatus === '00' || applyStatus === '01'"
          title="您有一个申请正在审核中"
          description="请耐心等待"
          type="success"
        />
        <el-alert
          v-else-if="applyStatus === '03'"
          title="您有一个申请被退回"
          :description="`原因： ${ rejectReason }`"
          type="warning"
        />
      </div>
      <div class="bg-img">
        <h4 class="heading">发布出租房源</h4>
        <span class="subheading">请填写以下信息,以便我们能够为您提供更好的服务。</span>
      </div>
      <div class="form-box">
        <el-form
          class="form"
          ref="formRef"
          :model="form"
          label-width="130px"
          :rules="rules"
          hide-required-asterisk
        >
          <el-form-item label="小区所在城市">
            <el-input v-model="form.city" style="width: 200px;" disabled size="large"/>
            <a class="changeCity">切换城市</a>
          </el-form-item>
          <el-form-item label="小区" prop="village">
            <el-input v-model="form.village" placeholder="请输入小区名" style="width: 200px;" size="large"/>
          </el-form-item>
          <el-form-item label="房屋地址" class="inside-form">
            <el-form-item prop="building">
              <el-input v-model="form.building" placeholder="楼栋号" style="width: 200px;" size="large"/>
            </el-form-item>
            <el-form-item prop="unit">
              <el-input v-model="form.unit" placeholder="单元号" style="width: 200px;" size="large"/>
            </el-form-item>
            <el-form-item prop="house">
              <el-input v-model="form.house" placeholder="门牌号" style="width: 200px;" size="large"/>
            </el-form-item>
          </el-form-item>
          <el-form-item label="期望租金" prop="price">
            <el-input v-model.number="form.price" placeholder="请输入您希望租出的价格" style="width: 200px;" size="large"/>
            <strong class="unit">元/月</strong>
          </el-form-item>
          <el-form-item label="出租方式">
            <el-select v-model="form.rentingMode" size="large">
              <el-option label="整租" value="00"></el-option>
              <el-option label="合租" value="01"></el-option>
              <el-option label="转租" value="02"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否有意向托管房屋" prop="trusteeship">
            <el-select v-model="form.trusteeship" size="large" placeholder="请选择">
              <el-option label="是" value="00"></el-option>
              <el-option label="否" value="01"></el-option>
            </el-select>
            <p class="trusteeship-tip">平台定期支付租金，专属管家打理房屋，收益稳定，租后省心。</p>
          </el-form-item>
          <el-form-item label="称呼" prop="name">
            <el-input v-model="form.name" placeholder="我们应该如何称呼您" style="width: 200px;" size="large"/>
          </el-form-item>
          <el-form-item label="身份证" class="inside-form">
            <div class="flex">
              <el-form-item prop="idBack">
                <UploadFile title="身份证人像面" @getIdImg="getIdBack"></UploadFile>
              </el-form-item>
              <el-form-item prop="idFront">
                <UploadFile title="身份证国徽面" @getIdImg="getIdFront"></UploadFile>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="手机号码" prop="phoneNum">
            <el-input v-model="form.phoneNum" placeholder="您的联系方式，方便我们及时与您联系" style="width: 400px;" size="large" :maxlength="11"/>
          </el-form-item>
          <p class="apply-tip">若您的房源通过平台初步审核，将会由平台上的经纪人和您取得联系，并对您的房源进行再次核实，核实无误后将与您建立服务关系。</p>
        </el-form>
      </div>
      <div class="flex btn-box">
        <div class="btn submit-btn" @click="handleSubmit">
          提交委托
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { RuleForm } from '@/types/proprietor'
import { phoneNumValidate } from '~/utils/validate'
import { houseApply, getApplyStatus } from '@/api/user'
import useStore from '~/composables/store'

const userStore = useStore.user()
const form = reactive<RuleForm>({
  userId: userStore.userInfo.userId,
  city: '杭州',
  village: '',
  building: '',
  unit: '',
  house: '',
  price: '',
  rentingMode: '00',
  trusteeship: '',
  name: '',
  phoneNum: '',
  idBack: '',
  idFront: ''
})

const checkPhoneNum = (rule: any, value: string, callback: any) => {
  if (!value) {
    return callback(new Error('请输入您的联系方式'))
  } else {
    if (phoneNumValidate.test(value)) {
      callback()
    } else {
      return callback(new Error('手机号码格式错误'))
    }
  }
}

const getIdBack = (idBack: string) => {
  form.idBack = idBack
}

const getIdFront = (idFront: string) => {
  form.idFront = idFront
}

watch(() => form.idBack, () => {
  formRef.value?.validateField('idBack')
} )

watch(() => form.idFront, () => {
  formRef.value?.validateField('idFront')
} )

const rules = reactive<FormRules<RuleForm>>({
  village: [{ required: true, message: '请输入小区名', trigger: 'blur' }],
  building: [{ required: true, message: '请输入楼栋号', trigger: 'blur' }],
  unit: [{ required: true, message: '请输入单元号', trigger: 'blur' }],
  house: [{ required: true, message: '请输入门牌号', trigger: 'blur' }],
  price: [{ required: true, message: '请输入期望价格', trigger: 'blur' }],
  trusteeship: [{ required: true, message: '是否托管房屋', trigger: 'change' }],
  name: [{ required: true, message: '请输入称呼', trigger: 'blur' }],
  phoneNum: [{ required: true, validator: checkPhoneNum, trigger: 'blur' }],
  idBack: [{ required: true, message: '请上传身份证人像面', trigger: 'change' }],
  idFront: [{ required: true, message: '请上传身份证国徽面', trigger: 'change' }]
})

const formRef = ref<FormInstance>()
const localFormRef = ref<FormInstance>()

// 提交
const handleSubmit = async () => {
  let flag = false
  if (!userStore.userInfo.userId) {
    userStore.dialogVisible = true
    return
  } else if (applyStatus.value === '00' || applyStatus.value === '01'){
    ElMessage.warning('您有申请正在审核中，请勿重复提交')
    return
  }

  await formRef.value?.validate(valid => {
    if (!valid) {
      flag = true
    }
  })
  await localFormRef.value?.validate(valid => {
    if (!valid) {
      flag = true
    }
  })
  if (flag) return

  form.userId = userStore.userInfo.userId
  let res: any = await houseApply(form)
  if (res.code === 200) {
    ElMessage.success('提交成功')
  } else {
    ElMessage.error('提交失败')
  }
}

let applyStatus = ref('02')
let rejectReason = ref('')
const handleGetApplyStatus = async () => {
  let res: any = await getApplyStatus()
  if (res.code === 200) {
    applyStatus.value = res.data.applyStatus
    rejectReason.value = res.data.reason
  }
}

userStore.$subscribe((mutation, state) => {
  if (state.userInfo.userId) {
    handleGetApplyStatus()
  } else {
    applyStatus.value = '02'
    rejectReason.value = ''
  }
})


onMounted(() => {
  setTimeout(() => {
    if (userStore.userInfo.userId) {
      handleGetApplyStatus()
    } else {
      userStore.dialogVisible = true
    }
  }, 0)
})
</script>

<style lang="scss" scoped>
.show-box {
  margin-top: -26px;
  .alert {
    width: 84%;
    margin: 5px auto;
  }
  .bg-img {
    width: 80%;
    margin: 0 auto;
    padding: 20px 0 150px 50px;
    background: url('@/assets/img/bgi.jpg') no-repeat;
    background-size: cover;
    background-position: bottom;
  }
}
.subheading {
  display: block;
  margin-top: 14px;
}
.form-box {
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    padding: 18px 50px 0 50px;
    .changeCity{
      margin-left: 20px;
      color: $primary;
    }
  :deep(.el-form-item) {
    padding-bottom: 25px;
    .el-form-item__label {
      display: flex;
      align-items: center;
      margin-right: 20px;
      line-height: 20px;
      font-size: 16px;
      font-weight: bold;
    }
    .el-select-dropdown__item {
      width: 1000px !important;
    }
  }
  .unit {
    margin-left: 20px;
  }
  .trusteeship-tip {
    margin-left: 20px;
    color: $gray;
    font-size: 12px;
  }
  .inside-form {
    :deep(.el-form-item) {
      padding: 0;
      margin-right: 20px;
    }
  }
}
}
.btn-box {
  justify-content: center;
  .submit-btn {
    width: 200px;
    height: 50px;
    line-height: 50px;
    margin: 20px 0 80px 0;
    font-size: 18px;
    background-color: $primary;
    color: #ffffff;
    border: none;
  }
}
.apply-tip {
  margin: -20px 0 30px 150px;
  width: 500px;
  color: $grayText;
  font-size: 12px;
}
</style>