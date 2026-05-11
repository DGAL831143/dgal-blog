<script setup>
// 根组件：提供通用布局骨架
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'
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
