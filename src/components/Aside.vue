<template>
  <div id="sideMenu" class="side-menu">
<!--    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>-->
    <el-menu :default-active="$route.path" @select="handlerSelect" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
             class="slider" router style="border: 0" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
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
      menuIndex: '',
      isCollapse: false
    }
  },
  created () {
    console.log(this.$route.path)
  },
  methods: {
    currentMenu () {
      console.log('a')
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handlerSelect (index, indexPath) {
      let mIndex = parseInt(indexPath[0])
      let menu = this.updateMenuList[mIndex - 1]
      let title = menu['title']
      let subTitle = null
      let child = menu['children']
      for (let x = 0; x < child.length; x++) {
        if (index === child[x]['index']) {
          subTitle = child[x]['childTitle']
        }
      }
      let nav = subTitle ? [title, subTitle] : [title]
      this.$emit('menuName', nav)
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
