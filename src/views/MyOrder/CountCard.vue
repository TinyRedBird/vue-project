<template>
  <div>
    <div class="Warp">
      <div class="TopWarp">
        <div class="OrderCheckBox">
          <el-checkbox size="large" :model-value="cartStore.isAll" @change="allCheck">
          </el-checkbox>
        </div>
        <div class="Order-Contaner">
          <el-button class="OrderBtn" @click="cartStore.clearSelected">删除</el-button>
        </div>
      </div>
      <div class="CountWarp">
        <OrderCard></OrderCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import OrderCard from './Order-Card.vue'
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
const allCheck = (selected) => {
  console.log(selected,"selected");
  cartStore.allCheck(selected)
}
</script>

<style scoped>
[type='checkbox'] {
  display: flex;
}
.Line {
  position: absolute;
  width: 100%;
  height: 1px;
  top: 60px;
  border-top: solid #bbb 1px;
}
.Order-Contaner {
  position: relative;
  align-items: center;
  display: flex;
}
.OrderBtn {
  position: relative;
  align-items: center;
  vertical-align: middle;
  font-variant: normal;
  justify-content: center;
  display: flex;
}

.OrderCheckBox {
  width: 30px;
  margin: 10px;
  padding-left: 10px;
  display: flex;
}

.TopWarp {
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  border-bottom: 1px solid #ddd;
  /* height: 3.5rem; */
  /* justify-content: space-between; */
  font-size: 26px;
}

.Warp {
  flex-direction: column;
  left: 3rem;
  top: 3rem;
  display: flex;
  width: 1020px;
  /* height: 100%; */
  background-color: #f3f6f8;
  border: 1px solid #bbbbbb;
  border-radius: 20px;
  position: relative;
  box-shadow: 1px 8px 3px 2px rgba(17, 15, 14, 0.3);
}
.CountWarp {
  position: relative;
  /* top: 4rem; */
  margin: 20px auto;
}
</style>
