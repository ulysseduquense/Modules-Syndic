import { supabase } from "@/integrations/supabase/client";

export interface BuildingDocument {
  id: string;
  building_id: string;
  section: string;
  label: string | null;
  file_path: string;
  file_name: string;
  created_at: string;
  updated_at: string;
}

const BUCKET = "building-documents";

export const listDocuments = async (
  buildingId: string,
  section?: string,
): Promise<BuildingDocument[]> => {
  let q = supabase
    .from("building_documents")
    .select("*")
    .eq("building_id", buildingId)
    .order("created_at", { ascending: false });
  if (section) q = q.eq("section", section);
  const { data, error } = await q;
  if (error) throw error;
  return (data ?? []) as BuildingDocument[];
};

export const uploadDocument = async (params: {
  buildingId: string;
  section: string;
  label?: string | null;
  file: File;
}): Promise<BuildingDocument> => {
  const { buildingId, section, label, file } = params;
  const safeName = file.name.replace(/[^\w.\-]+/g, "_");
  const path = `${buildingId}/${section}/${Date.now()}_${safeName}`;
  const { error: upErr } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { contentType: file.type || "application/pdf" });
  if (upErr) throw upErr;

  const { data, error } = await supabase
    .from("building_documents")
    .insert([
      {
        building_id: buildingId,
        section,
        label: label ?? null,
        file_path: path,
        file_name: file.name,
      },
    ])
    .select()
    .single();
  if (error) throw error;
  return data as BuildingDocument;
};

export const getDocumentSignedUrl = async (path: string): Promise<string> => {
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(path, 60 * 10);
  if (error) throw error;
  return data.signedUrl;
};

export const deleteDocument = async (doc: BuildingDocument): Promise<void> => {
  await supabase.storage.from(BUCKET).remove([doc.file_path]);
  const { error } = await supabase.from("building_documents").delete().eq("id", doc.id);
  if (error) throw error;
};
