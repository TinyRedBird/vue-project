<!-- <template>
  <div v-for="item in productList" :key="item.goodsId">
    <div class="PickItem">
      <div class="">
        <img class="" :src="item.goodsPicture" :alt="item.goodsDescription" />
        <span>{{ item.price }}</span>
        <span>{{ item.goodsDescription }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { getSaleGoodsList } from '@/apis/sale'
import { useRoute } from 'vue-router'
const route = useRoute()
const productList = ref([])
const searchKey = ref(route.params.keyWord)

const fetchStoreList = async () => {
  let result = await getSaleGoodsList({
    currentPage: 1,
    pageSize: 30,
    key: searchKey.value
  })
  productList.value = result.data.items
  console.log(productList.value)
  console.log(searchKey.value)
}

watch(
  () => route.params.keyWord,
  async (newsearchKey) => {
    await fetchStoreList()
    console.log(newsearchKey)
  },
  { immediate: true }
)
</script>

<style scoped>
.PickItem {
  height: 350px;
  width: 250px;
  border-radius: 20px;
  padding: 0;
  background-color: #efefef;
  border: 1px solid #bbb;
}
</style> -->
