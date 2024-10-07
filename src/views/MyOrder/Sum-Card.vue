<template>
  <div class="sum-card-container">
    <!--  -->
    <!-- <div class="Sum-Head">
      <div class="Bold-Text"><span>结算明细</span></div>
      <div class="Cin-Text"><span>已选0件商品</span></div>
    </div>
    
    <div class="Sum-Content"></div>
    
    <div class="Sum-Foot">
      <div><span></span></div>
      <div><button></button></div>
    </div> -->
    <el-card class="Sum-Card">
      <template #header>
        <div class="card-header">
          <div class="Bold-Text">
            <span>结算明细</span>
            <span class="Sum-Card-text">共{{ cartStore.allCount }}件商品</span>
          </div>
          <div class="Cin-Text">
            <span>已选{{ cartStore.selectedCount }}件商品</span>
          </div>
        </div>
      </template>
      <img
        v-for="item in cartStore.selectedItems"
        :key="item.goodsId"
        class="text count-img-wapper item"
        :src="item.goodsPicture"
        :title="item.goodsDescription"
      />
      <!-- {{ item.goodsDescription }} -->
      <!-- </p> -->
      <template #footer>合计：{{ cartStore.selectedPrice.toFixed(2) }}元</template>
    </el-card>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
let cartStore = useCartStore()
// console.log(cartStore.selectedItems)
</script>

<style scoped>
.Sum-Card-text {
  font-weight: 600;
  font-size: 15px;
  color: #555;
}
.count-img-wapper {
  width: 100px;
  height: 100px;
}
.Sum-Card {
  width: 300px;
}
.sum-card-container {
  position: absolute;
  right: 3rem;
  top: 3rem;
}
.Bold-Text {
  font-size: 16px;
  font-weight: 550;
}
.Cin-Text {
  font-size: 14px;
  font-weight: 400;
  color: #555;
}
</style>
