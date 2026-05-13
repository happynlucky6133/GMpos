-- ============================================
-- GMpos 阶段一 / 第二部分：外键约束
-- 在 Supabase SQL Editor 中执行
-- ⚠️ 先执行前置检查 SQL（见文件末尾注释），确认无孤儿数据后再执行本文件
-- ⚠️ 使用 NOT VALID 避免验证已有脏数据
-- ============================================

-- stock_in_details → stock_ins (父表删除时级联删除明细)
ALTER TABLE public.stock_in_details
  ADD CONSTRAINT fk_si_details_stock_in
  FOREIGN KEY ("StockInID") REFERENCES public.stock_ins ("StockInID")
  ON DELETE CASCADE
  NOT VALID;

-- stock_in_details → products (有明细引用时禁止删除产品)
ALTER TABLE public.stock_in_details
  ADD CONSTRAINT fk_si_details_product
  FOREIGN KEY ("ProductID") REFERENCES public.products ("ProductID")
  ON DELETE RESTRICT
  NOT VALID;

-- po_details → purchase_orders (父表删除时级联删除明细)
ALTER TABLE public.po_details
  ADD CONSTRAINT fk_po_details_order
  FOREIGN KEY ("POID") REFERENCES public.purchase_orders ("POID")
  ON DELETE CASCADE
  NOT VALID;

-- po_details → products (有明细引用时禁止删除产品)
ALTER TABLE public.po_details
  ADD CONSTRAINT fk_po_details_product
  FOREIGN KEY ("ProductID") REFERENCES public.products ("ProductID")
  ON DELETE RESTRICT
  NOT VALID;

-- stock_ins → suppliers (有入库记录时禁止删除供应商)
ALTER TABLE public.stock_ins
  ADD CONSTRAINT fk_stock_in_supplier
  FOREIGN KEY ("SupplierID") REFERENCES public.suppliers ("SupplierID")
  ON DELETE RESTRICT
  NOT VALID;

-- purchase_orders → customers (有订单记录时禁止删除客户)
ALTER TABLE public.purchase_orders
  ADD CONSTRAINT fk_po_customer
  FOREIGN KEY ("CustomerID") REFERENCES public.customers ("CustomerID")
  ON DELETE RESTRICT
  NOT VALID;

-- ============================================
-- 前置检查 SQL（在添加约束之前执行）
-- 复制到 SQL Editor 单独执行，确认每个查询返回 0 行
-- ============================================
/*
-- 检查 stock_in_details 中的孤儿 StockInID
SELECT sid."DetailID", sid."StockInID"
FROM public.stock_in_details sid
LEFT JOIN public.stock_ins si ON si."StockInID" = sid."StockInID"
WHERE si."StockInID" IS NULL;

-- 检查 stock_in_details 中的孤儿 ProductID
SELECT sid."DetailID", sid."ProductID"
FROM public.stock_in_details sid
LEFT JOIN public.products p ON p."ProductID" = sid."ProductID"
WHERE p."ProductID" IS NULL;

-- 检查 po_details 中的孤儿 POID
SELECT pd."DetailID", pd."POID"
FROM public.po_details pd
LEFT JOIN public.purchase_orders po ON po."POID" = pd."POID"
WHERE po."POID" IS NULL;

-- 检查 po_details 中的孤儿 ProductID
SELECT pd."DetailID", pd."ProductID"
FROM public.po_details pd
LEFT JOIN public.products p ON p."ProductID" = pd."ProductID"
WHERE p."ProductID" IS NULL;

-- 检查 stock_ins 中的孤儿 SupplierID
SELECT si."StockInID", si."SupplierID"
FROM public.stock_ins si
LEFT JOIN public.suppliers s ON s."SupplierID" = si."SupplierID"
WHERE s."SupplierID" IS NULL;

-- 检查 purchase_orders 中的孤儿 CustomerID
SELECT po."POID", po."CustomerID"
FROM public.purchase_orders po
LEFT JOIN public.customers c ON c."CustomerID" = po."CustomerID"
WHERE c."CustomerID" IS NULL;
*/
