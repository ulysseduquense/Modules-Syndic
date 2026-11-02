import { useEffect, useRef, useState } from "react";
import { Download, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  createHeatingLog,
  deleteHeatingLog,
  listHeatingLogs,
  type HeatingLogWithDoc,
} from "@/lib/heatingLogs";
import { getDocumentSignedUrl } from "@/lib/buildingDocuments";

interface Props {
  buildingId: string;
}

export const HeatingMaintenanceLogs = ({ buildingId }: Props) => {
  const [logs, setLogs] = useState<HeatingLogWithDoc[]>([]);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const [date, setDate] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const load = async () => {
    try {
      setLogs(await listHeatingLogs(buildingId));
    } catch (e) {
      toast({ title: "Erreur de chargement", description: String(e), variant: "destructive" });
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildingId]);

  const reset = () => {
    setDate("");
    setCompany("");
    setNotes("");
    if (fileRef.current) fileRef.current.value = "";
    setAdding(false);
  };

  const submit = async () => {
    if (!date) {
      toast({ title: "Date requise", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await createHeatingLog({
        buildingId,
        maintenanceDate: date,
        companyName: company.trim() || null,
        notes: notes.trim() || null,
        file: fileRef.current?.files?.[0] ?? null,
      });
      toast({ title: "Entretien ajouté" });
      reset();
      await load();
    } catch (err) {
      toast({ title: "Erreur", description: String(err), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const remove = async (log: HeatingLogWithDoc) => {
    if (!confirm(`Supprimer l'entretien du ${new Date(log.maintenance_date).toLocaleDateString("fr-FR")} ?`)) return;
    try {
      await deleteHeatingLog(log);
      toast({ title: "Entretien supprimé" });
      await load();
    } catch (e) {
      toast({ title: "Erreur", description: String(e), variant: "destructive" });
    }
  };

  const openDoc = async (path: string) => {
    try {
      const url = await getDocumentSignedUrl(path);
      window.open(url, "_blank", "noopener");
    } catch (e) {
      toast({ title: "Erreur", description: String(e), variant: "destructive" });
    }
  };

  return (
    <div className="space-y-3 rounded-md border p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Historique des entretiens chauffage</p>
          <p className="text-xs text-muted-foreground">Toutes les interventions enregistrées, avec attestation PDF associée.</p>
        </div>
        {!adding && (
          <Button type="button" size="sm" onClick={() => setAdding(true)}>
            <Plus /> Ajouter un entretien
          </Button>
        )}
      </div>

      {adding && (
        <div className="space-y-3 rounded-md border bg-muted/30 p-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label>Date de l'entretien *</Label>
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="space-y-1">
              <Label>Société intervenante</Label>
              <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Ex. Viessmann" />
            </div>
          </div>
          <div className="space-y-1">
            <Label>Notes / observations</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} />
          </div>
          <div className="space-y-1">
            <Label>Attestation / rapport (PDF)</Label>
            <Input ref={fileRef} type="file" accept="application/pdf" />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={reset} disabled={loading}>Annuler</Button>
            <Button type="button" onClick={submit} disabled={loading}>{loading ? "Enregistrement…" : "Enregistrer"}</Button>
          </div>
        </div>
      )}

      {logs.length === 0 ? (
        <p className="text-xs italic text-muted-foreground">Aucun entretien enregistré.</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Société</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Document</TableHead>
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="whitespace-nowrap font-medium">
                  {new Date(log.maintenance_date).toLocaleDateString("fr-FR")}
                </TableCell>
                <TableCell>{log.company_name ?? "—"}</TableCell>
                <TableCell className="max-w-[24ch] truncate" title={log.notes ?? ""}>{log.notes ?? "—"}</TableCell>
                <TableCell>
                  {log.document ? (
                    <Button type="button" size="sm" variant="ghost" onClick={() => openDoc(log.document!.file_path)}>
                      <Download /> {log.document.file_name}
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">—</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button type="button" size="icon" variant="ghost" onClick={() => remove(log)}>
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
