# 设计资源路由 — 按场景选择资源

> 使用现成专业素材，不要程序化生成。

## 图标库

| 图标库 | 数量 | 许可证 | 风格 | 推荐场景 |
|--------|------|--------|------|----------|
| **Lucide** | 1,300+ | ISC | 线性/现代 | 现代前端首选，shadcn/ui 标配 |
| **Heroicons** | 290+ | MIT | 描边+实心双风格 | Tailwind 生态天然搭配 |
| **Phosphor** | 1,000+ | MIT | 6 种粗细变体 | 需要多种视觉权重时 |
| **Tabler Icons** | 5,000+ | MIT | 线性 | 数量最多，覆盖面最广 |
| **Iconify** | 200,000+ | 聚合 | 聚合 150+ 图标集 | 一站式查找 |
| **Material Symbols** | 2,500+ | Apache 2.0 | 圆角/描边/锐利 | Android/Material 项目 |

**规则：**
- 一个项目只用一个图标库，不要混用
- 图标尺寸统一：16px（内联）/ 20px（按钮内）/ 24px（导航）
- 用 `display: flex; align-items: center` 对齐，不用 `vertical-align`
- **禁止用 emoji 作为功能图标**（仅用于非正式/趣味场景）

### CDN / 安装方式

```html
<!-- Lucide (推荐) -->
<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
<!-- React: npm install lucide-react -->

<!-- Heroicons -->
<!-- React: npm install @heroicons/react -->

<!-- Phosphor -->
<script src="https://unpkg.com/@phosphor-icons/web"></script>
<!-- React: npm install @phosphor-icons/react -->

<!-- Tabler Icons -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css">

<!-- Material Symbols -->
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" />
```

## 插画资源

| 资源 | 风格 | 许可证 | 适用场景 |
|------|------|--------|----------|
| **unDraw** | 扁平矢量，可定制颜色 | 免费 | 空状态、引导页、错误页 |
| **Storyset** | 多种风格（扁平/等距/手绘） | 免费 | 登录页、关于我们、功能介绍 |
| **Open Doodles** | 手绘涂鸦 | CC0 | 轻松活泼风格的博客/社交 |
| **Humaaans** | 人物组合 | 免费 | 团队协作、用户画像 |
| **Blush** | 可定制人物插画 | 免费 | 品牌化插画需求 |

**规则：**
- 空状态/引导页必须有插画，不能只有文字
- 插画颜色必须匹配品牌色
- 营销落地页用 unDraw + Unsplash 真实图片
- **禁止用 emoji 代替插画**

## 图片资源

| 资源 | 类型 | 用途 |
|------|------|------|
| **Unsplash** | 高质量摄影 | 文章封面、产品展示、Hero 区域 |
| **Pexels** | 免费摄影+视频 | 同上 |
| **placehold.co** | 占位图 | 开发阶段占位：`https://placehold.co/600x400` |

**规则：**
- 开发阶段用 `https://placehold.co/600x400` 占位
- 生产环境用 Unsplash/Pexels 真实图片
- 照片用 WebP/JPEG，图标用 SVG，截图用 PNG
- 非首屏图片用 `loading="lazy"`
- 所有 `<img>` 必须设置 `width` 和 `height` 防止 CLS

## 纹理/背景

| 资源 | 类型 | 用途 |
|------|------|------|
| **Hero Patterns** | SVG 纹理图案 | 区块背景纹理 |
| **Haikei** | SVG 波浪/曲线生成器 | Hero 区域背景分隔 |
| **BGJar** | SVG 背景生成器 | 装饰性背景 |

**规则：**
- 后台管理系统不用纹理、不用渐变，信息密度优先
- 营销落地页可用 Haikei 波浪分隔区块
- 创意/游戏项目可用 Hero Patterns 纹理
- **禁止装饰性渐变 blob**（不服务于功能的背景装饰）

## 场景 → 资源路由

| 项目类型 | 图标 | 插画 | 图片 | 纹理 |
|----------|------|------|------|------|
| 后台管理系统 | Lucide 线性 | 不用 | 不用 | 不用 |
| 营销落地页 | Heroicons | unDraw + Storyset | Unsplash Hero | Haikei 波浪 |
| 电商产品页 | Material Symbols | 不用 | 真实产品图 | 不用 |
| 社交产品 | 自建图标系统 | Humaaans + OpenMoji | 用户 UGC | 不用 |
| 创意/游戏 | Phosphor | 3dicons + Open Doodles | Unsplash | Hero Patterns |
| SaaS 官网 | Lucide | Blush 品牌化 | Unsplash | 极简 |
