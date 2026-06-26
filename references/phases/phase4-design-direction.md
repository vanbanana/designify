# Phase 4: 设计方向 — 详细指令

---

## 布局决策树

```
页面类型判断（结合认知负荷理论选择）：
├── 信息展示为主（文章、列表、画廊）→ F型布局 或 瀑布流
│   → 最小化外在认知负荷：F型符合自然眼动（Jakob's Law）
├── 数据操作为主（表格、表单、仪表盘）→ 侧边栏+主区域 或 仪表盘网格
│   → 利用 Gestalt Proximity：相关数据模块聚在一起
├── 转化引导为主（落地页、注册、定价）→ Z型布局 或 单列故事线
│   → 利用 Peak-End Rule：高潮在中间，CTA 在结尾
├── 内容消费为主（视频、阅读、社交Feed）→ 单栏 或 双栏
│   → 最大行宽 65ch，中文行高 1.6-1.75
│   → **视频/直播页面 → 加载 `references/craft/media-and-video-pages.md`**
├── 创作编辑为主（编辑器、画布、IDE）→ 三栏 或 全屏画布+浮动面板
└── AI 交互为主（对话、生成、工作流）→ 见 AI 产品布局规则
```

---

## 布局 CSS 实现速查

| 布局模式 | CSS 实现 | 适用场景 |
|----------|----------|----------|
| F型布局 | `display: grid; grid-template-columns: 1fr;` + 内容自然流 | 文章、博客、新闻列表 |
| Z型布局 | Hero 区 `text-align: center` + CTA 底部居中 | 营销落地页、注册页 |
| 仪表盘网格 | `display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));` | 后台管理、数据看板 |
| 侧栏+主区域 | `display: grid; grid-template-columns: 1fr 300px;` | 内容平台、文档站 |
| 瀑布流 | `columns: 3; column-gap: 16px;` 或 Masonry JS 库 | 图片画廊、Pinterest 式 |
| 单栏内容 | `max-width: 65ch; margin: 0 auto;` | 长文阅读、帮助中心 |
| 三栏编辑器 | `display: grid; grid-template-columns: 64px 1fr 300px;` | IDE、设计工具 |

---

## 风格→设计系统路由

根据 Phase 1 Q3 获取的风格方向（自然语言已映射为 8 个类别），读取路由器：
→ 先读取 `references/design-systems/index.md` 确定设计框架
→ 再加载对应的品牌 DESIGN.md

**8 个风格类别及品牌参考：**

| 风格类别 | 首选品牌 | 备选品牌 |
|----------|----------|----------|
| 简洁现代 | `vercel.md` / `linear.app.md` | `raycast.md` / `framer.md` / `figma.md` |
| 专业商务 | `stripe.md` / `ibm.md` | `shopify.md` / `hashicorp.md` / `zapier.md` |
| 暗色科技 | `cursor.md` / `warp.md` | `posthog.md` / `supabase.md` / `sentry.md` |
| AI/前沿 | `claude.md` / `runwayml.md` | `cohere.md` / `mistral.ai.md` / `elevenlabs.md` |
| 活泼有趣 | `notion.md` / `spotify.md` | `slack.md` / `lovable.md` / `nike.md` |
| 温暖文艺 | `theverge.md` / `airbnb.md` | `starbucks.md` / `cal.md` / `superhuman.md` |
| 奢华高端 | `ferrari.md` / `lamborghini.md` | `bugatti.md` / `apple.md` / `tesla.md` |
| 金融科技 | `revolut.md` / `wise.md` | `coinbase.md` / `mastercard.md` / `binance.md` |

如果用户直接提到品牌名（如"像 Linear 那样"），跳过类别映射，直接加载对应品牌文件。

---

## 设计资源强制使用（禁止从零造轮子）

详见 `references/craft/design-resources.md`。**每个页面必须使用现成专业素材，禁止程序化生成图标/插画/图片。**

**图标（必须从图标库引入，禁止 SVG 手绘或 emoji）：**

| 图标库 | 引入方式 | 适用 |
|--------|----------|------|
| Lucide（首选） | `<script src="https://unpkg.com/lucide@latest"></script>` 或 `npm i lucide-react` | 现代前端，shadcn/ui 标配 |
| Heroicons | `npm i @heroicons/react` | Tailwind 项目 |
| Phosphor | `npm i @phosphor-icons/react` | 需要多种粗细 |

**插画（空状态/引导页必须有插画）：**

| 资源 | 引入方式 | 用途 |
|------|----------|------|
| unDraw | `<img src="https://undraw.co/api/illustrations/[关键词]">` 或下载 SVG | 空状态、引导页 |
| Storyset | 下载 SVG 嵌入 | 登录页、功能介绍 |

**图片（开发阶段用占位图，生产用真实图片）：**

| 场景 | URL 模板 |
|------|----------|
| 开发占位 | `https://placehold.co/600x400/e2e8f0/64748b?text=产品图片` |
| 生产图片 | `https://images.unsplash.com/photo-[id]?w=800` |

**纹理/背景（按项目类型选用）：**
- 落地页：Haikei SVG 波浪（`https://haikei.app` 生成）
- 创意项目：Hero Patterns（`https://heropatterns.com`）
- 后台系统：不用纹理

**项目类型→资源路由表：**

| 项目类型 | 图标 | 插画 | 图片 | 纹理 |
|----------|------|------|------|------|
| 后台管理系统 | Lucide 线性 | 不用 | 不用 | 不用 |
| 营销落地页 | Heroicons | unDraw + Storyset | Unsplash Hero | Haikei 波浪 |
| 电商产品页 | Material Symbols | 不用 | 真实产品图 | 不用 |
| 社交产品 | Lucide | Humaaans | 用户 UGC | 不用 |
| 创意/游戏 | Phosphor | 3dicons + Open Doodles | Unsplash | Hero Patterns |
| SaaS 官网 | Lucide | Blush 品牌化 | Unsplash | 极简 |

---

## 必须遵守的设计硬规则

不管什么风格，以下规则不可违反（详见 `references/craft/` 目录）：

**间距：** 所有间距值必须是 4 的倍数（4/8/12/16/20/24/32/48/64/96px），嵌套递进递减
**排版：** 中文行高 ≥ 1.6，英文 ≥ 1.4；字号 ≥ 14px；每页 ≤ 3 种字号；最大行宽 65ch
**对比度：** 正文 ≥ 4.5:1（WCAG AA），大文字/UI ≥ 3:1；焦点指示器 2px solid
**触控目标：** 所有可交互元素 ≥ 44×44px（Apple HIG），推荐 48px
**颜色系统：** CSS 变量，60-30-10 比例，调色板 ≤ 5 色，禁止硬编码
**暗色模式：** 背景 #121212（非 #000），文字 #E0E0E0（非 #FFF），品牌色降饱和 10-20%
**语义化 HTML：** `<button>` 不是 `<div onclick>`；`<nav>` 不是 `<div class="nav">`
**状态完整性：** 五态必须覆盖（Loading/Empty/Error/Populated/Edge）

---

## 设计性格路由（Design Character Routing）

在确定布局和风格后，必须设定页面的**设计性格（Design Character）**——三个维度的性格值：

| 轴 | 范围 | 说明 |
|----|------|------|
| **大胆度（Boldness）** | 1-10 | 设计打破常规的意愿强度 |
| **动效度（Motion）** | 1-10 | 页面主动运动的程度 |
| **密度（Density）** | 1-10 | 页面信息填充的程度 |

**详细说明：** `references/craft/design-character.md`

### 初始值路由表

根据项目类型自动设定初始值 + 风格偏移：

| 项目类型 | Boldness | Motion | Density |
|----------|----------|--------|---------|
| SaaS 后台/管理面板 | 3 | 2 | 7 |
| 营销落地页 | 7 | 5 | 3 |
| 电商产品页 | 5 | 3 | 6 |
| 品牌官网 | 7 | 6 | 2 |
| 数据仪表盘 | 3 | 2 | 8 |
| AI 产品/对话 | 6 | 7 | 5 |
| 社交/内容平台 | 5 | 4 | 6 |
| 教育平台 | 4 | 3 | 5 |
| 游戏/娱乐 | 8 | 8 | 4 |
| 开发者工具 | 4 | 3 | 8 |
| 金融/支付 | 3 | 2 | 6 |

### 风格偏移表

| 风格 | Boldness 偏移 | Motion 偏移 | Density 偏移 |
|------|--------------|-------------|--------------|
| 简洁现代 | ±0 | -1 | -1 |
| 专业商务 | -1 | -1 | +1 |
| 暗色科技 | +1 | ±0 | +1 |
| AI/前沿 | +2 | +2 | -1 |
| 活泼有趣 | +2 | +2 | ±0 |
| 温暖文艺 | -1 | +1 | -1 |
| 奢华高端 | +1 | +1 | -2 |
| 金融科技 | -1 | -1 | +1 |

### "一个令人难忘的品质"规则

每个页面必须有一个**令人难忘的品质**——用户关掉页面后能说出来的那个东西。

示例：
| 页面类型 | 令人难忘的品质 |
|----------|---------------|
| SaaS 落地页 | "那个不对称的 Hero 分割——左边文字右边全高色块" |
| 电商首页 | "卡片进入时像纸牌一样依次翻转" |
| 作品集 | "全屏视频背景+极简白色导航的对比" |
| 表单页 | "提交成功后的庆祝彩带动画" |

**如果说不出来这个页面的令人难忘的品质 = 页面不合格。**

---

## 视觉节奏选择

**详细说明：** `references/craft/visual-rhythm.md`

根据 Density 值和"一个令人难忘的品质"选择节奏模式：

| Density | 推荐节奏模式 | 间距范围 |
|---------|-------------|----------|
| 1-3（画廊式） | 开放为主，密集处少 | 64-96px |
| 4-6（均衡） | 密集→开放→中等交替 | 32-64px |
| 7-10（密集） | 紧凑为主，开放处突出 | 24-48px |

**Section 间距不能全部相同。** 至少使用 2 种不同的间距值。

---

## 颜色配给检查

**详细说明：** `references/craft/color.md` → 强调色配给制

在代码生成前确定：
1. 主色每屏最多出现几次？→ ≤ 3 次
2. 哪个是"一个大胆之举"（颜色使用上最大胆的决策）？
3. 哪些彩色元素可以替换为中性色？

---

## 铁律

```
铁律: 每个页面必须有设计性格声明（Boldness / Motion / Density），在 Design Read 中输出。
铁律: "一个令人难忘的品质"说不出来 = 页面返工。
铁律: 一页内 Section 间距至少使用 2 种不同值。
铁律: 主色每屏出现 ≤ 3 次。
```
