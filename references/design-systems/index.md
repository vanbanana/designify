# 设计系统路由器 (Design System Router)

> 不自创设计系统。根据项目类型和用户偏好，路由到经过验证的真实设计系统 + 品牌参考 + 视觉灵感。

---

## 1. 项目类型 → 推荐设计系统

| 项目类型 | 首选框架 | 备选 | 说明 |
|----------|----------|------|------|
| SaaS 后台 / CRM / 管理面板 | **Ant Design 5** | Arco Design | 组件最全，表格/表单/布局开箱即用 |
| 开发者工具 / IDE / 终端 | **GitHub Primer** | Vercel Design | 暗色优先，等宽字体，代码组件 |
| 电商平台 / 零售 | **Shopify Polaris** | Ant Design | 商品卡片、购物车、结账流程成熟 |
| AI 对话 / 生图 / Agent | **Shadcn UI + 品牌 DESIGN.md** | — | 灵活定制，流式输出组件需自建 |
| 金融 / 支付 / 银行 | **Ant Design Pro** | — | 数据可视化、安全表单、权限体系 |
| 社交 / 内容平台 | **Tailwind + 品牌 DESIGN.md** | — | 需要高度定制，Tailwind 最灵活 |
| 移动端 App | **Material Design 3** | Ant Design Mobile | 原生交互模式，动态配色 |
| 数据仪表盘 / BI | **Ant Design Charts** | Recharts + Shadcn | 图表组件丰富，数据密度高 |
| 落地页 / 营销站 | **Tailwind + 品牌 DESIGN.md** | — | 纯展示，不需要组件库 |
| IoT / 设备面板 | **Material Design 3** | — | 工业风控件，暗色模式 |
| 游戏 / 娱乐 | **纯 CSS + 品牌 DESIGN.md** | — | 高度定制，不走标准组件路线 |
| 政府 / 政务 | **Ant Design** | — | 表单驱动，无障碍支持好 |

### 框架速查

| 框架 | 安装 | Token 方式 | 暗色模式 | 中文支持 |
|------|------|-----------|----------|----------|
| Ant Design 5 | `npm i antd` | CSS-in-JS token | ✅ 内置 | ✅ 原生 |
| Material Design 3 | `npm i @mui/material` | CSS variables | ✅ 内置 | ✅ |
| Shadcn UI | `npx shadcn@latest init` | CSS variables (HSL) | ✅ class toggle | 需配字体 |
| GitHub Primer | `npm i @primer/react` | CSS variables | ✅ 内置 | 需配字体 |
| Shopify Polaris | `npm i @shopify/polaris` | CSS custom properties | ✅ | 需配字体 |
| Open Props | CDN / `npm i open-props` | 500+ CSS variables | ✅ 媒体查询 | 需配字体 |

---

## 2. 风格意图 → 品牌参考

用户说出风格偏好后，加载对应的品牌 DESIGN.md 作为视觉参考：

### 简洁现代 / 极简
**首选参考：** `brands/vercel.md` · `brands/linear.app.md` · `brands/raycast.md` · `brands/framer.md`
**备选：** `brands/figma.md` · `brands/webflow.md` · `brands/sanity.md` · `brands/mintlify.md`
**特征：** 大量留白、单色强调、无衬线、克制阴影

### 专业商务 / 企业级
**首选参考：** `brands/stripe.md` · `brands/ibm.md` · `brands/shopify.md` · `brands/hashicorp.md`
**备选：** `brands/mastercard.md` · `brands/intercom.md` · `brands/airtable.md` · `brands/zapier.md`
**特征：** 信任感、数据密度、衬线+无衬线混排、克制配色

### 暗色科技 / 开发者
**首选参考：** `brands/vercel.md`(暗色模式) · `brands/cursor.md` · `brands/warp.md` · `brands/posthog.md`
**备选：** `brands/sentry.md` · `brands/supabase.md` · `brands/clickhouse.md` · `brands/mongodb.md`
**特征：** 深色背景、等宽字体、高对比度强调色、代码组件

### AI / 前沿科技
**首选参考：** `brands/claude.md` · `brands/cohere.md` · `brands/mistral.ai.md` · `brands/runwayml.md`
**备选：** `brands/elevenlabs.md` · `brands/replicate.md` · `brands/together.ai.md` · `brands/x.ai.md`
**特征：** 渐变点缀、深色主题、流式交互组件、科技感排版

### 活泼有趣 / 消费级
**首选参考：** `brands/notion.md` · `brands/slack.md` · `brands/spotify.md` · `brands/lovable.md`
**备选：** `brands/nike.md` · `brands/pinterest.md` · `brands/nintendo-2001.md` · `brands/playstation.md`
**特征：** 大胆配色、大圆角、粗体标题、表情丰富

### 温暖文艺 / 内容编辑
**首选参考：** `brands/theverge.md` · `brands/wired.md` · `brands/starbucks.md` · `brands/airbnb.md`
**备选：** `brands/cal.md` · `brands/superhuman.md` · `brands/revolut.md`
**特征：** 衬线标题、暖色调、大图片、阅读优先排版

### 奢华高端 / 汽车时尚
**首选参考：** `brands/ferrari.md` · `brands/lamborghini.md` · `brands/bugatti.md` · `brands/bmw.md`
**备选：** `brands/tesla.md` · `brands/apple.md` · `brands/meta.md`
**特征：** 极简布局、大图全屏、精细动效、克制用色

### 金融 / Fintech
**首选参考：** `brands/stripe.md` · `brands/revolut.md` · `brands/wise.md` · `brands/coinbase.md`
**备选：** `brands/binance.md` · `brands/kraken.md` · `brands/mastercard.md`
**特征：** 数据可视化、安全表单、信任色（蓝/绿）、数字排版

---

## 3. 真实产品截图灵感站

生成代码前，去这些网站找同类产品的真实界面截图作为布局参考：

| 站点 | URL | 适合 | 特点 |
|------|-----|------|------|
| **Mobbin** | mobbin.com | 移动端 App | 真实上线 App 截图，按用户流程分类 |
| **Refero** | refero.design | Web + 移动端 | 按组件/元素精细搜索 |
| **SaaSFrame** | saasframe.io | SaaS 后台 | Dashboard、定价页、设置页截图 |
| **Pageflows** | pageflows.com | 用户流程 | 真实产品的注册/结账/引导录屏 |
| **Nicely Done** | nicelydone.club | 精致产品 | 微交互和细节打磨 |
| **Design Vault** | designvault.io | 大厂拆解 | 顶级公司界面解构 |
| **Lapa Ninja** | lapa.ninja | 落地页 | 全页截图，可按颜色/行业筛选 |

**使用方式：** 用户确认项目类型后，告诉 AI "去 Mobbin 搜索 [产品类型] 的真实界面截图作为参考"。

---

## 4. 设计令牌基础库

如果需要从零构建设计令牌（不依赖组件库），使用以下经过验证的令牌库：

### Open Props（推荐）

500+ CSS 自定义属性，纯令牌，无组件。CDN 一行引入：

```html
<link rel="stylesheet" href="https://unpkg.com/open-props" />
```

**核心令牌：**
- 颜色：Open Color + Colar 调色板（`--gray-{0-12}`, `--blue-{0-12}`, ...）
- 间距：`--size-1: .25rem` 到 `--size-fluid-12`
- 阴影：`--shadow-1` 到 `--shadow-6`，`--inner-shadow-{0-4}`
- 圆角：`--radius-1` 到 `--radius-6`，`--radius-round`
- 动效：`--ease-{1-5}`，`--ease-elastic-out-3`，`--ease-bounce-2`
- 层级：`--layer-{1-5}`

### Shadcn UI 主题系统

CSS 变量 + Tailwind。15 种预设反馈调色板：

| 预设 | 适合 |
|------|------|
| `classic` | 通用默认 |
| `vivid` | 鲜艳活泼 |
| `subtle` | 克制低调 |
| `warm` | 暖色调 |
| `cool` | 冷色调 |
| `nature` | 自然绿 |
| `modern` | 现代感 |
| `vibrant` | 高饱和 |
| `professional` | 商务正式 |
| `soft` | 柔和友好 |
| `bold` | 大胆强烈 |
| `calm` | 平静舒适 |
| `candy` | 甜美可爱 |
| `deep` | 深沉稳重 |
| `light` | 轻盈明亮 |

**使用：** `npx shadcn@latest init` 初始化，然后选择主题预设或自定义颜色。

---

## 5. 路由决策流程

Phase 4（设计方向）执行以下步骤：

```
1. 用户选择风格偏好（或根据项目类型推荐）
      ↓
2. 查「风格→品牌参考」表，选出 2-3 个最匹配的品牌
      ↓
3. 读取对应的 brands/[brand].md（如 brands/stripe.md）
      ↓
4. 查「项目类型→推荐设计系统」表，确定框架选择
      ↓
5. 如果用户需要视觉参考，推荐去灵感站搜索
      ↓
6. 综合品牌 DESIGN.md + 框架 Token + 真实截图，开始生成代码
```

### 快速决策表

| 用户说... | 路由到 |
|-----------|--------|
| "类似 Notion 的风格" | 直接加载 `brands/notion.md` |
| "像 Stripe 那样专业" | 直接加载 `brands/stripe.md` |
| "要暗色的，像 GitHub" | 加载 `brands/vercel.md` + Primer 框架 |
| "简洁现代" + SaaS后台 | 加载 `brands/linear.app.md` + Ant Design |
| "活泼有趣" + 消费App | 加载 `brands/spotify.md` + Tailwind |
| "专业商务" + 金融 | 加载 `brands/stripe.md` + Ant Design Pro |
| "AI 产品" | 加载 `brands/claude.md` + Shadcn UI |
| "不确定" | 根据项目类型推荐默认品牌 + 框架 |
