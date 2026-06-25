#!/usr/bin/env node
/**
 * website-analyzer.mjs — 零依赖网站设计系统提取器 v3
 * 
 * 用法: node website-analyzer.mjs <url> [options]
 * 
 * Options:
 *   --output <path>     输出文件路径（默认 stdout）
 *   --format <fmt>      输出格式: md | json（默认 md）
 *   --screenshot <path> 截图保存路径（需 Chrome 已安装）
 *   --verbose           显示详细日志
 * 
 * 零外部依赖：仅使用 Node.js 18+ 内置 API
 * 截图功能使用本机 Chrome headless 模式（可选）
 * 
 * 输出包含：
 *   Section 0: 复刻蓝图（设计令牌 + 页面骨架 + 色彩角色 + 组件配方 + 复刻步骤）
 *   Section 1: 站点概况
 *   Section 2: 页面结构分析（导航/区块/标题/卡片/媒体）
 *   Section 3-9: CSS 设计令牌（变量/颜色/排版/间距/圆角/断点/动效）
 *   Section 10: 像素级布局图（ASCII 线框 + 精确尺寸标注）
 */

import { URL } from 'node:url';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

// ─── CLI 参数解析 ──────────────────────────────────────────────
const args = process.argv.slice(2);
const url = args.find(a => !a.startsWith('--') && !args[args.indexOf(a) - 1]?.startsWith('--'));
const outputFlag = args.indexOf('--output');
const outputPath = outputFlag !== -1 ? args[outputFlag + 1] : null;
const screenshotFlag = args.indexOf('--screenshot');
const screenshotPath = screenshotFlag !== -1 ? args[screenshotFlag + 1] : null;
const format = args.includes('--json') ? 'json' : 'md';
const verbose = args.includes('--verbose');

if (!url) {
  console.error(`
  website-analyzer — 网站设计系统提取器（零依赖）
  
  用法: node website-analyzer.mjs <url> [--output <path>] [--json] [--screenshot <path>] [--verbose]

  示例:
    node website-analyzer.mjs https://stripe.com
    node website-analyzer.mjs https://linear.app --output design-report.md
    node website-analyzer.mjs https://vercel.com --json
    node website-analyzer.mjs https://example.com --screenshot screenshot.png
  `);
  process.exit(1);
}

// ─── 工具函数 ──────────────────────────────────────────────────
function log(...msgs) { if (verbose) console.error('[analyzer]', ...msgs); }

function normalizeUrl(href, baseUrl) {
  try {
    if (href.startsWith('//')) return `https:${href}`;
    if (href.startsWith('http')) return href;
    return new URL(href, baseUrl).href;
  } catch { return null; }
}

async function safeFetch(url, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; WebsiteAnalyzer/1.0)' },
        signal: AbortSignal.timeout(15000),
        redirect: 'follow',
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      if (i === retries) { log(`Fetch failed: ${url} — ${e.message}`); return null; }
    }
  }
  return null;
}

// ─── 截图（Jina AI 免费 API，零依赖）─────────────────────────────
async function captureScreenshot(url, outputPath) {
  // 方案1: Jina AI 免费截图 API（零依赖）
  try {
    log('截取页面截图（Jina AI）...');
    const jinaUrl = `https://s.jina.ai/${url}`;
    const res = await fetch(jinaUrl, {
      headers: {
        'Accept': 'image/png',
        'X-No-Cache': 'true',
        'X-Wait-For-Selector': 'body',
      },
      signal: AbortSignal.timeout(30000),
    });
    if (res.ok) {
      const buffer = Buffer.from(await res.arrayBuffer());
      if (buffer.length > 1000) { // 有效 PNG 至少 1KB
        const outPath = resolve(outputPath);
        writeFileSync(outPath, buffer);
        log(`截图已保存: ${outPath} (${(buffer.length/1024).toFixed(0)}KB)`);
        return outPath;
      }
    }
    log('Jina 截图无效，尝试 Chrome headless...');
  } catch (e) {
    log(`Jina 截图失败: ${e.message}，尝试 Chrome headless...`);
  }
  
  // 方案2: Chrome headless（本机已安装）
  try {
    const chromePath = process.platform === 'win32'
      ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      : process.platform === 'darwin'
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : 'google-chrome';
    const outPath = resolve(outputPath);
    const { execSync } = await import('node:child_process');
    execSync(`"${chromePath}" --headless --disable-gpu --screenshot="${outPath}" --window-size=1440,900 --hide-scrollbars "${url}"`, {
      timeout: 20000,
      stdio: 'pipe',
    });
    log(`Chrome 截图已保存: ${outPath}`);
    return outPath;
  } catch (e) {
    log(`Chrome 截图也失败: ${e.message}（工具仍正常运行，只是无截图）`);
    return null;
  }
}

// ─── ASCII 像素线框图（从 HTML 结构推断布局）────────────────────
function generateASCIIWireframe(htmlStructure, skeleton, analysis, meta) {
  const lines = [];
  const W = 72; // 线框图宽度（字符数）

  const border = '+' + '-'.repeat(W) + '+';
  const empty = '|' + ' '.repeat(W) + '|';

  function label(text, width = W) {
    const pad = Math.floor((width - text.length) / 2);
    const left = Math.max(0, pad);
    const right = Math.max(0, width - text.length - left);
    return '|' + ' '.repeat(left) + text + ' '.repeat(right) + '|';
  }

  function sectionLabel(text) {
    return '|' + ' ' + '='.repeat(Math.floor((W-2-text.length)/2)) + ' ' + text + ' ' + '='.repeat(Math.ceil((W-2-text.length)/2)) + '|';
  }

  // Gather dynamic data sources
  const detectedBlocks = htmlStructure?.detectedBlocks || [];
  const detectedTypes = detectedBlocks.map(b => b.type);
  const headings = htmlStructure?.headings || [];
  const sampleTitles = htmlStructure?.cards?.sampleTitles || [];
  const navItems = htmlStructure?.nav?.items?.slice(0, 7) || [];
  const siteTitle = meta?.title || '';

  // Helper: pick a section heading text from headings array
  function getSectionName(index, fallback) {
    const h2h3 = headings.filter(h => h.level === 2 || h.level === 3);
    if (h2h3[index]) return h2h3[index].text.slice(0, 30);
    return fallback;
  }

  // Helper: draw a card grid row using sampleTitles or generic labels
  function drawCardRow(count, fallbackPrefix) {
    const labels = [];
    for (let i = 0; i < count; i++) {
      if (sampleTitles[i]) {
        labels.push(`[${sampleTitles[i].slice(0, 12)}]`);
      } else {
        labels.push(`[${fallbackPrefix} ${i + 1}]`);
      }
    }
    const row = '|  ' + labels.join('  ') + '  |';
    return row.length > W + 2 ? row.slice(0, W + 1) + '|' : row;
  }

  // Determine which block sections to render (excluding Header/Footer which are always drawn)
  const blockSectionMap = {
    'Hero/Banner': { label: 'HERO / BANNER', draw: drawHero },
    'Features': { label: null, draw: drawGenericCards },
    'Blog/Articles': { label: 'BLOG / ARTICLES', draw: drawMainContent },
    'E-commerce': { label: 'PRODUCTS / E-COMMERCE', draw: drawGenericCards },
    'Pricing': { label: 'PRICING', draw: drawGenericCards },
    'Testimonials': { label: 'TESTIMONIALS', draw: drawGenericCards },
    'Gallery/Portfolio': { label: 'GALLERY / PORTFOLIO', draw: drawGenericCards },
    'Team': { label: 'TEAM', draw: drawGenericCards },
    'Dashboard': { label: 'DASHBOARD', draw: drawGenericCards },
    'CTA': { label: 'CALL TO ACTION', draw: drawCTA },
    'FAQ': { label: 'FAQ', draw: drawGenericCards },
    'Contact': { label: 'CONTACT', draw: drawGenericCards },
    'Sidebar': { label: null, draw: null }, // handled with main content
    'Tabs/Accordion': { label: 'TABS / ACCORDION', draw: drawGenericCards },
    'Chat/Messaging': { label: 'CHAT / MESSAGING', draw: drawGenericCards },
    'Modal/Dialog': { label: null, draw: null }, // skip modals in wireframe
  };

  function drawHero(sectionName) {
    lines.push(sectionLabel(sectionName));
    lines.push(empty);
    lines.push(label('[ Hero Image / Banner ]'));
    lines.push(label(`aspect-ratio: ~2.4:1`));
    lines.push(empty);
    lines.push(border);
  }

  function drawMainContent(sectionName) {
    const hasSidebar = detectedTypes.includes('Sidebar');
    if (hasSidebar) {
      const mainW = Math.floor(W * 0.65);
      const sideW = W - mainW - 3;
      lines.push(sectionLabel(sectionName + ' + Sidebar'));
      const cardItems = sampleTitles.length > 0 ? sampleTitles.slice(0, 4) : [];
      for (let i = 0; i < Math.min(3, Math.max(1, cardItems.length || 2)); i++) {
        const titleText = cardItems[i] ? cardItems[i].slice(0, 20) : `Article ${i + 1}`;
        const mainLines = [
          '+' + '-'.repeat(mainW) + '+',
          '|' + ' '.repeat(mainW) + '|',
          '|' + ` [thumb]  ${titleText}...`.padEnd(mainW) + '|',
          '|' + ' '.repeat(mainW - 2) + ' |',
          '|' + ' Summary text...'.padEnd(mainW) + '|',
          '|' + ' '.repeat(mainW - 2) + ' |',
          '|' + ' Author  [Tag]'.padEnd(mainW) + '|',
          '|' + ' '.repeat(mainW) + '|',
        ];
        const sideLines = [
          '+' + '-'.repeat(sideW) + '+',
          '|' + ' '.repeat(sideW) + '|',
          '|' + ' Sidebar Module'.padEnd(sideW) + '|',
          '|' + ' '.repeat(sideW) + '|',
          '|' + ' '.repeat(sideW) + '|',
          '|' + ' '.repeat(sideW) + '|',
          '|' + ' '.repeat(sideW) + '|',
          '|' + ' '.repeat(sideW) + '|',
        ];
        for (let j = 0; j < 8; j++) {
          lines.push(mainLines[j] + '  ' + (sideLines[j] || empty));
        }
      }
      lines.push(border);
    } else {
      lines.push(sectionLabel(sectionName));
      const cardItems = sampleTitles.length > 0 ? sampleTitles.slice(0, 4) : [];
      for (let i = 0; i < Math.min(4, Math.max(2, cardItems.length || 2)); i++) {
        const titleText = cardItems[i] ? cardItems[i].slice(0, 25) : `Article ${i + 1}`;
        lines.push(label(`[thumb]  ${titleText}`));
        lines.push(label('Summary text...'));
        lines.push(empty);
      }
      lines.push(border);
    }
  }

  function drawGenericCards(sectionName) {
    lines.push(sectionLabel(sectionName));
    lines.push(drawCardRow(Math.min(4, Math.max(2, sampleTitles.length || 3)), sectionName.split(' ')[0]));
    lines.push(border);
  }

  function drawCTA(_sectionName) {
    lines.push(sectionLabel('CALL TO ACTION'));
    lines.push(empty);
    lines.push(label('[ CTA Button ]'));
    lines.push(empty);
    lines.push(border);
  }

  lines.push('');
  lines.push(`  Pixel-Level Layout Wireframe (auto-generated from HTML structure analysis)`);
  lines.push('');
  lines.push(border);

  // Header — always present
  lines.push(sectionLabel('HEADER'));
  const navStr = navItems.length > 0 ? navItems.join('   ') : 'Nav1   Nav2   Nav3   Nav4';
  const searchTag = htmlStructure?.nav?.hasSearch ? ' [Search]' : '';
  const loginTag = htmlStructure?.nav?.hasLogin ? ' [Login]' : '';
  lines.push(label(`[Logo]          ${navStr}          ${searchTag}${loginTag}`));
  if (skeleton?.header?.height) {
    lines.push(label(`height: ${skeleton.header.height}`));
  }
  lines.push(border);

  // Render detected block sections (skip Header, Footer, Sidebar, Modal — handled separately)
  const skipTypes = new Set(['Header', 'Footer', 'Sidebar', 'Modal/Dialog']);
  const renderedTypes = new Set();
  let genericIndex = 0;

  for (const block of detectedBlocks) {
    if (skipTypes.has(block.type)) continue;
    if (renderedTypes.has(block.type)) continue;
    renderedTypes.add(block.type);

    const mapping = blockSectionMap[block.type];
    if (!mapping || !mapping.draw) continue;

    const sectionName = mapping.label || getSectionName(genericIndex++, block.type);
    mapping.draw(sectionName);
  }

  // If no block sections were detected at all, draw a generic main content area
  if (renderedTypes.size === 0) {
    const hasSidebar = detectedTypes.includes('Sidebar');
    if (hasSidebar) {
      drawMainContent('Main Content');
    } else {
      lines.push(sectionLabel('MAIN CONTENT'));
      for (let i = 0; i < 3; i++) {
        const titleText = sampleTitles[i] ? sampleTitles[i].slice(0, 25) : `Section ${i + 1}`;
        lines.push(label(`[content]  ${titleText}`));
        lines.push(empty);
      }
      lines.push(border);
    }
  }

  // Footer — always present
  lines.push(sectionLabel('FOOTER'));
  const footerLinks = headings.filter(h => h.level >= 2).slice(-3).map(h => h.text.slice(0, 15));
  if (footerLinks.length > 0) {
    lines.push(label(footerLinks.join('          ')));
  } else {
    lines.push(label('Footer Links'));
  }
  if (siteTitle) {
    lines.push(label(siteTitle.slice(0, 50)));
  }
  lines.push(border);

  // Dimension annotations
  lines.push('');
  lines.push('  Dimension Annotations:');
  if (skeleton) {
    if (skeleton.container?.maxWidth) lines.push(`  - Container max-width: ${skeleton.container.maxWidth}`);
    if (skeleton.header?.height) lines.push(`  - Header height: ${skeleton.header.height}`);
    if (skeleton.sidebar?.width) lines.push(`  - Sidebar width: ${skeleton.sidebar.width}`);
    if (skeleton.grid?.columns) lines.push(`  - Grid columns: ${skeleton.grid.columns}`);
    if (skeleton.grid?.gap) lines.push(`  - Grid gap: ${skeleton.grid.gap}`);
  }
  lines.push(`  - Layout type: ${skeleton?.layoutType || 'Single column / flow layout'}`);
  lines.push('');

  return lines.join('\n');
}

// ─── HTML 解析 ─────────────────────────────────────────────────
function extractMeta(html) {
  const get = (re) => { const m = html.match(re); return m?.[1]?.trim() || ''; };
  return {
    title: get(/<title[^>]*>([^<]*)<\/title>/i) || get(/<meta[^>]*property="og:title"[^>]*content="([^"]*)"/i),
    description: get(/<meta[^>]*name="description"[^>]*content="([^"]*)"/i) || get(/<meta[^>]*property="og:description"[^>]*content="([^"]*)"/i),
    ogImage: get(/<meta[^>]*property="og:image"[^>]*content="([^"]*)"/i),
    canonical: get(/<link[^>]*rel="canonical"[^>]*href="([^"]*)"/i),
    themeColor: get(/<meta[^>]*name="theme-color"[^>]*content="([^"]*)"/i),
  };
}

function extractStylesheetUrls(html, baseUrl) {
  const urls = [];
  const re = /<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    const resolved = normalizeUrl(m[1], baseUrl);
    if (resolved) urls.push(resolved);
  }
  // Also catch href before rel
  const re2 = /<link[^>]*href=["']([^"']+)["'][^>]*rel=["']stylesheet["']/gi;
  while ((m = re2.exec(html))) {
    const resolved = normalizeUrl(m[1], baseUrl);
    if (resolved && !urls.includes(resolved)) urls.push(resolved);
  }
  return urls;
}

function extractInlineStyles(html) {
  const styles = [];
  const re = /<style[^>]*>([\s\S]*?)<\/style>/gi;
  let m;
  while ((m = re.exec(html))) styles.push(m[1]);
  return styles.join('\n');
}

function detectTechStack(html) {
  const stack = [];
  if (html.includes('__NEXT_DATA__') || html.includes('_next/')) stack.push('Next.js');
  if (html.includes('__NUXT__') || html.includes('_nuxt/')) stack.push('Nuxt');
  if (html.includes('data-reactroot') || html.includes('react-dom')) stack.push('React');
  if (html.includes('vue-') || html.includes('__VUE__')) stack.push('Vue');
  if (html.includes('ng-') || html.includes('angular')) stack.push('Angular');
  if (html.includes('svelte')) stack.push('Svelte');
  if (html.includes('tailwind') || html.includes('tw-')) stack.push('Tailwind CSS');
  if (html.includes('antd') || html.includes('ant-design')) stack.push('Ant Design');
  if (html.includes('mui-') || html.includes('@mui/')) stack.push('Material UI');
  if (html.includes('bootstrap')) stack.push('Bootstrap');
  if (html.includes('chakra')) stack.push('Chakra UI');
  if (html.includes('shadcn')) stack.push('shadcn/ui');
  if (html.includes('lucide')) stack.push('Lucide Icons');
  if (html.includes('heroicons')) stack.push('Heroicons');
  if (html.includes('fontawesome') || html.includes('fa-')) stack.push('Font Awesome');
  if (html.includes('gsap') || html.includes('TweenMax')) stack.push('GSAP');
  if (html.includes('framer-motion') || html.includes('framer')) stack.push('Framer Motion');
  if (html.includes('three') || html.includes('THREE')) stack.push('Three.js');
  return [...new Set(stack)];
}

// ─── HTML 结构分析 ──────────────────────────────────────────────
function analyzeHTMLStructure(html) {
  const result = {
    nav: { items: [], hasSearch: false, hasLogin: false, hasMobileMenu: false },
    sections: [],
    headings: [],
    cards: { count: 0, patterns: [], sampleTitles: [] },
    images: { count: 0, sources: [], hasLazyLoad: false },
    forms: { count: 0, types: [] },
    lists: { count: 0 },
    tables: { count: 0 },
    videos: { count: 0 },
    svgs: { count: 0 },
    iframes: { count: 0 },
    contentType: '',
    layoutPattern: '',
    wordCount: 0,
  };

  // 1. 导航分析
  const navMatch = html.match(/<nav[^>]*>([\s\S]*?)<\/nav>/gi) || [];
  const headerMatch = html.match(/<header[^>]*>([\s\S]*?)<\/header>/gi) || [];
  const navHTML = (navMatch.length > 0 ? navMatch.join('') : '') + (headerMatch.length > 0 ? headerMatch[0] : '');
  
  // 提取导航链接
  const navLinkRe = /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  const seenTexts = new Set();
  while ((m = navLinkRe.exec(navHTML))) {
    const text = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text && text.length < 20 && !seenTexts.has(text) && !text.match(/^[\s\d]*$/)) {
      seenTexts.add(text);
      result.nav.items.push(text);
    }
  }
  if (result.nav.items.length > 20) result.nav.items.length = 20; // 截断
  
  result.nav.hasSearch = /search|搜索|<input[^>]*type=["']search["']/i.test(navHTML);
  result.nav.hasLogin = /登录|注册|login|sign.?in|sign.?up/i.test(navHTML);
  result.nav.hasMobileMenu = /hamburger|menu.?toggle|mobile.?nav|burger/i.test(navHTML) || 
    /class=["'][^"']*(?:menu|burger|hamburger)[^"']*["']/i.test(navHTML);

  // 2. 页面区块分析
  const sectionPatterns = [
    { tag: 'header', label: 'Header' },
    { tag: 'nav', label: 'Navigation' },
    { tag: 'main', label: 'Main Content' },
    { tag: 'aside', label: 'Sidebar' },
    { tag: 'footer', label: 'Footer' },
    { tag: 'section', label: 'Section' },
  ];
  
  sectionPatterns.forEach(({ tag, label }) => {
    const count = (html.match(new RegExp(`<${tag}[\\s>]`, 'gi')) || []).length;
    if (count > 0) {
      result.sections.push({ type: label, count });
    }
  });

  // 检测常见区块 class/id 模式
  const blockPatterns = [
    { re: /hero|banner|carousel|slider/i, label: 'Hero/Banner' },
    { re: /feature|highlight/i, label: 'Features' },
    { re: /pricing|plan/i, label: 'Pricing' },
    { re: /testimonial|review/i, label: 'Testimonials' },
    { re: /faq/i, label: 'FAQ' },
    { re: /cta|call-to-action/i, label: 'CTA' },
    { re: /blog|article|post|news/i, label: 'Blog/Articles' },
    { re: /product|shop|store|cart/i, label: 'E-commerce' },
    { re: /team|member|staff/i, label: 'Team' },
    { re: /contact|form/i, label: 'Contact' },
    { re: /gallery|portfolio|work/i, label: 'Gallery/Portfolio' },
    { re: /sidebar|widget/i, label: 'Sidebar' },
    { re: /modal|dialog|popup/i, label: 'Modal/Dialog' },
    { re: /tab|accordion/i, label: 'Tabs/Accordion' },
    { re: /dashboard|panel|admin/i, label: 'Dashboard' },
    { re: /chat|message/i, label: 'Chat/Messaging' },
  ];
  
  const detectedBlocks = [];
  blockPatterns.forEach(({ re, label }) => {
    const count = (html.match(re) || []).length;
    if (count > 0) detectedBlocks.push({ type: label, count });
  });
  result.detectedBlocks = detectedBlocks;

  // 3. 标题层级
  const headingRe = /<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi;
  const headingCounts = { h1: 0, h2: 0, h3: 0, h4: 0, h5: 0, h6: 0 };
  while ((m = headingRe.exec(html))) {
    const level = `h${m[1]}`;
    headingCounts[level]++;
    const text = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text && text.length < 100) {
      result.headings.push({ level: parseInt(m[1]), text });
    }
  }
  result.headingCounts = headingCounts;
  // 只保留前 30 个标题
  if (result.headings.length > 30) result.headings.length = 30;

  // 4. 卡片/重复结构分析
  // 检测重复的 class 模式（可能是卡片）
  const classRe = /class=["']([^"']+)["']/g;
  const classCounts = new Map();
  while ((m = classRe.exec(html))) {
    const classes = m[1].split(/\s+/);
    classes.forEach(cls => {
      if (cls.match(/card|item|tile|entry|post|article|product|block|module|cell|grid-item/i)) {
        classCounts.set(cls, (classCounts.get(cls) || 0) + 1);
      }
    });
  }
  
  const cardPatterns = [...classCounts.entries()]
    .filter(([, c]) => c >= 3) // 至少出现 3 次才算卡片模式
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  
  result.cards.count = cardPatterns.reduce((sum, [, c]) => sum + c, 0);
  result.cards.patterns = cardPatterns.map(([cls, c]) => `${cls} (×${c})`);
  
  // 提取卡片内的标题样本
  const cardTitleRe = /class=["'][^"']*(?:card|item|tile|entry|post)[^"']*["'][^>]*>[\s\S]*?<h[2-5][^>]*>([\s\S]*?)<\/h[2-5]>/gi;
  while ((m = cardTitleRe.exec(html))) {
    const text = m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (text && text.length < 80 && result.cards.sampleTitles.length < 8) {
      result.cards.sampleTitles.push(text);
    }
  }

  // 5. 图片分析
  const imgRe = /<img[^>]*src=["']([^"']+)["'][^>]*>/gi;
  while ((m = imgRe.exec(html))) {
    result.images.count++;
    if (result.images.sources.length < 10) {
      result.images.sources.push(m[1]);
    }
  }
  result.images.hasLazyLoad = /loading=["']lazy["']/i.test(html);
  
  // picture/source 元素
  const pictureCount = (html.match(/<picture[\s>]/gi) || []).length;
  const srcsetCount = (html.match(/srcset=/gi) || []).length;
  result.images.hasResponsiveImages = pictureCount > 0 || srcsetCount > 0;

  // 6. 其他元素计数
  result.forms.count = (html.match(/<form[\s>]/gi) || []).length;
  result.lists.count = (html.match(/<(?:ul|ol)[\s>]/gi) || []).length;
  result.tables.count = (html.match(/<table[\s>]/gi) || []).length;
  result.videos.count = (html.match(/<(?:video|iframe[^>]*youtube|iframe[^>]*vimeo)[\s>]/gi) || []).length;
  result.svgs.count = (html.match(/<svg[\s>]/gi) || []).length;
  result.iframes.count = (html.match(/<iframe[\s>]/gi) || []).length;

  // 7. 文字量估算
  const textContent = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  result.wordCount = textContent.split(/\s+/).filter(w => w.length > 1).length;

  // 8. 内容类型推断
  const typeSignals = [
    { re: /product|cart|checkout|shop|price|buy|add-to-cart/i, type: '电商/零售', score: 0 },
    { re: /blog|article|post|author|category|tag/i, type: '博客/内容', score: 0 },
    { re: /dashboard|chart|analytics|metric|kpi|data/i, type: '仪表盘/SaaS', score: 0 },
    { re: /portfolio|gallery|work|project|case-study/i, type: '作品集/Portfolio', score: 0 },
    { re: /landing|hero|cta|signup|subscribe|feature/i, type: '营销落地页', score: 0 },
    { re: /chat|message|conversation|channel/i, type: '社交/通讯', score: 0 },
    { re: /course|lesson|tutorial|learn|student/i, type: '教育/课程', score: 0 },
    { re: /news|headline|breaking|journal/i, type: '新闻/资讯', score: 0 },
    { re: /docs|documentation|api|reference|guide/i, type: '文档站', score: 0 },
    { re: /ai|model|prompt|generate|agent/i, type: 'AI 产品', score: 0 },
  ];
  
  typeSignals.forEach(signal => {
    signal.score = (html.match(signal.re) || []).length;
  });
  typeSignals.sort((a, b) => b.score - a.score);
  result.contentType = typeSignals[0].score > 0 
    ? typeSignals.slice(0, 3).filter(s => s.score > 0).map(s => s.type).join(' / ')
    : '通用网站';

  // 9. 布局模式推断
  const hasAside = /<aside[\s>]/i.test(html);
  const hasSidebar = /sidebar|side-bar/i.test(html);
  const gridClasses = (html.match(/grid|columns|col-\d/i) || []).length;
  const flexClasses = (html.match(/flex|row|inline/i) || []).length;
  
  if (hasAside || hasSidebar) {
    result.layoutPattern = '侧边栏布局（主内容 + 侧栏）';
  } else if (gridClasses > flexClasses && gridClasses > 10) {
    result.layoutPattern = '网格布局（Grid）';
  } else if (flexClasses > 10) {
    result.layoutPattern = '弹性布局（Flexbox）';
  } else {
    result.layoutPattern = '单栏/流式布局';
  }

  return result;
}

// ─── CSS 解析 ──────────────────────────────────────────────────
function parseCSS(css) {
  const tokens = {
    customProperties: {},
    colors: new Map(),
    fontFamilies: new Map(),
    fontSizes: new Map(),
    fontWeights: new Map(),
    lineHeights: new Map(),
    letterSpacing: new Map(),
    spacing: new Map(),
    borderRadius: new Map(),
    shadows: new Map(),
    transitions: new Map(),
    animations: new Map(),
    breakpoints: new Map(),
    gradients: new Map(),
    zIndex: new Map(),
    opacity: new Map(),
  };

  // 1. CSS Custom Properties (--*)
  const propRe = /(--[\w-]+)\s*:\s*([^;}{]+);/g;
  let m;
  while ((m = propRe.exec(css))) {
    const name = m[1];
    const value = m[2].trim();
    if (name && value && !value.includes('var(')) {
      tokens.customProperties[name] = value;
    }
  }

  // 2. Colors
  const hexRe = /#(?:[0-9a-fA-F]{3,4}){1,2}\b/g;
  const rgbRe = /rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+(?:\s*,\s*[\d.]+)?\s*\)/g;
  const hslRe = /hsla?\(\s*\d+\s*,\s*[\d.]+%\s*,\s*[\d.]+%(?:\s*,\s*[\d.]+)?\s*\)/g;
  const namedColors = ['transparent', 'currentColor', 'inherit'];
  
  for (const re of [hexRe, rgbRe, hslRe]) {
    let cm;
    const regex = new RegExp(re.source, re.flags);
    while ((cm = regex.exec(css))) {
      const color = cm[0];
      if (!namedColors.includes(color)) {
        tokens.colors.set(color, (tokens.colors.get(color) || 0) + 1);
      }
    }
  }

  // 3. Font families
  const ffRe = /font-family\s*:\s*([^;}{]+);/g;
  while ((m = ffRe.exec(css))) {
    const ff = m[1].trim().replace(/["']/g, '');
    tokens.fontFamilies.set(ff, (tokens.fontFamilies.get(ff) || 0) + 1);
  }

  // 4. Font sizes
  const fsRe = /(?:^|[\s;{])font-size\s*:\s*([\d.]+(?:px|rem|em|vh|vw|%))\b/g;
  while ((m = fsRe.exec(css))) {
    const val = m[1];
    tokens.fontSizes.set(val, (tokens.fontSizes.get(val) || 0) + 1);
  }

  // 5. Font weights
  const fwRe = /font-weight\s*:\s*(\w+)\s*[;}]/g;
  while ((m = fwRe.exec(css))) {
    const val = m[1];
    tokens.fontWeights.set(val, (tokens.fontWeights.get(val) || 0) + 1);
  }

  // 6. Line heights
  const lhRe = /line-height\s*:\s*([\d.]+(?:px|rem|em|%|))\s*[;}]/g;
  while ((m = lhRe.exec(css))) {
    const val = m[1];
    if (val) tokens.lineHeights.set(val, (tokens.lineHeights.get(val) || 0) + 1);
  }

  // 7. Letter spacing
  const lsRe = /letter-spacing\s*:\s*([\d.-]+(?:px|rem|em))\s*[;}]/g;
  while ((m = lsRe.exec(css))) {
    tokens.letterSpacing.set(m[1], (tokens.letterSpacing.get(m[1]) || 0) + 1);
  }

  // 8. Spacing (padding, margin, gap)
  const spRe = /(?:padding|margin|gap|top|right|bottom|left)(?:-(?:top|right|bottom|left))?\s*:\s*([\d.]+(?:px|rem|em))\b/g;
  while ((m = spRe.exec(css))) {
    const val = m[1];
    const px = parseFloat(val);
    if (px > 0 && px <= 200) {
      tokens.spacing.set(val, (tokens.spacing.get(val) || 0) + 1);
    }
  }

  // 9. Border radius
  const brRe = /border-radius\s*:\s*([^;}{]+);/g;
  while ((m = brRe.exec(css))) {
    const val = m[1].trim();
    if (val.match(/^[\d.]+(?:px|rem|em|%)/)) {
      tokens.borderRadius.set(val, (tokens.borderRadius.get(val) || 0) + 1);
    }
  }

  // 10. Box shadows
  const bsRe = /box-shadow\s*:\s*([^;}{]+);/g;
  while ((m = bsRe.exec(css))) {
    const val = m[1].trim();
    if (val && val !== 'none') {
      tokens.shadows.set(val, (tokens.shadows.get(val) || 0) + 1);
    }
  }

  // 11. Transitions
  const trRe = /transition(?:-property)?\s*:\s*([^;}{]+);/g;
  while ((m = trRe.exec(css))) {
    const val = m[1].trim();
    if (val && val !== 'none') {
      tokens.transitions.set(val, (tokens.transitions.get(val) || 0) + 1);
    }
  }

  // 12. Animations
  const anRe = /animation(?:-name)?\s*:\s*([^;}{]+);/g;
  while ((m = anRe.exec(css))) {
    const val = m[1].trim();
    if (val && val !== 'none' && !val.startsWith('var(')) {
      tokens.animations.set(val, (tokens.animations.get(val) || 0) + 1);
    }
  }

  // 13. Media queries (breakpoints)
  const mqRe = /@media[^{]*\(\s*(?:min|max)-width\s*:\s*([\d.]+)(px|em|rem)\s*\)/g;
  while ((m = mqRe.exec(css))) {
    const bp = `${m[1]}${m[2]}`;
    tokens.breakpoints.set(bp, (tokens.breakpoints.get(bp) || 0) + 1);
  }

  // 14. Gradients
  const grRe = /(?:linear|radial|conic)-gradient\(([^)]+)\)/g;
  while ((m = grRe.exec(css))) {
    const val = m[0];
    tokens.gradients.set(val, (tokens.gradients.get(val) || 0) + 1);
  }

  // 15. Z-index values
  const ziRe = /z-index\s*:\s*(-?\d+)\s*[;}]/g;
  while ((m = ziRe.exec(css))) {
    tokens.zIndex.set(m[1], (tokens.zIndex.get(m[1]) || 0) + 1);
  }

  return tokens;
}

// ─── 分析 & 排序 ──────────────────────────────────────────────
function topN(map, n = 15) {
  return [...map.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, n);
}

function analyzeTokens(tokens) {
  // 找出主要颜色（出现次数最多的）
  const primaryColors = topN(tokens.colors, 10);
  
  // 找出主要字号（形成排版阶梯）
  const mainFontSizes = topN(tokens.fontSizes, 10);
  
  // 找出主要间距值（形成间距系统）
  const mainSpacing = topN(tokens.spacing, 15);
  
  // 找出主要圆角
  const mainRadius = topN(tokens.borderRadius, 8);
  
  // 找出主要阴影
  const mainShadows = topN(tokens.shadows, 5);
  
  // 找出断点
  const mainBreakpoints = topN(tokens.breakpoints, 8);
  
  // 推断间距系统（是否为 4/8 的倍数）
  const spacingValues = mainSpacing.map(([v]) => parseFloat(v)).filter(v => v > 0);
  const is4ptGrid = spacingValues.every(v => v % 4 === 0);
  const is8ptGrid = spacingValues.every(v => v % 8 === 0);
  
  // 推断主色调
  const customPropColors = Object.entries(tokens.customProperties)
    .filter(([k, v]) => v.match(/^#[0-9a-fA-F]{3,8}$/) || v.match(/^rgb/))
    .map(([k, v]) => ({ name: k, value: v }));

  return {
    primaryColors,
    mainFontSizes,
    mainSpacing,
    mainRadius,
    mainShadows,
    mainBreakpoints,
    is4ptGrid,
    is8ptGrid,
    customPropColors,
    topFontFamilies: topN(tokens.fontFamilies, 5),
    topFontWeights: topN(tokens.fontWeights, 5),
    topLineHeights: topN(tokens.lineHeights, 5),
    topLetterSpacing: topN(tokens.letterSpacing, 5),
    topTransitions: topN(tokens.transitions, 5),
    topGradients: topN(tokens.gradients, 5),
  };
}

// ─── 反向查找：从 HTML class 名 → CSS 精确规则 ────────────────
function reverseLookupClasses(htmlClassNames, cssRules) {
  // htmlClassNames: ['item-wrap', 'item-title', 'item-desc', ...] 来自 HTML 分析
  // cssRules: [{selector, props}, ...] 来自 CSS 解析
  // 返回: { className: [{selector, props}], ... }
  
  const results = {};
  
  for (const className of htmlClassNames) {
    if (!className || className.length < 2) continue;
    const matched = [];
    
    for (const rule of cssRules) {
      // 匹配 .className 或 .className:hover 等
      if (rule.selector.includes(`.${className}`) && !rule.selector.includes('::')) {
        const hasLayout = Object.keys(rule.props).some(k => 
          ['display', 'width', 'height', 'padding', 'margin', 'background', 'border', 
           'flex', 'grid', 'max-width', 'gap', 'font-size', 'color', 'line-height',
           'border-radius', 'box-shadow', 'position', 'overflow', 'text-align',
           'font-weight', 'cursor', 'transition', 'min-height'].some(p => k.includes(p))
        );
        if (hasLayout && Object.keys(rule.props).length >= 3) {
          // 优先选择器越短越好（容器级别）
          const depth = rule.selector.split(' ').length;
          const score = 10 - depth + Object.keys(rule.props).length * 0.5;
          matched.push({ ...rule, score, depth });
        }
      }
    }
    
    // 按分数排序，取最好的
    matched.sort((a, b) => b.score - a.score);
    if (matched.length > 0) {
      results[className] = matched.slice(0, 3); // 保留前3个变体
    }
  }
  
  return results;
}

// ─── 从 HTML 提取导航链接（不依赖 <nav> 语义标签）──────────────
function extractNavFromHTML(html) {
  const navItems = [];
  const seenTexts = new Set();
  
  // 策略1: 从 header/nav 区域的 <a> 标签提取
  const headerMatch = html.match(/<header[\s\S]*?<\/header>/i) 
    || html.match(/<nav[\s\S]*?<\/nav>/i)
    || html.match(/class=["'][^"']*(?:header|topbar|navbar|top-nav|main-menu)[^"']*["'][\s\S]*?(?=<div class|<section|<main|$)/i);
  
  const searchArea = headerMatch ? headerMatch[0] : html.slice(0, 50000); // 前50KB通常包含导航
  
  // 提取短文本链接（导航项通常是 2-8 个字的短文本）
  const linkRe = /<a[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi;
  let m;
  while ((m = linkRe.exec(searchArea))) {
    const text = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    const href = m[1];
    // 过滤：只要短文本、非空、非纯数字、非 JavaScript 链接
    if (text && text.length >= 1 && text.length <= 12 
        && !seenTexts.has(text) 
        && !text.match(/^[\s\d]+$/)
        && !href.startsWith('javascript:')
        && !text.match(/^(首页|Home)$/i) // 首页单独处理
    ) {
      seenTexts.add(text);
      navItems.push(text);
    }
  }
  
  // 补上"首页"（通常第一个链接）
  if (!seenTexts.has('首页')) {
    navItems.unshift('首页');
  }
  
  // 限制数量
  return navItems.slice(0, 12);
}

// ─── 复刻蓝图：CSS 规则提取 + 组件配方 + 色彩角色 + 页面骨架 + 复刻指南 ───
function extractCSSRules(css) {
  // 移除注释
  css = css.replace(/\/\*[\s\S]*?\*\//g, '');
  
  // 提取规则：selector { properties }
  const rules = [];
  const ruleRe = /([^{}@]+)\{([^{}]+)\}/g;
  let m;
  while ((m = ruleRe.exec(css))) {
    const selectors = m[1].trim().split(',').map(s => s.trim()).filter(Boolean);
    const propsStr = m[2].trim();
    const props = {};
    const propRe = /([\w-]+)\s*:\s*([^;]+);/g;
    let pm;
    while ((pm = propRe.exec(propsStr))) {
      props[pm[1]] = pm[2].trim();
    }
    selectors.forEach(sel => {
      if (sel && Object.keys(props).length > 0) {
        rules.push({ selector: sel, props });
      }
    });
  }
  return rules;
}

function classifyComponentRules(rules) {
  // 按组件类型分组 CSS 规则
  const components = {
    buttons: [],
    cards: [],
    nav: [],
    tags: [],
    inputs: [],
    links: [],
    headings: [],
    containers: [],
    images: [],
    lists: [],
    modals: [],
    tabs: [],
    tables: [],
    badges: [],
    avatars: [],
  };

  const patterns = {
    buttons: /btn|button|cta/i,
    cards: /card|tile|post-item|article-item|entry|feed-item/i,
    nav: /^\.?nav|^\.?menu|^\.?header|^\.?topbar|navbar/i,
    tags: /tag|badge|label|chip|pill|category/i,
    inputs: /input|textarea|select|form|field|search-box/i,
    links: /^a\b|^\.link|^a\.|^a:/i,
    headings: /^h[1-6]\b|^\.title|^\.heading/i,
    containers: /container|wrapper|main-content|page-wrap|layout/i,
    images: /^img\b|^\.img|^\.thumb|^\.cover|^\.banner/i,
    lists: /^ul\b|^ol\b|^li\b|^\.list/i,
    modals: /modal|dialog|popup|overlay|lightbox/i,
    tabs: /tab|toggle|switch|segment/i,
    tables: /table|thead|tbody|tr\b|td\b|th\b/i,
    badges: /badge|count|notification|dot/i,
    avatars: /avatar|user-img|profile-img|face/i,
  };

  rules.forEach(rule => {
    for (const [type, pattern] of Object.entries(patterns)) {
      if (pattern.test(rule.selector)) {
        // 只保留有实质性样式属性的规则
        const importantProps = ['background', 'background-color', 'color', 'padding', 'margin',
          'border', 'border-radius', 'box-shadow', 'font-size', 'font-weight', 'line-height',
          'display', 'width', 'height', 'max-width', 'gap', 'flex', 'grid', 'text-align',
          'cursor', 'transition', 'opacity', 'letter-spacing', 'text-transform',
          'border-bottom', 'border-top', 'transform', 'min-height', 'min-width'];
        const relevantProps = {};
        for (const [k, v] of Object.entries(rule.props)) {
          if (importantProps.some(p => k.includes(p) || p.includes(k))) {
            relevantProps[k] = v;
          }
        }
        if (Object.keys(relevantProps).length >= 2) {
          // 计算选择器质量分数
          const sel = rule.selector;
          let score = 0;
          // 偏好短选择器（容器级别）
          const depth = sel.split(' ').length;
          score += Math.max(0, 5 - depth); // 越短越好
          // 偏好没有伪元素/伪类的
          if (sel.includes('::') || sel.includes(':hover') || sel.includes(':focus') || sel.includes(':active')) score -= 3;
          // 偏好包含布局属性的（display, width, padding）
          const layoutProps = ['display', 'width', 'height', 'padding', 'flex', 'grid', 'max-width', 'position'];
          for (const [k] of Object.entries(relevantProps)) {
            if (layoutProps.some(lp => k.includes(lp))) score += 2;
          }
          // 偏好包含背景色的（通常是容器）
          if (relevantProps['background-color'] || relevantProps['background']) score += 3;
          // 偏好没有子选择器 > 的
          if (!sel.includes(' > ')) score += 1;
          // 惩罚过于深层的选择器
          if (depth > 3) score -= 5;
          
          components[type].push({ selector: sel, props: relevantProps, score });
        }
        break; // 只归入第一个匹配的类别
      }
    }
  });

  return components;
}

function inferColorRoles(tokens, analysis, css) {
  const roles = {
    primary: '',      // 主品牌色
    primaryHover: '', // 主色悬停
    secondary: '',    // 辅助色
    background: '',   // 页面背景
    surface: '',      // 卡片/容器背景
    textPrimary: '',  // 主要文字
    textSecondary: '',// 次要文字
    textMuted: '',    // 弱化文字
    border: '',       // 边框
    success: '',      // 成功
    warning: '',      // 警告
    error: '',        // 错误
    accent: '',       // 强调色
  };

  // 辅助：判断颜色是否为灰色（RGB 三通道接近）
  function isGray(hex) {
    if (!hex.match(/^#[0-9a-fA-F]{6}$/)) return false;
    const r = parseInt(hex.slice(1,3), 16);
    const g = parseInt(hex.slice(3,5), 16);
    const b = parseInt(hex.slice(5,7), 16);
    return Math.abs(r - g) <= 20 && Math.abs(g - b) <= 20 && Math.abs(r - b) <= 20;
  }
  
  function isWhite(hex) {
    const c = hex.toLowerCase();
    return c === '#fff' || c === '#ffffff' || c === '#ffff' || c === '#ffffffff';
  }
  
  function isBlack(hex) {
    const c = hex.toLowerCase();
    return c === '#000' || c === '#000000' || c === '#0000' || c === '#00000000';
  }

  // 1. 从 CSS 变量中推断角色（但不包括灰色作为 primary）
  const cp = tokens.customProperties;
  for (const [name, value] of Object.entries(cp)) {
    if (!value.match(/^#[0-9a-fA-F]{3,8}$/) && !value.match(/^rgb/)) continue;
    const nl = name.toLowerCase();
    if ((nl.includes('primary') || nl.includes('brand') || nl.includes('accent')) && !isGray(value) && !isWhite(value) && !isBlack(value)) {
      if (!roles.primary) roles.primary = value;
    }
    if (nl.includes('hover') && (nl.includes('primary') || nl.includes('brand'))) {
      if (!isGray(value)) roles.primaryHover = value;
    }
    if (nl.includes('bg') || nl.includes('background') || nl.includes('surface')) {
      if (nl.includes('base') || nl.includes('page') || nl.includes('body')) roles.background = value;
      else if (!roles.surface) roles.surface = value;
    }
    if (nl.includes('text') || nl.includes('font') || nl.includes('fg') || nl.includes('foreground')) {
      if (nl.includes('secondary') || nl.includes('muted') || nl.includes('sub') || nl.includes('light')) {
        if (!roles.textSecondary) roles.textSecondary = value;
      } else if (!roles.textPrimary) roles.textPrimary = value;
    }
    if (nl.includes('border') && !roles.border) roles.border = value;
    if (nl.includes('success') || nl.includes('green')) roles.success = value;
    if (nl.includes('warning') || nl.includes('warn')) roles.warning = value;
    if (nl.includes('error') || nl.includes('danger')) roles.error = value;
  }

  // 2. 从高频颜色中推断——非灰色的最高频色 = 主色
  const colors = analysis.primaryColors;
  if (!roles.primary) {
    for (const [color, count] of colors) {
      if (isWhite(color) || isBlack(color) || isGray(color)) continue;
      if (count >= 5) { roles.primary = color; break; }
    }
  }
  
  // 3. 常见颜色角色推断
  for (const [color, count] of colors) {
    if (isWhite(color) && count > 50) roles.surface = color;
    if (isBlack(color) && count > 20 && !roles.textPrimary) roles.textPrimary = '#333333';
    if (color.match(/^#[0-9a-f]{6}$/)) {
      const r = parseInt(color.slice(1,3), 16);
      const g = parseInt(color.slice(3,5), 16);
      const b = parseInt(color.slice(5,7), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      if (brightness > 245 && count > 30 && !roles.background) roles.background = color;
      if (brightness < 60 && count > 20 && !roles.textPrimary) roles.textPrimary = color;
      if (brightness > 150 && brightness < 220 && count > 10 && isGray(color) && !roles.textMuted) roles.textMuted = color;
      if (brightness > 100 && brightness < 180 && count > 10 && isGray(color) && !roles.textSecondary) roles.textSecondary = color;
      if (brightness > 220 && brightness < 250 && count > 10 && isGray(color) && !roles.border) roles.border = color;
    }
  }

  // 4. 如果 primary 和 surface 相同（说明 primary 推断失败），清空 primary
  if (roles.primary && roles.surface && roles.primary === roles.surface) {
    roles.primary = '';
  }

  return roles;
}

function extractPageSkeleton(html, css, htmlStructure) {
  const skeleton = {
    container: { maxWidth: '', padding: '' },
    header: { height: '', position: '' },
    sidebar: { width: '', position: '' },
    main: { width: '' },
    footer: { padding: '' },
    grid: { columns: '', gap: '' },
    layoutType: '',
  };

  // 从 CSS 变量推断
  const cp = css;
  const maxW = cp.match(/max-width\s*:\s*([\d]+(?:px|rem))/);
  if (maxW) skeleton.container.maxWidth = maxW[1];

  // 从 CSS 规则推断
  const rules = extractCSSRules(css);
  
  for (const rule of rules) {
    const sel = rule.selector.toLowerCase();
    const p = rule.props;
    
    // Header — 只取精确的 height（px/rem），排除 line-height 的 em 值
    if (/(header|topbar|navbar|top-nav|main-nav)/i.test(sel)) {
      if (p.height && p.height.match(/^\d+(\.\d+)?(px|rem)$/) && !skeleton.header.height) skeleton.header.height = p.height;
      if (p['min-height'] && p['min-height'].match(/^\d+(\.\d+)?(px|rem)$/) && !skeleton.header.height) skeleton.header.height = p['min-height'];
      if (p.position && p.position !== 'static') skeleton.header.position = p.position;
    }
    
    // Sidebar — 只取精确的 width，不取 max-width
    if (/(sidebar|side-bar|aside|widget-area|right-col)/i.test(sel)) {
      if (p.width && !skeleton.sidebar.width) skeleton.sidebar.width = p.width;
      if (p.position && p.position !== 'static') skeleton.sidebar.position = p.position;
    }
    
    // Container
    if (/(container|wrapper|page-wrap|main-content|content-area)/i.test(sel)) {
      if (p['max-width'] && !skeleton.container.maxWidth) skeleton.container.maxWidth = p['max-width'];
      if (p.padding) skeleton.container.padding = p.padding;
    }
    
    // Grid
    if (/(grid|columns|row)/i.test(sel)) {
      if (p['grid-template-columns'] && !skeleton.grid.columns) skeleton.grid.columns = p['grid-template-columns'];
      if (p.gap && !skeleton.grid.gap) skeleton.grid.gap = p.gap;
    }
  }

  // 从断点推断布局类型
  if (htmlStructure) {
    skeleton.layoutType = htmlStructure.layoutPattern;
    if (htmlStructure.sections.some(s => s.type === 'Sidebar')) {
      skeleton.layoutType = '侧边栏布局（主内容 + 侧栏）';
    }
  }

  return skeleton;
}

function buildReplicationBlueprint(htmlStructure, componentSpecs, colorRoles, skeleton, analysis, meta) {
  const guide = {
    steps: [],
    componentRecipes: {},
    quickCSS: '',
  };

  // 生成快速 CSS 模板
  const cssVars = [];
  if (colorRoles.primary) cssVars.push(`  --color-primary: ${colorRoles.primary};`);
  if (colorRoles.primaryHover) cssVars.push(`  --color-primary-hover: ${colorRoles.primaryHover};`);
  if (colorRoles.background) cssVars.push(`  --color-bg: ${colorRoles.background};`);
  if (colorRoles.surface) cssVars.push(`  --color-surface: ${colorRoles.surface};`);
  if (colorRoles.textPrimary) cssVars.push(`  --color-text: ${colorRoles.textPrimary};`);
  if (colorRoles.textSecondary) cssVars.push(`  --color-text-secondary: ${colorRoles.textSecondary};`);
  if (colorRoles.textMuted) cssVars.push(`  --color-text-muted: ${colorRoles.textMuted};`);
  if (colorRoles.border) cssVars.push(`  --color-border: ${colorRoles.border};`);
  if (colorRoles.error) cssVars.push(`  --color-error: ${colorRoles.error};`);
  if (colorRoles.success) cssVars.push(`  --color-success: ${colorRoles.success};`);
  if (colorRoles.warning) cssVars.push(`  --color-warning: ${colorRoles.warning};`);
  
  // 从分析中补充
  if (analysis.topFontFamilies.length > 0) {
    cssVars.push(`  --font-family: ${analysis.topFontFamilies[0][0]};`);
  }
  if (analysis.mainRadius.length > 0) {
    const commonRadius = analysis.mainRadius[0][0];
    cssVars.push(`  --radius: ${commonRadius};`);
  }
  if (analysis.mainShadows.length > 0) {
    cssVars.push(`  --shadow: ${analysis.mainShadows[0][0]};`);
  }

  guide.quickCSS = `:root {\n${cssVars.join('\n')}\n}`;

  // 组件配方：为每个有数据的组件类型生成 CSS 模板
  const typeLabels = {
    buttons: '按钮', cards: '卡片', nav: '导航', tags: '标签/徽章',
    inputs: '输入框', links: '链接', headings: '标题', containers: '容器',
    images: '图片', lists: '列表', modals: '模态框', tabs: '标签页',
    tables: '表格', badges: '角标', avatars: '头像',
  };

  for (const [type, rules] of Object.entries(componentSpecs)) {
    if (rules.length === 0) continue;
    
    // 取最有代表性的规则（分数最高的，分数基于选择器简洁度和布局属性）
    const best = rules.sort((a, b) => (b.score || 0) - (a.score || 0))[0];
    
    let cssTemplate = `${best.selector} {\n`;
    for (const [k, v] of Object.entries(best.props)) {
      cssTemplate += `  ${k}: ${v};\n`;
    }
    cssTemplate += `}`;
    
    guide.componentRecipes[type] = {
      label: typeLabels[type] || type,
      count: rules.length,
      sampleSelector: best.selector,
      css: cssTemplate,
      // 如果有多个变体，列出前 3 个
      variants: rules.slice(0, 3).map(r => ({
        selector: r.selector,
        props: Object.entries(r.props).map(([k,v]) => `${k}: ${v}`).join('; '),
      })),
    };
  }

  // 生成复刻步骤
  const domain = meta.title || '';
  guide.steps = [
    { step: 1, title: '搭建设计令牌', desc: '复制上方 :root CSS 变量到你的样式表。这些是从原站提取的颜色、字体、圆角、阴影的精确值。' },
    { step: 2, title: '搭建页面骨架', desc: `根据页面骨架数据，创建 ${skeleton.layoutType || '页面布局'}。设置容器最大宽度${skeleton.container.maxWidth ? `为 ${skeleton.container.maxWidth}` : ''}，${skeleton.header.height ? `header 高度 ${skeleton.header.height}` : 'header'}，${skeleton.sidebar.width ? `侧栏宽度 ${skeleton.sidebar.width}` : ''}。` },
    { step: 3, title: '实现导航栏', desc: componentSpecs.nav?.length > 0 ? `使用导航组件配方中的精确样式。` : '参考原站导航截图，使用设计令牌中的颜色和字体。' },
    { step: 4, title: '构建内容区域', desc: componentSpecs.cards?.length > 0 ? `使用卡片组件配方（${componentSpecs.cards.length} 个变体已提取）。` : '使用卡片样式。' },
    { step: 5, title: '添加侧边栏', desc: skeleton.sidebar.width ? `侧栏宽度 ${skeleton.sidebar.width}，包含热门话题、频道推荐等模块。` : '根据原站布局添加侧栏。' },
    { step: 6, title: '实现交互状态', desc: '为所有交互元素添加 hover/active/focus/disabled 状态。使用 transition: all .2s 实现过渡。' },
    { step: 7, title: '响应式适配', desc: `在 ${analysis.mainBreakpoints?.map(([v]) => v).join(' / ') || '768px / 1024px'} 断点处调整布局。` },
  ];

  return guide;
}

// ─── Markdown 报告生成 ─────────────────────────────────────────
function generateReport(url, meta, techStack, tokens, analysis, cssSourceCount, cssTotalSize, htmlStructure, blueprint, componentSpecs, colorRoles, skeleton, wireframeText, screenshotResult) {
  const domain = new URL(url).hostname.replace('www.', '');
  const date = new Date().toISOString().split('T')[0];
  
  const lines = [];
  const p = (...args) => lines.push(args.join(''));
  
  p(`# ${domain} — 设计系统分析报告`);
  p();
  p(`> 生成时间: ${date} | URL: ${url} | CSS 源: ${cssSourceCount} 个 (${(cssTotalSize/1024).toFixed(1)}KB)`);
  p();

  // ── 复刻蓝图（最重要的部分，放最前面）──
  if (blueprint) {
    p(`## 0. 复刻蓝图（Replication Blueprint）`);
    p();
    p(`> **这是给 AI Agent 的复刻指南。** 按以下步骤重建页面，每个组件都有从原站提取的精确 CSS。`);
    p();

    // 快速 CSS 变量
    p(`### 设计令牌（直接复制到 :root）`);
    p();
    p('```css');
    p(blueprint.quickCSS);
    p('```');
    p();

    // 页面骨架
    if (skeleton) {
      p(`### 页面骨架`);
      p();
      p(`| 结构 | 尺寸 |`);
      p(`|------|------|`);
      if (skeleton.layoutType) p(`| 布局类型 | ${skeleton.layoutType} |`);
      if (skeleton.container.maxWidth) p(`| 容器最大宽度 | ${skeleton.container.maxWidth} |`);
      if (skeleton.container.padding) p(`| 容器内边距 | ${skeleton.container.padding} |`);
      if (skeleton.header.height) p(`| Header 高度 | ${skeleton.header.height} |`);
      if (skeleton.header.position) p(`| Header 定位 | ${skeleton.header.position} |`);
      if (skeleton.sidebar.width) p(`| 侧栏宽度 | ${skeleton.sidebar.width} |`);
      if (skeleton.grid.columns) p(`| 网格列 | ${skeleton.grid.columns} |`);
      if (skeleton.grid.gap) p(`| 网格间距 | ${skeleton.grid.gap} |`);
      p();
    }

    // 色彩角色表
    if (colorRoles) {
      p(`### 色彩角色映射`);
      p();
      p(`| 角色 | 色值 | 用途 |`);
      p(`|------|------|------|`);
      const roleLabels = {
        primary: '主品牌色', primaryHover: '主色悬停', secondary: '辅助色',
        background: '页面背景', surface: '卡片/容器背景',
        textPrimary: '主要文字', textSecondary: '次要文字', textMuted: '弱化文字',
        border: '边框', success: '成功', warning: '警告', error: '错误', accent: '强调色',
      };
      for (const [role, value] of Object.entries(colorRoles)) {
        if (value) p(`| ${roleLabels[role] || role} | \`${value}\` | ${role} |`);
      }
      p();
    }

    // 组件配方
    if (Object.keys(blueprint.componentRecipes).length > 0) {
      p(`### 组件配方（精确 CSS）`);
      p();
      for (const [type, recipe] of Object.entries(blueprint.componentRecipes)) {
        p(`#### ${recipe.label}（${recipe.count} 个变体）`);
        p();
        p('```css');
        p(recipe.css);
        p('```');
        p();
        // 如果有多个变体
        if (recipe.variants.length > 1) {
          p(`**其他变体：**`);
          p();
          recipe.variants.slice(1, 4).forEach(v => {
            p(`- \`${v.selector}\`: ${v.props}`);
          });
          p();
        }
      }
    }

    // 复刻步骤
    if (blueprint.steps.length > 0) {
      p(`### 复刻步骤`);
      p();
      blueprint.steps.forEach(s => {
        p(`**Step ${s.step}: ${s.title}** — ${s.desc}`);
        p();
      });
    }

    p(`---`);
    p();
  }
  
  // ── 元信息 ──
  p(`## 1. 站点概况`);
  p();
  if (meta.title) p(`**标题:** ${meta.title}`);
  if (meta.description) p(`**描述:** ${meta.description}`);
  if (meta.themeColor) p(`**主题色:** \`${meta.themeColor}\``);
  if (techStack.length > 0) p(`**技术栈:** ${techStack.join(' / ')}`);
  if (htmlStructure) {
    p(`**内容类型:** ${htmlStructure.contentType}`);
    p(`**布局模式:** ${htmlStructure.layoutPattern}`);
    p(`**文字量:** ~${htmlStructure.wordCount} 词`);
  }
  p();
  
  // ── HTML 结构分析 ──
  if (htmlStructure) {
    p(`## 2. 页面结构分析`);
    p();
    
    // 导航
    if (htmlStructure.nav.items.length > 0) {
      p(`### 导航菜单`);
      p();
      p(`**导航项:** ${htmlStructure.nav.items.join(' → ')}`);
      p();
      const navFeatures = [];
      if (htmlStructure.nav.hasSearch) navFeatures.push('有搜索');
      if (htmlStructure.nav.hasLogin) navFeatures.push('有登录');
      if (htmlStructure.nav.hasMobileMenu) navFeatures.push('有移动端菜单');
      if (navFeatures.length > 0) p(`**导航功能:** ${navFeatures.join(' / ')}`);
      p();
    }
    
    // 语义化区块
    if (htmlStructure.sections.length > 0) {
      p(`### 语义化区块`);
      p();
      p(`| 区块 | 数量 |`);
      p(`|------|------|`);
      htmlStructure.sections.forEach(s => p(`| ${s.type} | ${s.count} |`));
      p();
    }
    
    // 检测到的功能区块
    if (htmlStructure.detectedBlocks && htmlStructure.detectedBlocks.length > 0) {
      p(`### 功能区块检测`);
      p();
      p(`| 区块类型 | 匹配次数 |`);
      p(`|----------|----------|`);
      htmlStructure.detectedBlocks.slice(0, 12).forEach(b => p(`| ${b.type} | ${b.count} |`));
      p();
    }
    
    // 标题层级
    if (htmlStructure.headingCounts) {
      const hc = htmlStructure.headingCounts;
      const total = Object.values(hc).reduce((a, b) => a + b, 0);
      if (total > 0) {
        p(`### 标题层级`);
        p();
        p(`| 级别 | 数量 |`);
        p(`|------|------|`);
        Object.entries(hc).forEach(([level, count]) => {
          if (count > 0) p(`| ${level.toUpperCase()} | ${count} |`);
        });
        p();
        // 展示前 15 个标题文本
        if (htmlStructure.headings.length > 0) {
          p(`**标题样本（前 15 个）：**`);
          p();
          htmlStructure.headings.slice(0, 15).forEach(h => {
            p(`- [${'H' + h.level}] ${h.text}`);
          });
          p();
        }
      }
    }
    
    // 卡片/重复结构
    if (htmlStructure.cards.count > 0) {
      p(`### 卡片/重复结构`);
      p();
      p(`检测到 **${htmlStructure.cards.count}** 个卡片类元素。`);
      p();
      if (htmlStructure.cards.patterns.length > 0) {
        p(`**卡片 class 模式:** ${htmlStructure.cards.patterns.join(', ')}`);
        p();
      }
      if (htmlStructure.cards.sampleTitles.length > 0) {
        p(`**卡片标题样本:**`);
        p();
        htmlStructure.cards.sampleTitles.forEach(t => p(`- ${t}`));
        p();
      }
    }
    
    // 媒体元素统计
    p(`### 媒体元素统计`);
    p();
    p(`| 元素 | 数量 | 备注 |`);
    p(`|------|------|------|`);
    p(`| 图片 | ${htmlStructure.images.count} | ${htmlStructure.images.hasLazyLoad ? '✅ 有懒加载' : '⚠️ 无懒加载'} ${htmlStructure.images.hasResponsiveImages ? '✅ 有响应式图片' : ''} |`);
    if (htmlStructure.svgs.count > 0) p(`| SVG | ${htmlStructure.svgs.count} | |`);
    if (htmlStructure.videos.count > 0) p(`| 视频 | ${htmlStructure.videos.count} | |`);
    if (htmlStructure.iframes.count > 0) p(`| iframe | ${htmlStructure.iframes.count} | |`);
    if (htmlStructure.forms.count > 0) p(`| 表单 | ${htmlStructure.forms.count} | |`);
    if (htmlStructure.tables.count > 0) p(`| 表格 | ${htmlStructure.tables.count} | |`);
    p(`| 列表 | ${htmlStructure.lists.count} | |`);
    p();
    
    // 图片源
    if (htmlStructure.images.sources.length > 0) {
      p(`### 图片资源样本`);
      p();
      htmlStructure.images.sources.slice(0, 6).forEach(src => {
        const short = src.length > 80 ? src.slice(0, 77) + '...' : src;
        p(`- \`${short}\``);
      });
      p();
    }
  }
  
  // ── CSS 变量 ──
  const customProps = Object.entries(tokens.customProperties);
  if (customProps.length > 0) {
    p(`## 3. CSS 自定义属性 (Design Tokens)`);
    p();
    p(`共发现 **${customProps.length}** 个 CSS 变量。`);
    p();
    
    // 分类展示
    const colorVars = customProps.filter(([, v]) => v.match(/^#[0-9a-fA-F]/) || v.match(/^rgb|^hsl/));
    const spacingVars = customProps.filter(([, v]) => v.match(/^\d+(?:px|rem|em)/));
    const fontVars = customProps.filter(([k]) => k.includes('font') || k.includes('text'));
    const shadowVars = customProps.filter(([k]) => k.includes('shadow'));
    const radiusVars = customProps.filter(([k]) => k.includes('radius') || k.includes('rounded'));
    const otherVars = customProps.filter(([k, v]) => 
      !colorVars.some(([ck]) => ck === k) && 
      !spacingVars.some(([sk]) => sk === k) &&
      !fontVars.some(([fk]) => fk === k) &&
      !shadowVars.some(([sk]) => sk === k) &&
      !radiusVars.some(([rk]) => rk === k)
    );
    
    if (colorVars.length > 0) {
      p(`### 颜色令牌 (${colorVars.length} 个)`);
      p();
      p(`| 变量名 | 值 |`);
      p(`|--------|-----|`);
      colorVars.slice(0, 30).forEach(([k, v]) => p(`| \`${k}\` | \`${v}\` |`));
      p();
    }
    
    if (spacingVars.length > 0) {
      p(`### 间距/尺寸令牌 (${spacingVars.length} 个)`);
      p();
      p(`| 变量名 | 值 |`);
      p(`|--------|-----|`);
      spacingVars.slice(0, 30).forEach(([k, v]) => p(`| \`${k}\` | \`${v}\` |`));
      p();
    }
    
    if (fontVars.length > 0) {
      p(`### 字体令牌 (${fontVars.length} 个)`);
      p();
      p(`| 变量名 | 值 |`);
      p(`|--------|-----|`);
      fontVars.slice(0, 20).forEach(([k, v]) => p(`| \`${k}\` | \`${v}\` |`));
      p();
    }
    
    if (shadowVars.length > 0) {
      p(`### 阴影令牌 (${shadowVars.length} 个)`);
      p();
      shadowVars.slice(0, 10).forEach(([k, v]) => p(`- \`${k}\`: \`${v}\``));
      p();
    }
    
    if (radiusVars.length > 0) {
      p(`### 圆角令牌 (${radiusVars.length} 个)`);
      p();
      radiusVars.slice(0, 10).forEach(([k, v]) => p(`- \`${k}\`: \`${v}\``));
      p();
    }
    
    if (otherVars.length > 0) {
      p(`### 其他令牌 (${otherVars.length} 个)`);
      p();
      p(`| 变量名 | 值 |`);
      p(`|--------|-----|`);
      otherVars.slice(0, 30).forEach(([k, v]) => p(`| \`${k}\` | \`${v}\` |`));
      p();
    }
  }
  
  // ── 颜色系统 ──
  p(`## 4. 颜色系统`);
  p();
  if (analysis.primaryColors.length > 0) {
    p(`**高频使用颜色（按出现次数排序）：**`);
    p();
    p(`| 颜色 | 出现次数 | 用途推断 |`);
    p(`|------|----------|----------|`);
    analysis.primaryColors.forEach(([color, count]) => {
      let usage = '';
      if (color === '#000000' || color === '#000') usage = '黑色/文字';
      else if (color === '#ffffff' || color === '#fff' || color === '#FFFFFF') usage = '白色/背景';
      else if (color.match(/^#[fF]{2,}/)) usage = '浅灰/背景';
      else if (color.match(/^#[0-3]/)) usage = '深色/文字';
      else usage = '品牌色/强调色';
      p(`| \`${color}\` | ${count}次 | ${usage} |`);
    });
    p();
  }
  
  if (analysis.topGradients.length > 0) {
    p(`**渐变：**`);
    p();
    analysis.topGradients.forEach(([grad, count]) => p(`- \`${grad.slice(0, 80)}...\` (${count}次)`));
    p();
  }
  
  // ── 排版系统 ──
  p(`## 5. 排版系统`);
  p();
  if (analysis.topFontFamilies.length > 0) {
    p(`**字体家族：**`);
    p();
    analysis.topFontFamilies.forEach(([ff, count]) => p(`- \`${ff}\` (${count}次)`));
    p();
  }
  
  if (analysis.mainFontSizes.length > 0) {
    p(`**字号阶梯：**`);
    p();
    p(`| 字号 | 出现次数 | 层级推断 |`);
    p(`|------|----------|----------|`);
    const sizes = analysis.mainFontSizes.map(([v, c]) => ({ val: parseFloat(v), raw: v, count: c }));
    sizes.sort((a, b) => a.val - b.val);
    sizes.forEach((s, i) => {
      let level = '';
      if (s.val >= 40) level = 'Display / Hero';
      else if (s.val >= 28) level = 'H1';
      else if (s.val >= 22) level = 'H2';
      else if (s.val >= 18) level = 'H3';
      else if (s.val >= 16) level = 'Body Large';
      else if (s.val >= 14) level = 'Body';
      else level = 'Caption / Small';
      p(`| \`${s.raw}\` | ${s.count}次 | ${level} |`);
    });
    p();
  }
  
  if (analysis.topFontWeights.length > 0) {
    p(`**字重：**`);
    p();
    analysis.topFontWeights.forEach(([w, c]) => p(`- \`${w}\` (${c}次)`));
    p();
  }
  
  if (analysis.topLineHeights.length > 0) {
    p(`**行高：**`);
    p();
    analysis.topLineHeights.forEach(([lh, c]) => p(`- \`${lh}\` (${c}次)`));
    p();
  }
  
  // ── 间距系统 ──
  p(`## 6. 间距系统`);
  p();
  if (analysis.is8ptGrid) p(`✅ 检测到 **8pt 网格系统**`);
  else if (analysis.is4ptGrid) p(`✅ 检测到 **4pt 网格系统**`);
  else p(`⚠️ 未检测到标准网格系统（非 4pt/8pt 倍数）`);
  p();
  
  if (analysis.mainSpacing.length > 0) {
    p(`**高频间距值：**`);
    p();
    p(`| 值 | 出现次数 | 用途推断 |`);
    p(`|-----|----------|----------|`);
    const sp = analysis.mainSpacing.map(([v, c]) => ({ val: parseFloat(v), raw: v, count: c }));
    sp.sort((a, b) => a.val - b.val);
    sp.forEach(s => {
      let usage = '';
      if (s.val <= 4) usage = '图标间距/微间距';
      else if (s.val <= 8) usage = '元素内间距';
      else if (s.val <= 16) usage = '组件间距';
      else if (s.val <= 24) usage = '区块间距';
      else if (s.val <= 48) usage = '段落/大区块间距';
      else usage = '页面级间距';
      p(`| \`${s.raw}\` | ${s.count}次 | ${usage} |`);
    });
    p();
  }
  
  // ── 圆角 & 阴影 ──
  p(`## 7. 圆角与阴影`);
  p();
  if (analysis.mainRadius.length > 0) {
    p(`**圆角值：**`);
    p();
    analysis.mainRadius.forEach(([r, c]) => p(`- \`${r}\` (${c}次)`));
    p();
  }
  
  if (analysis.mainShadows.length > 0) {
    p(`**阴影值：**`);
    p();
    analysis.mainShadows.forEach(([s, c]) => p(`- \`${s.slice(0, 100)}\` (${c}次)`));
    p();
  }
  
  // ── 响应式断点 ──
  if (analysis.mainBreakpoints.length > 0) {
    p(`## 8. 响应式断点`);
    p();
    p(`| 断点 | 出现次数 | 设备推断 |`);
    p(`|------|----------|----------|`);
    const bps = analysis.mainBreakpoints.map(([v, c]) => ({ val: parseFloat(v), raw: v, count: c }));
    bps.sort((a, b) => a.val - b.val);
    bps.forEach(bp => {
      let device = '';
      if (bp.val <= 480) device = '手机';
      else if (bp.val <= 768) device = '平板竖屏';
      else if (bp.val <= 1024) device = '平板横屏/小笔记本';
      else if (bp.val <= 1280) device = '笔记本';
      else device = '桌面';
      p(`| \`${bp.raw}\` | ${bp.count}次 | ${device} |`);
    });
    p();
  }
  
  // ── 动效 ──
  if (analysis.topTransitions.length > 0) {
    p(`## 9. 动效与过渡`);
    p();
    p(`**过渡效果：**`);
    p();
    analysis.topTransitions.forEach(([t, c]) => p(`- \`${t.slice(0, 80)}\` (${c}次)`));
    p();
  }
  
  // ── 总结 ──
  p(`## 10. 设计特征总结`);
  p();
  p(`### 可直接复用的设计决策`);
  p();
  
  // 主色
  const brandColors = analysis.primaryColors.filter(([c]) => 
    !c.match(/^#[fF]{2,}/) && !c.match(/^#[0-3]{3,6}$/) && c !== '#000' && c !== '#fff' && c !== '#000000' && c !== '#ffffff'
  );
  if (brandColors.length > 0) {
    p(`- **主色调:** ${brandColors.slice(0, 3).map(([c]) => `\`${c}\``).join(', ')}`);
  }
  
  // 字体
  if (analysis.topFontFamilies.length > 0) {
    p(`- **主字体:** \`${analysis.topFontFamilies[0][0]}\``);
  }
  
  // 间距系统
  p(`- **间距系统:** ${analysis.is8ptGrid ? '8pt 网格' : analysis.is4ptGrid ? '4pt 网格' : '非标准网格'}`);
  
  // 圆角风格
  if (analysis.mainRadius.length > 0) {
    const maxRadius = Math.max(...analysis.mainRadius.map(([r]) => parseFloat(r)));
    if (maxRadius >= 16) p(`- **圆角风格:** 大圆角（${maxRadius}px+），现代友好感`);
    else if (maxRadius >= 8) p(`- **圆角风格:** 中等圆角（${maxRadius}px），平衡`);
    else p(`- **圆角风格:** 小圆角/直角（${maxRadius}px），专业严谨`);
  }
  
  // 技术栈
  if (techStack.length > 0) {
    p(`- **技术栈:** ${techStack.join(' / ')}`);
  }
  
  p();
  p(`---`);
  
  // ── 像素级线框图 ──
  if (wireframeText) {
    p(`## 11. 像素级布局线框图`);
    p();
    p('```');
    p(wireframeText);
    p('```');
  }
  
  // ── 截图 ──
  if (screenshotResult) {
    p(`## 12. 页面截图`);
    p();
    p(`截图已保存至: \`${screenshotResult}\``);
    p();
    p(`使用此截图作为复刻时的视觉参照，对比最终产物与原站的视觉差异。`);
  }
  
  p(`---`);
  p(`*由 website-analyzer v3 自动生成 | ${date}*`);
  
  return lines.join('\n');
}

// ─── JSON 报告生成 ─────────────────────────────────────────────
function generateJSON(url, meta, techStack, tokens, analysis, cssSourceCount, cssTotalSize, htmlStructure, blueprint, colorRoles, skeleton, wireframeText) {
  return JSON.stringify({
    url,
    generatedAt: new Date().toISOString(),
    meta,
    techStack,
    stats: { cssSourceCount, cssTotalSizeKB: +(cssTotalSize/1024).toFixed(1) },
    htmlStructure: htmlStructure ? {
      nav: htmlStructure.nav,
      sections: htmlStructure.sections,
      detectedBlocks: htmlStructure.detectedBlocks,
      headingCounts: htmlStructure.headingCounts,
      headings: htmlStructure.headings,
      cards: htmlStructure.cards,
      images: { count: htmlStructure.images.count, hasLazyLoad: htmlStructure.images.hasLazyLoad, hasResponsiveImages: htmlStructure.images.hasResponsiveImages, sources: htmlStructure.images.sources },
      media: { svgs: htmlStructure.svgs.count, videos: htmlStructure.videos.count, iframes: htmlStructure.iframes.count, forms: htmlStructure.forms.count, tables: htmlStructure.tables.count, lists: htmlStructure.lists.count },
      contentType: htmlStructure.contentType,
      layoutPattern: htmlStructure.layoutPattern,
      wordCount: htmlStructure.wordCount,
    } : null,
    tokens: {
      customProperties: tokens.customProperties,
      colors: Object.fromEntries(tokens.colors),
      fontFamilies: Object.fromEntries(tokens.fontFamilies),
      fontSizes: Object.fromEntries(tokens.fontSizes),
      fontWeights: Object.fromEntries(tokens.fontWeights),
      lineHeights: Object.fromEntries(tokens.lineHeights),
      spacing: Object.fromEntries(tokens.spacing),
      borderRadius: Object.fromEntries(tokens.borderRadius),
      shadows: Object.fromEntries(tokens.shadows),
      transitions: Object.fromEntries(tokens.transitions),
      breakpoints: Object.fromEntries(tokens.breakpoints),
      gradients: Object.fromEntries(tokens.gradients),
    },
    analysis: {
      is4ptGrid: analysis.is4ptGrid,
      is8ptGrid: analysis.is8ptGrid,
      primaryColors: analysis.primaryColors,
      mainFontSizes: analysis.mainFontSizes,
      mainSpacing: analysis.mainSpacing,
      mainRadius: analysis.mainRadius,
      mainShadows: analysis.mainShadows,
      mainBreakpoints: analysis.mainBreakpoints,
    },
    blueprint: blueprint ? {
      quickCSS: blueprint.quickCSS,
      componentRecipes: blueprint.componentRecipes,
      steps: blueprint.steps,
    } : null,
    colorRoles: colorRoles || null,
    skeleton: skeleton || null,
    wireframe: wireframeText || null,
  }, null, 2);
}

// ─── 主流程 ────────────────────────────────────────────────────
async function main() {
  log(`分析目标: ${url}`);
  
  // 1. 获取 HTML
  log('获取 HTML...');
  const html = await safeFetch(url);
  if (!html) {
    console.error(`错误: 无法获取 ${url}`);
    process.exit(1);
  }
  log(`HTML 大小: ${(html.length/1024).toFixed(1)}KB`);
  
  // 2. 提取元信息
  const meta = extractMeta(html);
  const techStack = detectTechStack(html);
  log(`技术栈: ${techStack.join(', ') || '未检测到'}`);
  
  // 2.5 分析 HTML 结构
  log('分析 HTML 结构...');
  const htmlStructure = analyzeHTMLStructure(html);
  log(`内容类型: ${htmlStructure.contentType} | 布局: ${htmlStructure.layoutPattern}`);
  log(`导航项: ${htmlStructure.nav.items.length} | 图片: ${htmlStructure.images.count} | SVG: ${htmlStructure.svgs.count}`);
  
  // 2.6 截图（可选）
  let screenshotResult = null;
  if (screenshotPath) {
    screenshotResult = await captureScreenshot(url, screenshotPath);
  }
  
  // 3. 提取 CSS
  log('提取 CSS 源...');
  const cssUrls = extractStylesheetUrls(html, url);
  const inlineCSS = extractInlineStyles(html);
  log(`找到 ${cssUrls.length} 个外部样式表, ${(inlineCSS.length/1024).toFixed(1)}KB 内联样式`);
  
  // 4. 获取所有 CSS 文件
  const cssTexts = [];
  let cssTotalSize = inlineCSS.length;
  
  // 并行获取（限制并发 5）
  const batchSize = 5;
  for (let i = 0; i < cssUrls.length; i += batchSize) {
    const batch = cssUrls.slice(i, i + batchSize);
    const results = await Promise.all(batch.map(u => safeFetch(u)));
    results.forEach((css, idx) => {
      if (css) {
        cssTexts.push(css);
        cssTotalSize += css.length;
        log(`  ✓ ${batch[idx].slice(0, 60)}... (${(css.length/1024).toFixed(1)}KB)`);
      }
    });
  }
  
  const allCSS = [inlineCSS, ...cssTexts].join('\n');
  log(`CSS 总计: ${(allCSS.length/1024).toFixed(1)}KB`);
  
  // 5. 解析 CSS
  log('解析 CSS 令牌...');
  const tokens = parseCSS(allCSS);
  const analysis = analyzeTokens(tokens);
  
  // 5.5 复刻蓝图分析
  log('构建复刻蓝图...');
  const cssRules = extractCSSRules(allCSS);
  log(`提取到 ${cssRules.length} 条 CSS 规则`);
  const componentSpecs = classifyComponentRules(cssRules);
  const componentCounts = Object.entries(componentSpecs).filter(([,v]) => v.length > 0).map(([k,v]) => `${k}:${v.length}`).join(', ');
  log(`组件分类: ${componentCounts}`);
  
  // 5.5.1 反向查找：用 HTML 中实际出现的 class 名反查 CSS 精确规则
  log('反向查找 HTML class → CSS 精确规则...');
  const htmlClassNames = htmlStructure.cards.patterns
    .map(p => {
      const match = p.match(/^(\S+)/);
      return match ? match[1] : null;
    })
    .filter(Boolean)
    .slice(0, 20); // 取前 20 个高频 class 名
  const reverseLookup = reverseLookupClasses(htmlClassNames, cssRules);
  const lookupHits = Object.keys(reverseLookup).length;
  log(`反向查找命中: ${lookupHits}/${htmlClassNames.length} 个 class 名`);
  
  // 用反向查找结果覆盖组件配方（优先使用精确匹配）
  if (lookupHits > 0) {
    const typeLabels = {
      'item': '卡片容器', 'card': '卡片', 'wrap': '包装容器',
      'title': '标题', 'desc': '描述文字', 'thumb': '缩略图',
      'main': '主内容', 'top': '顶部区域', 'ico': '图标',
      'article': '文章卡片', 'post': '帖子卡片', 'entry': '列表项',
    };
    for (const [className, rules] of Object.entries(reverseLookup)) {
      const best = rules[0];
      const label = typeLabels[className] || className;
      const key = `class-${className}`;
      // 注入到组件规格中
      if (!componentSpecs[key]) {
        componentSpecs[key] = [{
          selector: best.selector,
          props: best.props,
          score: best.score || 0,
          _fromReverseLookup: true,
          _label: `${label}(.${className})`,
        }];
      }
    }
  }
  
  // 5.5.2 用 HTML 提取导航（不依赖 <nav> 标签）
  const htmlNavItems = extractNavFromHTML(html);
  if (htmlNavItems.length > 0) {
    log(`HTML 导航提取: ${htmlNavItems.join(', ')}`);
    htmlStructure.nav.items = htmlNavItems;
  }
  
  const colorRoles = inferColorRoles(tokens, analysis, allCSS);
  log(`色彩角色: primary=${colorRoles.primary || 'none'}, bg=${colorRoles.background || 'none'}, text=${colorRoles.textPrimary || 'none'}`);
  const skeleton = extractPageSkeleton(html, allCSS, htmlStructure);
  log(`骨架: layout=${skeleton.layoutType}, header=${skeleton.header.height || '?'}, sidebar=${skeleton.sidebar.width || '?'}`);
  const blueprint = buildReplicationBlueprint(htmlStructure, componentSpecs, colorRoles, skeleton, analysis, meta);
  log(`蓝图: ${Object.keys(blueprint.componentRecipes).length} 个组件配方, ${blueprint.steps.length} 个步骤`);
  
  // 5.6 生成 ASCII 像素线框图
  log('生成像素线框图...');
  const wireframeText = generateASCIIWireframe(htmlStructure, skeleton, analysis, meta);
  
  // 6. 生成报告
  log('生成报告...');
  const report = format === 'json'
    ? generateJSON(url, meta, techStack, tokens, analysis, cssUrls.length + 1, cssTotalSize, htmlStructure, blueprint, colorRoles, skeleton, wireframeText)
    : generateReport(url, meta, techStack, tokens, analysis, cssUrls.length + 1, cssTotalSize, htmlStructure, blueprint, componentSpecs, colorRoles, skeleton, wireframeText, screenshotResult);
  
  // 7. 输出
  if (outputPath) {
    const absPath = resolve(outputPath);
    writeFileSync(absPath, report, 'utf-8');
    console.log(`报告已写入: ${absPath}`);
  } else {
    console.log(report);
  }
}

main().catch(e => {
  console.error(`错误: ${e.message}`);
  process.exit(1);
});
