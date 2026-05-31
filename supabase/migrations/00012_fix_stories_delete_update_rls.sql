
-- Stories: owner can delete and update their own stories
CREATE POLICY "Users can delete own stories"
  ON stories FOR DELETE
  USING (owner_id = auth.uid());

CREATE POLICY "Users can update own stories"
  ON stories FOR UPDATE
  USING (owner_id = auth.uid())
  WITH CHECK (owner_id = auth.uid());

-- group_chats: creator can update/delete their group
CREATE POLICY "creator can update group"
  ON group_chats FOR UPDATE
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "creator can delete group"
  ON group_chats FOR DELETE
  USING (created_by = auth.uid());

-- blocks: guard against duplicate insert using ON CONFLICT DO NOTHING at app layer
-- Make sure blocks has a unique constraint (already confirmed: blocks_blocker_id_blocked_id_key)
-- Add SELECT policy so users can read their own blocks (for Profile.tsx bi-directional check)
CREATE POLICY "users_can_view_own_blocks"
  ON blocks FOR SELECT
  USING (blocker_id = auth.uid() OR blocked_id = auth.uid());
