<template>
  <div class="Daily-Rec-Container" v-for="item in saleGoodsList" :key="item.goodsId">
    <RouterLink :to="`/Good/${item.storeId}/${item.goodsId}`">
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
import { getSaleGoodsList } from '@/apis/home'
import { ref } from 'vue'
//分页数据
const pageSize = ref(20)
const currentPage = ref(1)
const saleGoodsList = ref([])

const fetchGoodsList = async () => {
  let params = {
    currentPage: currentPage.value,
    pageSize: pageSize.value
    //
  }
  let result = await getSaleGoodsList(params)
  saleGoodsList.value = result.data.items
  alert(result.msg ? result.msg : '获取商品列表失败')
}
console.log(saleGoodsList)
fetchGoodsList()

defineProps({
  goods: {
    type: Object,
    default: () => {}
  }
})
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
