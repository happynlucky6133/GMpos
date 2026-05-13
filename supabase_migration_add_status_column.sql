-- ============================================
-- GMpos 阶段一：补齐 stock_ins.Status
-- 在 Supabase SQL Editor 中执行
-- ============================================

ALTER TABLE public.stock_ins
ADD COLUMN IF NOT EXISTS "Status" text NOT NULL DEFAULT 'pending';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'valid_stock_in_status'
      AND conrelid = 'public.stock_ins'::regclass
  ) THEN
    ALTER TABLE public.stock_ins
    ADD CONSTRAINT valid_stock_in_status
    CHECK ("Status" IN ('pending', 'done', 'cancelled'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_stock_ins_status
ON public.stock_ins ("Status");
