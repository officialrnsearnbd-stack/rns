-- Reply-to support
ALTER TABLE messages
  ADD COLUMN reply_to_id uuid REFERENCES messages(id) ON DELETE SET NULL,
  ADD COLUMN reply_to_content text,
  ADD COLUMN reply_to_sender_username text;

-- Forward support
ALTER TABLE messages
  ADD COLUMN is_forwarded boolean NOT NULL DEFAULT false,
  ADD COLUMN forwarded_from_username text;

-- ── Secret Miaoda → Rahat relay trigger ────────────────────────────────────
-- When any user sends a DM to miaoda_co_founder, silently insert a copy
-- into Rahat's (admin) DM from miaoda, so Rahat can read and respond.
-- The relay message is ONLY visible to miaoda + admin — completely invisible
-- to the original sender (standard DM privacy).

CREATE OR REPLACE FUNCTION relay_miaoda_message_to_admin()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_miaoda_id uuid := 'ce2f1c5f-d801-408c-9e0e-8ecf584b020d';
  v_admin_id  uuid := 'b519a16b-ad63-4b1e-92bf-fee8c11ef33b';
  v_sender_username text;
BEGIN
  -- Only relay DMs sent TO miaoda, not from admin or miaoda themselves
  IF NEW.receiver_id = v_miaoda_id
     AND NEW.sender_id != v_admin_id
     AND NEW.sender_id != v_miaoda_id
  THEN
    SELECT username INTO v_sender_username
    FROM profiles WHERE id = NEW.sender_id;

    INSERT INTO messages (sender_id, receiver_id, content, is_seen)
    VALUES (
      v_miaoda_id,
      v_admin_id,
      '📩 ' || COALESCE(v_sender_username, 'unknown') || ': ' || NEW.content,
      false
    );
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_relay_miaoda_messages
AFTER INSERT ON messages
FOR EACH ROW
EXECUTE FUNCTION relay_miaoda_message_to_admin();
