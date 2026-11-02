import { useEffect, useRef, useState } from "react";
import { Download, FileText, Loader2, Pencil, Send, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  deleteDocument,
  getDocumentSignedUrl,
  uploadDocument,
} from "@/lib/buildingDocuments";

interface StatuteRow {
  id: string;
  building_id: string;
  document_id: string;
  display_name: string;
  extracted_text: string | null;
  created_at: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface Props {
  buildingId: string;
}

export const StatutesTab = ({ buildingId }: Props) => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [docs, setDocs] = useState<StatuteRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  // Chat state (ephemeral, per active document)
  const [chatByDoc, setChatByDoc] = useState<Record<string, ChatMessage[]>>({});
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const active = docs.find((d) => d.id === activeId) ?? null;
  const messages = activeId ? chatByDoc[activeId] ?? [] : [];

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("statutes_documents")
      .select("*")
      .eq("building_id", buildingId)
      .order("created_at", { ascending: false });
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      const rows = (data ?? []) as StatuteRow[];
      setDocs(rows);
      if (!activeId && rows.length > 0) setActiveId(rows[0].id);
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildingId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      // 1. Upload PDF to building-documents bucket
      const doc = await uploadDocument({
        buildingId,
        section: "statuts",
        label: "statuts",
        file,
      });

      // 2. Extract text via edge function
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
          title: "Extraction du texte échouée",
          description: "Le PDF est uploadé mais l'IA ne pourra pas y répondre.",
          variant: "destructive",
        });
      }

      // 3. Insert statutes_documents row
      const { error: insErr } = await supabase.from("statutes_documents").insert({
        building_id: buildingId,
        document_id: doc.id,
        display_name: file.name.replace(/\.pdf$/i, ""),
        extracted_text: extractedText,
      });
      if (insErr) throw insErr;

      toast({ title: "Document chargé" });
      await load();
    } catch (e) {
      toast({ title: "Erreur d'upload", description: String(e), variant: "destructive" });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleOpen = async (row: StatuteRow) => {
    try {
      const { data: docRow, error } = await supabase
        .from("building_documents")
        .select("file_path")
        .eq("id", row.document_id)
        .maybeSingle();
      if (error || !docRow) throw error ?? new Error("document introuvable");
      const url = await getDocumentSignedUrl(docRow.file_path);
      window.open(url, "_blank", "noopener");
    } catch (e) {
      toast({ title: "Erreur", description: String(e), variant: "destructive" });
    }
  };

  const handleStartRename = (row: StatuteRow) => {
    setRenamingId(row.id);
    setRenameValue(row.display_name);
  };

  const handleSaveRename = async (row: StatuteRow) => {
    const newName = renameValue.trim();
    if (!newName) return;
    const { error } = await supabase
      .from("statutes_documents")
      .update({ display_name: newName })
      .eq("id", row.id);
    if (error) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } else {
      setRenamingId(null);
      await load();
    }
  };

  const handleDelete = async (row: StatuteRow) => {
    if (!confirm(`Supprimer « ${row.display_name} » ?`)) return;
    try {
      const { data: docRow } = await supabase
        .from("building_documents")
        .select("*")
        .eq("id", row.document_id)
        .maybeSingle();
      if (docRow) await deleteDocument(docRow as never);
      const { error } = await supabase.from("statutes_documents").delete().eq("id", row.id);
      if (error) throw error;
      if (activeId === row.id) setActiveId(null);
      setChatByDoc((prev) => {
        const next = { ...prev };
        delete next[row.id];
        return next;
      });
      await load();
    } catch (e) {
      toast({ title: "Erreur", description: String(e), variant: "destructive" });
    }
  };

  const handleSend = async () => {
    const text = input.trim();
    if (!text || !active || sending) return;
    if (!active.extracted_text) {
      toast({
        title: "Aucun texte extrait",
        description: "L'IA ne peut pas répondre car le texte du PDF n'a pas pu être extrait.",
        variant: "destructive",
      });
      return;
    }
    const newUserMsg: ChatMessage = { role: "user", content: text };
    const nextHistory = [...messages, newUserMsg];
    setChatByDoc((prev) => ({ ...prev, [active.id]: nextHistory }));
    setInput("");
    setSending(true);
    try {
      const { data, error } = await supabase.functions.invoke("chat-statutes", {
        body: {
          documentText: active.extracted_text,
          documentName: active.display_name,
          messages: nextHistory,
        },
      });
      if (error) throw error;
      const reply = (data?.reply as string) ?? "(réponse vide)";
      setChatByDoc((prev) => ({
        ...prev,
        [active.id]: [...nextHistory, { role: "assistant", content: reply }],
      }));
    } catch (e: any) {
      toast({
        title: "Erreur IA",
        description: e?.message ?? String(e),
        variant: "destructive",
      });
      // remove the user msg if call failed? keep it so user can retry
    } finally {
      setSending(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Statuts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Documents chargés</p>
            <p className="text-xs text-muted-foreground">
              Chargez un PDF des statuts. Le texte est analysé pour permettre à l'IA de répondre à vos questions.
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
            {uploading ? "Analyse..." : "Charger un PDF"}
          </Button>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Chargement…</p>
        ) : docs.length === 0 ? (
          <p className="text-sm italic text-muted-foreground">Aucun statut chargé.</p>
        ) : (
          <ul className="divide-y rounded-md border">
            {docs.map((row) => {
              const isActive = row.id === activeId;
              const isRenaming = row.id === renamingId;
              return (
                <li
                  key={row.id}
                  className={`flex items-center gap-2 p-3 ${
                    isActive ? "bg-muted/50" : ""
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveId(row.id)}
                    className="flex flex-1 items-center gap-2 text-left"
                  >
                    <FileText className="size-4 text-muted-foreground" />
                    {isRenaming ? (
                      <Input
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleSaveRename(row);
                          if (e.key === "Escape") setRenamingId(null);
                        }}
                        autoFocus
                        className="h-8"
                      />
                    ) : (
                      <span className="truncate text-sm font-medium">{row.display_name}</span>
                    )}
                    {!row.extracted_text && (
                      <span className="text-xs text-destructive">(texte non extrait)</span>
                    )}
                  </button>
                  <div className="flex gap-1">
                    {isRenaming ? (
                      <Button size="sm" onClick={() => handleSaveRename(row)}>
                        OK
                      </Button>
                    ) : (
                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        onClick={() => handleStartRename(row)}
                        title="Renommer"
                      >
                        <Pencil />
                      </Button>
                    )}
                    <Button
                      size="icon"
                      variant="ghost"
                      type="button"
                      onClick={() => handleOpen(row)}
                      title="Ouvrir le PDF"
                    >
                      <Download />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      type="button"
                      onClick={() => handleDelete(row)}
                      title="Supprimer"
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {active && (
          <div className="space-y-3 rounded-md border p-3">
            <div>
              <p className="text-sm font-medium">Discussion avec l'IA</p>
              <p className="text-xs text-muted-foreground">
                Posez des questions sur « {active.display_name} ». L'historique est éphémère
                (perdu au rechargement de la page).
              </p>
            </div>

            <div className="max-h-80 space-y-2 overflow-y-auto rounded-md bg-muted/30 p-3">
              {messages.length === 0 ? (
                <p className="text-xs italic text-muted-foreground">
                  Aucune question posée pour le moment.
                </p>
              ) : (
                messages.map((m, i) => (
                  <div
                    key={i}
                    className={`rounded-md p-2 text-sm ${
                      m.role === "user"
                        ? "ml-8 bg-primary text-primary-foreground"
                        : "mr-8 bg-background"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{m.content}</p>
                  </div>
                ))
              )}
              {sending && (
                <div className="mr-8 flex items-center gap-2 rounded-md bg-background p-2 text-sm text-muted-foreground">
                  <Loader2 className="size-3 animate-spin" /> L'IA réfléchit…
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Votre question…"
                rows={2}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <Button onClick={handleSend} disabled={sending || !input.trim()}>
                <Send />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
