<template>
  <div class="common-layout">
    <el-container>
      <!--      header区域-->
      <el-header
          style="background-color: #6a9392">
        <div style="display:flex;margin:5px;">
          <div class="title">Welcome！欢迎使用得餐后台管理系统</div>
          <div style="position: absolute; left: 65%; height: 50px; line-height: 50px; color: white">
            当前时间：{{ currentDate + " " + currentTime }}
          </div>
          <div style="display: inline-block;width: 63%"></div>
          <div style="display: flex; width: auto">
            <span :key="tom_keyNum"
                  style="color: white;margin-right: 10px; line-height: 50px;height: 50px;font-size: 16px">{{
                login_name
              }}</span>
            <el-popover
                trigger="hover"
                popper-style="text-align: center; font-size: 18px"
            >
              <template #reference>
                <el-icon color="red" class="m-2" @click="logout()" style="cursor: pointer; height: 50px">
                  <SwitchButton/>
                </el-icon>
              </template>
              <el-button link style="cursor: pointer" @click="logout()">退出</el-button>
            </el-popover>
          </div>
        </div>

      </el-header>

      <el-container>
        <!--        aside区域-->
        <el-aside width="12vw" style="background-color: #91b5b5;height: calc(100vh - 60px);">
          <el-scrollbar style="height: 100%">
            <div class="aside_collapse_button">
              <div style="height: 96px; margin-top: 12px">
                <img src="../assets/logo_white.png" style="width: 100px; height: 100px;border-radius: 50%;" alt="">
              </div>
            </div>
            <el-menu background-color="#91b5b5" text-color="white" style="font-weight: bold;"
                     active-text-color="yellow" router :default-openeds="['1','2' ,'3']">
              <el-menu-item index="summary">
                <template #title>
                  <div class="change_font">
                    <el-icon class="change_font">
                      <House/>
                    </el-icon>
                    概况
                  </div>
                </template>
              </el-menu-item>
              <el-sub-menu index="1" v-if="login_type===4">
                <template #title>
                  <div class="change_font">
                    <el-icon class="change_font">
                      <UserFilled/>
                    </el-icon>
                    人员信息
                  </div>
                </template>
                <el-menu-item-group style="background-color: #76a3a2;">
                  <el-menu-item index="staffs_info" class="change_font">&nbsp &nbsp 员工信息</el-menu-item>
                  <el-menu-item index="customers_info" class="change_font">&nbsp &nbsp 顾客信息</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <!--              菜品信息-->
              <el-sub-menu index="2">
                <template #title>
                  <div class="change_font">
                    <el-icon class="change_font">
                      <KnifeFork/>
                    </el-icon>
                    菜品信息
                  </div>
                </template>
                <el-menu-item-group style="background-color: #76a3a2;">
                  <el-menu-item index="menu" v-if="login_type===4" class="change_font">&nbsp &nbsp 全部菜单
                  </el-menu-item>
                  <el-menu-item index="menu_ordinary" v-if="login_type===2" class="change_font">&nbsp &nbsp 全部菜单
                  </el-menu-item>
                  <el-menu-item index="menu_put_up" v-if="login_type===4" class="change_font">&nbsp &nbsp 上架菜品
                  </el-menu-item>
                  <el-menu-item index="menu_search" class="change_font" style="margin-left: -1vw">菜品分类&菜品搜索
                  </el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>
              <!--              订单信息-->
              <el-sub-menu index="3">
                <template #title>
                  <div class="change_font">
                    <el-icon class="change_font">
                      <List/>
                    </el-icon>
                    订单信息
                  </div>
                </template>
                <el-menu-item-group style="background-color: #76a3a2;">
                  <el-menu-item index="order_all" class="change_font">&nbsp &nbsp 所有账单</el-menu-item>
                  <el-menu-item index="order_search" class="change_font">&nbsp &nbsp 订单查询</el-menu-item>
                </el-menu-item-group>
              </el-sub-menu>

              <el-menu-item index="notice" v-if="login_type===4">
                <template #title>
                  <div class="change_font">
                    <el-icon class="change_font">
                      <Edit/>
                    </el-icon>
                    餐厅公告
                  </div>
                </template>
              </el-menu-item>
              <el-menu-item index="notice_ordinary" v-if="login_type===2">
                <template #title>
                  <div class="change_font">
                    <el-icon class="change_font">
                      <Edit/>
                    </el-icon>
                    餐厅公告
                  </div>
                </template>
              </el-menu-item>
              <el-menu-item index="feedback">

                <template #title>
                  <div class="change_font">
                    <el-icon class="change_font">
                      <Setting/>
                    </el-icon>
                    用户反馈
                  </div>
                </template>

              </el-menu-item>
            </el-menu>
          </el-scrollbar>
        </el-aside>


        <!--main区域-->
        <el-main style="background-color: #E6E8EB; height: calc(100vh - 60px);width: 88vw">
          <el-scrollbar>
            <router-view></router-view>
          </el-scrollbar>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
import {onBeforeMount, onMounted, reactive, ref} from 'vue'
import {Edit, House, KnifeFork, List, Setting, SwitchButton, UserFilled} from '@element-plus/icons-vue'
import {useRouter} from "vue-router/dist/vue-router";
import {useRoute} from "vue-router";
import axios from "@/utils/axiosInstance";
import {ElMessageBox} from "element-plus";

const router = useRouter()
const route = useRoute()

const login_type = Number(localStorage.getItem('login_type'))
const login_name = localStorage.getItem('user_name')

// 时间
let currentDate = ref(null)
let currentTime = ref(null)
let timer = ref(null)

// 存储logo图片路径
const logo_path = ref()

let tom_keyNum = ref(1)

// 存储登录信息
let employeeInfo = reactive([])


// functions
onMounted(() => {
  console.log(login_name)
  getEmplInfo()
  timer = setInterval(() => {
    updateTime()
    tom_keyNum.value++
  }, 1000);
})

onBeforeMount(() => {
  clearInterval(timer) //销毁计时器，放在这个位置只会触发一次计时器，而放在onBeforeUnmount中则会在页面销毁前一直触发
})

// 获取信息
const getEmplInfo = () => {
  axios({
    url: '/employee/getInfoById/' + route.query.id,
    method: 'GET',
  }).then(res => {
    if (res.code === 200) {
      employeeInfo = res.data
    }
  })
}

const logout = () => {
  ElMessageBox.confirm(
      "确认退出得餐后台管理系统？",
      {
        type: "info",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }
  ).then(() => {
    window.localStorage.removeItem('token')
    window.localStorage.removeItem('login_type')
    window.localStorage.removeItem('user_name')
    router.push('/')
  }).catch(() => {

  })
}

const run = () => {
  // router.push("Menu")
  console.log("yes==============")
}

// datas
const item = reactive({
  date: '2016-05-02',
  name: employeeInfo.employeeName,
  address: 'No. 189, Grove St, Los Angeles',
})

// 时间
const updateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要 +1，并补零
  const day = String(now.getDate()).padStart(2, '0'); // 补零

  currentDate = `${year}-${month}-${day}`;
  currentTime.value = now.toLocaleTimeString()
}

const tableData = ref(Array.from({length: 25}).fill(item))
</script>

<style scoped>

.common-layout {
  height: calc(100vh);
}

.aside_collapse_button {
  display: flex;
  flex-direction: column;
  background-color: #91b5b5;
  width: 100%;
  text-align: center;
  height: 120px;
//font-size: 10px; line-height: 24px; color: #fff; //letter-spacing: 0.2em; //cursor: pointer;
}

.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
  border-right: none;
}

.layout-container-demo .el-main {
  padding: 0;
}

.layout-container-demo .toolbar {
  display: block;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}

.img-sty {
  width: 5%;
  height: 5%;
  margin: 2% auto;
  display: inline-block;
}

img {
  width: 100%;
  height: 100%;
}

.title {
  width: 25vw;
  line-height: 50px;
  font-size: 26px;
  color: #233131;
}


.change_font {
  font-size: 18px;
}

</style>
