# Task Execution — 长期任务执行纪律

> **何时加载：** Phase 5 代码生成开始时。每次多页面项目必须加载。
> **核心原则：** 拆成小块、逐个验证、可恢复、不中断。

---

## 为什么任务必须拆分

AI 一次处理 10+ 组件会导致上下文污染、忘记前面的决策、做偏了要整页重来。

**正确做法：**
```
❌ 一次生成所有页面 → 上下文爆炸，容易出错
✅ 每个页面一个子任务 → 独立上下文，逐个验证，可恢复
```

---

## 任务拆分规则

Phase 2 确定页面清单后，**先把页面拆成 TodoWrite 子任务：**

```
TodoWrite:
- [ ] Phase 5: 首页 → src/pages/index.jsx
- [ ] Phase 5: 关于我们 → src/pages/about.jsx
- [ ] Phase 5: 作品展示 → src/pages/works.jsx
- [ ] Phase 5: 联系我们 → src/pages/contact.jsx
```

**粒度规则：**
- 每个子任务 = 一个完整页面，不超过 5 分钟
- 页面内有多个独立组件 → 在子任务描述中标注
- 不要在子任务之间共享上下文（每做完一个，上下文重置）

---

## 执行纪律

```
每完成一个子任务 → 立即执行：

1. ✅ 运行质量检查
   node scripts/quality-check.mjs <target-dir> --output output/quality-report.md
   必须是 0 违规才能进入下一个

2. ✅ 更新 progress.md（结构化 checkpoint）

3. ✅ 标记 TodoWrite 为 completed

4. → 进入下一个子任务
```

### 持续执行规则

```
🚫 不停顿问用户"还要继续吗？"
  用户在等你执行完。

🚫 不跳过质量检查
  每完成一个页面立即检查，不攒到 Phase 6。

🚫 跳过检查就声称完成 = 不诚实

✅ 除非遇到 BLOCKED（依赖缺失/指令不清），否则不停
✅ 遇到 BLOCKED → 说明问题 + 等待回答，不要猜
```

---

## Checkpoint 格式（progress.md）

每完成一个子任务，更新 `output/progress.md`：

```
# Progress Ledger
## Project: [项目名]
## 技术栈：[React/Next.js/单文件 HTML]

## Checkpoint
- [✅] Phase 1: 需求发现
- [✅] Phase 2: 产品定义 → output/YYYY-MM-DD-product-definition.md
- [✅] Phase 3: Design Read → output/YYYY-MM-DD-design-read.md
- [✅] Phase 4: 设计方向确认
- [⏳] Phase 5: 代码生成
  - ✅ 首页 → src/pages/index.jsx | quality: 0 违规 | 2026-06-26T10:30
  - ⏳ 关于我们 → src/pages/about.jsx | quality: 待检查
  - ⬜ 作品展示 → src/pages/works.jsx
  - ⬜ 联系我们 → src/pages/contact.jsx
- [⬜] Phase 6: 质量门禁
- [⬜] Phase 7: 交付
- [⬜] Phase 8: 文档生成

## 恢复路径（上下文压缩时使用）
> 最后完成: 首页 → src/pages/index.jsx
> 下一个: 关于我们 → src/pages/about.jsx
> 读: output/YYYY-MM-DD-design-read.md（设计方向）
> 读: docs/components/（已生成组件文档）
```

---

## 上下文恢复

```
<RECOVERY-PROCEDURE>
如果在执行过程中遭遇上下文压缩：

1. 读 output/progress.md 找到 Checkpoint
2. 找到最后一个 ✅ 的任务
3. 从下一个 ⏳ 或 ⬜ 任务继续
4. 重建上下文：
   - 读 output/YYYY-MM-DD-design-read.md（设计方向）
   - 读 docs/README.md（文档索引）
5. 不要问用户"我从哪里开始"
   - 直接读 checkpoint 继续执行
</RECOVERY-PROCEDURE>
```

---

## 铁律

```
铁律: 多页面项目必须拆分子任务，每个子任务完成后必须运行 quality-check。
铁律: 遇到 BLOCKED 才停。不要问用户"还要继续吗？"
铁律: progress.md 是唯一可信的恢复地图。上下文压缩后读它，不是凭记忆。
```

## 红旗列表

| 你在想... | 现实 |
|-----------|------|
| "一次生成所有页面更快" | 一次生成 10 页 = 上下文爆炸 = 做偏了全部重来 |
| "先跳过质量检查，后面补" | "后面"永远不会来。现在做。 |
| "用户肯定想继续，不用问" | 不用问 = 继续执行。不要问"还要继续吗" |
| "上下文压缩了，凭记忆我大概记得" | 记忆不可靠。信任 progress.md。 |