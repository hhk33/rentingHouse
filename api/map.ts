import request from '@/utils/request'

// 获取轮播图
export const search = params => {
  return request(
    '/map/search',
    {
      method: 'GET',
      params
    }
  )
}

export const getHouseRecs = params => {
  return request(
    '/map/getHouseRecs',
    {
      method: 'GET',
      params
    }
  )
}