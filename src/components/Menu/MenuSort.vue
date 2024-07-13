<template>
  <div style="height: 100%;" :key="data.pageKey">
    <el-row style="margin-bottom: 5px">
      <el-menu
          v-if="menu_show===true"
          :default-active="activeIndex2"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          style="width:calc(100% - 14px); background-color: #fff; border-radius: 10px"
      >
        <el-menu-item class="sort_item" style="background-color:#fff; border-radius: 10px "
                      @click="()=>{renovate()}">全部
        </el-menu-item>
        <el-menu-item class="sort_item" style="background-color:#fff "
                      @click="()=>{get_allFoodIsNew()}">新品
        </el-menu-item>
        <el-menu-item class="sort_item" style="background-color:#fff "
                      @click="()=>{get_allFoodOnHighVolume()}">热销
        </el-menu-item>
        <el-menu-item class="sort_item" style="background-color:#fff "
                      @click="()=>{get_allFoodOnSale()}">折扣
        </el-menu-item>
        <el-menu-item class="sort_item" v-for="item in menu_sort" :key="key_val" :index="item.typeId"
                      style="background-color:#fff ">{{ item.typeName }}
        </el-menu-item>
        <!--        <el-menu-item class="sort_item" :index=0 @click="()=>{ menu = [];key_val++}">其他-->
        <!--        </el-menu-item>-->
      </el-menu>
    </el-row>
    <el-scrollbar height="80vh">
      <el-space wrap :key="key_val">
        <div v-if="null_show===true">
          <img src="../../assets/noData.jpg" alt="暂无数据" sizes="large" style="width:35%;position: absolute;  top: 50%;
            left: 50%; transform: translate(-50%, -50%);"/>
        </div>
        <el-card v-for="item in menu" :key="key_val" class="box-card" v-if="null_show===false"
                 style="border-radius: 10px;">
          <template #header>
            <div class="card-header" style="height: 15px;text-align: center">
              <el-text @click="detail_info(item)" style="font-size: 19px;font-weight: bold;cursor: pointer;">
                {{ item.dishName }}
              </el-text>
              <el-text style="margin: 10px 0 0 17px;text-decoration: underline;color: #0c3483;  cursor: pointer;"
                       @click="show_comment(item)">
                <el-icon>
                  <ChatLineRound/>
                </el-icon>
                评价
              </el-text>
            </div>
          </template>
          <div class="text item" style="text-align: center">
            <!--          <img-->
            <!--              src=""-->
            <!--              class="image" alt=""-->
            <!--          />-->
            <el-avatar @click="detail_info(item)" :src="item.dishPicture" :size="160" shape="square"
                       style="  cursor: pointer;"></el-avatar>
            <div style="padding: 14px">
              <el-descriptions column="1" @click="detail_info(item)" style="  cursor: pointer;">
                <el-descriptions-item label="商品名">{{ item.dishName }}</el-descriptions-item>
                <el-descriptions-item label="库存状态">{{ item.dishNumber }} &nbsp&nbsp&nbsp份</el-descriptions-item>
                <el-descriptions-item label="价格">￥{{ item.dishNowprice }}&nbsp &nbsp (/份)</el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </el-card>
      </el-space>
    </el-scrollbar>

    <!--  显示商品具体信息的抽屉  ===================================-->
    <div v-if="is_show===true" :key="data.keyNum">
      <el-drawer
          style="background-image: linear-gradient(to top, #f3e7e9 0%, #e3eeff 99%, #e3eeff 100%);"
          v-model="drawer"
          :before-close="handleClose"
          size="700"
      >
        <template #title>
          <div style="font-size: 25px;font-weight: bold;color: #0c3483">
            <el-icon>
              <Histogram/>
            </el-icon>
            商品详情
          </div>
        </template>
        <el-descriptions
            class="margin-top"
            :column="1"
            :size="'large'"
            border
        >
          <el-descriptions-item align="center">
            <template #label>
              <el-icon>
                <Aim/>
              </el-icon>
              菜品图片
            </template>
            <el-popover
                trigger="hover"
                placement="left"
                :width="630"
            >
              <template #reference>
                <el-avatar shape="square" :size="170" :src="detail_show_dish.value.dishPicture"></el-avatar>
              </template>
              <template #default>
                <el-avatar shape="square" :size="600" :src="detail_show_dish.value.dishPicture"></el-avatar>
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
            {{ detail_show_dish.value.dishNo }}
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
            {{ detail_show_dish.value.dishName }}
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div>
                <el-icon>
                  <dish/>
                </el-icon>
                菜品描述
              </div>
            </template>
            <div style="width: 27vw;text-align: center">{{ detail_show_dish.value.dishIntroduction }}</div>
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
            ￥{{ detail_show_dish.value.dishPrice }}&nbsp &nbsp
            (/份)
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
            ￥{{ detail_show_dish.value.dishNowprice }}&nbsp &nbsp (/份)
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Discount/>
                </el-icon>
                菜品折扣
              </div>
            </template>
            {{ bool_isDiscount() }}
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
            {{ getTypename(detail_show_dish.value.dishType) }}
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
            {{ detail_show_dish.value.dishHistorysalesvolume }}&nbsp &nbsp (/份)
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
            {{ detail_show_dish.value.dishMonthsalesvolume }}&nbsp &nbsp (/份)
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <DishDot/>
                </el-icon>
                是否新品
              </div>
            </template>
            {{ bool_isNew() }}
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <SoldOut/>
                </el-icon>
                菜品库存
              </div>
            </template>
            {{ detail_show_dish.value.dishNumber }} &nbsp&nbsp份
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <Timer/>
                </el-icon>
                创建时间
              </div>
            </template>
            {{ detail_show_dish.value.intimeString }}
          </el-descriptions-item>
        </el-descriptions>
        <el-row class="mb-4">
          <el-button :icon="Delete" type="danger"
                     style="margin: 20px 0 0 58%;"
                     @click="delete_menu(detail_show_dish.value.dishId)"
          >
            删除菜品
          </el-button>
          <el-button :icon="Edit" type="primary"
                     class="btn_sty"
                     style="margin: 20px 0 0 10px ;"
                     @click="open_edit()">编辑菜品
          </el-button>
        </el-row>
      </el-drawer>
    </div>


    <!--    修改菜品信息对话框-->
    <div>
      <el-dialog
          style="background-image: linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%);"
          v-model="data.dialogFormVisible" v-if="data.dialogFormVisible" :key="data.keyNum">
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
                          class="avatar"></el-image>
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
            <el-form-item label="菜品现价" prop="dishNowprice" class="item">
              <el-input v-model.number="change_menu.dishNowprice" style="width: 30%"></el-input>
            </el-form-item>
            <el-form-item label="菜品分类" prop="dishType" class="item">
              <el-select v-model="change_menu.dishType" class="m-2" placeholder="Select" size="large">
                <el-option
                    v-for="item in menu_sort"
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
        <el-button @click="cancel_edit()" style="margin: 0 0 0 70%"><el-icon><RefreshLeft/></el-icon>&nbsp;&nbsp;取&nbsp;&nbsp;消</el-button>
        <el-button type="primary" @click="commit_edit()" style="margin-left: 10px">
          <el-icon><CircleCheckFilled/></el-icon>&nbsp;&nbsp;
          确&nbsp;&nbsp;定
        </el-button>
      </span>
        </div>
      </el-dialog>
    </div>


    <el-drawer
        style="background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);"
        v-if="drawer_comment.visiable===true"
        v-model="drawer_comment.visiable"
        direction="ttb"
        :size="'100%'"
    >
      <template #header>
        <div>
          <el-avatar style="width: 180px;height: 180px" shape="square" :key="drawer_comment.keyNum"
                     :src="detail_show_dish.value.dishPicture"></el-avatar>
        </div>
        <el-text style="color:#409EFF;font-size: 30px;font-weight: bolder;margin-right: 70%">
          <el-icon>
            <ChatLineRound/>
          </el-icon>
          {{
            detail_show_dish.value.dishName
          }}评价
        </el-text>
      </template>
      <el-empty description="此菜品暂无评论" v-if="drawer_comment.comment_data.length===0"/>
      <div :key="drawer_comment.keyNum" style="display: flex;flex-direction: row">
        <el-card :body-style="{ padding: '0px' }" v-for="item in drawer_comment.comment_data"
                 style="width: 300px;height: 300px;margin: 20px 50px 20px 50px;box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;">
          <img
              src="https://img-qn.51miz.com/Element/00/23/74/36/6aae4005_E237436_b66e779e.png"
              alt="" style="width: 100px;height: 100px;margin: 20px 0 0 20px"
          />
          <div style="padding: 14px">
            <el-text style="font-weight: bold">评论用户:</el-text>
            <el-text>{{ item.username }}</el-text>
            <br>
            <el-text style="font-weight: bold">评论时间:</el-text>
            <el-text>{{ item.intimeString }}</el-text>
            <br>
            <el-text style="font-weight: bold">用户评分(5分):
            </el-text>
            <el-text>
              <el-rate
                  v-model="rate_value"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value} points"
              />
            </el-text>
            <br>
            <el-popover
                placement="right-start"
                title="评价"
                :width="200"
                trigger="hover"
            >
              <el-text>{{ item.commentContent }}</el-text>
              <template #reference>
                <el-text style="font-weight: bold">评论内容：{{ item.commentContent }}</el-text>
              </template>
            </el-popover>
          </div>
        </el-card>
        <!--        <el-popover-->
        <!--            placement="top-start"-->
        <!--            :width="150"-->
        <!--        >-->
        <!--          <div style="text-align: center;font-size: 16px;font-weight: bold;color: #E6A23C">点击新增公告</div>-->
        <!--          <template #reference>-->
        <!--            <el-icon size="80" color="#E6A23C" style="margin:150px  0 0 100px;cursor: pointer">-->
        <!--              <ChatLineRound/>-->
        <!--            </el-icon>-->
        <!--          </template>-->
        <!--        </el-popover>-->


      </div>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer_comment.visiable=false" size="large">取消</el-button>
        </div>
      </template>
    </el-drawer>

  </div>
</template>

<script setup>
import {inject, onMounted, reactive, ref} from "vue";
import {
  Aim,
  ChatLineRound,
  CircleCheckFilled,
  Delete,
  Discount,
  Dish,
  DishDot,
  Edit,
  Histogram,
  Operation,
  Plus,
  PriceTag,
  RefreshLeft,
  SoldOut,
  Timer
} from "@element-plus/icons-vue";
import axios from "@/utils/axiosInstance";
import {ElMessage, ElMessageBox} from "element-plus";


// datas=================================================================================

let null_show = ref(false)

let keyNum = ref(true)

let drawer_comment = reactive({
  visiable: false,
  comment_data: {},
  keyNum: 0
})

let menu_show = ref(false)

const rate_value = 3.7

// 当前活动s的index值
let active_index = ref(0)

let change_menu = ref({})

const ruleFormRef = ref({})

const rules = {
  dishName: {required: true, message: "请输入菜品名", trigger: "change"},
  dishPrice: [{required: true, message: '请输入菜品单价'},
    {type: 'number', message: 'dishPrice must be a number'}],
  dishIntroduction: {required: true, message: "请输入菜品名", trigger: "change"},
  dishType: {required: true, message: "请输入菜品名", trigger: "change"},
  dishPicture: {required: true, message: "请选择菜品图片", trigger: "change"},
  dishNumber: {required: true, message: "请输入菜品库存", trigger: "change"},
  dishNowprice: [{required: true, message: '请输入菜品现价'},
    {type: 'number', message: 'dishNowprice must be a number'}],
}

const data = reactive({
  dialogFormVisible: false,
  pageKey: 1,
  keyNum: 1,
  edit_show: false
})

const drawer = ref(false)

const key_val = ref(1)

const detail_show_dish = reactive({})

const activeIndex2 = ref('0')
//是否显示商品详情
let is_show = ref(true)

let menu_sort = reactive([
  {typeId: '1', typeName: '1', typeIsdeleted: '1'}, {}, {}, {}, {}, {}, {}, {}
])

let menu = reactive(
    [
      {
        dishId: '1',
        dishName: "1",
        dishPrice: '1',
        dishNowprice: '1',
        dishIntroduction: '1',
        dishPicture: '1',
        dishType: '1',
        dishIsnew: '1',
        dishIsdiscount: '1',
        dishIssoldout: '1',
        dishIsdeleted: '1',
        dishHistorysalesvolume: '1',
        dishMonthsalesvolume: '1',
        dishCreatetime: '1',
        intimeString: '',
        dishNumber: '',
      }, {}
    ])


// functions==================================================================

onMounted(() => {
  get_type();
  get_allfoods();
})

const renovate = inject("reload");
//启用编辑
const open_edit = () => {
  data.dialogFormVisible = true;
  // change_menu = detail_show_dish.value
  change_menu.value = JSON.parse(JSON.stringify(detail_show_dish.value));
  data.keyNum++
  // console.log("=======================")
  // console.log(typeof (change_menu.value))
  // console.log(data.dialogFormVisible)
}


/**
 * @Description:提交编辑的菜品
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
              // 更新获取的菜品数据
              if (active_index.value === 0) {
                get_allfoods();
              }
              getFloodById(active_index.value)
              ElMessage({
                message: '修改成功',
                type: 'success',
              })
              data.dialogFormVisible = false;
              drawer.value = false;//关闭菜品详情信息抽屉
              renovate()
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


/**
 * @Description:取消修改
 * @author @Be_void
 * @date 2023/7/10
 */
const cancel_edit = () => {
  change_menu.value = JSON.parse(JSON.stringify(detail_show_dish.value));
  console.log(change_menu.value)
  data.dialogFormVisible = false;
}

/*获取菜品分类*/
const get_type = () => {
  axios({
    url: "type/getAllType",
    method: 'GET',
  }).then(res => {
    if (res.code === 200) {
      // console.log(res.data)
      menu_sort = res.data
      key_val.value++
      menu_show.value = true;
      // console.log(key_val.value)
    } else if (res.code === 205)
      ElMessage({type: 'error', message: res.message});
    else
      ElMessage({type: 'error', message: '数据请求失败'})
  })
}


/**
 * @Description:获取菜品分类id对应的菜品名
 * @author @Be_void
 * @date 2023/7/10
 */
const getTypename = (typeId) => {
  for (let i = 0; i < menu_sort.length; i++) {
    if (menu_sort[i].typeId === typeId) {
      return menu_sort[i].typeName
    }
  }
}


/**
 * @Description:获取全部菜品
 * @author @Be_void
 * @date 2023/7/10
 */
const get_allfoods = () => {
  axios({
    url: "dish/getAllInfo",
    method: "GET",
  }).then(res => {
    menu = res.data
    key_val.value++
  })
}


/**
 * @Description: 获取所有新品
 * @author @Be_void
 * @date 2023/7/10
 */
const get_allFoodIsNew = () => {
  axios({
    url: "dish/getDishIsNew",
    method: "GET",
  }).then(res => {
    // console.log(res.data)
    menu = res.data
    key_val.value++
    console.log(res.data)
  })
}


/**
 * @Description:获取所有热销
 * @author @Be_void
 * @date 2023/7/10
 */
const get_allFoodOnHighVolume = () => {
  axios({
    url: "dish/getDishOnHighVolume",
    method: "GET",
  }).then(res => {
    // console.log(res.data)
    menu = res.data
    key_val.value++
    console.log(res.data)
  })
}


/**
 * @Description:获取所有折扣
 * @author @Be_void
 * @date 2023/7/10
 */
const get_allFoodOnSale = () => {
  axios({
    url: "dish/getDishOnSale",
    method: "GET",
  }).then(res => {
    // console.log(res.data)
    menu = res.data
    key_val.value++
    console.log(res.data)
  })
}


/**
 * @Description:根据菜品获取菜品
 * @author @Be_void
 * @date 2023/7/10
 */
const getFloodById = (typeId) => {
  axios({
    url: 'dish/getDishInfoByType/' + typeId,
    method: 'GET',
  }).then(res => {
    console.log(res)
    if (res.code === 200) {
      menu = res.data
      key_val.value++
    } else if (res.code === 205)
      ElMessage({type: 'error', message: res.message});
    else if (res.code === 204) {
      null_show.value = true;
      key_val.value++
    } else
      ElMessage({type: 'error', message: '数据请求失败'})
  })
}


/**
 * @Description:删除菜品
 * @author @Be_void
 * @date 2023/7/11
 */
const delete_menu = (id) => {
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
          url: '/dish/delete',
          method: 'POST',
          params: {
            id: id
          }
        }).then(res => {
          if (res.code === 200) {
            ElMessage.success('删除成功！！');
            renovate();
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


/**
 * @Description:商品是否新品
 * @author @Be_void
 * @date 2023/7/10
 */
const bool_isNew = () => {
  if (detail_show_dish.value.dishIsnew === 0) {
    return "否"
  }
  return "是"
}


/**
 * @Description:计算商品折扣
 * @author @Be_void
 * @date 2023/7/10
 */
const dish_discount = () => {
  if (detail_show_dish.value.dishIsdiscount === 1) {
    let dish_discount = detail_show_dish.value.dishNowprice / detail_show_dish.value.dishPrice;
    return dish_discount.toFixed(2) * 100;
  }
}


/**
 * @Description:商品是否打折
 * @author @Be_void
 * @date 2023/7/10
 */
const bool_isDiscount = () => {
  if (detail_show_dish.value.dishIsdiscount === 1)
    return "商品打" + dish_discount() + "折中!!!!"
  return "商品未打折"
}


const handleSelect = (index) => {
  getFloodById(index);
  null_show.value = false;
  active_index.value = index
}

const handleClose = () => {
  close();
  is_show.value = false
  // console.log(is_show.value + '++++++++++++++++++')
}


/**
 * @Description:显示商品详细信息
 * @author @Be_void
 * @date 2023/7/10
 */
const detail_info = (item) => {
  drawer.value = true
  is_show.value = true
  detail_show_dish.value = item;
  // console.log(item)
  // console.log(typeof (is_show.value))
}


/**
 * @Description:查看菜品评论
 * @author @Be_void
 * @date 2023/7/6
 */
const show_comment = (item) => {
  detail_show_dish.value = item;
  drawer_comment.keyNum++
  axios({
    url: '/comment/getComment/' + item.dishId,
    method: 'GET',
  }).then(res => {
    if (res.code === 200) {
      drawer_comment.comment_data = res.data
      drawer_comment.visiable = true
    } else if (res.code === 204)
      ElMessage({type: 'warning', message: '这个菜品暂无评论'})
    else
      ElMessage({type: 'error', message: '请求数据失败'})
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
  change_menu.value.dishPicture = res.data;
}
// ==========================================================================
</script>

<style scoped>
el-row {
  margin-bottom: 20px;
}

el-col {
  border-radius: 4px;
}

.sort_item {
  width: 100%;
  background-color: rgb(230, 232, 235);
}

img {
  width: 70%;
  height: 50%;
}

.detail_img {
  height: 200px !important;
  width: 200px !important;
}

.box-card {
  width: 16.5vw;
  height: 360px !important;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader-icon {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}


.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.item .el-form-item__label {
  color: #409EFF;
  font-weight: bold;
}

el-menu-item {
  width: 200px;
}


</style>
