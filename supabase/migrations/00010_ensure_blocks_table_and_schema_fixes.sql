
-- ── Blocks table ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blocker_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  blocked_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(blocker_id, blocked_id)
);

ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;

-- Policies (IF NOT EXISTS pattern via DO block)
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies WHERE tablename='blocks' AND policyname='users can manage own blocks'
  ) THEN
    CREATE POLICY "users can manage own blocks" ON blocks
      FOR ALL USING (blocker_id = auth.uid());
  END IF;
END $$;

-- ── online_at on profiles (already added but ensure) ─────────────────────
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS online_at TIMESTAMPTZ;

-- ── Ensure messages has is_seen ──────────────────────────────────────────
ALTER TABLE messages ADD COLUMN IF NOT EXISTS is_seen BOOLEAN DEFAULT FALSE;

-- ── Enable realtime on messages (for unread badge) ──────────────────────
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE messages;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- ── Ensure friendships realtime already added ───────────────────────────
DO $$ BEGIN
  ALTER PUBLICATION supabase_realtime ADD TABLE friendships;
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;
