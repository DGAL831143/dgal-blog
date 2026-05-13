<script setup>
import { getSeries } from '../utils/loadPosts.js'

const seriesList = getSeries()
</script>

<template>
  <div class="series-page">
    <header class="series-hero">
      <h1 class="series-title">系列文章</h1>
      <p class="series-desc">按系列浏览文章，体系化阅读。</p>
    </header>

    <p v-if="seriesList.length === 0" class="series-empty">暂无系列</p>

    <ul class="series-list">
      <li v-for="s in seriesList" :key="s.slug" class="series-card">
        <router-link :to="`/series/${s.slug}`" class="series-card-link">
          <h2 class="series-name">{{ s.name }}</h2>
          <span class="series-count">{{ s.count }} 篇文章</span>
          <ul class="series-articles">
            <li v-for="a in s.articles.slice(0, 3)" :key="a.slug" class="series-article-item">
              {{ a.title }}
            </li>
            <li v-if="s.count > 3" class="series-more">…共 {{ s.count }} 篇</li>
          </ul>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.series-page {
  max-width: var(--content-width);
  margin: 0 auto;
}

.series-hero {
  padding: 0 0 36px;
}

.series-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 12px;
  line-height: 1.3;
}

.series-desc {
  font-size: 1.05rem;
  color: var(--color-text-muted);
}

.series-empty {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  padding: 32px 0;
}

.series-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.series-card-link {
  display: block;
  padding: 24px 28px;
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  text-decoration: none;
  transition: border-color var(--transition), box-shadow var(--transition);
  cursor: pointer;
}

.series-card-link:hover {
  border-color: var(--color-accent);
  box-shadow: 0 2px 12px rgba(37, 99, 235, 0.08);
}

.series-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 6px;
}

.series-count {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}

.series-articles {
  list-style: none;
  margin-top: 12px;
  padding-left: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.series-article-item {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  padding-left: 12px;
  border-left: 2px solid var(--color-border);
}

.series-more {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  padding-left: 12px;
}

@media (max-width: 480px) {
  .series-card-link {
    padding: 16px 20px;
  }
}
</style>
