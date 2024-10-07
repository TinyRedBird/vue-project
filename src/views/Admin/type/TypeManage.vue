<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from 'vue'
import TypeDialog from './TypeDialog.vue';
import { getTypeListService, delTypeService } from '@/apis/adminApis/adminType';
import { ElMessage, ElMessageBox } from 'element-plus';

//查询
const query = ref({
    key: ''
})
const typeList = ref([])
const getTypeList = async () => {
    const res = await getTypeListService(query.value)
    typeList.value = res.data
}
getTypeList()

//重置
const resetForm = () => {
    query.value.key = ''
    getTypeList()
}

//打开添加/编辑弹窗
const typeDialog = ref() //用于绑定子组件
const openTypeDialog = (row) => {
    typeDialog.value.openDialog(row)
}

//删除
const openDelBox = (row) => {
    ElMessageBox.confirm(
        '分类删除后不可恢复，确认删除该分类吗？',
        '确认删除',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
            buttonSize: 'small'
        }
    )
        .then(async () => {
            await delTypeService(row.id)
            ElMessage.success('删除成功')
            getTypeList()
        })
        .catch(() => {
        })
}
</script>

<template>
    <page-container :addText="'添加分类'" @getList="getTypeList" @reset="resetForm" @add="openTypeDialog(null)">
        <!-- 查询 -->
        <template #queryBar>
            <el-form :inline="true">
                <el-form-item label="分类名">
                    <el-input v-model="query.key" placeholder="请输入分类名" clearable />
                </el-form-item>
            </el-form>
        </template>
        <!-- 表格 -->
        <template #table>
            <el-table :data="typeList" table-layout="auto">
                <el-table-column label="分类名" prop="name" />
                <el-table-column label="icon" prop="icon">
                    <template #default="{ row }">
                        <el-image :src="row.icon" fit="fill" style="height: 30px" />
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button @click="openDelBox(row)" link type="primary">删除</el-button>
                        <el-button @click="openTypeDialog(row)" link type="primary">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
    </page-container>

    <!-- 通过ref标识绑定ref对象 -->
    <type-dialog ref="typeDialog" @success="getTypeList"></type-dialog>

</template>

<style scoped></style>
