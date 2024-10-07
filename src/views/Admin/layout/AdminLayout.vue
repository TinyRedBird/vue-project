<script setup>
import zhCn from "element-plus/es/locale/lang/zh-cn"
import { UserFilled, Shop, GoodsFilled, Menu, Sell, Setting } from "@element-plus/icons-vue"
import useUserInfoStore from "@/apis/userInfo";
const userInfoStore = useUserInfoStore()
</script>

<template>
    <!-- 全局配置中文 -->
    <el-config-provider :locale="zhCn">
        <el-container>
            <el-aside>
                <el-menu :default-active="$route.path" router background-color="#444A5A" text-color="white">
                    <div class="adminInfo">
                        <el-avatar :icon="UserFilled" v-if="userInfoStore.info.avatar == null" />
                        <el-image :src="userInfo.avatar" v-else></el-image>
                        <span class="adminUsername">{{ userInfoStore.info.username }}</span>
                    </div>
                    <el-menu-item index="/admin/user">
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/store">
                        <el-icon>
                            <Shop />
                        </el-icon>
                        <span>商店管理</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/goods">
                        <el-icon>
                            <GoodsFilled />
                        </el-icon>
                        <span>商品管理</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/type">
                        <el-icon>
                            <Menu />
                        </el-icon>
                        <span>商品分类管理</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/sale">
                        <el-icon>
                            <Sell />
                        </el-icon>
                        <span>销售商品管理</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/setting">
                        <el-icon>
                            <Setting />
                        </el-icon>
                        <span>系统设置</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-config-provider>
</template>

<style scoped>
.el-container {
    height: 100vh;
    background-color: white
}

.el-aside {
    width: 200px;
}

.el-menu,
.el-main {
    height: 100%;
}

.adminInfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 20px;
}

.adminUsername {
    margin-top: 10px;
    color: white;
}
</style>