<template>
  <div id="cook_page">
    <div class="cook_window">
      <div class="window_title">
        <div style="position: absolute; left: 1%">
          <el-button round type="info" style="font-size: 16px" @click="returnToLogin()">返回</el-button>
        </div>
        <div style="font-size: 24px">欢迎使用后厨订单界面</div>
        <div style="position: absolute; left: 70%">当前时间：{{ currentDate + " " + currentTime }}</div>
        <div style="position: absolute; left: 95%">
          <el-button round type="primary" style="font-size: 16px;" @click="renovate()">刷新</el-button>
        </div>
      </div>
      <div class="window_list">
        <el-table
            v-if="isRouterAlive"
            :data="tableData"
            border
            style="width: 100%; height: 820px"
            :key="keyNum"
            header-row-style="height:40px"
            row-style="height: 60px">
          <el-table-column prop="orderId" label="账单号" width="300"/>
          <el-table-column prop="dishIdToName" label="菜名" width="120"/>
          <el-table-column prop="detailNumber" label="菜品数量" width="120"/>
          <el-table-column prop="detailTable" label="桌号" width="120"/>
          <el-table-column prop="intimeString" label="下单时间" width="200"/>
          <el-table-column prop="detailMakestatus" label="制作状态" width="180">
<!--            <template v-slot="scope">-->
<!--              <el-icon v-if="scope.row.detailMakestatus === 0" style="color: #f78989; font-size: 18px">-->
<!--                <WarningFilled/>-->
<!--              </el-icon>-->
<!--              <el-icon v-if="scope.row.detailMakestatus === 1" style="color: #409EFF; font-size: 18px">-->
<!--                <Clock/>-->
<!--              </el-icon>-->
<!--              <el-icon v-if="scope.row.detailMakestatus === 2" style="color: #85ce61; font-size: 18px">-->
<!--                <SuccessFilled/>-->
<!--              </el-icon>-->
<!--              <el-icon v-if="scope.row.detailMakestatus === 2" style="color: #85ce61; font-size: 18px">-->
<!--                <SuccessFilled/>-->
<!--              </el-icon>-->
<!--              <el-text style="font-size: 18px">&nbsp {{ get_detailStatus(scope.row.detailMakestatus) }}</el-text>-->
<!--            </template>-->
            <template v-slot="scope">
              <el-text class="mx-1" v-if="scope.row.detailMakestatus===2" style="color: #67C23A;font-size: 15px">
                <el-icon>
                  <Finished/>
                </el-icon>
                &nbsp&nbsp&nbsp{{ get_orderStatus(scope.row.detailMakestatus) }}
              </el-text>
              <el-text v-if="scope.row.detailMakestatus===1" style="color: #E6A23C;font-size: 15px">
                <el-icon>
                  <clock/>
                </el-icon>
                &nbsp&nbsp&nbsp{{ get_orderStatus(scope.row.detailMakestatus) }}
              </el-text>
              <el-text v-if="scope.row.detailMakestatus===0" style="color: #F56C6C;font-size: 15px">
                <el-icon>
                  <RemoveFilled/>
                </el-icon>
                &nbsp&nbsp&nbsp{{ get_orderStatus(scope.row.detailMakestatus) }}
              </el-text>
              <el-text v-if="scope.row.detailMakestatus===3" style="color: #409EFF;font-size: 15px">
                <el-icon>
                  <RemoveFilled/>
                </el-icon>
                &nbsp&nbsp&nbsp{{ get_orderStatus(scope.row.detailMakestatus) }}
              </el-text>
            </template>
          </el-table-column>
          <el-table-column label="厨师选框" width="200">
            <template v-slot="scope">
              <el-select v-if="scope.row.detailMakestatus === 0" v-model="scope.row.detailCook" class="m-2"
                         placeholder="Select" size="large">
                <el-option
                    v-for="item in all_cook"
                    :key="keyNum"
                    :label="item.employeeName"
                    :value="item.employeeId"
                />
              </el-select>
              <el-text v-if="scope.row.detailMakestatus !== 0" style="font-size: 18px">{{
                  scope.row.cookIdToName
                }}
              </el-text>
            </template>
          </el-table-column>
          <el-table-column label="按钮">
            <template v-slot="scope">
              <el-button type="primary"
                         @click="start(scope.row.detailId, scope.row.detailCook, scope.row.detailMakestatus, scope.row.dishIdToName, scope.row.detailNumber, scope.row.orderId)"
                         v-if="scope.row.detailMakestatus === 0" style="font-size: 16px">开始烹饪
              </el-button>
              <el-button type="danger" v-if="scope.row.detailMakestatus === 1" style="font-size: 16px"
                         @click="end(scope.row.detailId, scope.row.detailCook, scope.row.detailMakestatus, scope.row.dishIdToName, scope.row.detailNumber, scope.row.orderId)"
              >结束烹饪
              </el-button>
              <el-button type="success" disabled v-if="scope.row.detailMakestatus === 2" style="font-size: 16px">
                &nbsp;&nbsp;已完成&nbsp;&nbsp;
              </el-button>
            </template>

          </el-table-column>
        </el-table>
      </div>
      <!--      <div class="window_pagination">-->
      <!--        <el-pagination-->
      <!--            v-model:current-page="pageNum"-->
      <!--            v-model:page-size="size"-->
      <!--            layout="prev, pager, next, jumper"-->
      <!--            :total="total"-->
      <!--            @current-change="handleCurrentChange"-->
      <!--        />-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script setup>
import axios from "@/utils/axiosInstance";
import {inject, nextTick, onBeforeMount, onMounted, reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {Clock, Finished, RemoveFilled, SuccessFilled, WarningFilled} from "@element-plus/icons-vue";
import {useRouter} from "vue-router/dist/vue-router";

const router = useRouter();

// 数据刷新
const keyNum = ref(1)
const isRouterAlive = ref(true)
const renovate = inject("reload")

// 时间
let currentDate = ref(null)
let currentTime = ref(null)
let timer = ref(null)

// 订单表格数据
let tableData = reactive([])

// 厨师列表
let all_cook = reactive([])

// 页数设置
let pageNum = 1
let size = 200

onBeforeMount(() => {
  clearInterval(timer)
})

onMounted(() => {
  get_allDetail();
  get_allCook();
  timer = setInterval(() => {
    updateTime()
  }, 1000)
})


// 订单状态
const get_detailStatus = (index) => {
  if (index === 0)
    return "未烹饪";
  else if (index === 1)
    return "烹饪中";
  else
    return "已烹饪"
}

// 获取所有订单
const get_allDetail = () => {
  axios({
    url: '/detail/getAllDetailToCook',
    method: "GET",
    params: {
      pageNum,
      size
    }
  }).then(res => {
    console.log(res)
    if (res.code === 200) {
      tableData = res.data;
      keyNum.value++
      console.log(tableData)
    } else
      ElMessage({type: 'error', message: '当前无订单或请求数据失败！'})
  })
}

// 获取所有厨师
const get_allCook = () => {
  axios({
    url: '/employee/searchCook',
    method: "GET",
  }).then(res => {
    console.log(res)
    if (res.code === 200) {
      all_cook = res.data;
      keyNum.value++
    } else
      ElMessage.error("获取厨师列表失败");
  })
}

// 翻页
const handleCurrentChange = (val) => {
  pageNum = val;
  get_allDetail();
}

// 开始烹饪
const start = (detailId, cookId, makeStatus, dishName, dishNumber, orderId) => {

  if (cookId === null) return ElMessage.error("请选择厨师")

  ElMessageBox.confirm(
      '请确认菜品：' + dishName + ' ，数量：' + dishNumber + ' 份',
      '提示',
      {
        confirmButtonText: "确定开始",
        cancelButtonText: "取消",
        type: "info",
        showClose: false
      }
  ).then(() => {
    makeStatus += 1;
    const url = `http://43.143.49.11:9695/detail/changeStatus?detailId=${detailId}&cookId=${cookId}&makeStatus=${makeStatus}`;
    axios({
      url: url,
      method: 'POST'
    }).then(res => {
      if (res.code === 200) {
        axios({
          url: `/order/finishOrder?orderId=${orderId}`,
          method: 'POST'
        }).then(res => {
          ElMessage({type: 'success', message: '提交成功'});
<<<<<<< HEAD
          get_allDetail();
          renovate();
=======
          renovate();
          get_allDetail();
>>>>>>> 4045921916a44d567567a6eaa0c8207044b52ee6
        })
      } else if (res.code === 204)
        ElMessage({type: "warning", message: "系统繁忙，请刷新再试"});
      else
        ElMessage({type: "error", message: "提交失败，请刷新再试"})
    })
<<<<<<< HEAD
=======

>>>>>>> 4045921916a44d567567a6eaa0c8207044b52ee6
  }).catch(() => {
    ElMessage({type: "info", message: "已取消"})
  })
}

// 结束烹饪
const end = (detailId, cookId, makeStatus, dishName, dishNumber, orderId) => {

  ElMessageBox.confirm(
      '请确认菜品：' + dishName + ' ，数量：' + dishNumber + ' 份',
      '提示',
      {
        confirmButtonText: "确定结束",
        cancelButtonText: "取消",
        type: "warning",
        showClose: false
      }
  ).then(() => {
    makeStatus += 1;
    const url = `http://43.143.49.11:9695/detail/changeStatus?detailId=${detailId}&cookId=${cookId}&makeStatus=${makeStatus}`;
    axios({
      url: url,
      method: 'POST'
    }).then(res => {
      if (res.code === 200) {
        axios({
          url: `/order/finishOrder?orderId=${orderId}`,
          method: 'POST'
        }).then(res => {
          ElMessage({type: 'success', message: '提交成功'});
<<<<<<< HEAD
          get_allDetail();
          renovate();
=======
          renovate();
          get_allDetail();
>>>>>>> 4045921916a44d567567a6eaa0c8207044b52ee6
        })
      } else if (res.code === 204)
        ElMessage({type: "warning", message: "系统繁忙，请刷新再试"});
      else
        ElMessage({type: "error", message: "提交失败，请刷新再试"})
    })
  }).catch(() => {
    ElMessage({type: "info", message: "已取消"})
  })
}

// 返回
const returnToLogin = () => {
  router.push('/')
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('login_type')
  window.localStorage.removeItem('user_name')
}

// 刷新
const reload = () => {
  isRouterAlive.value = false
  nextTick(() => {
    isRouterAlive.value = true
  })
}

// 时间
const updateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要 +1，并补零
  const day = String(now.getDate()).padStart(2, '0'); // 补零

  currentDate = `${year}-${month}-${day}`;
  currentTime.value = now.toLocaleTimeString()
}

// 获取订单状态
const get_orderStatus = (value) => {
  if (value === 0)
    return "未烹饪";
  else if (value === 1)
    return "烹饪中";
  else if(value === 2)
    return "已出菜";
  else
    return "已完成";
}


</script>

<style scoped>
#cook_page {
  width: 100%;
  height: 100%;
  background-image: url("../assets/background.jpg");
  background-size: 100% 100%;
}

.cook_window {
  position: relative;
  top: 3%;
  left: 5%;
  width: 90%;
  height: 94%;
  background-color: white;
}

.window_title {
  display: flex;
  width: 100%;
  height: 6%;
  background-color: #e0dbcf;
  justify-content: center;
  align-items: center;
}

.window_list {
  width: auto;
  height: 90%;
  background-color: #e3dfd5;
}

.window_pagination {
  display: flex;
  width: 100%;
  height: 6%;
  background-color: #e7e3da;
  justify-content: center;
  align-items: center;
}

</style>
