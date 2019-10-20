<template>
  <el-dialog title="编辑用户信息" :visible.sync="isShowEdit" width="600" :before-close="handleClose">
    <div class="edit-info">
      <el-form v-model="editUserData" :rules="userRules" label-width="100px">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="editUserData.name"></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-col :span="11">
            <el-select v-model="editUserData.province" style="width: 100%" placeholder="请选择活动区域">
              <el-option label="上海" value="上海"></el-option>
              <el-option label="北京" value="beijing"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <span style="width: 100%">-</span>
          </el-col>
          <el-col :span="11">
            <el-select v-model="editUserData.city" style="width: 100%" placeholder="请选择活动区域">
              <el-option label="上海" value="上海"></el-option>
              <el-option label="北京" value="beijing"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="地址" prop="address">
          <el-input v-model="editUserData.address"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮编" prop="zip">
              <el-input v-model="editUserData.zip"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="时间" prop="date">
              <el-date-picker v-model="editUserData.date" style="width: 100%" type="datetime"  placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
    <el-button @click="isShowEdit = false">取 消</el-button>
    <el-button type="primary" @click="isShowEdit = false">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'EditUser',
  data () {
    return {
      test: false
    }
  },
  props: {
    isShowEdit: {
      type: Boolean,
      request: true
    }
  }
}
</script>

<style scoped>

</style>
