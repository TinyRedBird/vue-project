<template>
  <div class="Register-Container">
    <h1 class="registerTitle">登录</h1>
    <form :model="registerData">
      <div class="registerBox">
        <label for="mail"><i class="fa fa-envelope"></i></label>
        <input
          type="email"
          id="email"
          placeholder="请输入邮箱号"
          required
          v-model="registerData.email"
          autocomplete="off"
        />
        <label for="password"><i class="fa fa-lock"></i></label>
        <input
          type="password"
          id="password"
          placeholder="请输入密码"
          required
          v-model="registerData.password"
          autocomplete="off"
        />

        <p><a href="">没有有账号？点击注册</a></p>
        <button type="submit" class="RegisterBtn" @click="login">登录</button>
        <p><a href="">忘记密码</a></p>
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

const registerData = ref({
  email: '',
  password: ''
})

const login = async () => {
  let result = await userLoginService(registerData.value)
  console.log(result.msg ? result.msg : '登陆成功')
  tokenStore.setToken(result.data)
  // console.log(result.data)

  //跳转到首页
  router.push('/')
}
</script>

<style>
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

.registerBox input {
  width: 50%;
  height: 50px;
  font-size: 24px;
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
  width: 16vw;
  height: 50px;
  font-size: 28px;
}
.Register-Container .registerTitle {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
