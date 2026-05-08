-- GMPos v2: store per-item order pricing.
-- Run this once in Supabase SQL Editor.

alter table public.po_details
  add column if not exists "UnitPrice" numeric(12, 2) not null default 0,
  add column if not exists "LineAmount" numeric(12, 2) not null default 0;

update public.po_details
set "LineAmount" = "QTY" * "UnitPrice"
where "LineAmount" = 0 and "UnitPrice" <> 0;
