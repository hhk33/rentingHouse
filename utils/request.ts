import { getToken, getRefreshToken, setRefreshToken, setToken, removeToken, removeRefreshToken } from "./token"
import { reqRefreshToken } from "~/api/user"

// 当前是否刷新状态
let isRefresh = false

const request = async <T> (url: string, options: object) => {
  const headers = {
    Authorization: getToken(),
  }
  const defaultOptions: object = {
    baseURL: '/api',
    headers: headers,
    // 处理响应数据
    onResponse(res: any) {
      const data = res.response._data
      if (data.code === 0) {
        ElMessage.error(data.message)
      }
    },
    // 处理响应错误
    async onResponseError(res: any) {
      console.log("response-error", res)
      const { options, response, request } = res
      // 清空数据
      const clearAuth = () => {
        removeToken()
        removeRefreshToken()
        return Promise.reject(response)
      }
      if (response.status === 401 && !request.includes('refresh')) {
        const refreshToken = getRefreshToken()
        if (!refreshToken) {
          return clearAuth()
        }
        // 判断当前是否为刷新状态中, 防止多个请求导致多次调refresh接口
        if (!isRefresh) {
            isRefresh = false
            const res = await reqRefreshToken(refreshToken)
            if (res.code === 200) {
              setToken(res.data.token)
              setRefreshToken(res.data.refreshToken)
              //重新发起因token过期而未能成功实现的请求
              request(options)
            } else {
              clearAuth()
            }
        }
      }
    }
  }
  const newOptions: object = { ...defaultOptions, ...options }
  const { data } = await useFetch(url, newOptions)
  const res = (data as any)._value
  return (res as T)
}

export default request
