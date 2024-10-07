<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from 'vue'
import GoodsDrawer from './GoodsDrawer.vue'
import { delGoodsService, getGoodsListService } from '@/apis/adminApis/adminGoods';
import { getTypeListService } from '@/apis/adminApis/adminType';
import { ElMessage, ElMessageBox } from 'element-plus';
const query = ref({
    currentPage: 1,
    pageSize: 10,
    key: '',
    typeId: '',
})
const goodsList = ref([])
const getGoodsList = async () => {
    const res = await getGoodsListService(query.value)
    goodsList.value = res.data
}
getGoodsList()

//分类选择
const typeList = ref([])
const getTypeList = async () => {
    const res = await getTypeListService(null)
    typeList.value = res.data
}
getTypeList()

//重置
const resetForm = () => {
    for (let key in query.value) {
        query.value[key] = ''
    }
    query.value.currentPage = 1
    query.value.pageSize = 10
    getGoodsList()
}

//分页
const curChange = (cur) => {
    query.value.currentPage = cur
    getGoodsList()
}

//添加/编辑
const goodsDrawer = ref()
const openGoodsDrawer = (row) => {
    goodsDrawer.value.openDrawer(row)
}

const refreshPage = (isEdit) => {
    console.log(isEdit)
    if (!isEdit) {
        let lastPage = Math.ceil(goodsList.value.total / goodsList.value.pageSize)
        if (goodsList.value.total % goodsList.value.pageSize === 0) {
            lastPage++;
        }
        curChange(lastPage)
    } else {
        console.log(1111,isEdit)
        getGoodsList()
    }
}

//删除
const openDelBox = (row) => {
    ElMessageBox.confirm(
        '商品删除后不可恢复，确认删除该商品吗？',
        '确认删除',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
            buttonSize: 'small'
        }
    )
        .then(async () => {
            await delGoodsService(row.id)
            ElMessage.success('删除成功')
            getGoodsList()
        })
        .catch(() => {
        })
}

</script>

<template>
    <page-container :addText="'添加商品'" @getList="getGoodsList" @reset="resetForm" @add="openGoodsDrawer(null)">
        <template #queryBar>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="商品描述">
                    <el-input v-model="query.key" placeholder="请输入商品描述" clearable />
                </el-form-item>
                <el-form-item label="商品分类">
                    <el-select v-model="query.typeId" placeholder="请选择商品分类" clearable filterable>
                        <el-option v-for="type in typeList" :key="type.id" :label="type.name" :value="type.id" />
                    </el-select>
                </el-form-item>
            </el-form>
        </template>
        <template #table>
            <el-table :data="goodsList.items" table-layout="fixed">
                <el-table-column label="商品描述" prop="description" />
                <el-table-column label="商品图片" prop="picture">
                    <template #default="{ row }">
                        <el-image :src="row.picture" fit="fill" style="height: 50px" />
                    </template>
                </el-table-column>
                <el-table-column label="商品分类" prop="typeName" />
                <el-table-column label="计件单位" prop="unit" />
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button @click="openDelBox(row)" link type="primary">删除</el-button>
                        <el-button @click="openGoodsDrawer(row)" link type="primary">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <template #page>
            <pagination :total="goodsList.total" :currentPage="query.currentPage" :pageSize="query.pageSize"
                @curChange="curChange" />
        </template>
    </page-container>
    <goods-drawer ref="goodsDrawer" @success="refreshPage"></goods-drawer>
</template>

<style>
.demo-form-inline .el-input {
    --el-input-width: 200px;
}

.demo-form-inline .el-select {
    --el-select-width: 200px;
}
</style>