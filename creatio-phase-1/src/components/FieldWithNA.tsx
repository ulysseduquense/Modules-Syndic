import { useId } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import type { NAField, FieldStatus } from "@/types/building";

interface FieldWithNAProps {
  label: string;
  field: NAField;
  onChange: (next: NAField) => void;
  type?: "text" | "number" | "date" | "textarea";
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
}

export const FieldWithNA = ({
  label,
  field,
  onChange,
  type = "text",
  placeholder,
  required,
  readOnly = false,
}: FieldWithNAProps) => {
  const id = useId();
  const disabled = readOnly || field.status !== "filled";

  const setStatus = (status: FieldStatus) => {
    onChange({
      value: status === "filled" ? field.value : "",
      status,
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between gap-4">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
          {required && <span className="ml-1 text-destructive">*</span>}
        </Label>
      </div>

      {type === "textarea" ? (
        <Textarea
          id={id}
          value={field.value}
          onChange={(e) => onChange({ ...field, value: e.target.value })}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            disabled && "bg-muted italic disabled:opacity-100",
            disabled && field.status === "filled" && "text-foreground font-medium",
            disabled && field.status !== "filled" && "text-muted-foreground",
          )}
        />
      ) : (
        <Input
          id={id}
          type={type}
          value={field.value}
          onChange={(e) => onChange({ ...field, value: e.target.value })}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            disabled && "bg-muted italic disabled:opacity-100",
            disabled && field.status === "filled" && "text-foreground font-medium not-italic",
            disabled && field.status !== "filled" && "text-muted-foreground",
          )}
        />
      )}

      <RadioGroup
        value={field.status}
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
    </div>
  );
};
