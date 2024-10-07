import request from '@/utils/request'

export const getSaleGoodsList = (params) => {
  return request.get('/sale', { params: params })
  // console.log(params)
}

export const getSaleDetail = (params) => {
  return request.get('/sale/detail', { params: params })
}

export const getSaleCompare = (params) => {
  return request.get('/sale/compare', { params: params })
}
