<template>
  <div style="background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);">
    <div>
      <div style="font-size: 20px;height:28px;font-weight: bold">
        餐厅员工信息
      </div>
      <!--      搜索表单-->
      <div style="margin: 30px 0 0 50px;display: flex;flex-direction: row">
        <el-form :inline="true" :model="search_input" class="demo-form-inline" style="width: 70%">
          <el-form-item label="姓名">
            <el-input v-model="search_input.employeeName" placeholder="eg:zhangsan" clearable/>
          </el-form-item>
          <el-form-item label="账户名">
            <el-input v-model="search_input.employeeUsername" placeholder="eg:zhangsan" clearable/>
          </el-form-item>
          <el-form-item label="职位">
            <el-select
                v-model="search_input.employeeType"
                placeholder="select">
              <el-option label="厨师" value="1"/>
              <el-option label="前台" value="2"/>
              <el-option label="服务员" value="3"/>
              <el-option label="超级管理员" value="4"/>
            </el-select>
          </el-form-item>
          <el-form-item label="入职时间：" style="margin-top: 10px">
            <el-date-picker
                v-model="search_input.employeeIntTimeStart"
                type="date"
                placeholder="start time"
                value-format="YYYY-MM-DD"
                clearable
            />
            <span class="text-gray-500">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp——&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</span>
            <el-date-picker
                value-format="YYYY-MM-DD"
                v-model="search_input.employeeIntTimeEnd"
                type="date"
                placeholder="end time"
                clearable
            />
          </el-form-item>
          <br>
          <el-form-item>
            <el-button @click="search_staffInfo" type="primary"
                       style="margin:20px 0 0 600px;">
              <el-icon>
                <Search/>
              </el-icon>
              &nbsp;搜索
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="info" style="margin-top: 20px;"
                       @click="reset_searchInput">
              <el-icon>
                <Refresh/>
              </el-icon>
              &nbsp;重置
            </el-button>
          </el-form-item>
        </el-form>
        <div>
          <el-tooltip
              style="cursor: pointer;"
              class="box-item"
              effect="dark"
              content="点击新增员工信息"
              placement="top-start"
              :visible.sync="isPopoverVisible"
          >
            <el-image src="https://img.icons8.com/ultraviolet/1600/add-user-group-woman-man.png" @click="addStaff"
                      style="width: 160px;cursor: pointer"></el-image>
          </el-tooltip>
        </div>
      </div>
    </div>

    <!--    表格员工信息-->
    <div style="margin-top: 2vw">
      <el-table :data="tableData" border style="width: 100%;height: 490px" :key="keyNum" :row-style="{height: '60px'}"
                :header-cell-style="{color:'rgb(25, 59, 147)',height: '70px'}">
        <el-table-column type="index" label="索引" width="80" align="center"/>
        <el-table-column prop="employeeJobNumber" label="工号" width="140" align="center"/>
        <el-table-column prop="employeeName" label="姓名" width="140" align="center"/>
        <el-table-column label="性别" width="120" align="center">
          <template v-slot="scope">
            <el-icon v-if="scope.row.employeeSex===1" style="color: #409EFF">
              <Male/>
            </el-icon>
            <el-icon v-if="scope.row.employeeSex===2" style="color: #409EFF">
              <Female/>
            </el-icon>
            <el-icon v-if="scope.row.employeeSex===0" style="color: #E6A23C">
              <InfoFilled/>
            </el-icon>
            &nbsp&nbsp{{ get_staffSex(scope.row.employeeSex) }}
          </template>
        </el-table-column>
        <el-table-column label="状态" width="120" align="center">
          <template v-slot="scope">
            <el-icon v-if="scope.row.employeeIsdeleted===0" style="color: #67C23A">
              <SuccessFilled/>
            </el-icon>
            <el-icon v-if="scope.row.employeeIsdeleted!==0" style="color: #E6A23C;">
              <WarningFilled/>
            </el-icon>
            {{ get_isDelete(scope.row.employeeIsdeleted) }}
          </template>
        </el-table-column>
        <el-table-column prop="employeeType" label="岗位" width="140" align="center">
          <template v-slot="scope">
            {{ get_typeName(scope.row.employeeType) }}
          </template>
        </el-table-column>
        <el-table-column prop="intimeString" label="入职时间" width="200" align="center"/>
        <el-table-column label="操作" align="center">
          <template v-slot="scope">
            <el-button round style="color: rgb(25, 59, 147)"
                       @click="edit_staffInfo(scope.row)">
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
              <el-input disabled v-model="scope.row.employeePassword"
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
                       @click="delete_staffInfo(scope.row.employeeId)">
              <el-icon>
                <Delete/>
              </el-icon>
              <span>删除</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--      分页条-->
      <div class="demo-pagination-block" style="top: 90%;position: absolute;bottom: 0;margin-bottom: 2% ">
        <el-pagination
            v-model:current-page="search_input.pageNum"
            v-model:page-size="search_input.size"
            layout="prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"

        />
      </div>
    </div>

    <!--    新增员工信息的抽屉-->
    <!--    <el-drawer-->
    <!--        style="background-color: #ECF9FF"-->
    <!--        v-if="drawer_data.drawerVisible"-->
    <!--        size="large"-->
    <!--        :key="keyNum"-->
    <!--        v-model="drawer_data.drawerVisible"-->
    <!--        direction="ttb"-->
    <!--    >-->
    <!--      <template #title>-->
    <!--        <span style="color: #409EFF;font-size: 20px;font-weight: bold"> <el-icon><UserFilled/></el-icon>&nbsp&nbsp添加新员工信息</span>-->
    <!--      </template>-->
    <!--      <div-->
    <!--          style="display: flex;flex-direction: row;background-color: rgba(0, 0, 0, 0)">-->
    <!--        <el-image src="https://img1.baidu.com/it/u=1919594461,1556164634&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500"-->
    <!--                  style="width: 300px"></el-image>-->
    <!--        <el-form-->
    <!--            style="width: 70%;margin:20px 0 0 150px"-->
    <!--            :inline="true"-->
    <!--            :model="drawer_data.newStaff_info"-->
    <!--            ref="ruleFormRef"-->
    <!--            label-width="120px"-->
    <!--            class="demo-ruleForm"-->
    <!--            status-icon-->
    <!--            :rules="drawer_data.rules"-->
    <!--        >-->
    <!--          <el-form-item label="员工姓名:" prop="employeeName" class="item">-->
    <!--            <el-input v-model="drawer_data.newStaff_info.employeeName" clearable></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="员工年龄:" prop="employeeAge" class="item">-->
    <!--            <el-input v-model.number="drawer_data.newStaff_info.employeeAge" clearable></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="员工性别:" prop="employeeSex" class="item">-->
    <!--            <el-select v-model="drawer_data.newStaff_info.employeeSex" class="m-2" placeholder="Select">-->
    <!--              <el-option-->
    <!--                  label="男"-->
    <!--                  value=1-->
    <!--              />-->
    <!--              <el-option-->
    <!--                  label="女"-->
    <!--                  value=2-->
    <!--              />-->
    <!--            </el-select>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="员工住址:" prop="employeeAddress" class="item">-->
    <!--            <el-input v-model.number="drawer_data.newStaff_info.employeeAddress" clearable></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="员工薪水/月:" prop="employeeSalary" class="item">-->
    <!--            <el-input v-model.number="drawer_data.newStaff_info.employeeSalary" clearable></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="员工邮箱:" prop="employeeEmail" class="item">-->
    <!--            <el-input v-model="drawer_data.newStaff_info.employeeEmail" clearable></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="员工账户名:" prop="employeeUsername" class="item">-->
    <!--            <el-input v-model="drawer_data.newStaff_info.employeeUsername" clearable></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="员工账户密码:" prop="employeePassword" class="item">-->
    <!--            <el-input show-password v-model="drawer_data.newStaff_info.employeePassword"></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="电话号码:" prop="employeeTel" class="item" clearable>-->
    <!--            <el-input v-model="drawer_data.newStaff_info.employeeTel"></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="岗位:" prop="employeeType" class="item">-->
    <!--            <el-select v-model="drawer_data.newStaff_info.employeeType" class="m-2" placeholder="Select">-->
    <!--              <el-option-->
    <!--                  label="厨师"-->
    <!--                  value=1-->
    <!--              />-->
    <!--              <el-option-->
    <!--                  label="前台"-->
    <!--                  value=2-->
    <!--              />-->
    <!--              <el-option-->
    <!--                  label="服务员"-->
    <!--                  value=3-->
    <!--              />-->
    <!--              <el-option-->
    <!--                  label="管理员"-->
    <!--                  value=4-->
    <!--              />-->
    <!--            </el-select>-->
    <!--          </el-form-item>-->
    <!--          <br>-->
    <!--          <el-form-item>-->
    <!--            <el-button size="large" @click="confirm_addStaff"-->
    <!--                       style="margin:0 0 0 850px;background-image: linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%);color: white ">-->
    <!--              <el-icon>-->
    <!--                <Plus/>-->
    <!--              </el-icon>-->
    <!--              &nbsp&nbsp提 交-->
    <!--            </el-button>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item>-->
    <!--            <el-button-->
    <!--                style="background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);color: rgb(25, 59, 147)"-->
    <!--                size="large" @click="reset_addStaff">-->
    <!--              <el-icon>-->
    <!--                <Refresh/>-->
    <!--              </el-icon>-->
    <!--              &nbsp&nbsp重 置-->
    <!--            </el-button>-->
    <!--          </el-form-item>-->
    <!--        </el-form>-->
    <!--      </div>-->
    <!--    </el-drawer>-->
    <el-dialog
        v-model="drawer_data.drawerVisible"
        title="新增员工信息"
        center
        :key="keyNum"
        v-if="drawer_data.drawerVisible"
        width="400px">
      <el-form
          style="width: 90%"
          :model="drawer_data.newStaff_info"
          ref="ruleFormRef"
          label-width="120px"
          class="demo-ruleForm"
          status-icon
          :rules="drawer_data.rules"
      >
        <el-form-item label="员工姓名:" prop="employeeName" class="item">
          <el-input v-model="drawer_data.newStaff_info.employeeName"></el-input>
        </el-form-item>
        <el-form-item label="员工年龄:" prop="employeeAge" class="item">
          <el-input v-model.number="drawer_data.newStaff_info.employeeAge"></el-input>
        </el-form-item>
        <el-form-item label="员工性别:" prop="employeeSex" class="item">
          <el-select v-model="drawer_data.newStaff_info.employeeSex" class="m-2" placeholder="Select">
            <el-option
                label="男"
                value=1
            />
            <el-option
                label="女"
                value=2
            />
          </el-select>
        </el-form-item>
        <el-form-item label="员工住址:" prop="employeeAddress" class="item">
          <el-input v-model.number="drawer_data.newStaff_info.employeeAddress"></el-input>
        </el-form-item>
        <el-form-item label="员工薪水/月:" prop="employeeSalary" class="item">
          <el-input v-model.number="drawer_data.newStaff_info.employeeSalary"></el-input>
        </el-form-item>
        <el-form-item label="员工邮箱:" prop="employeeEmail" class="item">
          <el-input v-model="drawer_data.newStaff_info.employeeEmail"></el-input>
        </el-form-item>
        <el-form-item label="员工账户名:" prop="employeeUsername" class="item">
          <el-input v-model="drawer_data.newStaff_info.employeeUsername"></el-input>
        </el-form-item>
        <el-form-item label="员工账户密码:" prop="employeePassword" class="item">
          <el-input show-password v-model="drawer_data.newStaff_info.employeePassword"></el-input>
        </el-form-item>
        <el-form-item label="电话号码:" prop="employeeTel" class="item">
          <el-input v-model="drawer_data.newStaff_info.employeeTel"></el-input>
        </el-form-item>
        <el-form-item label="岗位:" prop="employeeType" class="item">
          <el-select v-model="drawer_data.newStaff_info.employeeType" class="m-2" placeholder="Select">
            <el-option
                label="厨师"
                value=1
            />
            <el-option
                label="前台"
                value=2
            />
            <el-option
                label="服务员"
                value=3
            />
            <el-option
                label="管理员"
                value=4
            />
          </el-select>
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="large" @click="confirm_addStaff" type="primary" style=" color: white ">
            <el-icon>
              <Plus/>
            </el-icon>
            &nbsp&nbsp提 交
          </el-button>
          <el-button
              type="info"
              size="large" @click="reset_addStaff">
            <el-icon>
              <Refresh/>
            </el-icon>
            &nbsp&nbsp重 置
          </el-button>
        </span>
      </template>

    </el-dialog>

    <!--    修改员工信息的抽屉-->
    <!--    <el-drawer-->
    <!--        style="background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);"-->
    <!--        v-if="update_drawer.drawerVisible"-->
    <!--        size="large"-->
    <!--        :key="keyNum"-->
    <!--        v-model="update_drawer.drawerVisible"-->
    <!--        direction="ttb"-->
    <!--    >-->
    <!--      <template #title>-->
    <!--        <span style="color: #409EFF;font-size: 20px;font-weight: bold"> <el-icon><UserFilled/></el-icon>&nbsp&nbsp添加新员工信息</span>-->
    <!--      </template>-->
    <!--      <div-->
    <!--          style="display: flex;flex-direction: row;background-image: linear-gradient(to top, #fff1eb 0%, #ace0f9 100%);">-->
    <!--        <el-image src="https://img1.baidu.com/it/u=1919594461,1556164634&fm=253&fmt=auto&app=138&f=PNG?w=500&h=500"-->
    <!--                  style="width: 300px"></el-image>-->
    <!--        <el-form-->
    <!--            style="width: 70%;margin:20px 0 0 150px"-->
    <!--            :inline="true"-->
    <!--            :model="update_drawer.update_info"-->
    <!--            ref="ruleFormRef"-->
    <!--            label-width="120px"-->
    <!--            class="demo-ruleForm"-->
    <!--            status-icon-->
    <!--            :rules="update_drawer.rules"-->
    <!--        >-->
    <!--          <el-form-item label="员工姓名:" prop="employeeName" class="item">-->
    <!--            <el-input v-model="update_drawer.update_info.employeeName" clearable></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="员工年龄:" prop="employeeAge" class="item">-->
    <!--            <el-input v-model.number="update_drawer.update_info.employeeAge" clearable></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="员工性别:" prop="employeeSex" class="item">-->
    <!--            <el-select v-model="update_drawer.update_info.employeeSex" class="m-2" placeholder="Select">-->
    <!--              <el-option-->
    <!--                  label="男"-->
    <!--                  value=1-->
    <!--              />-->
    <!--              <el-option-->
    <!--                  label="女"-->
    <!--                  value=2-->
    <!--              />-->
    <!--            </el-select>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="员工住址:" prop="employeeAddress" class="item">-->
    <!--            <el-input v-model.number="update_drawer.update_info.employeeAddress" clearable></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="员工薪水/月:" prop="employeeSalary" class="item">-->
    <!--            <el-input v-model.number="update_drawer.update_info.employeeSalary" clearable></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="员工邮箱:" prop="employeeEmail" class="item">-->
    <!--            <el-input v-model="update_drawer.update_info.employeeEmail" clearable></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="员工账户名:" prop="employeeUsername" class="item">-->
    <!--            <el-input v-model="update_drawer.update_info.employeeUsername" clearable></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="员工账户密码:" prop="employeePassword" class="item">-->
    <!--            <el-input show-password v-model="update_drawer.update_info.employeePassword" clearable></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="电话号码:" prop="employeeTel" class="item">-->
    <!--            <el-input v-model="update_drawer.update_info.employeeTel" clearable></el-input>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="岗位:" prop="employeeType" class="item">-->
    <!--            <el-select v-model="update_drawer.update_info.employeeType" class="m-2" placeholder="Select">-->
    <!--              <el-option-->
    <!--                  label="厨师"-->
    <!--                  value=1-->
    <!--              />-->
    <!--              <el-option-->
    <!--                  label="前台"-->
    <!--                  value=2-->
    <!--              />-->
    <!--              <el-option-->
    <!--                  label="服务员"-->
    <!--                  value=3-->
    <!--              />-->
    <!--              <el-option-->
    <!--                  label="管理员"-->
    <!--                  value=4-->
    <!--              />-->
    <!--            </el-select>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item label="离职时间:" prop="outtimeString" class="item">-->
    <!--            <div v-if="update_drawer.update_info.outtimeString===null">-->
    <!--              <el-icon style="color: #67C23A">-->
    <!--                <SuccessFilled/>-->
    <!--              </el-icon>-->
    <!--              在职中-->
    <!--            </div>-->
    <!--            <el-input v-if="update_drawer.update_info.outtimeString!==null"-->
    <!--                      v-model="update_drawer.update_info.outtimeString" disabled></el-input>-->
    <!--          </el-form-item>-->
    <!--          <br>-->
    <!--          <el-form-item>-->
    <!--            <el-button size="large" @click="confirm_updateStaff"-->
    <!--                       style="margin:0 0 0 850px;background-image: linear-gradient(-225deg, #231557 0%, #44107A 29%, #FF1361 67%, #FFF800 100%);color: white ">-->
    <!--              <el-icon>-->
    <!--                <Plus/>-->
    <!--              </el-icon>-->
    <!--              &nbsp&nbsp提 交-->
    <!--            </el-button>-->
    <!--          </el-form-item>-->
    <!--          <el-form-item>-->
    <!--            <el-button-->
    <!--                style="background-image: linear-gradient(-225deg, #FFFEFF 0%, #D7FFFE 100%);color: rgb(25, 59, 147)"-->
    <!--                size="large" @click="()=>{update_drawer.drawerVisible=false;renovate()}">-->
    <!--              <el-icon>-->
    <!--                <Close/>-->
    <!--              </el-icon>-->
    <!--              &nbsp&nbsp取 消-->
    <!--            </el-button>-->
    <!--          </el-form-item>-->
    <!--        </el-form>-->
    <!--      </div>-->
    <!--    </el-drawer>-->
    <el-dialog
        v-model="update_drawer.drawerVisible"
        center
        :key="keyNum"
        v-if="update_drawer.drawerVisible"
        draggable
        width="450px">
      <template #title>新增员工信息</template>
      <el-form
          style="width: 90%"
          :inline="true"
          :model="update_drawer.update_info"
          ref="ruleFormRef"
          label-width="140px"
          class="demo-ruleForm"
          status-icon
          :rules="update_drawer.rules"
      >
        <el-form-item label="员工姓名:" prop="employeeName" class="item">
          <el-input v-model="update_drawer.update_info.employeeName"></el-input>
        </el-form-item>
        <el-form-item label="员工年龄:" prop="employeeAge" class="item">
          <el-input v-model.number="update_drawer.update_info.employeeAge"></el-input>
        </el-form-item>
        <el-form-item label="员工性别:" prop="employeeSex" class="item">
          <el-select v-model="update_drawer.update_info.employeeSex" class="m-2" placeholder="Select">
            <el-option
                label="男"
                value=1
            />
            <el-option
                label="女"
                value=2
            />
          </el-select>
        </el-form-item>
        <el-form-item label="员工住址:" prop="employeeAddress" class="item">
          <el-input v-model.number="update_drawer.update_info.employeeAddress"></el-input>
        </el-form-item>
        <el-form-item label="员工薪水/月:" prop="employeeSalary" class="item">
          <el-input v-model.number="update_drawer.update_info.employeeSalary"></el-input>
        </el-form-item>
        <el-form-item label="员工邮箱:" prop="employeeEmail" class="item">
          <el-input v-model="update_drawer.update_info.employeeEmail"></el-input>
        </el-form-item>
        <el-form-item label="员工账户名:" prop="employeeUsername" class="item">
          <el-input v-model="update_drawer.update_info.employeeUsername"></el-input>
        </el-form-item>
        <el-form-item label="员工账户密码:" prop="employeePassword" class="item">
          <el-input show-password v-model="update_drawer.update_info.employeePassword"></el-input>
        </el-form-item>
        <el-form-item label="电话号码:" prop="employeeTel" class="item">
          <el-input v-model="update_drawer.update_info.employeeTel"></el-input>
        </el-form-item>
        <el-form-item label="岗位:" prop="employeeType" class="item">
          <el-select v-model="update_drawer.update_info.employeeType" class="m-2" placeholder="Select">
            <el-option
                label="厨师"
                value=1
            />
            <el-option
                label="前台"
                value=2
            />
            <el-option
                label="服务员"
                value=3
            />
            <el-option
                label="管理员"
                value=4
            />
          </el-select>
        </el-form-item>
        <el-form-item label="离职时间:" prop="outtimeString" class="item">
          <div v-if="update_drawer.update_info.outtimeString===null">
            <el-icon style="color: #67C23A">
              <SuccessFilled/>
            </el-icon>
            在职中
          </div>
          <el-input v-if="update_drawer.update_info.outtimeString!==null"
                    v-model="update_drawer.update_info.outtimeString" disabled></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="large" @click="confirm_updateStaff"
                     style="color: white " type="primary">
            <el-icon>
              <Plus/>
            </el-icon>
            &nbsp&nbsp提 交
          </el-button>
          <el-button
              type="info"
              size="large" @click="()=>{update_drawer.drawerVisible=false;renovate()}">
            <el-icon>
              <Close/>
            </el-icon>
            &nbsp&nbsp取 消
          </el-button>
        </span>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import {
  Close,
  Delete,
  EditPen,
  Female,
  InfoFilled,
  Lock,
  Male,
  Plus,
  Refresh,
  Search,
  SuccessFilled,
  WarningFilled
} from "@element-plus/icons-vue";
import {inject, onMounted, reactive, ref} from "vue";
import axios from "@/utils/axiosInstance";
import {ElInput, ElMessage, ElMessageBox} from "element-plus";

//data------------------------------------------------------------------------------------------------------------------
/**
 * @Description:自定义表单验证邮箱和手机
 * @author @Be_void
 * @date 2023/7/1
 */
const checkEmail = (rule, value, cb) => {
  //验证邮箱的正则表达式
  const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (regEmail.test(value)) {
    //合法的邮箱
    return cb();
  }
  cb(new Error("请输入合法的邮箱"));
};
const checkTel = (rule, value, cb) => {
  const reg = /^1[3-9]\d{9}$/;
  if (reg.test(value)) {
    return cb();
  }
  cb(new Error("请输入合法手机号"));
}

const search_input = reactive({
  employeeName: "",
  employeeUsername: "",
  employeeIntTimeEnd: "",
  employeeIntTimeStart: "",
  employeeIsdeleted: '',
  employeeType: '',
  pageNum: 1,
  size: 7
})

const ruleFormRef = ref({})

const drawer_data = reactive({
  drawerVisible: false,
  newStaff_info: {
    employeeAddress: '', employeeAge: '', employeeEmail: '', employeeName: '', employeePassword: '',
    employeeSalary: '', employeeSex: '', employeeTel: '', employeeUsername: '', employeeType: ''
  },
  rules: {
    employeeAge: [{required: true, message: "请输入员工年龄", trigger: "blur"}, {
      type: 'number',
      message: 'age must be a number'
    }],
    employeeName: {required: true, message: "请输入员工姓名", trigger: "blur"},
    employeeEmail: [{required: true, message: "请输入邮箱", trigger: "blur"},
      {
        validator: checkEmail,
        min: 9,
        max: 18,
        message: "邮箱格式错误",
        trigger: "blur",
      }],
    employeeTel: [{required: true, message: "请输入手机号", trigger: "blur"},
      {
        validator: checkTel,
        message: "手机格式错误",
        trigger: "blur",
      }],
    employeeUsername: {required: true, message: "请输入员工账户用户名", trigger: "blur"},
    employeePassword: {required: true, message: "请输入员工账户密码", trigger: "blur"},
    employeeType: {required: true, message: "请选择员工所在的岗位", trigger: "blur"},
    employeeAddress: {required: true, message: "请输入员工住址", trigger: "blur"},
    employeeSalary: {required: true, message: "请输入员工每月的薪水", trigger: "blur"},
  }
})

const update_drawer = reactive({
  drawerVisible: false,
  update_info: {
    employeeAddress: '', employeeAge: '', employeeEmail: '', employeeName: '', employeePassword: '',
    employeeSalary: '', employeeSex: '', employeeTel: '', employeeUsername: '', employeeType: ''
  },
  rules: {
    employeeAge: [{required: true, message: "请输入员工年龄", trigger: "blur"}, {
      type: 'number',
      message: 'age must be a number'
    }],
    employeeName: {required: true, message: "请输入员工姓名", trigger: "blur"},
    employeeEmail: [{required: true, message: "请输入邮箱", trigger: "blur"},
      {
        validator: checkEmail,
        min: 9,
        max: 18,
        message: "邮箱格式错误",
        trigger: "blur",
      }],
    employeeTel: [{required: true, message: "请输入手机号", trigger: "blur"},
      {
        validator: checkTel,
        message: "手机格式错误",
        trigger: "blur",
      }],
    employeeUsername: {required: true, message: "请输入员工账户用户名", trigger: "blur"},
    employeePassword: {required: true, message: "请输入员工账户密码", trigger: "blur"},
    employeeType: {required: true, message: "请选择员工所在的岗位", trigger: "blur"},
    employeeAddress: {required: true, message: "请输入员工住址", trigger: "blur"},
    employeeSalary: {required: true, message: "请输入员工每月的薪水", trigger: "blur"},
  }
})

let keyNum = ref(0)

const isPopoverVisible = ref(true)

let total = 1

let tableData = reactive([])


// functions------------------------------------------------------------------------------------------------------------
/**
 * @Description:刷新页面
 * @author @Be_void
 * @date 2023/7/1
 */
const renovate = inject("reload");

onMounted(() => {
  get_staffsInfo();
})

/**
 * @Description:根据条件搜索员工信息
 * @author @Be_void
 * @date 2023/7/1
 */
const search_staffInfo = () => {
  get_staffsInfo();
}


/**
 * @Description:重置搜索条件和搜索结果
 * @author @Be_void
 * @date 2023/7/1
 */
const reset_searchInput = () => {
  renovate();
}


/**
 * @Description:更改页面
 * @author @Be_void
 * @date 2023/7/1
 */
const handleCurrentChange = (val) => {
  search_input.pageNum = val;
  get_staffsInfo();
}

/**
 * @Description:填写完表单确认增加员工信息按钮
 * @author @Be_void
 * @date 2023/7/1
 */
const confirm_addStaff = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      //通过
      ElMessageBox.confirm(
          "确认提交?",
          'Warning',
          {
            confirmButtonText: '确认提交',
            cancelButtonText: '取消',
            type: 'warning',
          }
      )
          .then(() => {
            // console.log(drawer_data.newStaff_info)
            axios({
              url: '/employee/addEmployee',
              method: 'POST',
              params: drawer_data.newStaff_info
            }).then(res => {
              if (res.code === 200) {
                ElMessage({type: 'success', message: '成功添加新员工！！'});
                renovate();
              } else
                ElMessage({type: 'error', message: '添加失败！'})
            })
          }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消',
        })
      })
    } else {
      ElMessage({type: 'error', message: '请填写必填项！！！'});
    }
  })
}

/**
 * @Description:重置填写的表单内容
 * @author @Be_void
 * @date 2023/7/1
 */
const reset_addStaff = () => {
  drawer_data.newStaff_info.employeeAddress = '';
  drawer_data.newStaff_info.employeeAge = '';
  drawer_data.newStaff_info.employeeEmail = '';
  drawer_data.newStaff_info.employeeName = '';
  drawer_data.newStaff_info.employeePassword = '';
  drawer_data.newStaff_info.employeeSalary = '';
  drawer_data.newStaff_info.employeeSex = '';
  drawer_data.newStaff_info.employeeTel = '';
  drawer_data.newStaff_info.employeeUsername = '';
  drawer_data.newStaff_info.employeeType = '';
  drawer_data.drawerVisible = false;
  drawer_data.drawerVisible = true;
  keyNum.value++
}

/**
 * @Description:新增员工信息
 * @author @Be_void
 * @date 2023/6/30
 */
const addStaff = () => {
  drawer_data.drawerVisible = true
}


/**
 * @Description:修改员工按钮
 * @author @Be_void
 * @date 2023/7/1
 */
const edit_staffInfo = (item) => {
  update_drawer.drawerVisible = true;
  update_drawer.update_info = item
  console.log(update_drawer.update_info)
}


/**
 * @Description:提交修改员工的信息
 * @author @Be_void
 * @date 2023/7/1
 */
const confirm_updateStaff = () => {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      //通过
      ElMessageBox.confirm(
          "确认修改?",
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
              url: '/employee/update',
              method: 'POST',
              params: update_drawer.update_info
            }).then(res => {
              if (res.code === 200) {
                ElMessage({type: 'success', message: '修改成功！！！'})
                renovate();
              } else
                ElMessage({type: 'error', message: '修改失败！！！'})
            })
          }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消',
        })
      })
    } else {
      //未通过
    }
  })
}


/**
 * @Description:删除员工信息
 * @author @Be_void
 * @date 2023/7/1
 */
const delete_staffInfo = (id) => {
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
        axios({
          url: 'employee/delete/' + id,
          method: 'POST'
        }).then(res => {
          if (res.code === 200) {
            ElMessage({type: 'success', message: '删除成功！！！'});
            renovate();
          } else if (res.code === 204)
            ElMessage({type: 'warning', message: '员工已离职'})
          else
            ElMessage({type: 'error', message: '删除失败！！！'});
        })
      }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消',
    })
  })
}


/**
 * @Description:获取所有员工信息
 * @author @Be_void
 * @date 2023/6/30
 */
const get_staffsInfo = () => {
  axios({
    url: '/employee/search',
    method: 'GET',
    params: search_input
  }).then(res => {
    // console.log(res)
    if (res.code === 200) {
      tableData = res.data.list;
      total = res.data.total;
      console.log(tableData)
      keyNum.value++;
    } else if (res.code === 205) {
      ElMessage({type: 'error', message: res.message})
      console.log(res)
    } else
      ElMessage({type: 'error', message: '请求数据失败！！'})
  })
}

/**
 * @Description:获取员工职位名称性别
 * @author @Be_void
 * @date 2023/6/30
 */
const get_typeName = (index) => {
  if (index === 1)
    return "厨师"
  else if (index === 2)
    return "前台"
  else if (index === 3)
    return "服务员"
  else if (index === 4)
    return "超级管理员"
  else
    return "普通管理员"
}
const get_staffSex = (index) => {
  if (index === 2)
    return "女";
  else if (index === 1)
    return "男";
  else
    return "未填写"
}

/**
 * @Description:是否离职就职状态
 * @author @Be_void
 * @date 2023/6/30
 */
const get_isDelete = (status) => {
  if (status === 0)
    return "在职";
  else
    return "离职";
}


</script>

<style>

.input {
  border: 0;
  border-bottom: 1px solid #909399;
  outline: 0;
  text-align: center;
  width: 100px;
  font-size: 16px;
  background-color: #E6E8EB;
}

.item .el-form-item__label {
  font-weight: bold;
}

</style>
