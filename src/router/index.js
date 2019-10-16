import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import UserList from '@/views/user/UseList'

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
        }
      ]
    },
    {
      path: '/user-list',
      name: 'UserList',
      component: UserList
    }
  ]
})
