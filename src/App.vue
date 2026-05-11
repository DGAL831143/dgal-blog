<script setup>
// 根组件：提供通用布局骨架 + 全局指令链接点击拦截
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'

const router = useRouter()

// 拦截 .cmd-link 点击：使用 Vue Router 导航，确保 base path 正确
onMounted(() => {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.cmd-link')
    if (!link) return
    e.preventDefault()
    const href = link.getAttribute('href')
    if (href) router.push(href)
  })
})
</script>

<template>
  <NavBar />
  <!-- 主内容区：留出固定导航栏的高度 -->
  <main class="main-content">
    <router-view />
  </main>
  <FooterBar />
</template>

<style scoped>
.main-content {
  min-height: calc(100vh - var(--nav-height) - 80px);
  padding-top: calc(var(--nav-height) + 40px);
  padding-bottom: 60px;
  /* 主内容两边大幅留白，为后期插图和动画预留空间 */
  padding-left: 32px;
  padding-right: 32px;
}
</style>
