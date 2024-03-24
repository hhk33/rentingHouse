import request from '@/utils/request'

export const uploadImg = (formData: FormData) => {
  return request<string>(
    '/uploadFile',
    {
      method: 'POST',
      body: formData
    }
  )
}