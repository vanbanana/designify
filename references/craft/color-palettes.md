# 调色板路由系统 — 项目类型 × 风格 → 经过验证的配色方案

> **核心原则：** 不要自己编配色。从这个文件里选一个经过验证的调色板，直接用。
> 每个调色板都来自真实产品、专业设计系统或经过社区验证的配色方案。

---

## 使用方式

```
1. 确定项目类型（后台/电商/落地页/社交/教育/医疗/...）
2. 确定主题模式（亮色/暗色）
3. 确定风格倾向（现代极简/专业商务/活泼友好/高端奢华/...）
4. 从下方路由表找到对应调色板
5. 复制 hex 值到 :root CSS 变量
```

---

## 一、暗色主题调色板（Dark Mode）

### D-01 · Midnight Analytics（数据分析后台首选）
```css
--bg:        #0A0F1E;  /* 页面背景：深海蓝 */
--surface:   #1B2A41;  /* 卡片背景 */
--surface-2: #24303E;  /* 侧边栏/悬浮 */
--primary:   #3B82F6;  /* 主色：信任蓝 */
--text:      #E2E8F0;  /* 主文字 */
--text-2:    #94A3B8;  /* 次要文字 */
--border:    #30363D;  /* 边框 */
--success:   #34D399;  /* 涨/成功 */
--error:     #F87171;  /* 跌/错误 */
```
**适合：** 数据仪表盘、分析后台、监控系统、金融科技暗色
**来源：** Midnight Spreadsheet palette, adminlte.io dark mode

### D-02 · Obsidian Professional（专业工具暗色）
```css
--bg:        #121212;  /* 页面背景 */
--surface:   #1E1E1E;  /* 卡片 */
--surface-2: #2D2D2D;  /* 弹层/侧栏 */
--primary:   #58A6FF;  /* 主色：科技蓝 */
--text:      #E1E1E1;  /* 主文字 */
--text-2:    #8B949E;  /* 次要文字 */
--border:    #30363D;  /* 边框 */
--success:   #3FB950;
--error:     #F85149;
```
**适合：** 开发者工具、IDE、代码编辑器、DevOps 平台
**来源：** GitHub Primer dark mode, adminlte.io

### D-03 · Deep Lavender（创意工具暗色）
```css
--bg:        #0A0A0B;  /* 页面背景：接近纯黑 */
--surface:   #131316;  /* 卡片 */
--surface-2: #1A1A1F;  /* 侧边栏 */
--primary:   #5E6AD2;  /* 主色：薰衣草蓝紫 */
--text:      #F7F8F8;  /* 主文字 */
--text-2:    #B4B8C0;  /* 次要文字 */
--border:    #26262E;  /* 边框 */
--success:   #4CB764;
--error:     #E5484D;
```
**适合：** 项目管理（Linear 风格）、设计工具、创意 SaaS
**来源：** Linear.app 品牌色

### D-04 · Charcoal Finance（金融暗色）
```css
--bg:        #0B0F14;  /* 页面背景 */
--surface:   #24303E;  /* 卡片 */
--surface-2: #1B2838;  /* 侧边栏 */
--primary:   #0E7490;  /* 主色：深海青 */
--text:      #CBD5E1;  /* 主文字 */
--text-2:    #64748B;  /* 次要文字 */
--border:    #334155;  /* 边框 */
--success:   #22C55E;
--error:     #EF4444;
```
**适合：** 银行系统、交易平台、保险后台
**来源：** Charcoal Compliance + Teal Treasury palettes

### D-05 · Graphite Minimal（极简暗色）
```css
--bg:        #111827;  /* 页面背景 */
--surface:   #1F2937;  /* 卡片 */
--surface-2: #374151;  /* 弹层 */
--primary:   #6366F1;  /* 主色：靛蓝（仅用于暗色背景时） */
--text:      #F9FAFB;  /* 主文字 */
--text-2:    #9CA3AF;  /* 次要文字 */
--border:    #374151;  /* 边框 */
--success:   #10B981;
--error:     #EF4444;
```
**适合：** 通用后台、管理面板、内容管理系统
**来源：** Graphite Reserve palette, Tailwind gray scale

### D-06 · Midnight Green（健康/环保暗色）
```css
--bg:        #0E3B2E;  /* 页面背景：深森绿 */
--surface:   #1F6F54;  /* 卡片 */
--surface-2: #2D8B6E;  /* 弹层 */
--primary:   #5FB88A;  /* 主色：翡翠绿 */
--text:      #D7E7DD;  /* 主文字 */
--text-2:    #8BBFAB;  /* 次要文字 */
--border:    #2A5C4A;  /* 边框 */
--success:   #34D399;
--error:     #F87171;
```
**适合：** 健康科技、环保平台、可持续发展仪表盘
**来源：** Vault Green palette

---

## 二、亮色主题调色板（Light Mode）

### L-01 · Clean Slate（SaaS 通用首选）
```css
--bg:        #F4F6F9;  /* 页面背景：微蓝灰 */
--surface:   #FFFFFF;  /* 卡片：纯白 */
--surface-2: #E8EAEC;  /* 侧边栏/次要背景 */
--primary:   #2563EB;  /* 主色：Tailwind blue-600 */
--text:      #212529;  /* 主文字 */
--text-2:    #6C757D;  /* 次要文字 */
--border:    #DEE2E6;  /* 边框 */
--success:   #198754;
--error:     #DC3545;
```
**适合：** SaaS 后台、CRM、项目管理、管理面板（万能配色）
**来源：** Bootstrap 5 + adminlte.io safe default

### L-02 · Cloud SaaS（云端服务）
```css
--bg:        #FCFDFD;  /* 页面背景：极微暖白 */
--surface:   #FFFFFF;  /* 卡片 */
--surface-2: #EDEFF3;  /* 侧边栏 */
--primary:   #2F7EDA;  /* 主色：天空蓝 */
--text:      #555663;  /* 主文字 */
--text-2:    #9FA0B5;  /* 次要文字 */
--border:    #C6D1D7;  /* 边框 */
--success:   #51BC8F;
--error:     #E5484D;
```
**适合：** 云服务平台、API 管理、DevOps 仪表盘
**来源：** Octet SaaS dashboard palette #3

### L-03 · Soft Professional（柔和专业）
```css
--bg:        #FBFCFC;  /* 页面背景 */
--surface:   #FFFFFF;  /* 卡片 */
--surface-2: #DADFE4;  /* 侧边栏 */
--primary:   #348ADC;  /* 主色：商务蓝 */
--text:      #072741;  /* 主文字：深海军蓝 */
--text-2:    #65758A;  /* 次要文字 */
--border:    #BCC4C9;  /* 边框 */
--success:   #65C9D4;
--error:     #DC3545;
```
**适合：** 订阅管理、客户门户、B2B SaaS
**来源：** Octet Subscription management palette

### L-04 · Warm Commerce（电商暖色）
```css
--bg:        #FAF7F1;  /* 页面背景：暖米色 */
--surface:   #FFFFFF;  /* 卡片 */
--surface-2: #E8E1D4;  /* 侧边栏 */
--primary:   #B87333;  /* 主色：铜色 */
--text:      #2C2A28;  /* 主文字 */
--text-2:    #7A6A5A;  /* 次要文字 */
--border:    #D6C2AE;  /* 边框 */
--success:   #51BC8F;
--error:     #DC3545;
```
**适合：** 家居电商、手工艺品、高端零售、生活方式品牌
**来源：** Sandstone Budget + Copper Audit palettes

### L-05 · Tech Blue（科技电商）
```css
--bg:        #F9FBFF;  /* 页面背景：微蓝白 */
--surface:   #FFFFFF;  /* 卡片 */
--surface-2: #E0F2FE;  /* 侧边栏 */
--primary:   #1E3A8A;  /* 主色：深海蓝 */
--text:      #0F1B2D;  /* 主文字 */
--text-2:    #4B5563;  /* 次要文字 */
--border:    #BFDBFE;  /* 边框 */
--accent:    #60A5FA;  /* 强调色 */
--success:   #10B981;
--error:     #EF4444;
```
**适合：** 电子产品、3C 数码、科技商城
**来源：** Bluechip Slate palette, Highflow ecommerce

### L-06 · Fresh Market（生鲜/食品电商）
```css
--bg:        #F6FBF7;  /* 页面背景：极微绿 */
--surface:   #FFFFFF;  /* 卡片 */
--surface-2: #D7E7DD;  /* 侧边栏 */
--primary:   #1F6F54;  /* 主色：森林绿 */
--text:      #0E3B2E;  /* 主文字 */
--text-2:    #5A7D6A;  /* 次要文字 */
--border:    #B8D9C5;  /* 边框 */
--accent:    #F5A623;  /* 强调色：暖黄（促销） */
--success:   #34D399;
--error:     #E5484D;
```
**适合：** 生鲜电商、有机食品、健康餐饮
**来源：** Vault Green palette, Chop Local green+white rule
**⚠️ 食品类禁用蓝色做主色（抑制食欲）**

### L-07 · Pure Fashion（时尚电商）
```css
--bg:        #FFFFFF;  /* 页面背景：纯白 */
--surface:   #FAFAFA;  /* 卡片：极微灰 */
--surface-2: #F5F5F5;  /* 侧边栏 */
--primary:   #1A1A1A;  /* 主色：纯黑（高奢感） */
--text:      #1A1A1A;  /* 主文字 */
--text-2:    #767676;  /* 次要文字 */
--border:    #E5E5E5;  /* 边框 */
--accent:    #E8706E;  /* 强调色：珊瑚红 */
--success:   #4CB764;
--error:     #E5484D;
```
**适合：** 服装、奢侈品、美妆、时尚杂志
**来源：** Buch Mason monochrome, Sephora black-white-pink
**⚠️ 时尚类用黑白灰做主色，彩色只用于折扣标签和 CTA**

### L-08 · Trust Medical（医疗/健康）
```css
--bg:        #F2F5F8;  /* 页面背景：冷蓝灰 */
--surface:   #FFFFFF;  /* 卡片 */
--surface-2: #C9D6E5;  /* 侧边栏 */
--primary:   #123A63;  /* 主色：信任深蓝 */
--text:      #0B1F3B;  /* 主文字 */
--text-2:    #5A7089;  /* 次要文字 */
--border:    #B8C9DA;  /* 边框 */
--accent:    #2F5D8C;  /* 强调色 */
--success:   #198754;
--error:     #DC3545;
```
**适合：** 医院系统、健康管理、药品平台、保险
**来源：** Ledger Navy palette
**蓝色=信任+专业，是医疗行业的标准选择**

### L-09 · Edu Blue（教育平台）
```css
--bg:        #F5F8FB;  /* 页面背景 */
--surface:   #FFFFFF;  /* 卡片 */
--surface-2: #E5EBF4;  /* 侧边栏 */
--primary:   #6D71F0;  /* 主色：活力靛蓝 */
--text:      #1A1B2F;  /* 主文字 */
--text-2:    #A5A1B3;  /* 次要文字 */
--border:    #CACFE0;  /* 边框 */
--accent:    #1167F6;  /* 强调色 */
--success:   #51BC8F;
--error:     #E5484D;
```
**适合：** 在线课程、学习平台、知识库、培训系统
**来源：** Octet Onboarding flows palette

### L-10 · Gov Neutral（政务/公共服务）
```css
--bg:        #F8FAFC;  /* 页面背景 */
--surface:   #FFFFFF;  /* 卡片 */
--surface-2: #E2E8F0;  /* 侧边栏 */
--primary:   #1E40AF;  /* 主色：权威深蓝 */
--text:      #111827;  /* 主文字 */
--text-2:    #6B7280;  /* 次要文字 */
--border:    #D1D5DB;  /* 边框 */
--accent:    #DC2626;  /* 强调色：红色（国旗红） */
--success:   #059669;
--error:     #DC2626;
```
**适合：** 政府门户、公共服务、社保平台、投票系统
**来源：** Charcoal Compliance light variant
**必须高对比度、高无障碍性。避免花哨。**

### L-11 · Playful Social（社交/社区）
```css
--bg:        #FAFAFA;  /* 页面背景 */
--surface:   #FFFFFF;  /* 卡片 */
--surface-2: #F3F4F6;  /* 侧边栏 */
--primary:   #8B5CF6;  /* 主色：活力紫 */
--text:      #1F2937;  /* 主文字 */
--text-2:    #9CA3AF;  /* 次要文字 */
--border:    #E5E7EB;  /* 边框 */
--accent:    #EC4899;  /* 强调色：粉紫 */
--success:   #10B981;
--error:     #EF4444;
```
**适合：** 社交平台、社区论坛、内容创作、分享工具
**来源：** Shadcn vivid preset + modern social platforms

### L-12 · Calm Wellness（健康/冥想/生活方式）
```css
--bg:        #FAF7F1;  /* 页面背景：暖沙色 */
--surface:   #FFFFFF;  /* 卡片 */
--surface-2: #E8E1D4;  /* 侧边栏 */
--primary:   #7C8A6E;  /* 主色：苔藓绿 */
--text:      #3A2F2A;  /* 主文字 */
--text-2:    #7A6A5A;  /* 次要文字 */
--border:    #D6C2AE;  /* 边框 */
--accent:    #C2B59B;  /* 强调色 */
--success:   #8AAE6D;
--error:     #C7656A;
```
**适合：** 瑜伽/冥想 App、spa、健康生活方式品牌
**来源：** Sandstone Budget + Olive Bond palettes

### L-13 · Luxury Dark Gold（高端奢华亮色）
```css
--bg:        #FBF6EE;  /* 页面背景：暖象牙 */
--surface:   #FFFFFF;  /* 卡片 */
--surface-2: #EFE2C8;  /* 侧边栏 */
--primary:   #B08D57;  /* 主色：哑光金 */
--text:      #101418;  /* 主文字 */
--text-2:    #6B6258;  /* 次要文字 */
--border:    #DCC9A6;  /* 边框 */
--accent:    #C9A86A;  /* 强调色：亮金 */
--success:   #51BC8F;
--error:     #9F2D45;
```
**适合：** 高端投资、奢侈品官网、私人银行、高端酒店
**来源：** Gilded Portfolio + Champagne Dividend palettes

### L-14 · Kids & Fun（儿童/趣味）
```css
--bg:        #FFF9EF;  /* 页面背景：暖白 */
--surface:   #FFFFFF;  /* 卡片 */
--surface-2: #FFF3D6;  /* 侧边栏 */
--primary:   #F2B705;  /* 主色：阳光黄 */
--text:      #1A1A1A;  /* 主文字 */
--text-2:    #6B7280;  /* 次要文字 */
--border:    #FDE68A;  /* 边框 */
--accent-1:  #EF4444;  /* 红色 */
--accent-2:  #3B82F6;  /* 蓝色 */
--success:   #10B981;
--error:     #EF4444;
```
**适合：** 儿童产品、游戏化学习、亲子平台
**来源：** Sunrise Yield palette + Gymboree red-green-white

---

## 三、语义色标准（所有调色板通用）

不管用哪个调色板，语义色（成功/警告/错误/信息）应该保持一致的视觉权重：

```css
/* 推荐语义色（经过对比度验证） */
--success:   #10B981;  /* 绿：涨/完成/健康 */
--success-bg: #D1FAE5; /* 绿底 */
--warning:   #F59E0B;  /* 黄：预警/待处理 */
--warning-bg: #FEF3C7; /* 黄底 */
--error:     #EF4444;  /* 红：跌/错误/危险 */
--error-bg:  #FEE2E2;  /* 红底 */
--info:      #3B82F6;  /* 蓝：信息/链接 */
--info-bg:   #DBEAFE;  /* 蓝底 */
```

**暗色模式语义色：**
```css
--success:   #34D399;  /* 暗色模式绿（降饱和） */
--success-bg: rgba(52, 211, 153, 0.12);
--warning:   #FBBF24;
--warning-bg: rgba(251, 191, 36, 0.12);
--error:     #F87171;
--error-bg:  rgba(248, 113, 113, 0.12);
--info:      #60A5FA;
--info-bg:   rgba(96, 165, 250, 0.12);
```

---

## 四、路由决策表

### 按项目类型路由

| 项目类型 | 亮色推荐 | 暗色推荐 |
|----------|----------|----------|
| 数据分析后台 | L-01 Clean Slate | **D-01 Midnight Analytics** |
| SaaS 管理后台 | **L-01 Clean Slate** | D-02 Obsidian Professional |
| 开发者工具 | L-02 Cloud SaaS | **D-02 Obsidian Professional** |
| 项目管理工具 | L-01 Clean Slate | **D-03 Deep Lavender** |
| 金融/银行 | L-08 Trust Medical | **D-04 Charcoal Finance** |
| 电商-通用 | L-01 Clean Slate | D-05 Graphite Minimal |
| 电商-时尚 | **L-07 Pure Fashion** | D-03 Deep Lavender |
| 电商-食品 | **L-06 Fresh Market** | — (食品不建议暗色) |
| 电商-科技 | **L-05 Tech Blue** | D-01 Midnight Analytics |
| 电商-家居 | **L-04 Warm Commerce** | — |
| 社交/社区 | **L-11 Playful Social** | D-03 Deep Lavender |
| 教育/培训 | **L-09 Edu Blue** | D-05 Graphite Minimal |
| 医疗/健康 | **L-08 Trust Medical** | D-06 Midnight Green |
| 政务/公共 | **L-10 Gov Neutral** | — (政务不建议暗色) |
| 健康/生活方式 | **L-12 Calm Wellness** | D-06 Midnight Green |
| 高端/奢侈品 | **L-13 Luxury Dark Gold** | D-03 Deep Lavender |
| 儿童/趣味 | **L-14 Kids & Fun** | — |
| 创意/设计工具 | L-01 Clean Slate | **D-03 Deep Lavender** |

### 按风格倾向路由

| 风格 | 亮色推荐 | 暗色推荐 |
|------|----------|----------|
| 现代极简 | L-01, L-02 | D-03, D-05 |
| 专业商务 | L-01, L-03 | D-02, D-04 |
| 活泼友好 | L-11, L-14 | D-03 |
| 高端奢华 | L-13, L-07 | D-03 |
| 温暖自然 | L-04, L-12 | D-06 |
| 冷静信任 | L-08, L-10 | D-01, D-04 |

---

## 五、反模式（绝对禁止的配色）

| ❌ 禁止 | 为什么 | 用什么替代 |
|---------|--------|-----------|
| `#6366F1` (Indigo 500) 做主色 | AI 默认色，无辨识度 | 从上方路由表选一个 |
| `#3B82F6` (Blue 500) 做主色 | 太常见 | 用 L-01 的 `#2563EB` 或 D-01 的 `#3B82F6`（仅暗色模式可用） |
| 紫蓝渐变 `#6366F1→#8B5CF6` | AI 味最重的视觉特征 | 用纯色 |
| 食品类用蓝色做主色 | 蓝色抑制食欲 | 用 L-06 绿色或 L-04 暖色 |
| 纯黑 `#000000` 做暗色背景 | 刺眼，无层次 | 用 `#0A0F1E` 或 `#121212` |
| 纯白 `#FFFFFF` 做暗色文字 | 刺眼 | 用 `#E1E1E1` 或 `#E2E8F0` |
| 亮色背景+亮色文字 | 对比度不够 | 至少 4.5:1 |
| 所有元素用同一个灰色 | 无层次 | 用 3 层灰：text/text-2/border |
| 彩虹色按钮/卡片 | 视觉混乱 | 一个屏幕最多 1 个品牌色高亮 |

---

## 六、快速决策流程

```
用户说"做个后台" →
  暗色？→ 是 → D-01 Midnight Analytics（数据）或 D-02 Obsidian（工具）
  暗色？→ 否 → L-01 Clean Slate（万能）

用户说"做个电商" →
  卖什么？
  服装/奢侈品 → L-07 Pure Fashion
  食品/生鲜 → L-06 Fresh Market
  电子/科技 → L-05 Tech Blue
  家居/生活 → L-04 Warm Commerce
  通用/不确定 → L-01 Clean Slate

用户说"做个App" →
  社交？→ L-11 Playful Social
  教育？→ L-09 Edu Blue
  医疗？→ L-08 Trust Medical
  金融？→ L-08 + D-04
  通用工具？→ L-01 + D-05

用户说"像 Linear 那样" → D-03 Deep Lavender
用户说"像 Stripe 那样" → L-01 Clean Slate
用户说"像 Notion 那样" → L-01 Clean Slate（亮色）或 D-05 Graphite Minimal（暗色）
用户说"像 Vercel 那样" → L-01 + D-02
```
