<template>
  <div class="container">
    <div class="show-box">
      <h4 class="heading">发布出租房源</h4>
      <span class="subheading">请填写以下信息,以便我们能够为您提供更好的服务。</span>
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
          <el-form-item label="房屋地址">
            <el-form
              class="inside-form"
              ref="insideFormRef"
              :model="form"
              :inline="true"
              :rules="rules"
            >
              <el-form-item prop="building">
                <el-input v-model="form.building" placeholder="楼栋号" style="width: 200px;" size="large"/>
              </el-form-item>
              <el-form-item prop="unit">
                <el-input v-model="form.unit" placeholder="单元号" style="width: 200px;" size="large"/>
              </el-form-item>
              <el-form-item prop="house">
                <el-input v-model="form.house" placeholder="门牌号" style="width: 200px;" size="large"/>
              </el-form-item>
            </el-form>
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
          <el-form-item label="手机号码" prop="phoneNum">
            <el-input v-model="form.phoneNum" placeholder="您的联系方式，方便我们及时与您联系" style="width: 400px;" size="large" :maxlength="11"/>
          </el-form-item>
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
import { reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { RuleForm } from '@/types/proprietor'
import { phoneNumValidate } from '~/utils/validate'

const form = reactive<RuleForm>({
  city: '杭州',
  village: '',
  building: '',
  unit: '',
  house: '',
  price: '',
  rentingMode: '00',
  trusteeship: '',
  name: '',
  phoneNum: ''
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

const rules = reactive<FormRules<RuleForm>>({
  village: [{ required: true, message: '请输入小区名', trigger: 'blur' }],
  building: [{ required: true, message: '请输入楼栋号', trigger: 'blur' }],
  unit: [{ required: true, message: '请输入单元号', trigger: 'blur' }],
  house: [{ required: true, message: '请输入门牌号', trigger: 'blur' }],
  price: [{ required: true, message: '请输入期望价格', trigger: 'blur' }],
  trusteeship: [{ required: true, message: '是否托管房屋', trigger: 'change' }],
  name: [{ required: true, message: '请输入称呼', trigger: 'blur' }],
  phoneNum: [{ required: true, validator: checkPhoneNum, trigger: 'blur' }]
})

const formRef = ref<FormInstance>()
const insideFormRef = ref<FormInstance>()
const handleSubmit = async () => {
  await formRef.value?.validate(valid => {
    if (!valid) {
      return
    }
  })
  await insideFormRef.value?.validate(valid => {
    if (!valid) {
      return
    }
  })
  console.log('submit!')
}
</script>

<style lang="scss" scoped>
.show-box {
  margin-top: 0;
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
  padding: 80px 50px 0 50px;
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
</style>