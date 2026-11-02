
CREATE TABLE public.ag_meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id uuid NOT NULL UNIQUE,
  meeting_date date,
  document_id uuid,
  display_name text,
  extracted_text text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ag_meetings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view ag_meetings" ON public.ag_meetings FOR SELECT USING (true);
CREATE POLICY "Public can insert ag_meetings" ON public.ag_meetings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update ag_meetings" ON public.ag_meetings FOR UPDATE USING (true);
CREATE POLICY "Public can delete ag_meetings" ON public.ag_meetings FOR DELETE USING (true);

CREATE TRIGGER ag_meetings_set_updated_at
  BEFORE UPDATE ON public.ag_meetings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TABLE public.ag_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  building_id uuid NOT NULL,
  meeting_id uuid REFERENCES public.ag_meetings(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  done boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.ag_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view ag_tasks" ON public.ag_tasks FOR SELECT USING (true);
CREATE POLICY "Public can insert ag_tasks" ON public.ag_tasks FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can update ag_tasks" ON public.ag_tasks FOR UPDATE USING (true);
CREATE POLICY "Public can delete ag_tasks" ON public.ag_tasks FOR DELETE USING (true);

CREATE TRIGGER ag_tasks_set_updated_at
  BEFORE UPDATE ON public.ag_tasks
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX ag_tasks_building_idx ON public.ag_tasks(building_id);
CREATE INDEX ag_tasks_meeting_idx ON public.ag_tasks(meeting_id);
