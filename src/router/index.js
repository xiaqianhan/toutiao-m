import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login', // 路由路径
    name: 'login', // 路由名称
    component: () => import('@/views/login/index.vue') // 配置路由懒加载
  },
  {
    path: '/', // 路由路径
    // name: 'layout', // 路由名称,如果父路由有默认子路由，那他的name没有意义
    component: () => import('@/views/layout/index.vue'), // 配置路由懒加载
    children: [
      {
        path: '', // 留空为默认子路由,默认子路由只能有一个
        name: 'home', // 路由名称
        component: () => import('@/views/home/index.vue') // 配置路由懒加载
      },
      {
        path: '/qa', // 路由路径
        name: 'qa', // 路由名称
        component: () => import('@/views/qa/index.vue') // 配置路由懒加载
      },
      {
        path: '/video', // 路由路径
        name: 'video', // 路由名称
        component: () => import('@/views/video/index.vue') // 配置路由懒加载
      },
      {
        path: '/my', // 路由路径
        name: 'my', // 路由名称
        component: () => import('@/views/my/index.vue') // 配置路由懒加载
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
