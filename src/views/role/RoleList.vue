<template>
    <div class="content">
      <div class="data-info">
        <el-table :data="tableData" border height="509px" size="small" fit stripe highlight-current-row>
          <el-table-column type="index" label="序号" min-width="50px"></el-table-column>
          <el-table-column prop="roleName" label="角色名称" width="120"></el-table-column>
          <el-table-column prop="description" label="描述" width="120"></el-table-column>
          <el-table-column prop="createTime"  width="120px" label="创建日期" :formatter="formatterDate"></el-table-column>
          <el-table-column label="操作" width="240px" align="center">
            <template slot="header"  slot-scope="scope">
              <el-button @click="showAddRole()" type="primary" icon="el-icon-plus" >添加</el-button>
            </template>
            <template  slot-scope="scope">
              <el-button @click="showEditRole(scope.row)" icon="el-icon-edit" title="编辑" size="mini" round></el-button>
              <el-button @click="showDelRole(scope.row)" type="danger" icon="el-icon-delete" title="删除" size="mini" round></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      tableData: [],
      showAddDialog: false,
      showEditDialog: false,
      showDleDialog: false
    }
  },
  methods: {
    getTableData () {
      this.$axios.get('/vue/roles').then(res => {
        let data = res.data
        if ((data.code === 200)) {
          this.tableData = data.result
        }
      })
    },
    formatterDate (row, column, cellValue) {
      return this.$moment(cellValue).format('YYYY-MM-DD hh:mm')
    },
    showAddRole () {
      this.showAddDialog = true
    },
    showEditRole () {
      this.showEditDialog = true
    },
    showDelRole () {
      this.showDleDialog = true
    }
  }
}
</script>

<style scoped>
  @import '../../common/css/common.css';
  .el-table {
    margin: 0 auto;
  }
</style>
