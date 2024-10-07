import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useTokenStore } from '@/stores/token'
import { insertCartService, findNewCartListService, delCartService } from '@/apis/cart'

export const useCartStore = defineStore(
  'cart',
  () => {
    const userStore = useTokenStore()
    const cartList = ref([])

    const isLogin = computed(() => userStore.token)
    //获取最新购物车列表
    const updateNewList = async () => {
      const result = await findNewCartListService({ currentPage: 1, pageSize: 30 })
      cartList.value = result.data
      console.log(result)
    }
    const addCart = async (goods) => {
      const { storeId, goodsId, count } = goods
      // 设置请求头
      const config = {
        headers: {
          Authorization: isLogin.value ? 'Bearer ' + isLogin.value : ''
          // Authorization: 'Bearer YOUR_ACCESS_TOKEN' // 使用适当的授权令牌格式
        }
      }

      // 设置请求体
      const bodyData = {
        storeId,
        goodsId,
        quantity: count
      }
      ////
      if (isLogin.value) {
        console.log(isLogin.value, 'islogin')
        await insertCartService(bodyData, config)
        console.error('请求失败')

        updateNewList()
      } else {
        const item = cartList.value.find((item) => goods.goodsId === item.goodsId)
        if (item) {
          item.count = item.count + goods.count
          // console.log('添加购物车过了')
        } else {
          cartList.value.push(goods)
          // console.log('没有添加购物车过')
        }
        // console.log('添加成功')
      }
    }

    const singleCheck = (goods, selected) => {
      const item = cartList.value.find((item) => goods.goodsId === item.goodsId)
      item.selected = selected
    }
    //删除购物车
    const delCart = async (goodsId) => {
      if (isLogin.value) {
        delCartService([goodsId])
        console.log('123456')
        updateNewList()
      } else {
        //思路
        //1.找到要删除项的下标值
        //2.使用数组的过滤方法
        const index = cartList.value.findIndex((item) => goodsId === item.goodsId)
        cartList.value.splice(index, 1)
      }
    }

    const allCount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
    const allPrice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
    //全选
    const isAll = computed(() => cartList.value.every((item) => item.selected))

    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected))
    }
    // 全选删除
    const clearSelected = () => {
      cartList.value = cartList.value.filter((item) => !item.selected)
    }
    const selectedCount = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0)
    )
    const selectedPrice = computed(() =>
      cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0)
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
