# Components Craft — 组件设计规范

> 通用组件设计规则，确保每个组件达到生产级品质。
> **所有交互组件必须与主题同步，禁止使用浏览器原生默认样式。**

---

## UI 完整性铁律

```
铁律: 所有表单控件（input/select/checkbox/radio/switch/textarea）必须自定义样式，不能使用浏览器原生。
铁律: 滚动条必须自定义样式（::-webkit-scrollbar），不能使用浏览器默认。
铁律: alert / toast / notification 必须用 HTML/CSS 实现，不能依赖浏览器弹窗（alert/confirm/prompt）。
铁律: 每个组件必须对齐其相邻组件的视觉重量（高度、圆角、字重一致）。
```

## 按钮系统

### 层级（必须 3 级以上）

```
Primary（主操作）：   实心填充主色，白字，每屏最多 1 个
Secondary（次操作）：  描边或浅色填充，主色文字
Tertiary（辅助操作）： 纯文字，无背景无边框
Destructive（危险操作）：红色实心，仅用于删除/退出
Ghost（幽灵按钮）：    几乎透明，用于工具栏/密集操作区
```

### 必须实现的 5 种状态

```
Default:  基础样式
Hover:    背景色加深 5-10%，或边框出现
Active:   背景色加深 15-20%，或内缩 1px（scale(0.98)）
Focus:    外发光环（outline: 2px solid var(--color-primary), offset 2px）
Disabled: opacity: 0.4 + cursor: not-allowed
Loading:  文字替换为 Spinner + "处理中..."，按钮宽度不变
```

### 尺寸

```
Large:  48px 高，16px 文字，24px 水平内边距 → 用于 Hero CTA
Medium: 40px 高，14px 文字，16px 水平内边距 → 默认尺寸
Small:  32px 高，13px 文字，12px 水平内边距 → 表格行/密集区
Mini:   24px 高，12px 文字，8px 水平内边距  → 标签/芯片
```

## 卡片

### 结构

```
┌──────────────────────────┐
│ [可选：图片/媒体区域]      │
├──────────────────────────┤
│ padding: 16-24px         │
│                          │
│ 标题（H3）                │
│ margin-bottom: 8px       │
│                          │
│ 描述文字（Body/Small）    │
│ margin-bottom: 16px      │
│                          │
│ [可选：底部操作区]         │
└──────────────────────────┘
```

### 卡片反模式

- ❌ 所有卡片一样的大小 → 用内容决定高度
- ❌ 只有阴影区分卡片和背景 → 暗色模式用边框
- ❌ 卡片内没有视觉焦点 → 每个卡片要有一个主要元素
- ❌ 卡片间距 < 卡片内边距 → 违反亲密性原则

## 表单

### 输入框状态

```
Default:  1px 边框，背景色
Hover:    边框色加深
Focus:    边框变主色 + 外发光环
Filled:   有值时边框色正常
Error:    边框变红 + 下方红色错误文字
Disabled: 灰色背景 + 不可编辑
Loading:  右侧出现 Spinner
```

### 表单布局规则

- 标签在输入框上方（不是左侧，除非是极短表单）
- 错误提示紧跟输入框下方，用红色小字
- 必填标识用红色 * 号
- 提交按钮在表单底部，与最后一个字段间距 24px
- 表单最大宽度 480-640px（太宽用户视线跳跃）

## 导航

### 顶部导航

```
桌面端：Logo(左) + 主导航链接(中或左) + 操作区(右，含 CTA)
移动端：Logo(左) + 汉堡菜单(右)，或 Logo(左) + 搜索(右)
高度：56-64px（桌面），48-56px（移动）
```

### 侧边导航

```
展开宽度：240-280px
收起宽度：64px（只显示图标）
分组：用 12px 间距和大写灰色标题分组
当前项：左侧 3px 主色条 + 背景色微变
```

## 空状态

### 结构（必须有引导性）

```
┌──────────────────────┐
│                      │
│    [图标/插图]        │
│                      │
│   标题（说明原因）     │
│   "还没有任何订单"    │
│                      │
│   描述（引导下一步）   │
│   "创建你的第一个订单  │
│    开始使用平台"       │
│                      │
│   [操作按钮]          │
│   "创建订单"          │
│                      │
└──────────────────────┘
```

**绝对不要只写"暂无数据"四个字。**

## 加载状态

### 骨架屏规则

```
- 骨架屏形状要模拟真实内容结构
- 文字用圆角矩形（高度 12-16px，宽度随机 60-90%）
- 图片用大矩形（保持真实图片的宽高比）
- 骨架屏有脉冲动画（opacity 0.3 → 0.6 → 0.3，周期 1.5s）
- 颜色：浅灰（亮色模式）或深灰（暗色模式）
```

## 微交互

### 必须有的过渡

```
按钮 hover/active:     transition: all 150ms ease
卡片 hover:            transition: transform 200ms ease, box-shadow 200ms ease
导航项切换:            transition: background-color 150ms ease
下拉菜单展开/收起:     transition: opacity 150ms ease, transform 150ms ease
页面切换:              transition: opacity 200ms ease
```

### 动效原则

- **进入用 ease-out（快进慢停），退出用 ease-in（慢进快出）**
- 持续时间：微交互 100-200ms，页面过渡 200-400ms，复杂动画 400-800ms
- 不要同时动超过 3 个元素
- `transform` 和 `opacity` 性能最好，避免动画 `width/height/top/left`

### 统一尺寸参照表

| 组件 | 小(S) | 中(M/默认) | 大(L) | 备注 |
|------|-------|-----------|-------|------|
| 按钮高度 | 32px | 40-48px | 56px | Material 推荐 56px 触控区 |
| 输入框高度 | 32px | 40-48px | 56px | 必须与同级按钮等高 |
| 卡片宽度 | 280px | 343px | 480px(max) | Feed 常用 343px |
| 模态框宽度 | 400px | 600px | 800px | 超过 800px 阅读效率下降 |
| 导航栏高度 | 56px(移动) | 64px | 64px(桌面) | 移动端含触控安全区 |
| 侧边栏宽度 | 64px(收起) | 240px | 280px | 收起态仅显示图标 |
| 表格行高 | 48px(紧凑) | 56px | 64px(宽松) | 数据密集=紧凑；阅读=宽松 |
| 头像尺寸 | 24px | 32-48px | 64-96px | 小=列表内；中=卡片内；大=个人页 |
| 标签/徽章 | 20px高 | 24px高 | 32px高 | 水平内边距 8px，垂直 4px |
| 触控目标 | 24px(WCAG最低) | 44px(Apple) | 48dp(Google) | 建议统一用 48px |

### 触控目标规则

```
所有可交互元素的触控目标 >= 44x44px（Apple HIG）或 48x48dp（Material Design）。
即使视觉尺寸更小（如 24px 图标），触控区域必须用 padding 扩展到 44px+。
高频操作按钮放在拇指热区（手机屏幕下半部分居中位置）。
屏幕边缘和角落是"无限大"目标（鼠标不会超过边界）。
```

## 缺失组件清单（AI 最易遗漏——必须逐项确认）

### Select / 下拉选择框
```
❌ 浏览器原生: <select><option>选项</option></select>（白底+系统字体）
✅ 自定义样式:
  .custom-select {
    appearance: none;            /* 干掉原生箭头 */
    -webkit-appearance: none;
    background-image: url("data:image/svg+xml,...chevron-down..."); /* 自定义箭头 */
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 36px;
    border: 1px solid var(--color-border);
    border-radius: 8px;
    background-color: var(--color-surface);
    color: var(--color-text);
    font-size: 14px;
    height: 40px;                /* 与同级 input 等高 */
  }
  .custom-select:focus {
    border-color: var(--color-primary);
    box-shadow: 0 0 0 2px var(--color-primary-alpha);
    outline: none;
  }
```

**条件：** appearance: none + 自定义箭头 SVG

### Checkbox / Radio
```
❌ 浏览器原生: <input type="checkbox">（系统默认勾号，无法变色）
✅ 自定义样式:
  .custom-checkbox {
    appearance: none;
    width: 20px; height: 20px;
    border: 2px solid var(--color-border);
    border-radius: 4px;          /* checkbox 用 4px */
    background: var(--color-surface);
    cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center;
  }
  .custom-checkbox:checked {
    background: var(--color-primary);
    border-color: var(--color-primary);
  }
  .custom-checkbox:checked::after {
    content: '✓';
    color: #fff;
    font-size: 14px;
    font-weight: 700;
  }
  /* Radio 用圆形 */
  .custom-radio { border-radius: 50%; }
  .custom-radio:checked::after {
    content: ''; width: 8px; height: 8px;
    background: #fff; border-radius: 50%;
  }
```

**条件：** appearance: none + 自定义 checked 状态 + 与表单字号对齐

### Switch / 开关
```
.switch {
  width: 44px; height: 24px;
  background: var(--color-border);
  border-radius: 12px;
  cursor: pointer;
  position: relative;
  transition: background 200ms ease;
}
.switch[aria-checked="true"] { background: var(--color-primary); }
.switch::after {
  content: ''; position: absolute;
  width: 20px; height: 20px;
  background: white; border-radius: 50%;
  top: 2px; left: 2px;
  transition: transform 200ms ease;
}
.switch[aria-checked="true"]::after { transform: translateX(20px); }
```

### Textarea / 多行输入
```
.textarea {
  min-height: 100px;             /* 至少显示 3 行 */
  resize: vertical;              /* 仅允许垂直缩放 */
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 12px 16px;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.6;
}
.textarea:focus { border-color: var(--color-primary); outline: none; }
```

### Alert / Toast / Notification（禁止使用浏览器 alert）
```
❌ window.alert('操作成功')     → 系统弹窗，无法主题化
❌ window.confirm('确定删除？')  → 无法自定义按钮文字和样式
✅ 自定义实现:
  .toast {
    position: fixed; bottom: 24px; right: 24px;
    padding: 12px 20px;
    background: var(--color-text);
    color: var(--color-bg);
    border-radius: 8px;
    font-size: 14px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    animation: toast-in 300ms ease, toast-out 300ms ease 2.7s forwards;
  }
  @keyframes toast-in { from { opacity: 0; transform: translateY(12px); } }
  @keyframes toast-out { to { opacity: 0; transform: translateY(-4px); } }
  
  /* 确认对话框 */
  .confirm-dialog {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex; align-items: center; justify-content: center;
    z-index: 1000;
  }
  .confirm-dialog-box {
    background: var(--color-surface);
    border-radius: 12px;
    padding: 24px;
    max-width: 400px;
    width: 90%;
  }
  .confirm-dialog-box h3 { margin-bottom: 12px; }
  .confirm-dialog-box .actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 20px; }
```

### Scrollbar / 滚动条（禁止使用浏览器默认）
```css
/* 全局滚动条样式 */
::-webkit-scrollbar { width: 6px; height: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover { background: var(--color-text-muted); }

/* Firefox */
* { scrollbar-width: thin; scrollbar-color: var(--color-border) transparent; }
```

### Tooltip / 提示
```css
.tooltip-trigger { position: relative; }
.tooltip-trigger::after {
  content: attr(data-tooltip);
  position: absolute; bottom: calc(100% + 6px); left: 50%;
  transform: translateX(-50%);
  padding: 4px 10px;
  background: var(--color-text);
  color: var(--color-bg);
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  opacity: 0; pointer-events: none;
  transition: opacity 150ms ease;
}
.tooltip-trigger:hover::after { opacity: 1; }
```

### Tag / Badge / 徽章
```css
.tag {
  display: inline-flex; align-items: center;
  padding: 2px 10px;
  border-radius: 12px;              /* 胶囊形 */
  font-size: 12px;
  font-weight: 500;
  line-height: 20px;                /* 定高 20px */
  background: var(--color-surface);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border);
}
.tag-success { background: #dcfce7; color: #166534; border-color: #86efac; }
.tag-error   { background: #fee2e2; color: #991b1b; border-color: #fca5a5; }
.tag-warning { background: #fef3c7; color: #92400e; border-color: #fcd34d; }
```

### Progress / 进度条
```css
.progress {
  height: 6px;
  background: var(--color-border);
  border-radius: 3px;
  overflow: hidden;
}
.progress-bar {
  height: 100%;
  background: var(--color-primary);
  border-radius: 3px;
  transition: width 300ms ease;
}
```

### Spinner / 加载指示器（禁止用文字"加载中..."）
```css
.spinner {
  width: 24px; height: 24px;
  border: 3px solid var(--color-border);
  border-top-color: var(--color-primary);
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
```

### Pagination / 分页
```
页码按钮与输入框等高（40px），当前页高亮用品牌色。
```
```css
.pagination { display: flex; align-items: center; gap: 4px; }
.page-btn {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 14px;
  cursor: pointer;
}
.page-btn.active { background: var(--color-primary); color: #fff; border-color: var(--color-primary); }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }
```

### 布局对齐规则（解决"不居中、不对齐"）

```
核心原则：同一行的相邻元素必须在基线上对齐。

高度对齐：
  ├── 按钮+输入框：高度必须一致（用 h-10 / height: 40px 统一）
  ├── 图标+文字：flex align-items: center
  ├── 标签+输入框：标签上边缘与输入框上边缘对齐
  └── 同一行所有控件 height 值一致

间距对齐：
  ├── 列表项之间的间距一致（16px）
  ├── 同一卡片内所有标题的字重一致
  └── 左右内边距对称

Flex 居中最易犯错（必用）：
  .center-row { display: flex; align-items: center; }           /* 垂直居中 */
  .center-all { display: flex; align-items: center; justify-content: center; } /* 完全居中 */
  .center-col { display: flex; flex-direction: column; align-items: center; }  /* 列居中 */
```

## UI 组件完整性检查清单（生成后逐项确认）

```
通用：
- [ ] 滚动条已自定义（非浏览器默认）
- [ ] alert/confirm/prompt 未使用（改用自定义 Toast/Modal）
- [ ] tooltip 使用纯 CSS 实现
- [ ] 所有组件共享同一圆角体系

表单：
- [ ] <select> 已自定义（appearance: none + 自定义箭头）
- [ ] <input type="checkbox"> 已自定义
- [ ] <input type="radio"> 已自定义
- [ ] switch 使用自定义实现
- [ ] textarea 有 min-height + resize: vertical
- [ ] 所有表单控件高度对齐（统一 40px 或 48px）
- [ ] 所有表单控件 focus 状态统一

导航/信息：
- [ ] 分页组件已自定义（非原生 <a> 列表）
- [ ] loading 使用自定义 Spinner（非"加载中..."文字）
- [ ] tag/badge 有语义色（success/error/warning）
- [ ] progress bar 有动画过渡

布局：
- [ ] 同一行相邻元素高度一致
- [ ] flex 居中使用了 align-items/justify-content（非 margin auto）
- [ ] 列表项间距一致
```

```
铁律: 触控目标 ≥ 44×44px。视觉尺寸可以小，触控区域必须大。
铁律: 按钮必须有层级（Primary/Secondary/Ghost）。不能所有按钮一个样。
铁律: 输入框高度必须与同级按钮等高。
```

## 合理化预防

| 借口 | 现实 |
|------|------|
| "这个图标按钮 24px 够了" | 24px 是 WCAG 最低线。Apple HIG 要求 44px。用 padding 扩展触控区。 |
| "所有按钮一样更统一" | 统一 ≠ 无层级。Primary 按钮必须视觉上最突出。 |
| "输入框小一点更紧凑" | 紧凑不等于难操作。高度与按钮等高是可用性底线。 |
| "卡片不需要 max-width" | 没有 max-width 的卡片在大屏上拉伸到 800px+ = 阅读灾难。 |
| "导航不需要当前页高亮" | 用户必须知道自己在哪里。aria-current="page" 是无障碍要求。 |
