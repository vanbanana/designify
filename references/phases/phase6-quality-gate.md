# Phase 6: 质量门禁 + Critique Theater — 详细指令

结果写入 `output/quality-report.md`

---

## 量化检查清单（硬性阈值，不是模糊打分）

| 检查维度 | 具体阈值 | 通过条件 |
|----------|----------|----------|
| **间距** | 所有 margin/padding/gap 是 4 的倍数 | 0 个硬编码奇数值 |
| **字号** | 中文 ≥ 14px，每页 ≤ 3 种字号，相邻层级差 ≥ 2px | 全部通过 |
| **行高** | 中文 1.6-1.75，英文 1.4-1.5，行宽 ≤ 65ch | 全部通过 |
| **对比度** | 正文 ≥ 4.5:1，大文字/UI ≥ 3:1 | 全部通过 |
| **触控目标** | 所有可交互元素 ≥ 44×44px | 0 个违规 |
| **五态覆盖** | Loading/Empty/Error/Populated/Edge | 每页 5/5 |
| **语义化** | button/nav/main/section/article | 0 个 div soup |
| **CSS 变量** | 颜色/间距/字号全部用变量 | 0 个硬编码色值 |
| **动效** | 只动画 transform/opacity，有 reduced-motion | 全部通过 |
| **响应式** | 375px / 768px / 1440px 三断点可用 | 3/3 通过 |

---

## Anti-AI-Slop P0 检查（出现即返工）

详见 `references/craft/anti-ai-slop.md`（含 P0/P1/P2 严重分级）。

**P0（必须修复 — 一眼 AI 味）：**
- 紫蓝渐变背景（#6366f1 → #8b5cf6）
- Tailwind indigo/blue 作为主色
- 装饰性渐变 blob / backdrop-filter 滥用
- 三列等宽卡片 + 统一 icon+标题+描述 排列
- Lorem ipsum / "John Doe" / "Acme Corp"
- 只有默认状态，无空/加载/错误态

---

## Critique Theater（自审循环，最多 3 轮）

```
第 1 轮：生成代码
    ↓
第 2 轮：自审——对照量化清单逐项检查，发现问题立即修复
    ↓
第 3 轮：再审视——聚焦 P0 Anti-AI-Slop 和视觉节奏
    ↓
通过 → 交付。3 轮仍有问题 → 标记已知局限，交付并说明
```

---

## 响应式验证清单

- 375px（手机）：单列布局，导航折叠为汉堡菜单，触控目标 ≥ 44px
- 768px（平板）：可选双列，侧栏可收起
- 1440px（桌面）：完整布局，利用横向空间
