# 无障碍基线 — WCAG 2.2 AA 必检项

> 无障碍不是可选项。全球 22 亿+ 视觉障碍人群。法律要求（EU EAA、ADA、Section 508）。

## 必须项（缺一 = 不合格）

### 语义化 HTML
```html
✅ <button>提交</button>
❌ <div onclick="submit()">提交</div>

✅ <nav>...</nav>
❌ <div class="nav">...</div>

✅ <img src="..." alt="产品图片">
❌ <img src="...">（缺少 alt）
✅ <img src="decorative.svg" alt="">（装饰图片用空 alt）
```

### 标题层级
```
每页只有 1 个 <h1>
h2-h6 不能跳级（不能 h2 直接到 h4）
标题必须反映内容结构，不能仅为了样式使用标题标签
```

### 表单标签
```html
✅ <label for="email">邮箱</label>
   <input id="email" type="email">
❌ <input placeholder="请输入邮箱">（placeholder 不是 label）
```

### 焦点指示器
```css
/* 绝对禁止 */
*:focus { outline: none; }

/* 必须实现 */
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

### 键盘导航
```
所有交互功能必须可通过键盘操作：
- Tab：在交互元素间移动
- Enter/Space：触发按钮/链接
- Escape：关闭模态框/下拉菜单
- 方向键：在菜单/选项组内导航

模态框必须实现焦点陷阱（Tab 在内部循环）
```

### 颜色不作为唯一信息载体
```
❌ 错误状态只变红色边框（色盲用户看不出）
✅ 错误状态 = 红色边框 + 错误图标 + 文字说明

❌ 已选中状态只变绿色背景
✅ 已选中 = 绿色背景 + 勾号图标
```

### ARIA 属性
```html
<!-- 模态框 -->
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">

<!-- 当前页面导航 -->
<a href="/home" aria-current="page">首页</a>

<!-- 展开/折叠 -->
<button aria-expanded="false" aria-controls="menu-1">菜单</button>

<!-- 实时区域（AJAX 更新通知） -->
<div aria-live="polite">操作成功</div>
```

## 对比度要求

| 级别 | 正文文字 | 大文字（18px粗体或24px+） | UI 组件/图标 |
|------|----------|--------------------------|-------------|
| AA（最低合规） | **4.5:1** | **3:1** | **3:1** |
| AAA（更严格） | **7:1** | **4.5:1** | — |

- 相邻颜色之间也需要 3:1 对比度（如饼图相邻扇区）
- 品牌色如果对比度不够，必须调整明度而非换色

## 触控目标

```
所有可交互元素触控目标 >= 44x44px（Apple HIG）或 48x48dp（Material Design）
即使视觉尺寸更小（如 24px 图标），触控区域必须用 padding 扩展
相邻触控目标之间至少 8px 间距（防止误触）
```

## 响应式无障碍
```
- 文字可放大到 200% 而不丢失内容或功能
- 不使用纯图片展示文字信息（除了 Logo）
- 页面在 320px 宽度下所有功能可用
- 横屏/竖屏都能正常使用
```

## 多媒体无障碍
```
- 视频必须有字幕（至少）
- 音频内容必须有文字替代
- 图片轮播必须有 alt 文本和暂停控制
- 自动播放媒体必须可暂停/静音
```
