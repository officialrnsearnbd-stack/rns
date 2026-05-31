
-- Set password "Demo@RNS2025" for all demo users
-- bcrypt hash of "Demo@RNS2025"
UPDATE auth.users
SET encrypted_password = crypt('Demo@RNS2025', gen_salt('bf'))
WHERE id::text LIKE '00000001%';
