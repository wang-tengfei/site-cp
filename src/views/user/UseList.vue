<template>
  <div class="content">
    <div class="data-header">
      <el-form v-model="searchData" :rules="userRules" label-width="100px">
        <el-row>
          <el-col :span="7">
            <el-form-item label="用户名">
              <el-input v-model="searchData.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="状态">
              <el-select placeholder="请选择性别" v-model="searchData.status" style="width: 100%">
                <el-option label="全部"></el-option>
                <el-option label="正常" value="1"></el-option>
                <el-option label="禁用" value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="时间">
              <el-date-picker v-model="searchData.createTime" type="datetime"  placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button @click="searchUserData()" >搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="data-info">
      <el-table :data="tableData" v-loading="loading" border height="548px" size="small" stripe highlight-current-row>
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
        <el-table-column prop="age" label="年龄" ></el-table-column>
        <el-table-column prop="email" label="邮箱" min-width="120px"></el-table-column>
        <el-table-column prop="phoneNumber" label="手机号"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template  slot-scope="scope">
            <span v-if="scope.row.status === 1">正常</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="日期" :formatter="formatterDate"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100px">
          <template slot="header"  slot-scope="scope">
            <el-button @click="addUser()" >添加</el-button>
          </template>
          <template  slot-scope="scope">
            <el-button @click="editUser(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="deleteDate(scope.row)" type="text" size="small">删除</el-button>
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
    <el-dialog title="添加用户信息" class="dialog-title" :visible.sync="isShowAdd" width="700px">
      <add-user v-on:isShowAdd=addDialog :getTableData="getTableData"></add-user>
    </el-dialog>
    <!--编辑用户-->
    <el-dialog title="编辑用户信息" class="dialog-title" :visible.sync="isShowEdit" width="700px">
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
      }
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
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
      return this.getTableData(this.searchData)
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
    width: 1150px;
    margin: 0 auto;
  }
  .data-info {
    width: 1250px;
    margin: 0 auto;
  }
  .block {
    width: 100%;
    height: 80px;
    margin: 0 auto;
    padding-top: 10px;
  }
</style>
