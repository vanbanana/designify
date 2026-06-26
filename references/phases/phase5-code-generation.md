# Phase 5: 代码生成 — 详细指令

---

## ⛔ HARD GATE: 技术栈确认

**在开始 Step 1 之前，必须确认技术栈已在 Phase 1 确定。** 如果未确定 → **立即停止，返回 Phase 1 补问 Q4。**

技术栈由 Phase 1 锁定，此处仅为路由表（不可跳过）：

```
框架（Phase 1 已确定，此处为目录结构路由）：
├── React + Next.js → src/pages/ + App Router 布局
├── React + Vite → src/ + .jsx 组件文件
├── Vue + Nuxt → pages/ + .vue 单文件组件
├── 单文件 HTML → 根目录 index.html + assets/
├── Tailwind CSS → tailwind.config.* + postcss 配置
└── 其他 → 按对应框架的标准目录结构

样式方案（Phase 1 已确定）：
├── Tailwind CSS → 原子化类名，postcss 构建
├── CSS Modules → *.module.css 文件
├── styled-components → CSS-in-JS
└── 内联 CSS → 单文件 HTML 的 <style> 标签

代码产物 → 项目根目录（非 output/）
├── 单文件 HTML：根目录
├── React/Vue：src/ 目录
└── 资源文件：assets/ 或 public/
```

<HARD-GATE>
**铁律 7 执行点：没有技术栈声明就不能写一行代码。**
如果 Phase 2 的产品定义文档中没有"技术栈声明"字段 → 停止，返回 Phase 2 补填。
</HARD-GATE>

---

## 询问：Mock API 服务

**进入代码生成前，询问用户：**

> 是否需要生成 Mock API 服务？
> 1. **需要** — 生成 mock-api.js（纯 Node.js 零依赖）+ docs/mock-api.md
> 2. **不需要** （已有后端/轻量项目）
> 3. **稍后再说**

选择 1 时：
- 扫描页面中的数据需求（列表/表单/登录/搜索）
- 为每个 endpoint 生成对应的 mock handler
- 写入 `mock-api.js`（技术栈无关，纯 Node.js http 模块）
- 写入 `docs/mock-api.md`（端点清单 + 启动方式）

选择 2 或 3 时：不生成 mock 文件。

---

## 生成顺序（7 + 2 步）

```
1. 先搭骨架：语义化页面结构（header/main/nav/section/article/footer）
2. 设计令牌：CSS 变量定义 → 写入 output/design-tokens.css（颜色/间距/字号/圆角/阴影）
3. 引入素材：图标库 CDN/npm + 占位图 + 插画（根据项目类型路由表选择）
   ├── 3a. 图标库预检（见下方"图标可用性预检"）
   ├── 3b. 引入选定的图标库
   └── 3c. 配置占位图 + 插画资源
4. 再填内容：真实文案（不用 lorem ipsum，用符合业务的中文内容）
5. 然后做交互：按钮状态、表单验证状态机、导航切换
   ⚠️ Step 5 强制子步骤（UI 组件完整性）：
   ├── **读 `references/craft/components.md` → 写出"本页用到的控件清单"**
   ├── 5a. 自定义所有表单控件（select/checkbox/radio/switch/textarea）
   │    ⚠️ 原生 `<select>` 加 Tailwind 不算自定义。必须替换为 Headless UI / 自定义 button+ul。
   │    ⚠️ `<input type="checkbox">` 只改宽高不算自定义。必须 appearance: none + 自定义勾号。
   ├── 5b. 自定义滚动条（::-webkit-scrollbar）
   ├── 5c. 自定义 alert/toast（禁止 window.alert/confirm/prompt）
   ├── 5d. 自定义 tooltip/pagination/spinner/progress/tag
   └── 5e. 检查同一行元素高度对齐、flex居中
6. 加状态覆盖：空状态（用 unDraw 插画）/加载骨架屏/错误状态/边界处理
7. 最后加细节：动效（遵守缓动曲线和时长阈值）、微交互

8. 🔍 **UI 组件完整性扫尾**（新增 Step — 生成结束后必须执行）：
   ├── 打开页面检查所有交互组件是否被主题化
   ├── 如果发现浏览器原生样式 → 立即替换（具体实现见 `references/craft/components.md`）
   └── 记录到质量报告

9. 🔍 **布局对齐校验**（新增 Step — 全屏截图检查）：
   ├── 检查所有 flex/grid 容器是否正确居中（align-items + justify-content）
   ├── 检查同行元素高度是否一致
   ├── 检查列表项间距是否统一
   └── 修复后进入 Phase 6
```

### 生成过程中必须执行的设计感检查

**Step 4.5 —— 强调色配给检查（在素材引入后、填写内容前）：**
- 清单上每个使用品牌色的元素，问：**"这个颜色必要吗？"**
- 主色每屏出现次数 ≤ 3 次（详见 `references/craft/color.md` → 强调色配给制）
- 如果超过 3 次，删除多余的品牌色使用，替换为中性色

**Step 5.5 —— 视觉节奏检查（在填写内容后、做交互前）：**
- Section 间距是否全部相同？如果是，**这是模板。** 修改为至少 2 种不同值
- 检查节奏模式：密集 → 开放 → 中等（详见 `references/craft/visual-rhythm.md`）
- 标题下方间距 < 标题上方间距

**Step 7.5 —— "令人难忘的品质"验证（动效完成后）：**
- 问自己：**"关掉这个页面后，用户能记住的一个东西是什么？"**
- 如果不能回答 → 添加一个"一个大胆之举"
- 这个品质必须与 Phase 3 Design Read 中声明的设计性格一致
- 记录在质量报告中

**Step 7.7 —— 红队自审（每个交互组件完成后）：**

对刚写完的每个交互组件，回答以下问题。**任意一个答不上来 → 重写该组件。**

### Cross-platform
1. "如果用户操作系统是 Windows，这个组件看起来还像品牌色吗？"
   → 特别是 select 下拉面板（原生蓝底）、checkbox 勾号（系统默认）、scrollbar 滑块（Win 窄条）
2. "在 375px 和 1440px 两个极端宽度下，布局都正常吗？"
   → 只在一个宽度下测试过 = 没做完

### States & Edge Cases
3. "这个组件的 focus / hover / disabled / loading 都有定义吗？"
   → 只写了 default = 没写完
4. "如果数据为空，这个组件显示什么？"
   → 空白页面 ≠ 空状态。必须有插画/提示/引导。
5. "如果网络请求失败，用户看到什么？"
   → 无限 loading 不算是错误状态。必须有错误提示 + 重试入口。
6. "用户填了 500 字提交，表单崩溃了怎么办？"
   → 长文本/特殊字符/XSS 都需要处理。

### Accessibility & Robustness
7. "不用鼠标，只用 Tab 键能走完这个页面吗？"
   → tabIndex 缺失或顺序错乱 = 键盘用户无法使用。
8. "屏幕阅读器能读这个组件吗？"
   → icon-only 按钮必须有 aria-label，图片必须有 alt，自定义 checkbox 必须有 role。
9. "如果 CSS 加载失败，组件还能用吗？"
   → 依赖 CSS 的交互（如 checkbox::after 勾号）需要确保无样式时可访问。
10. "如果字体没加载出来，页面还能读吗？"
    → font-family fallback 必须写。万一网络字体挂了，用户看到的是系统字体。

### Layout & Visual
11. "同行元素高度一致吗？宽度一致吗？"
    → grid 内的卡片必须等高。一行内的按钮/输入框必须等高。
12. "暗色模式下每个颜色都看得清吗？"
    → 只在浅色模式下测试过 = 暗色模式可能有对比度问题。
13. "文字超长时会发生什么？"
    → 标题/描述超长必须用 line-clamp 或 text-overflow: ellipsis，不能撑破布局。
14. "组件是不是用了 flex 居中？"
    → 经常犯的错：父容器没设 `display: flex; align-items: center; justify-content: center`，`margin: 0 auto` 只对 block 元素生效。
15. "左右两栏的内容在外边距上对称吗？"
    → 常见错误：左侧 `ml-4`、右侧 `mr-6`，左宽右窄看着不对称。双栏布局的 padding/margin 必须镜像对称。
16. "内边距是不是只设了一侧？"
    → `padding-left: 16px` 没有 `padding-right: 16px` = 一边贴边一边有间距，视觉重心偏移。任何 padding/margin 必须成对出现，除非有明确理由（如贴边导航）。
17. "容器宽度有没有写死？"
    → `width: 400px` 在 375px 手机上溢出。必须用 `max-width: 100%` 或 `width: 100%` + `max-width: 400px`。
18. "外层容器有没有加 overflow: hidden？"
    → 有些卡片内的文字溢出是因为外层容器没加 overflow，导致内容撑出边界了。
19. "text-align 有没有被忽略？"
    → flex 容器内的文字不会自动居中，要加 `text-align: center`。grid 容器同理。
20. "水平间距（gap / space-x）在换行后还正常吗？"
    → 一行的 gap 正常，但换行后右侧多出来一个 gap → 用 grid 而不是 flex gap 处理。

**Step 6.5 —— 组件文档生成（状态预览）：**
- 为核心组件写入 `docs/components/<name>.md`
- 每个文件包含 default / loading / empty / error / edge 状态代码块
- 格式见 `references/craft/component-documentation.md`

**Step 6.6 —— 🧪 组件状态画廊（实验性功能 — 询问用户）：**
- 询问："是否需要将所有组件状态渲染为一个 HTML 画廊，方便快速浏览？"
- 用户选择"是" → **AI 直接生成** `output/component-gallery.html`
  - 读取 `docs/components/*.md` 中所有 ````html preview` 代码块
  - 收集项目 CSS 文件注入 `<style>`
  - 按组件分组，每组内 grid 展示所有状态
  - 每个状态卡片标注状态名称和类型（default/loading/empty/error/edge）
  - 生成后提示用户浏览器打开
- 用户选择"否" → 跳过

**Step 7.6 —— API 契约推导（生成结束后执行）：**
- 扫描代码中所有 fetch / axios / $.ajax 调用
- 提取：method, path, 请求字段, 响应处理, 错误处理
- 写入 `docs/api-contract.md`（含 🟢/🟡/🔴 校验标记）
- 格式见 `references/craft/api-contract-standards.md`

---

## 五态覆盖（每个列表/表格/表单页面必须实现）

详见 `references/craft/state-coverage.md`。

1. **Loading（加载中）** — 骨架屏（结构匹配真实内容），不是空白或 Spinner
2. **Empty（空数据）** — 插画 + 引导文案 + 行动按钮，不是"暂无数据"
3. **Error（错误）** — 错误原因 + 重试按钮，不是白屏
4. **Populated（有数据）** — 正常展示
5. **Edge（边界）** — 超长文本 ellipsis，大数字千分位，极多数据分页

---

## 图标可用性预检（Step 3 子步骤 — 必须执行）

> 使用未知图标名称会导致构建失败或页面无图标。每次选择图标库后必须执行此预检。

### 预检流程

```
1. 确定使用的图标库（Lucide / Heroicons / Phosphor / Tabler）
2. 列出所有要使用的图标名称
3. 验证每个图标名称在所选库中真实存在
4. 确认无误后再引入代码
```

### 各图标库验证方式

| 图标库 | 验证方式 |
|--------|----------|
| **Lucide** | 官方图标列表: https://lucide.dev/icons/ — 或查询 `lucide-react` 包的导出列表 |
| **Heroicons** | 官方图标列表: https://heroicons.com/ — 或查询 `@heroicons/react` 导出 |
| **Phosphor** | 官方图标列表: https://phosphoricons.com/ — 或查询 `@phosphor-icons/react` 导出 |
| **Tabler** | 官方图标列表: https://tabler.io/icons — 注意前缀 `ti ti-` |

### 常见不存在的图标名称（会导致构建失败）

```
❌ Mask             → Lucide 中不存在
❌ ArrowUp          → Heroicons 中为 ArrowUpIcon 或 ArrowUp 带后缀
❌ Loading          → 用 Loader / Loader2
❌ Setting          → 用 Settings（复数）
❌ SearchIcon       → Search 就够了，加 Icon 后缀在某些库中不存在
```

### 规则

- **禁止使用未经验证的图标名称** — 不要凭记忆猜测名称
- **一个项目只用一个图标库** — 不混用
- 使用前先验证，防止 Phase 5 生成的代码在运行时丢失图标

---

## Website Analyzer 输出验证（有参考 URL 时执行）

在 Phase 1 运行 `website-analyzer.mjs` 后，验证分析结果的有效性：

### 验证条件

| 条件 | 判定 | 操作 |
|------|------|------|
| CSS 规则提取 < 5KB | ❌ 分析失效 | Fallback 到品牌 DESIGN.md + 平台哲学 |
| 设计令牌 Section 为空（无颜色/间距/排版数据） | ❌ 分析失效 | Fallback 到品牌 DESIGN.md + 平台哲学 |
| 正常提取（CSS > 5KB 且有设计令牌） | ✅ 有效可用 | 在 Phase 4 Design Direction 中使用分析结果 |

### Fallback 流程

```
分析结果失效 → 读取 references/craft/platform-philosophy.md 确定平台基线
             → 根据 Phase 1 风格映射查找对应的品牌 DESIGN.md
             → 使用品牌 DESIGN.md 的设计令牌替代 analyzer 的 CSS 变量
             → 在 Design Read 中注明 "website-analyzer 失效，使用 [品牌] 设计系统替代"
```

```
缓动曲线：进入用减速(0,0,0.2,1) / 离开用加速(0.4,0,1,1) / 标准(0.4,0,0.2,1)
禁止 linear（进度条除外）
时长：微交互 100-150ms / 中等过渡 200-300ms / 页面过渡 300-400ms
只动画 transform 和 opacity，禁止动画 width/height/top/left
必须支持 prefers-reduced-motion
```

---

## AI 产品额外规则

如果项目是 AI 产品（对话/生图/视频/编程/Agent），读取：
→ `references/ai-products/index.md` 匹配 AI 产品类型并获取完整的页面清单和核心布局
→ 注意：所有 10 种 AI 产品模式都在这个文件内，不需要加载额外文件

AI 产品通用要求：
- 流式输出：打字机效果 + 停止生成按钮
- Agent 步骤展示：思考中/调用工具/生成中的步骤可视化
- 参数面板：温度/模型/系统提示等高级设置可折叠（利用 Hick's Law 渐进披露）
- Canvas/预览面板：AI 输出物的实时预览区域
