// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import GlobalVariable from '@/common/js/gloable_variable'
import GlobalFunction from '@/common/js/gloable_function'

import Axios from 'axios'
import Moment from 'moment'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('ElementUI', ElementUI)

// http 调用
Vue.prototype.$axios = Axios
Axios.defaults.baseURL = '/api'
Axios.defaults.headers.post['Content-Type'] = 'application/json'

Vue.prototype.$moment = Moment

Vue.prototype.GLOBAL = GlobalVariable
Vue.prototype.GLOBALFun = GlobalFunction

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// es5函数参数设置默认值
// const lastFormatString = formatString || ''
// moment(input) 把时间字符串转成时间对象
// format(formatString) 把时间对象，按照指定格式，格式化成符合条件的字符串
Vue.filter('dateFmt', (input, formatString = 'yyyy-MM-dd hh:mm') => {
  return Moment(input).format(formatString)
})
