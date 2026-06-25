---
name: responsive-strategy
description: Responsive design engineering strategy — from Mobile-first philosophy to Container Queries.
version: 1.0.0
---

# Responsive Design Engineering Strategy

## 1. Mobile-first 哲学

- 先设计最小屏幕，再向上增强。迫使团队聚焦核心内容——因为屏幕有限，优先级无法回避。
- CSS 实现：使用 `min-width` 媒体查询（向上扩展），而非 `max-width`（向下缩减）。
- 数据支撑：全球移动端流量占比 >60%，Mobile-first 就是现实优先。
- 思维转变：不是"桌面版缩水"，而是"从核心体验生长"。

```css
/* Mobile-first: 基础样式即移动端 */
.card { padding: 1rem; }

/* 向上增强 */
@media (min-width: 768px) {
  .card { padding: 1.5rem; }
}
```

## 2. 断点策略：内容断点 > 设备断点

- 从设备断点转向**内容断点**：逐渐缩小浏览器窗口，在内容"断裂"处设置断点。
- 参考断点（仅作起点）：

| 断点 | 典型场景 |
|------|----------|
| 320px | 手机竖屏（最小目标） |
| 768px | 平板 / 横屏手机 |
| 1024px | 小笔记本 / iPad Pro |
| 1440px | 桌面显示器 |

- 关键原则：断点为内容服务，不是为设备清单服务。

## 3. CSS Grid vs Flexbox 决策树

- **CSS Grid** — 2D 布局（行和列同时控制）。适合仪表盘、画廊、复杂页面骨架。
- **Flexbox** — 1D 布局（单方向 + 换行）。适合导航栏、按钮组、卡片行。
- **组合用法**：Grid = 页面骨架，Flexbox = 组件内部。

```css
/* Grid: 页面整体骨架 */
.page { display: grid; grid-template-columns: 240px 1fr; }

/* Flexbox: 组件内部排列 */
.nav { display: flex; gap: 0.5rem; align-items: center; }
```

## 4. 流式布局 & 弹性媒体

- 用百分比宽度或 `max-width` 替代固定像素，让内容自然流动。
- 响应式图片三件套：`srcset`、`<picture>` 元素、`max-width: 100%`。
- 永远不要让图片溢出容器：

```css
img, video { max-width: 100%; height: auto; }
```

## 5. Container Queries — 范式转变

- 传统 Media Queries 基于**视口宽度**，组件无法做到上下文无关。
- Container Queries 基于**父容器尺寸**：同一卡片组件在 320px 侧栏和 800px 主区域自动适配。
- 所有主流浏览器已支持（Chrome 105+、Safari 16+、Firefox 110+）。

```css
.card-wrapper { container-type: inline-size; }

@container (min-width: 400px) {
  .card { flex-direction: row; }
}
```

## 6. 视口单位注意事项

- `vh / vw / vmin / vmax` 适合 hero 区域、动态字号。
- **陷阱**：移动端浏览器地址栏收缩/展开会改变视口高度，导致 `vh` 跳变。
- **解决方案**：使用 `dvh`（dynamic viewport height），自动跟随可见视口。

```css
.hero { min-height: 100dvh; } /* 而非 100vh */
```

## 7. 响应式内容策略

- 响应式不只是缩小尺寸，更要**调整内容优先级**。
- 移动端：隐藏次要信息、强调核心操作。
- 触控目标在移动端必须放大到 **48px+**（WCAG 标准）。
- 导航模式随屏幕切换：桌面侧栏 → 移动端底部 Tab 或汉堡菜单。
- 文字排版：移动端适当增大基础字号（16px+），行高 ≥ 1.5。
