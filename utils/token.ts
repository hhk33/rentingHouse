export const getToken = (): string => {
  return localStorage.getItem('token') ?? ''
}

export const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const removeToken = () => {
  localStorage.removeItem('token')
}

export const getRefreshToken = (): string => {
  return localStorage.getItem('refreshToken') ?? ''
}

export const setRefreshToken = (refreshToken: string) => {
  localStorage.setItem('refreshToken', refreshToken)
}

export const removeRefreshToken = () => {
  localStorage.removeItem('refreshToken')
}