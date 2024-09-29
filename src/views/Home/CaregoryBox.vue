<template>
  <div>
    <div class="sortBox">
      <div class="index-all-hook">
        <a href="/" title="分类" class="Icon-container">
          <i class="fa fa-list Icon"></i>
          <span class="Sort-Text">分类</span>
        </a>
        <div>
          <div class="indexSortListBox">
            <div class="coverBox"></div>
            <ul class="indexList">
              <!-- <template > -->
              <li v-for="item in typeList" v-bind:key="item.id" class="indexList-item">
                <img :src="item.icon" class="typeimg" />
                <span>{{ item.name }}</span>
              </li>
              <!-- </template> -->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { homeCategoryListService } from '@/apis/home'

const typeList = ref()

const homeCategoryList = async () => {
  let result = await homeCategoryListService()
  typeList.value = result.data
}
// console.log(typeList)
homeCategoryList()
</script>

<style scoped>
.Sort-Text,
.Icon {
  display: inline-block;
  text-align: center;
  /* vertical-align:middle; */
  font-size: 24px;
}

.Icon {
  position: relative;
  padding-right: 5px;
}
.indexSortListBox .typeimg {
  width: 20px;
  height: 20px;
  vertical-align: middle;
  margin-right: 5px;
}
.indexSortListBox ul span {
  cursor: pointer;
}
.sortBox {
  display: flex;
  position: absolute;
  width: 300px;
  height: 450px;
}

.indexList {
  position: absolute;
  left: 0;
  top: 0;
  padding: 0.8em;
  width: 300px;
  height: 400px;
  z-index: 1000;
}

.coverBox {
  position: absolute;
  width: 300px;
  height: 400px;
  background: #fff;
  top: 0;
  left: 0;
}

.Icon-container {
  position: absolute;
  top: 3px;
  left: 0.8em;
  font-weight: bold;
  border-radius: 20px 20px 0 0;
  text-decoration: none;
  color: #fff;
}

.index-all-hook {
  display: block;
  width: 300px;
  height: 50px;
  top: 0;

  background-color: #ff8000;
  border-radius: 20px 20px 0 0;
  text-decoration: none;
}

.indexList li {
  position: relative;
  width: 150px;
  overflow: hidden;
  padding: 0 0;
  height: 30px;
  line-height: 25px;
}

.indexSortListBox {
  position: absolute;
  top: 50px;
  width: 300px;
  height: 400px;
}
</style>
