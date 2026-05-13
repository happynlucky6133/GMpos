-- ============================================
-- GMpos 阶段一 / 第三部分：RPC 函数权限加固
-- 在 Supabase SQL Editor 中执行
-- ⚠️ 前提条件：
--   1. public.user_profiles 表已创建（阶段二 Auth 迁移）
--   2. 用户已通过 Supabase Auth 登录（有 JWT）
-- ============================================

-- ============================================
-- 0. 辅助函数：从 JWT 获取当前用户角色
--    供 RPC 内部调用，前端无法伪造
-- ============================================
CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT role FROM public.user_profiles WHERE id = auth.uid();
$$;

-- 回收 public 执行权限（仅允许 authenticated 角色调用）
REVOKE EXECUTE ON FUNCTION public.current_user_role() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.current_user_role() TO authenticated;


-- ============================================
-- 1. confirm_stock_in（确认入库，增加库存）
--    仅 admin / purchase 可执行
--    按产品汇总后一次性 UPDATE，避免逐行循环
-- ============================================
CREATE OR REPLACE FUNCTION public.confirm_stock_in(p_stock_in_id text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_status text;
  v_detail_count int;
  v_missing_product text;
  v_role text;
BEGIN
  -- 角色检查：仅 admin 和 purchase 可确认入库
  v_role := public.current_user_role();
  IF v_role IS NULL OR v_role NOT IN ('admin', 'purchase') THEN
    RETURN json_build_object('ok', false, 'status', 'forbidden', 'message', '无权限执行入库确认');
  END IF;

  -- 锁住单据行，避免并发
  SELECT "Status" INTO v_status
  FROM public.stock_ins
  WHERE "StockInID" = p_stock_in_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN json_build_object('ok', false, 'status', 'not_found', 'message', 'Stock in record not found');
  END IF;

  IF v_status != 'pending' THEN
    RETURN json_build_object('ok', false, 'status', 'already_processed', 'message', 'Stock in is not pending (current: ' || v_status || ')');
  END IF;

  SELECT count(*) INTO v_detail_count
  FROM public.stock_in_details
  WHERE "StockInID" = p_stock_in_id;

  IF v_detail_count = 0 THEN
    RETURN json_build_object('ok', false, 'status', 'no_details', 'message', 'No stock in details found');
  END IF;

  -- 验证所有产品存在
  SELECT d."ProductID" INTO v_missing_product
  FROM public.stock_in_details d
  LEFT JOIN public.products p ON p."ProductID" = d."ProductID"
  WHERE d."StockInID" = p_stock_in_id
    AND p."ProductID" IS NULL
  LIMIT 1;

  IF v_missing_product IS NOT NULL THEN
    RETURN json_build_object('ok', false, 'status', 'invalid_product', 'message', 'Product not found: ' || v_missing_product);
  END IF;

  -- 按产品汇总后一次性 UPDATE（原子操作，锁产品行）
  UPDATE public.products p
  SET "StockBalance" = coalesce(p."StockBalance", 0) + x.total_qty
  FROM (
    SELECT d."ProductID", sum(coalesce(d."Qty", 0)) as total_qty
    FROM public.stock_in_details d
    WHERE d."StockInID" = p_stock_in_id
    GROUP BY d."ProductID"
  ) x
  WHERE p."ProductID" = x."ProductID";

  -- 改状态
  UPDATE public.stock_ins
  SET "Status" = 'done'
  WHERE "StockInID" = p_stock_in_id;

  RETURN json_build_object('ok', true, 'status', 'done', 'message', 'Stock in confirmed, ' || v_detail_count || ' products updated');
END;
$$;


-- ============================================
-- 2. confirm_order（确认出货，扣减库存）
--    仅 admin / sales 可执行
--    允许负库存（等待补货场景），按产品汇总一次性 UPDATE
-- ============================================
CREATE OR REPLACE FUNCTION public.confirm_order(p_po_id text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_status text;
  v_detail_count int;
  v_missing_product text;
  v_role text;
BEGIN
  -- 角色检查：仅 admin 和 sales 可确认出货
  v_role := public.current_user_role();
  IF v_role IS NULL OR v_role NOT IN ('admin', 'sales') THEN
    RETURN json_build_object('ok', false, 'status', 'forbidden', 'message', '无权限执行出货确认');
  END IF;

  SELECT "Status" INTO v_status
  FROM public.purchase_orders
  WHERE "POID" = p_po_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RETURN json_build_object('ok', false, 'status', 'not_found', 'message', 'Order not found');
  END IF;

  IF v_status != 'pending' THEN
    RETURN json_build_object('ok', false, 'status', 'already_processed', 'message', 'Order is not pending (current: ' || v_status || ')');
  END IF;

  SELECT count(*) INTO v_detail_count
  FROM public.po_details
  WHERE "POID" = p_po_id;

  IF v_detail_count = 0 THEN
    RETURN json_build_object('ok', false, 'status', 'no_details', 'message', 'No order details found');
  END IF;

  -- 验证所有产品存在
  SELECT d."ProductID" INTO v_missing_product
  FROM public.po_details d
  LEFT JOIN public.products p ON p."ProductID" = d."ProductID"
  WHERE d."POID" = p_po_id
    AND p."ProductID" IS NULL
  LIMIT 1;

  IF v_missing_product IS NOT NULL THEN
    RETURN json_build_object('ok', false, 'status', 'invalid_product', 'message', 'Product not found: ' || v_missing_product);
  END IF;

  -- 按产品汇总后一次性 UPDATE（允许负库存）
  UPDATE public.products p
  SET "StockBalance" = coalesce(p."StockBalance", 0) - x.total_qty
  FROM (
    SELECT d."ProductID", sum(coalesce(d."QTY", 0)) as total_qty
    FROM public.po_details d
    WHERE d."POID" = p_po_id
    GROUP BY d."ProductID"
  ) x
  WHERE p."ProductID" = x."ProductID";

  -- 改状态
  UPDATE public.purchase_orders
  SET "Status" = 'done'
  WHERE "POID" = p_po_id;

  RETURN json_build_object('ok', true, 'status', 'done', 'message', 'Order confirmed, ' || v_detail_count || ' products updated');
END;
$$;


-- ============================================
-- 3. merge_sku（合并 SKU）
--    仅 admin 可执行
--    内部从 auth.uid() 获取操作者身份写审计日志
--    不再接受前端传入的 p_user 参数
-- ============================================
CREATE OR REPLACE FUNCTION public.merge_sku(p_from_id text, p_to_id text)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_role text;
  v_from_stock numeric;
  v_to_stock numeric;
  v_si_count int;
  v_po_count int;
  v_operator text;
BEGIN
  -- 角色检查：仅 admin 可合并 SKU
  v_role := public.current_user_role();
  IF v_role IS NULL OR v_role != 'admin' THEN
    RETURN json_build_object('ok', false, 'status', 'forbidden', 'message', '仅管理员可执行 SKU 合并');
  END IF;

  -- 获取操作者名称用于审计日志
  SELECT display_name INTO v_operator
  FROM public.user_profiles
  WHERE id = auth.uid();

  IF p_from_id = p_to_id THEN
    RETURN json_build_object('ok', false, 'status', 'same_sku', 'message', 'Cannot merge SKU into itself');
  END IF;

  -- 用固定顺序锁两个产品，避免死锁
  PERFORM 1
  FROM public.products
  WHERE "ProductID" IN (p_from_id, p_to_id)
  ORDER BY "ProductID"
  FOR UPDATE;

  -- 读库存
  SELECT "StockBalance" INTO v_from_stock FROM public.products WHERE "ProductID" = p_from_id;
  IF NOT FOUND THEN
    RETURN json_build_object('ok', false, 'status', 'not_found', 'message', 'Source SKU not found: ' || p_from_id);
  END IF;

  SELECT "StockBalance" INTO v_to_stock FROM public.products WHERE "ProductID" = p_to_id;
  IF NOT FOUND THEN
    RETURN json_build_object('ok', false, 'status', 'not_found', 'message', 'Target SKU not found: ' || p_to_id);
  END IF;

  -- 迁移 stock_in_details
  SELECT count(*) INTO v_si_count FROM public.stock_in_details WHERE "ProductID" = p_from_id;
  UPDATE public.stock_in_details SET "ProductID" = p_to_id WHERE "ProductID" = p_from_id;

  -- 迁移 po_details
  SELECT count(*) INTO v_po_count FROM public.po_details WHERE "ProductID" = p_from_id;
  UPDATE public.po_details SET "ProductID" = p_to_id WHERE "ProductID" = p_from_id;

  -- 合并库存
  UPDATE public.products
  SET "StockBalance" = coalesce(v_to_stock, 0) + coalesce(v_from_stock, 0)
  WHERE "ProductID" = p_to_id;

  -- 删除旧 SKU
  DELETE FROM public.products WHERE "ProductID" = p_from_id;

  -- 写审计日志（操作者来自 auth.uid()，不可伪造）
  INSERT INTO public.audit_logs ("Timestamp", "User", "Action", "Target", "Detail")
  VALUES (
    to_char(now(), 'YYYY-MM-DD HH24:MI:SS'),
    coalesce(v_operator, 'system'),
    'merge_sku',
    p_from_id || '→' || p_to_id,
    'Stock merged: ' || coalesce(v_from_stock, 0) || ' → ' || p_to_id
      || ' (total: ' || (coalesce(v_to_stock, 0) + coalesce(v_from_stock, 0)) || ')'
      || ', ' || v_si_count || ' stock_in_details, ' || v_po_count || ' po_details migrated'
  );

  RETURN json_build_object('ok', true, 'status', 'merged', 'message',
    'SKU ' || p_from_id || ' merged into ' || p_to_id
    || '. Stock: ' || v_from_stock || ' + ' || v_to_stock
    || ' = ' || (coalesce(v_to_stock, 0) + coalesce(v_from_stock, 0))
    || '. Records migrated: ' || v_si_count || ' stock_in, ' || v_po_count || ' sales.');
END;
$$;


-- ============================================
-- 4. 回收 RPC 的 public/anonymous 执行权限
--    仅 authenticated（已登录用户）可调用
--    注意：角色级别检查在各 RPC 内部通过 current_user_role() 实现
-- ============================================
REVOKE EXECUTE ON FUNCTION public.confirm_stock_in(text)   FROM public, anon;
REVOKE EXECUTE ON FUNCTION public.confirm_order(text)      FROM public, anon;
REVOKE EXECUTE ON FUNCTION public.merge_sku(text, text)    FROM public, anon;

GRANT EXECUTE ON FUNCTION public.confirm_stock_in(text)    TO authenticated;
GRANT EXECUTE ON FUNCTION public.confirm_order(text)       TO authenticated;
GRANT EXECUTE ON FUNCTION public.merge_sku(text, text)     TO authenticated;
