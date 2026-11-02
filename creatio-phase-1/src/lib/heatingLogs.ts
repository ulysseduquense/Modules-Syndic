import { supabase } from "@/integrations/supabase/client";
import { uploadDocument, deleteDocument, type BuildingDocument } from "./buildingDocuments";

export interface HeatingLog {
  id: string;
  building_id: string;
  maintenance_date: string;
  company_name: string | null;
  notes: string | null;
  document_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface HeatingLogWithDoc extends HeatingLog {
  document: BuildingDocument | null;
}

export const listHeatingLogs = async (buildingId: string): Promise<HeatingLogWithDoc[]> => {
  const { data: logs, error } = await supabase
    .from("heating_maintenance_logs")
    .select("*")
    .eq("building_id", buildingId)
    .order("maintenance_date", { ascending: false });
  if (error) throw error;

  const docIds = (logs ?? []).map((l) => l.document_id).filter(Boolean) as string[];
  let docs: BuildingDocument[] = [];
  if (docIds.length) {
    const { data, error: dErr } = await supabase
      .from("building_documents")
      .select("*")
      .in("id", docIds);
    if (dErr) throw dErr;
    docs = (data ?? []) as BuildingDocument[];
  }
  const byId = new Map(docs.map((d) => [d.id, d]));
  return (logs ?? []).map((l) => ({
    ...(l as HeatingLog),
    document: l.document_id ? byId.get(l.document_id) ?? null : null,
  }));
};

export const createHeatingLog = async (params: {
  buildingId: string;
  maintenanceDate: string;
  companyName?: string | null;
  notes?: string | null;
  file?: File | null;
}): Promise<HeatingLog> => {
  let documentId: string | null = null;
  if (params.file) {
    const doc = await uploadDocument({
      buildingId: params.buildingId,
      section: "heating",
      label: `maintenance_log:${params.maintenanceDate}`,
      file: params.file,
    });
    documentId = doc.id;
  }
  const { data, error } = await supabase
    .from("heating_maintenance_logs")
    .insert([
      {
        building_id: params.buildingId,
        maintenance_date: params.maintenanceDate,
        company_name: params.companyName ?? null,
        notes: params.notes ?? null,
        document_id: documentId,
      },
    ])
    .select()
    .single();
  if (error) throw error;
  return data as HeatingLog;
};

export const deleteHeatingLog = async (log: HeatingLogWithDoc): Promise<void> => {
  if (log.document) {
    try {
      await deleteDocument(log.document);
    } catch {
      // ignore, continue deleting log
    }
  }
  const { error } = await supabase
    .from("heating_maintenance_logs")
    .delete()
    .eq("id", log.id);
  if (error) throw error;
};
