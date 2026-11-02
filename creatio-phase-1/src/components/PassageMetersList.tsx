import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { MonthIndex, PassageMeter } from "@/types/buildingSections";

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

const LINK_OPTIONS: Array<{ value: PassageMeter["linkType"]; label: string }> = [
  { value: "apartment", label: "Appartement" },
  { value: "common", label: "Partie commune" },
  { value: "concierge", label: "Conciergerie" },
  { value: "other", label: "Autre" },
];

const newId = () =>
  (typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2));

interface MetersListProps {
  meters: PassageMeter[];
  onChange: (next: PassageMeter[]) => void;
  readOnly?: boolean;
}

export const PassageMetersList = ({ meters, onChange, readOnly = false }: MetersListProps) => {
  const addMeter = () =>
    onChange([
      ...meters,
      { id: newId(), number: "", linkType: "", linkDetail: "" },
    ]);

  const updateMeter = (id: string, patch: Partial<PassageMeter>) =>
    onChange(meters.map((m) => (m.id === id ? { ...m, ...patch } : m)));

  const removeMeter = (id: string) => onChange(meters.filter((m) => m.id !== id));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium">Liste des compteurs</p>
        {!readOnly && (
          <Button type="button" size="sm" variant="outline" onClick={addMeter}>
            <Plus /> Ajouter un compteur
          </Button>
        )}
      </div>

      {meters.length === 0 ? (
        <p className="text-xs italic text-muted-foreground">Aucun compteur enregistré.</p>
      ) : (
        <ul className="space-y-3">
          {meters.map((m) => (
            <li key={m.id} className="rounded-md border p-3 space-y-3">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="space-y-1">
                  <Label className="text-xs">Numéro de compteur</Label>
                  <Input
                    value={m.number}
                    onChange={(e) => updateMeter(m.id, { number: e.target.value })}
                    disabled={readOnly}
                  />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">Lié à</Label>
                  <Select
                    value={m.linkType || undefined}
                    onValueChange={(v) =>
                      updateMeter(m.id, { linkType: v as PassageMeter["linkType"] })
                    }
                    disabled={readOnly}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner…" />
                    </SelectTrigger>
                    <SelectContent>
                      {LINK_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value as string}>
                          {o.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs">
                    {m.linkType === "apartment"
                      ? "N° / nom appartement"
                      : m.linkType === "other"
                      ? "Précision"
                      : "Détail (optionnel)"}
                  </Label>
                  <Input
                    value={m.linkDetail}
                    onChange={(e) => updateMeter(m.id, { linkDetail: e.target.value })}
                    disabled={readOnly}
                    placeholder={
                      m.linkType === "apartment" ? "Ex. App. 3B" : ""
                    }
                  />
                </div>
              </div>
              {!readOnly && (
                <div className="flex justify-end">
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => removeMeter(m.id)}
                  >
                    <Trash2 /> Supprimer
                  </Button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

interface MonthsPickerProps {
  value: MonthIndex[];
  onChange: (next: MonthIndex[]) => void;
  readOnly?: boolean;
}

export const ReadingMonthsPicker = ({ value, onChange, readOnly = false }: MonthsPickerProps) => {
  const toggle = (m: MonthIndex) => {
    const has = value.includes(m);
    const next = has ? value.filter((x) => x !== m) : [...value, m].sort((a, b) => a - b);
    onChange(next as MonthIndex[]);
  };

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Période de relevé des compteurs</p>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
        {MONTHS.map((label, idx) => {
          const m = idx as MonthIndex;
          const checked = value.includes(m);
          return (
            <label
              key={label}
              className={cn(
                "flex items-center gap-2 rounded-md border p-2 text-sm",
                readOnly ? "cursor-default opacity-80" : "cursor-pointer hover:bg-muted",
              )}
            >
              <Checkbox
                checked={checked}
                onCheckedChange={() => !readOnly && toggle(m)}
                disabled={readOnly}
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export { MONTHS };
