
-- Group chats table
CREATE TABLE group_chats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Group members table
CREATE TABLE group_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES group_chats(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(group_id, user_id)
);

-- Group messages table
CREATE TABLE group_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID REFERENCES group_chats(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE group_chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_messages ENABLE ROW LEVEL SECURITY;

-- Helper: is user a member of a group?
CREATE OR REPLACE FUNCTION is_group_member(gid UUID)
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (SELECT 1 FROM group_members WHERE group_id = gid AND user_id = auth.uid());
$$;

-- Policies: group_chats
CREATE POLICY "members can view group" ON group_chats
  FOR SELECT USING (is_group_member(id));

CREATE POLICY "authenticated can create group" ON group_chats
  FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());

-- Policies: group_members
CREATE POLICY "members can view group members" ON group_members
  FOR SELECT USING (is_group_member(group_id));

CREATE POLICY "creator can add members" ON group_members
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM group_chats WHERE id = group_id AND created_by = auth.uid())
    OR user_id = auth.uid()
  );

CREATE POLICY "member can leave group" ON group_members
  FOR DELETE USING (user_id = auth.uid());

-- Policies: group_messages
CREATE POLICY "members can view messages" ON group_messages
  FOR SELECT USING (is_group_member(group_id));

CREATE POLICY "members can send messages" ON group_messages
  FOR INSERT TO authenticated WITH CHECK (
    sender_id = auth.uid() AND is_group_member(group_id)
  );

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE group_messages;
ALTER PUBLICATION supabase_realtime ADD TABLE group_members;
