<template>
  <div class="edit-info">
    <el-form :model="addUserData" status-icon :rules="this.GLOBAL.userRules" ref="addUserData" label-width="100px">
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
            <el-input v-model.number="addUserData.age"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="phoneNumber">
            <el-input v-model.number="addUserData.phoneNumber"></el-input>
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
      }
    }
  },
  methods: {
    closeAddDialog (formName) {
      this.$emit('isShowAdd', false)
      this.addUserData = {}
      console.log('formName is ' + formName)
      if (formName) {
        this.resetForm(formName)
      }
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
