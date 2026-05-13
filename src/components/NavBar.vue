<script setup>
// 顶部导航栏：固定定位 + 毛玻璃效果
import { ref } from 'vue'

const navLinks = [
  { name: '首页', path: '/' },
  { name: '系列', path: '/series' },
  { name: '指令速查', path: '/commands' },
  { name: '关于', path: '/about' },
]
</script>

<template>
  <header class="navbar">
    <div class="navbar-inner">
      <router-link to="/" class="logo">
        <span class="logo-icon">DGAL</span>
        <span class="logo-text">极简博客</span>
      </router-link>

      <nav class="nav-links">
        <router-link
          v-for="link in navLinks"
          :key="link.name"
          :to="link.path"
          class="nav-link"
          active-class="nav-link--active"
        >
          {{ link.name }}
        </router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: var(--nav-height);
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--color-border);
}

.navbar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 32px;
  height: 100%;
}

/* Logo */
.logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  background: var(--color-primary);
  color: #fff;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 700;
}

.logo-text {
  color: var(--color-primary);
}

/* 导航链接 */
.nav-links {
  display: flex;
  gap: 32px;
}

.nav-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-text-muted);
  transition: color var(--transition);
  cursor: pointer;
}

.nav-link:hover {
  color: var(--color-text);
}

.nav-link--active {
  color: var(--color-accent);
}

/* 移动端适配 */
@media (max-width: 480px) {
  .logo-text {
    display: none;
  }

  .navbar-inner {
    padding: 0 20px;
  }

  .nav-links {
    gap: 20px;
  }
}
</style>
