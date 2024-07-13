<template>
  <div id="login_page">
    <div class="login-box"
         style="background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);">
      <div class="img-sty"><img src="../../assets/logo.png" alt="."/></div>
      <div class="title">欢迎注册微信小程序点餐系统</div>
      <div class="form-box">
        <el-form
            ref="loginForm"
            label-width="80px"
            class="demo-ruleForm">
          <el-form-item label="账户" prop="username">
            <el-input v-model="form.username" :prefix-icon="Cellphone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password" style="margin-top: 7%">
            <el-input type="password" v-model="form.password" :prefix-icon="Lock"></el-input>
          </el-form-item>
          <el-form-item style="margin-top: 10%;">
            <el-button
                style="background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);"
                round class="loginBtn"
                @click="register">注册
            </el-button>
          </el-form-item>
        </el-form>
        <div class="register-link">
          已有账号？
          <router-link to="/">立即登录</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {ElButton, ElForm, ElFormItem, ElInput, ElMessage} from 'element-plus'
import {Cellphone, Lock} from "@element-plus/icons-vue";
import {useRouter} from "vue-router/dist/vue-router";

const router = useRouter();
let form = reactive({
  username: '',
  password: ''
})

const register = () => {
  ElMessage({
    message: '登录成功！',
    type: 'success'
  });
  router.push('/home');
}

</script>

<style scoped>

#login_page {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/loginBac.jpg");
}

.login-box {
  width: 30%;
  height: 40%;
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 10px 0 4px 3px white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.loginBtn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
}

.title {
  font-size: 27px;
  font-weight: bold;
  text-align: center;
  margin-bottom: -10%;
  margin-left: 8%;
  color: #42b983;
  display: inline-block;
}

.form-box {
  width: 70%;
  margin: 12% auto;
}

.img-sty {
  width: 13%;
  height: 13%;
  margin: 2% auto;
  display: inline-block;
}

img {
  width: 100%;
  height: 100%;
}

.register-link {
  margin: 15% 0 0 60%;
}


</style>
