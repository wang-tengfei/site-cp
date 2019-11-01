<template>
  <div class="login">
    <div class="login-inner">
      <div class="login-title">
        <span>用户登录</span>
      </div>
      <el-form label-width="80px" status-icon :model="loginData" ref="loginData" :rules="loginRules" class="demo-ruleForm">
        <el-form-item prop="userName" label-width="0">
          <el-input v-model="loginData.userName" placeholder="请输入用户名" auto-complete="off" style="width: 100%"></el-input>
        </el-form-item>
        <el-form-item prop="password" label-width="0">
          <el-input type="password" show-password v-model="loginData.password" placeholder="请输入密码" auto-complete="off" style="width: 100%"></el-input>
        </el-form-item>
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
        <el-button type="primary" style="width: 100%" @click="login('loginData')">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      loginData: {
        userName: '',
        password: ''
      },
      checked: false,
      loginRules: {
        userName: [
          // { validator: validateName, trigger: 'blur' }
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let param = new URLSearchParams()
          param.append('username', this.loginData.userName)
          param.append('password', this.loginData.password)
          this.$axios.post('/vue/login', param).then(response => {
            let data = response.data
            if (data.code === 200) {
              localStorage.setItem('loginUser', JSON.stringify(data.result))
              localStorage.token = data.result.token
              return this.$router.push({path: '/', data: {username: this.loginData.userName}})
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
