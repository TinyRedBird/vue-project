import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useCartStore = defineStore('cart', () => {
  const cartList = ref([])
  const addCart = (goods) => {
    console.log('添加', goods)
    const item = cartList.value.find((item) => goods.skuid === item.skuid)
    if (item) {
      item.count++
    } else {
      cartList.value.push(goods)
    }
  }
  return {
    cartList,
    addCart
  }
})
