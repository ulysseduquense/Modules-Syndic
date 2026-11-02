import { useId } from "react";
import { AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { DocumentsList } from "@/components/DocumentsList";
import type { FieldStatus, NAField } from "@/types/building";
import type { YesNoDateField } from "@/types/buildingSections";

const MS_DAY = 24 * 60 * 60 * 1000;

const parseISO = (s: string): Date | null => {
  if (!s) return null;
  const d = new Date(s);
  return isNaN(d.getTime()) ? null : d;
};

const formatFR = (d: Date) => d.toLocaleDateString("fr-FR");

const addYears = (d: Date, years: number) => {
  const r = new Date(d);
  r.setFullYear(r.getFullYear() + years);
  return r;
};

interface ExpiryDisplayProps {
  startISO: string;
  /** Years to add for the expiry. */
  yearsToAdd: number;
  /** When remaining time falls below this many days, alert (red). */
  alertWithinDays: number;
}

const ExpiryDisplay = ({ startISO, yearsToAdd, alertWithinDays }: ExpiryDisplayProps) => {
  const start = parseISO(startISO);
  if (!start) {
    return <p className="text-xs italic text-muted-foreground">Échéance calculée automatiquement (+{yearsToAdd} ans).</p>;
  }
  const expiry = addYears(start, yearsToAdd);
  const diffDays = Math.floor((expiry.getTime() - Date.now()) / MS_DAY);
  const alert = diffDays <= alertWithinDays;
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border px-3 py-2 text-sm",
        alert
          ? "border-destructive bg-destructive/10 text-destructive"
          : "border-border bg-muted text-foreground",
      )}
    >
      {alert && <AlertTriangle className="size-4 shrink-0" />}
      <span>
        Date d'échéance : <strong>{formatFR(expiry)}</strong>
        {diffDays >= 0 ? ` (dans ${diffDays} j)` : ` (dépassée de ${Math.abs(diffDays)} j)`}
      </span>
    </div>
  );
};

const StatusRadio = ({
  id,
  status,
  onChange,
  readOnly,
}: {
  id: string;
  status: FieldStatus;
  onChange: (s: FieldStatus) => void;
  readOnly: boolean;
}) => (
  <RadioGroup
    value={status}
    onValueChange={(v) => onChange(v as FieldStatus)}
    disabled={readOnly}
    className="flex flex-wrap gap-x-4 gap-y-1 pt-1"
  >
    <div className="flex items-center gap-2">
      <RadioGroupItem id={`${id}-filled`} value="filled" />
      <Label htmlFor={`${id}-filled`} className="text-xs font-normal text-muted-foreground cursor-pointer">Renseigné</Label>
    </div>
    <div className="flex items-center gap-2">
      <RadioGroupItem id={`${id}-na`} value="not_applicable" />
      <Label htmlFor={`${id}-na`} className="text-xs font-normal text-muted-foreground cursor-pointer">Non applicable</Label>
    </div>
    <div className="flex items-center gap-2">
      <RadioGroupItem id={`${id}-nd`} value="not_available" />
      <Label htmlFor={`${id}-nd`} className="text-xs font-normal text-muted-foreground cursor-pointer">Information non disponible</Label>
    </div>
  </RadioGroup>
);

interface CertificateDateFieldProps {
  label: string;
  field: NAField;
  onChange: (next: NAField) => void;
  readOnly?: boolean;
  /** If set, show auto-computed expiry +N years with red alert when within `alertWithinDays`. */
  expiry?: { yearsToAdd: number; alertWithinDays: number };
  /** If true, shows the issued date itself in red when past today (no expiry calc). */
  redWhenPast?: boolean;
  buildingId: string;
  section: string;
  docLabel: string;
  docDescription?: string;
}

export const CertificateDateField = ({
  label,
  field,
  onChange,
  readOnly = false,
  expiry,
  redWhenPast = false,
  buildingId,
  section,
  docLabel,
  docDescription,
}: CertificateDateFieldProps) => {
  const id = useId();
  const disabled = readOnly || field.status !== "filled";

  const setStatus = (status: FieldStatus) => {
    onChange({ value: status === "filled" ? field.value : "", status });
  };

  const dateObj = parseISO(field.value);
  const past = redWhenPast && dateObj && dateObj.getTime() < Date.now();

  return (
    <div className="space-y-2 rounded-md border p-3">
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>

      <Input
        id={id}
        type="date"
        value={field.value}
        onChange={(e) => onChange({ ...field, value: e.target.value })}
        disabled={disabled}
        className={cn(
          disabled && "bg-muted",
          past && "border-destructive bg-destructive/10 text-destructive font-medium",
        )}
      />

      {field.status === "filled" && expiry && (
        <ExpiryDisplay
          startISO={field.value}
          yearsToAdd={expiry.yearsToAdd}
          alertWithinDays={expiry.alertWithinDays}
        />
      )}

      {field.status === "filled" && redWhenPast && past && (
        <p className="text-xs font-medium text-destructive">Cette date est dépassée.</p>
      )}

      <StatusRadio id={id} status={field.status} onChange={setStatus} readOnly={readOnly} />

      <div className="pt-2">
        <DocumentsList
          buildingId={buildingId}
          section={section}
          label={docLabel}
          title={`Attestation — ${label}`}
          description={docDescription ?? "Téléverser le PDF justificatif (un seul fichier)."}
          single
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

interface CertificateYesNoDateFieldProps {
  label: string;
  value: YesNoDateField;
  onChange: (next: YesNoDateField) => void;
  readOnly?: boolean;
  expiry?: { yearsToAdd: number; alertWithinDays: number };
  redWhenPast?: boolean;
  buildingId: string;
  section: string;
  docLabel: string;
}

export const CertificateYesNoDateField = ({
  label,
  value,
  onChange,
  readOnly = false,
  expiry,
  redWhenPast = false,
  buildingId,
  section,
  docLabel,
}: CertificateYesNoDateFieldProps) => {
  const id = useId();
  const dateObj = parseISO(value.date);
  const past = redWhenPast && dateObj && dateObj.getTime() < Date.now();
  const disabledRadio = readOnly || value.status !== "filled";

  return (
    <div className="space-y-2 rounded-md border p-3">
      <Label className="text-sm font-medium">{label}</Label>

      <RadioGroup
        value={value.status === "filled" ? value.value : ""}
        onValueChange={(v) =>
          onChange({ ...value, status: "filled", value: v as YesNoDateField["value"] })
        }
        disabled={disabledRadio}
        className={cn("flex flex-wrap gap-x-4 gap-y-1", disabledRadio && "opacity-70")}
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

      {value.status === "filled" && value.value === "yes" && (
        <>
          <Input
            type="date"
            value={value.date}
            onChange={(e) => onChange({ ...value, date: e.target.value })}
            disabled={readOnly}
            className={cn(past && "border-destructive bg-destructive/10 text-destructive font-medium")}
          />
          {expiry && (
            <ExpiryDisplay
              startISO={value.date}
              yearsToAdd={expiry.yearsToAdd}
              alertWithinDays={expiry.alertWithinDays}
            />
          )}
          {redWhenPast && past && (
            <p className="text-xs font-medium text-destructive">Cette date est dépassée.</p>
          )}
          <div className="pt-2">
            <DocumentsList
              buildingId={buildingId}
              section={section}
              label={docLabel}
              title={`Attestation — ${label}`}
              description="Téléverser le PDF justificatif (un seul fichier)."
              single
              readOnly={readOnly}
            />
          </div>
        </>
      )}

      <StatusRadio
        id={id}
        status={value.status}
        onChange={(s) =>
          onChange({
            status: s,
            value: s === "filled" ? value.value : "",
            date: s === "filled" ? value.date : "",
          })
        }
        readOnly={readOnly}
      />
    </div>
  );
};
