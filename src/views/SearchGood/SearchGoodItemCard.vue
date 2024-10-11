<template>
  <div class="Daily-Rec-Container" v-for="item in productList" :key="item.goodsId">
    <RouterLink :to="`/Good/${item.storeId}/${item.goodsId}`">
      <div class="flex-col">
        <div class="Content-Container">
          <img
            v-img-lazy="item.goodsPicture"
            :src="item.goodsPicture"
            :title="item.goodsDescription"
            class="img-container"
            loading="lazy"
            crossorigin="anonymous"
          />
          <div>
            <span>{{ item.goodsDescription }}</span><br>
            <span>{{ item.storeName }}</span>
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
import { ref, watch } from 'vue'
import { getSaleGoodsList } from '@/apis/sale'
import { useRoute } from 'vue-router'
import { useInjectSearchContext } from '@/stores/search-context'
///
const route = useRoute()
const search = useInjectSearchContext()
const productList = ref([])

const fetchStoreList = async () => {
  let result = await getSaleGoodsList({
    currentPage: 1,
    pageSize: 30,
    key: search.searchKey
  })
  productList.value = result.data.items
}

watch(
  () => route.params.keyWord,
  async () => {
    if (search.selectedType === '商品') {
      console.log(search.searchKey)
      // search.searchKey = route.params.keyWord

      fetchStoreList()
    }
  },
  { immediate: true }
)
</script>
<style scoped>
.Daily-Rec-Container {
  width: 298px;
  height: 380px;
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.flex-col {
  flex-direction: column;
  display: flex;
}

*,
::after,
::before {
  box-sizing: border-box;
}

.Content-Container {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255);
  border: 1px solid #666;
  height: 380px;
}

.img-container {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
  /* vertical-align: middle; */
}

/* .mt-2 {
   margin-top: 0.5rem; 
} */

.Price-text {
  font-weight: 700;
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-muted-foreground {
  color: #ff8800;
}
</style>
