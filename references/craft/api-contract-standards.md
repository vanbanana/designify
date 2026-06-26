# API Contract Standards — API 契约与双重校验

> **何时加载：** Phase 5 Step 7.6 API 契约推导时。有后端交接需求时必读。
> **核心原则：** 前端写了什么 API 假设，必须明确写出来，且经过校验。

---

## 为什么需要 API 契约

AI 生成前端代码时会假设 API 格式，但：
1. **没有文档** — 后端开发不知道前端期待什么格式
2. **AI 幻觉** — 前端请求字段和后端实际字段不一致
3. **缺少错误处理** — AI 只写 happy path，没处理 401/500
4. **生产环境致命** — 字段名不匹配导致整个页面不可用

**解决方案：** 自动扫描代码中的 API 调用 → 生成契约文档 → 双重校验。

---

## 契约格式（参考 OpenAPI 3.1 规范）

每次 Phase 5 代码生成后，必须生成 `docs/api-contract.md`：

```markdown
---
title: API Contract
version: 1.0.0
updated: 2026-06-26
review: draft                    # draft | reviewed | approved
---

# API Contract v1.0.0

> **项目：** [项目名]
> **技术栈：** [React/Next.js/Vue/单文件 HTML]
> **基准 URL：** `http://localhost:3001/api`（开发）| `/api`（生产）

---

## 认证（Security）

| 方案 | 位置 | 格式 |
|------|------|------|
| Bearer Token | Header: `Authorization: Bearer <token>` | JWT |
| （可选）API Key | Header: `X-API-Key: <key>` | UUID |

---

## 端点总览

| 方法 | 路径 | 用途 | 认证 | 审核 |
|------|------|------|------|------|
| POST | `/api/login` | 用户登录 | 无 | approved |
| GET | `/api/works` | 获取作品列表 | Bearer | approved |
| GET | `/api/works/:id` | 获取作品详情 | Bearer | draft |
| POST | `/api/contact` | 提交联系方式 | 无 | changes-requested |

---

### POST /api/login

登录并获取访问令牌。

**请求**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| email | string | ✅ | 用户邮箱 |
| password | string | ✅ | 密码（≥ 6 位） |

```json
{
  "email": "user@example.com",
  "password": "********"
}
```

**响应**

| 状态码 | 说明 | 前端处理 |
|--------|------|----------|
| `200` | 登录成功 | 存储 token，跳转首页 |
| `400` | 请求参数缺失 | 显示"请填写邮箱和密码" |
| `401` | 认证失败 | 显示"邮箱或密码错误" |
| `429` | 请求过于频繁 | 显示"请稍后再试" |
| `5xx` | 服务器错误 | 显示"服务器繁忙，请稍后重试" |

```json title="200"
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { "id": 1, "name": "张三", "email": "user@example.com" }
}
```

```json title="400"
{
  "error": "missing_fields",
  "message": "请填写邮箱和密码"
}
```

```json title="401"
{
  "error": "invalid_credentials",
  "message": "邮箱或密码错误"
}
```

---

### GET /api/works

获取作品列表（分页）。

**查询参数**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| page | number | ❌ | 1 | 页码 |
| limit | number | ❌ | 10 | 每页条数 |

**响应**

| 状态码 | 说明 |
|--------|------|
| `200` | 返回作品列表 |
| `401` | Token 无效或过期 |

```json title="200"
{
  "data": [
    {
      "id": 1,
      "title": "作品一",
      "image": "https://...",
      "created_at": "2026-06-01"
    }
  ],
  "total": 24,
  "page": 1,
  "limit": 10
}
```

```json title="401"
{
  "error": "token_expired",
  "message": "登录已过期，请重新登录"
}
```

**前端字段映射**

```
请求 page     → 响应 page        ✅ 一致
请求 limit    → 响应 limit        ✅ 一致（前端变量名 pageSize，需统一）
响应 data     → 前端 props.data   ✅
响应 total    → 前端分页组件      ✅
```

---

### POST /api/contact
- **描述：** 提交联系表单
- **Auth：** 无

**请求体：**
```json
{
  "name": "张三",
  "email": "user@example.com",
  "message": "你好，我想咨询..."
}
```

🔴 **缺失：** 前端没有处理 4xx/5xx 错误响应
```
需要补充：catch 分支处理网络错误和服务器错误
```

---

## 校验标准

### 第一重：生成时校验（Step 7.6 自动执行）

扫描代码中所有 API 调用，对每个 endpoint 检查：

```
✅ approved = 有请求体 + 有成功响应处理 + 有错误处理
⚠️ draft = 字段名不一致（前后端命名不统一）或缺少部分文档
❌ changes-requested = 缺少错误处理 或 缺少响应处理
```

### 第二重：Phase 6 质量门禁校验

```
API 契约检查清单：
- [ ] docs/api-contract.md 文件存在
- [ ] 所有 endpoint 标记 approved
- [ ] 没有 changes-requested（有则必须修复后才能交付）
- [ ] draft 标记有说明（字段映射关系中明确标注）
- [ ] 每个 endpoint 至少有 1 个成功响应和 1 个错误响应文档
```

### 修复规则

```
遇到 changes-requested → 在代码中添加 catch/finally 分支
  例: fetch('/api/login').then(...).catch(err => showError(err))

遇到 draft → 在契约中标注映射关系
  例: "前端发 email，后端返回 user_email → 映射关系已在契约中标注"

遇到 changes-requested（类型不匹配）→ 修复前端的字段类型
  例: 发 { age: "25" } → 改成 { age: 25 }
```

---

## 铁律

```
铁律: 每次代码生成后必须生成 docs/api-contract.md。
铁律: 🔴 缺失状态不修复 → 不允许交付。（缺少错误处理在生产环境是致命问题）
铁律: 前端假设的 API 字段名和后端实际字段名不一致 → 必须在契约中标注映射关系。
```

## 红旗列表

| 你在想... | 现实 |
|-----------|------|
| "这个 API 以后再说" | 以后永远不会补。现在生成。 |
| "错误处理不重要" | 没处理 401 = 用户看到白屏。生产环境致命。 |
| "字段名项目会统一" | 不写出来就没人知道不一致。写出来才能修。 |