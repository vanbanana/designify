# Component Documentation — 组件文档与状态预览标准

> **何时加载：** Phase 5 Step 6.5 组件文档生成时。Phase 7/8 文档阶段必读。
> **核心原则：** 零框架、零依赖、AI 可写可读、最省 token。

---

## 为什么用 Markdown 而不是 Storybook

| 方案 | token 成本 | 依赖 | AI 可读 | AI 可写 |
|------|-----------|------|---------|---------|
| Storybook | 极高 | React + Webpack | ❌ | ❌ |
| Ladle | 高 | Vite + React | ❌ | ❌ |
| 独立 HTML | 中 | 无 | ✅ | ⚠️ |
| **Markdown 内嵌代码块** | **极低** | **无** | **✅** | **✅** |

**选择的方案：直接在组件文档中用 Markdown 代码块展示每个状态。** 一个文件 = 组件文档 + 状态预览 + 可读代码。

---

## 状态命名标准（对齐大厂规范）

每个组件必须覆盖以下状态的**子集**（根据组件类型选择适用的）：

| 状态 | 含义 | 适用组件 | 必须？ |
|------|------|---------|--------|
| `default` | 默认/正常状态 | 所有组件 | ✅ 必须 |
| `loading` | 加载中 | 数据展示组件 | ✅ 有数据时 |
| `empty` | 无数据 | 列表/表格/卡片 | ✅ 有数据时 |
| `error` | 错误/失败 | 所有可能失败的组件 | ✅ 有数据时 |
| `disabled` | 禁用 | 按钮/输入/表单控件 | ⚠️ 交互组件 |
| `hover` | 悬停 | 所有可交互组件 | ⚠️ 关键组件 |
| `focus` | 聚焦 | 输入框/按钮 | ⚠️ 关键组件 |
| `active` | 激活/选中 | 导航/标签/切换 | ⚠️ 需要高亮的组件 |
| `edge` | 边界情况 | 所有组件 | ✅ 必须 |

---

## 组件文档模板（参考 Shopify Polaris + GitHub Primer）

每个组件在 `docs/components/<name>.md` 中：

```markdown
---
component: Button
status: ready                        # ready | beta | deprecated
updated: 2026-06-26
source: src/components/Button.jsx
---

# Button

> 按钮允许用户执行一个操作。按钮是界面中最核心的交互元素。

---

## 使用指南

### 何时使用
- 用户需要执行一个明确的操作（提交、保存、删除）
- 引导用户进入下一个步骤

### 何时不用
- 仅用于导航到新页面 → 用 Link 组件
- 用于切换开关状态 → 用 Switch 组件

### Variants

| Variant | 用途 | 视觉特征 |
|---------|------|----------|
| Primary | 核心操作，每屏最多 1 个 | 实心品牌色填充 |
| Secondary | 次要操作 | 描边+浅色填充 |
| Tertiary | 辅助操作 | 纯文字无背景 |
| Destructive | 危险操作（删除/退出） | 红色实心 |
| Ghost | 密集区域的操作 | 几乎透明 |

---

## Props

| 属性 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| label | `string` | — | ✅ | 按钮文字 |
| variant | `'primary' \| 'secondary' \| 'tertiary' \| 'destructive' \| 'ghost'` | `'primary'` | ❌ | 按钮风格 |
| disabled | `boolean` | `false` | ❌ | 禁用状态 |
| loading | `boolean` | `false` | ❌ | 加载状态 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | ❌ | 按钮尺寸 |
| onClick | `() => void` | — | ❌ | 点击回调 |
| type | `'button' \| 'submit'` | `'button'` | ❌ | HTML type |

---

## States

### Default

\`\`\`html preview
<button class="btn btn-primary">提交</button>
\`\`\`

### Loading

\`\`\`html preview
<button class="btn btn-primary" disabled>
  <span class="spinner"></span> 处理中...
</button>
\`\`\`

### Disabled

\`\`\`html preview
<button class="btn btn-primary" disabled>提交</button>
\`\`\`

### Hover

\`\`\`html preview
<button class="btn btn-primary" style="filter:brightness(0.9)">提交</button>
\`\`\`

### Active / Pressed

\`\`\`html preview
<button class="btn btn-primary" style="transform:scale(0.98)">提交</button>
\`\`\`

### Edge — 超长文本

\`\`\`html preview
<button class="btn btn-primary" style="max-width:120px">
  超长按钮文案内容测试
</button>
<!-- text-overflow: ellipsis -->
\`\`\`

---

## Best Practices

✅ **Do:**
- 按钮文字是动词：`保存`、`提交`、`删除`，而不是名词
- Primary 每屏只用一次
- 按钮高度与同行的输入框高度一致

❌ **Don't:**
- 不要用按钮做导航链接
- 不要在禁用按钮上绑 tooltip（屏幕阅读器读不到）
- 不要在一行里放超过 2 个 Primary 按钮

---

## Content Guidelines

- 按钮文字使用动词：`保存` `提交` `删除` `创建`
- 不要用名词：`项目` `文件`（用户不知道点了会怎样）
- 使用句首大写：中文用正常书写，英文用 sentence case
- 文字不超过 6 个中文字符 / 15 个英文字符
- 不要用标点结尾

```markdown
✅ 保存项目     ✅ 提交订单     ✅ 删除账户
❌ 项目保存     ❌ 提交         ❌ 删除
```

## Accessibility

- 所有按钮必须有可访问的名称（文字内容或 aria-label）
- Loading 状态：用 `aria-busy="true"` + `disabled`
- Disabled 状态：`aria-disabled="true"`
- 触控目标 ≥ 44×44px

```html
✅ <button aria-label="关闭" aria-busy="true" disabled>处理中...</button>
```

## Related Components

- [Link](./link.md) — 导航到新页面
- [IconButton](./icon-button.md) — 只有图标没有文字的按钮
- [SplitButton](./split-button.md) — 主操作+下拉菜单组合
```

---

## 质量检查：验证状态覆盖

**Phase 6 中必须逐组件验证：**

```
组件状态覆盖检查清单：
- [ ] default — 存在且正确
- [ ] loading — 存在（有数据的组件）
- [ ] empty — 存在（有数据的组件）
- [ ] error — 存在（有数据的组件）
- [ ] disabled — 存在（交互组件）
- [ ] edge — 存在（边界情况处理）
```

**判断标准：**
- ✅ 该状态的 `html preview` 代码块存在于 `docs/components/*.md` 中
- ❌ 代码块不存在 → 标记为缺失状态，要求补充
- ⚠️ 代码块存在但内容为空 → 标记为不完整，要求填充

---

## 铁律

```
铁律: 每个数据展示组件必须有 loading / empty / error / default 四个状态文档。
铁律: 状态预览使用 ```html preview 代码块，不引入任何框架。
铁律: 组件文档更新时，状态预览必须同步更新。
```