//createRouter:创建路由实例
//createWebHistory:创建history模式路由
import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login/index.vue'
import enroll from '@/views/enroll/index.vue'
import layout from '@/views/layout/index.vue'
import historyCases from '@/views/historyCases/index.vue'
import my from '@/views/my/index.vue'
import items from '@/views/items/index.vue'
import inquiry from '@/views/inquiry/index.vue'
import order from '@/views/order/index.vue'
import myRevise from '@/views/myRevise/index.vue'
import cases from '@/views/cases/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //path和component对应关系的位置
  routes: [
    {
      path: '/',
      component: login
    }, {
      path: '/enroll',
      component: enroll
    }, {
      path: '/',
      component: layout,
      children: [
        {
          path: '/my',
          component: my,
          name:my
        },{
          path: '/historyCases',
          component: historyCases,
        },{
          path: '/items',
          component: items,
        },{
          path: '/inquiry',
          component: inquiry,
        },{
          path: '/order',
          component: order,
        },{
          path: '/myRevise',
          component: myRevise,
        },{
          path: '/cases',
          component: cases,
        }
      ]
    }

  ]
})

export default router
