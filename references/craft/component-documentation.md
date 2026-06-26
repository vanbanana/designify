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

## 组件文档模板

每个组件在 `docs/components/<name>.md` 中：

```markdown
# [组件名]

> updated: YYYY-MM-DD
> 用途：[一句话说明]

## Props（属性）

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| label | string | "提交" | 按钮文字 |
| variant | 'primary' \| 'secondary' | 'primary' | 按钮风格 |
| disabled | boolean | false | 是否禁用 |

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
<button class="btn btn-primary" style="background:#1a5cff">提交</button>
\`\`\`
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