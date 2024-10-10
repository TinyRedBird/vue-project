//封装所有和用户相关的接口函数
import request from '@/utils/request'

export const userRegisterService = (registerData) => {
  // console.log('userRegisterService', registerData)
  return request.post('/user/register', registerData)
}

export const userLoginService = (loginData) => {
  const params = new URLSearchParams()
  for (let key in loginData) {
    params.append(key, loginData[key])
  }
  // console.log('login', params)
  return request.post('/user/login', params)
}

export const getCodeService = async (EmailData) => {
  const params = new URLSearchParams()
  for (let key in EmailData) {
    params.append(key, EmailData[key])
  }
  return request.get('/code', { params })
}
//detail
export const userInfoService = () => {
  return request.get('/user/detail')
}
