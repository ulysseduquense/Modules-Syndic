-- Table to track uploaded documents per building/section
CREATE TABLE public.building_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  building_id UUID NOT NULL REFERENCES public.buildings(id) ON DELETE CASCADE,
  section TEXT NOT NULL,
  label TEXT,
  file_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_building_documents_building_section
  ON public.building_documents(building_id, section);

ALTER TABLE public.building_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view building documents"
  ON public.building_documents FOR SELECT USING (true);
CREATE POLICY "Public can insert building documents"
  ON public.building_documents FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update building documents"
  ON public.building_documents FOR UPDATE USING (true);
CREATE POLICY "Public can delete building documents"
  ON public.building_documents FOR DELETE USING (true);

CREATE TRIGGER trg_building_documents_updated_at
  BEFORE UPDATE ON public.building_documents
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Storage bucket (private)
INSERT INTO storage.buckets (id, name, public)
VALUES ('building-documents', 'building-documents', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view building doc files"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'building-documents');
CREATE POLICY "Public can upload building doc files"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'building-documents');
CREATE POLICY "Public can update building doc files"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'building-documents');
CREATE POLICY "Public can delete building doc files"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'building-documents');