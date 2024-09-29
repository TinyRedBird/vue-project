//封装所有和用户相关的接口函数
import request from '@/utils/request'

export const userRegisterService = (registerData) => {
  const params = new URLSearchParams()
  for (let key in registerData) {
    params.append(key, registerData[key])
  }
  return request.post('/user/register', params)
}

export const userLoginService = (loginData) => {
  const params = new URLSearchParams()
  for (let key in loginData) {
    params.append(key, loginData[key])
  }
  return request.post('/user/login', params)
}

//detail
export const userInfoService = () => {
  return request.get('/user/detail')
}
