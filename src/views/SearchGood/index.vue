<template>
  <div class="Search-Good-Contanier">
    <!-- 搜索框 -->

    <SearchBox></SearchBox>

    <PageContent></PageContent>
  </div>
</template>

<script setup>
import SearchBox from '../../components/SearchBox.vue'
import PageContent from '../SearchGood/PageContent.vue'
</script>

<style scoped>
.Search-Good-Contanier {
  margin: 0 auto;
}
</style>
