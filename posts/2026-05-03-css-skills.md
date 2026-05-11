---
title: CSS 写得好，组件就成功了一半
date: 2026-05-03
tags: [CSS, 前端]
category: 前端开发
summary: 聊聊 CSS 自定义属性、响应式布局和现代选择器如何让样式表更优雅。
---

很多人低估了 CSS 的威力。现代 CSS 已经不需要预处理器就能做到很多事情。

## CSS 自定义属性（变量）

它们在级联中工作，可以在组件级别被覆盖，这比 Sass 变量灵活得多：

```css
:root {
  --color-primary: #2563EB;
}

.card {
  background: var(--color-primary);
}

.card--dark {
  --color-primary: #1D4ED8;  /* 组件级覆盖 */
}
```

配合 `@property` 还能实现以前需要 JS 才能做的动画。

## 容器查询

`@media` 查询只能基于视口宽度，而 `@container` 查询基于父容器宽度。这让真正的组件级响应式成为可能：

```css
@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
```

## :has() 选择器

它可以根据子元素的状态来改变父元素的样式。表单验证、空状态处理等场景会变得非常简洁：

```css
.card:has(img) {
  grid-template-columns: 200px 1fr;
}
```

> **建议**：如果你正在学前端，花时间学好 CSS 比学会某一个框架更重要。CSS 的思维方式会伴随你的整个职业生涯。
