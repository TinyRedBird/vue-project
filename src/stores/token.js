//
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenStore = defineStore(
  'token',
  () => {
    const token = ref('')

    const setToken = (newToken) => {
      token.value = newToken
      /////////////////////////////
      localStorage.setItem('token', newToken)
    }

    const removeToken = () => {
      token.value = ''
      //////////////////
      localStorage.removeItem('token')
    }
    const initToken = () => {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        token.value = storedToken
      }
    }

    // 在服务器请求之前调用
    initToken()
    return { token, setToken, removeToken }
  },
  {
    persist: true
  }
)
