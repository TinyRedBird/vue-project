import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useTokenStore } from '@/stores/token'
import {
  insertCartService,
  // changeCartService,
  findNewCartListService,
  delCartService
} from '@/apis/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useTokenStore()
    const cartList = ref([])

    const isLogin = computed(() => userStore.token)
    // const isLogin = computed(() => !!userStore.token)
    //获取最新购物车列表
    const updateNewList = async () => {
      // console.log('cartList', cartList)
      const result = await findNewCartListService({ currentPage: 1, pageSize: 30 })
      cartList.value.items = result.data.items
      if (result.code === 0 && result.msg === '操作成功') {
        cartList.value.items = result.data.items
      } else {
        console.error('获取购物车列表失败:', result.msg)
      }
    }

    const addCart = async (goods) => {
      console.log("goods",goods)
      
      let { storeId, goodsId, quantity } = goods

      const item = cartList.value.find((item) => goods.goodsId === item.goodsId)

      if (isLogin.value) {
        // if (item) {
        //   await changeCartService({ quantity: quantity, id: goodsId })
        //   updateNewList()
        //   console.log(goodsId, 'changesucces')
        // } else {
          try {
            await insertCartService({ storeId, goodsId, quantity })
            updateNewList()
          } catch (error) {
            console.error('添加购物车异常:', error)
          // }
        }
      }
      if (item) {
        item.quantity += goods.quantity
      } else {
        cartList.value.push(goods)
      }
    }

    const singleCheck = (goods, selected) => {
      const item = cartList.value.find((item) => goods.goodsId === item.goodsId)

      if (item) {
        item.selected = selected
      }
    }

    //删除购物车
    const delCart = async (goodsId) => {
      if (isLogin.value) {
        try {
          await delCartService(goodsId)
          updateNewList()
        } catch (error) {
          console.error('删除购物车异常:', error)
        }
      } else {
        //思路
        //1.找到要删除项的下标值
        //2.使用数组的过滤方法
        const index = cartList.value.findIndex((item) => goodsId === item.goodsId)
        if (index !== -1) {
          cartList.value.items.splice(index, 1)
        }
      }
    }

    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.quantity, 0))
    // console.log('allCount', allCount)

    const allPrice = computed(() =>
      cartList.value.reduce((a, c) => a + c.quantity * c.goodsPrice, 0)
    )
    //全选
    // console.log('allPrice', allPrice)

    const isAll = computed(() => cartList.value.every((item) => item.selected))

    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }
    // 全选删除
    const clearSelected = () => {
      cartList.value.items = cartList.value.filter((item) => !item.selected)
    }

    const selectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.quantity, 0)
    )

    const selectedPrice = computed(() =>
      cartList.value
        .filter((item) => item.selected)
        .reduce((a, c) => a + c.quantity * c.goodsPrice, 0)
    )

    const selectedItems = computed(() => {
      return cartList.value.filter((item) => item.selected)
    })
    return {
      cartList,
      addCart,
      delCart,
      allCount,
      allPrice,
      singleCheck,
      isAll,
      allCheck,
      clearSelected,
      selectedCount,
      selectedPrice,
      selectedItems
    }
  },
  {
    persist: true
  }
)
