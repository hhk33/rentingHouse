interface Obj {
  [key: string]: string
}

export interface messageLoginType extends Obj {
  phoneNum: string
  code: string
}

export interface passwordLoginType extends Obj {
  phoneNum: string
  password: string
}

export interface forgetPasType extends passwordLoginType, messageLoginType { }

interface Result {
  code: number
  message: string
}

export interface TResult<T> {
  code: number
  message: string,
  data: T
}

// 登录返回token
export interface LoginResponse extends Result{
  data: {
    token: string,
    refreshToken: string
  }
}

// 用户信息
export interface UserInfo {
  nickname: string,
  avatar: string,
  userId: number,
  status: '00' | '01'
}

export interface UserInfoResponse extends Result {
  data: UserInfo
}