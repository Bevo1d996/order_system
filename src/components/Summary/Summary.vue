<template>
  <div>
    <!--    上-->
    <div style="height:16vh;">
      <el-row>
        <el-col :span="6">
          <el-card class="card_sty" style="background-color: rgb(59, 194, 170);">
            <el-avatar style="background-color: white" :size="90">
              <el-icon style="color: rgb(59, 194, 170)" :size="60">
                <UserFilled/>
              </el-icon>
            </el-avatar>
            <div style="display: inline-block; text-align: right; width: 155px">
              <el-text style="color: white;font-size: 37px;font-weight: bold">3454</el-text>
              <br>
              <el-text style="color: white;font-size: 22px">总注册用户</el-text>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card_sty" style="background-color: rgb(70, 147, 221);">
            <el-avatar style="background-color: white" :size="90">
              <el-icon style="color: rgb(70, 147, 221)" :size="60">
                <View/>
              </el-icon>
            </el-avatar>
            <div style="display: inline-block; text-align: right; width: 155px">
              <el-text style="color: white;font-size: 37px;font-weight: bold">2726</el-text>
              <br>
              <el-text style="color: white;font-size: 22px">今日访问量</el-text>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card_sty" style="background-color:  rgb(255, 70, 131);">
            <el-avatar style="background-color: white" :size="90">
              <el-icon style="color: rgb(255, 70, 131)" :size="60">
                <CirclePlusFilled/>
              </el-icon>
            </el-avatar>
            <div style="display: inline-block; text-align: right; width: 155px">
              <el-text style="color: white;font-size: 37px;font-weight: bold">184</el-text>
              <br>
              <el-text style="color: white;font-size: 22px">今日注册用户</el-text>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card class="card_sty" style="background-color:  rgb(70, 147, 221);">
            <el-avatar style="background-color: white" :size="90">
              <el-icon style="color: rgb(70, 147, 221)" :size="60">
                <List/>
              </el-icon>
            </el-avatar>
            <div style="display: inline-block; text-align: right; width: 155px">
              <el-text style="color: white;font-size: 37px;font-weight: bold">3454</el-text>
              <br>
              <el-text style="color: white;font-size: 22px">今日订单</el-text>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!--    中-->
    <div>
      <el-row>
        <el-col :span="12">
          <div style="border-radius: 20px;width: 90%;background-color: white;padding: 10px">
            <el-text style="font-size: 20px;margin: 10px 0 0 20px;font-weight: bold">注册登录统计图</el-text>
            <el-divider style="margin-top: 15px"/>
            <div id="Log_Reg_line" style="height:270px"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div style="border-radius: 20px;width: 90%;background-color: white;padding: 10px">
            <el-text style="font-size: 20px;margin: 10px 0 0 20px;font-weight: bold">浏览下单统计图</el-text>
            <el-divider style="margin-top: 15px"/>
            <div id="view_order" style="height:270px"></div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!--    下-->
    <div style="margin-top: 30px">
      <el-row>
        <el-col :span="8">
          <div style="border-radius: 20px;background-color: white;width: 85%;padding: 10px;height: 28vh">
            <el-text style="font-size: 20px;margin: 10px 0 0 20px;font-weight: bold; width: 80px">餐厅概况</el-text>
            <el-text style="color: #409EFF;margin-left: calc(100% - 185px);cursor: pointer" @click="to_menu">查看更多
              <el-icon>
                <ArrowRightBold/>
              </el-icon>
            </el-text>
            <el-divider style="margin-top: 15px"/>
            <el-row>
              <div style="margin-left: 1vw">
                <div style="display: inline-block;width: 11vw;">
                  <div style="display: inline-block;width: 6vw;">
                    <div style="height: 2vh"><span style="background-color: #409EFF">&nbsp;</span>
                      <el-text style="font-size: 15px;margin-left: 2%">今日售出菜品:</el-text>
                    </div>
                    <div style="margin-top: 2vh;height: 2vh"><span style="background-color: #409EFF">&nbsp;</span>
                      <el-text style="margin-left: 2%;font-size: 15px">今日账单总数:</el-text>
                    </div>
                    <div style="margin-top: 2vh;height: 2vh">
                      <span style="background-color: #409EFF">&nbsp;</span>
                      <el-text style="margin-left: 2%;font-size: 15px">库存告急:</el-text>
                    </div>
                    <div style="margin-top: 2vh;height: 2vh">
                      <span style="background-color: #409EFF">&nbsp;</span>
                      <el-text style="margin-left: 2%;font-size: 15px">已售罄菜品:</el-text>
                    </div>
                    <div style="margin-top: 2vh;height: 2vh">
                      <span style="background-color: #409EFF">&nbsp;</span>
                      <el-text style="margin-left: 2%;font-size: 15px">菜品分类:</el-text>
                    </div>

                  </div>
                  <div style="display: inline-block;width: 3vw;text-align: right">
                    <div style="height: 2vh">
                      <el-text style="font-size: 22px;">950</el-text>
                    </div>
                    <div style="margin-top: 2vh;height: 2vh">
                      <el-text style="font-size: 22px;">360</el-text>
                    </div>
                    <div style="margin-top: 2vh;height: 2vh">
                      <el-text style="font-size: 22px;">6</el-text>
                    </div>
                    <div style="margin-top: 2vh;height: 2vh">
                      <el-text style="font-size: 22px">3</el-text>
                    </div>
                    <div style="margin-top: 2vh;height: 2vh">
                      <el-text style="font-size: 22px;">7</el-text>
                    </div>
                  </div>
                  <div style="display: inline-block;width: 1vw;margin-left: 1vw">
                    <div style="height: 2vh">
                      <el-text style="font-size: 15px;">件</el-text>
                    </div>
                    <div style="margin-top: 2vh;height: 2vh">
                      <el-text style="font-size: 15px;">单</el-text>
                    </div>
                    <div style="margin-top: 2vh;height: 2vh">
                      <el-text style="font-size: 15px;">种</el-text>
                    </div>
                    <div style="margin-top: 2vh;height: 2vh">
                      <el-text style="font-size: 15px;">种</el-text>
                    </div>
                    <div style="margin-top: 2vh;height: 2vh">
                      <el-text style="font-size: 15px;">件</el-text>
                    </div>
                  </div>
                </div>
              </div>
              <!--              <el-divider direction="vertical" style="height: 180px"/>-->
              <el-col :span="12">
                <div style="padding: 20px; width: 85%; height: 60%">
                  <div style="text-align: center;margin-top: 18%;cursor: pointer ">
                    <el-tooltip
                        style="cursor: pointer;"
                        class="box-item"
                        effect="dark"
                        content="查看餐桌信息"
                        placement="top-end"
                        :visible.sync="true"
                    >
                      <img src="../../assets/chair.png" style="width: 70%;height: 70%" alt="" @click="get_allTables"/>
                    </el-tooltip>

                  </div>
                  <!--                  <div-->
                  <!--                      style="margin: 15px 10px 10px 10px; height: 50%; display:flex; align-items: center;justify-content: center">-->
                  <!--                    <el-button type="primary" size="large" @click="get_allTables">&emsp;查看餐桌&emsp;-->
                  <!--                    </el-button>-->
                  <!--                  </div>-->
                  <!--                  <div-->
                  <!--                      style="margin: 15px 10px 10px 10px; height: 50%; display:flex; align-items: center;justify-content: center">-->
                  <!--                    <el-button type="primary" size="large" @click="dialog2Visible = true">&emsp;新建餐桌&emsp;-->
                  <!--                    </el-button>-->
                  <!--                  </div>-->
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="border-radius: 20px;background-color: white;width: 85%;padding: 10px;height:28vh">
            <div id="sort_sold" style="height:260px;width:100%"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div style="border-radius: 20px;background-color: white;width: 85%;padding: 10px;height: 28vh">
            <el-text style="font-size: 20px;margin: 10px 0 0 20px;font-weight: bold;width: 80px">最新评价</el-text>
            <el-text style="color: #409EFF;margin-left: calc(100% - 185px);cursor: pointer" @click="to_feedback">查看更多
              <el-icon>
                <ArrowRightBold/>
              </el-icon>
            </el-text>
            <el-divider style="margin-top: 2vh;margin-bottom: 2vh"/>
            <div v-for="(item,index) in comments.slice(0,4)" :key="key_com" v-if="(comments_show===true)">
              <div style="width: 10vw;display: inline-block">
                <el-rate
                    v-model="rate_value[index]"
                    disabled
                    show-score
                    text-color="#67C23A"
                    score-template="{value} 分"
                />
              </div>
              <el-text truncated style="width: 14vw;text-align: right">
                {{ item.commentContent }}
              </el-text>
              <el-divider style="margin-top: 1vh;margin-bottom: 1vh"/>
            </div>


            <!--            <div style="width: 10vw;display: inline-block">-->
            <!--              <el-rate-->
            <!--                  v-model="rate_value[1]"-->
            <!--                  disabled-->
            <!--                  show-score-->
            <!--                  text-color="#67C23A"-->
            <!--                  score-template="{value} 分"-->
            <!--              />-->
            <!--            </div>-->
            <!--            <el-text truncated style="width: 14vw">-->
            <!--              这里的麻辣小龙虾辣椒和香料的融合使得每一口都充满了火辣的感觉。它的辣味浓郁，麻感十足，让人吃了一口就停不下来。-->
            <!--            </el-text>-->
            <!--            <el-divider style="margin-top: 1vh;margin-bottom: 1vh"/>-->
            <!--            <div style="width: 10vw;display: inline-block">-->
            <!--              <el-rate-->
            <!--                  v-model="rate_value[2]"-->
            <!--                  disabled-->
            <!--                  show-score-->
            <!--                  text-color="#ff9900"-->
            <!--                  score-template="{value} 分"-->
            <!--              />-->
            <!--            </div>-->
            <!--            <el-text truncated style="width: 14vw">-->
            <!--              烤鱼选用新鲜的鱼类作为主要食材，经过烤制后，鱼肉鲜嫩多汁，口感丰富。外层烤制得略微酥脆，内部保持了鱼肉的嫩滑，吃起来非常享受。-->
            <!--            </el-text>-->
            <!--            <el-divider style="margin-top: 1vh;margin-bottom: 1vh"/>-->
            <!--            <div style="width: 10vw;display: inline-block">-->
            <!--              <el-rate-->
            <!--                  v-model="rate_value[3]"-->
            <!--                  disabled-->
            <!--                  show-score-->
            <!--                  text-color="#ff9900"-->
            <!--                  score-template="{value} 分"-->
            <!--              />-->
            <!--            </div>-->
            <!--            <el-text truncated style="width: 14vw">-->
            <!--              梅菜扣肉中的肉块过于肥腻，肥肉与瘦肉的比例不合理，导致整道菜品的口感过于油腻。吃下去的时候，口中的油脂感过于突出，让人感到沉重和不舒服。-->
            <!--            </el-text>-->
            <!--            <el-divider style="margin-top: 1vh;margin-bottom: 1vh"/>-->
          </div>
        </el-col>
      </el-row>
    </div>

    <el-dialog v-model="dialog1Visible" center style="width: 53vw;height: 65vh;" :key="dia_key" draggable>
      <template #title>
        <div style="height: 10vh;line-height: 10vh">
          <el-text style="font-weight: bold;font-size: 22px">
            <el-icon>
              <KnifeFork/>
            </el-icon>
            查看餐厅餐桌
          </el-text>
        </div>
      </template>
      <div style=" display: inline-block;width: 50vw;height: 40vh;">
        <el-scrollbar>
          <div v-for="item in tables" style="display: inline-block;width: 10vw;text-align: center;">
            <el-popover
                placement="right-start"
                :width="230"
                trigger="hover"
                content="餐桌二维码"
            >
              <template #reference>
                <img src="../../assets/chair.png" style="width: 5vw;height: 5vw;cursor: pointer" alt="chair"/>
              </template>
              <img :src="item.tablePicture" style="width: 200px;height: 200px" alt="chair"/>
            </el-popover>

            <div style="margin-bottom: 1vh">{{ item.tableId }}</div>
          </div>
        </el-scrollbar>
      </div>
      <template #footer>
        <div style="height: 10vh;float: right">
          <el-tooltip
              style="cursor: pointer;"
              class="box-item"
              effect="dark"
              content="新增餐桌"
              placement="top-end"
          >
            <div
                class="add_sty"
                @click="addTable">
              <el-icon size="30" class="icon_sty">
                <Plus/>
              </el-icon>
            </div>
          </el-tooltip>
          <el-tooltip
              style="cursor: pointer;"
              class="box-item"
              effect="dark"
              content="删除餐桌"
              placement="top-end"
          >
            <div
                class="add_sty"
                @click="deleteTable">
              <el-icon size="30" class="icon_sty">
                <Minus/>
              </el-icon>
            </div>
          </el-tooltip>
        </div>
      </template>
    </el-dialog>


  </div>
</template>

<script setup>

import {
  ArrowRightBold,
  CirclePlusFilled,
  KnifeFork,
  List,
  Minus,
  Plus,
  UserFilled,
  View
} from "@element-plus/icons-vue";
import * as echarts from "echarts";
import {inject, onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router/dist/vue-router";
import axios from "@/utils/axiosInstance";
import {ElMessage, ElMessageBox} from "element-plus";

let dia_key = ref(0)

let key_com = ref(0)

let comments_show = ref(false)

const router = useRouter()

const renovate = inject("reload")

const rate_value = [3.0, 5.0, 2.2, 4.9]

let tables = reactive([])

let dialog1Visible = ref(false)

let comments = reactive([])

onMounted(() => {
      get_allComments();
      initLog_Reg();
      initView_order();
      initSort_sold();
    }
)


/**
 * @Description:注册登录统计图
 * @author @Be_void
 * @date 2023/7/7
 */
const initLog_Reg = () => {
  let Log_Reg_line = echarts.init(document.getElementById("Log_Reg_line"));

  let option = {
    title: {
      text: '本周注册登录人数'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: {readOnly: false},
        magicType: {type: ['line', 'bar']},
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '注册人数',
        type: 'line',
        data: [146, 169, 130, 150, 179, 184, 190],
        markPoint: {
          data: [
            {type: 'max', name: 'Max'},
            {type: 'min', name: 'Min'}
          ]
        },
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        markLine: {
          data: [{type: 'average', name: 'Avg'}]
        }
      },
      {
        name: '登录人数',
        type: 'line',
        data: [380, 344, 369, 390, 388, 402, 443],
        markPoint: {
          data: [{name: '周最高', value: 443, xAxis: 6, yAxis: 443}]
        },
        itemStyle: {
          color: 'rgb(59, 194, 170)'
        },
        markLine: {
          data: [
            {type: 'average', name: 'Avg'},
            [
              {
                symbol: 'none',
                x: '90%',
                yAxis: 'max'
              },
              {
                symbol: 'circle',
                label: {
                  position: 'start',
                  formatter: 'Max'
                },
                type: 'max',
                name: '最高点'
              }
            ]
          ]
        }
      }
    ]
  };
  Log_Reg_line.setOption(option);
}


/**
 * @Description:浏览订单统计图
 * @author @Be_void
 * @date 2023/7/7
 */
const initView_order = () => {
  let view_order = echarts.init(document.getElementById("view_order"));


  let option = {
    title: {
      text: '浏览量/下单数',
    },
    legend: {},
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: {readOnly: false},
        magicType: {type: ['line', 'bar']},
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: [
      {
        type: 'value',
        position: 'left',
        name: '浏览次数',
        axisLine: {
          show: true,
        },
      }, {
        type: 'value',
        position: 'right',
        name: '下单数量',
        axisLine: {
          show: true,
        },
      }
    ],
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    series: [
      {
        data: [1500, 1650, 1345, 1650, 1443, 1700, 1765],
        name: '浏览次数',
        type: 'bar',
        itemStyle: {
          color: 'rgb(59, 194, 170)'
        },
      },
      {
        data: [2300, 2450, 2653, 2433, 2311, 2540, 2555],
        name: '浏览次数',
        type: 'bar',
        itemStyle: {
          color: 'rgb(70, 147, 221)'
        },
      }
    ]
  };
  view_order.setOption(option);
}


/**
 * @Description:饼状图
 * @author @Be_void
 * @date 2023/7/7
 */
const initSort_sold = () => {
  let sort_sold = echarts.init(document.getElementById("sort_sold"));
  let option = {
    title: {
      text: '各分类下菜品的出售比例',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', "70%"],
        avoidLabelOverlap: false,
        data: [
          {value: 484, name: '炒菜热菜'},
          {value: 735, name: '凉菜卤菜'},
          {value: 580, name: '面点小吃'},
          {value: 1048, name: '烧烤系列'},
          {value: 300, name: '汤菜系列'},
          {value: 700, name: '酒水饮料'},
          {value: 600, name: '水果拼盘'}
        ],
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 20,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        }

      }
    ]
  };
  sort_sold.setOption(option);
}


/**
 * @Description:跳转至菜单页面
 * @author @Be_void
 * @date 2023/7/7
 */
const to_menu = () => {
  router.push('/menu')	//加斜杠/是去掉之前的地址跳转，不加斜杠/是拼接之前的地址跳转
}


/**
 * @Description:所有评论
 * @author @Be_void
 * @date 2023/7/6
 */
const get_allComments = () => {
  axios({
    url: '/comment/getAllComment',
    method: 'GET'
  }).then(res => {
    if (res.code === 200) {
      // console.log(res)
      comments = res.data
      key_com.value++;
      comments_show.value = true;
      console.log(comments)
    } else if (res.code === 205)
      ElMessage.error(res.message)
    else
      ElMessage.error("数据请求失败！")
  })
}


const to_feedback = () => {
  router.push('/feedback')
}

// 查看餐桌
const getTable = () => {
  axios({
    url: '/table/getAllTable',
    method: 'GET'
  }).then(res => {
    console.log(res)
  })
}


/**
 * @Description:获取所有餐桌
 * @author @Be_void
 * @date 2023/7/10
 */
const get_allTables = () => {
  axios({
    url: '/table/getAllTable',
    method: 'GET'
  }).then(res => {
    if (res.code === 200) {
      // console.log(res)
      tables = res.data.list;
      dialog1Visible.value = true;
    } else
      ElMessage.error('请求数据失败！')
  })
}


/**
 * @Description:新建餐桌
 * @author @Be_void
 * @date 2023/7/11
 */
const addTable = () => {
  axios({
    url: '/table/addTable',
    method: 'POST'
  }).then(res => {
    if (res.code === 200) {
      ElMessage.success('添加成功！！')
      get_allTables();
      let timer = null;
      timer = setInterval(() => {
        // renovate();
        dialog1Visible.value = false;
        dia_key.value++;
        dialog1Visible.value = true;
        clearInterval(timer)//销毁计时器，放在这个位置只会触发一次计时器，而放在onBeforeUnmount中则会在页面销毁前一直触发
        timer = null;
      }, 500);
    } else
      ElMessage.error('添加失败！！')
  })
}


/**
 * @Description:删除餐桌
 * @author @Be_void
 * @date 2023/7/11
 */
const deleteTable = () => {
  ElMessageBox.confirm(
      "确认删除?",
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
          url: '/table/deleteTable',
          method: 'POST'
        }).then(res => {
          if (res.code === 200) {
            ElMessage.success('删除成功！！');
            get_allTables();
            let timer = null;
            timer = setInterval(() => {
              // renovate();
              dialog1Visible.value = false;
              dia_key.value++;
              dialog1Visible.value = true;
              clearInterval(timer)//销毁计时器，放在这个位置只会触发一次计时器，而放在onBeforeUnmount中则会在页面销毁前一直触发
              timer = null;
            }, 500);
          } else
            ElMessage.error('删除失败！！')
        })
      }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消',
    })
  })
}


</script>

<style scoped>

.card_sty {
  border-radius: 20px;
  width: 80%;
}

.add_sty {
  background-color: #409EFF;
  display: inline-block;
  position: relative;
  width: 3vw;
  height: 3vw;
  text-align: center;
  cursor: pointer;
  border-radius: 1.5vw;
  margin: 15px;
//border: 1px dashed var(--el-border-color); //border-color: white;
}

.icon_sty {
  color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
