import { useEffect, useRef, useState } from "react";
import { Check, Download, FileText, Loader2, Sparkles, Trash2, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  deleteDocument,
  getDocumentSignedUrl,
  uploadDocument,
} from "@/lib/buildingDocuments";

interface AGMeeting {
  id: string;
  building_id: string;
  meeting_date: string | null;
  document_id: string | null;
  display_name: string | null;
  extracted_text: string | null;
}

interface AGTask {
  id: string;
  building_id: string;
  meeting_id: string | null;
  title: string;
  description: string | null;
  done: boolean;
  created_at: string;
}

interface ProposedTask {
  title: string;
  description: string;
  selected: boolean;
}

interface Props {
  buildingId: string;
}

export const AGTab = ({ buildingId }: Props) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [meeting, setMeeting] = useState<AGMeeting | null>(null);
  const [tasks, setTasks] = useState<AGTask[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [proposed, setProposed] = useState<ProposedTask[] | null>(null);
  const [meetingDate, setMeetingDate] = useState<string>("");

  const load = async () => {
    setLoading(true);
    const { data: m } = await supabase
      .from("ag_meetings")
      .select("*")
      .eq("building_id", buildingId)
      .maybeSingle();
    setMeeting((m as AGMeeting) ?? null);
    setMeetingDate((m as AGMeeting)?.meeting_date ?? "");

    const { data: t } = await supabase
      .from("ag_tasks")
      .select("*")
      .eq("building_id", buildingId)
      .order("created_at", { ascending: true });
    setTasks(((t as AGTask[]) ?? []));
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildingId]);

  const upsertMeeting = async (patch: Partial<AGMeeting>) => {
    if (meeting) {
      const { data, error } = await supabase
        .from("ag_meetings")
        .update(patch)
        .eq("id", meeting.id)
        .select()
        .single();
      if (error) throw error;
      setMeeting(data as AGMeeting);
      return data as AGMeeting;
    }
    const { data, error } = await supabase
      .from("ag_meetings")
      .insert({ building_id: buildingId, ...patch })
      .select()
      .single();
    if (error) throw error;
    setMeeting(data as AGMeeting);
    return data as AGMeeting;
  };

  const handleSaveDate = async () => {
    try {
      await upsertMeeting({ meeting_date: meetingDate || null });
      toast({ title: "Date enregistrée" });
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message ?? String(e), variant: "destructive" });
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      // Remove previous PV if exists
      if (meeting?.document_id) {
        const { data: prev } = await supabase
          .from("building_documents")
          .select("*")
          .eq("id", meeting.document_id)
          .maybeSingle();
        if (prev) await deleteDocument(prev as never);
      }

      const doc = await uploadDocument({
        buildingId,
        section: "ag",
        label: "PV AG",
        file,
      });

      let extractedText = "";
      try {
        const { data, error } = await supabase.functions.invoke("extract-pdf-text", {
          body: { filePath: doc.file_path },
        });
        if (error) throw error;
        extractedText = data?.text ?? "";
      } catch (err) {
        console.error("PDF extraction failed:", err);
        toast({
          title: "Extraction échouée",
          description: "Le PDF est uploadé mais l'IA ne pourra pas l'analyser.",
          variant: "destructive",
        });
      }

      await upsertMeeting({
        document_id: doc.id,
        display_name: file.name.replace(/\.pdf$/i, ""),
        extracted_text: extractedText,
      });

      toast({ title: "PV chargé" });
      setProposed(null);
    } catch (err: any) {
      toast({ title: "Erreur d'upload", description: err.message ?? String(err), variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleOpen = async () => {
    if (!meeting?.document_id) return;
    try {
      const { data: docRow } = await supabase
        .from("building_documents")
        .select("file_path")
        .eq("id", meeting.document_id)
        .maybeSingle();
      if (!docRow) throw new Error("document introuvable");
      const url = await getDocumentSignedUrl(docRow.file_path);
      window.open(url, "_blank", "noopener");
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message ?? String(e), variant: "destructive" });
    }
  };

  const handleDeletePV = async () => {
    if (!meeting?.document_id) return;
    if (!confirm("Supprimer le PV chargé ?")) return;
    try {
      const { data: prev } = await supabase
        .from("building_documents")
        .select("*")
        .eq("id", meeting.document_id)
        .maybeSingle();
      if (prev) await deleteDocument(prev as never);
      await upsertMeeting({ document_id: null, display_name: null, extracted_text: null });
      setProposed(null);
    } catch (e: any) {
      toast({ title: "Erreur", description: e.message ?? String(e), variant: "destructive" });
    }
  };

  const handleAnalyze = async () => {
    if (!meeting?.extracted_text) {
      toast({ title: "Aucun texte", description: "Le PV n'a pas de texte exploitable.", variant: "destructive" });
      return;
    }
    setAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("extract-ag-decisions", {
        body: {
          documentText: meeting.extracted_text,
          documentName: meeting.display_name ?? "PV AG",
        },
      });
      if (error) throw error;
      const list = (data?.tasks as Array<{ title: string; description: string }>) ?? [];
      if (list.length === 0) {
        toast({ title: "Aucune décision détectée" });
        setProposed([]);
      } else {
        setProposed(list.map((t) => ({ ...t, selected: true })));
      }
    } catch (e: any) {
      toast({ title: "Erreur IA", description: e.message ?? String(e), variant: "destructive" });
    } finally {
      setAnalyzing(false);
    }
  };

  const handleCreateSelected = async () => {
    if (!proposed || !meeting) return;
    const toCreate = proposed.filter((p) => p.selected);
    if (toCreate.length === 0) {
      setProposed(null);
      return;
    }
    const { error } = await supabase.from("ag_tasks").insert(
      toCreate.map((p) => ({
        building_id: buildingId,
        meeting_id: meeting.id,
        title: p.title,
        description: p.description,
      })),
    );
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: `${toCreate.length} tâche(s) créée(s)` });
    setProposed(null);
    await load();
  };

  const toggleProposed = (i: number) =>
    setProposed((prev) =>
      prev ? prev.map((p, idx) => (idx === i ? { ...p, selected: !p.selected } : p)) : prev,
    );

  const updateProposed = (i: number, patch: Partial<ProposedTask>) =>
    setProposed((prev) => (prev ? prev.map((p, idx) => (idx === i ? { ...p, ...patch } : p)) : prev));

  const toggleTaskDone = async (task: AGTask) => {
    const { error } = await supabase.from("ag_tasks").update({ done: !task.done }).eq("id", task.id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)));
    }
  };

  const deleteTask = async (task: AGTask) => {
    if (!confirm(`Supprimer la tâche « ${task.title} » ?`)) return;
    const { error } = await supabase.from("ag_tasks").delete().eq("id", task.id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      setTasks((prev) => prev.filter((t) => t.id !== task.id));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Assemblée générale</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {loading ? (
          <p className="text-sm text-muted-foreground">Chargement…</p>
        ) : (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Date de la dernière assemblée générale</label>
              <div className="flex gap-2">
                <Input
                  type="date"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="max-w-xs"
                />
                <Button type="button" variant="outline" onClick={handleSaveDate}>
                  Enregistrer
                </Button>
              </div>
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Procès-verbal (PV)</p>
                  <p className="text-xs text-muted-foreground">
                    Un seul PV est conservé. Charger un nouveau PDF remplacera le précédent.
                  </p>
                </div>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleUpload}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? <Loader2 className="animate-spin" /> : <Upload />}
                  {uploading ? "Analyse..." : meeting?.document_id ? "Remplacer le PV" : "Charger un PDF"}
                </Button>
              </div>

              {meeting?.document_id && (
                <div className="flex items-center gap-2 rounded-md border p-3">
                  <FileText className="size-4 text-muted-foreground" />
                  <span className="flex-1 truncate text-sm font-medium">
                    {meeting.display_name}
                  </span>
                  {!meeting.extracted_text && (
                    <span className="text-xs text-destructive">(texte non extrait)</span>
                  )}
                  <Button size="icon" variant="ghost" onClick={handleOpen} title="Ouvrir">
                    <Download />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={handleDeletePV} title="Supprimer">
                    <Trash2 />
                  </Button>
                </div>
              )}

              {meeting?.extracted_text && (
                <Button onClick={handleAnalyze} disabled={analyzing} variant="default">
                  {analyzing ? <Loader2 className="animate-spin" /> : <Sparkles />}
                  {analyzing ? "Analyse en cours..." : "Analyser le PV avec l'IA"}
                </Button>
              )}
            </div>

            {proposed && (
              <div className="space-y-3 rounded-md border border-primary/40 bg-primary/5 p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">
                    Décisions détectées ({proposed.length}) — sélectionnez celles à transformer en tâches
                  </p>
                  <Button size="sm" variant="ghost" onClick={() => setProposed(null)}>
                    <X />
                  </Button>
                </div>
                {proposed.length === 0 ? (
                  <p className="text-sm italic text-muted-foreground">Aucune décision détectée.</p>
                ) : (
                  <ul className="space-y-2">
                    {proposed.map((p, i) => (
                      <li key={i} className="flex gap-2 rounded-md bg-background p-2">
                        <Checkbox
                          checked={p.selected}
                          onCheckedChange={() => toggleProposed(i)}
                          className="mt-1"
                        />
                        <div className="flex-1 space-y-1">
                          <Input
                            value={p.title}
                            onChange={(e) => updateProposed(i, { title: e.target.value })}
                            className="h-8 font-medium"
                          />
                          <Textarea
                            value={p.description}
                            onChange={(e) => updateProposed(i, { description: e.target.value })}
                            rows={2}
                            className="text-sm"
                          />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setProposed(null)}>
                    Annuler
                  </Button>
                  <Button onClick={handleCreateSelected}>
                    <Check /> Créer les tâches sélectionnées
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-2 border-t pt-4">
              <p className="text-sm font-medium">Tâches issues du PV</p>
              {tasks.length === 0 ? (
                <p className="text-sm italic text-muted-foreground">Aucune tâche pour le moment.</p>
              ) : (
                <ul className="divide-y rounded-md border">
                  {tasks.map((t) => (
                    <li key={t.id} className="flex items-start gap-3 p-3">
                      <Checkbox
                        checked={t.done}
                        onCheckedChange={() => toggleTaskDone(t)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${t.done ? "line-through text-muted-foreground" : ""}`}>
                          {t.title}
                        </p>
                        {t.description && (
                          <p className={`text-xs ${t.done ? "text-muted-foreground line-through" : "text-muted-foreground"}`}>
                            {t.description}
                          </p>
                        )}
                      </div>
                      <Button size="icon" variant="ghost" onClick={() => deleteTask(t)} title="Supprimer">
                        <Trash2 />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
