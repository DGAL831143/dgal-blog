<script setup>
/**
 * 指令速查页：按字母顺序展示所有指令
 * 数据来源：posts/commands/ 下所有 .md 文件（自动扫描）
 */
import { loadCommands } from '../utils/loadPosts.js'

const commands = loadCommands()
</script>

<template>
  <div class="cmds-page">
    <header class="cmds-hero">
      <h1 class="cmds-title">指令速查</h1>
      <p class="cmds-desc">
        GAMMA 常用指令参考，点击查看完整帮助文档与参数翻译。
      </p>
    </header>

    <ul class="cmds-list">
      <li v-for="cmd in commands" :key="cmd.slug" class="cmds-item">
        <router-link :to="`/command/${cmd.slug}`" class="cmds-link">
          <code class="cmds-name">{{ cmd.title }}</code>
          <span class="cmds-summary">{{ cmd.summary }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.cmds-page {
  max-width: var(--content-width);
  margin: 0 auto;
}

.cmds-hero {
  padding: 0 0 36px;
}

.cmds-title {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 12px;
  line-height: 1.3;
}

.cmds-desc {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  line-height: 1.7;
}

.cmds-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.cmds-link {
  display: flex;
  align-items: baseline;
  gap: 20px;
  padding: 12px 16px;
  border-radius: var(--radius);
  text-decoration: none;
  transition: background var(--transition);
  cursor: pointer;
}

.cmds-link:hover {
  background: rgba(37, 99, 235, 0.04);
}

.cmds-name {
  font-family: 'Consolas', 'Monaco', monospace;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-primary);
  white-space: nowrap;
}

.cmds-summary {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

@media (max-width: 480px) {
  .cmds-link {
    flex-direction: column;
    gap: 2px;
    padding: 8px 0;
  }
}
</style>
