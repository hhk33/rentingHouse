export interface RuleForm {
  city: string,
  village: string,
  building: string,
  unit: string,
  house: string,
  price: number | '',
  rentingMode: '00' | '01',
  trusteeship: '' | '00' | '01',
  name: string,
  phoneNum: string
}