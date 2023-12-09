import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/product',
      name: 'product',
      component: () => import('../views/Product.vue')
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('../views/Wishlist.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFount',
      redirect: '/'
    }
  ],
  scrollBehavior (to, from, savedPosition){
    return { top: 0 }
  }
})

export default router
