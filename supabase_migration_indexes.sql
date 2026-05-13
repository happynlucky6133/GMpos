-- ============================================
-- GMpos 阶段一 / 第一部分：性能索引
-- 在 Supabase SQL Editor 中执行
-- 安全，可随时执行，不影响业务逻辑
-- ============================================

-- stock_ins 常用查询列
CREATE INDEX IF NOT EXISTS idx_stock_ins_date       ON public.stock_ins ("Date" DESC);
CREATE INDEX IF NOT EXISTS idx_stock_ins_status     ON public.stock_ins ("Status");
CREATE INDEX IF NOT EXISTS idx_stock_ins_supplier   ON public.stock_ins ("SupplierID");

-- purchase_orders 常用查询列
CREATE INDEX IF NOT EXISTS idx_po_date              ON public.purchase_orders ("Date" DESC);
CREATE INDEX IF NOT EXISTS idx_po_status            ON public.purchase_orders ("Status");
CREATE INDEX IF NOT EXISTS idx_po_invoice           ON public.purchase_orders ("InvoiceNo");
CREATE INDEX IF NOT EXISTS idx_po_external_doc_no   ON public.purchase_orders ("ExternalDocNo");

-- 子表外键列（加速 JOIN）
CREATE INDEX IF NOT EXISTS idx_si_details_siid      ON public.stock_in_details ("StockInID");
CREATE INDEX IF NOT EXISTS idx_si_details_prod      ON public.stock_in_details ("ProductID");
CREATE INDEX IF NOT EXISTS idx_po_details_poid      ON public.po_details ("POID");
CREATE INDEX IF NOT EXISTS idx_po_details_prod      ON public.po_details ("ProductID");

-- 审计日志时间戳
CREATE INDEX IF NOT EXISTS idx_audit_ts             ON public.audit_logs ("Timestamp" DESC);
