<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from 'vue';
import StoreDrawer from './StoreDrawer.vue';
import { delStoreService, getStoreListService } from '@/apis/adminApis/adminStore';
import { ElMessage, ElMessageBox } from 'element-plus';
//查询
const query = ref({
    currentPage: 1,
    pageSize: 10,
    key: ''
})
const storeList = ref([])
const getStoreList = async () => {
    const res = await getStoreListService(query.value)
    storeList.value = res.data
}
getStoreList()

//分页
const curChange = (cur) => {
    query.value.currentPage = cur
    getStoreList()
}

//重置
const resetForm = () => {
    for (let key in query.value) {
        query.value[key] = ''
    }
    query.value.currentPage = 1
    query.value.pageSize = 10
    getStoreList()
}

//添加/编辑抽屉
const storeDrawer = ref()
const openStoreDrawer = (row) => {
    storeDrawer.value.openDrawer(row)
}

const refreshPage = (isEdit) => {
    if (!isEdit) {
        let lastPage = Math.ceil(storeList.value.total / storeList.value.pageSize)
        if (storeList.value.total % storeList.value.pageSize === 0) {
            lastPage++;
        }
        curChange(lastPage)
    }else{
        getStoreList()
    }
}

//删除
const openDelBox = (row) => {
    ElMessageBox.confirm(
        '商店删除后不可恢复，删除商店后会删除该商店的所有销售商品。确认删除该商店吗？',
        '确认删除',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
            buttonSize: 'small'
        }
    )
        .then(async () => {
            await delStoreService(row.id)
            ElMessage.success('删除成功')
            getStoreList()
        })
        .catch(() => {
        })
}

</script>
<template>
    <page-container :addText="'添加商店'" @getList="getStoreList" @reset="resetForm" @add="openStoreDrawer(null)">
        <template #queryBar>
            <el-form :inline="true">
                <el-form-item label="商店名">
                    <el-input v-model="query.key" placeholder="请输入商店名" />
                </el-form-item>
            </el-form>
        </template>
        <template #table>
            <el-table :data="storeList.items" table-layout="auto">
                <el-table-column label="商店名" prop="name">
                    <template #default="{ row }">
                        <div class="firstRow">
                            <el-avatar :src="row.logo" size="small" />
                            <el-text>{{ row.name }}</el-text>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="商店地址" prop="address" />
                <el-table-column label="联系电话" prop="tel" />
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button @click="openDelBox(row)" link type="primary">删除</el-button>
                        <el-button @click="openStoreDrawer(row)" link type="primary">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template #page>
            <pagination :total="storeList.total" :currentPage="query.currentPage" :pageSize="query.pageSize"
                @curChange="curChange" />
        </template>
    </page-container>

    <store-drawer ref="storeDrawer" @success="refreshPage"></store-drawer>

</template>

<style scoped>
.firstRow {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.firstRow .el-text {
    margin: 0 5px;
}
</style>