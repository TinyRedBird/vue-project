import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartList = ref([])
    const addCart = (goods) => {
      console.log('添加', goods)
      const item = cartList.value.find((item) => goods.goodsId === item.goodsId)
      if (item) {
        item.count = item.count + goods.count
        console.log('添加购物车过了')
      } else {
        cartList.value.push(goods)
        console.log('没有添加购物车过')
      }
      console.log('添加成功')
    }
    return {
      cartList,
      addCart
    }
  },
  {
    persist: true
  }
)
