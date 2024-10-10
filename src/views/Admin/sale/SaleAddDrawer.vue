<script setup>
import { addSaleService } from '@/apis/adminApis/adminSale';
import { getStoreListService } from '@/apis/adminApis/adminStore';
import { getGoodsListService } from '@/apis/adminApis/adminGoods';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
var saleForm = ref({
    storeId: '',
    goodsId: '',
    status: '',
    stock: '',
    price: ''
})
const drawerVisible = ref(false)
const openDrawer = (row) => {
    setTimeout(() => {
        formRef.value.clearValidate() //先清除校验
    }, 0)
    drawerVisible.value = true
    saleForm.value = { ...row }
}

const saleRules = {
    storeId: [{ required: true, message: '请输入商店名', trigger: 'change' }],
    goodsId: [{ required: true, message: '请输入商品名', trigger: 'change' }],
    price: [
        { required: true, message: '请输入商品价格', trigger: 'change' },
        { pattern: /^(([1-9]{1}\d{0,9})|(0{1}))(\.\d{1,2})?$/, message: '请输入正确的金额格式，可保留两位小数' },
    ],
    stock: [
        { required: true, message: '请输入商品库存', trigger: 'change' },
    ],
    status: [{ required: true, message: '请选择上下架状态', trigger: 'change' }],
}
const formRef = ref()

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

//远程搜索商品
const goodsList = ref([])
const goodsQuery = ref({
    currentPage: 1,
    pageSize: 50,
    key: ''
})
const getGoodsRemote = async (key) => {
    goodsQuery.value.key = key
    const res = await getGoodsListService(goodsQuery.value)
    goodsList.value = res.data
}

const emit = defineEmits(['success'])
const submit = async () => {
    await formRef.value.validate()
    const res = await addSaleService(saleForm.value)
    ElMessage.success(res.msg)
    drawerVisible.value = false
    emit('success')
}

defineExpose({
    openDrawer
})
</script>

<template>
    <el-drawer v-model="drawerVisible" title="添加销售商品" direction="rtl">
        <el-form :model="saleForm" :rules="saleRules" ref="formRef" label-position="top">
            <el-form-item label="商店" prop="storeId">
                <el-select v-model="saleForm.storeId" placeholder="请输入商店名" filterable remote
                    :remote-method="getStoreRemote">
                    <el-option v-for="store in storeList.items" :key="store.id" :label="store.name" :value="store.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品" prop="goodsId">
                <el-select v-model="saleForm.goodsId" placeholder="请输入商品名" filterable remote
                    :remote-method="getGoodsRemote">
                    <el-option v-for="goods in goodsList.items" :key="goods.id" :label="goods.description"
                        :value="goods.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="价格" prop="price">
                <el-input v-model="saleForm.price" placeholder="请输入商品价格">
                    <template #prepend>￥</template>
                    <template #append>元</template>
                </el-input>
            </el-form-item>
            <el-form-item label="库存" prop="stock">
                <el-input v-model="saleForm.stock" placeholder="请输入商品库存" />
            </el-form-item>
            <el-form-item prop="status">
                <el-radio-group v-model="saleForm.status">
                    <el-radio :value="1">自动上架</el-radio>
                    <el-radio :value="2">手动上架</el-radio>
                </el-radio-group>
            </el-form-item>
        </el-form>

        <template #footer>
            <div style="flex: auto">
                <el-button @click="drawerVisible = false">取消</el-button>
                <el-button @click="submit" type="primary">确认</el-button>
            </div>
        </template>
    </el-drawer>
</template>

<style scoped>
.logo {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    border-radius: 50%
}

.picture {
    width: 20px;
    height: 20px;
    margin-right: 5px;
    border-radius: 5px
}
</style>