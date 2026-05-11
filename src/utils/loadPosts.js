/**
 * 文章加载工具
 *
 * 工作流程：
 * 1. import.meta.glob 自动扫描 posts/ 目录下所有 .md 文件
 * 2. 解析每篇文章的 frontmatter（标题、日期、标签、分类、摘要）
 * 3. markdown-it 将 Markdown 正文渲染为 HTML（含代码高亮）
 * 4. KaTeX 渲染数学公式（$...$ 行内 / $$...$$ 块级）
 *
 * 你只需要在 posts/ 目录新建 .md 文件，无需手动注册。
 */
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import katex from 'katex'

// ---- 解析 YAML frontmatter ----
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { meta: {}, body: raw }

  const meta = {}
  match[1].split('\n').forEach((line) => {
    const i = line.indexOf(':')
    if (i === -1) return
    const key = line.slice(0, i).trim()
    let val = line.slice(i + 1).trim()
    // 数组值：[a, b, c]
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map((s) => s.trim())
    }
    meta[key] = val
  })
  return { meta, body: match[2] }
}

// ---- KaTeX 数学公式预处理 ----
function renderMath(raw) {
  // 块级公式 $$...$$
  raw = raw.replace(/\$\$([\s\S]+?)\$\$/g, (_, formula) => {
    try {
      return katex.renderToString(formula.trim(), {
        displayMode: true,
        throwOnError: false,
      })
    } catch {
      return `<pre>${formula.trim()}</pre>`
    }
  })
  // 行内公式 $...$
  raw = raw.replace(/(?<!\$)\$(.+?)\$(?!\$)/g, (_, formula) => {
    try {
      return katex.renderToString(formula.trim(), {
        displayMode: false,
        throwOnError: false,
      })
    } catch {
      return formula
    }
  })
  return raw
}

// ---- 初始化 markdown-it ----
const md = new MarkdownIt({
  html: true, // 允许 KaTeX 生成的 HTML 通过
  typographer: true, // 自动转换引号、破折号
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return ''
  },
})

// ---- 标题 ID 自动生成（供侧边目录锚点跳转） ----
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w一-鿿]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const defaultHeadingOpen = md.renderer.rules.heading_open ||
  ((tokens, idx, options, env, self) => self.renderToken(tokens, idx, options))

md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
  const token = tokens[idx]
  const next = tokens[idx + 1]
  if (next && next.type === 'inline' && /^h[23]$/.test(token.tag)) {
    token.attrSet('id', slugify(next.content))
  }
  return defaultHeadingOpen(tokens, idx, options, env, self)
}

// ---- 从原始 markdown 提取标题列表 ----
function extractHeadings(rawBody) {
  const headings = []
  const lines = rawBody.split('\n')
  for (const line of lines) {
    const m = line.match(/^(#{2,3})\s+(.+)/)
    if (m) {
      headings.push({
        level: m[1].length, // 2 = h2, 3 = h3
        text: m[2].replace(/[#*`~_]/g, '').trim(),
        id: slugify(m[2].replace(/[#*`~_]/g, '').trim()),
      })
    }
  }
  return headings
}

// ---- 自动扫描所有 .md 文件 ----
const modules = import.meta.glob('/posts/*.md', { as: 'raw', eager: true })

// ---- 导出 API ----

/** 获取全部文章列表（按日期倒序），仅含元信息不含正文 */
export function loadPosts() {
  return Object.entries(modules)
    .map(([path, raw]) => {
      const { meta, body } = parseFrontmatter(raw)
      const slug = path.replace('/posts/', '').replace('.md', '')
      return {
        slug,
        title: meta.title || '',
        date: meta.date || '',
        tags: Array.isArray(meta.tags) ? meta.tags : [],
        category: meta.category || '未分类',
        summary: meta.summary || '',
        // 延迟渲染：只在访问详情页时才渲染全文 HTML
        _rawBody: body,
      }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

/** 根据 slug 获取单篇文章（含渲染后的 HTML） */
export function getPostBySlug(slug) {
  const path = `/posts/${slug}.md`
  const raw = modules[path]
  if (!raw) return null

  const { meta, body } = parseFrontmatter(raw)
  return {
    slug,
    title: meta.title || '',
    date: meta.date || '',
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    category: meta.category || '未分类',
    summary: meta.summary || '',
    contentHTML: md.render(renderMath(body)),
    headings: extractHeadings(body),
  }
}

/** 获取所有分类列表 */
export function getCategories() {
  const cats = new Set(loadPosts().map((p) => p.category))
  return [...cats]
}

/** 按分类筛选文章 */
export function getPostsByCategory(category) {
  return loadPosts().filter((p) => p.category === category)
}
