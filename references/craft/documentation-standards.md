# Documentation Standards — 项目文档体系

> **何时加载：** Phase 7/8 文档生成阶段。所有项目必须加载。
> **参考标准：** Google JS Style Guide、Shopify Polaris、Diátaxis 四象限文档模型、ADR 规范。

---

## 文档目录结构

每个生成的项目根目录下必须创建 `docs/` 目录：

```
docs/
├── README.md                    ← 文档总索引（agent 和人类的第一站）
├── CHANGELOG.md                 ← 变更记录（追加，时间戳）
├── api-contract.md              ← API 契约（见 api-contract-standards.md）
├── architecture/
│   ├── OVERVIEW.md              ← 项目架构概览（技术栈/目录结构/关键决策）
│   └── decisions/
│       └── 001-use-react-router.md  ← ADR（一个决策一个文件，不可变）
├── components/
│   ├── README.md                ← 组件文档索引
│   ├── button.md                ← 每个组件一个文件（含状态预览）
│   └── card.md
├── deployment.md                ← 部署指南
├── design-tokens.md             ← 设计令牌参考（CSS 变量清单）
└── mock-api.md                  ← Mock API 文档（如需）
```

**业务相关文档放入 `docs/`，设计相关产物放入 `output/`，两者不混。** 代码产物在项目根目录。

---

## 文档生命周期规则

### 追加 vs 新开

| 文档 | 模式 | 规则 |
|------|------|------|
| `CHANGELOG.md` | **追加** | 最新条目插入文件顶部，带 `## YYYY-MM-DD` 时间戳 |
| `api-contract.md` | **覆盖** | 版本号递增：`version: 1.0.0 → 1.1.0` |
| `architecture/decisions/*.md` | **新开** | 永不修改已有 ADR。新决策 = 新文件 `002-title.md` |
| `components/*.md` | **覆盖** | 组件更新时重写对应文件 |
| `docs/README.md` | **覆盖** | 项目文档结构变化时更新索引 |

### 时间戳规则

```
CHANGELOG.md:  每个条目以 ## YYYY-MM-DD 开头
api-contract.md: 文件头 version: x.y.z + updated: YYYY-MM-DD
ADR: 文件名 001-title.md，文件内 date: YYYY-MM-DD
components/*.md: 文件头 updated: YYYY-MM-DD
```

### ADR（Architecture Decision Record）格式

每个 ADR 是一条一文件的不可变记录：

```markdown
# 1. 使用 React Router 进行前端路由

**date:** 2026-06-26
**status:** accepted

## 背景
项目包含 4 个页面，需要客户端路由导航。

## 决策
使用 React Router v7 的 createBrowserRouter。

## 理由
- 项目基于 React，React Router 是社区标准
- v7 支持加载器（loader）模式，适合数据预取
- 团队成员熟悉

## 后果
- 需要安装 react-router-dom
- 路由配置集中在 routes/ 目录
- 如果用 React Router，则不需要 next/router
```

**ADR 规则：**
- 一条 ADR = 一个文件，文件名 `NNN-title-with-hyphens.md`
- 永不修改已有 ADR（即使决策错了，也另开一条标记 superseded by NNN）
- status 可选：`proposed` / `accepted` / `deprecated` / `superseded`

---

## Agent 发现入口（docs/README.md）

每个项目的 `docs/README.md` 必须包含以下结构：

```markdown
# [项目名] 文档

> **项目状态：** active development
> **最新版本：** v1.0.0
> **最后更新：** 2026-06-26

## 快速开始

[2-3 行项目简介]

## 文档索引

| 文档 | 说明 |
|------|------|
| [API Contract](./api-contract.md) | 后端接口定义与字段映射 |
| [Components](./components/) | 组件文档与状态预览 |
| [Architecture](./architecture/OVERVIEW.md) | 项目架构与决策记录 |
| [Design Tokens](./design-tokens.md) | CSS 变量与设计令牌 |
| [Deployment](./deployment.md) | 部署指南与环境配置 |
| [Mock API](./mock-api.md) | Mock 服务使用方式 |
| [Changelog](./CHANGELOG.md) | 变更历史 |

## 技术栈

- **框架：** [React/Next.js/Vue/单文件 HTML]
- **样式：** [Tailwind/CSS Modules/styled-components]
- **构建：** [Vite/Webpack/无]
- **包管理：** [npm/pnpm/yarn]

## 组件索引（components/README.md）

```
# Components

| 组件 | 状态 | 状态覆盖 | 文档 |
|------|------|----------|------|
| Button | ready | default, loading, disabled, hover, edge | [文档](./button.md) |
| Card | ready | default, loading, empty, error, edge | [文档](./card.md) |
| Header | beta | default | [文档](./header.md) |
```
```

---

## 交付清单

Phase 8 完成后，检查以下文档是否全部生成：

```
docs/ 目录交付检查：
- [ ] docs/README.md（文档总索引）
- [ ] CHANGELOG.md（变更记录）
- [ ] api-contract.md（API 契约 + 🟢/🟡/🔴 校验）
- [ ] architecture/OVERVIEW.md（项目架构概述）
- [ ] components/（至少包括核心组件的状态预览文档）
- [ ] deployment.md（部署指南）

如需：
- [ ] architecture/decisions/（关键决策的 ADR）
- [ ] mock-api.js + docs/mock-api.md（Mock API）
```

---

## 铁律

```
铁律: 每个项目必须有 docs/README.md 作为文档入口。
铁律: CHANGELOG.md 必须追加，不能覆盖。
铁律: ADR 不可变，新决策 = 新文件。
铁律: docs/ 放文档，output/ 放设计产物，项目根放代码。三者不混。
```