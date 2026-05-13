<script setup>
/**
 * 文章卡片组件
 * 接收 article 对象，渲染标题、摘要、日期、标签
 * hover 时放大1.05倍 + 渐变阴影加深 + 上浮 + 圆角变大
 */
defineProps({
  article: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <article class="card">
    <router-link :to="`/article/${article.slug}`" class="card-link">
      <header class="card-header">
        <h2 class="card-title">{{ article.title }}</h2>
        <time class="card-date">{{ article.date }}</time>
      </header>

      <p class="card-summary">{{ article.summary }}</p>

      <footer class="card-footer">
        <span v-if="article.series" class="card-series">{{ article.series }}</span>
        <span
          v-for="tag in article.tags"
          :key="tag"
          class="card-tag"
        >{{ tag }}</span>
      </footer>
    </router-link>
  </article>
</template>

<style scoped>
.card {
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  transition: transform 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94),
              box-shadow 0.35s ease,
              border-radius 0.35s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-6px) scale(1.05);
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.04),
    0 12px 24px rgba(0, 0, 0, 0.06),
    0 24px 48px rgba(0, 0, 0, 0.08);
  border-radius: 16px;
}

.card-link {
  display: block;
  padding: 28px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--color-primary);
}

.card-date {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  white-space: nowrap;
  padding-top: 4px;
}

.card-summary {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  line-height: 1.7;
  margin-bottom: 16px;
}

.card-footer {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.card-tag {
  display: inline-block;
  padding: 3px 10px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-accent);
  background: rgba(37, 99, 235, 0.08);
  border-radius: 4px;
}

.card-series {
  display: inline-block;
  padding: 3px 10px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--color-text-muted);
  background: rgba(0, 0, 0, 0.04);
  border-radius: 4px;
}

/* 移动端适配 */
@media (max-width: 480px) {
  .card-link {
    padding: 20px;
  }

  .card-header {
    flex-direction: column;
    gap: 4px;
  }

  .card-title {
    font-size: 1.1rem;
  }
}
</style>
