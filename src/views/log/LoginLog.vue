<template>
  <div class="content">
    <div class="data-header log-header">
      <el-form v-model="searchData" label-width="100px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="用户">
              <el-input v-model="searchData.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="操作">
<!--              <el-input v-model="searchData.type"></el-input>-->
              <el-select placeholder="请选状态" v-model="searchData.type" clearable style="width: 100%">
                <el-option v-for="item in logType" :key="item.value" :label="item.typeName" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="时间" align="left">
              <el-date-picker v-model="searchData.searchTime" type="datetimerange" :picker-options="pickerOptions"
                              range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button @click="searchLogData()" icon="el-icon-search" >搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="data-info role-info">
      <el-table :data="tableData" border width="100%" size="small" fit stripe highlight-current-row>
        <el-table-column type="index" label="序号" min-width="50px"></el-table-column>
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="userName" label="用户"></el-table-column>
        <el-table-column prop="typeName" label="操作"></el-table-column>
        <el-table-column prop="desc" label="描述"></el-table-column>
        <el-table-column prop="createTime"  min-width="120px" label="创建日期" :formatter="formatterDate"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex"
                       :page-sizes="[10, 20, 50]" :page-size="pageSize" :total="totalSize"
                       layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginLog',
  data () {
    return {
      logType: [],
      searchData: {},
      tableData: [],
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
  created () {
    this.getTableData()
    this.getLogType()
  },
  methods: {
    getLogType () {
      this.$axios.get('/vue/log-type').then(res => {
        let data = res.data
        if ((data.code === 200)) {
          this.logType = data.result
        }
      })
    },
    getTableData (param) {
      let queryData = {page_index: this.pageIndex, page_size: this.pageSize}
      if (param) {
        Object.assign(queryData, param)
      }
      this.$axios.get('/vue/logs/page', {params: queryData}).then(res => {
        let data = res.data
        if ((data.code === 200)) {
          this.tableData = data.result.list
          this.pageIndex = data.result.pageIndex
          this.pageSize = data.result.pageSize
          this.totalSize = data.result.total
        }
      })
    },
    searchLogData () {
      let param = {}
      if (this.searchData.userName) {
        Object.assign(param, {'userName': this.searchData.userName})
      }
      if (this.searchData.type) {
        Object.assign(param, {'type': this.searchData.type})
      }
      if (this.searchData.searchTime) {
        let startTime = parseInt(this.searchData.searchTime[0].getTime())
        let endTime = parseInt(this.searchData.searchTime[1].getTime())
        Object.assign(param, {'startTime': startTime, 'endTime': endTime})
      }
      this.getTableData(param)
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
    }
  }
}
</script>

<style scoped>

</style>
