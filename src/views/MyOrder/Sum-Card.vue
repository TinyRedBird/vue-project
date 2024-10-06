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
          <div class="Bold-Text"><span>结算明细</span></div>
          <div class="Cin-Text">
            <span>已选{{ cartStore.allCount }}件商品</span>
          </div>
        </div>
      </template>
      <!-- <p v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</p> -->
      <template #footer>合计：{{cartStore.allPrice.toFixed(2)}}元</template>
    </el-card>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'
let cartStore = useCartStore()
// console.log(cartStore.allCount)
</script>

<style scoped>
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
