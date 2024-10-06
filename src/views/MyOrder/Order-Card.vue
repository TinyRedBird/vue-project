<template>
  <el-card class="Order-Container" v-for="item in cartStore.cartList" :key="item.goodsDescription">
    <template #header>
      <div class="card-header">
        <el-checkbox
          :model-value="item.selected"
          @change="(selected) => singleCheck(item, selected)"
        />
        <!-- :label="item.storeName" -->
      </div>
    </template>
    <div class="Content-Count">
      <div>
        <div class="img-Count">
          <img :src="item.goodsPicture" :alt="item.goodsDescription" />
        </div>
        <div class="Detail-Scrip">
          <span>{{ item.goodsDescription }}</span>
        </div>
        <div class="Price-Count">
          <span>{{ item.price }}元</span>
        </div>
        <div class="Count-Num">
          <el-input-number v-model="item.count" :min="1" :max="item.stock" @change="handleChange" />
        </div>
        <div class="delete-Count">
          <el-button @click.prevent="cartStore.delCart(item.goodsId)">删除</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<<<<<<< HEAD:src/views/MyOrder/Order-Card.vue
<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
const handleChange = () => {
  console.log(cartStore.cartList)
}
const singleCheck = (item, selected) => {
  console.log(item, selected)
  cartStore.singleCheck(item, selected)
}
=======
<script>
// import { useCartStore } from '@/stores/cartStore'
// const cartStore = useCartStore()
>>>>>>> 60a15b8b7e9764eb1654caf6833259036ebe3968:src/views/MyOrder/Order.vue
</script>

<style scoped>
.Count-Num {
  height: 40px;
  width: 120px;
  position: relative;
  display: flex;
  align-items: center;
  justify-self: center;
  left: 3rem;
  margin: auto 0;
}
.Order-Container {
  width: 880px;
  border-radius: 1rem;
  margin-bottom: 1rem;
}

.delete-Count {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 6rem;
}
.Content-Count {
  padding: 10px 20px 10px 20px;
  width: 100%;
}
.Content-Count div {
  display: flex;
}
.Detail-Scrip {
  display: flex;
  position: relative;
  align-items: center;
  justify-self: start;
  width: 120px;
  left: 1rem;
}
.Price-Count {
  color: #ff5000;
  left: 4rem;
  width: 80px;
  display: flex;
  position: relative;
  align-items: center;
}
.OrderLine {
  position: absolute;
  width: 90%;
  height: 1px;
  top: 60px;
  margin: 0 auto;
  border-top: solid #bbb 1px;
}
.img-Count {
  width: 200px;
  height: 150px;
}
.img-Count img {
  width: 100%;
  height: 100%;
}
.OrderCardTop {
  display: flex;
  position: relative;
  top: 1rem;
  left: 1rem;
  /* right: 1rem; */
  flex-direction: row;
}

.OrderCardTopText {
  line-height: 25px;
  font-size: 20px;
}

.OrderCardTopTextWarpper {
  width: 200px;
  position: relative;
  font-size: 18px;
  left: 1rem;
  bottom: 0.3rem;
}

.OrderCardTopWarpper {
  height: 3rem;
  position: relative;
  /* left: 1rem; */
  /* top: 1rem; */
  border-radius: 20px 20px 0 0;
  border-bottom: 1px solid #bbb;
}

.OrderWarpper {
  background-color: #fff;
  border: 1px solid #bbb;
  border-radius: 20px;
  width: 900px;
  display: flex;
  flex-direction: column;
}
</style>
