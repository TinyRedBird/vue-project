<script setup>
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { uploadService } from '@/apis/upload';

const imageUrl = ref()
var file = ref()
const onSelectFile = (uploadFile) => {
    file.value = uploadFile.raw
    imageUrl.value = URL.createObjectURL(uploadFile.raw)
}
const upload = async () => {
    return await uploadService(file.value)
}
defineExpose({
    imageUrl,
    upload
})

</script>

<template>
    <div class="upload">
        <el-upload 
            :show-file-list="false" 
            :auto-upload="false" 
            :on-change="onSelectFile" 
            :before-upload="beforeUpload">
            <el-image v-if="imageUrl" :src="imageUrl" />
            <el-icon v-else>
                <Plus />
            </el-icon>
        </el-upload>
        <div class="tip">支持JPG、PNG格式，图片比例建议为1:1</div>
    </div>
</template>

<style scoped>
.upload {
    display: flex;
    flex-direction: column;
}
.el-image {
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 5%;
}

.el-image::before {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.37);
    content: "重新选择";
    color: white;
    text-align: center;
    font-size: xx-small;
}

.el-icon {
    font-size: 28px;
    color: #8c939d;
    border: rgba(128, 128, 128, 0.5) 1px dashed;
    border-radius: 5%;
    width: 120px;
    height: 120px;
    text-align: center;
}

.tip {
    font-size: small;
    color: #8c939d;
}
</style>
