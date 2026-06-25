# Phase 5: 代码生成 — 详细指令

---

## 生成顺序

```
1. 先搭骨架：语义化页面结构（header/main/nav/section/article/footer）
2. 设计令牌：CSS 变量定义 → 写入 output/design-tokens.css（颜色/间距/字号/圆角/阴影）
3. 引入素材：图标库 CDN/npm + 占位图 + 插画（根据项目类型路由表选择）
4. 再填内容：真实文案（不用 lorem ipsum，用符合业务的中文内容）
5. 然后做交互：按钮状态、表单验证状态机、导航切换
6. 加状态覆盖：空状态（用 unDraw 插画）/加载骨架屏/错误状态/边界处理
7. 最后加细节：动效（遵守缓动曲线和时长阈值）、微交互
```

---

## 框架选择树

```
框架选择：
├── 用户指定框架 → 用指定的
├── 用户是小白 → React + Tailwind（最容易上手）
├── 用户要快速原型 → 单文件 HTML + 内联 CSS/JS
└── 用户要生产级 → Next.js/App Router + CSS Modules
```

---

## 五态覆盖（每个列表/表格/表单页面必须实现）

详见 `references/craft/state-coverage.md`。

1. **Loading（加载中）** — 骨架屏（结构匹配真实内容），不是空白或 Spinner
2. **Empty（空数据）** — 插画 + 引导文案 + 行动按钮，不是"暂无数据"
3. **Error（错误）** — 错误原因 + 重试按钮，不是白屏
4. **Populated（有数据）** — 正常展示
5. **Edge（边界）** — 超长文本 ellipsis，大数字千分位，极多数据分页

---

## 动效规则

详见 `references/craft/animation-discipline.md`。

```
缓动曲线：进入用减速(0,0,0.2,1) / 离开用加速(0.4,0,1,1) / 标准(0.4,0,0.2,1)
禁止 linear（进度条除外）
时长：微交互 100-150ms / 中等过渡 200-300ms / 页面过渡 300-400ms
只动画 transform 和 opacity，禁止动画 width/height/top/left
必须支持 prefers-reduced-motion
```

---

## AI 产品额外规则

如果项目是 AI 产品（对话/生图/视频/编程/Agent），读取：
→ `references/ai-products/index.md` 匹配 AI 产品类型并获取完整的页面清单和核心布局
→ 注意：所有 10 种 AI 产品模式都在这个文件内，不需要加载额外文件

AI 产品通用要求：
- 流式输出：打字机效果 + 停止生成按钮
- Agent 步骤展示：思考中/调用工具/生成中的步骤可视化
- 参数面板：温度/模型/系统提示等高级设置可折叠（利用 Hick's Law 渐进披露）
- Canvas/预览面板：AI 输出物的实时预览区域
