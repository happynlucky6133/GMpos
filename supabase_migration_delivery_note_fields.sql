-- ============================================
-- GMPos migration: Delivery Note metadata for stock movements
-- Run once in Supabase SQL Editor.
--
-- DO No is only an external document number. Stock direction is decided by module:
-- - stock_ins: HQ/KL -> YP, adds stock
-- - purchase_orders with OrderType='branch_transfer': YP -> another branch, deducts stock
-- - purchase_orders with OrderType='pos_sale': normal FYP POS sale, deducts stock and counts in sales report
-- ============================================

alter table public.stock_ins
add column if not exists "ExternalDocNo" text,
add column if not exists "FromBranch" text,
add column if not exists "ToBranch" text;

alter table public.purchase_orders
add column if not exists "OrderType" text default 'pos_sale',
add column if not exists "ExternalDocNo" text,
add column if not exists "FromBranch" text,
add column if not exists "ToBranch" text;

create index if not exists idx_stock_ins_external_doc_no
on public.stock_ins ("ExternalDocNo");

create index if not exists idx_purchase_orders_external_doc_no
on public.purchase_orders ("ExternalDocNo");

create index if not exists idx_purchase_orders_order_type
on public.purchase_orders ("OrderType");

update public.purchase_orders
set "OrderType" = 'pos_sale'
where coalesce("OrderType", '') = '';
