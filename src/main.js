// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import GlobalVariable from '@/common/js/gloable_variable'
import GlobalFunction from '@/common/js/gloable_function'

import Axios from 'axios'
import Moment from 'moment'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('ElementUI', ElementUI)
// 富文本编辑器
Vue.use(VueQuillEditor)

// http 调用
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json'
Axios.interceptors.request.use(config => {
  /* add authorization */
  // console.log(config)
  if (localStorage.token) {
    config.headers.Authorization = localStorage.token
  } else if (config.url !== '/vue/login') {
    return router.push('/login')
  }
  return config
}, error => {
  console.log(error)
  return Promise.reject(error.response.data)
})
Axios.interceptors.response.use(res => {
  let data = res.data
  if (data.code === 100004 || data.code === 100005 || data.code === 100006) {
    return router.push('/login')
  }
  return res
}, error => {
  console.log(error)
  return Promise.reject(error.response.data)
})

Vue.prototype.$moment = Moment

Vue.prototype.GLOBAL = GlobalVariable
Vue.prototype.GLOBALFun = GlobalFunction

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})

// es5函数参数设置默认值
// const lastFormatString = formatString || ''
// moment(input) 把时间字符串转成时间对象
// format(formatString) 把时间对象，按照指定格式，格式化成符合条件的字符串
Vue.filter('dateFmt', (input, formatString = 'yyyy-MM-dd hh:mm') => {
  return Moment(input).format(formatString)
})
