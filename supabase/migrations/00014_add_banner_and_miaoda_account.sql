
-- 1. Add banner_url to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS banner_url TEXT;

-- 2. Create banners bucket in storage
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'banners',
  'banners',
  true,
  5242880,
  ARRAY['image/jpeg','image/png','image/webp','image/gif']
) ON CONFLICT (id) DO NOTHING;

-- 3. RLS Policies for banners bucket
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Users can upload own banner'
    ) THEN
        CREATE POLICY "Users can upload own banner"
          ON storage.objects FOR INSERT TO authenticated
          WITH CHECK (bucket_id = 'banners' AND (storage.foldername(name))[1] = 'banners' AND (storage.foldername(name))[2] = auth.uid()::text);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own banner'
    ) THEN
        CREATE POLICY "Users can update own banner"
          ON storage.objects FOR UPDATE TO authenticated
          USING (bucket_id = 'banners' AND (storage.foldername(name))[1] = 'banners' AND (storage.foldername(name))[2] = auth.uid()::text);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE policyname = 'Banners are publicly readable'
    ) THEN
        CREATE POLICY "Banners are publicly readable"
          ON storage.objects FOR SELECT TO public
          USING (bucket_id = 'banners');
    END IF;
END
$$;

-- 4. Create Miaoda account
-- Note: We use a script pattern as per system rules for creating official accounts.
-- But since we need to do it in one go if possible, we will handle it via SQL for the profile part.
-- The auth.users entry will be handled by a bash script to ensure it's done correctly via signUp.
