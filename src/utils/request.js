import axios from 'axios'
import { useTokenStore } from '@/stores/token'

/*request*/
const service = axios.create({
  baseURL: 'api',
  timeout: 8000
})
//响应lanjieqi
service.interceptors.request.use(
  (config) => {
    const tokenStore = useTokenStore()
    if (tokenStore.token) {
      config.headers.Authorization = tokenStore.token
    }
    return config
  },
  (err) => {
    Promise.reject(err)
  }
)

/**/

service.interceptors.response.use(
  (result) => {
    if (result.data.code === 0) {
      return result.data
    }

    alert(result.data.msg ? result.data.msg : '服务器异常')
    //异步操作
    return Promise.reject(result.data)
  },
  (err) => {
    alert('异常')
    return Promise.reject(err)
  }
)
////
// function vaildateEmail() {
//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//   if (!emailPattern.test(account.value)) {
//     alert('请输入有效的邮箱地址')
//   }
// }

/* 是否邮箱*/
// export function validateEMail(rule, value, callback) {
//   const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/
//   if (value == '' || value == undefined || value == null) {
//     callback()
//   } else {
//     if (!reg.test(value)) {
//       callback(new Error('请输入正确的邮箱地址'))
//     } else {
//       callback()
//     }
//   }
// }

/*验证内容是否英文数字以及下划线*/
export function isPassword(rule, value, callback) {
  const reg = /^[_a-zA-Z0-9]+$/
  if (value == '' || value == undefined || value == null) {
    callback()
  } else {
    if (!reg.test(value)) {
      callback(new Error('密码仅由英文字母，数字以及下划线组成'))
    } else {
      callback()
    }
  }
}

export default service
