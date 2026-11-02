import { supabase } from "@/integrations/supabase/client";

export interface ElevatorBreakdown {
  id: string;
  building_id: string;
  elevator_index: number;
  breakdown_date: string;
  resolved_date: string | null;
  comment: string | null;
  technician_contacted: boolean;
  resolution_comment: string | null;
  created_at: string;
  updated_at: string;
}

export const listBreakdowns = async (buildingId: string, elevatorIndex: number): Promise<ElevatorBreakdown[]> => {
  const { data, error } = await supabase
    .from("elevator_breakdowns")
    .select("*")
    .eq("building_id", buildingId)
    .eq("elevator_index", elevatorIndex)
    .order("breakdown_date", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ElevatorBreakdown[];
};

export const createBreakdown = async (params: {
  buildingId: string;
  elevatorIndex: number;
  comment: string;
  technicianContacted: boolean;
}): Promise<ElevatorBreakdown> => {
  const { data, error } = await supabase
    .from("elevator_breakdowns")
    .insert([{
      building_id: params.buildingId,
      elevator_index: params.elevatorIndex,
      comment: params.comment,
      technician_contacted: params.technicianContacted,
    }])
    .select()
    .single();
  if (error) throw error;
  return data as ElevatorBreakdown;
};

export const resolveBreakdown = async (id: string, resolutionComment: string): Promise<ElevatorBreakdown> => {
  const { data, error } = await supabase
    .from("elevator_breakdowns")
    .update({
      resolved_date: new Date().toISOString().slice(0, 10),
      resolution_comment: resolutionComment,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as ElevatorBreakdown;
};

export const deleteBreakdown = async (id: string): Promise<void> => {
  const { error } = await supabase.from("elevator_breakdowns").delete().eq("id", id);
  if (error) throw error;
};
