import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login', // 路由路径
    name: 'login', // 路由名称
    component: () => import('@/views/login/index.vue') // 配置路由懒加载
  }
]

const router = new VueRouter({
  routes
})

export default router
