import { useEffect, useRef, useState } from "react";
import { Download, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  deleteDocument,
  getDocumentSignedUrl,
  listDocuments,
  uploadDocument,
  type BuildingDocument,
} from "@/lib/buildingDocuments";

interface DocumentsListProps {
  buildingId: string;
  section: string;
  /** Optional sub-key to filter docs (e.g. badges, remoteControls) */
  label?: string;
  title?: string;
  description?: string;
  readOnly?: boolean;
  /** Limit to a single file (replaces previous on upload) */
  single?: boolean;
}

export const DocumentsList = ({
  buildingId,
  section,
  label,
  title = "Documents PDF",
  description,
  readOnly = false,
  single = false,
}: DocumentsListProps) => {
  const [docs, setDocs] = useState<BuildingDocument[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const sectionKey = label ? `${section}:${label}` : section;

  const load = async () => {
    try {
      const all = await listDocuments(buildingId, sectionKey);
      setDocs(all);
    } catch (e) {
      toast({ title: "Erreur de chargement", description: String(e), variant: "destructive" });
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildingId, sectionKey]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      if (single) {
        for (const d of docs) await deleteDocument(d);
      }
      await uploadDocument({ buildingId, section: sectionKey, label: label ?? null, file });
      toast({ title: "Document ajouté" });
      await load();
    } catch (err) {
      toast({ title: "Erreur d'upload", description: String(err), variant: "destructive" });
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleDownload = async (doc: BuildingDocument) => {
    try {
      const url = await getDocumentSignedUrl(doc.file_path);
      window.open(url, "_blank", "noopener");
    } catch (e) {
      toast({ title: "Erreur", description: String(e), variant: "destructive" });
    }
  };

  const handleDelete = async (doc: BuildingDocument) => {
    if (!confirm(`Supprimer « ${doc.file_name} » ?`)) return;
    try {
      await deleteDocument(doc);
      toast({ title: "Document supprimé" });
      await load();
    } catch (e) {
      toast({ title: "Erreur", description: String(e), variant: "destructive" });
    }
  };

  return (
    <div className="space-y-2 rounded-md border p-3">
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-sm font-medium">{title}</p>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
        {!readOnly && (
          <div>
            <Input
              ref={inputRef}
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleUpload}
            />
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => inputRef.current?.click()}
              disabled={loading}
            >
              <Upload /> {single && docs.length > 0 ? "Remplacer" : "Ajouter un PDF"}
            </Button>
          </div>
        )}
      </div>

      {docs.length === 0 ? (
        <p className="text-xs text-muted-foreground italic">Aucun document.</p>
      ) : (
        <ul className="divide-y">
          {docs.map((d) => (
            <li key={d.id} className="flex items-center justify-between gap-2 py-2">
              <button
                type="button"
                onClick={() => handleDownload(d)}
                className="truncate text-left text-sm text-foreground hover:underline"
              >
                {d.file_name}
              </button>
              <div className="flex gap-1">
                <Button type="button" size="icon" variant="ghost" onClick={() => handleDownload(d)}>
                  <Download />
                </Button>
                {!readOnly && (
                  <Button type="button" size="icon" variant="ghost" onClick={() => handleDelete(d)}>
                    <Trash2 />
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
