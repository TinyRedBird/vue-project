import request from '@/utils/request'
// import qs from 'qs'
export const insertCartService = (cartData) => {
  const params = new URLSearchParams()
  for (let key in cartData) {
    params.append(key, cartData[key])
  }
  // console.log(params, 'insertCartService')
  return request.post('/cart', params)
}

export const findNewCartListService = (cartData) => {
  // console.log(cartData)

  const params = new URLSearchParams()
  for (let key in cartData) {
    params.append(key, cartData[key])
  }
  // console.log(params, 'findNewCartListService')
  return request.get('/cart', {
    params: cartData // Axios 会自动将对象转换为查询字符串
  })
}

export const changeCartService = (cartData) => {
  // console.log('changeCartService', cartData)

  const params = new URLSearchParams()
  for (let key in cartData) {
    params.append(key, cartData[key])
  }
  // console.log(params, 'changeCartService')
  return request.put(`/cart`, params)
}

export const delCartService = (ids) => {
  // console.log(ids, 'delCartService')

  return request.delete(`/cart/${ids}`)
}
