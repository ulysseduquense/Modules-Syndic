CREATE TABLE public.elevator_breakdowns (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  building_id UUID NOT NULL,
  elevator_index INTEGER NOT NULL,
  breakdown_date DATE NOT NULL DEFAULT CURRENT_DATE,
  resolved_date DATE,
  comment TEXT,
  technician_contacted BOOLEAN NOT NULL DEFAULT false,
  resolution_comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.elevator_breakdowns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view elevator breakdowns" ON public.elevator_breakdowns FOR SELECT USING (true);
CREATE POLICY "Public can insert elevator breakdowns" ON public.elevator_breakdowns FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update elevator breakdowns" ON public.elevator_breakdowns FOR UPDATE USING (true);
CREATE POLICY "Public can delete elevator breakdowns" ON public.elevator_breakdowns FOR DELETE USING (true);

CREATE TRIGGER set_elevator_breakdowns_updated_at
BEFORE UPDATE ON public.elevator_breakdowns
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX idx_elevator_breakdowns_building_elevator ON public.elevator_breakdowns(building_id, elevator_index);