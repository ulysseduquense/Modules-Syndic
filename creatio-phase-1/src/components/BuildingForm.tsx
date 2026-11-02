import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldWithNA } from "@/components/FieldWithNA";
import { emptyBuilding, type BuildingBasicInfo } from "@/types/building";
import { useToast } from "@/hooks/use-toast";

interface BuildingFormProps {
  onCreate?: (building: BuildingBasicInfo) => void | Promise<void>;
  initialValue?: BuildingBasicInfo;
  submitLabel?: string;
  title?: string;
  description?: string;
}

export const BuildingForm = ({
  onCreate,
  initialValue,
  submitLabel = "Créer l'immeuble",
  title = "Création d'un immeuble",
  description = "Renseignez les informations de base. Pour chaque champ vous pouvez sélectionner « Non applicable » ou « Information non disponible ».",
}: BuildingFormProps) => {
  const [building, setBuilding] = useState<BuildingBasicInfo>(initialValue ?? emptyBuilding());
  const isEdit = !!initialValue;
  // In edit mode, fields are locked by default until user clicks "Apporter des modifications"
  const [editing, setEditing] = useState(!isEdit);
  const readOnly = isEdit && !editing;
  const { toast } = useToast();

  const update = <K extends keyof BuildingBasicInfo>(key: K, value: BuildingBasicInfo[K]) => {
    setBuilding((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (building.name.status === "filled" && !building.name.value.trim()) {
      toast({
        title: "Nom requis",
        description: "Veuillez renseigner le nom de l'immeuble ou cocher Non applicable / Information non disponible.",
        variant: "destructive",
      });
      return;
    }

    await onCreate?.(building);
    if (!isEdit) {
      setBuilding(emptyBuilding());
    } else {
      // Re-lock the form after successful save
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setBuilding(initialValue ?? emptyBuilding());
    if (isEdit) setEditing(false);
  };

  return (
    <Card className="mx-auto max-w-3xl">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <FieldWithNA
            label="Nom de l'immeuble"
            field={building.name}
            onChange={(v) => update("name", v)}
            placeholder="Ex. Résidence Les Tilleuls"
            required
            readOnly={readOnly}
          />
          <FieldWithNA
            label="Adresse"
            field={building.address}
            onChange={(v) => update("address", v)}
            type="textarea"
            placeholder="Rue, numéro, code postal, ville"
            readOnly={readOnly}
          />
          <FieldWithNA
            label="Date de construction"
            field={building.constructionDate}
            onChange={(v) => update("constructionDate", v)}
            type="date"
            readOnly={readOnly}
          />
          <FieldWithNA
            label="Gestionnaire / Syndic"
            field={building.manager}
            onChange={(v) => update("manager", v)}
            placeholder="Nom du gestionnaire ou de la société"
            readOnly={readOnly}
          />
          <FieldWithNA
            label="Concierges"
            field={building.concierges}
            onChange={(v) => update("concierges", v)}
            type="textarea"
            placeholder="Nom(s) et coordonnées du / des concierges"
            readOnly={readOnly}
          />
          <FieldWithNA
            label="Nombre d'appartements"
            field={building.numberOfApartments}
            onChange={(v) => update("numberOfApartments", v)}
            type="number"
            placeholder="0"
            readOnly={readOnly}
          />
          <FieldWithNA
            label="Nombre d'étages"
            field={building.numberOfFloors}
            onChange={(v) => update("numberOfFloors", v)}
            type="number"
            placeholder="0"
            readOnly={readOnly}
          />
          <FieldWithNA
            label="Référence cadastrale"
            field={building.cadastralReference}
            onChange={(v) => update("cadastralReference", v)}
            placeholder="Ex. parcelle n°..."
            readOnly={readOnly}
          />
          <FieldWithNA
            label="Notes complémentaires"
            field={building.notes}
            onChange={(v) => update("notes", v)}
            type="textarea"
            placeholder="Toute information utile"
            readOnly={readOnly}
          />

          <div className="flex justify-end gap-2 pt-2">
            {readOnly ? (
              <Button type="button" onClick={() => setEditing(true)}>
                <Pencil /> Apporter des modifications
              </Button>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={handleCancel}>
                  {isEdit ? "Annuler" : "Réinitialiser"}
                </Button>
                <Button type="submit">{submitLabel}</Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
