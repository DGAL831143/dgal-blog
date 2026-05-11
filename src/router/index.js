import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/article/:slug',
    name: 'Article',
    component: () => import('../views/Article.vue'),
  },
  {
    path: '/command/:slug',
    name: 'Command',
    component: () => import('../views/Command.vue'),
  },
]

const router = createRouter({
  history: createWebHistory('/dgal-blog/'),
  routes,
})

export default router
