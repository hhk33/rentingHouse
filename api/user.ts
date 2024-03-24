import request from '@/utils/request'
import { TResult, LoginResponse, UserInfoResponse } from '~/types/login'

// 密码登录
export const userLogin = (phone: string, password: string) => {
  return request<LoginResponse>(
    '/user/login',
    {
      method: 'POST',
      params: {
        phone,
        password,
      }
    }
  )
}

// 验证码登录
export const codeLogin = (phone: string, code: string) => {
  return request<LoginResponse>(
    '/user/codeLogin',
    {
      method: 'POST',
      params: {
        phone,
        code
      }
    }
  )
}

// 忘记密码
export const forgetPassword = (phone: string, password: string, code: string) => {
  return request<TResult<null>>(
    '/user/forgetPassword',
    {
      method: 'POST',
      params: {
        phone,
        password,
        code
      }
    }
  )
}

// 修改密码
export const editPassword = (phone: string, password: string, code: string) => {
  return request<TResult<null>>(
    '/user/editPassword',
    {
      method: 'POST',
      params: {
        phone,
        password,
        code
      }
    }
  )
}

// 退出登录
export const userLogout = (refreshToken: string) => {
  return request<TResult<null>>(
    '/user/logout',
    {
      method: 'POST',
      params: {
        refreshToken
      }
    }
  )
}

// 发送验证码
export const sendCode = (phone: string, type: '01'|'02'|'03') => {
  return request<TResult<null>>(
    '/user/sendCode',
    {
      method: 'POST',
      params: {
        phone,
        type
      }
    }
  )
}

// token刷新
export const reqRefreshToken = (refreshToken: string) => {
  return request<LoginResponse>(
    'user/refreshToken',
    {
      method: 'GET',
      params: {
        refreshToken
      }
    }
  )
}

// 获取用户信息
export const getUserInfo = () => {
  return request<UserInfoResponse>(
    '/user/getUserInfo',
    {
      method: 'GET',
    }
  )
}

// 提交出租申请
export const houseApply = (houseApply: any) => {
  return request(
    '/user/houseApply',
    {
      method: 'POST',
      params: houseApply
    }
  )
}

// 查询提交的申请状态
export const getApplyStatus = () => {
  return request(
    '/user/getApplyStatus',
    {
      method: 'GET',
    }
  )
}

export const reqIsCollect = houseId => {
  return request(
    '/user/isCollect',
    {
      method: 'GET',
      params: { houseId }
    }
  )
}

export const reqCollectHouse = houseId => {
  return request(
    '/user/collectHouse',
    {
      method: 'POST',
      params: { houseId }
    }
  )
}

export const reqGetAllCollect = ( pageNum, pageSize ) => {
  return request(
    '/user/getAllCollect',
    {
      method: 'GET',
      params: { pageNum, pageSize }
    }
  )
}