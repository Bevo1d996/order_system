<template>
  <div>
    <div style="margin: 0 0 20px 0;font-size: 20px;font-weight: bold">
      <el-icon>
        <Setting/>
      </el-icon>
      用户反馈
    </div>

    <div>
      <el-row>
        <el-col :span="12">
          <div id="comment_proportion" style="height: 30vh;width: 30vw;"></div>
        </el-col>
        <el-col :span="12">
          <div id="comment_sort" style="height: 30vh;width: 40vw"></div>
        </el-col>
      </el-row>
    </div>

    <div style="background-color: white">
      <el-table
          :data="tableData.comment_detail"
          style="width: 88vw;height: 460px;margin-top: 2vh"
          :key="table_key"
          row-style="84px"
          header-row-style="40px"
      >
        <el-table-column type="selection" width="55" align="center"/>
        <el-table-column type="index" label="索引" width="55" align="center"/>
        <el-table-column label="菜品图片" width="180" property="dishIdToPicture" align="center">
          <template #default="scope">
            <el-avatar :src=" scope.row.dishIdToPicture" shape="square" :size="60"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column property="dishIdToName" label="菜品名称" width="120" align="center"/>
        <el-table-column property="username" label="用户名" width="80" align="center"/>
        <el-table-column property="intimeString" label="评论时间(新->旧)" width="200" align="center"/>
        <el-table-column property="rate" label="评分" width="260" align="center">
          <el-rate
              v-model="rate_value"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value} points"
          />
        </el-table-column>
        <el-table-column property="commentContent" label="评论内容" show-overflow-tooltip width="360" align="center"/>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button round type="danger"
                       @click="delete_comment(scope.row.commentId)">
              <el-icon>
                <Delete/>
              </el-icon>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="height: 30px;">
        <el-divider style="background-color: #0c3483" content-position="left">共{{ tableData.comment_detail.length }}条数据
        </el-divider>
      </div>
    </div>
  </div>
</template>


<script setup>

import axios from "@/utils/axiosInstance";
import {inject, onMounted, reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {Delete, Setting} from "@element-plus/icons-vue";
import * as echarts from "echarts";


const rate_value = 3.7
let table_key = ref(0)
let dish_key = ref(false)
let tableData = reactive({
  comment_detail: [],
  comment_dish: [{dishPicture: '', dishName: ''},]
})

onMounted(() => {
  get_allComments();
  initComment_proportion();
  initComment_sort();
})

const renovate = inject("reload");


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
      tableData.comment_detail = res.data
      table_key.value++
    } else if (res.code === 205)
      ElMessage.error(res.message)
    else
      ElMessage.error("数据请求失败！")
  })
}


/**
 * @Description:查看某菜品的评论
 * @author @Be_void
 * @date 2023/7/6
 */
const get_commentById = (id) => {
  axios({
    url: '/comment/getComment',
    method: 'POST',
    params: {
      dishId: id
    }
  }).then(res => {
    if (res.code === 200) {
      console.log(res)
    } else if (res.code === 204)
      ElMessage({type: 'warning', message: '这个菜品暂无评论'})
    else
      ElMessage({type: 'error', message: '请求数据失败'})
  })
}


/**
 * @Description:删除评论
 * @author @Be_void
 * @date 2023/7/6
 */
const delete_comment = (id) => {
  ElMessageBox.confirm(
      "确认删除此评论?",
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
          url: '/comment/deleteComment',
          method: 'POST',
          params: {
            id: id
          }
        }).then(res => {
          // console.log()
          if (res.code === 200) {
            ElMessage({type: 'success', message: '删除评论成功！'})
            renovate();
          } else
            ElMessage({type: 'error', message: '删除失败！'})
        })
      }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消',
    })
  })
}


const initComment_proportion = () => {
  let comment_proportion = echarts.init(document.getElementById("comment_proportion"));
  let option = {
    title: {
      text: '三种评价占比情况',
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
        radius: '50%',
        data: [
          {
            value: 1048, name: '好评', itemStyle: {
              color: '#67C23A'
            },
          },
          {
            value: 300, name: '中评', itemStyle: {
              color: '#E6A23C'
            },
          },
          {
            value: 50, name: '差评', itemStyle: {
              color: ' rgb(255, 70, 131)'
            },
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  comment_proportion.setOption(option);
}

const initComment_sort = () => {
  let comment_sort = echarts.init(document.getElementById("comment_sort"));


  let option = {
    title: {
      text: '各商品类型评论情况',
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
      data: ['炒菜热菜', '凉菜卤菜', '面点小吃', '烧烤系列', '汤菜系列', '酒水饮料', '水果拼盘'],
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: [
      {
        type: 'value',
        position: 'left',
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
        data: [500, 450, 345, 750, 443, 700, 365],
        name: '好评',
        type: 'bar',
        itemStyle: {
          color: '#67C23A'
        },
      },
      {
        data: [300, 250, 153, 333, 311, 140, 155],
        name: '中评',
        type: 'bar',
        itemStyle: {
          color: '#409EFF'
        },
      },
      {
        data: [50, 50, 53, 33, 31, 40, 55],
        name: '差评',
        type: 'bar',
        itemStyle: {
          color: ' rgb(255, 70, 131)'
        },
      }
    ]
  };
  comment_sort.setOption(option);
}


</script>

<style scoped>
.card_sty {
  height: 700px;
  background-color: white;
  border-radius: 15px;
}


</style>
