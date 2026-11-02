CREATE TABLE public.statutes_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  building_id UUID NOT NULL,
  document_id UUID NOT NULL,
  display_name TEXT NOT NULL,
  extracted_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.statutes_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view statutes" ON public.statutes_documents FOR SELECT USING (true);
CREATE POLICY "Public can insert statutes" ON public.statutes_documents FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update statutes" ON public.statutes_documents FOR UPDATE USING (true);
CREATE POLICY "Public can delete statutes" ON public.statutes_documents FOR DELETE USING (true);

CREATE TRIGGER set_statutes_documents_updated_at
BEFORE UPDATE ON public.statutes_documents
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_statutes_documents_building ON public.statutes_documents(building_id);