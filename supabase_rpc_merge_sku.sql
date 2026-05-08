-- ============================================
-- GMPos RPC: merge_sku
-- 原子化 SKU 合并事务
-- 调用: SELECT merge_sku('OLD-SKU', 'TARGET-SKU', 'AdminName')
-- 返回 JSON: { ok, status, message }
-- ============================================

create or replace function merge_sku(p_from_id text, p_to_id text, p_user text default '')
returns json
language plpgsql
as $$
declare
  v_from_exists boolean;
  v_to_exists boolean;
  v_from_stock numeric;
  v_to_stock numeric;
  v_si_count int;
  v_po_count int;
begin
  -- 1. 用固定顺序锁住两个产品，避免并发合并造成竞争或死锁
  perform 1
  from public.products
  where "ProductID" in (p_from_id, p_to_id)
  order by "ProductID"
  for update;

  -- 2. 检查两个 SKU 存在
  select exists(select 1 from public.products where "ProductID" = p_from_id) into v_from_exists;
  select exists(select 1 from public.products where "ProductID" = p_to_id) into v_to_exists;

  if not v_from_exists then
    return json_build_object('ok', false, 'status', 'not_found', 'message', 'Source SKU not found: ' || p_from_id);
  end if;

  if not v_to_exists then
    return json_build_object('ok', false, 'status', 'not_found', 'message', 'Target SKU not found: ' || p_to_id);
  end if;

  -- 3. 检查不是同一个 SKU
  if p_from_id = p_to_id then
    return json_build_object('ok', false, 'status', 'same_sku', 'message', 'Cannot merge SKU into itself');
  end if;

  -- 4. 读取库存
  select "StockBalance" into v_from_stock from public.products where "ProductID" = p_from_id;
  select "StockBalance" into v_to_stock from public.products where "ProductID" = p_to_id;

  -- 5. 迁移 stock_in_details
  select count(*) into v_si_count from public.stock_in_details where "ProductID" = p_from_id;
  update public.stock_in_details set "ProductID" = p_to_id where "ProductID" = p_from_id;

  -- 6. 迁移 po_details
  select count(*) into v_po_count from public.po_details where "ProductID" = p_from_id;
  update public.po_details set "ProductID" = p_to_id where "ProductID" = p_from_id;

  -- 7. 合并库存
  update public.products
  set "StockBalance" = coalesce(v_to_stock, 0) + coalesce(v_from_stock, 0)
  where "ProductID" = p_to_id;

  -- 8. 删除旧 SKU
  delete from public.products where "ProductID" = p_from_id;

  -- 9. 写 audit log
  if p_user != '' then
    insert into public.audit_logs ("Timestamp", "User", "Action", "Target", "Detail")
    values (to_char(now(), 'YYYY-MM-DD HH24:MI:SS'), p_user, 'merge_sku', p_from_id || '→' || p_to_id,
            'Stock merged: ' || coalesce(v_from_stock, 0) || ' → ' || p_to_id || ' (total: ' || (coalesce(v_to_stock, 0) + coalesce(v_from_stock, 0)) || '), ' || v_si_count || ' stock_in_details, ' || v_po_count || ' po_details migrated');
  end if;

  return json_build_object('ok', true, 'status', 'merged', 'message',
    'SKU ' || p_from_id || ' merged into ' || p_to_id || '. Stock: ' || v_from_stock || ' + ' || v_to_stock || ' = ' || (coalesce(v_to_stock, 0) + coalesce(v_from_stock, 0)) ||
    '. Records migrated: ' || v_si_count || ' stock_in, ' || v_po_count || ' sales.');
end;
$$;
