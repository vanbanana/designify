# 设计资源路由 — 按场景选择资源

> 使用现成专业素材，不要程序化生成。
> 每个图标名称前，必须确认它真实存在于所选库中。

---

## 图标库

### 推荐顺序（按通用性）

| 图标库 | 数量 | 许可证 | 风格 | 推荐场景 |
|--------|------|--------|------|----------|
| **Lucide** | 1,600+ | ISC | 线性/现代 | 通用首选，shadcn/ui 标配 |
| **Phosphor** | 9,000+ | MIT | 6 种粗细变体 | 需要多种视觉权重时 |
| **Heroicons** | 300+ | MIT | 描边+实心双风格 | Tailwind 生态 |
| **Tabler Icons** | 5,900+ | MIT | 线性 | 数量最多，覆盖面最广 |
| **Radix Icons** | 300+ | MIT | 线性/克制 | shadcn/ui 内部组件 |
| **Remix Icon** | 3,000+ | Apache 2.0 | 线性+填充 | 中文项目首选 |
| **HugeIcons** | 4,000+ | MIT | 现代/粗线 | 需要粗线条风格 |
| **Material Symbols** | 2,500+ | Apache 2.0 | 圆角/描边/锐利 | Android/Material 项目 |

### 每库已验证的安全名称

#### Lucide（前 30 个最常用 + 完全安全的）

```
search, menu, x, check, chevron-right, chevron-left, chevron-down, arrow-right,
arrow-left, plus, minus, home, user, settings, mail, bell, heart, star, clock,
calendar, upload, download, edit, trash-2, copy, file, folder, image, map-pin, phone
```

**⚠️ Lucide 易错名称：**
- ❌ `setting` → ✅ `settings`（复数）
- ❌ `Search` → ✅ `search`（全小写）
- ❌ `search-icon` → ✅ `search`（无 Icon 后缀）
- ❌ `loading` → ✅ `loader` 或 `loader-2`
- ❌ `mask` → ❌ Lucide 中不存在（可以用 `eye-off` 替代）

#### Phosphor（前 20 个—注意 Phosphor 首字母大写驼峰）

```
House, User, Gear, Bell, MagnifyingGlass, X, Check, Heart, Star, Clock,
CalendarBlank, Envelope, ArrowRight, Plus, Trash, NotePencil, Camera,
FileText, ChartBar, ChatCircle
```

**React 导入语法：** `import { House, User } from '@phosphor-icons/react'`
**CDN 使用：** `<i class="ph ph-house"></i>`（小写连字符格式）

#### Heroicons（前 20 个—全小写连字符）

```
magnifying-glass, x-mark, check, chevron-right, arrow-right, plus, home,
user, cog-6-tooth, bell, envelope, heart, star, clock, calendar, paper-clip,
trash, pencil, chart-bar, chat-bubble-left-right
```

**⚠️ Heroicons 易错：**
- ❌ `search` → ✅ `magnifying-glass`（Heroicons 不使用通用名）
- ❌ `settings` → ✅ `cog-6-tooth` 或 `cog-8-tooth`
- ❌ 实心版在名称后加 `-solid`（如 `x-mark-solid`）
- ❌ `chevron-right-icon` → ✅ `chevron-right`

#### Tabler Icons（前 20 个—全小写连字符）

```
search, menu-2, x, check, chevron-right, arrow-right, plus, home, user,
settings, mail, bell, heart, star, clock, calendar, upload, download, edit, trash
```

**CDN 使用：** `<i class="ti ti-search"></i>`（前缀 `ti ti-`）

#### Radix Icons（前 20 个—全小写连字符）

```
magnifying-glass, hamburger-menu, cross-1, check, chevron-right, arrow-right,
plus, home, person, gear, envelope-open, bell, heart, star, clock, calendar,
upload, download, pencil-2, trash
```

**React 导入：** `import { MagnifyingGlassIcon } from '@radix-ui/react-icons'`（注意加 `Icon` 后缀）

#### Remix Icon（前 20 个—中文项目首选）

```
search-line, menu-line, close-line, check-line, arrow-right-s-line, add-line,
home-line, user-line, settings-3-line, mail-line, notification-3-line,
heart-line, star-line, time-line, calendar-line, upload-2-line, download-2-line,
edit-line, delete-bin-line, chat-1-line
```

**填充版：** 将 `-line` 替换为 `-fill`

#### HugeIcons（前 10 个）

```
search-01, menu-01, cancel-01, tick-01, arrow-right-01, add-01, home-01,
user-01, settings-01, notification-01
```

### 图标通用规则

- **一个项目只用一个图标库**，绝不混用
- **图标尺寸统一**：16px（内联）/ 20px（按钮内）/ 24px（导航）/ 32px（大图标）
- **对齐方式**：`display: flex; align-items: center`，不用 `vertical-align`
- **颜色**：所有图标必须用 `currentColor`，禁止硬编码颜色值
- **描边宽度**：统一为 1.5px（标准）或 2px（粗体），项目内一致
- **禁止用 emoji 作为功能图标**（仅限非正式/趣味场景）
- **手绘禁令**：绝不手写 SVG 图标路径。缺少图标时换一个库或组合基础形状

### CDN / 安装方式（版本锁定）

```html
<!-- Lucide (首选) — 锁定 v0.473.0 -->
<script src="https://unpkg.com/lucide@0.473.0/dist/umd/lucide.min.js"></script>
<!-- 备用 CDN -->
<script src="https://cdn.jsdelivr.net/npm/lucide@0.473.0/dist/umd/lucide.min.js"></script>
<!-- React: npm install lucide-react@0.473.0 -->

<!-- Phosphor — 锁定 v2.1 -->
<script src="https://unpkg.com/@phosphor-icons/web@2.1"></script>
<!-- React: npm install @phosphor-icons/react@2.1 -->

<!-- Heroicons -->
<!-- React: npm install @heroicons/react@2.2 -->

<!-- Tabler Icons — 锁定 v3.24 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.24/tabler-icons.min.css">

<!-- Radix Icons -->
<!-- React: npm install @radix-ui/react-icons@1.3 -->

<!-- Remix Icon — 锁定 v4.5 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/remixicon@4.5/fonts/remixicon.css">

<!-- Material Symbols -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
```

### 🚨 图标常见错误（导致图标错位/不显示）

| 错误类型 | ❌ 错误写法 | ✅ 正确写法 | 原因 |
|----------|------------|------------|------|
| **名称拼写** | `data-lucide="setting"` | `data-lucide="settings"` | Lucide 使用复数形式 |
| **名称大小写** | `data-lucide="Search"` | `data-lucide="search"` | Lucide 全小写连字符格式 |
| **多余后缀** | `data-lucide="search-icon"` | `data-lucide="search"` | Lucide 无 `-icon` 后缀 |
| **不存在名称** | `data-lucide="mask"` | `data-lucide="eye-off"` | mask 在 Lucide 中不存在 |
| **viewBox 缺失** | `<svg>` | `<svg viewBox="0 0 24 24">` | 缺少 viewBox 图标不渲染 |
| **颜色硬编码** | `<path fill="#333">` | `<path fill="currentColor">` | 暗色模式不匹配 |
| **aria-hidden** | 无 | `aria-hidden="true"` | 屏幕阅读器会读图标路径 |
| **strokeWidth 不统一** | 未指定 | `stroke-width="1.5"` | 风格不一致 |
| **Heroicons 误用通用名** | `search` | `magnifying-glass` | Heroicons 命名独特 |
| **Phosphor CDN/React 名混用** | `<i class="ph ph-House">` | `<i class="ph ph-house">` | Phosphor CDN 用连字符 |
| **Tabler 缺少前缀** | `class="search"` | `class="ti ti-search"` | Tabler 必须加 `ti ti-` 前缀 |

---

## 品牌 Logo 资源

| 资源 | 数量 | 许可证 | 用法 |
|------|------|--------|------|
| **Simple Icons** | 3,400+ | MIT | `https://cdn.simpleicons.org/{slug}/{color}` — 例：`https://cdn.simpleicons.org/github` |
| **SVGL** | 600+ | 开源 | 品牌 SVG 矢量，含多种变体 |
| **Brandfetch** | 22M+ | 付费 | 企业级品牌资源 API |
| **Devicon** | 200+ | MIT | 技术栈 Logo：`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg` |

**规则：**
- 技术品牌优先用 Simple Icons CDN（零依赖，仅一个 URL）
- 开源项目用 Devicon
- 不知道 slug 时去 simpleicons.org 查

---

## 插画资源

| 资源 | 风格 | 许可证 | 适用场景 |
|------|------|--------|----------|
| **unDraw** | 扁平矢量，可定制颜色 | 免费 | 空状态、引导页、错误页 |
| **Storyset** | 多种风格（扁平/等距/手绘） | 免费 | 登录页、关于我们、功能介绍 |
| **Open Doodles** | 手绘涂鸦 | CC0 | 轻松活泼风格的博客/社交 |
| **Humaaans** | 人物组合 | 免费 | 团队协作、用户画像 |
| **Blush** | 可定制人物插画 | 免费 | 品牌化插画需求 |

### 生成式插画（当库存不够用时）

| 工具 | 价格 | 风格 | 推荐场景 |
|------|------|------|----------|
| **Recraft V4** | $0.04/img | **唯一生产级 SVG 输出** | 品牌化插画、空状态、自定义场景 |
| **Nanobanana 2** | 免费可用 | 角色一致性 | 引导页、人物插画、头像生成 |
| **Midjourney v8** | $0.14/img | 高美学质量 | 封面图、Hero 背景 |
| **DALL·E 3** | $0.04/img | 通用 | 快速原型插画 |

**规则：**
- 空状态/引导页必须有插画，不能只有文字
- 插画颜色必须匹配品牌色
- 库存插画优先于生成式插画（成本更低、风格可控）
- 生成式插画仅用于库存缺乏且品牌化需求强的场景
- **禁止用 emoji 代替插画**

---

## 图片资源

| 资源 | 类型 | 用途 |
|------|------|------|
| **Unsplash** | 高质量摄影 | 文章封面、产品展示、Hero 区域 |
| **Pexels** | 免费摄影+视频 | 同上 |
| **picsum.photos** | 占位图 | 确定性种子占位：`https://picsum.photos/seed/{context}/800/600` |
| **placehold.co** | 占位图 | 简单占位：`https://placehold.co/600x400/e2e8f0/64748b?text=标题` |

**规则：**
- 开发阶段用 `picsum.photos/seed/{描述词}`（种子确定性保证图片不随机变）
- 生产环境用 Unsplash/Pexels 真实图片
- 照片用 WebP/JPEG，图标用 SVG，截图用 PNG
- 非首屏图片用 `loading="lazy"`
- 所有 `<img>` 必须设置 `width` 和 `height` 防止 CLS
- 每个占位图添加 HTML 注释：`<!-- TODO: 替换为真实图片，推荐尺寸 1200×800 -->`

---

## 设备框架 / Mockup

| 资源 | 类型 | 用途 |
|------|------|------|
| **Browserframe** | HTML/CSS | 浏览器窗口、手机、平板设备框 — 展示截图用 |
| **Ray.so** | Web 工具 | 代码截图美化（带 Mac 窗口 chrome） |
| **Device Shots** | Web 工具 | 多设备同框展示 |
| **Mockup.style** | Web 工具 | 自定义场景 Mockup |

**规则：**
- 营销落地页的截图展示区必须用设备框架，不能裸截图
- 后台功能截图用 Browserframe 自带 Mac 窗口 chrome

---

## 纹理/背景

| 资源 | 类型 | 用途 |
|------|------|------|
| **Hero Patterns** | SVG 纹理图案 | 区块背景纹理（重复图案） |
| **Haikei** | SVG 波浪/曲线生成器 | Hero 区域背景分隔 |
| **fffuel.co** | SVG 生成器合集 | 渐变网格、波浪、Blob、分层形状 |
| **Mesh Gradient Generator** | 网格渐变 | 抽象渐变背景 |
| **BGJar** | SVG 背景生成器 | 装饰性背景 |

**规则：**
- 后台管理系统不用纹理、不用渐变，信息密度优先
- 营销落地页可用 Haikei 波浪或 fffuel 分层形状分隔区块
- 创意/游戏项目可用 Hero Patterns 纹理
- **禁止装饰性渐变 blob**（不服务于功能的背景装饰）
- 纹理使用不超过页面面积的 20%

---

## 动效资源

| 资源 | 类型 | 用途 |
|------|------|------|
| **LottieFiles** | JSON 动画 | 复杂动效（加载、成功、庆祝） |
| **Rive** | .riv 动画 | 交互式动画（按钮反馈、角色动画） |

**规则：**
- Lottie/Rive 是最后手段——优先使用 CSS 动画
- 仅用于需要复杂运动图形的场景（庆祝动画、加载吉祥物）
- 所有动效必须配合 `prefers-reduced-motion` 静音

---

## 场景 → 资源路由表

| 项目类型 | 图标 | 插画 | 图片 | 纹理 | 品牌 Logo | 设备框 |
|----------|------|------|------|------|-----------|--------|
| **后台管理系统** | Lucide 线性 | 不用 | 不用 | 不用 | 不用 | 不用 |
| **营销落地页** | Heroicons | unDraw + Storyset | Unsplash Hero | Haikei 波浪 | Simple Icons | Browserframe |
| **SaaS 官网** | Lucide | Blush 品牌化 | Unsplash | 极简 | Simple Icons | Browserframe |
| **电商产品页** | Material Symbols | 不用 | 真实产品图 | 不用 | 品牌 logo | 不用 |
| **品牌官网** | Lucide | Blush 品牌化 | Unsplash Hero | fffuel.co | Simple Icons SVGL | Browserframe |
| **AI 产品/对话** | Lucide | Recraft 生成 | Unsplash AI | Haikei 波浪 | Simple Icons | 不用 |
| **数据仪表盘** | Lucide 线性 | 不用 | 不用 | 不用 | 不用 | 不用 |
| **金融系统** | Tabler | 不用 | 不用 | 不用 | 不用 | 不用 |
| **医疗健康** | Remix Icon | unDraw | Pexels | 不用 | 不用 | 不用 |
| **教育平台** | Phosphor | unDraw + Storyset | Unsplash | 极简 | 不用 | Browserframe |
| **社交产品** | Phosphor | Humaaans + Open Doodles | 用户 UGC | 不用 | Simple Icons | Device Shots |
| **开发者工具** | Radix Icons + Tabler | 不用 | 不用 | 不用 | Devicon | Ray.so |
| **创意/游戏** | Phosphor | 3dicons + Open Doodles | Unsplash | Hero Patterns | 品牌 logo | Browserframe |
| **移动端 App** | Material Symbols | Humaaans | Pexels | 不用 | 不用 | Device Shots |

### 快速选择口诀

```
后台Tabler或Lucide，落地用Hero和Wave
电商用Material，SaaS官网Lucide配Blush
AI产品Lucide加Recraft，仪表盘Lucide不吃亏
金融Tabler最安全，医疗健康Remix选
教育Phosphor加Storyset，社交Phosphor配涂鸦
开发者工具Radix + Devicon，创意Phosphor + Patterns
```

---

## 检查清单（生成代码后逐项确认）

- [ ] 只使用了一个图标库（未混用）
- [ ] 每个图标名称都在该库的已验证列表或官方文档中
- [ ] 没有 emoji 作为功能图标
- [ ] 所有图标使用 `currentColor`
- [ ] 空状态/引导页有插画（非单纯文字）
- [ ] 占位图有 `TODO` 注释标记
- [ ] 所有 `<img>` 有 `width` + `height`
- [ ] 非首屏图片有 `loading="lazy"`
- [ ] SVG 有 `viewBox="0 0 24 24"` 和 `aria-hidden="true"`
- [ ] 营销落地页的截图使用了设备框架
- [ ] 场景路由表匹配了实际项目类型