<script setup>
import { addTypeService, editTypeService } from '@/apis/adminApis/adminType';
import { ElMessage } from 'element-plus';
import { ref, nextTick } from 'vue';

//表单数据
const typeForm = ref({
    name: '',
    icon: ''
})
//表单校验
const typeRules = {
    name: [
        { required: true, message: "请输入分类名", trigger: 'change' },
        { min: 2, max: 6, message: '分类名必须是2-6位的字符', trigger: 'change' }
    ],
    icon: [{ required: true, message: "请上传icon", trigger: 'change' }]
}
const formRef = ref()

//打开弹窗
const dialogVisible = ref(false) //控制dialog
const uploadRef = ref()
const openDialog = (row) => {
    //对外暴露方法，基于该方法传递的参数判断是新增还是编辑
    setTimeout(() => {
        formRef.value.clearValidate()
    }, 0)
    dialogVisible.value = true
    typeForm.value = { ...row } //扩展运算符
    nextTick(() => {
        uploadRef.value.imageUrl = typeForm.value.icon
    })
}

const emit = defineEmits(['success'])
const submit = async () => {
    if (uploadRef.value.imageUrl != typeForm.value.icon) {
        const uploadRes = await uploadRef.value.upload()
        typeForm.value.icon = uploadRes.data
    }
    await formRef.value.validate()
    const isEdit = typeForm.value.id
    if (isEdit) {
        const res = await editTypeService(typeForm.value)
        ElMessage.success(res.msg)
    } else {
        const res = await addTypeService(typeForm.value)
        ElMessage.success(res.msg)
    }
    dialogVisible.value = false
    emit('success',isEdit)
}

defineExpose({
    openDialog
})

</script>
<template>
    <el-dialog v-model="dialogVisible" :title="typeForm.id ? '编辑分类' : '添加分类'" width="400">
        <el-form :model="typeForm" :rules="typeRules" ref="formRef" label-position="top">
            <el-form-item label="分类名" prop="name">
                <el-input v-model="typeForm.name" placeholder="请输入分类名" />
            </el-form-item>
            <el-form-item label="icon" prop="icon">
                <image-upload ref="uploadRef" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="submit">确定</el-button>
            </div>
        </template>
    </el-dialog>
</template>