import { useState } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  EXPORT_SECTIONS,
  exportBuildingToPdf,
  type ExportSectionKey,
} from "@/lib/pdfExport";
import type { BuildingRow } from "@/lib/buildings";

interface Props {
  building: BuildingRow;
}

export const ExportPdfDialog = ({ building }: Props) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ExportSectionKey[]>(
    EXPORT_SECTIONS.map((s) => s.key),
  );

  const toggle = (key: ExportSectionKey) => {
    setSelected((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const allSelected = selected.length === EXPORT_SECTIONS.length;
  const toggleAll = () => {
    setSelected(allSelected ? [] : EXPORT_SECTIONS.map((s) => s.key));
  };

  const handleExport = () => {
    if (selected.length === 0) {
      toast({ title: "Sélectionnez au moins un onglet", variant: "destructive" });
      return;
    }
    try {
      exportBuildingToPdf(building, selected);
      setOpen(false);
      toast({ title: "PDF généré" });
    } catch (e) {
      toast({ title: "Erreur", description: String(e), variant: "destructive" });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Download /> Extraire en PDF
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Extraire en PDF</DialogTitle>
          <DialogDescription>
            Sélectionnez les onglets à inclure dans l'extract. Chaque onglet
            apparaîtra sur une nouvelle page.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b pb-2">
            <Checkbox
              id="export-all"
              checked={allSelected}
              onCheckedChange={toggleAll}
            />
            <Label htmlFor="export-all" className="font-medium cursor-pointer">
              {allSelected ? "Tout désélectionner" : "Tout sélectionner"}
            </Label>
          </div>
          {EXPORT_SECTIONS.map((s) => (
            <div key={s.key} className="flex items-center gap-2">
              <Checkbox
                id={`export-${s.key}`}
                checked={selected.includes(s.key)}
                onCheckedChange={() => toggle(s.key)}
              />
              <Label htmlFor={`export-${s.key}`} className="cursor-pointer">
                {s.label}
              </Label>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Annuler
          </Button>
          <Button onClick={handleExport}>
            <Download /> Générer le PDF
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
