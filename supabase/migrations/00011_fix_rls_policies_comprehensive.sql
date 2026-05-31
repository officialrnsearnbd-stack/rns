
-- ── 1. MESSAGES: drop old conflicting mutual-follows INSERT policy ──────────
DROP POLICY IF EXISTS "Users can send messages to mutual follows" ON messages;

-- Keep "anyone can send a message" (sender_id = auth.uid())
-- Add UPDATE policy so receiver can mark messages as seen
DROP POLICY IF EXISTS "receiver can mark message seen" ON messages;
CREATE POLICY "receiver can mark message seen" ON messages
  FOR UPDATE USING (receiver_id = auth.uid())
  WITH CHECK (receiver_id = auth.uid());

-- ── 2. NOTIFICATIONS: add INSERT so app can create notifications ──────────
DROP POLICY IF EXISTS "Authenticated users can create notifications" ON notifications;
CREATE POLICY "Authenticated users can create notifications" ON notifications
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Add DELETE so users can clear their own notifications
DROP POLICY IF EXISTS "Users can delete own notifications" ON notifications;
CREATE POLICY "Users can delete own notifications" ON notifications
  FOR DELETE USING (user_id = auth.uid());

-- Add UPDATE so notifications can be marked as read
DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (user_id = auth.uid());

-- ── 3. POSTS: add UPDATE + DELETE for post owners ─────────────────────────
DROP POLICY IF EXISTS "Users can update own posts" ON posts;
CREATE POLICY "Users can update own posts" ON posts
  FOR UPDATE USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

DROP POLICY IF EXISTS "Users can delete own posts" ON posts;
CREATE POLICY "Users can delete own posts" ON posts
  FOR DELETE USING (owner_id = auth.uid());

-- ── 4. BLOCKS: drop duplicate policy ─────────────────────────────────────
DROP POLICY IF EXISTS "users can manage own blocks" ON blocks;
-- Keep "users_manage_own_blocks" which has proper with_check

-- ── 5. COMMENTS: add INSERT + DELETE policies for authenticated users ──────
DROP POLICY IF EXISTS "Authenticated users can add comments" ON comments;
CREATE POLICY "Authenticated users can add comments" ON comments
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- "Users can manage own comments" covers UPDATE/DELETE for owner
-- Ensure it covers DELETE too (cmd=ALL means all operations)

-- ── 6. FOLLOWS: ensure notifications can be inserted for follow events ─────
-- Already handled by notifications INSERT policy above

-- ── 7. PROFILES: ensure INSERT for new user signup ─────────────────────────
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
