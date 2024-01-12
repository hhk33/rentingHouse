// 手机号码验证
export const phoneNumValidate = /^1[3-9][0-9]\d{8}$/
// 密码格式验证（数字+字母，8~16位）
export const passwordValidate = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/