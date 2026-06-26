# Creative Code References — 艺术性前端代码资源与学习指南

> **何时加载：** 当 Design Character 的 Boldness ≥ 6 或项目类型为"创意/游戏/品牌官网/AI 产品/个人作品集"时，必须加载此文件。
> **用途：** 不是"看看而已"，而是直接在代码生成时引用这些开源项目的模式、结构和技术方案。

---

## 1. 什么时候该用"艺术性前端"？

根据 Design Character 系统（`design-character.md`）的三轴值判断：

| 触发条件 | Boldness | Motion | 典型项目 | 设计语言 |
|----------|----------|--------|----------|----------|
| **创意作品集** | 8-10 | 7-9 | 设计师个人站、艺术家作品 | 实验性布局、3D、大字号对比 |
| **品牌官网** | 7-9 | 6-8 | 高端品牌、科技公司 HQ | 沉浸式叙事、微交互、滚动视差 |
| **营销落地页** | 7-8 | 5-7 | 产品发布、活动宣传 | 大胆配色、动效 Hero、视差滚动 |
| **游戏/娱乐** | 8-10 | 8-10 | 游戏官网、活动页面 | 3D 渲染、粒子系统、Canvas 动画 |
| **AI 产品** | 6-8 | 7-9 | AI 对话、生图平台 | 流式打字、玻璃质感、科技感光效 |
| **后台系统** | ≤3 | ≤2 | SaaS 后台、数据面板 | 不走艺术路线，不加载此文件 |

### 决策规则

```javascript
// 伪代码 — 告诉 agent 什么时候加载此文件
if (boldness >= 6 || projectType in ['创意', '游戏', '品牌官网', '作品集']) {
  加载("creative-code-references.md");
  // 同时需要加载的配套文件：
  加载("design-character.md");    // 设计性格声明
  加载("animation-discipline.md"); // 动效纪律
  加载("anti-ai-slop.md");        // 反 AI 味（P0 更严格）
}
```

---

## 2. 可直接下载源代码的资源库（按优先级排列）

### 🥇 第一优先：Codrops — 每个 demo 都有完整源码

**网站：** `tympanus.net/codrops/`
**GitHub：** `github.com/codrops`
**特点：** 每个文章都附带完整的 ZIP 或 GitHub 仓库。纯前端，零后端。

| 类别 | 代表性 demo | 源码地址 | 学到什么 |
|------|-----------|----------|---------|
| **滚动叙事** | Scroll-Triggered Animations | `github.com/codrops/ScrollTriggerAnimations` | GSAP ScrollTrigger + Lenis 平滑滚动 |
| **3D 排版** | 3D Grid Effect | `github.com/codrops/3DGridEffect` | Three.js + CSS 3D transforms |
| **文字动效** | Text Animations | `github.com/codrops/TextAnimations` | 字符级 GSAP 动画、split-text |
| **图片展示** | Image Grid Motion | `github.com/codrops/ImageGridMotion` | 网格布局+鼠标交互+视差 |
| **菜单交互** | Animated Menu | `github.com/codrops/AnimatedMenu` | 创意导航动画 |
| **CSS 艺术** | CSS Grid Layout Generator | `github.com/codrops/GridLayoutGenerator` | 纯 CSS 创意布局 |

**使用方式：** 在 Phase 5 代码生成时，直接打开对应仓库查看 HTML 结构和 CSS 技巧，**但不是复制粘贴**，而是理解模式后应用到当前项目。

### 🥈 第二优先：GitHub awwwards 复刻集合

**搜索入口：** `github.com/topics/awwwards`（150+ 仓库）
**搜索入口：** `github.com/topics/awwwards-inspired`（26 个仓库）

| 推荐仓库 | 复刻的目标 | 技术栈 | 可学的模式 |
|----------|-----------|--------|-----------|
| `MAGGIx1404/awwwards-Rebuild` | capsule.moyra.co | React + Vite + GSAP + Tailwind | 滚动触发的卡片堆叠效果 |
| `wistant/Fizzi` | 虚构汽水品牌 3D 电商 | React + Three.js | 3D 产品展示 + 品牌配色 |
| `prashantkoirala465/the-line-studio` | The Line Studio | Next.js + GSAP | 帧动画 + 精细滚动编排 |
| `gaganchauhan1997/hackknow-os` | 黑客风格 OS 界面 | 纯 CSS | CSS 艺术 + 复古科技审美 |
| `aarambh-darshan/rust-portfolio` | 极简作品集 | Rust + WebAssembly | 极致性能 + 简约设计 |

**使用方式：** 当需要实现特定动效模式时，先搜索这些仓库中是否有类似实现，阅读关键组件的代码结构。

### 🥉 第三优先：JavaScript Mastery 教程源码

**免费资源：** `jsm.dev/zentry-kit`
**视频教程：** YouTube "Build an Awwwards Winning Website | React.js, Tailwind CSS, GSAP"

**包含的完整页面代码：**
- Hero Section（全屏动效 CSF）
- About Section（滚动触发文字动画）
- Animated Title（字符级 GSAP 动画）
- Navbar（透明→实心过渡 + 汉堡菜单动效）
- Features（卡片交错入场）
- Story（时间线滚动叙事）
- Contact & Footer

**使用方式：** 这是**最完整的 Awwwards 级单页源码**。当需要生成 Boldness ≥ 7 的落地页时，直接参考其 GSAP Timeline 的组织方式和 React 组件拆分策略。

---

## 3. 6 种艺术风格 + 对应代码学习路径

### 风格 1：粗野主义 / 极简实验

**特征：** 大字重、网格突破、单色调、故意"丑"

| 学习资源 | 类型 | 学到什么 |
|----------|------|----------|
| `bruno-simon.com` | Inspect | 3D 游戏化导航 + 极小化 UI |
| `aarambh-darshan/rust-portfolio` | GitHub 源码 | WebAssembly + 极简排版 |
| `gaganchauhan1997/hackknow-os` | GitHub 源码 | CSS-only 复古 OS 皮肤 |
| Codrops: CSS Grid Layout Generator | 源码 | 纯 CSS 创意网格 |

**代码模式：**
```css
/* 粗野主义核心模式：大胆网格 + 大字 + 粗边框 */
.hero {
  display: grid;
  grid-template-columns: 2fr 1fr;
  border: 6px solid #000;
  min-height: 100dvh;
}
.hero-title {
  font-size: clamp(3rem, 12vw, 8rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.9;
}
```

### 风格 2：沉浸式 3D + WebGL

**特征：** Three.js / React Three Fiber、3D 交互、HDR 质感

| 学习资源 | 类型 | 学到什么 |
|----------|------|----------|
| Codrops: 3D Grid Effect | 源码 | Three.js 3D 网格 |
| `wistant/Fizzi` | GitHub 源码 | React Three Fiber + 产品展示 |
| `bruno-simon.com` | Inspect | 3D 场景 + 交互事件 |
| Three.js 官方示例 | 源码 | 基础 3D 场景搭建 |

**代码模式：**
```javascript
// React Three Fiber 模式
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Scene() {
  const meshRef = useRef();
  useFrame((state) => {
    meshRef.current.rotation.x = state.mouse.y * 0.1;
  });
  return (
    <mesh ref={meshRef}>
      <torusGeometry args={[1, 0.4, 16, 32]} />
      <meshPhysicalMaterial color="#ff6000" metalness={0.8} roughness={0.2} />
    </mesh>
  );
}
```

### 风格 3：滚动叙事 + GSAP 编排

**特征：** Pinning、滚动触发动画、时间线编排、视差

| 学习资源 | 类型 | 学到什么 |
|----------|------|----------|
| **JavaScript Mastery zentry-kit** | **完整源码** | GSAP Timeline + ScrollTrigger 最佳实践 |
| Codrops: ScrollTrigger Animations | 源码 | 多场景滚动触发 |
| `MAGGIx1404/awwwards-Rebuild` | GitHub 源码 | 卡片堆叠 + 滚动驱动 |
| `locomotive.ca` | Inspect | Lenis + GSAP 平滑滚动 |

**代码模式：**
```javascript
// GSAP ScrollTrigger 核心模式
// 参考：jsm.dev/zentry-kit
gsap.registerPlugin(ScrollTrigger);

// 1. 入场动画
gsap.from('.hero-title', {
  y: 100, opacity: 0, duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.hero-section',
    start: 'top center',
    toggleActions: 'play none none reverse'
  }
});

// 2. 滚动固定 + 视差
ScrollTrigger.create({
  trigger: '.pin-section',
  pin: true,
  start: 'top top',
  end: '+=200%',
  scrub: 1
});

// 3. 时间线编排（多元素依次出场）
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.features',
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: 1
  }
});
tl.from('.feature-card:nth-child(1)', { x: -200, opacity: 0 })
  .from('.feature-card:nth-child(2)', { x: -200, opacity: 0 }, '-=0.4')
  .from('.feature-card:nth-child(3)', { x: -200, opacity: 0 }, '-=0.4');
```

### 风格 4：排版实验 + 文字艺术

**特征：** 超大字号对比、文字遮罩、液体字体、动态排版

| 学习资源 | 类型 | 学到什么 |
|----------|------|----------|
| Codrops: Text Animations | 源码 | 字符级 GSAP 动画、split-type |
| `yannickgregoire.nl` | Inspect | 黑白 Gen Z 文字排版 |
| `valentincheval.design` | Inspect | 强个人风格排版系统 |
| Framer Motion 文档 | 源码 | React 文字动画 |

**代码模式：**
```css
/* 文字遮罩效果（Clip Mask） */
.hero-title {
  background: linear-gradient(135deg, #000 0%, #000 40%, transparent 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: clamp(4rem, 15vw, 10rem);
  line-height: 0.85;
  letter-spacing: -0.05em;
}
```

### 风格 5：材质感 + 纹理/噪点

**特征：** 纸质感、玻璃效果、金属拉丝、噪点叠加

| 学习资源 | 类型 | 学到什么 |
|----------|------|----------|
| CSS-Tricks: Noise Texture | 文章 | SVG 噪点滤镜 |
| Codrops: Glassmorphism | 源码 | 真玻璃效果（1px 内边框+折射） |
| `lusion.co` | Inspect | WebGL 材质 + 自定义着色器 |

**代码模式：**
```css
/* 纸噪点纹理（来源于 atelier-zero 设计系统） */
.paper-texture::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,..."); /* SVG turbulence 滤镜 */
  mix-blend-mode: multiply;
}

/* 真玻璃效果 */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1), /* 内边框模拟折射 */
              0 8px 32px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
}
```

### 风格 6：微交互 + 磁性物理

**特征：** 鼠标追踪、弹性反馈、Physics-based 运动

| 学习资源 | 类型 | 学到什么 |
|----------|------|----------|
| Framer Motion 文档 | 源码 | React spring physics |
| Codrops: Magnetic Button | 源码 | 鼠标跟随磁吸按钮 |
| `stabondar.com` | Inspect | 宏微交互系统 |

**代码模式：**
```javascript
// 磁吸按钮（鼠标跟随）
function MagneticButton({ children }) {
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.2;
    const y = (clientY - (top + height / 2)) * 0.2;
    setPosition({ x, y });
  };
  
  return (
    <button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: 'transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      {children}
    </button>
  );
}
```

---

## 4. 快速索引：想要某效果 → 去哪个仓库

| 想要的效果 | 最佳源码来源 | 文件路径 / 搜索关键词 |
|-----------|------------|----------------------|
| 滚动触发的文字动画 | Codrops: TextAnimations | `src/js/animations/` |
| 全屏 Hero 动效 | JavaScript Mastery zentry-kit | `components/Hero.jsx` |
| 3D 卡片堆叠 | `MAGGIx1404/awwwards-Rebuild` | `src/components/StackedCards` |
| 逐字/逐字符出现 | Codrops: TextAnimations | `split-text`, `chars` |
| 魔性悬浮按钮 | Codrops: MagneticButton | `magnetic.js` |
| 纸噪点纹理 | CSS-Tricks / designify 本 skill | `::before` + SVG turbulence |
| 平滑滚动 | Lenis + GSAP ScrollTrigger | `npm install @studio-freight/lenis` |
| 视差图片 | Codrops: ImageGridMotion | `parallax`, `transform` |
| 品牌官网 | JS Mastery zentry-kit + `bruno-simon.com` Inspect | 结合两者 |

---

## 5. 代码引用纪律

```
铁律: 可以学习开源代码的模式，但禁止原样复制。
铁律: 复制的代码必须：
  1. 修改变量名以匹配当前项目
  2. 替换颜色/字体为当前品牌 DESIGN.md 的值
  3. 添加设计ify 要求的心理学依据注释
  4. 通过 Phase 6 质量门禁的 Anti-AI-Slop 检查

铁律: 引用来源必须在代码中注释：
  /* 参考: Codrops ScrollTriggerAnimations — 滚动触发入场模式 */
  /* 改编自: jsm.dev/zentry-kit — Hero 全屏结构 */

铁律: Boldness < 6 的项目禁止使用此文件中的风格 1-6。
  这些风格是为"设计感"保留的，过度使用=滥用。
```

---

## 6. 项目类型 → 推荐风格映射

| 项目类型 | 推荐风格 | 首选源码 | 理由 |
|----------|---------|----------|------|
| 设计师作品集 | 粗野主义 + 排版实验 | Codrops: TextAnimations + bruno-simon | 个人品牌必须独特 |
| 科技品牌官网 | 沉浸式 3D + 滚动叙事 | JS Mastery zentry-kit + `lusion.co` | 科技感需要 3D 支撑 |
| 游戏活动页 | 沉浸式 3D + 微交互 | `wistant/Fizzi` + Framer Motion | 娱乐需要趣味交互 |
| AI 产品落地页 | 滚动叙事 + 材质感 | JS Mastery zentry-kit + Codrops: Glass | AI 需要"未来感" |
| 电商产品 | 微交互 + 材质感 | Codrops: ImageGridMotion | 产品需要质感展示 |
| 品牌官网 | 滚动叙事 + 排版实验 | Locomotive + `valentincheval.design` | 品牌需要叙事 |
| 营销活动 | 粗野主义/大胆配色 | Codrops: GridLayoutGenerator | 活动需要冲击力 |

---

## 7. 快速安装技术栈

```bash
# GSAP (付费商业许可，但可本地开发)
npm install gsap @studio-freight/lenis

# React Three Fiber (3D)
npm install @react-three/fiber @react-three/drei three

# Framer Motion (React 动效)
npm install framer-motion

# 平滑滚动
npm install @studio-freight/lenis

# 字符拆分动画
npm install gsap
# GSAP 的 SplitText 插件需要额外加载
```

---

## 检查清单

生成 Boldness ≥ 6 的页面后确认：

- [ ] Boldness / Motion / Density 与 Design Character 声明一致
- [ ] 代码中标注了引用来源（"参考自: xxx"）
- [ ] 没有原样复制开源代码——颜色/字体/变量已替换为本项目品牌
- [ ] 核心动效有 Fallback（prefers-reduced-motion）
- [ ] 3D/Canvas 内容在低性能设备上有降级方案
- [ ] 没有为了"好看"牺牲可访问性（对比度、键盘导航、语义化 HTML）
- [ ] 加载此文件是否合适？（Boldness ≥ 6 才有资格）