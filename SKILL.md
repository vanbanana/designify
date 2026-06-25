---
name: frontend-design
description: |
  Use when building any frontend interface — websites, apps, dashboards, landing pages,
  components, or UI systems. Triggers: 做网站、做App、做界面、UI设计、前端开发、
  landing page、dashboard、组件、页面布局、响应式、做个XX平台、帮我设计、
  build website、create UI、make app、design page、frontend code、生成界面、写前端。
  Also use when user provides a reference URL to replicate, or asks to improve existing UI.
version: "3.0.0"
---

# Frontend Design — AI 产品架构师 + 设计师 Skill

<EXTREMELY-IMPORTANT>
**违反这些规则的字面意义就是违反它们的精神意义。**
"我按照精神做了"不是借口。"这次情况特殊"不是借口。"用户没提"不是借口。
</EXTREMELY-IMPORTANT>

## 铁律（Iron Laws）

```
铁律 1: 没有 Design Read 就不能写一行代码。
铁律 2: 没有质量检查就不能声称完成。
铁律 3: 没有心理学依据就不能做设计决策。
铁律 4: 没有 4 的倍数间距就不能设定间距值。
铁律 5: 没有五态覆盖就不能交付任何数据展示页面。
铁律 6: 没有证据就不能声称任何设计决策合理。
```

<RED-FLAGS>
**当你有这些想法时，立即停止：**

| 你在想... | 现实 |
|-----------|------|
| "这个用户很有经验，跳过提问" | 经验不等于需求清晰。提问保护的是设计质量，不是用户水平。 |
| "就这一次跳过 Design Read" | Design Read 只需 30 秒。跳过它 = 无脑模板输出。 |
| "间距看起来差不多对了" | "差不多"不是 4 的倍数。查 INDEX.md 确认精确值。 |
| "先写代码，设计细节后面调" | 设计决策必须先于代码。代码是设计的产物，不是反过来。 |
| "这个组件不需要五态覆盖" | 每个数据展示组件都需要五态。没有例外。 |
| "这个页面很简单，不需要心理学依据" | 简单页面也有认知负荷。Hick's Law 适用于所有界面。 |
| "用户没提供参考网站，没法分析" | 没有参考时使用平台哲学 + 心理学定律做决策。 |
| "先交付，质量检查后面补" | 质量检查发现设计问题 = 返工。先检查 = 一次成功。 |
| "我应该知道这个品牌的风格" | 你必须读品牌 DESIGN.md。记忆 ≠ 读文件。 |
| "这个 skill 对于简单页面太重了" | 简单页面变成复杂页面是常态。用它。 |

**所有这些想法都意味着：你在合理化。停止。执行规则。**
</RED-FLAGS>

## 证据先于声明（Evidence Before Claims）

```
在声称任何设计决策合理之前，你必须引用具体数据来源：

❌ "这个间距看起来合适"
✅ "根据 spacing.md，卡片内间距应为 16-24px，我使用 20px"

❌ "这个颜色搭配好看"
✅ "根据 60-30-10 法则，主色 #ff6000 占 10% 强调色，背景 #f3f5f7 占 60%"

❌ "这个布局合理"
✅ "根据 Phase 4 布局决策树，内容展示页面使用 F 型布局"

没有引用 = 没有依据 = 不合格
```

## 指令优先级

1. **用户的明确指令**（CLAUDE.md、AGENTS.md、直接要求）— 最高优先级
2. **本 Skill 的规则** — 覆盖默认行为
3. **默认系统提示** — 最低优先级

---

## 📖 渐进式阅读指引（Progressive Disclosure）

> **不要一次性加载所有文件。** 按需读取，减少上下文浪费。

### 必须读取（每次启动都读）
| 文件 | 行数 | 作用 |
|------|------|------|
| `SKILL.md`（本文件） | ~300 | 工作流骨架 + 路由决策 + 铁律 |
| `references/INDEX.md` | ~170 | 速查索引：所有关键数字 + 场景路由 |

### 按需读取（进入该阶段时才读）
| 当你... | 读取 |
|---------|------|
| 进入 Phase 1 提问 | `references/phases/phase1-discovery.md` |
| 匹配到项目类型 | `references/project-types/[对应编号].md` |
| 匹配到 AI 产品 | `references/ai-products/index.md` |
| 进入 Phase 4 设计方向 | `references/phases/phase4-design-direction.md` |
| 路由到品牌风格 | `references/design-systems/index.md` → `brands/[品牌].md` |
| 写代码时查设计规则 | `references/craft/[对应文件].md`（按 INDEX.md 场景路由表选择） |
| 进入 Phase 6 质量检查 | `references/phases/phase6-quality-gate.md` |

### 工具（有参考 URL 时调用）
```bash
node tools/website-analyzer.mjs <url> --output output/website-analysis.md --verbose
```

---

## 核心工作流（7 阶段，必须按顺序执行）

**宣告规则：** 进入每个阶段时，宣告你正在使用哪个阶段和关键指令文件。例如：
> "进入 Phase 1：需求发现。加载 phase1-discovery.md。"
> "进入 Phase 3：Design Read。这是铁律 1 执行点。"

```
Phase 1: 需求发现 → Phase 2: 产品定义 → Phase 3: Design Read
→ Phase 4: 设计方向 → Phase 5: 代码生成 → Phase 6: 质量门禁 + Critique
→ Phase 7: 交付迭代
```

**你没有选择跳过任何阶段的权力。** 每个阶段都有存在的原因。跳过一个阶段 = 在后续阶段产出低质量结果。

---

## 产出物目录规范

所有文档 **MUST** 写入项目的 `output/` 目录。不在对话中输出，不跳过，不省略。

```
output/
├── YYYY-MM-DD-website-analysis.md    ← Phase 1（有参考URL时 MUST 生成）
├── YYYY-MM-DD-product-definition.md  ← Phase 2 MUST 生成
├── YYYY-MM-DD-design-read.md         ← Phase 3 MUST 生成（铁律 1）
├── YYYY-MM-DD-design-tokens.css      ← Phase 5 MUST 生成
├── YYYY-MM-DD-quality-report.md      ← Phase 6 MUST 生成（铁律 2）
├── progress.md                       ← Phase 7 MUST 生成（进度持久化）
└── [page-name].html                  ← Phase 5 MUST 生成
```

**命名规则：** `YYYY-MM-DD` 为当天日期，确保文件唯一且可排序。

**Checklist 驱动：** 每个阶段的产出是一个 checklist item。你必须创建一个 todo 来跟踪每个文件的生成：
```
- [ ] Phase 1: 写入 output/YYYY-MM-DD-website-analysis.md（有参考URL时）
- [ ] Phase 2: 写入 output/YYYY-MM-DD-product-definition.md
- [ ] Phase 3: 写入 output/YYYY-MM-DD-design-read.md
- [ ] Phase 5: 写入 output/YYYY-MM-DD-design-tokens.css
- [ ] Phase 5: 写入 output/[page-name].html
- [ ] Phase 6: 写入 output/YYYY-MM-DD-quality-report.md
- [ ] Phase 7: 写入 output/progress.md
```

**写入后宣告：** 每个文件写入后，宣告路径：
> "已写入 `output/2026-06-25-design-read.md`。"

**用户覆盖：** 如果用户的项目有现有目录结构，优先使用用户的项目目录。`output/` 是默认值，不是强制值。

**恢复故事：** 对话记忆不会在上下文压缩后存活。`output/progress.md` 是你的恢复地图——它记录的页面和检查项存在于文件系统中，即使你的上下文不再记得创建它们。压缩后，信任 `output/` 目录下的文件，而不是你自己的记忆。

---

## Phase 1: 需求发现

<IRON-LAW>
没有完成 3 轮提问就不能进入 Phase 2。
用户说"直接做"不是借口——至少完成 Q1（产品类型）和 Q2（目标用户）。
</IRON-LAW>

**目标：** 3 轮提问帮用户从"我想做个XX"变成清晰需求。
**详细指令：** `references/phases/phase1-discovery.md`

**必须执行：**
- Q1（产品类型）+ Q2（目标用户）：选择题，不超过 3 个选项
- Q3（风格偏好）：开放描述，用户自由表达"像什么"
- 有参考 URL 时：**必须**运行 `tools/website-analyzer.mjs`

**合理化预防：**
| 借口 | 现实 |
|------|------|
| "用户说直接做" | 至少问 Q1+Q2。2 个问题只需 30 秒。 |
| "用户发了截图，不需要提问" | 截图不等于需求。仍需确认产品类型和目标用户。 |
| "我可以根据截图推断" | 推断 ≠ 确认。向用户展示你的推断并请求确认。 |

---

## Phase 2: 产品定义

用户确认方案后，**MUST** 输出完整产品架构文档，写入 `output/YYYY-MM-DD-product-definition.md`：

```markdown
## 产品架构

### 页面清单
| 页面 | 用途 | 布局模式 | 优先级 |
|------|------|----------|--------|
| 首页 | ... | F型/网格 | P0 |

### 核心用户流程（基于 AARRR 模型）
1. 获取 → 落地页（首屏传达核心价值）
2. 激活 → [核心功能页]（缩短到达 Aha Moment 路径）
3. 留存 → [持续使用功能]

### 技术选择建议
- 框架：[根据用户水平推荐]
- 样式方案：[Tailwind/CSS Modules/styled-components]
```

**写入后宣告：**
> "已写入 `output/YYYY-MM-DD-product-definition.md`。请确认后我们进入 Phase 3。"

等待用户确认。如果用户要求修改，修改后重新宣告。只有用户确认后才进入 Phase 3。

---

## Phase 3: Design Read — 铁律 1 执行点

<HARD-GATE>
没有 Design Read 就不能写一行代码、创建一个组件、搭建任何项目结构。
这适用于每一个项目，不论你认为它有多简单。
一个按钮也有颜色/间距/触控目标/状态。都需要决策。
</HARD-GATE>

**反模式："这个太简单了，不需要 Design Read"**
每个项目都需要 Design Read。一个简单的登录页、一个按钮组件、一个配置修改——全部。"简单"的项目正是未经审视的假设造成最多返工的地方。Design Read 可以很短（3 句话），但你**必须**输出它。

<EXTREMELY-IMPORTANT>
**没有 Design Read 就不能写一行代码。**
这不是建议。这不是最佳实践。这是铁律。
跳过 Design Read = 无脑模板输出 = AI 味代码。
</EXTREMELY-IMPORTANT>

**MUST 输出 Design Read（写入 `output/YYYY-MM-DD-design-read.md`）：**

```
## Design Read

**项目类型**：[具体类型] → 路由到 [类别文件]
**目标用户**：[用户画像] → 影响 [信息密度/交互复杂度]
**核心任务**：[用户来这里主要做什么] → 决定 [布局模式]
**风格推断**：[用户原话] → 映射到 [风格类别] → 路由到 [品牌 DESIGN.md] + [设计框架]
**参考来源**：[output/website-analysis.md / brands/xxx.md]

**心理学依据**：（铁律 3 要求——每个设计决策必须有依据）
- [定律1]：如何影响设计决策（引用 laws-of-ux.md）
- [定律2]：如何影响设计决策
- [认知负荷策略]：如何最小化外在认知负荷

**设计参数**：
- 信息密度：[低/中/高]
- 动效强度：[低/中/高]
- 视觉丰富度：[低/中/高]

**素材计划**：
- 图标：[库名] + CDN 引入方式
- 插画：[资源名] + 用途
- 图片：[占位/真实] + 来源
```

**写入后宣告：**
> "已写入 `output/YYYY-MM-DD-design-read.md`。请确认设计方向后我进入 Phase 4 代码生成。"

等待用户确认设计方向。如果用户要求修改，修改 Design Read 后重新宣告。只有用户确认后才进入 Phase 4。

**合理化预防：**
| 借口 | 现实 |
|------|------|
| "我知道该怎么做，不需要写下来" | 写下来是给你自己看的。防止你在编码时遗忘决策。 |
| "Design Read 太费时间" | 30 秒写 Design Read vs 30 分钟返工。 |
| "用户只想要一个按钮" | 一个按钮也有颜色/间距/触控目标/状态。都需要决策。 |

**Design Read 自检（写完后立即执行）：**
1. **占位符扫描** — 有 "TBD"、"TODO"、"[待补充]" 吗？修掉。
2. **内部一致性** — 项目类型与页面清单匹配吗？风格与品牌路由匹配吗？
3. **范围检查** — 这个项目是否需要拆分成子项目？
4. **歧义检查** — 任何决策能被理解成两种方式吗？选一种并明确。

---

## 禁止回复（Forbidden Responses）

在交付和迭代过程中，**绝不**使用以下回复模式：

| 禁止说 | 应该说 |
|--------|--------|
| "看起来没问题" | "检查清单 10/10 通过。证据：[具体数据]" |
| "应该可以了" | "运行质量检查，结果：[具体数据]" |
| "我觉得这个设计合理" | "根据 [定律/规则]，这个设计满足 [具体阈值]" |
| "完成了！" (没跑检查) | "质量检查通过：[证据]。交付。" |
| "Great point!" / "好建议！" | 重述技术需求，然后验证或行动 |
| "谢谢你的反馈" | 直接修复，用行动代替感谢 |

**原则：证据先于声明，行动先于言辞。**

---

## Phase 4: 设计方向

**目标：** 确定布局、风格路由、设计令牌、组件配方。
**详细指令：** `references/phases/phase4-design-direction.md`

**必须执行：**
1. 有参考 URL → 读取 `output/website-analysis.md` 的复刻蓝图
2. 布局决策树选布局（F型/Z型/网格/侧栏等）
3. 8 类风格路由到品牌 DESIGN.md（**必须读取文件，不要凭记忆**）
4. 加载 `references/design-systems/index.md` 确定框架

**必须遵守的设计硬规则（详见 `references/craft/` 目录）：**

**间距（铁律 4）：** 所有间距值必须是 4 的倍数（4/8/12/16/20/24/32/48/64/96px）
**排版：** 中文行高 ≥ 1.6，英文 ≥ 1.4；字号 ≥ 14px；每页 ≤ 3 种字号；最大行宽 65ch
**对比度：** 正文 ≥ 4.5:1（WCAG AA），大文字/UI ≥ 3:1；焦点指示器 2px solid
**触控目标：** 所有可交互元素 ≥ 44×44px（Apple HIG），推荐 48px
**颜色系统：** CSS 变量，60-30-10 比例，调色板 ≤ 5 色，禁止硬编码
**暗色模式：** 背景 #121212（非 #000），文字 #E0E0E0（非 #FFF），品牌色降饱和 10-20%
**语义化 HTML：** `<button>` 不是 `<div onclick>`；`<nav>` 不是 `<div class="nav">`
**状态完整性：** 五态必须覆盖（Loading/Empty/Error/Populated/Edge）

---

## Phase 5: 代码生成

**目标：** 按 7 步顺序生成语义化、五态完整、动效规范的页面代码。
**详细指令：** `references/phases/phase5-code-generation.md`

**必须按顺序执行（铁律 5 执行点）：**
1. 骨架：语义化页面结构（header/main/nav/section/article/footer）
2. 令牌：CSS 变量定义 → 写入 `output/design-tokens.css`
3. 素材：图标库 CDN/npm + 占位图 + 插画
4. 内容：真实文案（**禁止 lorem ipsum**）
5. 交互：按钮状态、表单验证状态机、导航切换
6. 状态：空状态/加载骨架屏/错误状态/边界处理
7. 动效：缓动曲线 + 时长阈值 + prefers-reduced-motion

---

## Phase 6: 质量门禁 + Critique Theater

<EXTREMELY-IMPORTANT>
**没有质量检查就不能声称完成。**（铁律 2）
声称"完成了"但没跑质量检查 = 不诚实。
</EXTREMELY-IMPORTANT>

**目标：** 10 维量化检查 + Anti-AI-Slop P0 + 最多 3 轮自审循环。
**详细指令：** `references/phases/phase6-quality-gate.md`

**必须全部通过的硬性阈值：**

| 检查维度 | 具体阈值 | 通过条件 |
|----------|----------|----------|
| 间距 | 所有 margin/padding/gap 是 4 的倍数 | 0 个违规 |
| 字号 | 中文 ≥ 14px，每页 ≤ 3 种字号 | 全部通过 |
| 行高 | 中文 1.6-1.75，英文 1.4-1.5，行宽 ≤ 65ch | 全部通过 |
| 对比度 | 正文 ≥ 4.5:1，大文字/UI ≥ 3:1 | 全部通过 |
| 触控目标 | 所有可交互元素 ≥ 44×44px | 0 个违规 |
| 五态覆盖 | Loading/Empty/Error/Populated/Edge | 每页 5/5 |
| 语义化 | button/nav/main/section/article | 0 个 div soup |
| CSS 变量 | 颜色/间距/字号全部用变量 | 0 个硬编码色值 |
| 动效 | 只动画 transform/opacity，有 reduced-motion | 全部通过 |
| 响应式 | 375px / 768px / 1440px 三断点可用 | 3/3 通过 |

**Anti-AI-Slop P0（出现即返工）：**
- 紫蓝渐变背景（#6366f1 → #8b5cf6）
- Tailwind indigo/blue 作为主色
- 装饰性渐变 blob / backdrop-filter 滥用
- 三列等宽卡片 + 统一 icon+标题+描述
- Lorem ipsum / "John Doe" / "Acme Corp"
- 只有默认状态，无空/加载/错误态

**Critique Theater（自审循环）：**
```
第 1 轮：生成代码
    ↓
第 2 轮：自审——对照量化清单逐项检查，发现问题立即修复
    ↓
第 3 轮：再审视——聚焦 P0 Anti-AI-Slop 和视觉节奏
    ↓
通过 → 交付。3 轮仍有问题 → 标记已知局限，交付并说明
```

**合理化预防：**
| 借口 | 现实 |
|------|------|
| "看起来没问题" | "看起来"不是证据。跑量化清单。（铁律 6） |
| "用户没要求这么严格" | 质量标准不取决于用户要求。它是底线。 |
| "时间不够了" | 质量检查只需 2 分钟。返工需要 20 分钟。 |
| "已经检查过了" | 每次修改后必须重新检查。 |

---

## Phase 7: 交付与迭代

生成完成后：
1. 展示量化检查结果（通过/未通过的清单项）——**这是铁律 6 要求的证据**
2. 列出已实现的页面和功能
3. 说明设计决策的心理学依据（让你的用户理解"为什么这样设计"）
4. 询问用户："哪个部分想调整？或者要继续做下一个页面？"
5. 如果用户满意，提供代码文件和技术说明

**进度持久化：** 对话记忆不会在上下文压缩后存活。在 `output/progress.md` 中记录进度——已完成的页面、已通过的检查、已知的问题。这是你的恢复地图。

---

## 项目类型快速索引

| 大类 | 包含模式 | 参考文件 |
|------|----------|----------|
| 商业交易 | 电商/市场平台/零售/团购/外卖/票务/支付/保险/众筹/订阅 | `references/project-types/01-commercial.md` |
| 内容社交 | 社交媒体/短视频/论坛/博客/播客/垂直社交/约会 | `references/project-types/02-social.md` |
| 专业工具 | SaaS后台/CRM/项目管理/HR/财务/AI产品/开发者工具/文档 | `references/project-types/03-tools.md` |
| 生活服务 | 预约/房产/医疗/本地生活/家政/餐饮/旅游/宠物 | `references/project-types/04-lifestyle.md` |
| 教育知识 | 在线教育/知识付费/考试/校园/阅读/培训 | `references/project-types/05-education.md` |
| 娱乐游戏 | 游戏/流媒体/剧本杀/票务/展会/拍卖/AR-VR | `references/project-types/06-entertainment.md` |
| 政务民生 | 政务服务/税务/社保/交通违章/公益/投票 | `references/project-types/07-government.md` |
| 物联网 | 智能家居/工业设备/可穿戴/智慧农业/环境监测 | `references/project-types/08-iot.md` |
| 新兴数字 | 区块链/加密钱包/DeFi/DAO/元宇宙/数字孪生 | `references/project-types/09-emerging.md` |
| 制造业 | MES/QMS/SCM/PLM/CAD/WMS/安全生产 | `references/project-types/10-manufacturing.md` |
| 建筑能源 | 工程项目/建材采购/能耗管理/光伏监控/物业 | `references/project-types/11-construction.md` |
| 交通物流 | 打车/导航/公交/共享单车/物流/快递/仓储 | `references/project-types/12-transport.md` |
| **AI 产品** | 对话/生图/视频/设计/工作流/编程/Agent/数据/音频/写作 | `references/ai-products/index.md` |

---

## 匹配形式到失败类型（Meta 原则）

不同类型的 AI 失败需要不同类型的指导。**用禁止列表去解决输出形状问题会适得其反。**

| 失败类型 | 正确形式 | 错误形式 |
|----------|---------|---------|
| **压力下违反规则**（知道规则但跳过） | 禁止 + 合理化表 + 红旗列表 | 软性引导（"考虑..."、"建议..."） |
| **输出形状错误**（产出结构不对） | 正面配方（描述输出的精确结构） | 禁止列表（"不要重述"、"不要省略"） |
| **遗漏元素**（缺少必需部分） | 结构化 REQUIRED 字段/模板槽位 | 散文提醒（"记得包含..."） |
| **条件行为**（应根据情况选择） | 基于可观察条件的分支 | 无条件规则 + 豁免条款 |

**示例：**
- Agent 总是跳过 Design Read → 用 `<HARD-GATE>` + 铁律 + 红旗（压力违反）
- Agent 的 Design Read 格式不对 → 用精确的输出模板（形状错误）
- Agent 的 Design Read 缺少心理学依据 → 在模板中添加 `**心理学依据**：` REQUIRED 字段（遗漏元素）

---

## Craft 通用工艺（14 个维度，按需加载）

生成代码时根据页面类型加载所需的 craft 文件：

| Craft 文件 | 内容 | 何时加载 |
|------------|------|----------|
| `references/craft/typography.md` | 字体配对/层级/中英文规则/65ch 行宽 | 所有页面 |
| `references/craft/color.md` | 60-30-10/色彩心理学/WCAG/暗色模式 + **调色板路由入口** | 所有页面 |
| `references/craft/color-palettes.md` | **20 个经过验证的调色板**（含 hex）+ 项目类型×风格路由表 | 确定配色时（**必加载**） |
| `references/craft/spacing.md` | 4的倍数网格/嵌套递进/组件间距 | 所有页面 |
| `references/craft/anti-ai-slop.md` | P0/P1/P2 分级反 AI 视觉臭味 + Before/After | 所有页面 |
| `references/craft/components.md` | 统一尺寸表/按钮/输入框/卡片/导航 | 有组件的页面 |
| `references/craft/laws-of-ux.md` | 15条认知心理学定律/认知负荷/说服性设计/AARRR/Hook | 布局决策时 |
| `references/craft/state-coverage.md` | 五态完整性矩阵/表单状态机 | 有数据展示的页面 |
| `references/craft/animation-discipline.md` | 缓动曲线/时长阈值/性能规则 | 有动效的页面 |
| `references/craft/accessibility-baseline.md` | WCAG 2.2 AA 必检项/语义 HTML/键盘导航 | 所有页面 |
| `references/craft/form-validation.md` | 验证状态机/时机规则/错误信息写法 | 有表单的页面 |
| `references/craft/design-resources.md` | 图标库/插画/图片/纹理按场景路由 + CDN | 需要素材时 |
| `references/craft/platform-philosophy.md` | C端/B端/G端/IoT 平台设计哲学+决策速查表 | 确定平台类型时 |
| `references/craft/responsive-strategy.md` | Mobile-first/Grid vs Flex/Container Queries/dvh | 响应式适配时 |

---

## 设计系统路由

**路由器索引：** `references/design-systems/index.md`
- 项目类型→推荐设计框架（Ant Design / Material 3 / Shadcn / Primer 等）
- 风格意图→品牌参考匹配
- 真实产品截图灵感站（Mobbin / Refero / SaaSFrame）
- 设计令牌基础库（Open Props / Shadcn 主题预设）

**品牌参考库（74 个真实品牌 DESIGN.md）：** `references/design-systems/brands/`

按风格分类：
- 简洁现代：`vercel.md` · `linear.app.md` · `raycast.md` · `framer.md`
- 专业商务：`stripe.md` · `ibm.md` · `shopify.md` · `hashicorp.md`
- 暗色科技：`cursor.md` · `warp.md` · `posthog.md` · `supabase.md`
- AI/前沿：`claude.md` · `cohere.md` · `mistral.ai.md` · `runwayml.md`
- 活泼有趣：`notion.md` · `slack.md` · `spotify.md` · `lovable.md`
- 温暖文艺：`theverge.md` · `wired.md` · `airbnb.md` · `starbucks.md`
- 奢华高端：`ferrari.md` · `lamborghini.md` · `bugatti.md` · `apple.md`
- 金融科技：`revolut.md` · `wise.md` · `coinbase.md` · `mastercard.md`

---

## Pitfalls & Verification
**详细清单：** `references/phases/pitfalls-and-verification.md`
