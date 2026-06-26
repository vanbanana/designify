# Skill 索引 — 快速定位指南

> **给 AI Agent 的说明**：此索引帮助你快速定位所需知识，避免一次性加载全部文件。
> 根据当前任务阶段，只加载需要的文件。

---

## 按任务阶段索引

### 阶段 1：需求发现
| 需要做什么 | 读哪个文件 |
|-----------|-----------|
| 了解提问协议和3轮提问流程 | `references/phases/phase1-discovery.md` |
| 判断项目属于哪个类型 | `references/project-types/index.md` → 对应类别文件 |
| 用户提供了参考网站 → 运行分析工具 | `tools/website-analyzer.mjs` |
| Phase 6 质量门禁 → 运行自动扫描 | **`scripts/quality-check.mjs`** |

### 阶段 2：产品定义
| 需要做什么 | 读哪个文件 |
|-----------|-----------|
| 查看页面清单模板 | `references/phases/phase1-discovery.md`（含产品定义模板）|
| 确认 AI 产品特殊需求 | `references/ai-products/index.md` |

### 阶段 3：Design Read
| 需要做什么 | 读哪个文件 |
|-----------|-----------|
| 确定布局类型（F型/Z型/网格等）| `references/phases/phase4-design-direction.md` |
| 路由到品牌设计系统 | `references/design-systems/index.md` |
| 理解平台设计哲学 | `references/craft/platform-philosophy.md` |

### 阶段 4：设计方向 & 编码
| 需要做什么 | 读哪个文件 |
|-----------|-----------|
| 排版规范（字号/行高/字体） | `references/craft/typography.md` |
| 配色方案（60-30-10/对比度/暗色模式）| `references/craft/color.md` |
| **调色板选择（20个验证方案 + 路由表）** | **`references/craft/color-palettes.md`（必加载）** |
| 间距系统（4px基准/嵌套递进） | `references/craft/spacing.md` |
| 组件规范（按钮/卡片/输入框/导航） | `references/craft/components.md` |
| 响应式策略（Mobile-first/断点/Container Queries）| `references/craft/responsive-strategy.md` |
| 动效规范（缓动曲线/时长/性能）| `references/craft/animation-discipline.md` |
| 图标/插画/图片资源 CDN | `references/craft/design-resources.md` |
| **设计性格（Boldness/Motion/Density 三轴）** | **`references/craft/design-character.md`** |
| **视觉节奏（间距变化/呼吸感）** | **`references/craft/visual-rhythm.md`** |
| **艺术性代码参考（获奖站点源码/代码模式）** | **`references/craft/creative-code-references.md`**（Boldness ≥ 6 时必加载）|

### 阶段 5：质量门禁
| 需要做什么 | 读哪个文件 |
|-----------|-----------|
| 质量检查清单（10维度） | `references/phases/phase6-quality-gate.md` |
| 反AI味检查（P0/P1/P2） | `references/craft/anti-ai-slop.md` |
| 无障碍检查（WCAG 2.2 AA） | `references/craft/accessibility-baseline.md` |
| 表单验证状态机 | `references/craft/form-validation.md` |
| 五态覆盖检查 | `references/craft/state-coverage.md` |
| Critique Theater 流程 | `references/phases/phase6-quality-gate.md` |
| 自动化质量扫描 | `scripts/quality-check.mjs` |
| **设计性格验证** | **`references/craft/design-character.md` → 铁律 + 红旗** |
| **视觉节奏验证** | **`references/craft/visual-rhythm.md` → 反模式** |
| **艺术性代码引用检查** | **`references/craft/creative-code-references.md` → 代码引用纪律** |

---

## 按知识领域速查

### 🎨 设计决策
| 我想知道... | 去哪里找 |
|-------------|---------|
| 用什么颜色？对比度够吗？ | `references/craft/color.md` |
| 字体多大？行高多少？ | `references/craft/typography.md` |
| 间距用多少？嵌套怎么递减？ | `references/craft/spacing.md` |
| 用圆角还是直角？多大？ | `references/craft/components.md` |
| 什么场景用什么布局？ | `references/phases/phase4-design-direction.md` |
| 该用什么图标库？ | `references/craft/design-resources.md` |
| 媒体/视频页面怎么设计？ | `references/craft/media-and-video-pages.md` |
| 页面怎么才有"设计感"？ | **`references/craft/design-character.md`** |
| 间距怎么不显得模板化？ | **`references/craft/visual-rhythm.md`** |
| 颜色怎么用才能有力？ | **`references/craft/color.md` → 强调色配给制** |
| 想要艺术性强的页面设计？ | **`references/craft/creative-code-references.md`** |

### 🧠 心理学与UX
| 我想知道... | 去哪里找 |
|-------------|---------|
| 一页放多少选项合适？ | `references/craft/laws-of-ux.md` → Hick's Law |
| 用户为什么记不住中间内容？ | `references/craft/laws-of-ux.md` → Serial Position |
| 怎么让用户完成未完成任务？ | `references/craft/laws-of-ux.md` → Zeigarnik Effect |
| CTA按钮该放哪？多大？ | `references/craft/laws-of-ux.md` → Fitts's Law |
| 怎么设计用户留存机制？ | `references/craft/laws-of-ux.md` → Hook Model + AARRR |

### 🏗️ 平台适配
| 我想知道... | 去哪里找 |
|-------------|---------|
| C端 vs B端设计有什么区别？ | `references/craft/platform-philosophy.md` |
| 政务网站有什么特殊要求？ | `references/craft/platform-philosophy.md` → G端 |
| IoT 设备界面要注意什么？ | `references/craft/platform-philosophy.md` → IoT端 |
| 移动端和桌面端怎么适配？ | `references/craft/responsive-strategy.md` |

### 📐 项目类型
| 项目类型 | 参考文件 |
|----------|---------|
| 电商/商城/O2O | `references/project-types/01-commercial.md` |
| 社交/社区/论坛 | `references/project-types/02-social.md` |
| SaaS/CRM/后台/HR/财务 | `references/project-types/03-tools.md` |
| 生活服务/房产/医疗 | `references/project-types/04-lifestyle.md` |
| 教育/培训/知识库 | `references/project-types/05-education.md` |
| 游戏/直播/娱乐 | `references/project-types/06-entertainment.md` |
| 政务/公共服务 | `references/project-types/07-government.md` |
| IoT/智能家居/工业 | `references/project-types/08-iot.md` |
| Web3/区块链/元宇宙 | `references/project-types/09-emerging.md` |
| 制造/MES/供应链 | `references/project-types/10-manufacturing.md` |
| 建筑/能源/物业 | `references/project-types/11-construction.md` |
| 出行/物流/交通 | `references/project-types/12-transport.md` |
| AI 产品（任意类型）| `references/ai-products/index.md` |

### 🎯 反模式 & 质量
| 我想知道... | 去哪里找 |
|-------------|---------|
| 哪些设计是"AI味"要避免的？ | `references/craft/anti-ai-slop.md` |
| 怎么检查代码质量？ | `references/phases/phase6-quality-gate.md` |
| 表单验证怎么做？ | `references/craft/form-validation.md` |
| 五态（Loading/Empty/Error/Populated/Edge）| `references/craft/state-coverage.md` |

---

## 品牌设计系统速查（74 品牌）

| 风格 | 代表品牌 | 文件路径 |
|------|---------|---------|
| 简洁现代 | Vercel, Linear, Framer, Figma | `brands/vercel.md`, `brands/linear.app.md`, `brands/framer.md`, `brands/figma.md` |
| 专业商务 | Stripe, IBM, Shopify, Hashicorp | `brands/stripe.md`, `brands/ibm.md`, `brands/shopify.md`, `brands/hashicorp.md` |
| 暗色科技 | Cursor, Warp, PostHog, Supabase | `brands/cursor.md`, `brands/warp.md`, `brands/posthog.md`, `brands/supabase.md` |
| AI/前沿 | Claude, Cohere, Mistral, Runway | `brands/claude.md`, `brands/cohere.md`, `brands/mistral.ai.md`, `brands/runwayml.md` |
| 活泼有趣 | Notion, Slack, Spotify, Lovable | `brands/notion.md`, `brands/slack.md`, `brands/spotify.md`, `brands/lovable.md` |
| 温暖文艺 | The Verge, Wired, Airbnb, Starbucks | `brands/theverge.md`, `brands/wired.md`, `brands/airbnb.md`, `brands/starbucks.md` |
| 奢华高端 | Ferrari, Lamborghini, Bugatti, Apple | `brands/ferrari.md`, `brands/lamborghini.md`, `brands/bugatti.md`, `brands/apple.md` |
| 金融科技 | Revolut, Wise, Coinbase, Mastercard | `brands/revolut.md`, `brands/wise.md`, `brands/coinbase.md`, `brands/mastercard.md` |

> 完整品牌列表见 `references/design-systems/brands/` 目录
