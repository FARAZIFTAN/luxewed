-- Create RSVP table
CREATE TABLE rsvp (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  attendance TEXT NOT NULL CHECK (attendance IN ('yes', 'no', 'maybe')),
  guest_count INTEGER DEFAULT 1 CHECK (guest_count >= 1 AND guest_count <= 5),
  wishes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Wishes table
CREATE TABLE wishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE rsvp ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for rsvp (public can insert, everyone can read)
CREATE POLICY "select_rsvp_public" ON rsvp FOR SELECT
  TO anon, authenticated USING (true);

CREATE POLICY "insert_rsvp_public" ON rsvp FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- RLS Policies for wishes (public can insert, everyone can read)
CREATE POLICY "select_wishes_public" ON wishes FOR SELECT
  TO anon, authenticated USING (true);

CREATE POLICY "insert_wishes_public" ON wishes FOR INSERT
  TO anon, authenticated WITH CHECK (true);

-- Create index for better query performance
CREATE INDEX idx_rsvp_created_at ON rsvp(created_at DESC);
CREATE INDEX idx_wishes_created_at ON wishes(created_at DESC);