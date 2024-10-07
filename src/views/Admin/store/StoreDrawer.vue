<script setup>
import { nextTick, ref } from 'vue';
import { addStoreService, editStoreService } from '@/apis/adminApis/adminStore';
import { ElMessage } from 'element-plus';
//表单数据
const storeForm = ref({
    name: '',
    logo: '',
    address: '',
    tel: ''
})
//表单校验
const storeRules = {
    name: [
        { required: true, message: "请输入商店名", trigger: 'change' },
        { min: 3, max: 10, message: '商店名必须是3-10位的字符', trigger: 'change' }
    ],
    logo: [{ required: true, message: "请上传logo", trigger: 'change' }],
    address: [{ required: true, message: "请输入地址", trigger: 'change' }],
    tel: [
        { required: true, message: "请输入联系电话", trigger: 'change' },
        { pattern: /^\d{11}$/, message: "手机号码必须为11位的数字", trigger: 'change' }
    ]
}
const formRef = ref()

//打开抽屉
const drawerVisible = ref(false)
const uploadRef = ref()
const openDrawer = (row) => {
    setTimeout(() => {
        formRef.value.clearValidate() //先清除校验
    }, 0)
    drawerVisible.value = true
    storeForm.value = { ...row }
    nextTick(() => {
        uploadRef.value.imageUrl = storeForm.value.logo
    })
}

//提交编辑/添加
const emit = defineEmits(['success'])
const submit = async () => {
    if (uploadRef.value.imageUrl != storeForm.value.logo) {
        const uploadRes = await uploadRef.value.upload() //上传图片
        storeForm.value.logo = uploadRes.data
    }
    await formRef.value.validate() //参数校验
    const isEdit = storeForm.value.id //判断编辑/添加
    if (isEdit) {
        const res = await editStoreService(storeForm.value) //编辑
        ElMessage.success(res.msg)
    } else {
        const res = await addStoreService(storeForm.value) //添加
        ElMessage.success(res.msg)
    }
    drawerVisible.value = false //关闭抽屉
    emit('success', isEdit) //子传父刷新列表
}

defineExpose({
    openDrawer
})

</script>

<template>
    <el-drawer v-model="drawerVisible" :title="storeForm.id ? '编辑商店' : '新建商店'" direction="rtl">
        <el-form :model="storeForm" :rules="storeRules" ref="formRef" label-position="top">
            <el-form-item label="商店名" prop="name">
                <el-input v-model="storeForm.name" placeholder="请输入商店名" />
            </el-form-item>
            <el-form-item label="logo" prop="logo">
                <image-upload ref="uploadRef" />
            </el-form-item>
            <el-form-item label="商店地址" prop="address">
                <el-input v-model="storeForm.address" placeholder="请输入商店地址" />
            </el-form-item>
            <el-form-item label="联系电话" prop="tel">
                <el-input v-model="storeForm.tel" placeholder="请输入联系电话" />
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