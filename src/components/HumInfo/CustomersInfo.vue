<template>
  <div>
    <!--  echart图表-->
    <!--    <div style="display: flex;flex-direction: row">-->
    <!--      &lt;!&ndash;      折线图&ndash;&gt;-->
    <!--      <div id="chart_line" style="width: 40%; height: 300px;"></div>-->

    <!--      <div>-->
    <!--        <el-image style="width: 35%;margin: 0 0 0 250px"-->
    <!--                  src="https://img0.baidu.com/it/u=2063362301,3335133179&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500"></el-image>-->
    <!--      </div>-->
    <!--    </div>-->

    <div style="font-size: 20px;height:28px;font-weight: bold;margin: 1vw">
      注册顾客信息
    </div>


    <!--  显示信息的表格-->
    <div>
      <div style="margin: 10px 0 40px 0;">
        <el-table :data="tableData" border style="width: 100%;height: 777px" :key="keyNum" :row-style="{height: '60px'}"
                  :header-cell-style="{color:'rgb(25, 59, 147)',height: '40px'}">
          <el-table-column type="index" label="索引" width="60" align="center"/>
          <el-table-column prop="userAvatar" label="用户头像" width="100" align="center">
            <template v-slot="scope">
              <el-popover
                  placement="right-start"
                  :width="630"
                  trigger="hover"
              >
                <template #reference>
                  <el-avatar src="http://43.143.49.11:9695/image/download/user_default.png?type=2"
                             v-if="scope.row.userAvatar===null" :size="50" shape="square"></el-avatar>
                  <el-avatar :src="scope.row.userAvatar" v-if="scope.row.userAvatar!==null" :size="50"
                             shape="square"></el-avatar>
                </template>
                <template #default>
                  <el-avatar :src="scope.row.userAvatar" :size="600" shape="square"></el-avatar>
                </template>

              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="userUsername" label="用户名" width="160" align="center"/>
          <el-table-column label="性别" width="120" align="center">
            <template v-slot="scope">
              <el-icon v-if="scope.row.userSex===1" style="color: #409EFF">
                <Male/>
              </el-icon>
              <el-icon v-if="scope.row.userSex===2" style="color: #409EFF">
                <Female/>
              </el-icon>
              <el-icon v-if="scope.row.userSex===0" style="color: #E6A23C">
                <InfoFilled/>
              </el-icon>
              &nbsp&nbsp{{ get_staffSex(scope.row.userSex) }}
            </template>
          </el-table-column>
          <el-table-column label="手机号" width="160" align="center">
            <template v-slot="scope">
              <el-text v-if="scope.row.userTel===null">
                <el-icon style="color: #E6A23C">
                  <InfoFilled/>
                </el-icon> &nbsp;&nbsp;未填写
              </el-text>
              <el-text v-else>
                <el-icon style="color: #67C23A">
                  <Cellphone/>
                </el-icon>&nbsp;&nbsp;{{ scope.row.userTel }}
              </el-text>
            </template>
          </el-table-column>
          <el-table-column label="钱包余额" width="140" align="center">
            <template v-slot="scope">
              <el-text>
                ￥&nbsp;&nbsp;{{ scope.row.userBalance }}&nbsp;&nbsp;元
              </el-text>
            </template>
          </el-table-column>
          <el-table-column label="状态" width="120" align="center">
            <template v-slot="scope">
              <el-icon v-if="scope.row.userIsdeleted===0" style="color: #67C23A">
                <SuccessFilled/>
              </el-icon>
              <el-icon v-if="scope.row.userIsdeleted!==0" style="color: #E6A23C;">
                <WarningFilled/>
              </el-icon>
              {{ get_isDelete(scope.row.userIsdeleted) }}
            </template>
          </el-table-column>
          <el-table-column prop="intimeString" label="注册时间" width="180" align="center"/>
          <el-table-column label="操作" align="center">
            <template v-slot="scope">
              <el-button round style="color: rgb(25, 59, 147)"
                         @click="edit_customerInfo(scope.row.userId)">
                <el-icon>
                  <EditPen/>
                </el-icon>
                <span>修改&nbsp;/&nbsp;查看详情</span>
              </el-button>
              <el-divider direction="vertical"/>
              <el-popover
                  placement="bottom"
                  title="密码:"
                  :width="200"
                  trigger="click"
              >
                <el-input disabled v-model="scope.row.userPassword"
                          :prefix-icon="Lock"></el-input>
                <template #reference>
                  <el-button round type="warning">
                    <el-icon>
                      <warning-filled/>
                    </el-icon>
                    <span>查看密码</span>
                  </el-button>
                </template>
              </el-popover>
              <el-divider direction="vertical"/>
              <el-button round type="danger"
                         @click="delete_customerInfo(scope.row.userId)">
                <el-icon>
                  <Delete/>
                </el-icon>
                <span>删除</span>
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!--      分页条-->
    <div class="demo-pagination-block" style="top: 96%;position: absolute;margin-bottom: 2% ">
      <el-pagination
          v-model:current-page="pageNum"
          page-size=7
          layout="prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
      />
    </div>


    <!--    查看、修改顾客信息的抽屉-->
    <el-drawer
        style="background-color: white"
        v-if="update_drawer.drawerVisible"
        size="large"
        :key="update_drawer.keyNum"
        v-model="update_drawer.drawerVisible"
        direction="ttb"
    >
      <template #title>
        <span style="color: #409EFF;font-size: 20px;font-weight: bold"> &nbsp&nbsp查看&nbsp/&nbsp编辑信息</span>
      </template>
      <div
          style="display: flex;flex-direction: row">

        <el-upload
            class="dl-avatar-uploader-min square"
            action="http://43.143.49.11:9695/image/upload?type=2"
            :show-file-list="false"
            :on-success="handleUpImage"
            :before-upload="beforeImageUpload"
            list-type="picture"
            accept="image/*"
        >
          <el-image v-if="update_drawer.update_info.userAvatar" :src="update_drawer.update_info.userAvatar"
                    style="width: 300px" class="avatar"></el-image>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
          <template #tip>
            <div class="el-upload__tip">只能上传图片,且单张图片大小不能超过10MB</div>
          </template>
        </el-upload>


        <el-form
            style="width: 60%;margin:60px 0 0 150px"
            :inline="true"
            :model="update_drawer.update_info"
            ref="ruleFormRef"
            label-width="120px"
            class="demo-ruleForm"
            status-icon
            :rules="update_drawer.rules"
        >
          <el-form-item label="用户Id:" prop="employeeName" class="item">
            <el-text>{{ update_drawer.update_info.userId }}</el-text>
          </el-form-item>
          <el-form-item label="用户名:" prop="userUsername" class="item">
            <el-input v-model="update_drawer.update_info.userUsername" clearable></el-input>
          </el-form-item>
          <br>
          <el-form-item label="性别:" prop="userSex" class="item">
            <el-text v-if="update_drawer.update_info.userSex===1">
              <el-icon style="color: #409EFF">
                <Male/>
              </el-icon>
              男
            </el-text>
            <el-text v-if="update_drawer.update_info.userSex===2">
              <el-icon style="color: #409EFF">
                <Female/>
              </el-icon>
              女
            </el-text>
            <el-text v-else>
              <el-icon style="color: #E6A23C">
                <InfoFilled/>
              </el-icon>
              未填写
            </el-text>
          </el-form-item>
          <el-form-item label="手机号:" prop="userTel" class="item">
            <el-text v-if="update_drawer.update_info.userTel===null">
              <el-icon style="color: #E6A23C">
                <InfoFilled/>
              </el-icon>
              未填写
            </el-text>
            <el-input v-else v-model.number="update_drawer.update_info.userTel" disabled></el-input>
          </el-form-item>
          <el-form-item label="注册时间:" prop="intimeString" class="item">
            <el-text>{{ update_drawer.update_info.intimeString }}</el-text>
          </el-form-item>
          <br>
          <el-form-item label="是否会员" prop="userIsmember" class="item">
            <el-text v-if="update_drawer.update_info.userIsmember===1">
              <el-icon style="color: #67C23A">
                <SuccessFilled/>
              </el-icon>
              是
            </el-text>
            <el-text v-else>
              <el-icon style="color: #F56C6C">
                <CircleCloseFilled/>
              </el-icon>
              否
            </el-text>
          </el-form-item>
          <el-form-item label="账户密码:" prop="userPassword" class="item">
            <el-text v-if="update_drawer.update_info.userPassword!==null">
              <el-icon style="color: #67C23A">
                <SuccessFilled/>
              </el-icon>
              已设置
            </el-text>
            <el-text v-else>
              <el-icon style="color: #F56C6C">
                <CircleCloseFilled/>
              </el-icon>
              未设置
            </el-text>
          </el-form-item>

          <el-form-item>
            <el-button size="large" @click="confirm_updateCustomer" type="primary"
                       style="margin:40px 0 0 650px;color: white ">
              <el-icon>
                <Plus/>
              </el-icon>
              &nbsp&nbsp提 交
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button
                style="color: white;margin-top: 40px" type="info"
                size="large" @click="()=>{update_drawer.drawerVisible=false}">
              <el-icon>
                <Close/>
              </el-icon>
              &nbsp&nbsp取 消
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>

import {
  Cellphone,
  CircleCloseFilled,
  Close,
  Delete,
  EditPen,
  Female,
  InfoFilled,
  Lock,
  Male,
  Plus,
  SuccessFilled,
  WarningFilled
} from "@element-plus/icons-vue";
import {ElInput, ElMessage, ElMessageBox} from "element-plus";
import {inject, onMounted, reactive, ref} from "vue";
import axios from "@/utils/axiosInstance";
import * as echarts from "echarts";

let keyNum = ref(1)

let pageNum = ref(1)

let total = 1

let tableData = reactive([{
  userId: "",
  userUsername: "",
  userPassword: '',
  userTel: "",
  userBalance: '',
  userIsmember: '',
  userIsdeleted: '',
  userInTime: '',
  userAvatar: '',
  userOpenid: '',
  userSex: '',
  userToken: '',
  intimeString: ""
}])

const ruleFormRef = ref({})

let update_drawer = reactive({
  drawerVisible: false,
  keyNum: 1,
  update_info: {
    userId: '',
    userIsmember: '',
    userSex: '',
    userUsername: '',
    userAvatar: '',
    intimeString: '',
    userPassword: '',
    userTel: ''
  },
  rules: {
    userUsername: {required: true, message: "请输入新的用户名", trigger: "change"}
  }
})

const renovate = inject("reload");

onMounted(() => {
  get_customerInfo();
  // echartInit_line();
})


/**
 * @Description:初始化折线图
 * @author @Be_void
 * @date 2023/7/3
 */
const echartInit_line = () => {

  let myChart_line = echarts.init(document.getElementById("chart_line"));

  let option = {
    legend: {
      data: ['每月注册用户数量', '每月使用用户数量']
    },
    title: {
      text: '今年用户走势'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '每月注册用户数量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210, 179, 240, 98, 153, 123]
      },
      {
        name: '每月使用用户数量',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: [120, 210, 300, 353, 422, 450, 400, 467, 490, 500, 489, 600]
      }

    ]
  };
  myChart_line.setOption(option);
}


/**
 * @Description:获取全部顾客信息
 * @author @Be_void
 * @date 2023/7/3
 */
const get_customerInfo = () => {
  axios({
    url: '/user/selectAll',
    method: 'GET',
    params: {
      pageNum: pageNum.value,
      size: 10
    }
  }).then(res => {
    if (res.code === 200) {
      tableData = res.data.list;
      total = res.data.total;
      keyNum.value++;
    } else if (res.code === 205) {
      ElMessage({type: 'error', message: res.message})
    } else
      ElMessage({type: 'error', message: '数据请求失败！'})
  })
}


/**
 * @Description:顾客性别
 * @author @Be_void
 * @date 2023/7/3
 */
const get_staffSex = (index) => {
  if (index === 2)
    return "女";
  else if (index === 1)
    return "男";
  else
    return "未填写"
}


/**
 * @Description:用户状态已注销使用中
 * @author @Be_void
 * @date 2023/6/30
 */
const get_isDelete = (status) => {
  if (status === 0)
    return "使用中";
  else
    return "已注销";
}


/**
 * @Description:编辑顾客信息按钮
 * @author @Be_void
 * @date 2023/7/3
 */
const edit_customerInfo = (id) => {
  axios({
    url: '/user/getInfo/' + id,
    method: 'GET',
  }).then(res => {
    if (res.code === 200) {
      update_drawer.update_info = res.data;
      update_drawer.keyNum++;
      update_drawer.drawerVisible = true;
    } else
      ElMessage({type: 'error', message: '请求数据失败'})
  })
}


/**
 * @Description:提交编辑顾客信息
 * @author @Be_void
 * @date 2023/7/6
 */
const confirm_updateCustomer = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      //通过
      // console.log(update_drawer.update_info.userAvatar + update_drawer.update_info.userUsername)
      ElMessageBox.confirm(
          "确认?",
          'Warning',
          {
            confirmButtonText: '确认提交？',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            axios({
              url: '/user/update',
              method: 'POST',
              params: {
                picture: update_drawer.update_info.userAvatar,
                userId: update_drawer.update_info.userId,
                userUsername: update_drawer.update_info.userUsername
              }
            }).then(res => {
              if (res.code === 200) {
                ElMessage({type: 'success', message: '修改成功！'});
                renovate();
              } else
                ElMessage({type: 'error', message: '修改失败！'})
            })
          }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消',
        })
      })
    } else {
      //未通过
      ElMessage({type: 'error', message: '请输入必填项！'})
    }
  })
}

/**
 * @Description:删除顾客信息按钮
 * @author @Be_void
 * @date 2023/7/3
 */
const delete_customerInfo = (id) => {
  ElMessageBox.confirm(
      "确认删除此用户?",
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        //点确认时执行
        axios({
          url: '/user/delete/' + id,
          method: 'POST'
        }).then(res => {
          if (res.code === 200) {
            ElMessage.success("删除成功！！")
            renovate();
          } else
            ElMessage.error("删除失败！！")
        })
      }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消',
    })
  })
}

/**
 * @Description:分页按钮
 * @author @Be_void
 * @date 2023/7/3
 */
const handleCurrentChange = (val) => {
  pageNum.value = val;
  get_customerInfo()
}


// 上传前，限制的上传图片大小
const beforeImageUpload = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error("单张图片大小不能超过10MB!");
    return false;
  }
  return true;
};
// 上传成功，获取返回的图片地址
const handleUpImage = (res) => {
  console.log(res.data)
  update_drawer.update_info.userAvatar = res.data;
}


</script>

<style scoped>

</style>
