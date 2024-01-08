//全局基础URL
const BASEURL: string = "http://121.36.81.61:8000"

interface HttpParms {
  baseURL?: string,
  url: string,
  method?: any,
  query?: any,
  body?: any,
  headers?: any
}

export const requset123 = (obj: HttpParms) => {
  const token = useCookie('token').value || null
  const res = new Promise((resolve, reject) => {
    useFetch(
      (obj.baseURL ?? BASEURL) + obj.url,
      {
        method: obj.method ?? 'GET',
        query: obj.query ?? null,
        body: obj.body ?? null,
        headers: [['token', token as string]],
        onRequestError({ error }) {
          // 处理请求错误
          console.error('request error', error)
          reject(error)
        },
        onResponse({ response }) {
          // 处理响应数据
          resolve(response._data)
        },
        onResponseError({ response }) {
          // 处理响应错误
          console.error('request error', response)
        }
      }
    )
  })
  return res
}