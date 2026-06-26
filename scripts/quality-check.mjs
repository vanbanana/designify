#!/usr/bin/env node
/**
 * quality-check.mjs — 前端代码质量自动扫描工具（零依赖）
 * 
 * 用法: node scripts/quality-check.mjs <target-dir> [options]
 * 
 * Options:
 *   --output <path>     输出文件路径（默认 stdout）
 *   --verbose           显示详细日志
 *   --ext <exts>        扫描扩展名（默认 "css,jsx"）
 * 
 * 零外部依赖：仅使用 Node.js 18+ 内置 API
 * 
 * 扫描检查项：
 *   1. 硬编码色值（非 CSS 变量的颜色值）
 *   2. 字号违规（正文 < 14px，辅助标签 < 12px）
 *   3. div/span onClick（非语义化交互）
 *   4. 占位内容（Lorem ipsum / John Doe 等）
 *   5. CSS 变量使用审计（硬编码色值/间距）
 */

// ─── CLI 参数解析 ──────────────────────────────────────────────
const args = process.argv.slice(2);
const targetDir = args.find(a => !a.startsWith('--') && !args[args.indexOf(a) - 1]?.startsWith('--'));
const outputFlag = args.indexOf('--output');
const outputPath = outputFlag !== -1 ? args[outputFlag + 1] : null;
const verbose = args.includes('--verbose');
const extFlag = args.indexOf('--ext');
const scanExts = extFlag !== -1 ? args[extFlag + 1].split(',').map(s => s.trim()) : ['css', 'jsx'];

if (!targetDir) {
  console.error(`
  quality-check — 前端代码质量自动扫描工具（零依赖）

  用法: node scripts/quality-check.mjs <target-dir> [--output <path>] [--verbose] [--ext "css,jsx"]

  示例:
    node scripts/quality-check.mjs ./output
    node scripts/quality-check.mjs ./src --output quality-report.md
    node scripts/quality-check.mjs ./src --ext "css,jsx" --verbose
  `);
  process.exit(1);
}

// ─── 工具函数 ──────────────────────────────────────────────────
function log(...msgs) { if (verbose) console.error('[quality-check]', ...msgs); }

import { readFileSync, writeFileSync, statSync, readdirSync, existsSync } from 'node:fs';
import { resolve, relative, extname, join, sep } from 'node:path';

// ─── 文件扫描 ──────────────────────────────────────────────────
const targetPath = resolve(targetDir);

function scanFiles(dir, exts) {
  const results = [];
  try {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = join(dir, entry.name);
      if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
        results.push(...scanFiles(fullPath, exts));
      } else if (entry.isFile()) {
        const ext = extname(entry.name).replace('.', '');
        if (exts.includes(ext)) {
          results.push(fullPath);
        }
      }
    }
  } catch (err) {
    log(`跳过目录 ${dir}: ${err.message}`);
  }
  return results;
}

// ─── 检查规则 ──────────────────────────────────────────────────

// 1. 硬编码色值检测
// 匹配 CSS 中的颜色值，排除 CSS 变量引用和 :root 定义
const HARDCODED_COLOR_RE = /(?:color|background(?:-color)?|border(?:-(?:top|right|bottom|left))?-color|outline-color|fill|stroke)\s*:\s*(#[0-9a-fA-F]{3,8}|rgba?\s*\([^)]+\)|hsla?\s*\([^)]+\))/g;
const CSS_VAR_REF_RE = /var\(--/;
const ROOT_DEF_RE = /:root\s*\{/;
const IGNORED_COLORS = ['transparent', 'currentColor', 'inherit', 'initial', 'unset'];

function checkHardcodedColors(content, filePath, lines) {
  const violations = [];
  const linesArr = content.split('\n');
  let inRootBlock = false;

  for (let i = 0; i < linesArr.length; i++) {
    const line = linesArr[i];
    const lineNum = i + 1;

    // Track :root blocks — skip variable definitions
    if (ROOT_DEF_RE.test(line)) { inRootBlock = true; continue; }
    if (inRootBlock && /\}\s*$/.test(line.trim())) { inRootBlock = false; continue; }
    if (inRootBlock && line.includes('--')) continue;

    const matches = line.matchAll(HARDCODED_COLOR_RE);
    for (const m of matches) {
      const colorVal = m[1].toLowerCase().trim();
      if (IGNORED_COLORS.includes(colorVal)) continue;
      if (CSS_VAR_REF_RE.test(colorVal)) continue;
      // Skip if it's a CSS variable assignment (--var-name: color)
      if (line.trimStart().startsWith('--')) continue;
      violations.push({
        file: relative(process.cwd(), filePath),
        line: lineNum,
        type: '硬编码色值',
        value: m[1],
        suggestion: `使用 CSS 变量替代: var(--color-xxx)`,
        context: line.trim()
      });
    }
  }
  return violations;
}

// 2. 字号违规检测
const FONT_SIZE_RE = /font-size\s*:\s*(\d+)px/g;
const COMMENT_RE = /\/\*.*?\*\//g;

function checkFontSizes(content, filePath, lines) {
  const violations = [];
  const linesArr = content.split('\n');

  for (let i = 0; i < linesArr.length; i++) {
    const line = linesArr[i];
    const lineNum = i + 1;

    const matches = line.matchAll(FONT_SIZE_RE);
    for (const m of matches) {
      const size = parseInt(m[1], 10);
      const hasLabelComment = COMMENT_RE.test(line) && /label|辅助|标签|caption|footnote|时间戳|timestamp/i.test(line);

      if (size < 12) {
        violations.push({
          file: relative(process.cwd(), filePath),
          line: lineNum,
          type: '字号违规（违规）',
          value: `${size}px`,
          suggestion: `最小字号为 12px，${size}px 不可读`,
          context: line.trim()
        });
      } else if (size < 14 && !hasLabelComment) {
        violations.push({
          file: relative(process.cwd(), filePath),
          line: lineNum,
          type: '字号违规（正文级）',
          value: `${size}px`,
          suggestion: `正文/表单最小 14px。若为辅助标签，请添加注释: /* label */`,
          context: line.trim()
        });
      }
    }
  }
  return violations;
}

// 3. div/span onClick 检测
const DIV_ONCLICK_RE = /<div\s[^>]*?onClick\s*=/gi;
const SPAN_ONCLICK_RE = /<span\s[^>]*?onClick\s*=/gi;

function checkNonSemanticClickHandlers(content, filePath, lines) {
  const violations = [];
  const linesArr = content.split('\n');

  for (let i = 0; i < linesArr.length; i++) {
    const line = linesArr[i];
    const lineNum = i + 1;

    let m;
    DIV_ONCLICK_RE.lastIndex = 0;
    SPAN_ONCLICK_RE.lastIndex = 0;

    while ((m = DIV_ONCLICK_RE.exec(line)) !== null) {
      violations.push({
        file: relative(process.cwd(), filePath),
        line: lineNum,
        type: 'div onClick',
        value: 'div onClick',
        suggestion: '改用 <button> 或添加 role="button" tabIndex={0} onKeyDown={handleKeyDown}',
        context: line.trim()
      });
    }
    while ((m = SPAN_ONCLICK_RE.exec(line)) !== null) {
      violations.push({
        file: relative(process.cwd(), filePath),
        line: lineNum,
        type: 'span onClick',
        value: 'span onClick',
        suggestion: '改用 <button> 或添加 role="button" tabIndex={0} onKeyDown={handleKeyDown}',
        context: line.trim()
      });
    }
  }
  return violations;
}

// 4. 占位内容检测
const PLACEHOLDER_PATTERNS = [
  { pattern: /Lorem\s*ipsum/i, label: 'Lorem ipsum' },
  { pattern: /John\s*Doe/i, label: 'John Doe' },
  { pattern: /Acme\s*Corp/i, label: 'Acme Corp' },
  { pattern: /待补充/i, label: '待补充' },
  { pattern: /TBD/i, label: 'TBD' },
  { pattern: /TODO/i, label: 'TODO' },
  { pattern: /\[待补充\]/i, label: '[待补充]' },
  { pattern: /lorem\d*@/i, label: '占位邮箱' },
];

function checkPlaceholderContent(content, filePath, lines) {
  const violations = [];
  const linesArr = content.split('\n');

  for (let i = 0; i < linesArr.length; i++) {
    const line = linesArr[i];
    const lineNum = i + 1;

    // Skip comment-only lines
    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) continue;

    for (const { pattern, label } of PLACEHOLDER_PATTERNS) {
      if (pattern.test(line)) {
        violations.push({
          file: relative(process.cwd(), filePath),
          line: lineNum,
          type: '占位内容',
          value: label,
          suggestion: '替换为真实业务内容',
          context: line.trim()
        });
        break; // One violation per line max
      }
    }
  }
  return violations;
}

// 6. 原生浏览器 UI 组件检测（未主题化的 select/checkbox/alert/scrollbar）
const NATIVE_UI_PATTERNS = [
  // 检测 window.alert / confirm / prompt（浏览器原生弹窗）
  { pattern: /window\.alert\s*\(/gi, label: 'window.alert', suggestion: '替换为自定义 Toast/Modal 组件' },
  { pattern: /window\.confirm\s*\(/gi, label: 'window.confirm', suggestion: '替换为自定义 ConfirmDialog 组件' },
  { pattern: /window\.prompt\s*\(/gi, label: 'window.prompt', suggestion: '替换为自定义 Modal 输入组件' },
  // 检测未被自定义的 <select>（无 appearance 声明）
  { pattern: /<select[^>]*>(?![^]*appearance)/gis, label: '原生 select', suggestion: '添加 appearance: none + 自定义箭头' },
  // 检测原生 alert 函数调用
  { pattern: /alert\s*\(['"`]/gi, label: 'alert() 弹窗', suggestion: '替换为自定义 Toast 组件' },
  { pattern: /confirm\s*\(['"`]/gi, label: 'confirm() 弹窗', suggestion: '替换为自定义 ConfirmDialog 组件' },
];

function checkNativeUI(content, filePath, lines) {
  const violations = [];
  const linesArr = content.split('\n');

  for (let i = 0; i < linesArr.length; i++) {
    const line = linesArr[i];
    const lineNum = i + 1;
    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) continue;

    for (const { pattern, label, suggestion } of NATIVE_UI_PATTERNS) {
      pattern.lastIndex = 0;
      if (pattern.test(line)) {
        violations.push({
          file: relative(process.cwd(), filePath),
          line: lineNum,
          type: '原生 UI 组件',
          value: label,
          suggestion: suggestion,
          context: line.trim()
        });
        break;
      }
    }
  }
  return violations;
}
const CSS_COLOR_VALUE_RE = /(?:#[0-9a-fA-F]{3,8}|rgba?\s*\([^)]+\)|hsla?\s*\([^)]+\))/g;
const CSS_VAR_DEF_RE = /--[\w-]+\s*:/g;

function auditCSSVariableUsage(content, filePath, lines) {
  const violations = [];
  const linesArr = content.split('\n');

  // Collect CSS variable definitions
  const definedVars = new Set();
  for (const line of linesArr) {
    const matches = line.matchAll(CSS_VAR_DEF_RE);
    for (const m of matches) {
      definedVars.add(m[0].replace(':', '').trim());
    }
  }

  if (definedVars.size === 0) return violations;

  // Check for hardcoded color values that could use a variable
  for (let i = 0; i < linesArr.length; i++) {
    const line = linesArr[i];
    const lineNum = i + 1;
    const trimmed = line.trim();

    // Skip variable definitions, comments, :root block
    if (trimmed.startsWith('--')) continue;
    if (trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('//')) continue;
    if (trimmed.startsWith(':root')) continue;
    if (trimmed.includes('var(--')) continue;
    if (trimmed.includes('transparent') || trimmed.includes('currentColor')) continue;

    // Check for hardcoded colors in property values
    const propColorMatch = line.match(/(?:color|background|border|outline|fill|stroke)\s*:\s*([^;]+)/i);
    if (propColorMatch) {
      const val = propColorMatch[1].trim();
      if (CSS_COLOR_VALUE_RE.test(val) && !val.startsWith('--') && !val.startsWith('var(')) {
        violations.push({
          file: relative(process.cwd(), filePath),
          line: lineNum,
          type: 'CSS 变量审计',
          value: val,
          suggestion: `已有变量定义，建议使用 var(--xxx) 替代硬编码 ${val}`,
          context: line.trim()
        });
      }
    }
  }
  return violations;
}

// ─── 主扫描流程 ────────────────────────────────────────────────
log(`扫描目录: ${targetPath}`);
log(`扫描扩展名: ${scanExts.join(', ')}`);

const files = scanFiles(targetPath, scanExts);
log(`找到 ${files.length} 个文件`);

const allViolations = [];
const fileStats = { css: 0, jsx: 0 };

for (const file of files) {
  const ext = extname(file).replace('.', '');
  if (ext === 'css') fileStats.css++;
  if (ext === 'jsx') fileStats.jsx++;

  const content = readFileSync(file, 'utf-8');
  const lines = content.length;

  allViolations.push(
    ...checkHardcodedColors(content, file, lines),
    ...checkFontSizes(content, file, lines),
    ...checkNonSemanticClickHandlers(content, file, lines),
    ...checkPlaceholderContent(content, file, lines),
    ...checkNativeUI(content, file, lines),
  );

  // CSS 变量审计只对 CSS 文件执行
  if (ext === 'css') {
    allViolations.push(...auditCSSVariableUsage(content, file, lines));
  }

  log(`  扫描 ${relative(process.cwd(), file)} (${lines} 字符)`);
}

// ─── 分类统计 ──────────────────────────────────────────────────
const byType = {};
for (const v of allViolations) {
  if (!byType[v.type]) byType[v.type] = [];
  byType[v.type].push(v);
}

// ─── 生成报告 ──────────────────────────────────────────────────
function escapeMd(text) {
  return text.replace(/[|\\]/g, '\\$&');
}

function generateReport() {
  const totalFiles = files.length;
  const totalViolations = allViolations.length;
  const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

  let report = `# Quality Scan Report

> 自动生成：${now}
> 扫描目录：\`${targetDir}\`
> 扫描文件：${fileStats.css} CSS + ${fileStats.jsx} JSX = ${totalFiles} 个

---

## 扫描概览

| 检查项 | 违规数 | 状态 |
|--------|--------|------|
| 硬编码色值 | ${byType['硬编码色值']?.length || 0} | ${(byType['硬编码色值']?.length || 0) === 0 ? '✅ 通过' : '❌ ' + byType['硬编码色值'].length + ' 处违规'} |
| 字号违规 | ${(byType['字号违规（违规）']?.length || 0) + (byType['字号违规（正文级）']?.length || 0)} | ${((byType['字号违规（违规）']?.length || 0) + (byType['字号违规（正文级）']?.length || 0)) === 0 ? '✅ 通过' : '❌ 需修复'} |
| div/span onClick | ${(byType['div onClick']?.length || 0) + (byType['span onClick']?.length || 0)} | ${((byType['div onClick']?.length || 0) + (byType['span onClick']?.length || 0)) === 0 ? '✅ 通过' : '❌ 需修复'} |
| 占位内容 | ${byType['占位内容']?.length || 0} | ${(byType['占位内容']?.length || 0) === 0 ? '✅ 通过' : '❌ ' + byType['占位内容'].length + ' 处违规'} |
| CSS 变量审计 | ${byType['CSS 变量审计']?.length || 0} | ${(byType['CSS 变量审计']?.length || 0) === 0 ? '✅ 通过' : '❌ ' + byType['CSS 变量审计'].length + ' 处可优化'} |
| 原生 UI 组件 | ${byType['原生 UI 组件']?.length || 0} | ${(byType['原生 UI 组件']?.length || 0) === 0 ? '✅ 通过' : '❌ ' + byType['原生 UI 组件'].length + ' 处违规'} |

**总计：${totalViolations} 处问题** ${totalViolations === 0 ? '🎉 全部通过！' : '（需修复后重新扫描）'}

---

`;

  if (totalViolations === 0) {
    report += `## ✅ 所有检查通过

未发现任何代码质量问题。扫描全部通过。

`;
    return report;
  }

  // ─── 硬编码色值 ───
  if (byType['硬编码色值']?.length > 0) {
    report += `## 1. 硬编码色值（${byType['硬编码色值'].length} 处）

> 所有颜色值应使用 CSS 变量。硬编码色值降低可维护性。

| 文件 | 行号 | 色值 | 代码片段 | 建议 |
|------|------|------|----------|------|
`;
    for (const v of byType['硬编码色值']) {
      report += `| \`${v.file}\` | ${v.line} | \`${escapeMd(v.value)}\` | \`${escapeMd(v.context.slice(0, 50))}\` | ${escapeMd(v.suggestion)} |\n`;
    }
    report += '\n---\n\n';
  }

  // ─── 字号违规 ───
  const fontViolations = [...(byType['字号违规（违规）'] || []), ...(byType['字号违规（正文级）'] || [])];
  if (fontViolations.length > 0) {
    report += `## 2. 字号违规（${fontViolations.length} 处）

> 正文/表单最小 14px，辅助标签可 12px（需注释说明），装饰性小字 12px 需高对比度或加粗。
> 按类型列出详细证据：

| 文件 | 行号 | 字号 | 类型 | 代码片段 | 建议 |
|------|------|------|------|----------|------|
`;
    for (const v of fontViolations) {
      const typeLabel = v.type === '字号违规（违规）' ? '❌ 违规' : '⚠️ 正文级';
      report += `| \`${v.file}\` | ${v.line} | ${v.value} | ${typeLabel} | \`${escapeMd(v.context.slice(0, 50))}\` | ${escapeMd(v.suggestion)} |\n`;
    }
    report += '\n---\n\n';
  }

  // ─── div/span onClick ───
  const clickViolations = [...(byType['div onClick'] || []), ...(byType['span onClick'] || [])];
  if (clickViolations.length > 0) {
    report += `## 3. 非语义化点击处理（${clickViolations.length} 处）

> \`<div onClick>\`/\`<span onClick>\` 违反 WCAG 无障碍标准，应改为 \`<button>\` 或辅助 role。

| 文件 | 行号 | 类型 | 代码片段 | 建议 |
|------|------|------|----------|------|
`;
    for (const v of clickViolations) {
      report += `| \`${v.file}\` | ${v.line} | ${v.value} | \`${escapeMd(v.context.slice(0, 50))}\` | ${escapeMd(v.suggestion)} |\n`;
    }
    report += '\n---\n\n';
  }

  // ─── 占位内容 ───
  if (byType['占位内容']?.length > 0) {
    report += `## 4. 占位内容（${byType['占位内容'].length} 处）

> 禁止使用 Lorem ipsum、John Doe 等占位内容。必须替换为真实业务内容。

| 文件 | 行号 | 类型 | 代码片段 | 建议 |
|------|------|------|----------|------|
`;
    for (const v of byType['占位内容']) {
      report += `| \`${v.file}\` | ${v.line} | ${v.value} | \`${escapeMd(v.context.slice(0, 50))}\` | ${escapeMd(v.suggestion)} |\n`;
    }
    report += '\n---\n\n';
  }

  // ─── CSS 变量审计 ───
  if (byType['CSS 变量审计']?.length > 0) {
    report += `## 5. CSS 变量使用审计（${byType['CSS 变量审计'].length} 处可优化）

> 检测到 CSS 中已有变量定义，但部分属性仍使用硬编码值。

| 文件 | 行号 | 值 | 代码片段 | 建议 |
|------|------|-----|----------|------|
`;
    for (const v of byType['CSS 变量审计']) {
      report += `| \`${v.file}\` | ${v.line} | \`${escapeMd(v.value)}\` | \`${escapeMd(v.context.slice(0, 50))}\` | ${escapeMd(v.suggestion)} |\n`;
    }
    report += '\n---\n\n';
  }

  // ─── 原生 UI 组件 ───
  if (byType['原生 UI 组件']?.length > 0) {
    report += `## 6. 原生 UI 组件（${byType['原生 UI 组件'].length} 处）

> 浏览器原生提示窗（alert/confirm/prompt）和未自定义的表单控件必须替换为与主题一致的组件。

| 文件 | 行号 | 类型 | 代码片段 | 建议 |
|------|------|------|----------|------|
`;
    for (const v of byType['原生 UI 组件']) {
      report += `| \`${v.file}\` | ${v.line} | ${v.value} | \`${escapeMd(v.context.slice(0, 50))}\` | ${escapeMd(v.suggestion)} |\n`;
    }
    report += '\n---\n\n';
  }

  return report;
}

const report = generateReport();

// ─── 输出 ───────────────────────────────────────────────────────
if (outputPath) {
  const outResolved = resolve(outputPath);
  writeFileSync(outResolved, report, 'utf-8');
  console.log(`✅ 质量报告已写入 ${outResolved}`);
  console.log(`   扫描文件: ${fileStats.css} CSS + ${fileStats.jsx} JSX = ${files.length} 个`);
  console.log(`   发现问题: ${allViolations.length} 处（${Object.keys(byType).length} 类）`);
} else {
  console.log(report);
}

// ─── 退出码 ──────────────────────────────────────────────────
process.exit(allViolations.length > 0 ? 1 : 0);