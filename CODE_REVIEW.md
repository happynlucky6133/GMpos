# GMpos 代码 Review - 2026-05-08

## P0：确认防重复现在其实无效

**位置：** confirmStockIn (app.js line 1635), confirmOrder (app.js line 1910)

**问题：** Supabase/PostgREST 在 0 行匹配时也会返回 204 OK，所以即使单据已不是 pending，前端也会以为锁定成功。

**修法：** 用 `Prefer: return=representation` 读取返回数组，确认返回 1 行才继续。

## P1：确认时先改 done 再更新库存，失败会造成错账

**位置：** confirmStockIn, confirmOrder

**问题：** Status 已改成 done，但后续产品库存更新失败 → 单据显示已完成但库存没完整更新。

**建议：** Supabase RPC transaction

## P1：合并 SKU 不是事务，失败会留下半合并状态

**位置：** submitMergeSku

**问题：** 任一步失败都会留下半合并状态。

**建议：** Supabase RPC transaction

## P2：进货编辑不能编辑单价

**位置：** editStockIn 弹窗

**问题：** 编辑 pending 进货没有单价输入。

## P2：进货总金额仍然手动输入

**位置：** submitStockIn

**问题：** TotalAmount 手动输入，可能和明细不一致。

## P2：日期使用 UTC，早上可能显示错日期

**位置：** 所有 `new Date().toISOString().slice(0,10)` 的地方

**建议：** 统一用 local date 函数。

## P2：搜索逻辑需要调整

**问题：** 搜索被日期筛选限制，用户只记得单号不一定记得日期。

**建议：** 搜索时忽略日期筛选，跨全部记录搜索。
