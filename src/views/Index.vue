<template>
  <el-container>
    <el-header height="80px">
      <!--header-->
      <MyHeader/>
    </el-header>
    <el-container>
      <!--左侧菜单-->
      <el-aside width="250px">
        <Aside></Aside>
      </el-aside>
      <el-container>
        <!--main-->
        <el-main>
          <div class="breadcrumb">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item>活动管理</el-breadcrumb-item>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="main-content">
            <router-view/>
          </div>
        </el-main>
        <!--footer-->
        <el-footer>©2019 聆枫科技有限公司版权所有</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import MyHeader from '@/components/MyHeader'
import Aside from '@/components/Aside'
export default {
  name: 'Index',
  components: {MyHeader, Aside},
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item)
    }
  }
}
</script>

<style scoped>
  .el-container{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
  }
  .el-header {
    background-color: white;
    color: #333;
    text-align: center;
    padding: 0;
  }
  .el-footer {
    background-color: white;
    color: #333;
    text-align: center;
    line-height: 60px;
    padding: 0;
  }

  .el-aside {
    background-color: #545c64;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
  .breadcrumb {
    width: 100%;
    margin-bottom: 10px;
  }
  .main-contents {
    position: relative;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }
</style>
