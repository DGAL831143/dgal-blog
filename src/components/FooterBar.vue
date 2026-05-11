<script setup>
// 底部版权栏：极简风格，居中展示
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="footer-inner">
      <p class="footer-text">&copy; {{ currentYear }} 极简博客. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--color-border);
  padding: 32px 32px;
}

.footer-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  text-align: center;
}

.footer-text {
  font-size: 0.85rem;
  color: var(--color-text-muted);
}
</style>
