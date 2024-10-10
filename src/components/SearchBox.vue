<template>
  <!-- 搜索框 -->
  <div class="Search-box-container">
    <!-- 搜索类型选项 -->
    <div data-sg-type="tab">
      <i class="angle-container" @click="showOptions = !showOptions">^</i>
      <ul class="searchsuggesttabs" v-if="showOptions">
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
      <ul class="searchsuggesttabs" v-else>
        <li class="search-types" :class="{ active: selectedType === type }">
          {{ selectedType }}
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
import { inject } from 'vue'
const router = useRouter()

const search = inject('searchContext')
console.log('Injected search:', search)
if (!search) {
  throw new Error('searchContext is not provided')
}
let { searchKey, selectedType } = search

const showOptions = ref(false) // 控制选项是否显示

const searchTypes = ref(['商品', '店铺'])
const type = ref('')
const performSearch = () => {
  // 判断搜索是否为空

  if (!searchKey) {
    alert('请输入搜索内容')
    return
  }
  // 根据选中的类型进行搜索
  if (selectedType === '商品') {
    router.push({ name: 'SearchGood', params: { keyWord: searchKey } })
  } else {
    router.push({ name: 'SearchShop', params: { keyWord: searchKey } })
  }
}
// function selectType(type) {
//   selectedType = type
// }

// // 隐藏选项列表
// const hideOptions = () => {
//   showOptions.value = false
// }

// 选择一个选项，并更新输入框的值
const selectType = (option) => {
  selectedType = option // 更新搜索关键词
  search.selectedType = selectedType
  showOptions.value = false // 隐藏选项列表
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
.angle-container {
  line-height: 40px;
  justify-self: center;
  font-family: 'Times New Roman', Times, serif;
  font-size: 25px;
  position: relative;
  top: 10px;
  left: 375px;
  cursor: pointer;
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

.searchsuggest * {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.search-types {
  margin: 0;
  /* padding: 10px;
   */
  line-height: 35px;
  border: none;
  border-radius: 5px;
  height: 35px;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
  font-size: 19px;
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
  left: 313px;
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
