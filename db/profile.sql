DROP TABLE IF EXISTS profile cascade;

CREATE TABLE profile (
    id UUID UNIQUE REFERENCES auth.users(id),
    username VARCHAR(50) NOT NULL,
)

ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Only owner can update profile"
ON profile
FOR UPDATE
USING (id = current_setting('auth.uid')::uuid);

CREATE POLICY "Only owner can read profile"
ON profile
FOR SELECT
USING (id = current_setting('auth.uid')::uuid);

CREATE POLICY "Only owner can delete profile"
ON profile
FOR DELETE
USING (id = current_setting('auth.uid')::uuid);

CREATE POLICY "Only owner can insert profile"
ON profile
FOR INSERT
USING (id = current_setting('auth.uid')::uuid);

CREATE POLICY "Admin full access to profile"
ON profile
FOR ALL
USING (auth.role() = 'admin');