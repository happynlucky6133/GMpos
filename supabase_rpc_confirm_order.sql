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
  v_missing_product text;
begin
  -- 1. 锁住单据行，避免两个人同时确认同一张出货单
  select "Status" into v_status
  from public.purchase_orders
  where "POID" = p_po_id
  for update;

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

  -- 4. 先验证所有明细产品都存在；不要边扣库存边发现错误
  select d."ProductID" into v_missing_product
  from public.po_details d
  left join public.products p on p."ProductID" = d."ProductID"
  where d."POID" = p_po_id
    and p."ProductID" is null
  limit 1;

  if v_missing_product is not null then
    return json_build_object('ok', false, 'status', 'invalid_product', 'message', 'Product not found: ' || v_missing_product);
  end if;

  -- 5. 按产品汇总后一次性扣库存；允许负数。UPDATE 会锁住产品行，避免 lost update
  update public.products p
  set "StockBalance" = coalesce(p."StockBalance", 0) - x.total_qty
  from (
    select d."ProductID", sum(coalesce(d."QTY", 0)) as total_qty
    from public.po_details d
    where d."POID" = p_po_id
    group by d."ProductID"
  ) x
  where p."ProductID" = x."ProductID";

  -- 6. 改状态为 done
  update public.purchase_orders
  set "Status" = 'done'
  where "POID" = p_po_id;

  return json_build_object('ok', true, 'status', 'done', 'message', 'Order confirmed, ' || v_detail_count || ' products updated');
end;
$$;
