import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import UserList from '@/views/user/UseList'
import RoleList from '@/views/role/RoleList'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/user-list',
          name: 'UserList',
          component: UserList
        },
        {
          path: '/role-list',
          name: 'RoleList',
          component: RoleList
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
