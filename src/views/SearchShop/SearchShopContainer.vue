<template>
  <div v-for="item in storeData" v-bind:key="item.id">
    <div class="SearchShopBoxWarrper">
      <div class="SearchShopBox">
        <div class="ShopCardWarrper">
          <div class="HeaderTextWrapper">
            <div><img :src="item.logo" class="SearchShopIcon" /></div>
            <div class="SearchShopText">
              <span>{{ item.name }}</span>
              <div class="exp-info">
                <span class="store-adderss">{{ item.address }}</span>
                <span class="store-tel">联系电话{{ item.tel }}</span>
              </div>
            </div>
          </div>

          <div class="ShopCardPic">
            <div
              class="Pic-Container"
              v-for="(good, index) in item.goods"
              v-bind:key="good.storeId"
            >
              <RouterLink :to="`/Shop/${item.id}/${good.typeId}`">
                <img
                  v-if="index < 4"
                  :key="index"
                  :src="good.goodsPicture"
                  :title="good.goodsDescription"
                  class="Pic-Container"
                />
                <span class="ShopCardPrice" v-if="index < 4">{{ good.price }}￥</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import { getStoreDetailService, getStoreSaleService } from '@/apis/store'
import { useInjectSearchContext } from '@/stores/search-context'

const route = useRoute()
const search = useInjectSearchContext()
const storeData = ref({})

const getStoreById = async () => {
  const params = {
    currentPage: 1,
    pageSize: 30,
    key: search.searchKey
  }
  const result = await getStoreDetailService(params)
  storeData.value = result.data.items
  //

  storeData.value.forEach(async (item) => {
    const params = {
      currentPage: 1,
      pageSize: 30
    }
    const goodsResult = await getStoreSaleService(item.id, params)
    item.goods = goodsResult.data.items

  })
}

watch(
  () => route.params.keyWord,
  async (newKeyWord) => {
    if (newKeyWord) {
      search.searchKey = newKeyWord
      getStoreById()
    }
  },
  { immediate: true }
)
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
  width: 40px;
  height: 40px;
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
  margin: 20px auto;
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
  height: 250px;
  width: 100%;
}
</style>
