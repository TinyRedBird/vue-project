<script setup>
import { addBannerService, changeShowBannerService, delBannerService, getBannerService } from '@/apis/adminApis/sysSetting';
import { computed, ref } from 'vue';
import { uploadService } from '@/apis/upload';
import { ElMessage } from 'element-plus';
import { CloseBold } from '@element-plus/icons-vue'
const banners = ref([

])
const getBanner = async () => {
    const res = await getBannerService()
    banners.value = res.data
}
getBanner()
const selectedBanners = computed(() => {
    return banners.value.filter(item => item.isShow == 1)
})

const delBanner = async (id) => {
    const res = await delBannerService(id)
    ElMessage.success(res.msg)
    getBanner()
}

const changeShow = async (index) => {
    if (selectedBanners.value.length == 3 && banners.value[index].isShow != 1) {
        ElMessage.error('最多只能选择3个banner')
        return
    }
    await changeShowBannerService(banners.value[index].id)
    getBanner()
}

const uploadImage = async (uploadFile) => {
    console.log(uploadFile)
    const uploadRes = await uploadService(uploadFile.file)
    const res = await addBannerService(uploadRes.data)
    ElMessage.success(res.msg)
    getBanner()
}
</script>

<template>
    <el-tabs>
        <el-tab-pane label="首页轮播图">

            <el-upload :show-file-list="false" action='' :http-request="uploadImage">
                <el-button class="uploadBtn" type="primary" size="small">点击上传</el-button>
            </el-upload>
            <div class="banners">
                <div class="banner" v-for="(banner, index) in banners" :key="index">
                    <el-checkbox :checked="banner.isShow" true-value="1" false-value="0" size="large" class="selected"
                        @change="changeShow(index)" />
                    <el-icon size="22" color="white" class="delete" @click="delBanner(banner.id)">
                        <CloseBold />
                    </el-icon>
                    <el-image :src="banner.url" fit="fill" />
                </div>
            </div>
        </el-tab-pane>

    </el-tabs>

</template>

<style scoped>
.el-tabs--card {
    height: calc(100vh - 110px);
    /* overflow-y: auto; */
}

.el-tab-pane {
    height: calc(100vh - 110px);
    overflow-y: auto;
}

.uploadBtn {
    margin-bottom: 15px;
}

.banners {
    display: flex;
    flex-wrap: wrap;
}

.banner {
    position: relative;
    overflow: hidden;
    margin-right: 15px;
    margin-bottom: 11px;
}

.selected {
    position: absolute;
    left: 0px;
    top: 0px;
    padding: 5px;
    /* margin: 5px; */
    z-index: 1;
}

.delete {
    position: absolute;
    right: 0px;
    top: 0px;
    padding: 5px;
    margin: 5px;
    z-index: 1;
}

.delete::before {
    position: absolute;
    content: '';
    right: 0px;
    top: 0px;
    background: #00000070;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    z-index: -1;
}

.el-image {
    width: 240px;
    height: 120px;
    border-radius: 5px;
}
</style>