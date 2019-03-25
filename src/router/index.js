import Vue from 'vue'
import VueRouter from 'vue-router'

import MSite from '../pages/Msite/Msite.vue'
import search from '../pages/Search/Search.vue'
import profile from '../pages/Profile/Profile.vue'
import order from '../pages/Order/Order.vue'
import login from '../pages/login/login.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: MSite,
      meta: {
        login: true
      }
    },
    {
      path: '/search',
      component: search,
      meta: {
        login: true
      }
    },
    {
      path: '/profile',
      component: profile,
      meta: {
        login: true
      }
    },
    {
      path: '/order',
      component: order,
      meta: {
        login: true
      }
    },
    {
      path: '/login',
      component: login
    }
  ]
})
