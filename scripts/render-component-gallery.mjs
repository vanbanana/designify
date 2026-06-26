#!/usr/bin/env node
/**
 * render-component-gallery.mjs — 组件状态画廊渲染器
 * 
 * 用法: node scripts/render-component-gallery.mjs <project-dir> [options]
 * 
 * Options:
 *   --output <path>     输出 HTML 路径（默认 output/component-gallery.html）
 *   --css <path>        额外 CSS 文件路径（自动检测项目样式） 
 *   --open              生成后自动打开浏览器
 * 
 * 功能：
 *   1. 扫描 docs/components/*.md 提取所有 ```html preview 代码块
 *   2. 扫描项目 CSS 文件提取样式
 *   3. 将所有组件状态渲染为一个 HTML 页面
 *   4. 按组件分组，每组内展示所有状态
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'node:fs';
import { resolve, relative, extname, join, sep } from 'node:path';

// ─── CLI ──────────────────────────────────────────────────────
const args = process.argv.slice(2);
const targetDir = args.find(a => !a.startsWith('--'));
const outputFlag = args.indexOf('--output');
const outputPath = outputFlag !== -1 ? args[outputFlag + 1] : resolve(process.cwd(), 'output/component-gallery.html');
const cssFlag = args.indexOf('--css');
const extraCssPath = cssFlag !== -1 ? args[cssFlag + 1] : null;
const openBrowser = args.includes('--open');

if (!targetDir) {
  console.error(`
  render-component-gallery — 组件状态画廊渲染器

  用法: node scripts/render-component-gallery.mjs <project-dir> [options]

  示例:
    node scripts/render-component-gallery.mjs ./src
    node scripts/render-component-gallery.mjs . --open
    node scripts/render-component-gallery.mjs . --output preview.html
  `);
  process.exit(1);
}

// ─── 扫描组件文档 ──────────────────────────────────────────────
const docsDir = resolve(targetDir, 'docs/components');
const components = [];

if (existsSync(docsDir)) {
  const files = readdirSync(docsDir, { encoding: 'utf-8' });
  for (const file of files) {
    if (!file.endsWith('.md') || file === 'README.md' || file === 'index.md') continue;

    const filePath = join(docsDir, file);
    const content = readFileSync(filePath, 'utf-8');

    // 提取组件名（从 frontmatter 或第一个 # 标题）
    let componentName = file.replace('.md', '');
    const frontmatterMatch = content.match(/^---\s*\n[\s\S]*?^---\s*\n/m);
    if (frontmatterMatch) {
      const fm = frontmatterMatch[0];
      const nameMatch = fm.match(/component:\s*(.+)/);
      if (nameMatch) componentName = nameMatch[1].trim();
    }

    // 提取状态代码块
    const stateRegex = /###\s+(.+)\n\s*```html\s*preview\s*\n([\s\S]*?)```/g;
    let stateMatch;
    const states = [];
    while ((stateMatch = stateRegex.exec(content)) !== null) {
      const stateName = stateMatch[1].trim();
      const code = stateMatch[2].trim();
      if (code) {
        states.push({ name: stateName, code });
      }
    }

    if (states.length > 0) {
      components.push({ name: componentName, states });
    }
  }
} else {
  console.error(`警告: 未找到组件文档目录 ${docsDir}`);
  console.error(`请先运行 Phase 5 Step 6.5 生成组件文档后再运行此脚本`);
  process.exit(1);
}

if (components.length === 0) {
  console.error('未在任何组件文档中找到状态代码块（```html preview）');
  console.error('请确保组件文档使用 ```html preview 标记状态示例');
  process.exit(1);
}

// ─── 收集项目样式 ──────────────────────────────────────────────
let projectCss = '';
const cssFiles = [];

function collectCss(dir) {
  if (!existsSync(dir)) return;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
      collectCss(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith('.css') || entry.name.endsWith('.module.css'))) {
      cssFiles.push(fullPath);
    }
  }
}

collectCss(resolve(targetDir));
if (extraCssPath && existsSync(resolve(targetDir, extraCssPath))) {
  cssFiles.push(resolve(targetDir, extraCssPath));
}

for (const cssFile of cssFiles) {
  try {
    const css = readFileSync(cssFile, 'utf-8');
    projectCss += `\n/* ${relative(process.cwd(), cssFile)} */\n${css}`;
  } catch {}
}

// 也尝试读取 design-tokens.css
const tokensPath = resolve(process.cwd(), 'output/design-tokens.css');
if (existsSync(tokensPath)) {
  projectCss += `\n/* output/design-tokens.css */\n${readFileSync(tokensPath, 'utf-8')}`;
}

// ─── 生成 HTML ─────────────────────────────────────────────────
const galleryTitle = `Component Gallery — ${components.length} 个组件 · ${components.reduce((s, c) => s + c.states.length, 0)} 个状态`;

const stateBg = {
  default: '#ffffff',
  loading: '#f8fafc',
  empty: '#fff7ed',
  error: '#fef2f2',
  disabled: '#f9fafb',
  hover: '#f0f9ff',
  focus: '#f0fdf4',
  active: '#f5f3ff',
  edge: '#fefce8',
};

function stateBadgeClass(name) {
  const n = name.toLowerCase();
  if (n.includes('error') || n.includes('invalid')) return 'badge-error';
  if (n.includes('loading') || n.includes('empty')) return 'badge-warning';
  if (n.includes('disabled')) return 'badge-neutral';
  if (n.includes('hover') || n.includes('focus') || n.includes('active')) return 'badge-info';
  return 'badge-default';
}

let html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${galleryTitle}</title>
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans SC", sans-serif;
    background: #f1f5f9;
    color: #1e293b;
    padding: 32px;
  }
  h1 {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 8px;
    color: #0f172a;
  }
  .subtitle {
    font-size: 14px;
    color: #64748b;
    margin-bottom: 32px;
  }
  .component-group {
    margin-bottom: 48px;
  }
  .component-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #e2e8f0;
  }
  .component-name {
    font-size: 20px;
    font-weight: 600;
  }
  .component-count {
    font-size: 13px;
    color: #64748b;
    background: #e2e8f0;
    padding: 2px 10px;
    border-radius: 12px;
  }
  .state-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 16px;
  }
  .state-card {
    background: #fff;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    overflow: hidden;
    transition: box-shadow 0.2s;
  }
  .state-card:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  }
  .state-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 14px;
    border-bottom: 1px solid #f1f5f9;
  }
  .state-name {
    font-size: 13px;
    font-weight: 600;
    text-transform: capitalize;
  }
  .badge {
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 6px;
    font-weight: 500;
  }
  .badge-error { background: #fee2e2; color: #991b1b; }
  .badge-warning { background: #fef3c7; color: #92400e; }
  .badge-neutral { background: #f1f5f9; color: #475569; }
  .badge-info { background: #dbeafe; color: #1e40af; }
  .badge-default { background: #f0fdf4; color: #166534; }
  .state-preview {
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
  }
  .state-preview[data-state] { background: var(--state-bg); }
  .empty-hint {
    color: #94a3b8;
    font-size: 13px;
    text-align: center;
  }
  .footer {
    margin-top: 48px;
    padding-top: 16px;
    border-top: 1px solid #e2e8f0;
    font-size: 12px;
    color: #94a3b8;
    text-align: center;
  }
  ${projectCss}
</style>
</head>
<body>
<h1>${galleryTitle}</h1>
<p class="subtitle">生成时间: ${new Date().toLocaleString('zh-CN')}</p>
`;

for (const comp of components) {
  html += `<div class="component-group">
<div class="component-header">
  <span class="component-name">${comp.name}</span>
  <span class="component-count">${comp.states.length} 个状态</span>
</div>
<div class="state-grid">`;

  for (const state of comp.states) {
    const bg = stateBg[state.name.toLowerCase()] || '#ffffff';
    const badgeClass = stateBadgeClass(state.name);
    html += `<div class="state-card">
<div class="state-header">
  <span class="state-name">${state.name}</span>
  <span class="badge ${badgeClass}">${state.name.toLowerCase()}</span>
</div>
<div class="state-preview" data-state="${state.name.toLowerCase()}" style="--state-bg: ${bg}">
${state.code}
</div>
</div>`;
  }

  html += `</div></div>`;
}

html += `<div class="footer">Generated by designify render-component-gallery.mjs</div>
</body>
</html>`;

// ─── 写入文件 ──────────────────────────────────────────────────
const outResolved = resolve(outputPath);
const outDir = outResolved.substring(0, outResolved.lastIndexOf(sep));
if (!existsSync(outDir)) {
  mkdirSync(outDir, { recursive: true }); // existsSync already imported
}

writeFileSync(outResolved, html, 'utf-8');
console.log(`✅ 组件画廊已生成: ${outResolved}`);
console.log(`   组件: ${components.length} 个`);
console.log(`   状态: ${components.reduce((s, c) => s + c.states.length, 0)} 个`);

if (openBrowser) {
  import('node:child_process').then(cp => {
    const { execSync } = cp;
    try {
      if (process.platform === 'win32') {
        execSync(`start "" "${outResolved}"`);
      } else if (process.platform === 'darwin') {
        execSync(`open "${outResolved}"`);
      } else {
        execSync(`xdg-open "${outResolved}"`);
      }
    } catch {}
  });
}