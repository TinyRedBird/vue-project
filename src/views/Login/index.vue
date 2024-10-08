<template>
  <div class="login-container">
    <h1 class="title">注册</h1>
    <form :model="ResisterData">
      <div class="loginBox">
        <label for="mail"><i class="fa fa-envelope-o"></i></label>
        <input
          type="text"
          id="email"
          placeholder="请输入邮箱号"
          v-model="ResisterData.email"
          required
        />
        <label for="username"><i class="fa fa-user-o"></i></label>
        <input
          type="text"
          id="username"
          placeholder="请输入用户名"
          v-model="ResisterData.username"
          required
        />
        <label for="password"><i class="fa fa-lock"></i></label>
        <input
          type="password"
          id="password"
          placeholder="请输入密码"
          v-model="ResisterData.password"
          required
        />
        <label for="verificationcode"><i class="fa fa-thin fa-key"></i></label>
        <div class="inputWapper">
          <input
            type="text"
            id="verificationcode"
            placeholder="请输入验证码"
            v-model="ResisterData.verifyCode"
            required
          />

          <a href="/" class="sendMessage">获取验证码</a>
        </div>
        <button type="submit" class="submitBtn" @click="register">注册</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { getCodeService } from '@/apis/user'
const ResisterData = ref({
  email: '3154983378@qq.com',
  username: '',
  password: '',
  verifyCode: ''
})
const useCode = async () => {
  console.log(ResisterData.value.email)

  const code = await getCodeService({ email: ResisterData.value.email })
  console.log('Verification code:', code)
}
useCode()
// const register = async () => {
//   let result = await userRegisterService(ResisterData.value)
//   console.log(result)
// }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-container {
  margin: 0 auto;
}
.loginBox label {
  margin: 0;
  padding: 0;
}

.loginBox i {
  position: relative;
  display: block;
  font-size: 50px;
  width: 50px;
  height: 50px;
  top: 50px;
  left: 120px;
}
.title {
  padding: 0;
  margin: 3rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inputWapper {
  width: 500px;
  height: 50px;
  margin: 0 auto;
}

#verificationcode {
  text-align: center;
  float: left;
  height: 100%;
  width: 68%;
  border: 1px solid #bbb;
  outline: none;
  color: #101010;
  font-size: 24px;
  border-radius: 10px 0 0 10px;
  margin: 0;
  padding: 0;
}

.sendMessage {
  float: right;
  width: 32%;
  height: 100%;
  line-height: 50px;
  text-align: center;
  background: #f5f5f5;
  border-radius: 0 10px 10px 0;
  border: 1px solid #bbb;
  font-size: 24px;
  margin: 0;
  text-decoration: none;
  color: #333;
}

.loginBox {
  height: 500px;
  width: 1000px;
  background-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  margin: 0 auto;
  text-align: center;
}

.loginBox > input,
button[type] {
  border: 1px solid #bbb;
  color: #101010;
  border-radius: 10px;
  padding: 0;
  display: inline-block;
  outline: none;
  margin: 0 auto;
  text-align: center;
}

.loginBox > input {
  width: 50%;
  height: 50px;
  font-size: 24px;
}

.submitBtn {
  position: relative;
  top: 30px;
  width: 14vw;
  height: 50px;
  font-size: 28px;
  cursor: pointer;
}
</style>
