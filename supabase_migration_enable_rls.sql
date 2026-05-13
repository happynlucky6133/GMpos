-- ============================================
-- GMpos RLS 启用与策略配置
-- 前提：
--   1. 已执行 supabase_migration_user_profiles.sql
--   2. Auth 用户已映射到 public.user_profiles
--   3. 前端已改用 Supabase Auth JWT
-- ============================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_ins ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_in_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.purchase_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.po_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 旧 users 表不再作为认证来源。若仍存在，彻底阻断 API 访问。
DO $$
BEGIN
  IF to_regclass('public.users') IS NOT NULL THEN
    EXECUTE 'ALTER TABLE public.users ENABLE ROW LEVEL SECURITY';
    EXECUTE 'REVOKE ALL ON public.users FROM anon, authenticated';
  END IF;
END $$;

-- Products：登录用户可读，admin/purchase 可写，admin 可删。
DROP POLICY IF EXISTS products_select ON public.products;
DROP POLICY IF EXISTS products_insert ON public.products;
DROP POLICY IF EXISTS products_update ON public.products;
DROP POLICY IF EXISTS products_delete ON public.products;
CREATE POLICY products_select ON public.products FOR SELECT TO authenticated
USING (public.current_user_role() IN ('admin', 'sales', 'purchase'));
CREATE POLICY products_insert ON public.products FOR INSERT TO authenticated
WITH CHECK (public.current_user_role() IN ('admin', 'purchase'));
CREATE POLICY products_update ON public.products FOR UPDATE TO authenticated
USING (public.current_user_role() IN ('admin', 'purchase'))
WITH CHECK (public.current_user_role() IN ('admin', 'purchase'));
CREATE POLICY products_delete ON public.products FOR DELETE TO authenticated
USING (public.current_user_role() = 'admin');

-- Suppliers：登录用户可读，仅 admin 可写。
DROP POLICY IF EXISTS suppliers_select ON public.suppliers;
DROP POLICY IF EXISTS suppliers_insert ON public.suppliers;
DROP POLICY IF EXISTS suppliers_update ON public.suppliers;
DROP POLICY IF EXISTS suppliers_delete ON public.suppliers;
CREATE POLICY suppliers_select ON public.suppliers FOR SELECT TO authenticated
USING (public.current_user_role() IN ('admin', 'sales', 'purchase'));
CREATE POLICY suppliers_insert ON public.suppliers FOR INSERT TO authenticated
WITH CHECK (public.current_user_role() = 'admin');
CREATE POLICY suppliers_update ON public.suppliers FOR UPDATE TO authenticated
USING (public.current_user_role() = 'admin')
WITH CHECK (public.current_user_role() = 'admin');
CREATE POLICY suppliers_delete ON public.suppliers FOR DELETE TO authenticated
USING (public.current_user_role() = 'admin');

-- Customers：登录用户可读，admin/sales 可写，admin 可删。
DROP POLICY IF EXISTS customers_select ON public.customers;
DROP POLICY IF EXISTS customers_insert ON public.customers;
DROP POLICY IF EXISTS customers_update ON public.customers;
DROP POLICY IF EXISTS customers_delete ON public.customers;
CREATE POLICY customers_select ON public.customers FOR SELECT TO authenticated
USING (public.current_user_role() IN ('admin', 'sales', 'purchase'));
CREATE POLICY customers_insert ON public.customers FOR INSERT TO authenticated
WITH CHECK (public.current_user_role() IN ('admin', 'sales'));
CREATE POLICY customers_update ON public.customers FOR UPDATE TO authenticated
USING (public.current_user_role() IN ('admin', 'sales'))
WITH CHECK (public.current_user_role() IN ('admin', 'sales'));
CREATE POLICY customers_delete ON public.customers FOR DELETE TO authenticated
USING (public.current_user_role() = 'admin');

-- Stock in：登录用户可读，admin/purchase 可写，admin 可删。
DROP POLICY IF EXISTS stock_ins_select ON public.stock_ins;
DROP POLICY IF EXISTS stock_ins_insert ON public.stock_ins;
DROP POLICY IF EXISTS stock_ins_update ON public.stock_ins;
DROP POLICY IF EXISTS stock_ins_delete ON public.stock_ins;
CREATE POLICY stock_ins_select ON public.stock_ins FOR SELECT TO authenticated
USING (public.current_user_role() IN ('admin', 'sales', 'purchase'));
CREATE POLICY stock_ins_insert ON public.stock_ins FOR INSERT TO authenticated
WITH CHECK (public.current_user_role() IN ('admin', 'purchase'));
CREATE POLICY stock_ins_update ON public.stock_ins FOR UPDATE TO authenticated
USING (public.current_user_role() IN ('admin', 'purchase'))
WITH CHECK (public.current_user_role() IN ('admin', 'purchase'));
CREATE POLICY stock_ins_delete ON public.stock_ins FOR DELETE TO authenticated
USING (public.current_user_role() = 'admin');

DROP POLICY IF EXISTS stock_in_details_select ON public.stock_in_details;
DROP POLICY IF EXISTS stock_in_details_insert ON public.stock_in_details;
DROP POLICY IF EXISTS stock_in_details_update ON public.stock_in_details;
DROP POLICY IF EXISTS stock_in_details_delete ON public.stock_in_details;
CREATE POLICY stock_in_details_select ON public.stock_in_details FOR SELECT TO authenticated
USING (public.current_user_role() IN ('admin', 'sales', 'purchase'));
CREATE POLICY stock_in_details_insert ON public.stock_in_details FOR INSERT TO authenticated
WITH CHECK (public.current_user_role() IN ('admin', 'purchase'));
CREATE POLICY stock_in_details_update ON public.stock_in_details FOR UPDATE TO authenticated
USING (public.current_user_role() IN ('admin', 'purchase'))
WITH CHECK (public.current_user_role() IN ('admin', 'purchase'));
CREATE POLICY stock_in_details_delete ON public.stock_in_details FOR DELETE TO authenticated
USING (public.current_user_role() = 'admin');

-- Orders：登录用户可读，admin/sales 可写，admin 可删。
DROP POLICY IF EXISTS purchase_orders_select ON public.purchase_orders;
DROP POLICY IF EXISTS purchase_orders_insert ON public.purchase_orders;
DROP POLICY IF EXISTS purchase_orders_update ON public.purchase_orders;
DROP POLICY IF EXISTS purchase_orders_delete ON public.purchase_orders;
CREATE POLICY purchase_orders_select ON public.purchase_orders FOR SELECT TO authenticated
USING (public.current_user_role() IN ('admin', 'sales', 'purchase'));
CREATE POLICY purchase_orders_insert ON public.purchase_orders FOR INSERT TO authenticated
WITH CHECK (public.current_user_role() IN ('admin', 'sales'));
CREATE POLICY purchase_orders_update ON public.purchase_orders FOR UPDATE TO authenticated
USING (public.current_user_role() IN ('admin', 'sales'))
WITH CHECK (public.current_user_role() IN ('admin', 'sales'));
CREATE POLICY purchase_orders_delete ON public.purchase_orders FOR DELETE TO authenticated
USING (public.current_user_role() = 'admin');

DROP POLICY IF EXISTS po_details_select ON public.po_details;
DROP POLICY IF EXISTS po_details_insert ON public.po_details;
DROP POLICY IF EXISTS po_details_update ON public.po_details;
DROP POLICY IF EXISTS po_details_delete ON public.po_details;
CREATE POLICY po_details_select ON public.po_details FOR SELECT TO authenticated
USING (public.current_user_role() IN ('admin', 'sales', 'purchase'));
CREATE POLICY po_details_insert ON public.po_details FOR INSERT TO authenticated
WITH CHECK (public.current_user_role() IN ('admin', 'sales'));
CREATE POLICY po_details_update ON public.po_details FOR UPDATE TO authenticated
USING (public.current_user_role() IN ('admin', 'sales'))
WITH CHECK (public.current_user_role() IN ('admin', 'sales'));
CREATE POLICY po_details_delete ON public.po_details FOR DELETE TO authenticated
USING (public.current_user_role() = 'admin');

-- Audit logs：登录用户可读；直接写入禁止，未来由 RPC/trigger 写入。
DROP POLICY IF EXISTS audit_logs_select ON public.audit_logs;
DROP POLICY IF EXISTS audit_logs_insert ON public.audit_logs;
DROP POLICY IF EXISTS audit_logs_update ON public.audit_logs;
DROP POLICY IF EXISTS audit_logs_delete ON public.audit_logs;
CREATE POLICY audit_logs_select ON public.audit_logs FOR SELECT TO authenticated
USING (public.current_user_role() IN ('admin', 'sales', 'purchase'));
CREATE POLICY audit_logs_insert ON public.audit_logs FOR INSERT TO authenticated
WITH CHECK (false);
