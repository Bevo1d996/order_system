<template>
  <div>
    <div class="common-layout">
      <el-container>
        <el-aside width="45%">
          <div style="font-size: 20px;font-weight: bold">餐厅菜品查询</div>
          <div style="display: flex;flex-direction: row">
            <div class="search_form">
              <el-form :model="form_data" label-width="120px">
                <el-col :span="18">
                  <el-form-item label="Activity time">
                    <el-col :span="11">
                      <el-date-picker
                          value-format="YYYY-MM-DD"
                          v-model="form_data.date1"
                          type="date"
                          :size="'large'"
                          placeholder="Pick a date"
                          style="width:100%"
                      />
                    </el-col>
                    <el-col :span="2" class="text-center">
                      <span class="text-gray-500">&nbsp;&nbsp;-</span>
                    </el-col>
                    <el-col :span="11">
                      <el-date-picker
                          v-model="form_data.date2"
                          placeholder="Pick a date"
                          style="width:100%"
                          :size="'large'"
                          type="date"
                          value-format="YYYY-MM-DD"
                      />
                    </el-col>
                  </el-form-item>
                </el-col>

                <el-form-item label="菜品类型" prop="dishType">
                  <el-select v-model="form_data.search_dishType" class="m-2" placeholder="Select" size="large">
                    <el-option
                        v-for="item in all_dishType"
                        :label="item.typeName"
                        :key="form_data.keyNum"
                        :value="item.typeId"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="菜品名">
                  <el-input v-model="form_data.search_dishName" :prefix-icon="EditPen" placeholder="请输入模糊菜品名"
                            style="width: 400px" size="large"/>
                </el-form-item>
                <el-form-item>
                  <el-button style="margin-left: 300px" @click="search_btn()" type="primary">
                    <el-icon>
                      <Search/>
                    </el-icon>
                    搜索
                  </el-button>
                  <el-button @click="reset_search()" type="info">
                    <el-icon>
                      <Refresh/>
                    </el-icon>
                    重置
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <!--            <div style="display: flex;flex-direction: column" v-if="search_show===true">-->
            <!--              <el-text style="color: #409EFF;margin-top: 20px ">-->
            <!--                <el-icon v-for="item in [1,1,1,1,1,1,1,1,1]">-->
            <!--                  <ArrowRightBold/>-->
            <!--                </el-icon>-->
            <!--              </el-text>-->
            <!--              <el-text style="margin-top: 100px;color: #409EFF">-->
            <!--                <el-icon v-for="item in [1,1,1,1,1,1,1,1,1]">-->
            <!--                  <ArrowRightBold/>-->
            <!--                </el-icon>-->
            <!--              </el-text>-->

            <!--            </div>-->
          </div>
          <!--          <el-divider style=";background-color: lightblue">-->
          <!--          </el-divider>-->


          <!--          菜品分类管理表格-->
          <div style="margin: 0 0 10px 15px;font-size: 20px;font-weight: bold">菜品分类管理
            <el-text style="color: #409EFF;margin-left: 2vw;font-size: 17px;cursor: pointer;" @click="add_sort"
                     v-if="login_type===4">
              (
              <el-icon>
                <CirclePlusFilled/>
              </el-icon>
              点击添加分类)
            </el-text>
          </div>
          <div style="background-color: white">
            <el-table :data="all_dishType" border height="395px" stripe="true"
                      style="background-color: #E6E8EB;"
                      :header-cell-style="{height: '45px'}" :row-style="{height:'50px'}">
              <el-table-column prop="typeId" label="分类编号" width="90" align="center"/>
              <el-table-column prop="typeName" label="分类名称" width="160" align="center">
              </el-table-column>
              <el-table-column prop="typeNumber" label="该分类下的菜品数量" align="center"/>
              <el-table-column label="操作" width="160" align="center">
                <template v-slot="scope">
                  <el-button @click="delete_sort(scope.row)" v-if="login_type===4"
                             style="background-color: rgb(214, 38, 26);color: white">
                    <el-icon>
                      <Delete/>
                    </el-icon>
                    删除
                  </el-button>
                  <el-button disabled @click="delete_sort(scope.row.typeId)" v-if="login_type!==4"
                             style="background-color: rgb(214, 38, 26);color: white">
                    <el-icon>
                      <Delete/>
                    </el-icon>
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div style="height: 30px;">
              <el-divider style="background-color: #0c3483" content-position="left">共{{
                  all_dishType.length
                }}条数据
              </el-divider>
            </div>
          </div>
        </el-aside>


        <el-main>
          <!--搜索结果-->
          <div v-show="search_show===false" style="height: 300px"></div>
          <div v-show="search_show===true" style="height: 300px">
            <div style="margin:0 0 10px 0;font-size: 20px;font-weight: bold">搜索结果</div>
            <el-table :data="search_data" height="300" :header-cell-style="{color:'rgb(25, 59, 147)'}"
                      :key=" keyNum">
              <el-table-column prop="dishName" label="商品名称" width="120" align="center"/>
              <el-table-column label="商品类型" width="80" align="center">
                <template v-slot="scope">
                  <!--                  <el-button @click="getType_byId(scope.row)">{{ 哈哈哈 }}</el-button>-->
                  {{ getType_byId(scope.row) }}
                </template>
              </el-table-column>
              <el-table-column prop="dishPrice" label="商品价格(￥/份)" width="160" align="center"/>
              <el-table-column prop="intimeString" label="创建时间" width="220" align="center"/>
              <el-table-column label="操作" align="center">
                <template v-slot="scope">
                  <el-button @click="search_detail(scope.row)" style="color: #E6A23C">
                    <el-icon>
                      <InfoFilled/>
                    </el-icon>
                    详情
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div id="main" style="width: 100%; height: 400px;margin: 8% 0 0 0"></div>
        </el-main>
      </el-container>
    </div>


    <!--    商品详情对话框-->
    <el-dialog v-model="dialog_data.dialogFormVisible" :key="dialog_data.keyNum" top="8vh" :modal="false"
               :draggable="true"
               style="background-image: linear-gradient(to top, #dfe9f3 0%, white 100%);">
      <!--  对话框头部  -->
      <div style="margin: -5% 0 3% 2%;font-size: 20px;color: #409EFF">
        菜品详情
        <!--  可在此处编辑充当对话框标题  -->
      </div>
      <div>
        <!--        描述商品详情-->
        <el-descriptions
            class="margin-top"
            :column="1"
            :size="'large'"
            border
        >
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Aim/>
                </el-icon>
                菜品图片
              </div>
            </template>
            <el-popover
                trigger="hover"
                placement="left"
                :width="630"
            >
              <template #reference>
                <el-upload
                    class="dl-avatar-uploader-min square"
                    action="http://43.143.49.11:9695/image/upload?type=1"
                    :show-file-list="false"
                    :on-success="handleUpImage"
                    :before-upload="beforeImageUpload"
                    list-type="picture"
                    accept="image/*"
                >
                  <el-image style="width: 200px" v-if="dialog_data.dish_data.dishPicture"
                            :src="dialog_data.dish_data.dishPicture"
                            class="avatar"></el-image>
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus/>
                  </el-icon>
                  <template #tip>
                    <div class="el-upload__tip">只能上传图片,且单张图片大小不能超过10MB</div>
                  </template>
                </el-upload>
              </template>
              <template #default>
                <el-avatar shape="square" :size="600" :src="dialog_data.dish_data.dishPicture"></el-avatar>
              </template>
            </el-popover>
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Aim/>
                </el-icon>
                菜品编号
              </div>
            </template>
            {{ dialog_data.dish_data.dishNo }}
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <dish/>
                </el-icon>
                菜品名称
              </div>
            </template>
            {{ dialog_data.dish_data.dishName }}
          </el-descriptions-item>
          <el-descriptions-item align="center" label-class-name="lab_sty">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <dish/>
                </el-icon>
                菜品描述
              </div>
            </template>
            <div style="width: 38vw;text-align: center"> {{ dialog_data.dish_data.dishIntroduction }}</div>
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <PriceTag/>
                </el-icon>
                菜品价格
              </div>
            </template>
            ￥{{ dialog_data.dish_data.dishPrice }}&nbsp &nbsp (/份)
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Discount/>
                </el-icon>
                菜品现价
              </div>
            </template>
            ￥{{ dialog_data.dish_data.dishNowprice }}&nbsp &nbsp (/份)
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Operation/>
                </el-icon>
                菜品分类
              </div>
            </template>
            {{ getType_byId(dialog_data.dish_data) }}
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Histogram/>
                </el-icon>
                历史售量
              </div>
            </template>
            {{ dialog_data.dish_data.dishHistorysalesvolume }}&nbsp &nbsp (/份)
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Histogram/>
                </el-icon>
                每月售量
              </div>
            </template>
            {{ dialog_data.dish_data.dishMonthsalesvolume }}&nbsp &nbsp (/份)
          </el-descriptions-item>
          <!--          <el-descriptions-item align="center">-->
          <!--            <template #label>-->
          <!--              <div class="cell-item">-->
          <!--                <el-icon>-->
          <!--                  <DishDot/>-->
          <!--                </el-icon>-->
          <!--                是否新品-->
          <!--              </div>-->
          <!--            </template>-->
          <!--            {{ bool_isNew() }}-->
          <!--          </el-descriptions-item>-->
          <!--          <el-descriptions-item align="center">-->
          <!--            <template #label>-->
          <!--              <div class="cell-item">-->
          <!--                <el-icon>-->
          <!--                  <SoldOut/>-->
          <!--                </el-icon>-->
          <!--                是否售罄-->
          <!--              </div>-->
          <!--            </template>-->
          <!--            {{ boolIsSoldOut(detail_show_dish.value) }}-->
          <!--          </el-descriptions-item>-->
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Timer/>
                </el-icon>
                创建时间
              </div>
            </template>
            {{ dialog_data.dish_data.intimeString }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <!--  对话框尾部  -->
      <div>
<span class="dialog-footer">
        <el-button @click="delete_dish(dialog_data.dish_data.dishId)"
                   style="margin: 25px 0 0 72%;" type="danger">
          <el-icon>
            <Delete/>
          </el-icon>
          删除菜品
        </el-button>
        <el-button @click="edit_menu(dialog_data.dish_data)"
                   style="margin: 25px 0 0 10px;" type="primary">
          <el-icon>
            <Edit/>
          </el-icon>
          编辑菜品
        </el-button>
      </span>
      </div>
    </el-dialog>


    <!--    修改菜品信息对话框-->
    <div>
      <el-dialog
          style="background-image: linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);"
          v-model="edit_dialogForm.dialogFormVisible" v-if="edit_dialogForm.dialogFormVisible" top="7vh"
          :key="edit_dialogForm.keyNum">
        <!--  对话框头部  -->

        <div style="margin: -3% 0 5% 4%;font-size: 23px;color: #409EFF;font-weight: bold">
          <el-icon>
            <Edit/>
          </el-icon>
          编辑菜品信息
        </div>
        <div>
          <!--  编辑菜单的表单  -->
          <el-form
              :model="change_menu"
              ref="ruleFormRef"
              label-width="120px"
              class="demo-ruleForm"
              status-icon
              :rules="rules"
          >
            <el-form-item label="菜品图片" class="item" prop="dishPicture">
              <el-upload
                  class="dl-avatar-uploader-min square"
                  action="http://43.143.49.11:9695/image/upload?type=1"
                  :show-file-list="false"
                  :on-success="handleUpImage"
                  :before-upload="beforeImageUpload"
                  list-type="picture"
                  accept="image/*"
              >
                <el-image v-if="change_menu.dishPicture" :src="change_menu.dishPicture"
                          class="avatar" style="width: 18vw;height: 26vh"></el-image>
                <el-icon v-else class="avatar-uploader-icon">
                  <Plus/>
                </el-icon>
                <template #tip>
                  <div class="el-upload__tip">只能上传图片,且单张图片大小不能超过10MB</div>
                </template>
              </el-upload>
              <!--              <el-avatar shape="square" :size="147" :src="change_menu.dishPicture"></el-avatar>-->
            </el-form-item>
            <el-form-item label="菜品名称" prop="dishName" class="item">
              <el-input style="width: 50%;" v-model="change_menu.dishName"></el-input>
            </el-form-item>
            <el-form-item label="菜品描述" prop="dishIntroduction" class="item">
              <el-input v-model="change_menu.dishIntroduction" style="width: 70%" :rows="4"
                        type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="菜品价格" prop="dishPrice" class="item">
              <el-input v-model.number="change_menu.dishPrice" style="width: 30%"></el-input>
            </el-form-item>
            <el-form-item label="菜品现价" class="item">
              <el-input v-model.number="change_menu.dishNowprice" style="width: 30%"></el-input>
            </el-form-item>
            <el-form-item label="菜品分类" prop="dishType" class="item">
              <el-select v-model="change_menu.dishType" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="item in all_dishType"
                    :key="form_data.keyNum"
                    :label="item.typeName"
                    :value="item.typeId"
                />
              </el-select>
              <!--              <el-input v-model="change_menu.dishType"></el-input>-->
            </el-form-item>
            <el-form-item label="菜品库存(份)" class="item" prop="dishNumber">
              <el-input v-model="change_menu.dishNumber" style="width: 30%"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!--  对话框尾部  -->
        <div>
      <span class="dialog-footer">
        <el-button @click="()=>{edit_dialogForm.dialogFormVisible=false}" style="margin: 0 0 0 70%"><el-icon><RefreshLeft/></el-icon>&nbsp;&nbsp;取&nbsp;&nbsp;消</el-button>
        <el-button type="primary" @click="commit_edit()" style="margin-left: 10px">
          <el-icon><CircleCheckFilled/></el-icon>&nbsp;&nbsp;
          确&nbsp;&nbsp;定
        </el-button>
      </span>
        </div>
      </el-dialog>
    </div>


  </div>
</template>

<script setup>

import {
  Aim,
  CircleCheckFilled,
  CirclePlusFilled,
  Delete,
  Discount,
  Dish,
  Edit,
  EditPen,
  Histogram,
  InfoFilled,
  Operation,
  Plus,
  PriceTag,
  Refresh,
  RefreshLeft,
  Search,
  Timer
} from "@element-plus/icons-vue";
import {inject, onMounted, reactive, ref, watch} from "vue";
import axios from '@/utils/axiosInstance'
import {ElMessage, ElMessageBox} from "element-plus";
import * as echarts from "echarts";

// data=================================================================================================================
const login_type = Number(localStorage.getItem('login_type'))

let change_menu = ref({})

let edit_dialogForm = {
  dialogFormVisible: false,
  keyNum: 0,
}

const rules = {
  dishName: {required: true, message: "请输入菜品名", trigger: "change"},
  dishPrice: [{required: true, message: '请输入菜品单价'},
    {type: 'number', message: 'dishPrice must be a number'}],
  dishIntroduction: {required: true, message: "请输入菜品名", trigger: "change"},
  dishType: {required: true, message: "请输入菜品名", trigger: "change"},
  dishPicture: {required: true, message: "请选择菜品图片", trigger: "change"},
  dishNumber: {required: true, message: "请输入菜品库存", trigger: "change"}
}

let dialog_data = reactive({
  dialogFormVisible: false,
  keyNum: 0,
  dish_data: {}
})

const echart_data = reactive({
  xData: [], //横坐标
  yData: [], //数据
  myChartStyle: {float: "left", width: "100%", height: "400px"}, //图表样式
})

const ruleFormRef = ref({})

let keyNum = ref(1)

let all_dishType = ref([{typeId: '', typeName: '', typeNumber: ''}, {}, {}, {}])

let form_data = reactive({
  keyNum: 0,
  search_dishType: '',
  search_dishName: '',
  date1: '',
  date2: ''
})

let search_show = ref(false)

let search_data = reactive([])

//function--------------------------------------------------------------------------------------------------------------
const renovate = inject("reload");

onMounted(() => {
  get_dishType();
})

watch(() => all_dishType.value, (newValue, oldValue) => {
  newValue.forEach(obj => {
    echart_data.xData.push(obj.typeName)
    echart_data.yData.push(obj.typeNumber)
  })
  echartInit()
});


/**
 * @Description:通过id获取菜品类型名称
 * @author @Be_void
 * @date 2023/7/10
 */
const getType_byId = (row) => {
  for (let i = 0; i < all_dishType.value.length; i++) {
    if (all_dishType.value[i].typeId === row.dishType) {
      console.log(all_dishType.value[i].typeName)
      // keyNum++
      return all_dishType.value[i].typeName
    }
  }
}


/**
 * @Description: 查询按钮
 * @author @Be_void
 * @date 2023/6/27
 */
const search_btn = () => {
  axios({
    url: '/dish/search',
    method: 'GET',
    params: {
      name: form_data.search_dishName,
      type: form_data.search_dishType,
      time1: form_data.date1,
      time2: form_data.date2
    }
  }).then(res => {
    // console.log(res)
    search_data = res.data
    search_show.value = true;
    keyNum.value++
  })
}

/**
 * @Description: 重置按钮
 * @author @Be_void
 * @date 2023/6/27
 */
const reset_search = () => {
  form_data.search_dishType = '';
  form_data.search_dishName = '';
  form_data.date1 = '';
  form_data.date2 = '';
  search_show.value = false
}


/**
 * @Description: 查看详情按钮
 * @author @Be_void
 * @date 2023/6/27
 */
const search_detail = (row) => {
  console.log(row)
  dialog_data.dish_data = row;
  dialog_data.dialogFormVisible = true;
  dialog_data.keyNum++;
}


/**
 * @Description: 删除菜品按钮
 * @author @Be_void
 * @date 2023/6/27
 */
const delete_dish = (dishId) => {
  ElMessageBox.confirm(
      "确认?",
      'Warning',
      {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        axios({
          url: '/dish/delete',
          method: 'POST',
          params: {
            id: dishId
          }
        }).then(res => {
          if (res.code === 200) {
            ElMessage({type: 'success', message: '删除成功！'});
            dialog_data.dialogFormVisible = false;
            reset_search();
          } else {
            ElMessage({type: 'error', message: '删除失败！'})
          }
        })
      }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消',
    })
  })
}


/**
 * @Description:添加分类
 * @author @Be_void
 * @date 2023/7/10
 */
const add_sort = () => {
  ElMessageBox.prompt('请输入类型名称', 'Tip', {
    confirmButtonText: '确认',
    cancelButtonText: 'Cancel',
  })
      .then(({value}) => {
        axios({
          url: '/type/insert',
          method: 'POST',
          params: {
            typeName: value
          }
        }).then(res => {
          if (res.code === 200) {
            ElMessage.success('添加分类成功！');
            renovate();
          } else
            ElMessage.error("添加失败！")
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: 'Input canceled',
        })
      })
}


/**
 * @Description: 删除分类
 * @author @Be_void
 * @date 2023/6/26
 */
const delete_sort = (item) => {
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
        if (item.typeNumber === 0) {
          axios({
            url: '/type/delete',
            method: 'POST',
            params: {
              id: item.typeId
            }
          }).then(res => {
            if (res.code === 200) {
              ElMessage.success('删除成功！')
              renovate();
            } else
              ElMessage.error("删除失败！")
          })
        } else
          ElMessage.error(`删除失败！该分类下还有${item.typeNumber}菜品`)
      }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消',
    })
  })
}

/**
 * @Description: 初始化柱状图
 * @author @Be_void
 * @date 2023/6/26
 */
const echartInit = () => {
  //获取DOM元素并初始化
  let myChart = echarts.init(document.getElementById("main"));

  let option = {
    title: {
      text: '每个分类下的菜品数量',
      subtext: 'Fake Data'
    },
    xAxis: {
      type: 'category',
      data: echart_data.xData,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: true,
      },
    },
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
        data: echart_data.yData,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      }
    ]
  };
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);
};

/**
 * @Description: 获取所有分类
 * @author @Be_void
 * @date 2023/6/26
 */
const get_dishType = () => {
  axios({
    url: "type/getAllType",
    method: 'GET',
  }).then(res => {
    if (res.code === 200) {
      all_dishType.value = res.data;
      console.log("=============");
      console.log(all_dishType.value)
      return res.data;
    } else if (res.code === 205) {
      ElMessage.error(res.message)
    } else {
      ElMessage.error("请求数据失败!");
    }
  })
}

/**
 * @Description:编辑菜品
 * @author @Be_void
 * @date 2023/7/10
 */
const edit_menu = (item) => {
  console.log(all_dishType.value)
  dialog_data.dialogFormVisible = false;
  edit_dialogForm.dialogFormVisible = true;
  change_menu.value = JSON.parse(JSON.stringify(item));
  edit_dialogForm.keyNum++;
}


/**
 * @Description:提交修改菜品
 * @author @Be_void
 * @date 2023/7/10
 */
const commit_edit = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm(
          "确认编辑?",
          'Warning',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            axios({
              url: "/dish/update",
              method: 'POST',
              params: change_menu.value
            }).then(res => {
              if (res.code === 200) {
                ElMessage({type: 'success', message: '修改成功！'});
                renovate()
              } else
                ElMessage({type: 'error', message: '修改失败！！'})
            })
          }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消',
        })
      })
    } else {
      console.log('表单验证未通过')
    }
  })
}


const beforeImageUpload = (rawFile) => {
  if (rawFile.size / 1024 / 1024 > 10) {
    ElMessage.error("单张图片大小不能超过10MB!");
    return false;
  }
  return true;
};
// 上传成功，获取返回的图片地址
const handleUpImage = (res) => {
  dialog_data.dish_data.dishPicture = res.data;
}

</script>

<style scoped>
.search_form {
  margin: 20px 0 10px 50px;
}

</style>
