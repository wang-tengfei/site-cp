<template>
  <div class="side-menu">
    <el-menu :default-active="$route.path" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" class="slider" router style="">
      <el-menu-item index="/">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu v-for="(item,index) in menuList" :key="index" :index='item.id'>
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="child in item.children" open :key="child.id" :index='child.index'>{{child.childTitle}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Aside',
  data: function () {
    return {
      menuList: [
        {
          id: '1',
          title: '导航1',
          icon: 'el-icon-location',
          children: [
            {
              index: '/user-list',
              childTitle: '用户管理'
            },
            {
              index: '/page2',
              childTitle: '角色管理'
            }
          ]
        },
        {
          id: '2',
          title: '导航2',
          icon: 'el-icon-location',
          children: [
            {
              index: '/page3',
              childTitle: '导航2page3'
            },
            {
              index: '/page4',
              childTitle: '导航2page4'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style scoped>
  .slider {
    margin: 0;
  }
  .side-menu {
    width: 100%;
    background: #545c64;
  }
</style>
