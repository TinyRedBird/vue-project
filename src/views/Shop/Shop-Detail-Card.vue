<template>
  <div class="Daily-Rec-Container" v-for="item in store" :key="item.goodsId">
    <RouterLink :to="`/Good/${item.storeId}/${item.goodsId}`" @change.prevent="getStoreSale">
      <div class="flex-col">
        <div class="Content-Container rounded-lg">
          <img
            v-img-lazy="item.goodsPicture"
            :src="item.goodsPicture"
            :title="item.goodsDescription"
            class="img-container rounded-lg"
            loading="lazy"
            data-blurhash="LYAeROVqBHtTOco$rpM|ETn#xTa#"
            crossorigin="anonymous"
          />
          <div>
            <span>{{ item.goodsDescription }}</span>
          </div>
          <div class="mt-2">
            <span class="text-lg font-bold Price-text">{{ item.price }}</span>
            <span class="text-muted-foreground">元</span>
          </div>
        </div>
      </div>
    </RouterLink>
  </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { getStoreSaleService } from '@/apis/store'
import { ref, watch } from 'vue'
const route = useRoute()
let store = ref({})
//

//
const currentPage = ref(1)
const pageSize = ref(30)
//
const getStoreSale = async () => {
  const storeId = Number(route.params.storeId)
  let params = {
    currentPage: currentPage.value,
    pageSize: pageSize.value,
    typeId: route.params.typeId
  }
  const result = await getStoreSaleService(storeId, params)
  store.value = result.data.items
  // console.log(store)
}

watch(
  () => route.params.typeId,
  async (newtypeId) => {
    await getStoreSale()
    console.log(newtypeId)
  },
  { immediate: true }
)
</script>
<style>
.Daily-Rec-Container > * {
  margin: 0;
}

.Daily-Rec-Container {
  margin: 25px;
  width: 305px;
  height: 380px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  border-radius: 0.5rem;
}

.flex-col {
  flex-direction: column;
  display: flex;
}

*,
::after,
::before {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: #e5e7eb;
}

.Content-Container {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255);
  width: 305px;
  height: 380px;
  border-radius: 0.5rem;
  border: 1px solid #666;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.img-container {
  width: 100%;
  height: auto;
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 0.5rem;
}

.Price-text {
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-muted-foreground {
  color: #ff8800;
}
</style>
