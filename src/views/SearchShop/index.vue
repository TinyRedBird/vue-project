<template>
  <div class="Search-shop-container">
    <SearchGoodBox></SearchGoodBox>
    <SearchShopBox></SearchShopBox>
  </div>
</template>

<script setup>
import SearchGoodBox from '../../components/SearchBox.vue'
import SearchShopBox from './SearchShopContainer.vue'
</script>

<style scoped>
.Search-shop-container {
  margin: 0 auto;
}
</style>
