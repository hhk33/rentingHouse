import request from '@/utils/request'

// 获取轮播图
export const getCarousel = () => {
  return request(
    '/info/getCarousel',
    {
      method: 'GET',
    }
  )
}

export const reqGetScrollbar = () => {
  return request(
    '/info/getScrollbar',
    {
      method: 'GET',
    }
  )
}

export const reqGetRecommend = (userId: number, num: number) => {
  return request(
    '/info/recommend',
    {
      method: 'GET',
      params: {
        userId,
        num
      }
    }
  )
}

export const reqGetDistrict = () => {
  return request(
    '/info/getDistrict',
    {
      method: 'GET'
    }
  )
}

export const regGetBrokerById = (id: number) => {
  return request(
    '/info/getBrokerById',
    {
      method: 'GET',
      params: { id }
    }
  )
}