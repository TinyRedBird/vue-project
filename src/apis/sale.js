import request from '@/utils/request'

export const getSaleGoodsList = (params) => {
  return request.get('/sale', { params: params })
  // console.log(params, 22)
}

export const getSaleDetail = (params) => {
  return request.get('/sale/detail', { params: params })
}

