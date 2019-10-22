<template>
  <div class="side-menu">
    <el-menu :default-active="$route.path" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" class="slider" router style="border: 0">
      <el-submenu v-for="(item,index) in updateMenuList" :key="index" :index='item.id'>
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="child in item.children" open :key="child.id" :index='child.index'>
            {{child.childTitle}}
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
      menuIndex: ''
    }
  },
  methods: {
    currentMenu () {
      console.log('a')
    }
  },
  props: {
    updateMenuList: {
      type: Array,
      required: true
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
