<script setup>
/**
 * 指令速查页：按字母顺序展示所有指令
 * 数据来源：posts/commands/ 下所有 .md 文件（自动扫描）
 */
import { computed, ref } from 'vue'
import { loadCommands } from '../utils/loadPosts.js'

const commands = loadCommands()
const query = ref('')

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return commands
  return commands.filter((c) => {
    return c.title.toLowerCase().includes(q) ||
           c.summary.toLowerCase().includes(q) ||
           c.category.toLowerCase().includes(q)
  })
})
</script>

<template>
  <div class="cmds-page">
    <header class="cmds-hero">
      <h1 class="cmds-title">指令速查</h1>
      <p class="cmds-desc">
        GAMMA 常用指令参考，点击查看完整帮助文档与参数翻译。
      </p>
      <input
        v-model="query"
        type="text"
        class="cmds-search"
        placeholder="搜索指令…"
      />
    </header>

    <p v-if="query && filtered.length === 0" class="cmds-empty">无匹配指令</p>

    <ul class="cmds-list">
      <li v-for="cmd in filtered" :key="cmd.slug" class="cmds-item">
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

.cmds-search {
  width: 100%;
  margin-top: 16px;
  padding: 10px 16px;
  font-size: 0.95rem;
  font-family: var(--font-family);
  color: var(--color-primary);
  background: var(--color-card-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  outline: none;
  transition: border-color var(--transition), box-shadow var(--transition);
}

.cmds-search::placeholder {
  color: var(--color-text-muted);
}

.cmds-search:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.cmds-empty {
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  padding: 32px 0;
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
