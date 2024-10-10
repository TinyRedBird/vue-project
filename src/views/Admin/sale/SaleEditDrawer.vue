<script setup>
import { editSaleService } from '@/apis/adminApis/adminSale';
import { ElMessage } from 'element-plus';
import { ref } from 'vue';
const sale = ref({})
var saleForm = ref({
    storeId: '',
    goodsId: '',
    status: '',
    stock: '',
    price: ''
})
const drawerVisible = ref(false)
const openDrawer = (row) => {
    drawerVisible.value = true
    sale.value = { ...row }
    for (let key in saleForm.value) {
        saleForm.value[key] = sale.value[key]
    }
}

const saleRules = {
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

const emit = defineEmits(['success'])
const submit = async () => {
    await formRef.value.validate()
    const res = await editSaleService(saleForm.value)
    ElMessage.success(res.msg)
    drawerVisible.value = false
    emit('success')
}

defineExpose({
    openDrawer
})
</script>

<template>
    <el-drawer v-model="drawerVisible" title="编辑销售商品" direction="rtl">
        <!-- <div class="detail"> -->
        <div class="detail">
            <div class="storeInfo">
                <el-image class="logo" :src="sale.storeLogo"></el-image>
                <el-text size="small">{{ sale.storeName }}</el-text>
            </div>
            <div class="goodsInfo">
                <el-image class="left" :src="sale.goodsPicture" />
                <div class="right">
                    <div><el-text size="large" class="desc"><strong>{{ sale.goodsDescription }}</strong></el-text>
                    </div>
                    <div><el-tag size="small" effect="plain">{{ sale.typeName }}</el-tag></div>
                </div>
            </div>
        </div>

        <el-form :model="saleForm" :rules="saleRules" ref="formRef">
            <el-form-item label="价格" prop="price">
                <el-input v-model="saleForm.price" placeholder="请输入商品价格">
                    <template #prepend>￥</template>
                    <template #append>元/{{ sale.goodsUnit }}</template>
                </el-input>
            </el-form-item>
            <el-form-item label="库存" prop="stock">
                <el-input v-model="saleForm.stock" placeholder="请输入商品库存" />
            </el-form-item>
            <el-form-item label="状态" prop="status">
                <el-radio-group v-model="saleForm.status">
                    <el-radio :value="1">上架</el-radio>
                    <el-radio :value="2">下架</el-radio>
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
.detail {
    padding-bottom: 10px;
}

.storeInfo {
    display: flex;
    border-radius: 5px;
    padding: 10px;
    background-color: #F2F3F5;
}

.logo {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    margin-right: 5px;
}

.goodsInfo {
    display: flex;
    align-items: center;
}

.left {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    margin: 10px 10px 10px 0;
}

.right div {
    padding-bottom: 10px;
}
</style>