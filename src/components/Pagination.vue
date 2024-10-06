<!-- eslint-disable vue/multi-word-component-names -->
<script setup>
defineProps({
    currentPage: Number,
    pageSize: Number,
    total: Number
})
const emit = defineEmits(['curChange'])
const handleCurrentChange = (cur) => {
    emit('curChange', cur)
}

</script>

<template>
    <el-pagination 
        :current-page="currentPage" 
        :page-size="pageSize" 
        :total="total"
        @current-change="handleCurrentChange" 
        layout="total, prev, pager, next" 
        small 
        background>
    </el-pagination>
</template>
