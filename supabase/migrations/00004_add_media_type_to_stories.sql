
ALTER TABLE stories
  ADD COLUMN media_type text NOT NULL DEFAULT 'image' CHECK (media_type IN ('image', 'video')),
  ADD COLUMN media_url text;

-- For existing rows, copy image_url to media_url so both fields are populated
UPDATE stories SET media_url = image_url WHERE media_url IS NULL;
