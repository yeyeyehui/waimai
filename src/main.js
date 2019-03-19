import Vue from 'vue'
import app from './App.vue'
import router from './router/index.js'
import { } from 'mint-ui'

let vm = new Vue({
  el: '#app',
  render: h => h(app),
  router
})
