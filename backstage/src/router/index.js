import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      // 路由懒加载
      component: resolve => require(['@/pages/index'],resolve)
    },
    {
      path: '/one',
      name: 'One',
      // 路由懒加载
      component: resolve => require(['@/pages/one'],resolve)
    },
    {
      path: '/two',
      name: 'Two',
      // 路由懒加载
      component: resolve => require(['@/pages/two'],resolve)
    },
    {
      path: '*',
      name: 'Index',
      // 路由懒加载
      component: resolve => require(['@/pages/index'],resolve)
    }
  ]
})
