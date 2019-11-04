import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import UserList from '@/views/user/UseList'
import RoleList from '@/views/role/RoleList'
import LoginLog from '@/views/log/LoginLog'
import AddNews from '@/views/news/AddNews'
import NewsList from '@/views/news/NewsList'
import OperationLog from '@/views/log/OperationLog'
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
        },
        {
          path: '/log-login',
          name: 'LoginLog',
          component: LoginLog
        },
        {
          path: '/log-operation',
          name: 'OperationLog',
          component: OperationLog
        },
        {
          path: '/news-add',
          name: 'AddNews',
          component: AddNews
        },
        {
          path: '/news-list',
          name: 'NewsList',
          component: NewsList
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
