-- Enable Row Level Security on entries table
ALTER TABLE public.entries ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone (public) to insert entries
CREATE POLICY "Allow public inserts" ON public.entries
FOR INSERT
TO public
WITH CHECK (true);

-- Create policy to allow anyone (public) to select entries
CREATE POLICY "Allow public selects" ON public.entries
FOR SELECT
TO public
USING (true);

-- Create policy to allow anyone (public) to update entries
CREATE POLICY "Allow public updates" ON public.entries
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Create policy to allow anyone (public) to delete entries
CREATE POLICY "Allow public deletes" ON public.entries
FOR DELETE
TO public
USING (true);

-- Add createdAt column to entries table if it does not exist
ALTER TABLE public.entries ADD COLUMN IF NOT EXISTS createdAt timestamptz DEFAULT now();
