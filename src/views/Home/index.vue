<template>
  <div class="Home-container">
    <bread></bread>
    <SearchBox @search="handleSearch"></SearchBox>

    <div class="Outer screenOuter">
      <!-- 分类框 -->
      <CaregoryBox></CaregoryBox>
      <!-- 中间轮播图 -->
      <Carousel></Carousel>
      <!-- 我的 -->
      <My></My>
    </div>

    <!-- layer -->
    <div class="dailyRecommendation">
      <dailyRecommendation></dailyRecommendation>
    </div>
    <!-- ///////////////////////////////////////// -->
  </div>
</template>

<script setup>
import bread from '@/components/BreadCrumb.vue'
import Carousel from './Carousel-Card.vue'
import CaregoryBox from './CaregoryBox.vue'
import SearchBox from '@/components/SearchBox.vue'
import dailyRecommendation from '@/views/Home/daily-Rec-Card.vue'
import My from './My-Detail-Card.vue'

function handleSearch(query) {
  this.$router.push({ name: 'SearchGood', query: { search: query } })
}
</script>

<style>
.Home-container {
  margin: 0 auto;
}
* {
  box-sizing: border-box;
}

.dailyRecommendation {
  position: relative;
  top: 40px;
  padding: 0px;
  width: 1400px;
  background-color: #fff;
  margin: 0 auto;
}

.Outer {
  top: 50px;
  position: relative;
}

.screenOuter {
  position: relative;
  margin: 0 auto;
  padding: 0;
  width: 1400px;
  height: 450px;
}

li a {
  display: inline-block;
  vertical-align: middle;
  color: #000;
  font-size: 18px;
  letter-spacing: 1px;
}

a {
  text-decoration: none;
  outline: 0;
}

ul,
li,
a,
span,
i {
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>
