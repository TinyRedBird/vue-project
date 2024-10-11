<!-- <template>
  <div>
    <div class="pickContentItem">
      <a href="/">
        <div>
          <div class="Pic-Container">
            <img
              src="https://tse4-mm.cn.bing.net/th/id/OIP-C.8tlwbGsJvlNZwGAGL36W8AHaFS?rs=1&pid=ImgDetMain"
              alt=""
            />
          </div>
          <div><span>苹果</span></div>
          <div><span>25.6</span><span>￥</span></div>
        </div>
      </a>
    </div>
  </div>
</template> -->
<!-- 
<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { getStoreSaleService } from '@/apis/store'
const route = useRoute()
let store = ref({})
//
const currentPage = ref(1)
const pageSize = ref(20)
//
const getStoreSale = async () => {
  const storeId = Number(route.params.storeId)
  let params = {
    currentPage: currentPage.value,
    pageSize: pageSize.value
  }
  const result = await getStoreSaleService(storeId, params)
  store.value = result.data.items
}
// console.log(store)

getStoreSale()
</script> -->

<!-- <style scoped>

.Pic-Container{
  width: 250px;
}
.pickContentItem {
  background-color: var(--tbpc-white-color, #fff);
  border-radius: 12px 12px 0 0;
  box-sizing: border-box;
  cursor: pointer;
  border: 1px solid #bbb;
  height: 350px;
  margin: 0 20px 20px 20px;
  position: inherit;
  box-shadow: #101010;
  transition: all 0.5s;
  width: 250px;
}
</style>  -->
