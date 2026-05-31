-- Create post_type enum
CREATE TYPE post_type AS ENUM ('text', 'photo', 'video');

-- Create privacy enum
CREATE TYPE post_privacy AS ENUM ('public', 'friends_only');

-- Add new columns to posts table
ALTER TABLE posts
ADD COLUMN post_type post_type NOT NULL DEFAULT 'photo',
ADD COLUMN text_content text,
ADD COLUMN text_background_color text,
ADD COLUMN privacy post_privacy NOT NULL DEFAULT 'public',
ADD COLUMN is_draft boolean NOT NULL DEFAULT false;

-- Make image_url nullable since text posts don't need images
ALTER TABLE posts ALTER COLUMN image_url DROP NOT NULL;

-- Create videos storage bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('videos', 'videos', true);

-- Videos bucket policy: anyone authenticated can upload
CREATE POLICY "Authenticated users can upload videos"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'videos');

-- Videos bucket policy: anyone can view
CREATE POLICY "Anyone can view videos"
ON storage.objects FOR SELECT
USING (bucket_id = 'videos');

-- Videos bucket policy: owners can delete
CREATE POLICY "Owners can delete their videos"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'videos' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Add check constraint to ensure proper content based on post type
ALTER TABLE posts ADD CONSTRAINT check_post_content CHECK (
  (post_type = 'text' AND text_content IS NOT NULL) OR
  (post_type = 'photo' AND image_url IS NOT NULL) OR
  (post_type = 'video' AND image_url IS NOT NULL)
);
