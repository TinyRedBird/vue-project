<!-- eslint-disable no-unused-vars -->
<script setup>
import { ref } from 'vue';
import UserDrawer from './UserDrawer.vue';
import { delUserService, getUserListService } from '@/apis/adminApis/adminUser';
import { ElMessage,ElMessageBox } from 'element-plus';
import { UserFilled } from '@element-plus/icons-vue'
//查询
const query = ref({
    currentPage: 1,
    pageSize: 10,
    key: '',
    role: ''
})
const userList = ref([])
const getUserList = async () => {
    const res = await getUserListService(query.value)
    userList.value = res.data
}
getUserList()

//分页
const curChange = (cur) => {
    query.value.currentPage = cur
    getUserList()
}

//重置
const resetForm = () => {
    for (let key in query.value) {
        query.value[key] = ''
    }
    query.value.currentPage = 1
    query.value.pageSize = 10
    getUserList()
}

//添加/编辑抽屉
const userDrawer = ref()
const openUserDrawer = (row) => {
    userDrawer.value.openDrawer(row)
}

const refreshPage=(isEdit)=>{
    if(!isEdit){
        let lastPage=Math.ceil(userList.value.total / userList.value.pageSize)
        if(userList.value.total%userList.value.pageSize===0){
            lastPage++;
        }
        curChange(lastPage)
    }else{
        getUserList()
    }
}

//删除
const openDelBox = (row) => {
    ElMessageBox.confirm(
        '用户删除后不可恢复，确认删除该用户吗？',
        '确认删除',
        {
            confirmButtonText: '删除',
            cancelButtonText: '取消',
            type: 'warning',
            buttonSize: 'small'
        }
    )
        .then(async () => {
            await delUserService(row.id)
            ElMessage.success('删除成功')
            getUserList()
        })
        .catch(() => {
        })
}

</script>

<template>
    <page-container :addText="'添加用户'" @getList="getUserList" @reset="resetForm" @add="openUserDrawer(null)">
        <!-- 查询 -->
        <template #queryBar>
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="用户名">
                    <el-input v-model="query.key" placeholder="请输入用户名" clearable />
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="query.role" clearable>
                        <el-option label="管理员" value="1" />
                        <el-option label="普通用户" value="2" />
                    </el-select>
                </el-form-item>
            </el-form>
        </template>
        <template #table>
            <el-table :data="userList.items" table-layout="auto">
                <el-table-column label="用户名" prop="username">
                    <template #default="{ row }">
                        <div class="userInfo">
                            <el-avatar :src="row.avatar" size="small" v-if="row.avatar" />
                            <el-avatar :icon="UserFilled" size="small" v-else />
                            <el-text>{{ row.username }}</el-text>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="邮箱" prop="email" />
                <el-table-column label="角色" prop="role">
                    <template #default="{ row }">
                        <el-tag :type="row.role == 1 ? 'success' : 'warning'">
                            {{ row.role == 1 ? '管理员' : '普通用户' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="注册日期" prop="createTime" />
                <el-table-column label="操作">
                    <template #default="{ row }">
                        <el-button @click="openDelBox(row)" link type="primary">删除</el-button>
                        <el-button @click="openUserDrawer(row)" link type="primary">编辑</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <!-- 分页 -->
        <template #page>
            <pagination :total="userList.total" :currentPage="query.currentPage" :pageSize="query.pageSize"
                @curChange="curChange" />
        </template>
    </page-container>
    <user-drawer ref="userDrawer" @success="refreshPage"></user-drawer>
    
</template>

<style scoped>
.demo-form-inline .el-input {
    --el-input-width: 200px;
}

.demo-form-inline .el-select {
    --el-select-width: 200px;
}

.userInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.userInfo .el-text {
    margin: 0 5px;
}
</style>