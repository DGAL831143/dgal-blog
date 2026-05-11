<script setup>
/**
 * 首页：单栏居中布局，文章卡片占据视觉中心
 * 数据来源：posts/ 目录下所有 .md 文件（自动扫描）
 */
import { loadPosts } from '../utils/loadPosts.js'
import ArticleCard from '../components/ArticleCard.vue'

const articles = loadPosts()
</script>

<template>
  <div class="home-layout">
    <section class="hero">
      <h1 class="hero-title">嗨，欢迎来访。</h1>
      <p class="hero-desc">
        这里记录了一些关于前端开发、设计和职业成长的思考。
      </p>
    </section>

    <section class="article-list">
      <ArticleCard
        v-for="article in articles"
        :key="article.slug"
        :article="article"
      />
    </section>
  </div>
</template>

<style scoped>
.home-layout {
  max-width: var(--content-width);
  margin: 0 auto;
}

.hero {
  padding: 36px 0 44px;
}

.hero-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 12px;
  line-height: 1.3;
}

.hero-desc {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  line-height: 1.7;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (max-width: 480px) {
  .hero {
    padding: 20px 0 32px;
  }

  .hero-title {
    font-size: 1.7rem;
  }

  .hero-desc {
    font-size: 0.95rem;
  }
}
</style>
