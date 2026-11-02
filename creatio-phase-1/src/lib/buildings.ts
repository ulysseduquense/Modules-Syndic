import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { emptyBuilding, type BuildingBasicInfo } from "@/types/building";
import {
  emptyAccess,
  emptyAccounting,
  emptyAttestation,
  emptyElevator,
  emptyHeating,
  emptyTechnical,
  type AccessInfo,
  type AccountingInfo,
  type AttestationInfo,
  type ElevatorInfo,
  type HeatingInfo,
  type TechnicalInfo,
  type SectionKey,
} from "@/types/buildingSections";

export interface BuildingSections {
  accounting: AccountingInfo;
  elevator: ElevatorInfo;
  access: AccessInfo;
  heating: HeatingInfo;
  attestation: AttestationInfo;
  technical: TechnicalInfo;
}

export const emptySections = (): BuildingSections => ({
  accounting: emptyAccounting(),
  elevator: emptyElevator(),
  access: emptyAccess(),
  heating: emptyHeating(),
  attestation: emptyAttestation(),
  technical: emptyTechnical(),
});

export interface BuildingRow {
  id: string;
  name: string;
  basic_info: BuildingBasicInfo;
  sections: BuildingSections;
  created_at: string;
  updated_at: string;
}

const SECTION_KEYS: SectionKey[] = ["accounting", "elevator", "access", "heating", "attestation", "technical"];

const extractSections = (raw: Record<string, unknown>): BuildingSections => {
  const base = emptySections();
  if (raw && typeof raw === "object") {
    if (raw.accounting && typeof raw.accounting === "object") {
      base.accounting = { ...base.accounting, ...(raw.accounting as Partial<AccountingInfo>) };
    }
    if (raw.elevator && typeof raw.elevator === "object") {
      base.elevator = { ...base.elevator, ...(raw.elevator as Partial<ElevatorInfo>) };
    }
    if (raw.access && typeof raw.access === "object") {
      base.access = { ...base.access, ...(raw.access as Partial<AccessInfo>) };
    }
    if (raw.heating && typeof raw.heating === "object") {
      base.heating = { ...base.heating, ...(raw.heating as Partial<HeatingInfo>) };
    }
    if (raw.attestation && typeof raw.attestation === "object") {
      base.attestation = { ...base.attestation, ...(raw.attestation as Partial<AttestationInfo>) };
    }
    if (raw.technical && typeof raw.technical === "object") {
      base.technical = { ...base.technical, ...(raw.technical as Partial<TechnicalInfo>) };
    }
  }
  return base;
};

const splitBasicInfo = (
  rawBasic: Record<string, unknown> | null | undefined,
): { basic: BuildingBasicInfo; sections: BuildingSections } => {
  const raw = (rawBasic ?? {}) as Record<string, unknown>;
  const sections = extractSections(raw);
  const basic = { ...emptyBuilding(), ...(raw as Partial<BuildingBasicInfo>) };
  // remove section keys from basic copy
  for (const k of SECTION_KEYS) delete (basic as Record<string, unknown>)[k];
  return { basic, sections };
};

const mergeForStorage = (basic: BuildingBasicInfo, sections: BuildingSections): Json =>
  ({ ...basic, ...sections }) as unknown as Json;

const deriveName = (info: BuildingBasicInfo): string => {
  if (info.name.status === "filled" && info.name.value.trim()) {
    return info.name.value.trim();
  }
  return "Sans nom";
};

const rowToBuilding = (row: { id: string; name: string; basic_info: Json | null; created_at: string; updated_at: string }): BuildingRow => {
  const { basic, sections } = splitBasicInfo(row.basic_info as Record<string, unknown> | null);
  return {
    id: row.id,
    name: row.name,
    basic_info: basic,
    sections,
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
};

export const listBuildings = async (): Promise<BuildingRow[]> => {
  const { data, error } = await supabase
    .from("buildings")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToBuilding);
};

export const getBuilding = async (id: string): Promise<BuildingRow | null> => {
  const { data, error } = await supabase.from("buildings").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return rowToBuilding(data);
};

export const createBuilding = async (info: BuildingBasicInfo): Promise<BuildingRow> => {
  const { data, error } = await supabase
    .from("buildings")
    .insert([{ name: deriveName(info), basic_info: mergeForStorage(info, emptySections()) }])
    .select()
    .single();
  if (error) throw error;
  return rowToBuilding(data);
};

export const updateBuildingBasicInfo = async (
  id: string,
  info: BuildingBasicInfo,
  sections: BuildingSections,
): Promise<BuildingRow> => {
  const { data, error } = await supabase
    .from("buildings")
    .update({ name: deriveName(info), basic_info: mergeForStorage(info, sections) })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return rowToBuilding(data);
};

export const updateBuildingSection = async <K extends SectionKey>(
  id: string,
  basic: BuildingBasicInfo,
  sections: BuildingSections,
  key: K,
  value: BuildingSections[K],
): Promise<BuildingRow> => {
  const next: BuildingSections = { ...sections, [key]: value };
  const { data, error } = await supabase
    .from("buildings")
    .update({ name: deriveName(basic), basic_info: mergeForStorage(basic, next) })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return rowToBuilding(data);
};

export const deleteBuilding = async (id: string): Promise<void> => {
  const { error } = await supabase.from("buildings").delete().eq("id", id);
  if (error) throw error;
};

