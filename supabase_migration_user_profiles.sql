-- ============================================
-- GMpos 阶段二：Supabase Auth profiles
-- 在 Supabase SQL Editor 中执行
-- 前提：已在 Dashboard > Authentication 中创建 Auth 用户
-- ============================================

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  display_name text NOT NULL,
  role text NOT NULL CHECK (role IN ('admin', 'sales', 'purchase')),
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.current_user_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT role
  FROM public.user_profiles
  WHERE id = auth.uid()
    AND active = true;
$$;

REVOKE EXECUTE ON FUNCTION public.current_user_role() FROM public, anon;
GRANT EXECUTE ON FUNCTION public.current_user_role() TO authenticated;

-- 当前用户可读自己的 profile；admin 可读/写所有 profile。
DROP POLICY IF EXISTS user_profiles_select_own ON public.user_profiles;
DROP POLICY IF EXISTS user_profiles_select_admin ON public.user_profiles;
DROP POLICY IF EXISTS user_profiles_insert_admin ON public.user_profiles;
DROP POLICY IF EXISTS user_profiles_update_admin ON public.user_profiles;
DROP POLICY IF EXISTS user_profiles_delete_admin ON public.user_profiles;

CREATE POLICY user_profiles_select_own
ON public.user_profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY user_profiles_select_admin
ON public.user_profiles FOR SELECT
TO authenticated
USING (public.current_user_role() = 'admin');

CREATE POLICY user_profiles_insert_admin
ON public.user_profiles FOR INSERT
TO authenticated
WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY user_profiles_update_admin
ON public.user_profiles FOR UPDATE
TO authenticated
USING (public.current_user_role() = 'admin')
WITH CHECK (public.current_user_role() = 'admin');

CREATE POLICY user_profiles_delete_admin
ON public.user_profiles FOR DELETE
TO authenticated
USING (public.current_user_role() = 'admin');

-- 手动映射示例：
-- 1. Dashboard > Authentication > Users 创建 admin@gmpos.local / sales@gmpos.local / purchase@gmpos.local
-- 2. 查询 UUID：
-- SELECT id, email FROM auth.users WHERE email LIKE '%@gmpos.local';
-- 3. 插入 profile：
-- INSERT INTO public.user_profiles (id, username, display_name, role)
-- VALUES
--   ('<admin uuid>', 'admin', '管理员', 'admin'),
--   ('<sales uuid>', 'sales', '销售员', 'sales'),
--   ('<purchase uuid>', 'purchase', '采购员', 'purchase');
