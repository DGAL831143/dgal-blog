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
]

const router = createRouter({
  history: createWebHistory('/dgal-blog/'),
  routes,
})

export default router
