<template>
    <div class="content">
      <div class="data-header role-header">
        <el-form v-model="searchData" label-width="100px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="用户名">
                <el-input v-model="searchData.roleName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="时间" align="left">
                <el-date-picker v-model="searchData.searchTime" type="datetimerange" :picker-options="pickerOptions"
                                range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-button @click="searchRoleData()" icon="el-icon-search" >搜索</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div class="data-info role-info">
      <el-table :data="tableData" border width="100%" size="small" fit stripe highlight-current-row>
        <el-table-column type="index" label="序号" min-width="50px"></el-table-column>
        <el-table-column prop="roleName" label="角色名称"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
        <el-table-column prop="createTime"  min-width="120px" label="创建日期" :formatter="formatterDate"></el-table-column>
        <el-table-column label="操作" width="240px" align="center">
          <template slot="header"  slot-scope="scope">
            <el-button @click="showAddRole()" type="primary" icon="el-icon-plus" >添加</el-button>
          </template>
          <template  slot-scope="scope">
            <el-button @click="showEditRole(scope.row)" icon="el-icon-edit" title="编辑" size="mini" round></el-button>
            <el-button @click="delRole(scope.row)" type="danger" icon="el-icon-delete" title="删除" size="mini" round></el-button>
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
      <!--add role dialog-->
      <el-dialog title="添加角色信息" class="dialog-title" :visible.sync="showAddDialog" width="700px" destroy-on-close>
        <el-form :model="addRoleData" ref="addRoleData" status-icon :rules="this.GLOBAL.userRules" label-width="100px">
          <el-form-item label="角色名" prop="roleName">
            <el-input v-model="addRoleData.roleName"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="">
            <el-input v-model="addRoleData.description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeAddDialog('addRoleData')">取 消</el-button>
          <el-button type="primary" @click="addRole('addRoleData')">确 定</el-button>
        </div>
      </el-dialog>
      <!--edit role dialog-->
      <el-dialog title="添加角色信息" class="dialog-title" :visible.sync="showEditDialog" width="700px" destroy-on-close>
        <el-form :model="editRoleData" ref="editRoleData" status-icon :rules="this.GLOBAL.userRules" label-width="100px">
          <el-form-item label="角色名" prop="roleName">
            <el-input v-model="editRoleData.roleName"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="">
            <el-input v-model="editRoleData.description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="closeEditDialog('editRoleData')">取 消</el-button>
          <el-button type="primary" @click="editRole('editRoleData')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'RoleList',
  created () {
    this.getTableData()
  },
  data () {
    return {
      searchData: {},
      tableData: [],
      showAddDialog: false,
      addRoleData: {
        roleName: '',
        description: ''
      },
      showEditDialog: false,
      editRoleData: {
        roleName: '',
        description: ''
      },
      pageIndex: 1,
      pageSize: 10,
      totalSize: 0,
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
      }
    }
  },
  methods: {
    searchRoleData () {
      let param = {}
      if (this.searchData.roleName) {
        Object.assign(param, {'roleName': this.searchData.roleName})
      }
      if (this.searchData.searchTime) {
        let startTime = parseInt(this.searchData.searchTime[0].getTime())
        let endTime = parseInt(this.searchData.searchTime[1].getTime())
        Object.assign(param, {'startTime': startTime, 'endTime': endTime})
      }
      this.getTableData(param)
    },
    getTableData (param) {
      let queryData = {page_index: this.pageIndex, page_size: this.pageSize}
      if (param) {
        Object.assign(queryData, param)
      }
      this.$axios.get('/vue/role/page', {params: queryData}).then(res => {
        let data = res.data
        if ((data.code === 200)) {
          this.tableData = data.result.list
          this.pageIndex = data.result.pageIndex
          this.pageSize = data.result.pageSize
          this.totalSize = data.result.total
        }
      })
    },
    formatterDate (row, column, cellValue) {
      return this.$moment(cellValue).format('YYYY-MM-DD hh:mm')
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条, 总条数 ${this.totalSize} `)
      this.pageSize = val
      this.getTableData()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pageIndex = val
      this.getTableData()
    },
    showAddRole () {
      this.showAddDialog = true
    },
    closeAddDialog () {
      this.showAddDialog = false
    },
    addRole (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/vue/role', this.addRoleData).then(response => {
            let data = response.data
            if (data.code === 200) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.closeAddDialog(formName)
              this.getTableData()
            } else {
              this.$message({
                type: 'error',
                message: '添加失败：' + data.msg
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    showEditRole (row) {
      this.showEditDialog = true
      this.editRoleData = row
    },
    closeEditDialog () {
      this.showEditDialog = false
    },
    editRole (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.put('/vue/role/' + this.editRoleData.roleId, this.editRoleData).then(response => {
            let data = response.data
            if (data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功!'
              })
              this.closeEditDialog(formName)
              this.getTableData()
            } else {
              this.$message({
                type: 'error',
                message: data.msg
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    delRole (row) {
      this.$confirm('确定删除角色 <span style="color: red">' + row.roleName + ' </span>吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        this.$axios.delete('/vue/role/' + row.roleId).then(response => {
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
    }
  }
}
</script>

<style scoped>
  @import '../../common/css/common.css';
  .el-table {
    margin: 0 auto;
  }
  .role-info {
    width: 70%;
  }
  .role-header {
    width: 70%;
  }
</style>
