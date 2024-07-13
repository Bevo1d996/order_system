<template>
  <div id="login_page">
    <div class="login-welcome">
      <el-text style="font-size:31px; padding-left: 10px; color: rgba(0,0,0,0.5)">Welcome！欢迎使用得餐后台管理系统
      </el-text>
    </div>
    <div class="login-box">
      <div class="two-buttons">
        <div class="identify-button" id="button-left"
             style="background-color: rgba(252,251,249,0.6); border-radius: 0 0 0 10px">
          <div class="button-img">
            <img src="../../assets/chef.png"/>
          </div>
          <div class="button-text">
            <el-button @click="dialogVisible = true" size="large" type="success">我是厨师</el-button>
          </div>
        </div>
        <div class="identify-button" id="button-right"
             style="background-color: rgba(252,251,249,0.6); border-radius: 0 0 10px 0">
          <div class="button-img">
            <img src="../../assets/boss.png"/>
          </div>
          <div class="button-text">
            <el-button @click="dialogVisible = true" size="large" type="primary">我是管理员</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog
      title="登录"
      v-model="dialogVisible"
      width="20%"
      center
      align-center
  >
    <div>
      <el-form
          ref="loginForm"
          :model="login_form"
          label-width="0px"
          style="padding: 10px"
          :rules="loginFormRule"
      >
        <el-form-item prop="username">
          <el-input v-model="login_form.username" size="large" :prefix-icon="User">
            <template #prepend>工号</template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="login_form.password" type="password" show-password size="large"
                    :prefix-icon="Lock" @keyup.enter.native="login()">
            <template #prepend>密码</template>
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible= false">取消</el-button>
          <el-button type="primary" @click="login()">
            确定
          </el-button>
        </span>
    </template>
  </el-dialog>

</template>

<script setup>
import {reactive, ref} from 'vue'
import {ElButton, ElForm, ElFormItem, ElInput, ElMessage} from 'element-plus'
import {Lock, User} from "@element-plus/icons-vue";
import {useRouter} from "vue-router/dist/vue-router";
import axios from "@/utils/axiosInstance";


//data ---------------------------------------------------------------------------------------------------------------------
const router = useRouter();

// 控制表单显示
const dialogVisible = ref(false)

// 表单名
const loginForm = ref()

// 表单绑定数据
let login_form = reactive({
  username: '',
  password: '',
})

// 表单校验规则
let loginFormRule = {
  username: {required: true, message: "工号不能为空", trigger: "change"},
  password: {required: true, message: "密码不能为空", trigger: "change"},
}


/**
 * @Description:登录按钮
 * @author @Be_void
 * @date 2023/7/10
 */
const login = () => {
  // loginForm.value.validate((valid) => {
  //   if (valid) {
  //     axios({
  //       url: `/employee/login`,
  //       method: 'POST',
  //       params: {
  //         jobId: login_form.username,
  //         password: login_form.password
  //       }
  //     }).then(res => {
  //       console.log(res.data)
  //       if (res.code === 200) {
  //         const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000; // 当前时间 + 一天的毫秒数
  //         localStorage.setItem("startTime", JSON.parse(JSON.stringify(expirationTime)));
  //         localStorage.setItem("token", res.data.token)
  //         localStorage.setItem("login_type", res.data.user.employeeType)
  //         localStorage.setItem("user_name", res.data.user.employeeName)
  //         localStorage.setItem("user_id", res.data.user.employeeId)
  //         // console.log(localStorage.getItem("startTime"))
  //         // console.log("=========================");
  //         // console.log(Number(localStorage.getItem('startTime')) === expirationTime)
  //         console.log(localStorage.getItem("user_id"))
  //         ElMessage({type: 'success', message: '欢迎！'})
  //         if (res.data.user.employeeType == 1) {
  //           router.push({
  //             path: '/cook',
  //           })
  //           // console.log(res.data.token);
  //         } else {
  //           router.push({
  //             path: '/summary',
  //             query: {
  //               id: res.data.user.employeeId,
  //               token: res.data.token,
  //               login_type: res.data.user.employeeType
  //             }
  //           })
  //         }
  //       } else if (res.code === 205)
  //         ElMessage.error(res.message)
  //       else {
  //         ElMessage({type: 'error', message: '登录失败，请检查登录信息或稍后再试'})
  //         // console.log(res)
  //       }
  //     })
  //   } else {
  //     ElMessage({
  //       message: "登录信息有误",
  //       type: "error"
  //     })
  //   }
  // })
}

</script>

<style>

#login_page {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/background.jpg");
  background-size: 100% 100%;
}

.login-welcome {
  width: 40%;
  position: absolute;
  top: 28%;
  left: 30%;
  background-color: rgba(252, 251, 249, 0.6);
  border-radius: 10px 10px 0 0;
}

.login-box {
  width: 40%;
  height: 35%;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.two-buttons {
  height: 100%;
  display: flex;
}

.identify-button {
  position: relative;
  flex: 1;
  height: 100%;
}

#button-left {

}

#button-right {

}


.button-img {
  width: 100%;
  height: 70%;
  position: relative;
}

.button-img img {
  position: relative;
  top: 10%;
  left: 17.5%;
  height: 100%;
  width: auto;
}

.button-text {
  margin-top: 3%;
  display: flex;
  height: 30%;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.button-text el-text {
  height: 100%;
  line-height: 100%;
  text-align: center;
}

.el-dialog--center .el-dialog__body {
  padding: 10px 15px;
}

</style>
