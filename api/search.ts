import request from '@/utils/request'

// 搜索房源
export const reqSearchHouse = (keyword: string, pageNum: number, pageSize: number) => {
  return request<LoginResponse>(
    '/info/searchHouse',
    {
      method: 'GET',
      params: {
        keyword,
        pageNum,
        pageSize
      }
    }
  )
}

export const reqSearch = form => {
  return request(
    '/info/search',
    {
      method: 'GET',
      params: form
    }
  )
}