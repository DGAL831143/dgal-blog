<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getSeriesBySlug } from '../utils/loadPosts.js'

const route = useRoute()
const router = useRouter()

const series = computed(() => getSeriesBySlug(route.params.slug))

function goBack() {
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/series')
  }
}
</script>

<template>
  <div class="series-detail-page">
    <button class="back-link" @click="goBack">← 返回</button>

    <template v-if="series">
      <header class="series-header">
        <h1 class="series-title">{{ series.name }}</h1>
        <p class="series-count">{{ series.count }} 篇文章</p>
      </header>

      <ul class="series-articles">
        <li v-for="(a, i) in series.articles" :key="a.slug" class="series-article-item">
          <router-link :to="`/article/${a.slug}`" class="series-article-link">
            <span class="article-order">{{ i + 1 }}</span>
            <div class="article-info">
              <h2 class="article-title">{{ a.title }}</h2>
              <time class="article-date">{{ a.date }}</time>
              <p class="article-summary">{{ a.summary }}</p>
            </div>
          </router-link>
        </li>
      </ul>
    </template>

    <p v-else class="not-found">系列未找到</p>
  </div>
</template>

<style scoped>
.series-detail-page {
  max-width: var(--content-width);
  margin: 0 auto;
}

.back-link {
  display: inline-block;
  margin-bottom: 24px;
  font-size: 0.9rem;
  color: var(--color-text-muted);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-family: var(--font-family);
  transition: color var(--transition);
}

.back-link:hover {
  color: var(--color-accent);
}

.series-header {
  padding-bottom: 28px;
}

.series-title {
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 8px;
}

.series-count {
  font-size: 0.95rem;
  color: var(--color-text-muted);
}

.series-articles {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.series-article-link {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 16px 20px;
  border-radius: var(--radius);
  text-decoration: none;
  transition: background var(--transition);
  cursor: pointer;
}

.series-article-link:hover {
  background: rgba(37, 99, 235, 0.04);
}

.article-order {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-accent);
  background: rgba(37, 99, 235, 0.08);
  border-radius: 50%;
  margin-top: 2px;
}

.article-info {
  flex: 1;
  min-width: 0;
}

.article-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--color-primary);
  margin-bottom: 4px;
}

.article-date {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.article-summary {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  line-height: 1.5;
  margin-top: 6px;
}

.not-found {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  padding: 48px 0;
}

@media (max-width: 480px) {
  .series-article-link {
    gap: 12px;
    padding: 12px 8px;
  }
}
</style>
