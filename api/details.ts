import request from '@/utils/request'

export const reqGetHouseRec = (houseId: number) => {
  return request(
    '/info//getHouseRec',
    {
      method: 'GET',
      params: {
        houseId
      }
    }
  )
}