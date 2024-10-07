<script setup>
import { addGoodsService, editGoodsService } from '@/apis/adminApis/adminGoods';
import { getTypeListService } from '@/apis/adminApis/adminType';
import { ElMessage } from 'element-plus';
import { nextTick, ref } from 'vue';
//表单数据
const goodsFrom = ref({
    description: '',
    picture: '',
    typeId: '',
    unit: ''
})

//表单校验
const goodsRules = {
    description: [{ required: true, message: '请输入商品描述', trigger: 'change' }],
    picture: [{ required: true, message: '请选择商品图片', trigger: 'change' }],
    typeId: [{ required: true, message: '请选择商品分类', trigger: 'change' }],
    unit: [{ required: true, message: '请输入计件单位', trigger: 'change' }]
}
const formRef = ref()

const typeList = ref([])
const getTypeList = async () => {
    const res = await getTypeListService()
    typeList.value = res.data
}

//打开抽屉
const drawerVisible = ref(false)
const uploadRef = ref()
const openDrawer = (row) => {
    setTimeout(() => {
        formRef.value.clearValidate()
    }, 0)
    drawerVisible.value = true
    goodsFrom.value = { ...row }
    nextTick(() => {
        uploadRef.value.imageUrl = goodsFrom.value.picture
    })
    getTypeList()
}


//提交编辑/添加
const emit = defineEmits(['success'])
const submit = async () => {
    if (uploadRef.value.imageUrl != goodsFrom.value.picture) {
        const uploadRes = await uploadRef.value.upload() //上传图片
        goodsFrom.value.picture = uploadRes.data
    }
    await formRef.value.validate() //参数校验
    const isEdit = goodsFrom.value.id //判断编辑/添加
    if (isEdit) {
        const res = await editGoodsService(goodsFrom.value) //编辑
        ElMessage.success(res.msg)
    } else {
        const res = await addGoodsService(goodsFrom.value) //添加
        ElMessage.success(res.msg)
    }
    drawerVisible.value = false //关闭抽屉
    emit('success',isEdit) //子传父刷新列表
}

defineExpose({
    openDrawer
})
</script>
<template>
    <el-drawer v-model="drawerVisible" :title="goodsFrom.id ? '编辑商品' : '添加商品'" direction="rtl">
        <el-form :model="goodsFrom" :rules="goodsRules" ref="formRef" label-position="top">
            <el-form-item label="商品描述" prop="description">
                <el-input v-model="goodsFrom.description" placeholder="请输入商品描述" maxlength="30" show-word-limit />
            </el-form-item>
            <el-form-item label="商品图片" prop="picture">
                <image-upload ref="uploadRef"/>
            </el-form-item>
            <el-form-item label="商品分类" prop="typeId">
                <el-select v-model="goodsFrom.typeId" placeholder="请选择商品分类" filterable>
                    <el-option v-for="type in typeList" :key="type.value" :label="type.name" :value="type.id" />
                </el-select>
            </el-form-item>
            <el-form-item label="计件单位" prop="unit">
                <el-input v-model="goodsFrom.unit" placeholder="请输入计件单位" maxlength="5" show-word-limit />
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