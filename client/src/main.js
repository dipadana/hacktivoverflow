import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import moment from 'moment'
import { next, successToast, closeLoading, showLoading } from './helpers/notif'
import axios from './api/server'

Vue.mixin({
  methods: {
    next,
    successToast,
    closeLoading,
    showLoading,
    axios
  }
})

Vue.config.productionTip = false
Vue.prototype.moment = moment

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
