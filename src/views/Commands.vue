<script setup>
/**
 * 指令速查页：按分类分组展示所有指令
 * 数据来源：posts/commands/ 下所有 .md 文件（自动扫描）
 */
import { computed } from 'vue'
import { loadCommands } from '../utils/loadPosts.js'

const commands = loadCommands()

// 按分类分组，组内按字母排序
const grouped = computed(() => {
  const map = {}
  for (const cmd of commands) {
    if (!map[cmd.category]) map[cmd.category] = []
    map[cmd.category].push(cmd)
  }
  // 分类排序
  const order = ['DEM 导入', '预处理', '地理编码', '精配准']
  return Object.entries(map).sort((a, b) => {
    const ia = order.indexOf(a[0])
    const ib = order.indexOf(b[0])
    if (ia === -1 && ib === -1) return a[0].localeCompare(b[0])
    if (ia === -1) return 1
    if (ib === -1) return -1
    return ia - ib
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
    </header>

    <section v-for="[cat, list] in grouped" :key="cat" class="cmds-group">
      <h2 class="cmds-cat-title">{{ cat }}</h2>
      <ul class="cmds-list">
        <li v-for="cmd in list" :key="cmd.slug" class="cmds-item">
          <router-link :to="`/command/${cmd.slug}`" class="cmds-link">
            <code class="cmds-name">{{ cmd.title }}</code>
            <span class="cmds-summary">{{ cmd.summary }}</span>
          </router-link>
        </li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.cmds-page {
  max-width: var(--content-width);
  margin: 0 auto;
}

.cmds-hero {
  padding: 0 0 44px;
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

.cmds-group {
  margin-bottom: 40px;
}

.cmds-cat-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-accent);
  margin-bottom: 12px;
  padding-bottom: 6px;
  border-bottom: 1px solid var(--color-border);
}

.cmds-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cmds-link {
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 10px 16px;
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
  min-width: 140px;
}

.cmds-summary {
  font-size: 0.88rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

@media (max-width: 480px) {
  .cmds-link {
    flex-direction: column;
    gap: 2px;
    padding: 8px 0;
  }

  .cmds-name {
    min-width: auto;
  }
}
</style>
