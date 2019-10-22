<template>
  <div class="edit-info">
    <el-form v-model="addUserData" label-width="100px">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="addUserData.userName"></el-input>
      </el-form-item>
      <el-row>
        <el-col :span="12">
          <el-form-item label="年龄" prop="age">
            <el-input v-model="addUserData.age"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号" prop="phoneNumber">
            <el-input v-model="addUserData.phoneNumber"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="邮箱" prop="zip">
        <el-input v-model="addUserData.email"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="closeAddDialog">取 消</el-button>
      <el-button type="primary" @click="editUser()">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddUser',
  data () {
    return {
      addUserData: {}
    }
  },
  methods: {
    closeEditDialog () {
      this.$emit('isShowAdd', false)
    },
    editUser () {
      this.$axios.post('/vue/user/', this.addUserData).then(response => {
        let data = response.data
        if (data.code === 200) {
          this.$message({
            type: 'success',
            message: '添加成功成功!'
          })
          this.closeEditDialog()
          this.getTableData()
        } else {
          this.$message({
            type: 'error',
            message: '添加失败：' + data.msg
          })
        }
      })
    }
  },
  props: {
    getTableData: {
      type: Function,
      request: true
    },
    closeAddDialog: {
      type: Boolean,
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
