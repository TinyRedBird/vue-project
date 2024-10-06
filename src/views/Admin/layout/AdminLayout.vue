<script setup>
import zhCn from "element-plus/es/locale/lang/zh-cn"
</script>

<template>
    <!-- 全局配置中文 -->
    <el-config-provider :locale="zhCn">
        <div class="admin">
            <router-view></router-view>
        </div>
    </el-config-provider>
</template>

<style scoped>
.admin {
    width: 100%;
    height: 100%;
    background-color: rgb(254, 254, 254);
}
</style>