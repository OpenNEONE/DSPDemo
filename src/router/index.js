import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'dataBasic',
    component: function () {
      return import('../views/dataBasic.vue')
    }
  },
  {
    path: '/dataInfo',
    name: 'dataInfo',
    component: function () {
      return import('../views/dataInfo.vue')
    }
  },
  {
    path: '/dataConfirm',
    name: 'dataConfirm',
    component: function () {
      return import('../views/dataConfirm.vue')
    }
  }

]

const router = new VueRouter({
  routes
})

export default router
