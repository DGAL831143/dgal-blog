import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/main.css'

/* KaTeX 数学公式样式 */
import 'katex/dist/katex.min.css'
/* highlight.js 代码高亮主题 */
import 'highlight.js/styles/github.css'

const app = createApp(App)
app.use(router)
app.mount('#app')
