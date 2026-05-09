-- ============================================
-- GMPos migration: default walk-in customer
-- Run once in Supabase SQL Editor.
--
-- GMpos frontend and Hermes OCR/API both use CustomerID='WALK-IN'
-- for POS cash sales and branch-transfer stock-out headers.
-- ============================================

insert into public.customers ("CustomerID", "CustomerName", "Phone", "Note")
values ('WALK-IN', 'Walk-In Customer', '', 'Default customer for OCR/API and counter sales')
on conflict ("CustomerID") do nothing;
