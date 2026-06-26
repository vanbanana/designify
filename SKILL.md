---
name: frontend-design
description: |
  Use when building any frontend interface — websites, apps, dashboards, landing pages,
  components, or UI systems. Triggers: 做网站、做App、做界面、UI设计、前端开发、
  landing page、dashboard、组件、页面布局、响应式、做个XX平台、帮我设计、
  build website、create UI、make app、design page、frontend code、生成界面、写前端、
  优化、分析、审计、修改、重构、重做、改得好看、美化、redesign、refactor、audit。
  Also use when user provides a reference URL to replicate, or asks to improve existing UI.
  Also use when user provides an existing project or codebase to analyze/optimize.
  
  路由规则：
  用户有现有项目/代码 → Phase 0（项目审计）
  用户从零开始 → Phase 1（需求发现）
version: "3.0.0"
---

# Frontend Design — AI 产品架构师 + 设计师 Skill

<EXTREMELY-IMPORTANT>
**字面违反 = 精神违反。**
"我按精神做了"不是借口。"情况特殊"不是借口。"用户没提"不是借口。
</EXTREMELY-IMPORTANT>

## 铁律（Iron Laws）

```
铁律 1: 没有 Design Read 就不能写一行代码。
铁律 2: 没有质量检查就不能声称完成。
铁律 3: 没有心理学依据就不能做设计决策。
铁律 4: 没有 4 的倍数间距就不能设定间距值。
铁律 5: 没有五态覆盖就不能交付任何数据展示页面。
铁律 6: 没有证据就不能声称任何设计决策合理。
铁律 7: 没有技术栈声明就不能写一行代码。Phase 1 必须确定框架/样式/构建方案。
```

<RED-FLAGS>
**当你有这些想法时，立即停止：**

| 你在想... | 现实 |
|-----------|------|
| "这个用户很有经验，跳过提问" | 经验 ≠ 需求清晰。提问保护设计质量。 |
| "就这一次跳过 Design Read" | Design Read 只需 30 秒。跳过=无脑模板。 |
| "间距看起来差不多对了" | "差不多"不是 4 的倍数。查 INDEX.md。 |
| "先写代码，设计细节后面调" | 设计决策先于代码。代码是设计产物，不是反过来。 |
| "这个组件不需要五态覆盖" | 每个数据展示组件都需要五态。无例外。 |
| "这个页面很简单，不需要心理学依据" | 简单页面也有认知负荷。Hick's Law 适用所有界面。 |
| "用户没提供参考网站，没法分析" | 无参考→用平台哲学+心理学定律做决策。 |
| "先交付，质量检查后面补" | 质量检查发现问题=返工。先检查=一次成功。 |
| "我应该知道这个品牌的风格" | 必须读品牌 DESIGN.md。记忆≠读文件。 |
| "这个 skill 对于简单页面太重了" | 简单页面变成复杂页面是常态。用它。 |

**所有这些想法都意味着：你在合理化。停止。执行规则。**
</RED-FLAGS>

<RECOVERY-GUIDE>
**如果在执行过程中遭遇上下文压缩：**
1. 读 `output/progress.md` 找到 Checkpoint
2. 从最后一个 ✅ 的下一个 ⏳/⬜ 任务继续
3. 重建上下文：读 `output/YY-MM-DD-design-read.md` + `docs/README.md`
4. **不要问用户"从哪里开始"**——自己在文件中找到。
</RECOVERY-GUIDE>

## 证据先于声明（Evidence Before Claims）

```
任何设计决策必须有数据来源：

❌ "这个间距看起来合适"
✅ "根据 spacing.md，卡片内间距 16-24px，我用 20px"

❌ "这个颜色搭配好看"
✅ "根据 60-30-10 法则，主色 #ff6000 占 10% 强调色，背景 #f3f5f7 占 60%"

❌ "这个布局合理"
✅ "根据 Phase 4 布局决策树，内容展示页用 F 型布局"

无引用 = 无依据 = 不合格
```

## 指令优先级

1. **用户的明确指令**（CLAUDE.md、AGENTS.md、直接要求）— 最高
2. **本 Skill 的规则** — 覆盖默认行为
3. **默认系统提示** — 最低

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

### 质量检查（Phase 6 验证时调用）
```bash
node scripts/quality-check.mjs <target-dir> --output output/quality-report.md --verbose
```

---

## 路由决策（进入时立即判断）

```
用户说了什么？ ─┬── "帮我看/优化/分析/改这个项目" → Phase 0: 项目审计
                ├── "帮我做个XX/设计/生成" → Phase 1: 需求发现
                ├── 提供了 URL/截图 → Phase 1 + 运行 website-analyzer
                └── 其他 → Phase 1: 需求发现
```

## 核心工作流（必须按顺序执行）

**宣告规则：** 进入每个阶段时，宣告阶段和指令文件。例如：
> "Phase 1：需求发现。加载 phase1-discovery.md。"
> "Phase 3：Design Read。铁律 1 执行点。"

```
Phase 0: 项目审计 → Phase 1: 需求发现 → Phase 2: 产品定义 → Phase 3: Design Read
→ Phase 4: 设计方向 → Phase 5: 代码生成（任务分解+子任务验证）→ Phase 6: 质量门禁 + Critique
→ Phase 7: 交付 → Phase 8: 文档生成与收尾
```

**跳过任一阶段 = 后续产出低质量。**

---

## 产出物目录规范

两条产出路径，**互不混淆**：

```
📄 文档产物 → output/
├── YYYY-MM-DD-website-analysis.md    ← Phase 1（有参考URL时 MUST 生成）
├── YYYY-MM-DD-product-definition.md  ← Phase 2 MUST 生成
├── YYYY-MM-DD-design-read.md         ← Phase 3 MUST 生成（铁律 1）
├── YYYY-MM-DD-design-tokens.css      ← Phase 5 MUST 生成（设计令牌记录）
├── YYYY-MM-DD-quality-report.md      ← Phase 6 MUST 生成（铁律 2）
├── YYYY-MM-DD-audit-report.md        ← Phase 0 MUST 生成（项目审计时）
└── progress.md                       ← Phase 7 MUST 生成（进度持久化）

📖 项目文档 → docs/
├── README.md                         ← 文档总索引
├── CHANGELOG.md                      ← 变更记录
├── api-contract.md                   ← API 契约
├── components/*.md                   ← 组件文档+状态预览
├── mock-api.md                       ← Mock API（如需）
└── architecture/                     ← 架构记录

💻 代码产物 → 项目根目录（或用户指定目录）
├── index.html / app.jsx / style.css  ← Phase 5 按技术栈组织
├── src/                              ← 框架项目
├── assets/                           ← 静态资源
└── ...（技术栈决定目录结构）
```

**命名规则：** 文档产物 `YYYY-MM-DD` 日期前缀。

**Checklist 驱动：** 每个阶段产出一个 checklist item：
```
- [ ] Phase 1: 写入 output/YYYY-MM-DD-website-analysis.md（有参考URL时）
- [ ] Phase 2: 写入 output/YYYY-MM-DD-product-definition.md
- [ ] Phase 3: 写入 output/YYYY-MM-DD-design-read.md
- [ ] Phase 5: 写入 output/YYYY-MM-DD-design-tokens.css
- [ ] Phase 5: 生成代码到项目根目录 / src/
- [ ] Phase 6: 写入 output/YYYY-MM-DD-quality-report.md
- [ ] Phase 7: 写入 output/progress.md
```

**写入后宣告路径：**
> "已写入 `output/2026-06-25-design-read.md`。"

**用户覆盖：** 现有项目优先用用户目录。`output/` 是默认值，非强制。

**恢复：** 对话记忆压缩后不存活。`output/progress.md` 是恢复地图——信任文件系统中的记录，而非上下文记忆。

---

## Phase 0: 项目审计（可选入口）

**触发条件：** 
- 用户说"帮我看看这个页面"、"优化一下"、"分析一下"、"重构"
- 检测到用户提供了现有文件或项目路径

**流程：**
1. 扫描项目目录 → 识别技术栈（React/Vue/HTML/Tailwind/CSS Modules）
2. 运行 `node scripts/quality-check.mjs <dir> --audit` → 列出问题清单
3. 运行视觉审计：Typography / Color / Layout / Interactivity / Content / Components / Icons / Code Quality
4. 输出审计报告到 `output/YYYY-MM-DD-audit-report.md`
5. 询问用户：要修复哪些问题？
6. 基于选择 → 进入 Phase 1（或直接修复）

---

## Phase 1: 需求发现

<IRON-LAW>
未完成 3 轮提问 → 不能进入 Phase 2。
用户说"直接做"不是借口——至少 Q1（产品类型）+ Q2（目标用户）。
</IRON-LAW>

**目标：** 3 轮提问→从模糊到清晰。
**详细指令：** `references/phases/phase1-discovery.md`

**必须执行：**
- Q1（产品类型）+ Q2（目标用户）：选择题，≤3 选项
- Q3（风格偏好）：开放描述
- Q4（技术栈——强制）：确定框架/样式/构建方案
- 有参考 URL 时：**必须**运行 `tools/website-analyzer.mjs`

**合理化预防：**
| 借口 | 现实 |
|------|------|
| "用户说直接做" | 至少 Q1+Q2。2 个问题 30 秒。 |
| "用户发了截图，不需要提问" | 截图≠需求。仍需确认产品类型和目标用户。 |
| "我可以根据截图推断" | 推断≠确认。展示推断并请求确认。 |

---

## Phase 2: 产品定义

用户确认方案后，**MUST** 输出完整产品架构文档，写入 `output/YYYY-MM-DD-product-definition.md`：

```markdown
## 产品架构

### 技术栈声明（Phase 1 确定，不可跳过）
- 框架：[React/Next.js / Vue/Nuxt / 单文件 HTML / 其他（请注明）]
- 样式方案：[Tailwind / CSS Modules / styled-components / 内联 CSS / 其他]
- 构建工具：[Vite / Create React App / 无]

### 页面清单
| 页面 | 用途 | 布局模式 | 优先级 |
|------|------|----------|--------|
| 首页 | ... | F型/网格 | P0 |

### 核心用户流程（基于 AARRR 模型）
1. 获取 → 落地页（首屏传达核心价值）
2. 激活 → [核心功能页]（缩短到达 Aha Moment 路径）
3. 留存 → [持续使用功能]
```

**写入后宣告：**
> "已写入 `output/YYYY-MM-DD-product-definition.md`。请确认后进入 Phase 3。"

用户确认后才进入 Phase 3。用户要求修改 → 改后重新宣告。

---

## Phase 3: Design Read — 铁律 1 执行点

<HARD-GATE>
无 Design Read → 不能写一行代码、创建组件、搭建项目结构。
适用于每个项目，无论多简单。一个按钮也有颜色/间距/触控/状态。
</HARD-GATE>

**反模式："太简单了，不需要 Design Read"**
每个项目都需要。简单页面正是未经审视假设造成最多返工的地方。Design Read 可很短（3 句话），但**必须**输出。

<EXTREMELY-IMPORTANT>
**没有 Design Read 就不能写一行代码。**
不是建议，不是最佳实践——是铁律。
跳过 = 无脑模板 = AI 味代码。
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

**设计性格**：（详见 `references/craft/design-character.md`）
- 大胆度（Boldness）：[1-10] + 心理学依据
- 动效度（Motion）：[1-10] + 心理学依据
- 密度（Density）：[1-10] + 心理学依据
- 令人难忘的品质："[一句话描述用户关掉页面后会记住的东西]"

**素材计划**：
- 图标：[库名] + CDN 引入方式
- 插画：[资源名] + 用途
- 图片：[占位/真实] + 来源
```

**写入后宣告：**
> "已写入 `output/YYYY-MM-DD-design-read.md`。请确认后进入 Phase 4。"

用户确认 → 进入 Phase 4。用户要求修改 → 改后重新宣告。

**合理化预防：**
| 借口 | 现实 |
|------|------|
| "我知道该怎么做，不需要写下来" | 写下来防止编码时遗忘决策。 |
| "Design Read 太费时间" | 30 秒写 vs 30 分钟返工。 |
| "用户只想要一个按钮" | 按钮也有颜色/间距/触控/状态。都需要决策。 |

**Design Read 自检（写完后立即执行）：**
1. **占位符扫描** — "TBD"、"TODO"、"[待补充]"？修掉。
2. **内部一致性** — 项目类型与页面清单匹配？风格与品牌路由匹配？
3. **范围检查** — 是否需要拆分子项目？
4. **歧义检查** — 决策可被理解成两种方式？选一种并明确。

---

## 禁止回复

交付和迭代中**绝不**使用：
| 禁止 | 应说 |
|------|------|
| "看起来没问题" | "检查 10/10 通过。证据：[数据]" |
| "应该可以了" | "质量检查结果：[数据]" |
| "我觉得这个设计合理" | "根据 [定律]，设计满足 [阈值]" |
| "完成了！" (没跑检查) | "质量检查通过：[证据]。交付。" |
| "Great point!" / "好建议！" | 重述技术需求，然后验证或行动 |
| "谢谢你的反馈" | 直接修复，行动代替感谢 |

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
5. **设定设计性格（Design Character）：** Boldness / Motion / Density 三轴值（详见 `references/craft/design-character.md`）
6. **声明"令人难忘的品质"：** 一句话说出这个页面最独特的东西

**必须遵守的设计硬规则（详见 `references/craft/` 目录）：**

**间距（铁律 4）：** 所有间距 4 的倍数（4/8/12/16/20/24/32/48/64/96px）
**排版：** 中文行高 ≥ 1.6，英文 ≥ 1.4；字号 ≥ 14px；每页 ≤ 3 种字号；行宽 ≤ 65ch
**对比度：** 正文 ≥ 4.5:1（WCAG AA），大文字/UI ≥ 3:1；焦点指示器 2px solid
**触控目标：** 可交互元素 ≥ 44×44px，推荐 48px
**颜色：** CSS 变量，60-30-10，调色板 ≤ 5 色，禁止硬编码
**暗色模式：** 背景 #121212（非 #000），文字 #E0E0E0（非 #FFF），品牌色降饱和 10-20%
**语义化 HTML：** `<button>` 非 `<div onclick>`；`<nav>` 非 `<div class="nav">`
**五态覆盖：** Loading/Empty/Error/Populated/Edge
**设计性格：** Boldness/Motion/Density 三轴 + "令人难忘的品质"（→ `design-character.md`）
**视觉节奏：** Section 间距 ≥ 2 种值；标题下间距 < 标题上间距（→ `visual-rhythm.md`）
**强调色配给：** 主色每屏 ≤ 3 次（→ `color.md`）

<HARD-GATE>
**写之前必须读 craft 文件，按规则做。**

写表单控件前 → 读 `components.md`，按"select 必须替换为 Headless UI/自定义 button+ul"做
写卡片网格前 → 读 `components.md` 的卡片等高规则，按"所有卡片内部结构一致"做
写动效前 → 读 `animation-discipline.md`，按缓动曲线和时长做
写交互前 → 读 `accessibility-baseline.md`，按 Modal/Drawer 强制规则做

"我以为我知道" = 没读。没读 = 写错自负。不返工。
</HARD-GATE>

---

## Phase 5: 代码生成（任务分解模式）

**目标：** 按任务分解 → 逐个生成 → 逐个验证。
**指令：** `references/phases/phase5-code-generation.md`
**任务纪律：** `references/craft/task-execution.md`

**入口操作：**
1. 将 Phase 2 页面清单拆为 TodoWrite 子任务（每个页面一个）
2. **询问：** "是否需要生成 Mock API 服务？"（1-需要/2-不需要/3-稍后）
3. 按顺序逐个执行子任务

**每个子任务（每个页面）执行步骤：**
1. 骨架：语义化页面结构（header/main/nav/section/article/footer）
2. 令牌：CSS 变量定义 → 写入 `output/design-tokens.css`
3. 素材：图标库 CDN/npm + 占位图 + 插画
4. 内容：真实文案（**禁止 lorem ipsum**）
5. 交互 + **UI 组件完整化**：按钮状态 + 自定义 select/checkbox/scrollbar/alert
6. 状态：空状态/加载骨架屏/错误状态/边界处理
7. 动效：缓动曲线 + 时长阈值 + prefers-reduced-motion
8. **UI 完整性扫尾**：检查所有交互组件已主题化
9. **布局对齐校验**：flex 居中、同行等高、间距统一

**每完成一个子任务（必须执行）：**
```
1. ✅ 运行 quality-check.mjs（0 违规才能继续）
2. ✅ 更新 progress.md（结构化 checkpoint）
3. ✅ 标记 TodoWrite completed
4. → 下一个子任务
```

**进入 Phase 6 条件：** 所有子任务 ✅ 完成

---

## Phase 6: 质量门禁 + Critique Theater

<EXTREMELY-IMPORTANT>
**无质量检查 → 不能声称完成。**（铁律 2）
声称"完成了"但没跑检查 = 不诚实。
</EXTREMELY-IMPORTANT>

**目标：** 10 维量化 + **脚本扫描** + Anti-AI-Slop P0 + 最多 3 轮自审。
**指令：** `references/phases/phase6-quality-gate.md`
**工具：** `node scripts/quality-check.mjs <dir> --output output/quality-report.md --verbose`

<HARD-GATE>
**质量脚本必须能运行。**
脚本失败（SyntaxError / 依赖缺失 / 超时）→ 禁止跳过质量门禁。
必须执行手工 fallback：逐条读 `components.md` 的规则，按规则逐条检查代码。
手工检查结论写入质量报告，每条结论必须标注"手工检查（依据: components.md 第X条）"。
"脚本跑不起来就算了吧" = 不通过。
</HARD-GATE>

**硬性阈值：**

| 检查维度 | 阈值 | 通过 |
|----------|------|------|
| 间距 | 所有间距 4 的倍数 | 0 违规 |
| 字号 | 中文 ≥ 14px，每页 ≤ 3 种 | 全部 |
| 行高 | 中文 1.6-1.75，英文 1.4-1.5，行宽 ≤ 65ch | 全部 |
| 对比度 | 正文 ≥ 4.5:1，大文字/UI ≥ 3:1 | 全部 |
| 触控目标 | 可交互元素 ≥ 44×44px | 0 违规 |
| 五态覆盖 | Loading/Empty/Error/Populated/Edge | 每页 5/5 |
| 语义化 | button/nav/main/section/article | 0 div soup |
| CSS 变量 | 颜色/间距/字号用变量 | 0 硬编码 |
| 动效 | 只动画 transform/opacity，有 reduced-motion | 全部 |
| 响应式 | 375 / 768 / 1440px 三断点 | 3/3 |

**新增维度：**
| 质量脚本 | `scripts/quality-check.mjs` 零违规 | 0 违规 |
| 可访问性 | div onClick → button/role；Modal 有 role/aria-modal/遮罩/Esc | 全部 |
| UI 组件 | select/checkbox/scrollbar/alert 等已主题化，无浏览器原生 | 0 个原生 |
| API 契约 | docs/api-contract.md 存在；全部 approved 无 changes-requested | 完整 |
| 设计性格 | 与 Phase 3 声明一致 | 合理 |
| 视觉节奏 | Section 间距 ≥ 2 种值；标题下间距 < 标题上间距 | 全部 |
| 难忘品质 | 能一句话说出页面独特之处 | 存在 |

**Anti-AI-Slop P0（出现即返工）：**
- 紫蓝渐变（#6366f1 → #8b5cf6）
- Tailwind indigo/blue 做主色
- 装饰性渐变 blob / backdrop-filter 滥用
- 三列等宽卡片 + 统一 icon+标题+描述
- Lorem ipsum / "John Doe" / "Acme Corp"
- 只有默认状态，无空/加载/错误态

**Critique Theater（最多 3 轮）：**
```
1. 生成代码
2. 脚本扫描 → 修复 → 自审（对照清单）
3. 再审视（P0 Anti-AI-Slop + 视觉节奏）
通过 → 交付。3 轮仍有问题 → 标记局限，交付并说明
```

**合理化预防：**
| 借口 | 现实 |
|------|------|
| "看起来没问题" | "看起来"不是证据。跑清单。（铁律 6） |
| "用户没要求这么严格" | 质量标准不取决于用户要求。底线。 |
| "时间不够了" | 检查 2 分钟。返工 20 分钟。 |
| "已经检查过了" | 每次修改后必须重新检查。 |

---

## Phase 7: 交付

完成后：
1. 展示量化检查结果—**铁律 6 要求的证据**
2. 列出已实现的页面和功能
3. 说明设计决策的心理学依据
4. 询问："哪个部分想调整？"

---

## Phase 8: 文档生成与项目收尾

**必须执行（按顺序）：**
1. **API 契约推导** → 扫描所有 fetch/axios → 写入 `docs/api-contract.md`（含 🟢/🟡/🔴 校验）
2. **组件文档生成** → 每个核心组件写入 `docs/components/*.md`（含状态预览代码块）
3. **Mock API**（如 Phase 5 选择"需要"）→ 写入 `mock-api.js` + `docs/mock-api.md`
4. **CHANGELOG 更新** → 追加到 `docs/CHANGELOG.md`（`## YYYY-MM-DD`）
5. **docs/README.md 生成** → 文档总索引
6. **progress.md 更新** → 标记 Phase 8 完成
7. **展示收尾摘要**：
   - 生成文件清单
   - API 契约审核状态（approved / draft / changes-requested）
   - 组件文档覆盖率（N/M）
   - 质量门禁结果

**指令：** `references/craft/documentation-standards.md`（文档体系）
**指令：** `references/craft/api-contract-standards.md`（API 契约）
**指令：** `references/craft/component-documentation.md`（组件文档）

**进度持久化：** 对话记忆不存活。`output/progress.md` 是唯一恢复地图。

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

## 匹配形式到失败类型

不同 AI 失败需不同指导。**禁止列表不能解决输出形状问题。**

| 失败类型 | 正确形式 | 错误形式 |
|----------|---------|---------|
| **压力违规**（知道规则但跳过） | 禁止+合理化表+红旗 | 软性引导 |
| **形状错误**（结构不对） | 正面配方（精确输出结构） | 禁止列表 |
| **遗漏元素**（缺少必需部分） | REQUIRED 字段/模板槽位 | 散文提醒 |
| **条件行为**（应据情况选择） | 基于可观察条件的分支 | 无条件规则+豁免 |

**示例：**
- Agent 跳过 Design Read → `<HARD-GATE>` + 铁律 + 红旗（压力违规）
- Design Read 格式不对 → 精确输出模板（形状错误）
- Design Read 缺心理学依据 → 模板加 `**心理学依据**：` REQUIRED 字段（遗漏元素）

---

## Craft 通用工艺（21 个维度，按需加载）

生成代码时根据页面类型加载所需的 craft 文件：

| Craft 文件 | 内容 | 何时加载 |
|------------|------|----------|
| `references/craft/typography.md` | 字体配对/层级/中英文规则/65ch 行宽 + **字号三级体系** | 所有页面 |
| `references/craft/color.md` | 60-30-10/色彩心理学/WCAG/暗色模式 + **调色板路由入口** | 所有页面 |
| `references/craft/color-palettes.md` | **20 个经过验证的调色板**（含 hex）+ 项目类型×风格路由表 | 确定配色时（**必加载**） |
| `references/craft/spacing.md` | 4的倍数网格/嵌套递进/组件间距 | 所有页面 |
| `references/craft/anti-ai-slop.md` | P0/P1/P2 分级反 AI 视觉臭味 + Before/After | 所有页面 |
| `references/craft/components.md` | 统一尺寸表/按钮/输入框/卡片/导航 | 有组件的页面 |
| `references/craft/laws-of-ux.md` | 15条认知心理学定律/认知负荷/说服性设计/AARRR/Hook | 布局决策时 |
| `references/craft/state-coverage.md` | 五态完整性矩阵/表单状态机 | 有数据展示的页面 |
| `references/craft/animation-discipline.md` | 缓动曲线/时长阈值/性能规则 | 有动效的页面 |
| `references/craft/accessibility-baseline.md` | WCAG 2.2 AA 必检项/语义 HTML/键盘导航 + **Modal/Drawer 强制规则** | 所有页面 |
| `references/craft/form-validation.md` | 验证状态机/时机规则/错误信息写法 | 有表单的页面 |
| `references/craft/design-resources.md` | 图标库/插画/图片/纹理按场景路由 + CDN | 需要素材时 |
| `references/craft/platform-philosophy.md` | C端/B端/G端/IoT 平台设计哲学+决策速查表 | 确定平台类型时 |
| `references/craft/responsive-strategy.md` | Mobile-first/Grid vs Flex/Container Queries/dvh | 响应式适配时 |
| `references/craft/media-and-video-pages.md` | **视频播放器/播放列表/直播/缩略图/全屏/字幕专项指南** | **媒体/视频类页面** |
| **`references/craft/design-character.md`** | **设计性格系统 — Boldness/Motion/Density 三轴 + 令人难忘的品质** | **Phase 3 Design Read + Phase 4 强制** |
| **`references/craft/visual-rhythm.md`** | **视觉节奏 — 间距变化哲学 + 节奏模式 + 不对称布局** | **Phase 4 布局决策 + Phase 5 代码生成** |
| **`references/craft/creative-code-references.md`** | **艺术性前端代码资源 — 可直接学习的获奖站点源码 + 6 种艺术风格代码模式** | **Boldness ≥ 6 或 创意/游戏/品牌官网项目** |
| **`references/craft/task-execution.md` (NEW)** | **任务分解 + checkpoint + 上下文恢复** | **Phase 5 多页面项目** |
| **`references/craft/documentation-standards.md` (NEW)** | **docs/ 目录体系 + 文档生命周期 + ADR** | **Phase 8 文档生成** |
| **`references/craft/component-documentation.md` (NEW)** | **组件状态预览标准 + Markdown 内嵌代码块** | **Phase 5 Step 6.5 + Phase 8** |
| **`references/craft/api-contract-standards.md` (NEW)** | **API 契约格式 + 双重校验 + 字段映射** | **Phase 5 Step 7.6 + Phase 6** |

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
