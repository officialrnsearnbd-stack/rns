
ALTER TABLE public.profiles
  ADD COLUMN notification_prefs jsonb NOT NULL DEFAULT '{"likes":true,"comments":true,"follows":true,"messages":true}'::jsonb;
