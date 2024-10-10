import { reactive, inject, provide } from 'vue'

// 创建一个响应式对象，用于存储搜索关键词和选中的类型
export let searchContext = reactive({
  searchKey: '',
  selectedType: '商品' // 默认选中商品
})

export function useProvideSearchContext() {
  provide('searchContext', searchContext)
}

export function useInjectSearchContext() {
  return inject('searchContext')
}
