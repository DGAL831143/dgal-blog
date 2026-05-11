---
title: Vue3 Composition API 实战技巧
date: 2026-04-28
tags: [Vue3, JavaScript]
category: 前端开发
summary: 通过几个真实场景，理解 Composition API 如何让代码组织更清晰。
---

Composition API 是 Vue3 最重要的新特性之一。它解决的核心问题是：当组件变复杂时，Options API 会迫使你把相关逻辑分散在不同的选项中。

## 场景一：封装列表请求逻辑

你可以把 `loading`、`error`、`data` 三个状态封装成一个 composable：

```js
// composables/useFetch.js
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  async function execute() {
    loading.value = true
    try {
      const res = await fetch(url)
      data.value = await res.json()
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, execute }
}
```

这样在任何需要请求数据的组件中，一行代码就够了。

## 场景二：事件监听

用 composable 封装事件监听，自动在 `onMounted` 时添加、`onUnmounted` 时移除：

```js
import { onMounted, onUnmounted } from 'vue'

export function useEventListener(target, event, callback) {
  onMounted(() => target.addEventListener(event, callback))
  onUnmounted(() => target.removeEventListener(event, callback))
}
```

不再需要手动管理生命周期。

## 场景三：组合多个 composable

多个 composable 可以任意组合。一个组件可以同时使用 `useAuth`、`useTheme`、`useFetch`，而不会产生命名冲突。

使用 Composition API 的关键是：**把逻辑抽成有意义的 composable**，而不是机械地把所有代码都放进 setup。
