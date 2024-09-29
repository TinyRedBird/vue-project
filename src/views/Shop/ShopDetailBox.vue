<template>
  <div>
    <div class="ShopDetailWrapper">
      <div class="Left-BoxWrapper">
        <div class="LeftSecletBox active">
          <span>全部商品</span>
        </div>

        <div
          v-for="item in StoreType"
          class="LeftSecletBox"
          :key="item.id"
          @click="SeletedTypeSale(item.id)"
        >
          <span>{{ item.name }}</span>
        </div>
      </div>

      <div class="right-BoxWrapper">
        <Card :goods="goods"></Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import Card from '../Shop/Shop-Detail-Card.vue'

import { useRoute } from 'vue-router'
import { getStoreTypeService } from '@/apis/store'
import { ref } from 'vue'


//
const route = useRoute()
const StoreType = ref({})
// console.log(route.params.storeId, route.params.goodsId)

const getStoreType = async () => {
  const storeId = Number(route.params.storeId)
  const result = await getStoreTypeService(storeId)
  StoreType.value = result.data
  // console.log(result)
}
function SeletedTypeSale(typeId) {
  console.log(typeId)
  const props = defineProps(['foo'])
  console.log(props.foo)
}

getStoreType()
</script>

<style scoped>
.right-BoxWrapper {
  width: 1090px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 10px 28px 8px rgba(182, 213, 215, 0.62);
  margin-left: 25px;
}
.active {
  color: #f07676;
  box-shadow: 1px 2px 4px 3px rgba(253, 117, 117, 0.311);
}
.LeftSecletBox span {
  font-size: 28px;
  text-align: center;
  display: block;
}

.LeftSecletBox {
  line-height: 50px;
  vertical-align: middle;
  align-items: center;
  flex-direction: row;
  margin: 20px auto;
  /* margin-top: 20px; */
  height: 50px;
  width: 180px;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
}

.Left-BoxWrapper {
  border-radius: 25px;
  float: left;
  width: 200px;
  background-color: #377f7f;
}

.ShopDetailWrapper {
  margin: 100px auto;
  display: flex;
  height: 100%;
  width: 1320px;
}
</style>
