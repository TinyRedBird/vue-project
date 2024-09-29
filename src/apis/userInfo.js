import { defineStore } from 'pinia'
import { ref } from 'vue'
const useUserInfoStore = defineStore(
  'userInfo',
  () => {
    const info = ref({})
    // 修改用户信息
    const setInfo = (newInfo) => {
      info.value = newInfo
    }
    const removeInfo = () => {
      info.value = {}
    }
    return {
      info,
      setInfo,
      removeInfo
    }
  },
  { persist: true }
)

export default useUserInfoStore
