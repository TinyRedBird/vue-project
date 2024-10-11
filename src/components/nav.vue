<template>
  <div class="taobao-navbar">
    <div class="navbar-container">
      <div class="logo">
        <!-- <img src="/path/to/logo.png" alt="淘宝 Logo" /> -->
      </div>
      <ul class="nav-items">
        <li v-for="item in navItems" :key="item">
          <a href="#">{{ item }}</a>
        </li>
      </ul>

      <div class="user-info">
        <a href="#">我的淘宝</a>
        <a href="#">购物车</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const navItems = ref(['首页', '聚划算', '品牌闪购', '天天特卖', '其他'])
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.taobao-navbar {
  background-color: #c0b6b1;
  color: white;
}

.navbar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.nav-items {
  display: flex;
  list-style: none;
  padding: 0;
}

.nav-items li {
  margin: 0 10px;
}

.nav-items a {
  color: white;
  text-decoration: none;
}

.search-container {
  display: flex;
  background-color: #fff;
  border-radius: 20px;
  padding: 5px;
}

.search-container input {
  border: none;
  padding: 5px;
  border-radius: 20px;
}

.search-container button {
  border: none;
  background-color: #ff5200;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  cursor: pointer;
}

.user-info a {
  margin-left: 10px;
  color: white;
  text-decoration: none;
}
</style>
