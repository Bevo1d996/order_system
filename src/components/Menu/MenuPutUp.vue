<template>
  <div class="common-layout" style="height: 100%">
    <el-container style="height: 100%">
      <el-aside width="400px" style="height: 100%">
        <div style="height: 100%;background-color: rgb(246, 246, 246)">
          <!--          <el-avatar :src="img_url.img_url1" shape="square" size="large"></el-avatar>-->
          <el-image style="width: 100%; height: 100%;margin-bottom: 0 !important;" :src="img_url.img_url1"
                    :fit="'contain'"/>
          <div
              style="height: 75px;width: 100%; background: linear-gradient(to bottom, rgb(246, 246, 246),rgb( 236, 233, 218));margin-top: 0 !important;"></div>
          <el-image style="width: 100%; height: 100%; " :src="img_url.img_url2" :fit="'contain'"/>
        </div>
      </el-aside>
      <el-main style="background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)">
        <div style="color: #409EFF;font-size: 20px;font-weight: bold;margin-top: 20px">
          <el-icon>
            <Menu/>
          </el-icon>
          菜品上架
        </div>
        <div style="margin-top: 50px">
          <el-card
              style="box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;">

            <!--          表单-->
            <el-form
                ref="ruleFormRef"
                :model="form_data.dishData"
                :rules="form_data.rules"
                label-width="120px"
                class="demo-ruleForm"
                status-icon
            >
              <el-form-item label="菜品图片:  " prop="dishPicture" class="item">
                <el-upload
                    class="dl-avatar-uploader-min square"
                    action="http://43.143.49.11:9695/image/upload?type=1"
                    :show-file-list="false"
                    :on-success="handleUpImage"
                    :before-upload="beforeImageUpload"
                    list-type="picture"
                    accept="image/*"
                >
                  <el-image v-if="form_data.dishData.dishPicture" :src="form_data.dishData.dishPicture"
                            class="avatar"></el-image>
                  <el-icon v-else class="avatar-uploader-icon">
                    <Plus/>
                  </el-icon>
                  <template #tip>
                    <div class="el-upload__tip">只能上传图片,且单张图片大小不能超过10MB</div>
                  </template>
                </el-upload>
              </el-form-item>


              <el-form-item label="菜品名称:  " prop="dishName" class="item">
                <el-input v-model="form_data.dishData.dishName" placeholder="请输入菜品名称" style="width: 40%"/>
              </el-form-item>
              <el-form-item label="菜品类型:  " prop="dishType" class="item">
                <el-select v-model="form_data.dishData.dishType" class="m-2" placeholder="Select" size="default">
                  <el-option
                      v-for="item in all_dishType"
                      :label="item.typeName"
                      :key="form_data.keyNum"
                      :value="item.typeId"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="菜品单价:  " prop="dishPrice" style="width: 40%" class="item">
                <el-input v-model.number="form_data.dishData.dishPrice" placeholder="￥ /份"/>
              </el-form-item>
              <el-form-item label="菜品现价:  " style="width: 40%" class="item" prop="dishNowprice">
                <el-input v-model.number="form_data.dishData.dishNowprice" placeholder="￥ /份"/>
              </el-form-item>
              <el-form-item label="菜品简介:  " prop="dishIntroduction" style="width: 70%" class="item">
                <el-input
                    v-model="form_data.dishData.dishIntroduction"
                    :rows="3"
                    type="textarea"
                    placeholder="Please input"
                />
              </el-form-item>
            </el-form>
            <el-button @click="reset_put()" style="margin: 20px 0 0 80%">
              <el-icon>
                <Refresh/>
              </el-icon>
              重&nbsp&nbsp置
            </el-button>
            <el-button type="primary" @click="commit_put()" style="margin: 20px 0 0 30px">
              <el-icon>
                <Check/>
              </el-icon>
              上&nbsp&nbsp架
            </el-button>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import {Check, Menu, Plus, Refresh} from '@element-plus/icons-vue'
import {inject, onMounted, reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import axios from "@/utils/axiosInstance";
//data--- ---------------------------------------------------------------------------------------------------------

// 表单数据
const ruleFormRef = ref({})
const form_data = reactive({
  rules: {
    dishPicture: {required: true, message: "请选择菜品图片", trigger: "change"},
    dishNowprice: [{required: true, message: "请输入菜品单价", trigger: "change"}, {
      type: 'number',
      message: '单价请输入数字'
    }],
    dishName: {required: true, message: "请输入菜品名称", trigger: "change"},
    dishType: {required: true, message: "请选择菜品类型", trigger: "change"},
    dishPrice: [{required: true, message: "请输入菜品单价", trigger: "change"}, {
      type: 'number',
      message: '单价请输入数字'
    }],
    dishIntroduction: {required: true, message: "请输入菜品简介", trigger: "change"},
  },
  dishData: {
    dishId: '',
    dishName: "",
    dishPrice: '',
    dishNowprice: '',
    dishIntroduction: '',
    dishPicture: '',
    dishType: '',
    dishIsnew: '',
    dishIsdiscount: '',
    dishIssoldout: '',
    dishIsdeleted: '',
    dishHistorysalesvolume: '',
    dishMonthsalesvolume: '',
    dishCreatetime: ''
  },
  uploadUrl: '',
  keyNum: 1
})

const img_url = {
  img_url1: "https://ts1.cn.mm.bing.net/th/id/R-C.2f990d12d32f59c11d3846ffe4f38812?rik=rJ1ptOKuAMRkZg&riu=http%3a%2f%2fpic.616pic.com%2fys_bnew_img%2f00%2f37%2f17%2fj7e9geLInL.jpg&ehk=ti53xgsyY800Cx8igMCNnC3gkRlcae33WjfpC6Ir%2fdM%3d&risl=&pid=ImgRaw&r=0",
  img_url2: "https://bpic.588ku.com/back_pic/19/04/20/870169d45dcefe07f82624056640486b.jpg"
}

let all_dishType = ref([])

//function----------------------------------------------------------------------------------------------------------

const renovate = inject("reload");

onMounted(() => {
  get_dishType();
})

/**
 * @Description: 忽略ignoreLoopLimit()报错
 * @author @Be_void
 * @date 2023/6/27
 */
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  }
}

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
}


/**
 * @Description:上传图片
 * @author @Be_void
 * @date 2023/6/30
 */


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
    } else if (res.code === 205) {
      ElMessage.error(res.message)
    } else {
      ElMessage.error("获取分类失败!");
    }
  })
}


/**
 * @Description: 提交上架
 * @author @Be_void
 * @date 2023/6/26
 */
const commit_put = () => {
  //通过ref的值触发验证
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      ElMessageBox.confirm(
          '确认上架?',
          'Warning',
          {
            confirmButtonText: '确认',
            cancelButtonText: 'Cancel',
            type: 'warning',
          }
      ).then(() => {
        axios({
          url: '/dish/insert',
          method: 'POST',
          params: form_data.dishData
        }).then(res => {
          // console.log(res)
          if (res.code === 200) {
            console.log(form_data.dishData)
            ElMessage({type: 'success', message: '上架成功！！！！！'})
            renovate();
          } else
            ElMessage({type: 'error', message: '上架失败！！'})
        })
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: 'Delete canceled',
        })
      })
      // console.log("通过");
      // console.log(form_data.dishData)
    } else {
      console.log("未通过");
    }
  })
}


/**
 * @Description: 重置按钮
 * @author @Be_void
 * @date 2023/6/26
 */
const reset_put = () => {
  renovate();
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
  console.log("========__________")
  console.log(res)
  form_data.dishData.dishPicture = res.data;
}

</script>

<style scoped>
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

</style>
