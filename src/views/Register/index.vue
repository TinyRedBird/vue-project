<template>
  <div class="Register-Container">
    <h1 class="registerTitle">登录</h1>
    <form :model="LoginData">
      <div class="registerBox">
        <label for="mail"><i class="fa fa-envelope"></i></label>
        <input
          type="email"
          id="email"
          placeholder="请输入邮箱号"
          required
          v-model="LoginData.email"
          autocomplete="off"
        />
        <label for="password"><i class="fa fa-lock"></i></label>
        <input
          type="password"
          id="password"
          placeholder="请输入密码"
          required
          v-model="LoginData.password"
          autocomplete="off"
        />

        <p @click="router.push('/Register')">
          没有有账号？<span class="gotoResister">点击注册</span>
        </p>
        <input type="submit" class="RegisterBtn" @click.prevent="login" value="登录" />

        <p><span>忘记密码</span></p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { userLoginService } from '@/apis/user'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/token'

const tokenStore = useTokenStore()
const router = useRouter()

const LoginData = ref({
  email: '',
  password: ''
})

const login = async () => {
  let result = await userLoginService(LoginData.value)
  tokenStore.setToken(result.data)
  //跳转到首页
  router.push('/Home')
}
</script>

<style>
.registerBox p {
  cursor: pointer;
}
.gotoResister {
  cursor: pointer;
}
.RegisterBtn {
  border: 1px solid #bbb;
  color: #101010;
  border-radius: 10px;
  padding: 0;
  display: inline;
  outline: none;
  margin: 0 auto;
  text-align: center;
  width: 120px;
  height: 50px;
  font-size: 28px;
}
.Register-Container {
  margin: 0 auto;
}

form .registerBox label {
  display: flex;
  margin: 0;
  padding: 0;
}

.registerTitle {
  padding: 0;
  margin: 30px auto;
}

.registerBox {
  height: 500px;
  width: 1000px;
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  margin: 0 auto;
  text-align: center;
}

.registerBox i {
  margin: 0;
  padding: 0;
  position: relative;
  display: block;
  font-size: 50px;
  width: 50px;
  height: 50px;
  top: 70px;
  left: 120px;
}

.registerBox input {
  border: 1px solid #bbb;
  color: #101010;
  border-radius: 10px;
  padding: 0;
  display: inline;
  outline: none;
  margin: 20px auto;
  text-align: center;
}

.registerBox input:not([type='submit']) {
  width: 50%;
  height: 50px;
  font-size: 24px;
}

.Register-Container .registerTitle {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
