
-- ── Friendships table ─────────────────────────────────────────────────────
CREATE TABLE friendships (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','accepted','blocked')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(sender_id, receiver_id)
);

ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;

-- Helper functions
CREATE OR REPLACE FUNCTION can_view_friendship(fid UUID)
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM friendships
    WHERE id = fid AND (sender_id = auth.uid() OR receiver_id = auth.uid())
  );
$$;

CREATE OR REPLACE FUNCTION is_friends_with(other_id UUID)
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM friendships
    WHERE status = 'accepted'
      AND ((sender_id = auth.uid() AND receiver_id = other_id)
        OR (sender_id = other_id AND receiver_id = auth.uid()))
  );
$$;

-- Policies
CREATE POLICY "users can view own friendships" ON friendships
  FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "users can send friend requests" ON friendships
  FOR INSERT TO authenticated WITH CHECK (sender_id = auth.uid());

CREATE POLICY "users can update own friendships" ON friendships
  FOR UPDATE USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "users can delete own friendships" ON friendships
  FOR DELETE USING (sender_id = auth.uid() OR receiver_id = auth.uid());

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE friendships;

-- ── Open messages to everyone (remove mutual-follow gate) ─────────────────
-- messages table RLS: allow any authenticated user to insert/read their own messages
-- (existing policies may need updating — drop and recreate cleanly)
DO $$ BEGIN
  -- Drop existing message policies if any
  DROP POLICY IF EXISTS "users can send messages" ON messages;
  DROP POLICY IF EXISTS "users can read own messages" ON messages;
  DROP POLICY IF EXISTS "Allow users to insert messages" ON messages;
  DROP POLICY IF EXISTS "Allow users to read messages" ON messages;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Ensure RLS is enabled
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can send a message" ON messages
  FOR INSERT TO authenticated WITH CHECK (sender_id = auth.uid());

CREATE POLICY "anyone can read their own messages" ON messages
  FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "sender can delete own message" ON messages
  FOR DELETE USING (sender_id = auth.uid());

-- ── Add online_at to profiles for presence ────────────────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS online_at TIMESTAMPTZ;
