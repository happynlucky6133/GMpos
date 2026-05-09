-- ============================================
-- GMPos migration: separate HQ POS Invoice No from GMpos internal order ID
-- Run once in Supabase SQL Editor.
-- ============================================

alter table public.purchase_orders
add column if not exists "InvoiceNo" text;

create index if not exists idx_purchase_orders_invoice_no
on public.purchase_orders ("InvoiceNo");

-- Existing rows used POID as the visible invoice number.
-- Keep that value as InvoiceNo so old FYP records remain searchable/displayed.
update public.purchase_orders
set "InvoiceNo" = "POID"
where coalesce("InvoiceNo", '') = ''
  and "POID" is not null;
