-- ============================================
-- GMPos RPC: confirm_order
-- 原子化出货确认事务
-- 调用: SELECT confirm_order('FYP-1000181')
-- 返回 JSON: { ok, status, message }
-- ============================================

create or replace function confirm_order(p_po_id text)
returns json
language plpgsql
as $$
declare
  v_status text;
  v_detail_count int;
  v_current_stock numeric;
  v_qty numeric;
  v_prod_id text;
  v_rec record;
begin
  -- 1. 检查单据存在
  select "Status" into v_status
  from public.purchase_orders
  where "POID" = p_po_id;

  if not found then
    return json_build_object('ok', false, 'status', 'not_found', 'message', 'Order not found');
  end if;

  -- 2. 检查状态
  if v_status != 'pending' then
    return json_build_object('ok', false, 'status', 'already_processed', 'message', 'Order is not pending (current: ' || v_status || ')');
  end if;

  -- 3. 检查明细非空
  select count(*) into v_detail_count
  from public.po_details
  where "POID" = p_po_id;

  if v_detail_count = 0 then
    return json_build_object('ok', false, 'status', 'no_details', 'message', 'No order details found');
  end if;

  -- 4. 事务内更新库存
  for v_rec in
    select d."ProductID", d."QTY"
    from public.po_details d
    where d."POID" = p_po_id
  loop
    -- 检查产品存在
    select "StockBalance" into v_current_stock
    from public.products
    where "ProductID" = v_rec."ProductID";

    if not found then
      return json_build_object('ok', false, 'status', 'invalid_product', 'message', 'Product not found: ' || v_rec."ProductID");
    end if;

    -- 更新库存（允许负数）
    update public.products
    set "StockBalance" = coalesce(v_current_stock, 0) - v_rec."QTY"
    where "ProductID" = v_rec."ProductID";
  end loop;

  -- 5. 改状态为 done
  update public.purchase_orders
  set "Status" = 'done'
  where "POID" = p_po_id;

  return json_build_object('ok', true, 'status', 'done', 'message', 'Order confirmed, ' || v_detail_count || ' products updated');
end;
$$;
