import { useId } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { FieldStatus } from "@/types/building";
import type { YesNo } from "@/types/buildingSections";
import { DocumentsList } from "./DocumentsList";

interface YesNoFieldWithDocProps {
  label: string;
  value: { status: FieldStatus; value: YesNo };
  onChange: (next: { status: FieldStatus; value: YesNo }) => void;
  readOnly?: boolean;
  buildingId: string;
  section: string;
  /** sub-key for filtering documents */
  docLabel: string;
  docDescription?: string;
}

export const YesNoFieldWithDoc = ({
  label,
  value,
  onChange,
  readOnly = false,
  buildingId,
  section,
  docLabel,
  docDescription,
}: YesNoFieldWithDocProps) => {
  const id = useId();
  const setStatus = (status: FieldStatus) => {
    onChange({ status, value: status === "filled" ? value.value : "" });
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>

      <RadioGroup
        value={value.status === "filled" ? value.value : ""}
        onValueChange={(v) => onChange({ status: "filled", value: v as YesNo })}
        disabled={readOnly || value.status !== "filled"}
        className={cn(
          "flex flex-wrap gap-x-4 gap-y-1",
          (readOnly || value.status !== "filled") && "opacity-70",
        )}
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem id={`${id}-yes`} value="yes" />
          <Label htmlFor={`${id}-yes`} className="text-sm cursor-pointer">Oui</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem id={`${id}-no`} value="no" />
          <Label htmlFor={`${id}-no`} className="text-sm cursor-pointer">Non</Label>
        </div>
      </RadioGroup>

      <RadioGroup
        value={value.status}
        onValueChange={(v) => setStatus(v as FieldStatus)}
        disabled={readOnly}
        className="flex flex-wrap gap-x-4 gap-y-1 pt-1"
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem id={`${id}-filled`} value="filled" />
          <Label htmlFor={`${id}-filled`} className="text-xs font-normal text-muted-foreground cursor-pointer">
            Renseigné
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem id={`${id}-na`} value="not_applicable" />
          <Label htmlFor={`${id}-na`} className="text-xs font-normal text-muted-foreground cursor-pointer">
            Non applicable
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem id={`${id}-nd`} value="not_available" />
          <Label htmlFor={`${id}-nd`} className="text-xs font-normal text-muted-foreground cursor-pointer">
            Information non disponible
          </Label>
        </div>
      </RadioGroup>

      {value.status === "filled" && value.value === "yes" && (
        <div className="pt-2">
          <DocumentsList
            buildingId={buildingId}
            section={section}
            label={docLabel}
            title={`Document — ${label}`}
            description={docDescription ?? "Un seul fichier PDF par catégorie."}
            single
            readOnly={readOnly}
          />
        </div>
      )}
    </div>
  );
};
