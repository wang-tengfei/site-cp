<template>
  <div class="content">
    <div class="data-header">
      <el-form :rules="userRules" label-width="100px">
        <el-row>
          <el-col :span="7">
            <el-form-item label="用户名">
              <el-input v-model="name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="省份">
              <el-select v-model="province" style="width: 100%" placeholder="请选择省份">
                <el-option label="上海" value="上海"></el-option>
                <el-option label="北京" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="时间">
              <el-date-picker v-model="date" style="width: 100%" type="datetime"  placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button @click="searchUserData()" >搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="data-info">
      <el-table :data="tableData" v-loading="loading" border style="width: 100%" max-height="550" stripe highlight-current-row>
        <el-table-column fixed type="selection" label="" width="50"></el-table-column>
        <el-table-column fixed type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                {{ scope.row.name }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="province" label="省份" width="120"></el-table-column>
        <el-table-column prop="city" label="市区" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" width="300"></el-table-column>
        <el-table-column prop="zip" label="邮编" width="120"></el-table-column>
        <el-table-column prop="date" label="日期" width="150"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot="header" slot-scope="scope">
            <el-button @click="addUser()" >添加</el-button>
          </template>
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteDate(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
                       :page-sizes="[100, 200, 300, 400]" :page-size="100" :total="400"
                       layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
    <!--弹窗信息-->
    <el-dialog title="编辑用户信息" :visible.sync="isShowEdit" width="600">
      <div class="edit-info">
        <el-form v-model="editUserData" :rules="userRules" label-width="100px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="editUserData.name"></el-input>
          </el-form-item>
          <el-form-item label="省份" prop="province">
            <el-col :span="11">
              <el-select v-model="editUserData.province" style="width: 100%" placeholder="请选择省份">
                <el-option label="上海" value="上海"></el-option>
                <el-option label="北京" value="beijing"></el-option>
              </el-select>
            </el-col>
            <el-col :span="2">
              <span style="width: 100%">-</span>
            </el-col>
            <el-col :span="11">
              <el-select v-model="editUserData.city" style="width: 100%" placeholder="请选择区域">
                <el-option label="上海" value="上海"></el-option>
                <el-option label="北京" value="beijing"></el-option>
              </el-select>
            </el-col>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="editUserData.address"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="邮编" prop="zip">
                <el-input v-model="editUserData.zip"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="时间" prop="date">
                <el-date-picker v-model="editUserData.date" style="width: 100%" type="datetime"  placeholder="选择日期时间"></el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="isShowEdit = false">取 消</el-button>
    <el-button type="primary" @click="isShowEdit = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import EditUser from '@/views/user/EditUser'
export default {
  name: 'UserList',
  components: {EditUser},
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    onLoadedData () {
      this.loading = false
    },
    deleteDate (row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    handleClick (row) {
      this.editUserData = row
      this.isShowEdit = true
    }
  },
  data () {
    return {
      editUserData: '',
      date: '',
      name: '',
      province: '',
      isShowEdit: false,
      currentPage4: 4,
      loading: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1517 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1519 弄',
        zip: 200333
      }, {
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1516 弄',
        zip: 200333
      }],
      userRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      }
    }
  }
}
</script>
<style scoped>
  .content {
    width: 100%;
    padding: 0;
    margin: 0 auto;
  }
  .data-header {
    height: 80px;
    width: 1150px;
    margin: 0 auto;
  }
  .data-info {
    width: 1150px;
    margin: 0 auto;
  }
  .block {
    width: 100%;
    height: 80px;
    margin: 0 auto;
    padding-top: 10px;
  }
  .edit-info {
    width: 100%;
  }
</style>
