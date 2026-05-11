<script setup>
/**
 * 指令详情页：单栏居中布局
 * 显示指令标题、分类、正文（帮助文档 + 参数翻译表 + 用法示例）
 */
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCommandBySlug, loadCommands } from '../utils/loadPosts.js'

const route = useRoute()
const router = useRouter()

const command = computed(() => {
  return getCommandBySlug(route.params.slug) || null
})

// 上一篇 / 下一篇：在指令列表中查找
const nav = computed(() => {
  const list = loadCommands()
  const i = list.findIndex((c) => c.slug === route.params.slug)
  return {
    prev: i > 0 ? list[i - 1] : null,
    next: i < list.length - 1 ? list[i + 1] : null,
  }
})

function goBack() {
  router.push('/')
}
</script>

<template>
  <div v-if="command" class="cmd-page">
    <button class="back-link" @click="goBack">&larr; 返回首页</button>

    <header class="cmd-header">
      <h1 class="cmd-title">{{ command.title }}</h1>
      <span class="cmd-category">{{ command.category }}</span>
    </header>

    <div class="cmd-body" v-html="command.contentHTML"></div>

    <nav class="cmd-nav">
      <router-link
        v-if="nav.prev"
        :to="`/command/${nav.prev.slug}`"
        class="cmd-nav-link"
      >
        &larr; {{ nav.prev.title }}
      </router-link>
      <router-link
        v-if="nav.next"
        :to="`/command/${nav.next.slug}`"
        class="cmd-nav-link cmd-nav-next"
      >
        {{ nav.next.title }} &rarr;
      </router-link>
    </nav>
  </div>

  <div v-else class="not-found">
    <p>指令未找到</p>
    <button class="back-link" @click="goBack">&larr; 返回首页</button>
  </div>
</template>

<style scoped>
.cmd-page {
  max-width: var(--content-width);
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-accent);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-bottom: 32px;
  transition: color var(--transition);
}
.back-link:hover { color: var(--color-accent-hover); }

.cmd-header {
  margin-bottom: 40px;
}

.cmd-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1.35;
  margin-bottom: 8px;
  font-family: 'Consolas', 'Monaco', monospace;
}

.cmd-category {
  display: inline-block;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--color-accent);
  background: rgba(37, 99, 235, 0.06);
  padding: 2px 10px;
  border-radius: 4px;
}

/* 正文样式：复用 Article 排版 */
.cmd-body :deep(h2) {
  font-size: 1.5rem; font-weight: 600; color: var(--color-primary);
  margin: 40px 0 16px; padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: calc(var(--nav-height) + 16px);
}

.cmd-body :deep(h3) {
  font-size: 1.2rem; font-weight: 600; color: var(--color-primary);
  margin: 32px 0 12px;
}

.cmd-body :deep(p) {
  margin-bottom: 20px; line-height: 1.85; color: var(--color-secondary);
}

.cmd-body :deep(strong) { color: var(--color-text); font-weight: 600; }

.cmd-body :deep(pre) {
  background: #1e1e2e; border-radius: var(--radius);
  padding: 20px 24px; overflow-x: auto; margin: 24px 0;
  font-size: 0.88rem; line-height: 1.6;
}

.cmd-body :deep(pre code) {
  color: #cdd6f4; font-family: 'Consolas', 'Monaco', monospace;
}

.cmd-body :deep(code) {
  font-family: 'Consolas', 'Monaco', monospace; font-size: 0.9em;
}

.cmd-body :deep(:not(pre) > code) {
  background: rgba(37, 99, 235, 0.08); color: var(--color-accent);
  padding: 2px 6px; border-radius: 3px;
}

.cmd-body :deep(table) {
  width: 100%; border-collapse: collapse; margin: 24px 0;
}

.cmd-body :deep(th),
.cmd-body :deep(td) {
  padding: 8px 14px; text-align: left;
  border-bottom: 1px solid var(--color-border);
  font-size: 0.9rem;
}

.cmd-body :deep(th) {
  font-weight: 600; color: var(--color-primary);
  background: var(--color-bg);
}

.cmd-body :deep(td) {
  color: var(--color-secondary); line-height: 1.6;
}

.cmd-body :deep(blockquote) {
  border-left: 3px solid var(--color-accent); padding: 8px 20px;
  margin: 24px 0; color: var(--color-text-muted);
  background: rgba(37, 99, 235, 0.04); border-radius: 0 4px 4px 0;
}

/* 指令链接样式（在指令详情页中也渲染 :cmd[]） */
.cmd-body :deep(.cmd-link) {
  background: rgba(37, 99, 235, 0.1); color: var(--color-accent);
  padding: 1px 7px; border-radius: 4px;
  font-family: 'Consolas', 'Monaco', monospace; font-size: 0.9em;
  cursor: pointer; text-decoration: none;
  transition: background var(--transition), color var(--transition);
}
.cmd-body :deep(.cmd-link):hover {
  background: rgba(37, 99, 235, 0.2); color: var(--color-accent-hover);
}

/* 前后导航 */
.cmd-nav {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  margin-top: 48px;
  padding-top: 24px;
  border-top: 1px solid var(--color-border);
}

.cmd-nav-link {
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-accent);
  text-decoration: none;
  transition: color var(--transition);
  font-family: 'Consolas', 'Monaco', monospace;
}
.cmd-nav-link:hover { color: var(--color-accent-hover); }
.cmd-nav-next { margin-left: auto; }

.not-found {
  text-align: center; padding: 60px 0;
  color: var(--color-text-muted);
}

@media (max-width: 480px) {
  .cmd-title { font-size: 1.5rem; }
  .cmd-body :deep(pre) { padding: 16px; font-size: 0.82rem; }
  .cmd-body :deep(table) { font-size: 0.78rem; }
  .cmd-body :deep(th),
  .cmd-body :deep(td) { padding: 6px 10px; }
}
</style>
