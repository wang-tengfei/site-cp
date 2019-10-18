<template>
  <div class="header">
    <div class="logo">
      <el-image style="width: 250px; height: 79px;" src="https://www.baidu.com/img/bd_logo1.png" />
    </div>
    <div class="header-menu">
      <el-menu :default-active="activeIndex"  class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
      </el-menu>
    </div>
    <div class="user-info">

    </div>
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  data () {
    return {
      activeIndex: '1',
      fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  }
}
</script>

<style scoped>
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
    padding-top: 20px;
  }
</style>
