<template>
  <div>
    <div class="Warp">
      <div class="TopWarp">
        <div class="OrderCheckBox">
          <el-checkbox size="large"> </el-checkbox>
        </div>
        <div class="Order-Contaner">
          <el-button class="OrderBtn">删除</el-button>
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
// import { ref } from 'vue'

// const checkAll = computed({
//   get: () => selectedItems.value.length === orderCards.value.length,
//   set: (value) => {
//     if (value) {
//       orderCards.value.forEach((item) => selectedItems.value.push(item.goodsId))
//     } else {
//       selectedItems.value = []
//     }
//   }
// })

// const isIndeterminate = computed(() => {
//   return selectedItems.value.length > 0 && selectedItems.value.length < orderCards.value.length
// })

// const handleCheckAllChange = (value) => {
//   if (value) {
//     orderCards.value.forEach((item) => selectedItems.value.push(item.goodsId))
//   } else {
//     selectedItems.value = []
//   }
// }
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
