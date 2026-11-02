import jsPDF from "jspdf";
import type { BuildingRow } from "./buildings";
import type { NAField } from "@/types/building";
import type {
  AccessInfo,
  AccountingInfo,
  AttestationInfo,
  ElevatorInfo,
  HeatingInfo,
  TechnicalInfo,
  YesNoDateField,
} from "@/types/buildingSections";

export type ExportSectionKey =
  | "infos"
  | "accounting"
  | "elevator"
  | "access"
  | "heating"
  | "attestation"
  | "technical";

export const EXPORT_SECTIONS: { key: ExportSectionKey; label: string }[] = [
  { key: "infos", label: "Informations de base" },
  { key: "accounting", label: "Comptabilité" },
  { key: "elevator", label: "Ascenseur" },
  { key: "access", label: "Accès" },
  { key: "heating", label: "Chauffage" },
  { key: "attestation", label: "Attestation" },
  { key: "technical", label: "Technique" },
];

const fmtField = (f?: NAField): string => {
  if (!f) return "—";
  if (f.status === "not_applicable") return "Non applicable";
  if (f.status === "not_available") return "Information non disponible";
  return f.value?.toString().trim() || "—";
};

const fmtYesNo = (v: string): string => (v === "yes" ? "Oui" : v === "no" ? "Non" : "—");

const fmtYesNoField = (f: { status: NAField["status"]; value: string }): string => {
  if (f.status === "not_applicable") return "Non applicable";
  if (f.status === "not_available") return "Information non disponible";
  return fmtYesNo(f.value);
};

const fmtYesNoDate = (f: YesNoDateField): string => {
  const base = fmtYesNoField(f);
  if (f.value === "yes" && f.date) return `${base} (${f.date})`;
  return base;
};

interface Row {
  label: string;
  value: string;
}

const buildInfosRows = (b: BuildingRow): Row[] => {
  const i = b.basic_info;
  return [
    { label: "Nom", value: fmtField(i.name) },
    { label: "Adresse", value: fmtField(i.address) },
    { label: "Date de construction", value: fmtField(i.constructionDate) },
    { label: "Gestionnaire", value: fmtField(i.manager) },
    { label: "Concierges", value: fmtField(i.concierges) },
    { label: "Nombre d'appartements", value: fmtField(i.numberOfApartments) },
    { label: "Nombre d'étages", value: fmtField(i.numberOfFloors) },
    { label: "Référence cadastrale", value: fmtField(i.cadastralReference) },
    { label: "Notes", value: fmtField(i.notes) },
  ];
};

const buildAccountingRows = (a: AccountingInfo): Row[] => [
  { label: "Comptable", value: fmtField(a.accountantName) },
  { label: "Périodicité", value: fmtField(a.periodicity) },
  { label: "Dernier décompte", value: fmtField(a.lastStatementDate) },
  { label: "Dernier appel de provision (date)", value: fmtField(a.lastProvisionCallDate) },
  { label: "Dernier appel de provision (montant)", value: fmtField(a.lastProvisionCallAmount) },
  { label: "Dernier appel fonds de réserve (date)", value: fmtField(a.lastReserveFundCallDate) },
  { label: "Dernier appel fonds de réserve (montant)", value: fmtField(a.lastReserveFundCallAmount) },
  { label: "Dernier appel extraordinaire (date)", value: fmtField(a.lastExtraordinaryCallDate) },
  { label: "Dernier appel extraordinaire (montant)", value: fmtField(a.lastExtraordinaryCallAmount) },
  { label: "Dernier budget approuvé", value: fmtField(a.lastApprovedBudget) },
  { label: "Vérificateur aux comptes", value: fmtField(a.auditorName) },
];

const buildElevatorRows = (e: ElevatorInfo): Row[] => {
  const rows: Row[] = [
    { label: "Nombre d'ascenseurs", value: fmtField(e.count) },
    { label: "Société de maintenance", value: fmtField(e.maintenanceCompanyName) },
    { label: "Email maintenance", value: fmtField(e.maintenanceCompanyEmail) },
    { label: "Téléphone maintenance", value: fmtField(e.maintenanceCompanyPhone) },
    { label: "Téléphone urgence", value: fmtField(e.maintenanceCompanyEmergencyPhone) },
    { label: "Société de contrôle", value: fmtField(e.inspectionCompany) },
  ];
  (e.units ?? []).forEach((u, idx) => {
    rows.push({ label: `--- Ascenseur ${idx + 1} ---`, value: "" });
    rows.push({ label: "  Marque", value: fmtField(u.brand) });
    rows.push({ label: "  Modèle", value: fmtField(u.model) });
    rows.push({ label: "  N° série", value: fmtField(u.serialNumber) });
    rows.push({ label: "  Année mise en service", value: fmtField(u.commissioningYear) });
    rows.push({ label: "  Capacité", value: fmtField(u.capacity) });
    rows.push({ label: "  Étages desservis", value: fmtField(u.floorsServed) });
    rows.push({ label: "  Emplacement", value: fmtField(u.location) });
    rows.push({ label: "  Accès lié", value: fmtField(u.linkedAccess) });
    rows.push({ label: "  Commentaires", value: fmtField(u.comments) });
  });
  return rows;
};

const buildAccessRows = (a: AccessInfo): Row[] => {
  const rows: Row[] = [
    { label: "Nombre d'accès", value: fmtField(a.accessCount) },
    { label: "Carte de reproduction de clé", value: fmtYesNoField(a.keyReproductionCard) },
    { label: "Badge d'accès", value: fmtYesNoField(a.accessBadge) },
    { label: "Télécommandes", value: fmtYesNoField(a.remoteControls) },
    { label: "Personne de contact", value: fmtField(a.contactPerson) },
  ];
  (a.units ?? []).forEach((u, idx) => {
    rows.push({ label: `--- Accès ${idx + 1} ---`, value: "" });
    rows.push({ label: "  Nom", value: fmtField(u.name) });
    rows.push({ label: "  Lots liés", value: fmtField(u.linkedLots) });
    rows.push({ label: "  Commentaires", value: fmtField(u.comments) });
  });
  return rows;
};

const buildHeatingRows = (h: HeatingInfo): Row[] => [
  { label: "Nombre d'équipements", value: fmtField(h.equipmentCount) },
  { label: "Type de chauffage", value: fmtField(h.heatingType) },
  { label: "Société de maintenance", value: fmtField(h.maintenanceCompanyName) },
  { label: "Email", value: fmtField(h.maintenanceCompanyEmail) },
  { label: "Téléphone", value: fmtField(h.maintenanceCompanyPhone) },
  { label: "Téléphone urgence", value: fmtField(h.maintenanceCompanyEmergencyPhone) },
  { label: "Dernier entretien", value: fmtField(h.lastMaintenanceDate) },
  { label: "Fréquence d'entretien", value: fmtField(h.maintenanceFrequency) },
];

const buildAttestationRows = (a: AttestationInfo): Row[] => [
  { label: "Analyse de risque ascenseur", value: fmtField(a.elevatorRiskAnalysisDate) },
  { label: "Inspection périodique ascenseur", value: fmtField(a.elevatorPeriodicInspectionDate) },
  { label: "Permis d'environnement", value: fmtYesNoDate(a.environmentPermit) },
  { label: "Conformité électrique", value: fmtField(a.electricalConformityDate) },
  { label: "Entretien chaudière", value: fmtYesNoDate(a.boilerMaintenance) },
];

const buildTechnicalRows = (t: TechnicalInfo): Row[] => {
  const rows: Row[] = [
    { label: "Boîte à clés", value: fmtYesNoField(t.keyBox) },
    { label: "  Code", value: fmtField(t.keyBoxCode) },
    { label: "  Emplacement", value: fmtField(t.keyBoxLocation) },
    { label: "  Commentaire", value: fmtField(t.keyBoxComment) },
    { label: "Compteurs de passage", value: fmtYesNo(t.passageMeters.value) },
    { label: "Extincteurs", value: fmtYesNoField(t.fireExtinguishers) },
    { label: "Porte de garage", value: fmtYesNoField(t.garageDoor) },
    { label: "  Société porte garage", value: fmtField(t.garageDoorCompany) },
    { label: "Adoucisseur", value: fmtYesNoField(t.waterSoftener) },
    { label: "  Société entretien adoucisseur", value: fmtField(t.waterSoftenerMaintenanceCompany) },
    { label: "  Société sel", value: fmtField(t.waterSoftenerSaltCompany) },
    { label: "Éclairage de secours", value: fmtYesNoField(t.emergencyLighting) },
    { label: "Exutoire de fumée", value: fmtYesNoField(t.smokeVent) },
    { label: "Dévidoir", value: fmtYesNoField(t.hoseReel) },
    { label: "Pompe de relevage", value: fmtYesNoField(t.liftPump) },
    { label: "Surpresseur", value: fmtYesNoField(t.pressureBooster) },
    { label: "Caméras", value: fmtYesNoField(t.cameras) },
    { label: "  Commentaire caméras", value: fmtField(t.camerasComment) },
    { label: "Panneaux solaires", value: fmtYesNoField(t.solarPanels) },
    { label: "Pompe à chaleur", value: fmtYesNoField(t.heatPump) },
    { label: "Cogénération", value: fmtYesNoField(t.cogeneration) },
    { label: "Compteur de passage eau", value: fmtYesNoField(t.waterPassageMeter) },
    { label: "Compteur de passage électricité", value: fmtYesNoField(t.electricityPassageMeter) },
    { label: "Ascenseur à voiture", value: fmtYesNoField(t.carElevator) },
    { label: "Bornes de recharge", value: fmtYesNoField(t.chargingStations) },
    { label: "Location partielle du bâtiment", value: fmtYesNoField(t.partialRental) },
    { label: "Installation PMR", value: fmtYesNoField(t.pmrInstallation) },
    { label: "Piscine", value: fmtYesNoField(t.pool) },
    { label: "Sauna", value: fmtYesNoField(t.sauna) },
    { label: "Local vélo", value: fmtYesNoField(t.bikeRoom) },
    { label: "Local poubelle", value: fmtYesNoField(t.trashRoom) },
    { label: "Autre local technique", value: fmtYesNoField(t.otherTechnicalRoom) },
    { label: "Barrière d'accès", value: fmtYesNoField(t.accessBarrier) },
    {
      label: "Équipe de nettoyage",
      value:
        t.cleaningTeam.status === "not_applicable"
          ? "Non applicable"
          : t.cleaningTeam.status === "not_available"
          ? "Information non disponible"
          : t.cleaningTeam.type
          ? `${t.cleaningTeam.type === "owner" ? "Propriétaire" : "Société"} — ${t.cleaningTeam.name || "—"}`
          : "—",
    },
  ];
  return rows;
};

const sectionRows = (b: BuildingRow, key: ExportSectionKey): Row[] => {
  switch (key) {
    case "infos": return buildInfosRows(b);
    case "accounting": return buildAccountingRows(b.sections.accounting);
    case "elevator": return buildElevatorRows(b.sections.elevator);
    case "access": return buildAccessRows(b.sections.access);
    case "heating": return buildHeatingRows(b.sections.heating);
    case "attestation": return buildAttestationRows(b.sections.attestation);
    case "technical": return buildTechnicalRows(b.sections.technical);
  }
};

export const exportBuildingToPdf = (b: BuildingRow, selected: ExportSectionKey[]): void => {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 40;
  const labelW = 220;
  const valueW = pageW - margin * 2 - labelW - 10;

  const sections = EXPORT_SECTIONS.filter((s) => selected.includes(s.key));

  sections.forEach((section, sIdx) => {
    if (sIdx > 0) doc.addPage();

    // Header
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(b.name, margin, 30);

    doc.setFontSize(18);
    doc.setTextColor(20);
    doc.text(section.label, margin, 70);

    doc.setDrawColor(200);
    doc.line(margin, 80, pageW - margin, 80);

    let y = 105;
    const rows = sectionRows(b, section.key);

    doc.setFontSize(10);
    rows.forEach((row) => {
      const isHeader = row.label.startsWith("---");
      doc.setFont("helvetica", isHeader ? "bold" : "normal");
      doc.setTextColor(isHeader ? 20 : 80);

      const labelLines = doc.splitTextToSize(row.label, labelW);
      const valueLines = row.value ? doc.splitTextToSize(row.value, valueW) : [""];
      const lineH = 13;
      const rowH = Math.max(labelLines.length, valueLines.length) * lineH + 4;

      if (y + rowH > pageH - margin) {
        doc.addPage();
        y = margin + 10;
      }

      doc.text(labelLines, margin, y);
      doc.setTextColor(20);
      doc.setFont("helvetica", "normal");
      doc.text(valueLines, margin + labelW + 10, y);

      y += rowH;
    });

    // Footer page number
    const totalPages = doc.getNumberOfPages();
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(
      `Page ${totalPages}`,
      pageW - margin,
      pageH - 20,
      { align: "right" },
    );
  });

  const safeName = b.name.replace(/[^a-z0-9-_]+/gi, "_");
  doc.save(`${safeName}_extract.pdf`);
};
