<template>
  <div class="content">
    <div class="data-header">
      <el-form v-model="searchData" label-width="100px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="用户名">
              <!--<el-input v-model="searchData.username"></el-input>-->
              <el-autocomplete v-model="userName" :fetch-suggestions="querySearch" @select="handleSelect"></el-autocomplete>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="状态">
              <el-select placeholder="请选状态" v-model="searchData.status" clearable style="width: 100%">
                <el-option label="全部" value=""></el-option>
                <el-option label="正常" value="1"></el-option>
                <el-option label="禁用" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="时间" align="left">
              <el-date-picker v-model="searchTime" type="datetimerange" :picker-options="pickerOptions" @blur="getTableTime"
                              range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="1">
            <el-button @click="searchUserData()" icon="el-icon-search" >搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="data-info">
      <el-table :data="tableData" v-loading="loading" border height="509px" size="small" fit stripe highlight-current-row>
        <el-table-column type="selection" label=""></el-table-column>
        <el-table-column type="index" label="序号" min-width="50px"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.userName }}</p>
              <p>邮箱: {{ scope.row.email }}</p>
              <p>手机号: {{ scope.row.phoneNumber }}</p>
              <div slot="reference" class="name-wrapper">
                {{ scope.row.userName }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="nickName" label="昵称" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="120px"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号"></el-table-column>
        <el-table-column prop="address" label="地址" ></el-table-column>
        <el-table-column prop="status" label="状态">
          <template  slot-scope="scope">
            <span v-if="scope.row.status === 1">正常</span>
            <span v-if="scope.row.status === 2">禁用</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="日期" :formatter="formatterDate"></el-table-column>
        <el-table-column label="操作" width="180px" align="center">
          <template slot="header"  slot-scope="scope">
            <el-button @click="addUser()" type="primary" icon="el-icon-plus" >添加</el-button>
          </template>
          <template  slot-scope="scope">
            <template v-if="scope.row.status === 1">
              <el-button @click="changeStatus(scope.row, scope.row.status)"  type="warning" icon="el-icon-lock" title="禁用" size="mini" round></el-button>
            </template>
            <template v-if="scope.row.status === 2">
              <el-button @click="changeStatus(scope.row, scope.row.status)"  type="primary" icon="el-icon-unlock" title="启用" size="mini" round></el-button>
            </template>
            <el-button @click="editUser(scope.row)" icon="el-icon-edit" title="编辑" size="mini" round></el-button>
            <el-button @click="deleteDate(scope.row)" type="danger" icon="el-icon-delete" title="删除" size="mini" round></el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex"
                       :page-sizes="[10, 20, 50]" :page-size="pageSize" :total="totalSize"
                       layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
    <!--添加用户-->
    <el-dialog title="添加用户信息" class="dialog-title" :visible.sync="isShowAdd" width="700px" destroy-on-close>
      <add-user v-on:isShowAdd=addDialog :getTableData="getTableData"></add-user>
    </el-dialog>
    <!--编辑用户-->
    <el-dialog title="编辑用户信息" class="dialog-title" :visible.sync="isShowEdit" width="700px" destroy-on-close>
      <edit-user v-on:isShowEdit=editDialog v-bind:editUserData="editUserData" :getTableData="getTableData"></edit-user>
    </el-dialog>
  </div>
</template>

<script>
import EditUser from '@/views/user/EditUser'
import AddUser from '@/views/user/AddUser'
export default {
  name: 'UserList',
  components: {
    'add-user': AddUser,
    'edit-user': EditUser
  },
  data () {
    return {
      editUserData: '',
      searchData: {},
      searchTime: null,
      userName: '',
      province: '',
      isShowAdd: false,
      isShowEdit: false,
      loading: true,
      tableData: [],
      pageIndex: 1,
      pageSize: 10,
      totalSize: 0,
      userRules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        province: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ]
      },
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      restaurants: [
        { 'value': '三全鲜食（北新泾店）', 'address': '长宁区新渔路144号' },
        { 'value': 'Hot honey 首尔炸鸡（仙霞路）', 'address': '上海市长宁区淞虹路661号' },
        { 'value': '新旺角茶餐厅', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { 'value': '泷千家(天山西路店)', 'address': '天山西路438号' },
        { 'value': '胖仙女纸杯蛋糕（上海凌空店）', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
        { 'value': '贡茶', 'address': '上海市长宁区金钟路633号' },
        { 'value': '南拳妈妈龙虾盖浇饭', 'address': '普陀区金沙江路1699号鑫乐惠美食广场A13' }
      ]
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    querySearch (queryString, cb) {
      this.$axios.get('/vue/user/username').then(res => {
        var restaurants = res.data.result
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
        // 调用 callback 返回建议列表的数据
        cb(results)
      })
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect () {
      console.log('')
    },
    getTableTime () {
      console.log('search time ' + this.searchTime)
    },
    formatterDate (row, column, cellValue) {
      return this.$moment(cellValue).format('YYYY-MM-DD hh:mm')
    },
    getTableData (searchCondition) {
      this.queryData = {page_index: this.pageIndex, page_size: this.pageSize}
      if (searchCondition != null) {
        Object.assign(this.queryData, searchCondition)
      }
      this.$axios.get('/vue/users-page', {params: this.queryData}).then(response => {
        const data = response.data
        if (data.code === 200) {
          this.tableData = data.result.list
          this.pageIndex = data.result.pageIndex
          this.pageSize = data.result.pageSize
          this.totalSize = data.result.total
          this.loading = false
        }
      })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getTableData()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageIndex = val
      this.getTableData()
    },
    searchUserData () {
      if (!this.searchTime && this.searchData['startTime']) {
        delete this.searchData['startTime']
        delete this.searchData['endTime']
      } else if (this.searchTime) {
        let startTime = parseInt(this.searchTime[0].getTime())
        let endTime = parseInt(this.searchTime[1].getTime())
        Object.assign(this.searchData, {'startTime': startTime, 'endTime': endTime})
      }
      if (!this.userName && this.searchData['username']) {
        delete this.searchData['username']
      } else if (this.userName) {
        Object.assign(this.searchData, {'username': this.userName})
      }
      return this.getTableData(this.searchData)
    },
    changeStatus (row, status) {
      let str = 'disable'
      let str2 = '禁用'
      if (status === 2) {
        str = 'enable'
        str2 = '启用'
      }
      this.$confirm('确定' + str2 + ' <span style="color: red">' + row.userName + ' </span>吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        this.$axios.post('/vue/user/' + str + '/' + row.id).then(response => {
          let data = response.data
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.getTableData()
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    deleteDate (row) {
      this.$confirm('确定删除用户 <span style="color: red">' + row.userName + ' </span>吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        this.$axios.delete('/vue/user/' + row.id).then(response => {
          let data = response.data
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getTableData()
          } else {
            this.$message({
              type: 'error',
              message: '删除失败：' + data.msg
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editUser (row) {
      this.editUserData = row
      this.isShowEdit = true
    },
    addUser () {
      this.isShowAdd = true
    },
    editDialog (e) {
      console.log(e)
      this.isShowEdit = e
    },
    addDialog (e) {
      console.log(e)
      this.isShowAdd = e
    }
  }
}
</script>
<style scoped>
  @import '../../common/css/common.css';
  .content {
    width: 100%;
    padding: 0;
    margin: 0 auto;
  }
  .data-header {
    height: 50px;
    width: 90%;
    margin: 0 auto;
  }
  .data-info {
    width: 90%;
    margin: 0 auto;
  }
  .block {
    width: 100%;
    height: 80px;
    margin: 0 auto;
    padding-top: 10px;
  }
</style>
