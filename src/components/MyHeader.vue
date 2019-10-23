<template>
  <div class="header">
    <div class="logo">
      <img style="width: 250px; height: 79px;" src="../assets/logo2.jpg" />
    </div>
    <div class="header-menu">
      <!--<el-menu default-active="1"  class="el-menu-demo" mode="horizontal" @select="handleSelect">-->
        <!--<el-menu-item index="1">首页</el-menu-item>-->
        <!--<el-menu-item index="2">消息中心</el-menu-item>-->
        <!--<el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
      <!--</el-menu>-->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="user-info">
      <el-badge :value="0" :max="99" class="item">
        <el-button disabled @click="showMsg()" icon="el-icon-bell"></el-button>
      </el-badge>
      <span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <b>{{userName}}</b>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown" split-button>
            <el-dropdown-item @click.native="showUserInfo()">用户信息</el-dropdown-item>
            <el-dropdown-item @click.native="showPassDialog()">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="loginOut()">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
    </div>
    <!--用户信息弹窗-->
    <el-dialog title="用户信息" class="dialog-title" :visible.sync="userInfoDialog" width="600px">
      <el-row>
        <el-col class="info-name" :span="4" align="right">用户名:</el-col>
        <el-col :span="7" align="left" :offset=1>{{userData.userName}}</el-col>
        <el-col class="info-name" :span="4" align="right">昵称:</el-col>
        <el-col :span="7" align="left" :offset=1>{{userData.nickName}}</el-col>
      </el-row>
      <div style="height: 20px"></div>
      <el-row>
        <el-col class="info-name" :span="4" align="right">手机号:</el-col>
        <el-col :span="7" align="left" :offset=1>{{userData.phoneNumber}}</el-col>
        <el-col class="info-name" :span="4" align="right">邮箱:</el-col>
        <el-col :span="7" align="left" :offset=1>{{userData.email}}</el-col>
      </el-row>
      <div style="height: 20px"></div>
      <el-row>
        <el-col class="info-name" :span="4" align="right">地址:</el-col>
        <el-col :span="7" align="left" :offset=1>{{userData.address}}</el-col>
        <el-col class="info-name" :span="4" align="right">年龄:</el-col>
        <el-col :span="7" align="left" :offset=1>{{userData.age}}</el-col>
      </el-row>
    </el-dialog>
    <!--未读消息弹窗-->
    <el-dialog title="未读消息" class="dialog-title" :visible.sync="showMsgDialog" width="800px">
      <div class="edit-info">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <!--修改密码弹窗-->
    <el-dialog title="修改密码" class="dialog-title" :visible.sync="updatePasswordDialog" width="500px">
      <div class="edit-info">
        <el-form label-width="100px">
          <el-form-item label="原始密码" prop="password">
            <el-input v-model="oldPassword" type="password" show-password placeholder="请输入旧密码" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="password">
            <el-input v-model="newPassword" type="password" show-password placeholder="请输入新密码" style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password">
            <el-input v-model="repeatPassword" type="password" show-password placeholder="请确认新密码" style="width: 300px"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="updatePasswordDialog = false">取 消</el-button>
          <el-button type="primary" @click="updatePassword()">确 定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  data () {
    return {
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
      userName: '',
      userId: '',
      userData: {},
      userInfoDialog: false,
      showMsgDialog: false,
      updatePasswordDialog: false,
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
      this.$confirm('是否注销当前用户？', '警告', {
        confirmButtonText: '注销',
        cancelButtonText: '取消',
        type: 'warning',
        dangerouslyUseHTMLString: true
      }).then(() => {
        console.log('注销用户信息')
        localStorage.getItem('')
        this.$axios.post('/vue/login-out/' + this.userId).then(res => {
          let data = res.data
          if (data.code === 200) {
            return this.$router.push('/login')
          }
          this.$message({
            type: 'error',
            message: data.msg
          })
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    handleSelect (index) {
      this.$emit('changeIndex', index)
    },
    showMsg () {
      this.showMsgDialog = true
    },
    showPassDialog () {
      this.updatePasswordDialog = true
    },
    updatePassword () {
      this.$axios.get('/vue/user/' + this.userId).then(response => {
        let userInfo = response.data
        // 校验返回码
        if (userInfo.code !== 200) {
          this.$message({
            type: 'warning',
            message: userInfo.msg
          })
          return
        }
        // 校验原始密码的有效性
        if (userInfo.result.password !== this.oldPassword) {
          this.$message({
            type: 'warning',
            message: '原始密码错误!'
          })
          return
        }
        // 校验新密码两次输入是否一致
        if (this.newPassword !== this.repeatPassword) {
          this.$message({
            type: 'warning',
            message: '两次密码不一致!'
          })
          return
        }
        // 修改密码
        let param = new URLSearchParams()
        param.append('password', this.newPassword)
        this.$axios.post('/vue/user/password/' + this.userId, param).then(response => {
          let data = response.data
          if (data.code === 200) {
            this.$message({
              type: 'success',
              message: '修改密码成功!'
            })
            this.updatePasswordDialog = false
          } else {
            this.$message({
              type: 'error',
              message: '修改密码失败：' + data.msg
            })
          }
        })
      })
    },
    showUserInfo () {
      this.userInfoDialog = true
      this.$axios.get('/vue/user/' + this.userId).then(response => {
        let data = response.data
        if (data.code === 200) {
          this.userData = data.result
        }
      })
    }
  },
  created () {
    let loginUser = JSON.parse(localStorage.getItem('loginUser'))
    this.userName = loginUser.userName
    this.userId = loginUser.userId
  }
}
</script>

<style scoped>
  @import '../common/css/common.css';
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
    padding-top: 40px;
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
  .info-name {
    font-weight: bolder;
  }
</style>
