# GMpos Supabase Deployment Order

Run these steps manually in Supabase after backing up the database.

## 0. Backup

Create a database backup in Supabase Dashboard before running any SQL.

## 1. Auth Users

Create users in Supabase Dashboard > Authentication:

- `admin@gmpos.local`
- `sales@gmpos.local`
- `purchase@gmpos.local`

Use strong temporary passwords and mark users confirmed if required.

## 2. SQL Migration Order

Run these files in Supabase SQL Editor in this order:

1. `supabase_migration_user_profiles.sql`
2. Insert `user_profiles` rows using the UUIDs from `auth.users`
3. `supabase_migration_add_status_column.sql`
4. `supabase_migration_indexes.sql`
5. Run the pre-check queries at the bottom of `supabase_migration_foreign_keys.sql`
6. If pre-checks return zero rows, run `supabase_migration_foreign_keys.sql`
7. `supabase_migration_rpc_hardened.sql`
8. `supabase_migration_enable_rls.sql`

Do not execute deprecated files:

- `supabase_users.sql`
- `supabase_rpc_confirm_order.sql`
- `supabase_rpc_confirm_stock_in.sql`
- `supabase_rpc_merge_sku.sql`

## 3. Profile Insert Template

Replace UUID values with IDs from:

```sql
SELECT id, email
FROM auth.users
WHERE email IN ('admin@gmpos.local', 'sales@gmpos.local', 'purchase@gmpos.local');
```

Then insert:

```sql
INSERT INTO public.user_profiles (id, username, display_name, role)
VALUES
  ('<admin uuid>', 'admin', '管理员', 'admin'),
  ('<sales uuid>', 'sales', '销售员', 'sales'),
  ('<purchase uuid>', 'purchase', '采购员', 'purchase');
```

## 4. Smoke Tests

After running SQL:

- Login as admin, sales, and purchase.
- Confirm sales can create and confirm orders.
- Confirm purchase can create and confirm stock-ins.
- Confirm only admin can merge SKU.
- Confirm direct REST access with anon key no longer reads `users`.
- Confirm `audit_logs` cannot be directly inserted from the browser.
