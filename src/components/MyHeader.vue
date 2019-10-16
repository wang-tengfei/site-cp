<template>
  <el-header height="80px">
    <el-row :gutter="20">
      <el-col :span="6"><div class="grid-content bg-purple">a</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">b</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">c</div></el-col>
      <el-col :span="6"><div class="grid-content bg-purple">d</div></el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  name: 'MyHeader',
  data () {
    return {
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-row {
    margin-bottom: 20px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
