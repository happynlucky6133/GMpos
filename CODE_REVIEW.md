# YCPos-PWA 代码审查报告

> **审查依据**：@clinerules-skill.md（Karpathy 四条铁律 + L2 专家规则）
> **项目规模**：9 个文件 / ~2,200 行 / 核心 JS 单文件 1097 行
> **审查日期**：2026-05-07
> **审查人**：Cline (L2 Expert Mode)
> **状态**：学习版，暂不改动，存档备查

---

## 一、项目结构

```
YCPos-PWA/
├── index.html          # 主页面（231 行）
├── style.css           # 样式表（452 行）
├── app.js              # 核心逻辑（1097 行）
├── sw.js               # Service Worker（93 行）
├── manifest.json       # PWA 清单
├── icon-192.png        # 应用图标
├── icon-512.png        # 应用图标
├── supabase_setup.sql  # 数据库建表脚本
├── supabase_users.sql  # 用户表 + 预设账号
├── supabase_audit.sql  # 审计日志表
└── CODE_REVIEW.md      # 本文件
```

---

## 二、需求理解

基于 Supabase 的进销存管理 PWA，覆盖 **产品 / 进货 / 采购订单 / 供应商 / 客户 / 审计日志 / 多角色权限** 完整闭环。前端纯 HTML+CSS+JS（无框架），后端完全依赖 Supabase REST API 直连，Service Worker 提供离线缓存。

---

## 三、关键假设

1. **Supabase RLS 当前未启用** — 3 个 SQL 建表脚本中均无 `ALTER TABLE ... ENABLE ROW LEVEL SECURITY`，无任何 policy 定义
2. **系统面向小团队内网使用** — 从预设 3 个账号（admin/sales/purchase）和 UI 设计判断，非开放注册的 SaaS
3. **代码已投入生产使用** — 有审计日志表、v6 的 SW 缓存版本号、完整的 CRUD 流程

---

## 四、🔴 严重问题（P0 — 必须修复才能上线）

### #1 Supabase API Key 硬编码 + 无 RLS 保护（`app.js:9` + 全部 SQL）

```js
const SUPABASE_KEY = 'sb_publishable_NbWgnMsQVRHc1l1USwIYhQ_nX_eXOUS';
```

- Publishable key 在前端暴露本身可接受，但前提是 **Supabase 端已配置 RLS**
- 当前 3 个建表脚本只建表，未启用 RLS，未定义任何 policy
- 任何人拿到 key 可执行任意的 `DELETE FROM products`、`SELECT * FROM users`（含明文密码）

**改进方向**：为每张表启用 RLS，按角色定义 policy（admin 全权限、sales/purchase 受限）。或引入 Supabase Edge Functions 做后端 API 中转。

### #2 明文密码存储（`supabase_users.sql:17-20` + `app.js:208`）

```sql
INSERT INTO users ("Password") VALUES ('admin123'), ('sales123'), ('purchase123');
```

```js
// app.js:208 登录比对
if (!user || user.Password !== password) { ... }
```

- 数据库存储明文，登录是字符串直接比对
- 预设密码极弱（`admin123` 等），且硬编码在 SQL 脚本中
- 无登录失败次数限制，暴力破解无阻力

**改进方向**：使用 Supabase 内置 Auth（`supabase.auth.signInWithPassword`），密码自动 bcrypt 哈希。若必须自建，至少用 `pgcrypto` 做 `crypt()` + `gen_salt()`。

### #3 权限校验完全在前端（`app.js:46-80`）

```js
function canUseModal(type) { /* 纯 JS 判断，0 次服务端校验 */ }
```

- `hasRole`、`canShowNav`、`canUseModal` 全部仅在客户端
- 攻击者通过 `localStorage.setItem('ycpos_user', '{"Role":"admin"}')` 即可提权
- 即使 UI 隐藏了"新增用户"按钮，curl 仍可直接 POST

**改进方向**：Supabase RLS policy 中使用 `auth.uid()` + `auth.jwt()->>'role'` 做真正服务端鉴权。

---

## 五、🟠 重要问题（P1 — 可能导致数据损坏/不一致）

### #4 进货/订单的"先写后算"存在竞态条件（`app.js:736-742`）

```js
await sbPost('stock_ins', { ... });           // ① 写入进货单
await sbPost('stock_in_details', { ... });    // ② 写入详情
// 若此处在①②之间网络中断 →
await sbPatch('products', ..., { StockBalance: newBalance }); // ③ 更新库存
```

①②成功但③失败 → 进货记录存在但库存未更新 → 数据**永久不一致**。

**改进方向**：用 Supabase RPC（`create or replace function do_stock_in(...)`）将 3 步包装在一个 PL/pgSQL 事务中，利用 PostgreSQL 原子性。

### #5 一对多详情表按"一"的 ID 索引 → 数据丢失（`app.js:297,299`）

```js
state.stockInDetails = new Map(data.stockInDetails.map(d => [d.StockInID, d]));
state.orderDetails = new Map(data.orderDetails.map(d => [d.POID, d]));
```

- `stock_in_details` 表中同一 `StockInID` 可有**多个产品行**
- `new Map()` 的 key 唯一，后者覆盖前者 → 一张进货单只能看到最后一个产品

**改进方向**：改为 `Map<string, Array<detail>>`，即 `groupBy` 而非单值映射。

### #6 ID 生成用 `Math.random()` 碰撞风险高（`app.js:729-730`）

```js
const uid = Math.random().toString(36).slice(2, 6);  // 仅 ~1.6M 种可能
```

- `Math.random()` 非密码学安全
- 同日期下 Birthday Paradox：约 1,200 条记录后碰撞概率 > 50%
- 数据库有 UNIQUE 约束，碰撞会导致写入直接报错

**改进方向**：用 `crypto.randomUUID()` 或在 SQL 端用 `gen_random_uuid()`，依赖数据库 UNIQUE 做最后防线。

---

## 六、🟡 改进建议（P2 — 代码质量/扩展性）

| # | 问题 | 位置 | 说明 |
|---|------|------|------|
| 7 | **单文件 1097 行** | `app.js` | 混杂状态/API/渲染/权限/事件。建议拆分为 `api.js` + `state.js` + `auth.js` + `ui-*.js`（Karpathy：简单至上） |
| 8 | 无写入离线队列 | `app.js` + `sw.js` | SW 对 API 失败只尝试返回缓存，不会排队重试。弱网下提交的进货单直接丢失 |
| 9 | 密码修改不验证强度 | `app.js:981-1006` | 只检查两次输入一致性，无最小长度/复杂度要求 |
| 10 | CSS 骨架屏未使用 | `style.css:343-358` | `.skeleton` 和 `.skeleton-card` 定义了但从未在 HTML/JS 中使用 |
| 11 | SW 对 HTML 用缓存优先 | `sw.js:57-61` | 用户可能永远看不到 HTML 更新，除非改 CACHE 版本号 |
| 12 | 缺 CSP header | `index.html` | 无 `Content-Security-Policy`，XSS 防线不足 |
| 13 | `escapeHTML` 不完整 | `app.js:334-337` | 未处理 `\` 和 null 字节，在 JSON 上下文中可能被绕过 |

---

## 七、方案对比：修复 P0 的两条路径

### 方案 A：引入 Supabase Auth（推荐）
- **优点**：密码自动哈希 + JWT claims + RLS policy 原生支持，改动量约 200 行
- **缺点**：需迁移现有用户表到 `auth.users`，登录逻辑重写
- **工作量**：~3-4 小时

### 方案 B：纯数据库层加固
- **优点**：不改前端架构，只加 RLS policy + pgcrypto
- **缺点**：明文密码问题只能缓解不能根除（需前端做 SHA-256 再传输），JWT 需手动管理
- **工作量**：~1-2 小时

---

## 八、项目亮点

- ✅ PWA 离线缓存架构完整（SW install/activate/fetch 生命周期正确）
- ✅ 暗色模式支持（`prefers-color-scheme: dark`）
- ✅ CRUD 抽象层（`sbGet/sbPost/sbPatch/sbDelete`）减少重复代码
- ✅ 审计日志表已建，具备追溯能力
- ✅ 移动端 UI 适配良好（safe-area-inset、底部导航、FAB 按钮）
- ✅ `escapeHTML` 防 XSS 有意识

---

## 九、问题优先级汇总

| 优先级 | 编号 | 问题 | 影响 |
|--------|------|------|------|
| 🔴 P0 | #1 | API Key + 无 RLS | 数据完全暴露 |
| 🔴 P0 | #2 | 明文密码 | 账户凭据泄露 |
| 🔴 P0 | #3 | 纯前端权限 | 可绕过任意操作 |
| 🟠 P1 | #4 | 竞态条件 | 库存数据不一致 |
| 🟠 P1 | #5 | Detail 一对多丢失 | 数据渲染错误 |
| 🟠 P1 | #6 | ID 碰撞 | 数据写入失败 |
| 🟡 P2 | #7-13 | 代码质量/防御性 | 可维护性/边缘场景 |

---

> **底线判断**：当前代码**不适合直接公网部署**（P0 三红线未解决），但在内网 + RLS 加固后可安全使用。
> 此报告存档于 2026-05-07，供后续迭代参考。