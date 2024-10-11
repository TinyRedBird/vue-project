<template>
  <div>
    <div class="user">
      <template v-if="true">
        <div class="User-Container">
          <img
            src="https://img.ixintu.com/download/jpg/20200901/3e9ce3813b7199ea9588eeb920f41208_512_512.jpg!ys"
            :alt="userInfoStore.info.username"
          />
          <div class="User-Text">
            <span>{{ userInfoStore.info.username }}</span>
          </div>
        </div>
        <div title="myorder" class="shop-cart-container">
          <span><i class="fa fa-shopping-cart fa-3x" aria-hidden="true"></i></span>
        </div>
      </template>

      <!-- 退出登录  -->
      <div class="sign-Out-Btn">
        <el-button plain @click="open">退出登录</el-button>
      </div>

      <div class="Login-btn" @click="pushToOrder">
        <div>
          <el-button plain>购物车</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import useUserInfoStore from '@/apis/userInfo'
import { useTokenStore } from '@/stores/token'
// import { userInfoService } from '@/apis/user'
// import { ref } from 'vue'
const userInfoStore = useUserInfoStore()
const tokenStore = useTokenStore()
const router = useRouter()
import { ElMessage, ElMessageBox } from 'element-plus'

const open = () => {
  ElMessageBox.confirm('你确定要退出登陆吗？', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      userInfoStore.removeInfo()
      tokenStore.removeToken()
      ElMessage({
        type: 'success',
        message: '退出成功'
      })
      router.push('/')
    })
    .catch(() => {})
}
<<<<<<< HEAD

let result = ref(null)
const getUserInfo = async () => {
  result.value = await userInfoService()
  userInfoStore.setInfo(result.value.data)
  console.log(result.value.data)
}
getUserInfo()
=======
// const confirm = () => {
// }
// let result = ref(null)
// const getUserInfo = async () => {
//   result.value = await userInfoService()
//   userInfoStore.setInfo(result.value.data)
//   console.log(result.value.data)
// }
// getUserInfo()
>>>>>>> 7e1cbe18fa36a34755dc10b4038f5285faca4b80

//
function pushToOrder() {
  router.push('/MyOrder')
}
</script>

<style scoped>
.sign-Out-Btn {
  margin: 0 auto;
  position: relative;
  width: 6rem;
}

.Login-btn {
  margin: 0 auto;
  position: relative;
  font-size: 30px;
  width: 5rem;
}
.Login-btn div span {
  background-color: rgba(245, 236, 227, 0.2);
  top: 3rem;
  text-align: center;
  display: block;
  line-height: 2rem;
  font-size: 14px;
  border-radius: 0.5rem;
  background: #ff5555;
  font-weight: 400;
  position: relative;
  box-shadow: 1px 2px 3px 4px rgba(245, 246, 247, 0.1);
  cursor: pointer;
}
.shop-cart-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.user [title='myorder'] a {
  display: block;
  position: relative;
  margin: 0 auto;
  margin-top: 20px;
}

.User-Container {
  padding: 20px;
  display: flex;
  justify-content: baseline;
  cursor: pointer;
  flex-direction: column;
}

.User-Text {
  display: block;
  margin: 0 auto;
  margin-top: 5px;
  position: relative;
}

.user div img {
  margin: 0 auto;
  width: 50px;
  height: 50px;
  border-radius: 40px;
  z-index: 10;

  display: block;
}
.user {
  padding: 0;
  margin: 0;
  display: block;
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  height: 450px;
  background-image: linear-gradient(
    rgb(225, 164, 136) 0%,
    rgb(231, 208, 192) 50%,
    rgb(255, 255, 255) 100%
  );
  background-color: var(--tbpc-bg1-color, #f5f5f5);
  border-radius: 20px 20px 0 0;
}
</style>
