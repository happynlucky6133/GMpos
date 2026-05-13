-- ============================================
-- GMpos RLS 启用（仅启用，不设策略）
-- 在 Supabase SQL Editor 中执行
-- ============================================

-- 启用所有表的 RLS
-- 启用后默认拒绝所有访问，直到创建策略为止
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_in_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.po_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ⚠️ 注意：启用 RLS 后，所有未登录的请求（anon key）将无法读写任何表。
-- 这意味着在完成 Auth 迁移之前，前端所有 API 调用都会失败。
-- 因此，此 SQL 文件应与 Auth 迁移（阶段二）同时部署。
-- 如果无法同时部署，请先部署新登录逻辑，再执行此 SQL。
