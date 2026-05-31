-- Create saves table for bookmarking posts
CREATE TABLE public.saves (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  post_id uuid NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, post_id)
);

ALTER TABLE public.saves ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own saves" ON public.saves
  FOR ALL TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can view their own saves" ON public.saves
  FOR SELECT TO authenticated
  USING (user_id = auth.uid());

-- Add user status fields for suspension/blocking
ALTER TABLE public.profiles
ADD COLUMN is_suspended boolean DEFAULT false,
ADD COLUMN is_blocked boolean DEFAULT false,
ADD COLUMN suspended_until timestamptz,
ADD COLUMN suspension_reason text;

-- Create broadcasts table for admin announcements
CREATE TABLE public.broadcasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.broadcasts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage broadcasts" ON public.broadcasts
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view broadcasts" ON public.broadcasts
  FOR SELECT
  USING (true);

-- Add indexes for performance
CREATE INDEX idx_saves_user_id ON public.saves(user_id);
CREATE INDEX idx_saves_post_id ON public.saves(post_id);
CREATE INDEX idx_profiles_suspended ON public.profiles(is_suspended) WHERE is_suspended = true;
CREATE INDEX idx_broadcasts_created_at ON public.broadcasts(created_at DESC);
