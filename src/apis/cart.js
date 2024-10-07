import request from '@/utils/request'
export const insertCartService = (params) => {
  console.log('insertCartService')
  return request.post('/cart', params)
}

export const findNewCartListService = (params) => {
  console.log(params, 'findNewCartListService')
  return request.get('/cart', params)
}

export const delCartService = (ids) => {
  return request.delete(`/cart${ids}`)
}
