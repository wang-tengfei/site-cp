<template>
  <el-container>
    <el-header height="80px">
      <!--header-->
      <my-header v-on:changeIndex="updateAside" v-bind:navTitle="navTitle"></my-header>
    </el-header>
    <el-container>
      <!--左侧菜单-->
      <el-aside width="250px">
        <my-aside v-bind:updateMenuList="menuList" @menuName="getMenuName"></my-aside>
      </el-aside>
      <el-container>
        <!--main-->
        <el-main>
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
  components: {'my-header': MyHeader, 'my-aside': Aside},
  data () {
    return {
      userName: this.$route.query,
      navTitle: [],
      menuList: '',
      menuList1: [
        {
          id: '1',
          title: '账号管理',
          icon: 'el-icon-s-custom',
          children: [
            {
              index: '/user-list',
              childTitle: '用户管理'
            },
            {
              index: '/role-list',
              childTitle: '角色管理'
            }
          ]
        },
        {
          id: '2',
          title: '日志管理',
          icon: 'el-icon-document',
          children: [
            {
              index: '/log-login',
              childTitle: '登录日志'
            },
            {
              index: '/log-operation',
              childTitle: '操作日志'
            }
          ]
        },
        {
          id: '3',
          title: '新闻管理',
          icon: 'el-icon-notebook-2',
          children: [
            {
              index: '/news-add',
              childTitle: '新闻管理'
            },
            {
              index: '/log-operation',
              childTitle: '操作日志'
            }
          ]
        }
      ],
      menuList2: []
    }
  },
  methods: {
    updateAside (e) {
      console.log('当前菜单为' + e)
      if (e === '1') {
        this.menuList = this.menuList1
      }
      if (e === '2') {
        this.menuList = this.menuList2
      }
    },
    getMenuName (data) {
      console.log(data)
      this.navTitle = data
    }
  },
  created () {
    this.menuList = this.menuList1
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
