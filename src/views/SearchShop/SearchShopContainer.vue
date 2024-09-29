<template>
  <div class="SearchShopBoxWarrper">
    <div class="SearchShopBox">
      <div class="ShopCardWarrper" @click="$router.push(`/shop/${storeData.id}`)">
        <div class="HeaderTextWrapper">
          <div><i class="fa fa-home SearchShopIcon"></i></div>
          <div class="SearchShopText">
            <span>{{ storeData.name }}</span>
            <div class="exp-info">
              <span class="store-adderss">{{ storeData.address }}</span>
              <span class="store-tel">联系电话{{ storeData.tel }}</span>
            </div>
          </div>
        </div>

        <div class="ShopCardPic">
          <div class="Pic-Container" v-for="(item, index) in storeData1" v-bind:key="item.storeId">
            <img
              v-if="index < 4"
              :key="index"
              :src="item.goodsPicture"
              :title="item.goodsDescription"
              class="Pic-Container"
            />
            <span class="ShopCardPrice" v-if="index < 4">{{ item.price }}￥</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getStoreService, getStoreSaleService } from '@/apis/store'
let storeId = Number(1)
let storeData = ref({})
let storeData1 = ref({})
const getStoreById = async (id) => {
  const result = await getStoreService(id)
  const params = {
    currentPage: 1,
    pageSize: 10
  }
  const result2 = await getStoreSaleService(id, params)
  storeData1.value = result2.data.items
  storeData.value = result.data
}
console.log(storeData1)
console.log(storeData)
getStoreById(storeId)
</script>

<style scoped>
.store-tel {
  position: relative;
  bottom: 1px;
  left: 2px;
  color: #666;
  font-size: 14px;
  display: block;
}
.store-adderss {
  position: relative;
  left: 2px;
  display: block;
  color: #888;
  font-size: 14px;
}
.Pic-Container {
  position: relative;
}
.Pic-Container img {
  width: 200px;
  height: 230px;
  padding: 0;
}
.exp-info {
  position: relative;
  top: 7rem;
}
.ShopCardPrice {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 25%;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
}

.SearchShopText {
  font-size: 24px;
  position: relative;
}

.ShopCardPic {
  float: left;
  margin: 10px;
  margin-left: 40px;
  display: flex;
  position: relative;
}

.SearchShopIcon {
  font-size: 28px;
}
.Pic-Container {
  margin: 0;
  padding: 0;
  display: flex;
}
.HeaderTextWrapper {
  float: left;
  position: relative;
  top: 30px;
  left: 40px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  letter-spacing: 0;
  justify-content: center;
}

.ShopCardPic img {
  width: 200px;
  height: 230px;
}

.SearchShopBoxWarrper {
  background-color: #fff;
  width: 1400px;
  display: flex;
  flex-direction: column;
  position: relative;
  top: 50px;
  /* margin: 0 auto; */
  border-radius: 20px;
  box-shadow: 0 4px 15px 10px rgba(182, 213, 215, 0.7);
}

.SearchShopBox {
  width: 1100px;
  border-radius: 20px;
  box-shadow: 1px 8px 28px 10px #cecece;
  margin: 30px auto;
}

.ShopCardWarrper {
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  width: 100%;
}
</style>
