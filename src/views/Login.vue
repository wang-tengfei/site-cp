<template>
  <div class="login">
    <div class="login-inner">
      <div class="login-title">
        <span>用户登录</span>
      </div>
      <el-form label-width="80px">
        <el-input v-model="userName" placeholder="请输入用户名" style="width: 100%"></el-input>
        <div style="margin-top: 20px"></div>
        <el-input type="password" v-model="password" placeholder="请输入密码" style="width: 100%"></el-input>
      </el-form>
      <div>
        <div style="margin-top: 20px"></div>
        <el-row>
          <el-col :span="12" align="left">
            <el-checkbox v-model="checked" >记住密码</el-checkbox>
          </el-col>
          <el-col :span="12" align="right">
            <el-link href="#">忘记密码</el-link>
          </el-col>
        </el-row>
        <div style="margin-top: 30px"></div>
        <el-button type="primary" style="width: 100%" @click="login()">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      password: '',
      checked: false
    }
  },
  methods: {
    login () {
      // let loginInfo = {'username': this.userName, 'password': this.password}
      let param = new URLSearchParams()
      param.append('username', this.userName)
      param.append('password', this.password)
      this.$axios.post('/vue/login', param).then(response => {
        let data = response.data
        if (data.code === 200) {
          localStorage.setItem('loginUser', JSON.stringify(data.result))
          return this.$router.push({path: '/', data: {username: this.userName}})
        } else {
          this.$message({
            type: 'error',
            message: '登录失败：' + data.msg
          })
        }
      })
    }
  }
}
</script>

<style scoped>
  .login {
    width: 100%;
    height: 100%;
    background: #2c3e50;
  }

  .login-title {
    font-size: 30px;
    margin-bottom: 40px;
  }

  .login-inner {
    width: 350px;
    height: 350px;
    background: white;
    margin: 0 auto;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
</style>
