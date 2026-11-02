CREATE TABLE public.heating_maintenance_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  building_id UUID NOT NULL,
  maintenance_date DATE NOT NULL,
  company_name TEXT,
  notes TEXT,
  document_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.heating_maintenance_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view heating logs"
  ON public.heating_maintenance_logs FOR SELECT USING (true);
CREATE POLICY "Public can insert heating logs"
  ON public.heating_maintenance_logs FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update heating logs"
  ON public.heating_maintenance_logs FOR UPDATE USING (true);
CREATE POLICY "Public can delete heating logs"
  ON public.heating_maintenance_logs FOR DELETE USING (true);

CREATE INDEX idx_heating_logs_building ON public.heating_maintenance_logs(building_id, maintenance_date DESC);

CREATE TRIGGER set_heating_logs_updated_at
  BEFORE UPDATE ON public.heating_maintenance_logs
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();