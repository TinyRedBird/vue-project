<template>
  <!-- 一级路由出口组件 -->
  <div id="app">
    <div class="background">
    </div>
    <div>
      <!-- <Bread></Bread> -->
    </div>
  </div>
  
  <router-view></router-view>
</template>

<script setup>
import { provide } from 'vue'
// import Bread from '@/components/BreadCrumb.vue'
import { searchContext } from '@/stores/search-context'

// 提供 searchContext
provide('searchContext', searchContext)
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

#app {
  display: flex;
  position: relative;
  overflow-x: hidden;
  height: 100vh;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('../src/assets/piture.png');
  background-size: cover;
  background-position: center;
  z-index: -1;
}
</style>
