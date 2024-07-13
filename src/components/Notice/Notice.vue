<template>
  <div style="background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);">
    <div class="search_form" style="display: flex;flex-direction: row">
      <!--      <el-form :model="search_form" label-width="120px">-->
      <!--        <el-form-item label="Title">-->
      <!--          <el-col :span="6">-->
      <!--            <el-input v-model="search_form.search_notice" :prefix-icon="EditPen" placeholder="请输入标题"/>-->
      <!--          </el-col>-->
      <!--          <el-col :span="6" style="margin-left: 280px">-->
      <!--            <el-button @click="search_btn()" class="btn_sty">-->
      <!--              <el-icon>-->
      <!--                <Search/>-->
      <!--              </el-icon>-->
      <!--              搜索-->
      <!--            </el-button>-->
      <!--            <el-button @click="reset_btn()" class="btn_sty"-->
      <!--                       style="background-color: white;color: rgb(25, 59, 147);">-->
      <!--              <el-icon>-->
      <!--                <Refresh/>-->
      <!--              </el-icon>-->
      <!--              重置-->
      <!--            </el-button>-->
      <!--          </el-col>-->
      <!--        </el-form-item>-->
      <!--        <el-col :span="18">-->
      <!--          <el-form-item label="Activity time">-->
      <!--            <el-col :span="11">-->
      <!--              <el-date-picker-->
      <!--                  v-model="search_form.date1"-->
      <!--                  type="date"-->
      <!--                  placeholder="Pick a date"-->
      <!--                  style="width: 100%"-->
      <!--              />-->
      <!--            </el-col>-->
      <!--            <el-col :span="2" class="text-center">-->
      <!--              <span class="text-gray-500">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp-</span>-->
      <!--            </el-col>-->
      <!--            <el-col :span="11">-->
      <!--              <el-date-picker-->
      <!--                  v-model="search_form.date2"-->
      <!--                  placeholder="Pick a time"-->
      <!--                  style="width: 100%"-->
      <!--                  type="date"-->
      <!--              />-->
      <!--            </el-col>-->
      <!--          </el-form-item>-->
      <!--        </el-col>-->
      <!--      </el-form>-->
      <div style="display: flex;flex-direction: row;width: 100%">
        <el-image style="width: 250px;margin-left: -100px;height: 200px;margin-top: 20px; margin-bottom: 10px"
                  src="https://img1.baidu.com/it/u=1837060474,2877082946&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500"></el-image>
        <div
            style="width: 1200px;">
          <el-carousel :interval="3000" type="card" height="350px" v-if="notice_show===true">
            <el-carousel-item v-for="item in dada_isShow" :key="item">
              <div id="isShow_box">
                <!--                <span style="text-align: center;font-size: 30px;font-weight: bolder;margin-top: 10px"><el-icon><ChatLineRound/></el-icon>&nbsp&nbsp公  告</span>-->
                <el-text style="font-size: 18px;margin: 10vh 3vw 0 2vw;white-space: pre-wrap;">{{
                    item.announcementContent
                  }}
                </el-text>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>


        <div style="margin-top: 100px; padding-right: 15px">
          <el-popover
              placement="top-start"
              :width="150"
              trigger="hover"
              :visible.sync="true"
          >
            <div style="text-align: center;font-size: 16px;font-weight: bold;color: #E6A23C">点击新增公告</div>
            <template #reference>
              <el-icon size="80" color="#E6A23C" style="margin:150px  0 0 100px;cursor: pointer"
                       @click="add_notice_btn">
                <CirclePlusFilled/>
              </el-icon>
            </template>
          </el-popover>
        </div>
      </div>
    </div>


    <!--    公告表格-->
    <div style="height: 345px;width: 100%;background-color: white;margin:10px 0 0 0 !important;">
      <el-table v-if="is_show===true" :data="tableData" style="width: 100%" :key="keyNum"
                :header-cell-style="{color:'rgb(25, 59, 147)', height:'45px'}" :row-style="{height:'50px'}">
        <el-table-column type="index" label="索引" width="80" align="center"/>
        <el-table-column prop="annoCreateByEmpl" label="创建人" width="100" align="center"/>
        <el-table-column prop="intimeString" label="创建时间" width="180" align="center"/>
        <el-table-column label="是否显示" width="180" align="center">
          <template v-slot="scope">
            <el-switch
                :active-value=1
                active-text="显示"
                inactive-text="不显示"
                v-model="scope.row.announcementIsshow"
                class="mt-2"
                disabled
                width="60"
                :inactive-value=0
                style="--el-switch-on-color: rgb(25, 59, 147); --el-switch-off-color:rgb(214, 38, 26)"
                inline-prompt
                :change="change_status(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="announcementNumber" label="公告编号" width="160" align="center"/>
        <el-table-column prop="announcementContent" label="公告内容" width="480">
          <template v-slot="scope">
            <el-popover
                placement="top-start"
                title="公告详情"
                :width="600"
                trigger="click"
            >
              <template #reference>
                <el-text class="w-100px" truncated style="cursor: pointer">
                  <span style="color: #409EFF;font-weight: bold;font-size: 14px">详情</span>
                  {{ scope.row.announcementContent }}
                </el-text>
              </template>
              <div>{{ scope.row.announcementContent }}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button type="danger"
                       @click="delete_notice(scope.row)">
              <el-icon>
                <Delete/>
              </el-icon>
              &nbsp &nbsp删 &nbsp除
            </el-button>
            <el-button type="primary" @click="edit_Notice(scope.row)">
              <el-icon>
                <EditPen/>
              </el-icon>
              &nbsp &nbsp编&nbsp辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>


      <!--      <div class="demo-pagination-block" style="margin-left:25%;position: absolute;bottom: 0;margin-bottom: 2% ">-->
      <!--        <el-pagination-->
      <!--            v-model:current-page="pageNum"-->
      <!--            background="true"-->
      <!--            layout="prev, pager, next, jumper"-->
      <!--            :total="1000"-->
      <!--            @current-change="handleCurrentChange"-->
      <!--            :page-size="100"-->
      <!--        />-->
      <!--      </div>-->
    </div>
    <div class="demo-pagination-block" style="position: absolute;top:96%;margin-bottom: 2% ">
      <el-pagination
          v-model:current-page="pageNum"
          background="true"
          layout="prev, pager, next, jumper"
          :total="1000"
          @current-change="handleCurrentChange"
          :page-size="100"
      />
    </div>


    <!--    修改公告对话框-->
    <el-dialog
        draggable="true"
        v-model="dialog_data.dialogVisible"
        v-if="dialog_data.dialogVisible===true"
        width="40%"
    >
      <div style="margin: -5% 0 5% 2%;font-size: 20px;color: #409EFF">
        <el-icon>
          <Edit/>
        </el-icon>
        修改公告
        <!--  可在此处编辑充当对话框标题  -->
      </div>
      <div>
        <el-form
            :model="dialog_data.notice_detail"
            ref="ruleFormRef"
            label-width="120px"
            class="demo-ruleForm"
            status-icon
            :rules="dialog_data.rule"
        >
          <el-form-item label="公告编号">
            <el-input v-model="dialog_data.notice_detail.announcementId" disabled placeholder="Please input"/>
          </el-form-item>
          <el-form-item label="创建人">
            <el-input v-model="dialog_data.notice_detail.annoCreateByEmpl" disabled placeholder="Please input"/>
          </el-form-item>
          <el-form-item label="创建时间">
            <el-input v-model="dialog_data.notice_detail.intimeString" disabled placeholder="Please input"/>
          </el-form-item>
          <el-form-item label="是否显示">
            <template v-slot="scope">
              <el-switch
                  :active-value=1
                  active-text="显示"
                  inactive-text="不显示"
                  v-model="dialog_data.notice_detail.announcementIsshow"
                  class="mt-2"
                  width="60"
                  :inactive-value=0
                  style="--el-switch-on-color: #409EFF; --el-switch-off-color: #ff4949"
                  inline-prompt
              />
            </template>
          </el-form-item>
          <el-form-item label="公告内容" prop="announcementContent">
            <el-input type="textarea" :rows="4" v-model="dialog_data.notice_detail.announcementContent"
                      placeholder="Please input"/>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button type="info" @click="()=>{renovate()}">
              <el-icon>
                <Refresh/>
              </el-icon>&nbsp 取 &nbsp  消</el-button>
        <el-button type="primary" @click="edit_btn">
          <el-icon>
                <Edit/>
          </el-icon>&nbsp 修 &nbsp  改
        </el-button>
      </span>
      </template>
    </el-dialog>


    <!--    新增公告对话框-->
    <el-dialog v-if="add_notice.dialogVisible" v-model="add_notice.dialogVisible" title="Tips" width="30%" draggable>
      <template #title>
        <div style="color: #409EFF;font-size: 20px;font-weight: bold">
          <el-icon>
            <CirclePlusFilled/>
          </el-icon>
          添加公告
        </div>
      </template>
      <div>
        <el-form
            :model="add_notice.add_detail"
            ref="add_ruleFormRef"
            label-width="120px"
            class="demo-ruleForm"
            status-icon
            :rules="add_notice.rule"
        >
          <el-form-item label="创建人" prop="announcementCreateby">
            <el-input :placeholder=user_name disabled></el-input>
          </el-form-item>
          <el-form-item label="公告是否显示">
            <template v-slot="scope">
              <el-switch
                  :active-value=1
                  active-text="显示"
                  inactive-text="不显示"
                  v-model="add_notice.add_detail.announcementIsshow"
                  class="mt-2"
                  width="60"
                  :inactive-value=0
                  style="--el-switch-on-color: #409EFF; --el-switch-off-color: #ff4949"
                  inline-prompt
              />
            </template>
          </el-form-item>
          <el-form-item label="公告内容" prop="announcementContent">
            <el-input :rows="4" type="textarea" v-model="add_notice.add_detail.announcementContent"
                      placeholder="请输入公告内容"/>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="renovate()">取&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp消</el-button>
        <el-button type="primary" @click="confirm_add">
          确认创建
        </el-button>
      </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>

import {inject, onMounted, reactive, ref} from "vue";
import {CirclePlusFilled, Delete, Edit, EditPen, Refresh} from "@element-plus/icons-vue";
import axios from "@/utils/axiosInstance";
import {ElMessage, ElMessageBox} from "element-plus";

// data===============================================================================

const user_id = localStorage.getItem('user_id')

const user_name = localStorage.getItem('user_name')

let pageNum = ref(1)

let keyNum = ref(1)

let notice_show = ref(false)

const ruleFormRef = ref()

const add_ruleFormRef = ref()

let add_notice = reactive({
  dialogVisible: false,
  add_detail: {announcementCreateby: user_id, announcementIsshow: 1, announcementContent: ''},
  rule: {
    announcementCreateby: {required: true, message: "公告创建者不能为空", trigger: "change"},
    announcementContent: {required: true, message: "公告内容不能为空", trigger: "change"}
  }
})

let dialog_data = reactive({
  dialogVisible: false,
  notice_detail: {
    announcementId: '',
    announcementContent: '',
    announcementCreateby: '',
    announcementIsshow: '',
    intimeString: ''
  },
  rule: {
    announcementContent: {required: true, message: "请输入公告内容", trigger: "change"}
  },
})

let is_show = ref(true)

let dada_isShow = reactive([{}, {}, {}, {}])

let data_key = ref(1)

let tableData = reactive([])

//当前页数

//functions=========================================================================

const renovate = inject("reload");

onMounted(() => {
  get_allNotice();
  get_isShow();
  let timer = null;
  is_show.value = false;
  is_show.value = true;
  timer = setInterval(() => {
    notice_show.value = false;
    notice_show.value = true
    console.log(tableData)
    clearInterval(timer)
    timer = null;
  }, 500);
})


/**
 * @Description:获取所有可显示的公告
 * @author @Be_void
 * @date 2023/7/1
 */
const get_isShow = () => {
  axios({
    url: '/announcement/getAnnoIsShow',
    method: 'GET',
  }).then(res => {
    dada_isShow = res.data;
    notice_show.value = false
    notice_show.value = true

  })
}


/**
 * @Description: 新增公告按钮
 * @author @Be_void
 * @date 2023/6/29
 */
const add_notice_btn = () => {
  add_notice.dialogVisible = true;
}


const change_status = (row) => {
  // console.log(row)
}

/**
 * @Description:修改公告按钮
 * @author @Be_void
 * @date 2023/6/28
 */
const edit_Notice = (item) => {
  dialog_data.notice_detail = item;
  dialog_data.dialogVisible = true;
  console.log(dialog_data.notice_detail);
}

/**
 * @Description:删除公告
 * @author @Be_void
 * @date 2023/6/30
 */
const delete_notice = (row) => {
  ElMessageBox.confirm(
      "确认删除此公告?",
      'Warning',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        axios({
          url: '/announcement/delete',
          method: 'POST',
          params: {
            id: row.announcementId
          }
        }).then(res => {
          if (res.code === 200) {
            ElMessage({type: 'success', message: '删除成功！！！'})
            renovate();
          }
          else
            ElMessage({type: 'error', message: '删除失败！！！'})
        })
      }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消',
    })
  })
}

/**
 * @Description:确认修改公告按钮
 * @author @Be_void
 * @date 2023/6/29
 */
const edit_btn = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      //   验证通过
      // console.log(dialog_data.notice_detail);
      ElMessageBox.confirm(
          "确认?",
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
              url: '/announcement/update',
              method: 'POST',
              params: {
                announcementContent: dialog_data.notice_detail.announcementContent,
                announcementId: dialog_data.notice_detail.announcementId,
                announcementIsshow: dialog_data.notice_detail.announcementIsshow
              }
            }).then(res => {
              if (res.code === 200) {
                ElMessage({type: 'success', message: '修改成功！！'})
                dialog_data.dialogVisible = false;
                renovate()
                // 更新组件
                is_show.value = false;
                is_show.value = true
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
      ElMessage({type: 'error', message: '修改失败:公告内容不能为空!!'})
    }
  })
}

/**
 * @Description:确认增加公告
 * @author @Be_void
 * @date 2023/6/30
 */
const confirm_add = () => {
  add_ruleFormRef.value.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm(
          "确认创建此公告?",
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
              url: '/announcement/insert',
              method: 'POST',
              params: add_notice.add_detail
            }).then(res => {
              if (res.code === 200) {
                ElMessage({type: 'success', message: '创建成功！！！'})
                renovate();
                is_show.value = false;
                is_show.value = true;
              } else {
                ElMessage({type: 'error', message: '创建失败！！！'})
                console.log(res)
              }

            })
          }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消',
        })
      })
    } else
      ElMessage({type: "error", message: '请填写必须项'})
  })
}

/**
 * @Description:获取所有公告
 * @author @Be_void
 * @date 2023/6/27
 */
const get_allNotice = () => {
  axios({
    url: '/announcement/getAllAnno',
    method: 'GET',
    params: {
      pageNum: pageNum.value,
      size: 7
    }
  }).then(res => {
    if (res.code === 200) {
      tableData = res.data.list;
      is_show.value = false;
      is_show.value = true
      keyNum.value++
      console.log(tableData)
    } else if (res.code === 204) {
      ElMessage({type: "warning", message: '这一页没有任何公告'})
      tableData = [];
      keyNum.value++
    } else if (res.code === 205)
      ElMessage.error(res.message)
    else {
      ElMessage({type: 'error', message: '读取公告失败'})
    }
  })
}


/**
 * @Description:分页
 * @author @Be_void
 * @date 2023/7/5
 */
const handleCurrentChange = (val) => {
  pageNum.value = val;
  get_allNotice();
  keyNum.value++;
  console.log(pageNum.value);
}

</script>

<style scoped>
.search_form {
  margin: 20px 0 10px 100px;
}

.btn_sty {
  background-color: rgb(25, 59, 147);
  color: white
}

.el-table, .el-table__expanded-cell {
//background-color:yellow; background-color: transparent;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}


#isShow_box {
  height: 100%;
  width: 100%;
  display: flex; /**/
  flex-direction: column;
  color: #0c3483;
  font-size: 20px;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-image: url('http://t13.baidu.com/it/u=928982679,1446371045&fm=224&app=112&f=JPEG?w=499&h=333');
}
</style>
