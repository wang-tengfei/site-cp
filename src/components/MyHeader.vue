<template>
  <div class="header">
    <div class="logo">
      <img style="width: 250px; height: 79px;" src="../assets/logo.png" />
    </div>
    <div class="header-menu">
      <el-menu :default-active="activeIndex"  class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2" disabled>消息中心</el-menu-item>
        <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      </el-menu>
    </div>
    <div class="user-info">
      <el-badge :value="12" :max="10" class="item">
        <el-button @click="showMsg()" icon="el-icon-bell"></el-button>
      </el-badge>
      <span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <b>{{userName}}</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" split-button>
            <el-dropdown-item>用户信息</el-dropdown-item>
            <el-dropdown-item @click.native="loginOut()">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </div>
    <el-dialog title="未读信息" :visible.sync="showMsgDialog" width="800px">
      <div class="edit-info">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  data () {
    return {
      userName: 'Wang Tengfei',
      activeIndex: '1',
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      showMsgDialog: false,
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    loginOut () {
      console.log('注销用户信息')
      return this.$router.push('/login')
    },
    handleSelect () {
      console.log('')
    },
    showMsg () {
      this.showMsgDialog = true
    }
  }
}
</script>

<style scoped>
  .header {
    margin: 0;
    padding: 0;
  }
  .logo {
    width: 250px;
    height: 80px;
    float: left;
  }
  .logo image {
    width: 80px;
    height: 250px;
  }
  .header-menu {
    height: 80px;
    width: 500px;
    float: left;
    margin-left: 20px;
    padding-top: 20px;
  }
  .item {
    margin-right: 50px;
  }
  .item sup {
    top: 10px;
  }
  .user-info {
    width: 300px;
    height: 100%;
    padding-top: 30px;
    float: right;
  }
</style>
