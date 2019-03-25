import Vue from 'vue'
import app from './App.vue'
import router from './router/index.js'
import store from './store'
import {Switch } from 'mint-ui'
Vue.component(Switch.name, Switch);

let vm = new Vue({
  el: '#app',
  render: h => h(app),
  router,
  store
})
