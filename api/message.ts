import request from '@/utils/request'

export const reqQueryMessageList = (fromId, toId, pageNum, pageSize) => {
  return request(
    '/message/queryMessageList',
    {
      method: 'GET',
      params: {
        fromId,
        toId,
        pageNum,
        pageSize
      }
    }
  )
}

export const reqQueryUserList = fromId => {
  return request(
    '/message/queryUserList',
    {
      method: 'GET',
      params: { fromId }
    }
  )
}