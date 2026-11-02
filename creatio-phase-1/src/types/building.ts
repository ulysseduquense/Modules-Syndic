export type FieldStatus = "filled" | "not_applicable" | "not_available";

export interface NAField {
  value: string;
  status: FieldStatus;
}

export const emptyField = (): NAField => ({ value: "", status: "filled" });

export interface BuildingBasicInfo {
  name: NAField;
  address: NAField;
  constructionDate: NAField;
  manager: NAField;
  concierges: NAField;
  numberOfApartments: NAField;
  numberOfFloors: NAField;
  cadastralReference: NAField;
  notes: NAField;
}

export const emptyBuilding = (): BuildingBasicInfo => ({
  name: emptyField(),
  address: emptyField(),
  constructionDate: emptyField(),
  manager: emptyField(),
  concierges: emptyField(),
  numberOfApartments: emptyField(),
  numberOfFloors: emptyField(),
  cadastralReference: emptyField(),
  notes: emptyField(),
});
