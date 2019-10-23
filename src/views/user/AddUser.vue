<template>
  <div class="edit-info">
    <el-form :model="addUserData" status-icon :rules="userRules" ref="addUserData" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="addUserData.userName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="addUserData.nickName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="密码" prop="password">
        <el-input type="password" show-password v-model="addUserData.password"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input type="number" v-model="addUserData.age"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="phoneNumber">
            <el-input type="number" v-model="addUserData.phoneNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="邮箱" prop="email">
        <el-input type="email" v-model="addUserData.email"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="addUserData.address"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeAddDialog('addUserData')">取 消</el-button>
      <el-button type="primary" @click="addUser('addUserData')">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddUser',
  data () {
    return {
      addUserData: {
        userName: '',
        nickName: '',
        password: '',
        age: '',
        phoneNumber: '',
        zip: '',
        address: ''
      },
      userRules: {
        userName: [
          // { validator: validateName, trigger: 'blur' }
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 20, message: '用户名长度在3到20之间', trigger: 'blur' }
        ],
        nickName: [
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 3, max: 20, message: '昵称长度在3到20之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码最短为6位', trigger: 'blur' }
        ],
        age: [
          { min: 0, max: 200, message: '必须是数字', trigger: 'blur' }
        ],
        phoneNumber: [
          { len: 11, message: '手机号长度为11位', trigger: 'blur' }
        ],
        email: [
          { type: 'email', message: '必须符合邮箱格式', trigger: 'blur' }
        ],
        address: [
          { max: 50, message: '最大长度为50', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    closeAddDialog (formName) {
      this.$emit('isShowAdd', false)
      this.addUserData = {}
      this.resetForm(formName)
    },
    addUser (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.post('/vue/user/', this.addUserData).then(response => {
            let data = response.data
            if (data.code === 200) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              this.closeAddDialog()
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
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  props: {
    getTableData: {
      type: Function,
      request: true
    }
  }
}
</script>

<style scoped>
  @import '../../common/css/common.css';
  .edit-info {
    width: 100%;
  }
</style>
