<script setup>
import { editUserService, addUserService } from '@/apis/adminApis/adminUser';
import { ElMessage } from 'element-plus';
import { nextTick, ref } from 'vue';
//表单数据
const userForm = ref({
    email: '',
    username: '',
    avatar: '',
    role: ''
})

//表单校验
const userRules = {
    email: [
        { required: true, message: "请输入邮箱", trigger: 'change' },
        { pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/, message: '请输入合法的邮箱', trigger: 'change' }
    ],
    username: [
        { required: true, message: "请输入用户名", trigger: 'change' },
        { min: 3, max: 16, message: '用户名必须是3-16位的字符', trigger: 'change' }
    ],
    role: [{ required: true, message: "请选择用户类型", trigger: 'change' }]
}
const formRef = ref()

//打开抽屉
const drawerVisible = ref(false)
const uploadRef = ref() //上传图片
const openDrawer = (row) => {
    setTimeout(() => {
        formRef.value.clearValidate()
    }, 0)
    drawerVisible.value = true
    userForm.value = { ...row }
    //异步更新
    nextTick(() => {
        uploadRef.value.imageUrl = userForm.value.avatar
    })
}

//提交编辑/添加
const emit = defineEmits(['success'])
const submit = async () => {
    if (uploadRef.value.imageUrl != userForm.value.avatar) {
        const uploadRes = await uploadRef.value.upload() //上传图片
        userForm.value.avatar = uploadRes.data
    }
    await formRef.value.validate()
    const isEdit = userForm.value.id
    if (isEdit) {
        const res = await editUserService(userForm.value)
        ElMessage.success(res.msg)
    } else {
        const res = await addUserService(userForm.value)
        ElMessage.success(res.msg)
    }
    drawerVisible.value = false
    emit('success',isEdit)
}

defineExpose({
    openDrawer
})
</script>

<template>
    <el-drawer v-model="drawerVisible" :title="userForm.id ? '编辑用户' : '添加用户'" direction="rtl">
        <el-alert v-if="!userForm.id" title="添加用户后的默认密码为123456，请提醒用户尽快修改密码" type="warning" :closable="false"
            show-icon />
        <el-form :model="userForm" :rules="userRules" ref="formRef" label-position="top">
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="userForm.email" placeholder="请输入邮箱" :disabled="userForm.id"/>
            </el-form-item>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="userForm.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <image-upload ref="uploadRef" />
            </el-form-item>
            <el-form-item label="角色" prop="role">
                <el-radio-group v-model="userForm.role">
                    <el-radio :value="1">管理员</el-radio>
                    <el-radio :value="2">普通用户</el-radio>
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

</style>
