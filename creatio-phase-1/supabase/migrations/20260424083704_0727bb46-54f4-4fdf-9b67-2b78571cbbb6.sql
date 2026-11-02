-- Table buildings : un immeuble par ligne, infos de base stockées en JSONB
-- pour garder la souplesse des statuts (filled / not_applicable / not_available).
CREATE TABLE public.buildings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL DEFAULT 'Sans nom',
  basic_info JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.buildings ENABLE ROW LEVEL SECURITY;

-- Accès libre : pas d'authentification requise
CREATE POLICY "Public can view buildings"
  ON public.buildings FOR SELECT
  USING (true);

CREATE POLICY "Public can insert buildings"
  ON public.buildings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Public can update buildings"
  ON public.buildings FOR UPDATE
  USING (true);

CREATE POLICY "Public can delete buildings"
  ON public.buildings FOR DELETE
  USING (true);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER buildings_set_updated_at
  BEFORE UPDATE ON public.buildings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX buildings_created_at_idx ON public.buildings (created_at DESC);