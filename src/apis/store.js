import request from '@/utils/request'

export const getStoreService = (id) => {
  return request.get(`/store/${id}`)
}

export const getStoreSaleService = (id, params) => {
  return request.get(`/store/${id}/sale`, { params: params })
}

export const getStoreDetailService = (params) => {
  return request.get(`/store`, { params: params })
}

export const getStoreTypeService = (id) => {
  return request.get(`/store/${id}/type`)
}

export const getStoreTypeSaleService = (id) => {
  return request.get(`/type/${id}/sale`) //id 分类
}
