import type { NAField } from "./building";

export const emptyField = (): NAField => ({ value: "", status: "filled" });

// ---------- Comptabilité ----------
export interface AccountingInfo {
  accountantName: NAField;
  periodicity: NAField;
  lastStatementDate: NAField;
  lastProvisionCallDate: NAField;
  lastProvisionCallAmount: NAField;
  lastReserveFundCallDate: NAField;
  lastReserveFundCallAmount: NAField;
  lastExtraordinaryCallDate: NAField;
  lastExtraordinaryCallAmount: NAField;
  lastApprovedBudget: NAField;
  auditorName: NAField;
}

export const emptyAccounting = (): AccountingInfo => ({
  accountantName: emptyField(),
  periodicity: emptyField(),
  lastStatementDate: emptyField(),
  lastProvisionCallDate: emptyField(),
  lastProvisionCallAmount: emptyField(),
  lastReserveFundCallDate: emptyField(),
  lastReserveFundCallAmount: emptyField(),
  lastExtraordinaryCallDate: emptyField(),
  lastExtraordinaryCallAmount: emptyField(),
  lastApprovedBudget: emptyField(),
  auditorName: emptyField(),
});

// ---------- Ascenseur ----------
export interface ElevatorUnit {
  brand: NAField;
  model: NAField;
  serialNumber: NAField;
  commissioningYear: NAField;
  capacity: NAField;
  floorsServed: NAField;
  location: NAField;
  linkedAccess: NAField;
  comments: NAField;
}

export const emptyElevatorUnit = (): ElevatorUnit => ({
  brand: emptyField(),
  model: emptyField(),
  serialNumber: emptyField(),
  commissioningYear: emptyField(),
  capacity: emptyField(),
  floorsServed: emptyField(),
  location: emptyField(),
  linkedAccess: emptyField(),
  comments: emptyField(),
});

export interface ElevatorInfo {
  count: NAField;
  maintenanceCompanyName: NAField;
  maintenanceCompanyEmail: NAField;
  maintenanceCompanyPhone: NAField;
  maintenanceCompanyEmergencyPhone: NAField;
  inspectionCompany: NAField;
  units?: ElevatorUnit[];
}

export const emptyElevator = (): ElevatorInfo => ({
  count: emptyField(),
  maintenanceCompanyName: emptyField(),
  maintenanceCompanyEmail: emptyField(),
  maintenanceCompanyPhone: emptyField(),
  maintenanceCompanyEmergencyPhone: emptyField(),
  inspectionCompany: emptyField(),
  units: [],
});

// ---------- Accès ----------
export type YesNo = "yes" | "no" | "";

export interface AccessUnit {
  name: NAField;
  linkedLots: NAField;
  comments: NAField;
}

export const emptyAccessUnit = (): AccessUnit => ({
  name: emptyField(),
  linkedLots: emptyField(),
  comments: emptyField(),
});

export interface AccessInfo {
  accessCount: NAField;
  keyReproductionCard: { status: NAField["status"]; value: YesNo };
  accessBadge: { status: NAField["status"]; value: YesNo };
  remoteControls: { status: NAField["status"]; value: YesNo };
  contactPerson: NAField;
  units?: AccessUnit[];
}

export const emptyAccess = (): AccessInfo => ({
  accessCount: emptyField(),
  keyReproductionCard: { status: "filled", value: "" },
  accessBadge: { status: "filled", value: "" },
  remoteControls: { status: "filled", value: "" },
  contactPerson: emptyField(),
  units: [],
});

// ---------- Chauffage ----------
export interface HeatingInfo {
  equipmentCount: NAField;
  heatingType: NAField;
  maintenanceCompanyName: NAField;
  maintenanceCompanyEmail: NAField;
  maintenanceCompanyPhone: NAField;
  maintenanceCompanyEmergencyPhone: NAField;
  lastMaintenanceDate: NAField;
  maintenanceFrequency: NAField;
}

export const emptyHeating = (): HeatingInfo => ({
  equipmentCount: emptyField(),
  heatingType: emptyField(),
  maintenanceCompanyName: emptyField(),
  maintenanceCompanyEmail: emptyField(),
  maintenanceCompanyPhone: emptyField(),
  maintenanceCompanyEmergencyPhone: emptyField(),
  lastMaintenanceDate: emptyField(),
  maintenanceFrequency: emptyField(),
});

// ---------- Attestation ----------
/** Date field (ISO yyyy-mm-dd) with NA/ND status. */
export type DateField = NAField;

/** Yes/No + optional date (yyyy-mm-dd) + NA/ND. */
export interface YesNoDateField {
  status: NAField["status"];
  value: YesNo;
  date: string;
}

export const emptyYesNoDate = (): YesNoDateField => ({
  status: "filled",
  value: "",
  date: "",
});

export interface AttestationInfo {
  elevatorRiskAnalysisDate: DateField;
  elevatorPeriodicInspectionDate: DateField;
  environmentPermit: YesNoDateField;
  electricalConformityDate: DateField;
  boilerMaintenance: YesNoDateField;
}

export const emptyAttestation = (): AttestationInfo => ({
  elevatorRiskAnalysisDate: emptyField(),
  elevatorPeriodicInspectionDate: emptyField(),
  environmentPermit: emptyYesNoDate(),
  electricalConformityDate: emptyField(),
  boilerMaintenance: emptyYesNoDate(),
});

// ---------- Technique ----------

export type YesNoField = { status: NAField["status"]; value: YesNo };

export const emptyYesNo = (): YesNoField => ({ status: "filled", value: "" });

export interface PassageMeter {
  id: string;
  number: string;
  /** "apartment" | "common" | "concierge" | "other" */
  linkType: "apartment" | "common" | "concierge" | "other" | "";
  linkDetail: string;
}

export const emptyPassageMeter = (): PassageMeter => ({
  id: "",
  number: "",
  linkType: "",
  linkDetail: "",
});

export type MonthIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

export interface PassageMetersInfo {
  status: NAField["status"];
  /** "yes" | "no" | "" */
  value: YesNo;
  meters: PassageMeter[];
  /** months selected for readings, 0-11 */
  readingMonths: MonthIndex[];
}

export const emptyPassageMeters = (): PassageMetersInfo => ({
  status: "filled",
  value: "",
  meters: [],
  readingMonths: [],
});

/** "owner" | "company" | "" */
export type CleaningTeamType = "owner" | "company" | "";

export interface CleaningTeamInfo {
  status: NAField["status"];
  type: CleaningTeamType;
  /** Owner name (if type=owner) or company name (if type=company). */
  name: string;
}

export const emptyCleaningTeam = (): CleaningTeamInfo => ({
  status: "filled",
  type: "",
  name: "",
});

export interface TechnicalInfo {
  keyBox: YesNoField;
  keyBoxCode: NAField;
  keyBoxLocation: NAField;
  keyBoxComment: NAField;
  passageMeters: PassageMetersInfo;
  fireExtinguishers: YesNoField;
  garageDoor: YesNoField;
  garageDoorCompany: NAField;
  waterSoftener: YesNoField;
  waterSoftenerMaintenanceCompany: NAField;
  waterSoftenerSaltCompany: NAField;
  emergencyLighting: YesNoField;
  smokeVent: YesNoField;
  hoseReel: YesNoField;
  liftPump: YesNoField;
  pressureBooster: YesNoField;
  cameras: YesNoField;
  camerasComment: NAField;
  solarPanels: YesNoField;
  heatPump: YesNoField;
  cogeneration: YesNoField;
  waterPassageMeter: YesNoField;
  electricityPassageMeter: YesNoField;
  carElevator: YesNoField;
  chargingStations: YesNoField;
  partialRental: YesNoField;
  pmrInstallation: YesNoField;
  pool: YesNoField;
  sauna: YesNoField;
  bikeRoom: YesNoField;
  trashRoom: YesNoField;
  otherTechnicalRoom: YesNoField;
  accessBarrier: YesNoField;
  cleaningTeam: CleaningTeamInfo;
}

export const emptyTechnical = (): TechnicalInfo => ({
  keyBox: emptyYesNo(),
  keyBoxCode: emptyField(),
  keyBoxLocation: emptyField(),
  keyBoxComment: emptyField(),
  passageMeters: emptyPassageMeters(),
  fireExtinguishers: emptyYesNo(),
  garageDoor: emptyYesNo(),
  garageDoorCompany: emptyField(),
  waterSoftener: emptyYesNo(),
  waterSoftenerMaintenanceCompany: emptyField(),
  waterSoftenerSaltCompany: emptyField(),
  emergencyLighting: emptyYesNo(),
  smokeVent: emptyYesNo(),
  hoseReel: emptyYesNo(),
  liftPump: emptyYesNo(),
  pressureBooster: emptyYesNo(),
  cameras: emptyYesNo(),
  camerasComment: emptyField(),
  solarPanels: emptyYesNo(),
  heatPump: emptyYesNo(),
  cogeneration: emptyYesNo(),
  waterPassageMeter: emptyYesNo(),
  electricityPassageMeter: emptyYesNo(),
  carElevator: emptyYesNo(),
  chargingStations: emptyYesNo(),
  partialRental: emptyYesNo(),
  pmrInstallation: emptyYesNo(),
  pool: emptyYesNo(),
  sauna: emptyYesNo(),
  bikeRoom: emptyYesNo(),
  trashRoom: emptyYesNo(),
  otherTechnicalRoom: emptyYesNo(),
  accessBarrier: emptyYesNo(),
  cleaningTeam: emptyCleaningTeam(),
});

export type SectionKey = "accounting" | "elevator" | "access" | "heating" | "attestation" | "technical";

