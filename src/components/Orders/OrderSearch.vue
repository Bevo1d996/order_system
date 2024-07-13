<template>
  <div>
    <!--    柱状图-->
    <div style="display:flex;flex-direction: row ">
      <div id="echart_multiple" style="width: 50%;height: 300px;display: inline-block"></div>
      <div style="margin-left: 60px">
        <el-text class="mx-1" style="font-size: 22px;font-weight: bold;margin: 0 0 0 0">搜索订单</el-text>
        <el-form
            :inline="true"
            label-position="top"
            label-width="100px"
            :model="form_data"
            style="max-width: 800px;margin: 10px 0 0 0"
        >
          <el-form-item label="订单状态:" class="item">
            <template v-slot="scope">
              <el-select v-model="form_data.search_input.status" class="m-2" placeholder="Select" size="large">
                <el-option
                    label="未烹饪"
                    value=0
                />
                <el-option
                    label="烹饪中"
                    value=1
                />
                <el-option
                    label="已完成"
                    value=2
                />
              </el-select>
            </template>
          </el-form-item>

          <el-form-item label="负责厨师:" class="item">
            <el-select v-model="form_data.search_input.cookid" class="m-2" placeholder="Select" size="large"
                       :key="select_key">
              <el-option
                  v-for="item in all_cookers"
                  :label="item.employeeName"
                  :value="item.employeeId"
              />
              <el-option
                  label="未选择"
                  value=""
              />
            </el-select>
          </el-form-item>

          <el-form-item label="订单创建时间:" class="item">
            <el-date-picker
                value-format="YYYY-MM-DD"
                v-model="form_data.search_input.date1"
                type="date"
                label="Pick a date"
                placeholder="Pick a date"
                :size="'large'"
                style="width: 40%"
            />
            &nbsp&nbsp--&nbsp&nbsp
            <el-date-picker
                value-format="YYYY-MM-DD"
                v-model="form_data.search_input.date2"
                type="date"
                :size="'large'"
                label="Pick a date"
                placeholder="Pick a date"
                style="width: 40%"
            />
          </el-form-item>
          <el-form-item style="width: 500px">
            <el-button @click="()=>{form_data.search_input.pageNum=1;arrow_show=true;get_allOrders()}"
                       style="" type="primary">
              <el-icon>
                <Search/>
              </el-icon>
              搜 索
            </el-button>
            <el-button type="info" style=""
                       @click="reset_searchInput">
              <el-icon>
                <Refresh/>
              </el-icon>
              重 置
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

    <!--    表格-->
    <div style="width: 100%;background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);height: 470px">
      <div>
        <el-table :data="tableData" border :key="keyNum" table-layout="auto" height="470px"
                  :header-cell-style="{color:'rgb(25, 59, 147)',height:'50px',fontSize:'16px',}"
                  :row-style="{height:'84px'}">
          <el-table-column type="index" label="索引" width="80" align="center"/>
          <el-table-column prop="dishPicture" label="菜品图片" align="center">
            <template v-slot="scope">
              <el-avatar :src="scope.row.dishPicture" shape="square" :size="60"></el-avatar>
            </template>
          </el-table-column>
          <el-table-column prop="detailId" label="订单号" width="300" align="center"/>
          <el-table-column prop="dishIdToName" label="菜品名称" align="center"/>
          <el-table-column prop="detailTable" label="桌号" align="center"/>
          <el-table-column prop="detailNumber" label="数量(/份)" align="center"/>
          <el-table-column prop="detailTotal" label="总价(￥)" align="center"/>
          <el-table-column prop="intimeString" label="创建时间" align="center"/>
          <el-table-column label="状态" align="center">
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
          <el-table-column label="厨师" align="center">
            <template v-slot="scope">
              <el-text v-if="scope.row.cookIdToName!==null" style="color: #67C23A;font-size: 16px">
                <el-icon>
                  <Dish/>
                </el-icon>
                &nbsp;&nbsp;{{ scope.row.cookIdToName }}
              </el-text>
              <el-text v-else style="color: #E6A23C;font-size: 16px">
                <el-icon>
                  <BellFilled/>
                </el-icon>&nbsp;&nbsp;待选择
              </el-text>
            </template>
          </el-table-column>
        </el-table>
        <div class="demo-pagination-block" style="margin-left:25%;position: fixed;bottom: 0;margin-bottom: 1.5% ">
          <el-pagination
              v-model:current-page="form_data.search_input.pageNum"
              background="true"
              layout="prev, pager, next, jumper"
              :total="5000"
              @current-change="handleCurrentChange"
              :page-size="50"
          />
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>


import * as echarts from "echarts";
import {onMounted, reactive, ref} from "vue";
import axios from "@/utils/axiosInstance";
import {BellFilled, Clock, Dish, Finished, Refresh, RemoveFilled, Search} from "@element-plus/icons-vue";
import {ElMessage, ElMessageBox} from "element-plus";

let tableData = reactive([{
  detailId: " ",
  detailOrder: "",
  detailDish: "",
  detailNumber: '',
  detailTotal: '',
  detailInTime: '',
  detailTable: '',
  detailMakestatus: '',
  detailCook: '',
  cookIdToName: '',
  intimeString: "",
  dishIdToName: "",
  dishPicture: ''
}])

let arrow_show = ref(false)

let select_key = ref(1)

let keyNum = ref(1)

let form_data = reactive({
  search_input: {
    status: '',
    cookid: '',
    timer1: '',
    timer2: '',
    pageNum: 1,
    size: 5
  },
})

let all_cookers = reactive([])


onMounted(() => {
  get_allOrders();
  get_allCookers();
  iniEchart();
})

/**
 * @Description:初始化图表
 * @author @Be_void
 * @date 2023/7/4
 */
const iniEchart = () => {
  let myChart_line = echarts.init(document.getElementById("echart_multiple"));
  const colors = ['#5470C6', '#91CC75'];
  let option = {
    title: {
      text: '本周订单数据',
      subtext: 'Fake Data'
    },
    color: colors,
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    grid: {
      right: '20%'
    },
    toolbox: {
      feature: {
        dataView: {show: true, readOnly: false},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    legend: {
      data: ['订单数量', '订单收入']
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        // prettier-ignore
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '订单数量',
        position: 'right',
        alignTicks: true,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0]
          }
        },
        axisLabel: {
          formatter: '{value} 单'
        }
      },
      {
        type: 'value',
        name: '订单收入',
        position: 'left',
        alignTicks: true,
        // offset: 80,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[1]
          }
        },
        axisLabel: {
          formatter: '￥{value} '
        }
      }
    ],
    series: [
      {
        name: '订单数量',
        type: 'bar',
        data: [
          50, 70, 100, 89, 90, 150, 170
        ]
      },
      {
        name: '订单收入',
        type: 'bar',
        yAxisIndex: 1,
        data: [
          1500, 2100, 3200, 2800, 2760, 3700, 4000
        ]
      }
    ]
  };
  myChart_line.setOption(option);
}


/**
 * @Description:获取所有订单
 * @author @Be_void
 * @date 2023/7/4
 */
const get_allOrders = () => {
  axios({
    url: '/detail/search',
    method: 'GET',
    params: form_data.search_input
  }).then(res => {
    if (res.code === 200) {
      tableData = res.data.list;
      keyNum.value++;
    } else if (res.code === 204) {
      tableData = [];
      ElMessage({type: 'warning', message: '这一页没有数据'})
      keyNum.value++;
    } else if (res.code === 205)
      ElMessage.error(res.message)
    else
      ElMessage({type: 'error', message: '请求数据失败'})

  })
}


/**
 * @Description:获取订单状态
 * @author @Be_void
 * @date 2023/7/4
 */
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


/**
 * @Description:获取所有厨师
 * @author @Be_void
 * @date 2023/7/4
 */
const get_allCookers = () => {
  axios({
    url: 'employee/searchCook',
    method: 'GET',
  }).then(res => {
    all_cookers = res.data;
    console.log(all_cookers)
    select_key.value++
  })
}


const handleCurrentChange = (val) => {
  form_data.search_input.pageNum = val;
  console.log(form_data.search_input.pageNum);
  get_allOrders();
}


/**
 * @Description:查询订单按钮
 * @author @Be_void
 * @date 2023/7/5
 */
const search_orders = () => {
  axios({
    url: '/detail/search',
    method: 'GET',
    params: form_data.search_input
  }).then(res => {
    console.log(res)
  })
}


/**
 * @Description:删除订单
 * @author @Be_void
 * @date 2023/7/6
 */
const delete_order = () => {
  ElMessageBox.confirm(
      "确认删除此订单?",
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        //点确认时执行

      }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消',
    })
  })
}


/**
 * @Description:重置表单
 * @author @Be_void
 * @date 2023/7/6
 */
const reset_searchInput=()=>{
  form_data.search_input.status= '';
  form_data.search_input.cookid= '';
  form_data.search_input.timer1= '';
  form_data.search_input.timer2= ''
}

</script>

<style scoped>
.item .el-form-item__label {
  color: rgb(25, 59, 147);
  font-weight: bold;
}
</style>
