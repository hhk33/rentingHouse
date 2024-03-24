import request from '@/utils/request'

export const reqGetVrData = () => {
  return request(
    '/info/getVrData',
    {
      method: 'GET',
    }
  )
}