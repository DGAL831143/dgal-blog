<script setup>
/**
 * 文章详情页
 * 桌面端：左侧文章 + 右侧目录 + 浮动翻译窗
 * 移动端：单栏 + 顶部折叠目录
 */
import { computed, onMounted, nextTick, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getPostBySlug } from '../utils/loadPosts.js'

const route = useRoute()
const router = useRouter()

const article = computed(() => {
  const slug = route.params.slug
  return getPostBySlug(slug) || null
})

function goBack() {
  router.push('/')
}

// ---- 浮动翻译窗（绑定 details 展开/折叠） ----
const floatPanels = ref([])
const collapsedPanels = ref(new Set())

onMounted(() => {
  nextTick(() => {
    const body = document.querySelector('.article-body')
    if (!body) return
    // 找到所有包含 .float-panel 的 <details> 元素
    body.querySelectorAll('details').forEach((details) => {
      const panel = details.querySelector('.float-panel')
      if (!panel) return

      const title = panel.dataset.title || '翻译'
      const content = panel.innerHTML
      panel.remove() // 从文章流中移除，内容进浮窗
      const id = floatPanels.value.length

      const data = {
        id,
        title,
        content,
        x: 20,
        y: 150 + id * 40,
        visible: details.open,
        detailsEl: details,
      }
      floatPanels.value.push(data)

      // details 展开/折叠时同步浮窗显隐
      details.addEventListener('toggle', () => {
        data.visible = details.open
        floatPanels.value = [...floatPanels.value]
      })
    })
  })
})

function onDragStart(e, panel) {
  const floatEl = e.currentTarget.closest('.float-window')
  const startX = e.clientX - floatEl.offsetLeft
  const startY = e.clientY - floatEl.offsetTop

  function onMove(ev) {
    panel.x = Math.max(0, Math.min(ev.clientX - startX, window.innerWidth - 320))
    panel.y = Math.max(0, ev.clientY - startY)
  }

  function onUp() {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
  }

  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
}

function togglePanel(id) {
  const s = new Set(collapsedPanels.value)
  s.has(id) ? s.delete(id) : s.add(id)
  collapsedPanels.value = s
}

// × 关闭：同时折叠浮窗和关联的 details
function closePanel(id) {
  const p = floatPanels.value.find((x) => x.id === id)
  if (!p) return
  p.visible = false
  if (p.detailsEl) p.detailsEl.open = false
  floatPanels.value = [...floatPanels.value]
}
</script>

<template>
  <div v-if="article" class="article-page">
    <!-- 文章主体 -->
    <article class="article-detail">
      <details v-if="article.headings.length" class="toc-mobile">
        <summary>本文目录</summary>
        <ul class="toc-list">
          <li
            v-for="h in article.headings"
            :key="h.id"
            :class="['toc-item', `toc-l${h.level}`]"
          >
            <a :href="`#${h.id}`" class="toc-link">{{ h.text }}</a>
          </li>
        </ul>
      </details>

      <button class="back-link" @click="goBack">
        &larr; 返回首页
      </button>

      <header class="article-header">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <time>{{ article.date }}</time>
          <span class="meta-sep">&middot;</span>
          <span class="article-category">{{ article.category }}</span>
          <span
            v-for="tag in article.tags"
            :key="tag"
            class="article-tag"
          >{{ tag }}</span>
        </div>
      </header>

      <div class="article-body" v-html="article.contentHTML"></div>
    </article>

    <!-- 桌面端侧边目录 -->
    <nav v-if="article.headings.length" class="toc-sidebar" aria-label="文章目录">
      <h4 class="toc-title">目录</h4>
      <ul class="toc-list">
        <li
          v-for="h in article.headings"
          :key="h.id"
          :class="['toc-item', `toc-l${h.level}`]"
        >
          <a :href="`#${h.id}`" class="toc-link">{{ h.text }}</a>
        </li>
      </ul>
    </nav>

    <!-- 浮动翻译窗：随 details 展开出现，折叠消失 -->
    <Teleport to="body">
      <div
        v-for="p in floatPanels"
        v-show="p.visible"
        :key="p.id"
        class="float-window"
        :class="{ 'float-window--collapsed': collapsedPanels.has(p.id) }"
        :style="{ left: p.x + 'px', top: p.y + 'px' }"
      >
        <div class="float-window-header" @mousedown="onDragStart($event, p)">
          <span class="float-window-title">{{ p.title }}</span>
          <div class="float-window-actions">
            <button class="float-window-btn" @click="togglePanel(p.id)" :title="collapsedPanels.has(p.id) ? '展开' : '折叠'">
              {{ collapsedPanels.has(p.id) ? '□' : '−' }}
            </button>
            <button class="float-window-btn" @click="closePanel(p.id)" title="关闭">×</button>
          </div>
        </div>
        <div v-show="!collapsedPanels.has(p.id)" class="float-window-body" v-html="p.content"></div>
      </div>
    </Teleport>
  </div>

  <div v-else class="not-found">
    <p>文章未找到</p>
    <button class="back-link" @click="goBack">&larr; 返回首页</button>
  </div>
</template>

<style scoped>
/* ---- 页面级双栏布局 ---- */
.article-page {
  display: grid;
  grid-template-columns: 1fr 160px;
  gap: 32px;
  max-width: var(--max-width);
  margin: 0 auto;
  align-items: start;
}

/* ---- 侧边目录（桌面端） ---- */
.toc-sidebar {
  position: sticky;
  top: calc(var(--nav-height) + 32px);
  padding-left: 16px;
  border-left: 1px solid var(--color-border);
}

.toc-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 16px;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.toc-item {
  margin-bottom: 6px;
  line-height: 1.4;
}

.toc-l3 {
  padding-left: 14px;
}

.toc-link {
  display: block;
  font-size: 0.85rem;
  color: var(--color-text-muted);
  text-decoration: none;
  padding: 3px 0;
  transition: color var(--transition);
  cursor: pointer;
}

.toc-link:hover {
  color: var(--color-accent);
}

/* ---- 移动端折叠目录 ---- */
.toc-mobile {
  display: none;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  margin-bottom: 24px;
  overflow: hidden;
}

.toc-mobile summary {
  padding: 12px 16px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-primary);
  background: var(--color-bg);
  cursor: pointer;
  list-style: none;
}

.toc-mobile summary::-webkit-details-marker { display: none; }
.toc-mobile summary::before { content: '▸ '; color: var(--color-accent); }
.toc-mobile[open] summary::before { content: '▾ '; }

.toc-mobile .toc-list {
  padding: 12px 16px;
  border-top: 1px solid var(--color-border);
}

/* ---- 文章主体 ---- */
.article-detail {
  min-width: 0;
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

.article-header { margin-bottom: 40px; }

.article-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1.35;
  margin-bottom: 16px;
}

.article-meta {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.meta-sep { color: var(--color-border); }
.article-category { color: var(--color-accent); font-weight: 500; }
.article-tag { color: var(--color-accent); font-weight: 500; }
.article-tag::before { content: '#'; opacity: 0.5; }

/* ---- Markdown 渲染内容样式 ---- */
.article-body :deep(h2) {
  font-size: 1.5rem; font-weight: 600; color: var(--color-primary);
  margin: 40px 0 16px; padding-bottom: 8px;
  border-bottom: 1px solid var(--color-border);
  scroll-margin-top: calc(var(--nav-height) + 16px);
}

.article-body :deep(h3) {
  font-size: 1.2rem; font-weight: 600; color: var(--color-primary);
  margin: 32px 0 12px;
  scroll-margin-top: calc(var(--nav-height) + 16px);
}

.article-body :deep(p) {
  margin-bottom: 20px; line-height: 1.85; color: var(--color-secondary);
}

.article-body :deep(strong) { color: var(--color-text); font-weight: 600; }

.article-body :deep(blockquote) {
  border-left: 3px solid var(--color-accent); padding: 8px 20px;
  margin: 24px 0; color: var(--color-text-muted);
  background: rgba(37, 99, 235, 0.04); border-radius: 0 4px 4px 0;
}

.article-body :deep(.wide) {
  width: calc(100% + 32px + 160px);
  margin-right: calc(-32px - 160px);
}

/* float-panel 标记在文章流中隐藏，内容移至浮窗 */
.article-body :deep(.float-panel) {
  display: none;
}

.article-body :deep(pre) {
  background: #1e1e2e; border-radius: var(--radius);
  padding: 20px 24px; overflow-x: auto; margin: 24px 0;
  font-size: 0.9rem; line-height: 1.6;
}

.article-body :deep(pre code) {
  color: #cdd6f4; font-family: 'Consolas', 'Monaco', monospace;
}

.article-body :deep(code) { font-family: 'Consolas', 'Monaco', monospace; font-size: 0.9em; }

.article-body :deep(:not(pre) > code) {
  background: rgba(37, 99, 235, 0.08); color: var(--color-accent);
  padding: 2px 6px; border-radius: 3px;
}

.article-body :deep(.katex-display) {
  margin: 28px 0; overflow-x: auto; overflow-y: hidden;
}

.article-body :deep(.katex) { font-size: 1.1em; }

.article-body :deep(details) {
  border: 1px solid var(--color-border); border-radius: var(--radius);
  margin: 24px 0; overflow: hidden;
}

.article-body :deep(summary) {
  padding: 14px 20px; font-size: 0.95rem; font-weight: 500;
  color: var(--color-primary); background: var(--color-bg);
  cursor: pointer; user-select: none; transition: background var(--transition);
  list-style: none;
}

.article-body :deep(summary)::-webkit-details-marker { display: none; }
.article-body :deep(summary)::before {
  content: '▸ '; display: inline-block; transition: transform 0.2s ease;
  font-size: 0.85rem; color: var(--color-accent);
}
.article-body :deep(details[open] > summary)::before { content: '▾ '; }
.article-body :deep(summary):hover { background: rgba(37, 99, 235, 0.04); }
.article-body :deep(details .details-content) {
  padding: 20px 24px; border-top: 1px solid var(--color-border);
}
.article-body :deep(details .details-content pre) { margin: 12px 0; }
.article-body :deep(details .details-content pre:last-child) { margin-bottom: 0; }

.article-body :deep(.compare) {
  display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 24px 0;
}
.article-body :deep(.compare-panel) { min-width: 0; }
.article-body :deep(.compare-panel pre) { margin: 12px 0 0; font-size: 0.82rem; }
.article-body :deep(.compare-panel table) { margin-top: 8px; font-size: 0.85rem; }

.article-body :deep(img) {
  max-width: 100%; border-radius: var(--radius); margin: 24px auto;
}

/* ---- 浮动翻译窗 ---- */
.float-window {
  position: fixed;
  z-index: 200;
  width: 380px;
  max-height: 70vh;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  user-select: none;
}

.float-window--collapsed {
  width: auto;
  max-height: none;
}

.float-window-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-border);
  cursor: move;
  flex-shrink: 0;
}

.float-window-title {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-primary);
}

.float-window-actions {
  display: flex;
  gap: 4px;
}

.float-window-btn {
  width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  transition: background var(--transition), color var(--transition);
}

.float-window-btn:hover {
  background: rgba(0, 0, 0, 0.06);
  color: var(--color-text);
}

.float-window-body {
  padding: 16px;
  overflow-y: auto;
  font-size: 0.88rem;
  line-height: 1.65;
  color: var(--color-secondary);
  flex: 1;
}

.float-window-body :deep(table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
}

.float-window-body :deep(th),
.float-window-body :deep(td) {
  padding: 6px 10px;
  text-align: left;
  border-bottom: 1px solid var(--color-border);
}

.float-window-body :deep(pre) {
  background: #1e1e2e;
  border-radius: 4px;
  padding: 12px 14px;
  overflow-x: auto;
  font-size: 0.78rem;
  line-height: 1.5;
  margin: 8px 0;
}

.float-window-body :deep(pre code) {
  color: #cdd6f4;
  font-family: 'Consolas', 'Monaco', monospace;
}

.float-window-body :deep(code) {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.88em;
}

.float-window-body :deep(:not(pre) > code) {
  background: rgba(37, 99, 235, 0.08);
  color: var(--color-accent);
  padding: 1px 5px;
  border-radius: 3px;
}

/* 文章未找到 */
.not-found {
  text-align: center;
  padding: 60px 0;
  color: var(--color-text-muted);
}

/* ---- 响应式 ---- */
@media (max-width: 860px) {
  .article-page {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .toc-sidebar { display: none; }
  .toc-mobile { display: block; }

  .article-body :deep(.wide) {
    width: 100%;
    margin-right: 0;
  }

  .float-window {
    width: calc(100vw - 32px);
    left: 16px !important;
    right: 16px;
    bottom: 16px;
    top: auto !important;
    max-height: 50vh;
  }
}

@media (max-width: 680px) {
  .article-body :deep(.compare) {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .article-title { font-size: 1.5rem; }
  .article-body :deep(pre) { padding: 16px; font-size: 0.82rem; }
}
</style>
