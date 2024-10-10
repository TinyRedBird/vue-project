<script setup>
import { ref } from 'vue';
import SaleEditDrawer from './SaleEditDrawer.vue';
import SaleAddDrawer from './SaleAddDrawer.vue';
import { getTypeListService } from '@/apis/adminApis/adminType';
import { getStoreListService } from '@/apis/adminApis/adminStore'
import { getSaleListService, delSaleService } from '@/apis/adminApis/adminSale'
import { ElMessage, ElMessageBox } from 'element-plus';
//查询
const query = ref({
    currentPage: 1,
    pageSize: 10,
    key: '',
    typeId: '',
    storeId: '',
    minPrice: '',
    maxPrice: '',
    orderBy: '',
    status: ''
})

const saleList = ref([])
const getSaleList = async () => {
    const res = await getSaleListService(query.value)
    saleList.value = res.data
}
getSaleList()

const typeList = ref([])
const getTypeList = async () => {
    const res = await getTypeListService()
    typeList.value = res.data
}
getTypeList()

//远程搜索商店
const storeList = ref([])
const storeQuery = ref({
    currentPage: 1,
    pageSize: 20,
    key: ''
})
const getStoreRemote = async (key) => {
    storeQuery.value.key = key
    const res = await getStoreListService(storeQuery.value)
    storeList.value = res.data
}

//分页
const curChange = (current) => {
    query.value.currentPage = current
    getSaleList()
}

//重置
const resetForm = () => {
    for (let key in query.value) {
        query.value[key] = ''
    }
    query.value.currentPage = 1
    query.value.pageSize = 10
    getSaleList()
}

//添加/编辑抽屉
const editDrawer = ref()
const openEditDrawer = (row) => {
    editDrawer.value.openDrawer(row)
}
const addDrawer = ref()
const openAddDrawer = () => {
    addDrawer.value.openDrawer(null)
}

const refreshPage = () => {
    let lastPage = Math.ceil(saleList.value.total / saleList.value.pageSize)
    if (saleList.value.total % saleList.value.pageSize === 0) {
        lastPage++;
    }
    curChange(lastPage)
}

//删除
const openDelBox = (row) => {
    ElMessageBox.confirm(
        '销售商品删除后不可恢复，确认删除该销售商品吗？',
        '确认删除',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(async () => {
            await delSaleService(row.storeId, row.goodsId)
            ElMessage.success('删除成功')
        })
        .catch(() => {
        })
}

</script>

<template>
    <page-container :addText="'添加销售商品'" @getList="getSaleList" @reset="resetForm" @add="openAddDrawer">
        <template #queryBar>
            <el-form :inline="true" class="demo-form-inline" label-width="auto" label-position="left">
                <el-form-item label="商品描述">
                    <el-input v-model="query.key" placeholder="请输入商品描述"></el-input>
                </el-form-item>
                <el-form-item label="分类">
                    <el-select v-model="query.typeId" placeholder="请选择商品分类" filterable>
                        <el-option v-for="type in typeList" :key="type.id" :label="type.name" :value="type.id" />
                    </el-select>
                </el-form-item>
                <el-form-item label="商店">
                    <el-select v-model="query.storeId" placeholder="请输入商店名" filterable remote
                        :remote-method="getStoreRemote">
                        <div v-infinite-scroll="infiniteLoad">
                            <el-option v-for="store in storeList.items" :key="store.id" :label="store.name"
                                :value="store.id" />
                        </div>
                    </el-select>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input type="number" v-model="query.minPrice" placeholder="￥0.0" class="price" />
                    <div class="center">-</div>
                    <el-input type="number" v-model="query.maxPrice" placeholder="￥0.0" class="price" />
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="query.status">
                        <el-radio :value="1">上架</el-radio>
                        <el-radio :value="2">下架</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </template>
        <template #table>
            <el-table :data="saleList.items">
                <el-table-column label="商品描述" prop="goodsDescription" />
                <el-table-column label="商品图片" prop="goodsPicture">
                    <template #default="{ row }">
                        <el-image :src="row.goodsPicture" fit="fill" style="height: 50px" />
                    </template>
                </el-table-column>
                <el-table-column label="价格" prop="price" sortable>
                    <template #default="{ row }">
                        <el-text>{{ row.price }}元/{{ row.goodsUnit }}</el-text>
                    </template>
                </el-table-column>
                <el-table-column label="库存" prop="stock" />
                <el-table-column label="状态" prop="status">
                    <template #default="{ row }">
                        <el-text :type="row.status == 1 ? 'success' : 'info'">
                            {{ row.status == 1 ? '上架' : '下架' }}
                        </el-text>
                    </template>
                </el-table-column>
                <el-table-column label="所属商店" prop="storeName" />
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button @click="openDelBox(row)" link type="primary">删除</el-button>
                        <el-button @click="openEditDrawer(row)" link type="primary">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template #page>
            <pagination :total="saleList.total" :currentPage="query.currentPage" :pageSize="query.pageSize"
                @curChange="curChange" />
        </template>
    </page-container>

    <sale-edit-drawer ref="editDrawer" @success="getSaleList"></sale-edit-drawer>
    <sale-add-drawer ref="addDrawer" @success="refreshPage"></sale-add-drawer>

</template>
<style scoped>
.demo-form-inline .el-input {
    --el-input-width: 200px;
}

.demo-form-inline .el-select {
    --el-select-width: 200px;
}

.demo-form-inline .price {
    --el-input-width: 90px;
}

.demo-form-inline .center {
    margin: 0 6px;
}
</style>