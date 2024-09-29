import request from '@/utils/request'

export const getSaleGoodsList = (params) => {
  // console.log(params, 22)

  return request.get('/sale', { params: params })
}

export const getSaleDetail = (params) => {
  return request.get('/sale/detail', { params: params })
}

export const dataService =()=>{
  // localStorage.getItem('')
}
