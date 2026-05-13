import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/commands',
    name: 'Commands',
    component: () => import('../views/Commands.vue'),
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
  {
    path: '/series',
    name: 'Series',
    component: () => import('../views/Series.vue'),
  },
  {
    path: '/series/:slug',
    name: 'SeriesDetail',
    component: () => import('../views/SeriesDetail.vue'),
  },
]

const router = createRouter({
  history: createWebHistory('/dgal-blog/'),
  routes,
})

export default router
