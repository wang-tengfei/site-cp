<template>
  <div class="edit-info">
    <el-form :model="editUserData" :rules="this.GLOBAL.userRules" ref="editUserData"  label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="editUserData.userName" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="昵称" prop="nickName">
            <el-input v-model="editUserData.nickName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="editUserData.age"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="address">
            <el-input v-model.number="editUserData.phoneNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="editUserData.email"></el-input>
      </el-form-item>
      <el-form-item label="地址" prop="address">
        <el-input v-model="editUserData.address"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeEditDialog('editUserData')">取 消</el-button>
      <el-button type="primary" @click="editUser('editUserData')">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditUser',
  data () {
    return {
      test: false
    }
  },
  methods: {
    closeEditDialog (formName) {
      this.$emit('isShowEdit', false)
      if (formName) {
        this.resetForm(formName)
      }
    },
    editUser (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios.put('/vue/user/' + this.editUserData.id, this.editUserData).then(response => {
            let data = response.data
            if (data.code === 200) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.closeEditDialog(formName)
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
    editUserData: {
      type: Object,
      request: true
    },
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
