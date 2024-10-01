<template>
  <div>
    <RouterLink :to="`/Shop/${product.storeId}/${product.typeId}`">
      <div class="Layout GoodHeader">
        <a href="" class="detailWarp">
          <div class="leftWarp">
            <div class="shopIconWarp">
              <img class="shopIconImg" :src="product.storeLogo" :alt="product.storeId" />
            </div>
            <div class="ShopNameWrapper">
              <span class="shopName">{{ route.params.goodsId.storeName }}</span>
            </div>
          </div>
        </a>
        <div class="optionWrap">
          <a class="ShopButton" href="">
            <span class="buttonText">进入店铺</span>
          </a>
        </div>
      </div>
    </RouterLink>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { getSaleDetail } from '@/apis/sale'
import { ref } from 'vue'

//
const route = useRoute()
const product = ref([])
console.log(route.params.storeId, route.params.goodsId)

const getGoods = async () => {
  const storeId = Number(route.params.storeId)
  const goodsId = Number(route.params.goodsId)
  let params = { storeId: storeId, goodsId: goodsId }
  const result = await getSaleDetail(params)
  product.value = result.data
}
getGoods()
</script>

<style scoped>
.buttonText {
  color: #000;
  font-size: 28px;
  letter-spacing: 0;
  line-height: 40px;
}

.ShopButton {
  align-items: center;
  border: 1px solid #000;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  height: 50px;
  justify-content: center;
  margin-right: 12px;
  padding: 0 12px;
}

.shopName {
  color: #000;
  font-size: 28px;
  line-height: 28px;
  word-break: keep-all;
}

.shopIconWarp {
  margin-right: 12px;
  position: relative;
}

.leftWarp {
  padding-left: 12px;
  align-items: center;
  display: flex;
  flex-direction: row;
  z-index: 10;
  box-sizing: border-box;
}

.detailWarp {
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 50px;
}

.GoodHeader {
  align-items: center;
  background-color: #fff;
  display: flex;
  box-sizing: border-box;
  flex-direction: row;
  padding: 0 20px;
  justify-content: space-between;
  width: 100%;
}

.ShopNameWrapper {
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 12px;
}

.optionWrap {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 200px;
}

.shopIconImg {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  vertical-align: middle;
  border: 0;
}

.Layout {
  border-radius: 25px;
  box-shadow: 0 10px 28px 8px rgba(182, 213, 215, 0.7);
  padding: 0;
  height: 160px;
  width: 80vw;
  margin: 0 auto;
  position: relative;
  top: 5vh;
  text-decoration: none;
}
</style>
