import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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
    const singleCheck = (goods, selected) => {
      const item = cartList.value.find((item) => goods.goodsId === item.goodsId)
      item.selected = selected
    }
    //删除购物车
    const delCart = (goodsId) => {
      //思路
      //1.找到要删除项的下标值
      //2.使用数组的过滤方法
      const index = cartList.value.findIndex((item) => goodsId === item.goodsId)
      cartList.value.splice(index, 1)
    }
    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    //全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }
    const clearSelected = () => {
      cartList.value = cartList.value.filter(item => !item.selected)
    }
    return {
      cartList,
      addCart,
      delCart,
      allCount,
      allPrice,
      singleCheck,
      isAll,
      allCheck,
      clearSelected
    }
  },
  {
    persist: true
  }
)
