<template>
  <div class="Good-Container">
    <div class="GoodWarp">
      <Layout></Layout>
      <DetailCard></DetailCard>
    </div>
  </div>
</template>

<script setup>
//
import Layout from './Good-Layout.vue'
import DetailCard from '../Good/DetailCard.vue'
//
</script>

<style scoped>
.Good-Container {
  height: 100%;
  box-sizing: border-box;
  margin: 0 auto;
}
.GoodWarp {
  display: flex;
  flex-direction: column;
}
</style>
