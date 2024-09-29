import request from '@/utils/request'

export const homeCategoryListService = () => {
  return request.get('/type')
}

//sale
export const getSaleGoodsList = (params) => {
  return request.get('/sale', { params: params })
}

//*******************************//
// export const postAction = (url, parameter) => {
//   return axios({
//     url: url,
//     method: 'post',
//     data: parameter
//   })
// }

// export const getAction = (url, parameter) => {
//   return axios({
//     url: url,
//     method: 'get',
//     data: parameter
//   })
// }

// export const deleteAction = (url, parameter) => {
//   return axios({
//     url: url,
//     method: 'delete',
//     data: parameter
//   })
// }

// export const putAction = (url, parameter) => {
//   return axios({
//     url: url,
//     method: 'put',
//     data: parameter
//   })
// }

// export const userTypeService = (data) => {
//   return request({
//     url: '/type',
//     method: 'get',
//     data
//   })
// }
