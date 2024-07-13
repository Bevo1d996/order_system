<template>
  <div
      style="background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);">
    <!--    <div style="display: flex ;flex-direction: row; width: 100%">-->
    <!--      <div style="font-size: 26px;font-weight: bold; width: 200px;margin: 20px 0 0 20px">账单中心</div>-->
    <!--      <div style="font-size: 26px;margin:30px 0 -50px -30px; width: 200px;color: rgb(25, 59, 147)">-->
    <!--        <el-icon color="rgb(25, 59, 147)">-->
    <!--          <Checked/>-->
    <!--        </el-icon>-->
    <!--        CHECKS-->
    <!--      </div>-->
    <!--      <div style="margin: 0 0 0 70%">-->
    <!--        <el-icon :size="50" color="rgb(25, 59, 147)">-->
    <!--          <Checked/>-->
    <!--        </el-icon>-->
    <!--      </div>-->
    <!--    </div>-->
    <!--    <el-divider border-style="dashed" style="background-color: #EBEDF0"/>-->

    <div style="display: inline-block;width: 100%;height: 30px;">
      <div
          style="font-size: 21px;display: inline-block;width: 27vw;font-weight: bold;margin-top: 10px;margin-left: 1vw">
        用户信息
      </div>
      <div class="divider_sty" style="margin-left: 15vw !important;color: #909399">桌号 (号)</div>
      <el-divider direction="vertical" style="background-color: #909399;"/>
      <div class="divider_sty" style="color: #909399">菜品数量</div>
      <el-divider direction="vertical" style="background-color: #909399"/>
      <div class="divider_sty" style="color: #909399">总价(元)</div>
      <el-divider direction="vertical" style="background-color: #909399"/>
      <div class="divider_sty" style="color: #909399;width: 180px">创建时间</div>
      <el-divider direction="vertical" style="background-color: #909399"/>
      <div class="divider_sty" style="color: #909399">操作</div>
    </div>


    <div v-if="isShow_noData===true" style="background-color: white;">
      <img src="../../assets/noData.jpg" alt="暂无数据"
           style="background-image: linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%);"/>
    </div>
    <div style="display: inline-block;width: 100%;"
         v-if="isShow_noData===false">
      <div v-for="(item,index) in all_checks" style="margin-top: 15px;">
        <div>
          <el-text style="font-size: 16px;margin:0 0 0 10px;color: #606266">账单编号：</el-text>
          <span
              style="font-size: 14px;color: #909399">{{
              item.orderId
            }}</span>
        </div>
        <el-divider border-style="dashed" style="background-color: white;margin: 7px 0 0 0"/>
        <div
            class="order_box"
            :key="keyNum">
          <div
              style="display: flex;justify-content: center;align-items: center;width: 500px;height: 100px;font-weight: bold">
            <div>
              <el-image style="height: 100px;width: 100px;margin-left: 80px" :src="item.img"/>
            </div>
            <div style="display: flex;justify-content: left ;flex-direction: column; width: 500px">
              <div style="margin-top: 0 !important;margin-left: 50px;width: 500px">
                <el-text style="font-size: 16px; font-weight: normal">用户Id：</el-text>
                <el-text style="font-size: 18px;color: #E6A23C;"> {{
                    item.orderUser
                  }}
                </el-text>
              </div>
              <div style="margin-top: 20px !important;margin-left: 100px">
                <el-text style="font-size: 16px;margin-top: 20px;font-weight: normal">支付状态：</el-text>
                <el-text v-if="item.orderStatus===0" style="font-size: 16px;color: #F56C6C">
                  <el-icon>
                    <QuestionFilled/>
                  </el-icon>
                  待支付
                </el-text>
                <el-text v-if="item.orderStatus===1" style="font-size: 16px;color: #ebb563">
                  <el-icon>
                    <CircleCheckFilled/>
                  </el-icon>
                  已支付
                </el-text>
                <el-text v-if="item.orderStatus===2" style="font-size: 16px;color: #67C23A">
                  <el-icon>
                    <Finished/>
                  </el-icon>
                  已出菜
                </el-text>
                <el-text v-if="item.orderStatus===3" style="font-size: 16px;color: #409EFF">
                  <el-icon>
                    <Finished/>
                  </el-icon>
                  已完成
                </el-text>

                <el-text style="font-size: 16px;margin: 20px 0 0 20px;font-weight: normal" v-if="item.orderStatus!==0">
                  支付方式:
                </el-text>
                <el-text style="font-size: 16px;color: #67C23A" v-if="item.orderStatus!==0">
                  <el-icon>
                    <CircleCheckFilled/>
                  </el-icon>
                  钱包余额
                </el-text>
              </div>
            </div>
          </div>
          <div class="divider_sty" style="margin-left: 12vw !important;color: #909399">{{ item.orderTable }} 号
          </div>
          <el-divider direction="vertical" style="background-color: #909399"/>
          <el-text class="divider_sty" style="color: #E6A23C">{{ item.dishNum }}</el-text>
          <el-divider direction="vertical" style="background-color: #909399"/>
          <el-text class="divider_sty" style="color: #67C23A">￥ {{ item.orderTotal }} 元</el-text>
          <el-divider direction="vertical" style="background-color: #909399"/>
          <el-text class="divider_sty" style="width: 180px"> {{ item.intimeString }}</el-text>
          <el-divider direction="vertical" style="background-color: #909399"/>
          <el-text class="divider_sty">
            <el-button type="primary" link style="font-size: 17px;" @click="show_orderDetail(item.orderId)">账单详情
            </el-button>
          </el-text>
        </div>
      </div>
    </div>
    <!--      分页条-->
    <div class="demo-pagination-block" style="margin-left:25%;position: fixed;bottom: 0;margin-bottom: 8px ">
      <el-pagination
          v-model:current-page="pageNum"
          background="true"
          layout="prev, pager, next, jumper"
          :total="5000"
          @current-change="handleCurrentChange"
          :page-size="50"
      />
    </div>


    <!--    订单详情对话框-->
    <div class="order">

      <el-dialog v-model="dialog_data.dialogVisible" title="Tips" width="30%" draggable
                 v-if="dialog_data.dialogVisible===true">
        <template #title>
          <div style="font-size: 20px;font-weight: bold;text-align: center">
            <el-icon>
              <Checked/>
            </el-icon>
            得餐餐厅 总账单
          </div>
        </template>
        <el-text style="font-size: 20px;">桌号:{{ dialog_data.order_tail.orderTable }}</el-text>
        <el-divider border-style="dashed" style="margin: 7px 0 7px 0"/>
        <div class="det_item">流水号:{{ dialog_data.order_tail.orderId }}</div>
        <div class="det_item">开单时间:{{ dialog_data.order_tail.intimeString }}</div>
        <div class="det_item">菜品种类数量:{{ dialog_data.order_tail.dishNum }}</div>
        <el-divider border-style="dashed" style="margin: 7px 0 7px 0"/>
        <!--        <div class="order-items">-->
        <!--          <el-text class="item-name">菜品名称</el-text>-->
        <!--          <el-text class="item-count">数量</el-text>-->
        <!--          <el-text class="item-price">单价</el-text>-->
        <!--          <el-text class="item-totalPrice">总价</el-text>-->
        <!--          <div v-for="item in dialog_data.order_tail.details" :key="detailId" class="order-item">-->
        <!--            <el-text class="item-name">{{ item.dishName }}</el-text>-->
        <!--            <el-text class="item-count">{{ item.detailNumber }}</el-text>-->
        <!--            <el-text class="item-price">{{ item.dishPrice }}</el-text>-->
        <!--            <el-text class="item-totalPrice">{{ item.detailTotal }}</el-text>-->
        <!--          </div>-->
        <!--        </div>-->

        <el-descriptions
            direction="vertical"
            :column="4"
            style="margin-left: 10px"
            size="large"
        >
          <el-descriptions-item label="菜品名称">
            <div v-for="item in dialog_data.order_tail.details">{{ item.dishName }}</div>
          </el-descriptions-item>
          <el-descriptions-item label="数量">
            <div v-for="item in dialog_data.order_tail.details">{{ item.detailNumber }}</div>
          </el-descriptions-item>
          <el-descriptions-item label="单价">
            <div v-for="item in dialog_data.order_tail.details">{{ item.dishPrice }}</div>
          </el-descriptions-item>
          <el-descriptions-item label="总价">
            <div v-for="item in dialog_data.order_tail.details">{{ item.detailTotal }}</div>
          </el-descriptions-item>
        </el-descriptions>
        <el-divider border-style="dashed" style="margin: 10px 0 7px 0"/>
        <div class="total-price">消费金额: ￥{{ dialog_data.order_tail.orderTotal }}</div>
        <el-divider border-style="dashed" style="margin: 7px 0 7px 0"/>

        <div class="det_item">地址:湖北省武汉市武昌区八一路299号武汉大学得餐餐厅</div>
        <div class="det_item">电话：16888888888</div>
        <div style="text-align: center;margin-top: 20px">
          <el-text style="font-size: 23px">欢迎您的再次光临！ 谢谢</el-text>
        </div>
        <template #footer>
          <el-tooltip
              class="box-item"
              effect="dark"
              content="请连接打印机"
              placement="right-start"
          >
            <el-button @click="print_allOrders" v-if="show_print===true">打印</el-button>
          </el-tooltip>
        </template>
      </el-dialog>
    </div>


  </div>
</template>

<script setup>

//data====================================================================================================================
import {onMounted, reactive, ref} from "vue";
import axios from "@/utils/axiosInstance";
import {Checked, CircleCheckFilled, Finished, QuestionFilled} from "@element-plus/icons-vue";
import {ElMessage} from "element-plus";

const show_print = ref(true)

let pageNum = ref(1)

let dialog_data = reactive({
  dialogVisible: false,
  order_tail: {
    orderId: "",
    orderTable: '',
    orderUser: "",
    orderTotal: '',
    orderInTime: '',
    orderIsdeleted: '',
    orderStatus: '',
    intimeString: "",
    dishNum: '',
    details: []
  }
})

let isShow_noData = ref(false)

onMounted(() => {
  get_allChecks();
  keyNum.value++;
})


const keyNum = ref(1)

//账单
let all_checks = reactive([
  {
    orderId: "",
    orderTable: '',
    orderUser: "",
    orderTotal: '',
    orderInTime: '',
    orderIsdeleted: '',
    orderStatus: '',
    intimeString: "",
    img: "",
    dishNum: 1
  },
])

const get_allChecks = () => {
  axios({
    url: '/order/searchOrder',
    method: 'GET',
    params: {
      pageNum: pageNum.value,
      size: 5
    }
  }).then(res => {
    if (res.code === 200) {
      if (res.data.list.length !== 0) {
        all_checks = res.data.list;
        console.log(all_checks)
        isShow_noData.value = false;
        keyNum.value++
      } else {
        isShow_noData.value = true;
        // console.log("======================")
        keyNum.value++
      }
    } else if (res.code === 205)
      ElMessage.error(res.message)
    else {
      ElMessage({type: 'error', message: '请求数据失败！！'})
    }
  })
}


/**
 * @Description:打印账单
 * @author @Be_void
 * @date 2023/7/11
 */
const print_allOrders = () => {
  show_print.value = false;
  let timer = null;
  timer = setInterval(() => {
    window.print();
    clearInterval(timer)//销毁计时器，放在这个位置只会触发一次计时器，而放在onBeforeUnmount中则会在页面销毁前一直触发
    timer = null;
  }, 500);
}

const handleCurrentChange = (val) => {
  pageNum.value = val;
  console.log(pageNum.value);
  get_allChecks();
}


const show_orderDetail = (id) => {
  axios({
    url: '/order/getOrderById',
    method: 'GET',
    params: {
      orderId: id
    }
  }).then(res => {
    if (res.code === 200) {
      dialog_data.order_tail = res.data;
      dialog_data.dialogVisible = true;
    } else
      ElMessage({type: 'error', message: '请求数据失败'})
  })
}

</script>

<style scoped>

.divider_sty {
  text-align: center;
  width: 6.5vw;
  display: inline-block;
}

.order_box {
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
}


.order {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
}

.order h2 {
  margin-bottom: 10px;
}

.order-items {
  margin-bottom: 40px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.item-name {
  margin-left: 30px;
  flex: 1;
  font-weight: bold;
  font-size: 16px;
}

.item-count {
  font-weight: bold;
  font-size: 16px;
}

.item-price {
  margin-left: 30px;
  font-weight: bold;
  font-size: 16px;
}

.item-totalPrice {
  text-align: right;
  margin-right: 30px;
  font-weight: bold;
  font-size: 16px;
}

.total-price {
  text-align: right;
  font-weight: bold;
  font-size: 19px;
}


.det_item {
  margin: 12px 0 12px 0;
}

</style>
