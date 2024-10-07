<template>
  <!-- 搜索框 -->
  <div class="Search-box-container">
    <!-- 搜索类型选项 -->
    <div data-sg-type="tab">
      <ul class="searchsuggesttabs">
        <!-- <i class="fa fa-angle-down searchtabicon"></i>
        <li class="searchsuggesttabstab selected" >
        <span class="searchsuggesttabstablabel">商品</span>
      </li>
      <li class="searchsuggesttabstab" data-value="shop" >
       <span class="searchsuggesttabstablabel">店铺</span>
      </li> -->
        <li
          v-for="type in searchTypes"
          :key="type"
          class="search-types"
          :class="{ active: selectedType === type }"
          @click="selectType(type)"
        >
          {{ type }}
        </li>
      </ul>
    </div>
    <!--  -->

    <div class="Shop">
      <div>
        <input
          type="text"
          v-model="searchKey"
          placeholder="请输入搜索内容"
          name="search"
          class="search"
          autocomplete="off"
        />
      </div>
      <input
        type="submit"
        id="serachSubmit"
        class="serachBtn"
        value="搜索"
        @click.prevent="performSearch"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

//
const selectedType = ref('商品') // 默认选中商品
const searchTypes = ref(['商品', '店铺'])
//
const searchKey = ref('')

//

const performSearch = () => {
  // 判断搜索是否为空

  if (!searchKey.value) {
    alert('请输入搜索内容')
    return
  }
  // 根据选中的类型进行搜索
  if (selectedType.value === '商品') {
    router.push({ name: 'SearchGood', params: { keyWord: searchKey.value } })
  } else {
    router.push({ name: 'SearchShop', params: { keyWord: searchKey.value } })
  }
  // 调用接口获取数据
}
function selectType(type) {
  selectedType.value = type
}
</script>

<style scoped>
.Search-box-container {
  margin-top: 3dvh;
  display: flex;
  position: relative;
}
.Shop {
  width: 800px;
  margin: 0 auto;
}
.serachBtn {
  width: 20%;
  margin: 0;
  padding: 10px;
  background-color: #ff8000;
  border-radius: 0 18px 18px 0;
  font-size: 18px;
  font-family: 'MicroSoft YaHei';
  font-weight: bold;
  letter-spacing: 4px;
  text-indent: 2px;
  color: #fff;
  border: 3px solid #ff8000;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  float: right;
}
.search {
  /*  */
  text-indent: 4em;
  /*  */
  width: 80%;
  margin: 0;
  padding: 10px;
  font-size: 18px;
  float: left;
  border: 4px solid #ff8000;
  border-radius: 18px 0 0 18px;
  background-color: #fff;
  outline: none;
  color: #101010;
}

/*  */
/*  */

/* [data-sg-type=tab]{
  display: flex;
} */

/* [data-sg-type=tab] .searchtabicon {
    left: 480px;
    position: absolute;
    top: 13px;
    z-index: 99;
} */

/* [data-sg-type=tab] .searchsuggesttabstab:first-child {
    color: #11192d;
    cursor: default;
    font-weight: 500;
    pointer-events: none;
} */

.searchsuggest * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.search-types {
  margin: 0;
  padding: 10px;
  border: none;
  border-radius: 5px;
  height: 35px;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
  &.active {
    background-color: #eee;
    color: #333;
  }
}
li {
  margin-left: 0;
}

[data-sg-type='tab'] .searchsuggesttabstab {
  color: #11192d;
  cursor: pointer;
  font-family:
    Roboto,
    Helvetica Neue,
    Helvetica,
    Tahoma,
    Arial,
    PingFang SC,
    Microsoft YaHei;
  font-size: 14px;
  height: 38px;
  line-height: 38px;
  margin-top: -2px;
  padding-left: 16px;
  text-align: left;
  /*  */
}

[data-sg-type='tab'] .searchsuggesttabs {
  background: #fff;
  border-radius: 10px;
  -webkit-box-shadow: 0 24px 48px 0 rgba(0, 17, 51, 0.07);
  box-shadow: 0 24px 48px 0 rgba(0, 17, 51, 0.07);
  overflow: hidden;
  cursor: pointer;
  top: 8px;
  left: 308px;
  display: flex;
  position: absolute;
  width: 60px;
  flex-direction: column;
}

ul,
ol {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
