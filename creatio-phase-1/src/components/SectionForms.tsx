import { useEffect, useState } from "react";
import { Pencil, AlertTriangle, Copy, CheckCircle2, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import {
  listBreakdowns,
  createBreakdown,
  resolveBreakdown,
  deleteBreakdown,
  type ElevatorBreakdown,
} from "@/lib/elevatorBreakdowns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FieldWithNA } from "@/components/FieldWithNA";
import { DocumentsList } from "@/components/DocumentsList";
import { YesNoFieldWithDoc } from "@/components/YesNoFieldWithDoc";
import { HeatingMaintenanceLogs } from "@/components/HeatingMaintenanceLogs";
import { CertificateDateField, CertificateYesNoDateField } from "@/components/CertificateField";
import { MONTHS, PassageMetersList, ReadingMonthsPicker } from "@/components/PassageMetersList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  emptyAccess,
  emptyAccessUnit,
  emptyAccounting,
  emptyAttestation,
  emptyElevator,
  emptyElevatorUnit,
  emptyHeating,
  emptyTechnical,
  type AccessInfo,
  type AccessUnit,
  type AccountingInfo,
  type AttestationInfo,
  type ElevatorInfo,
  type ElevatorUnit,
  type HeatingInfo,
  type TechnicalInfo,
  type YesNo,
} from "@/types/buildingSections";
import type { FieldStatus } from "@/types/building";

const ElevatorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="4" y="3" width="16" height="18" rx="1" />
    <line x1="12" y1="3" x2="12" y2="21" />
    <polyline points="8 8 9.5 6.5 11 8" />
    <polyline points="8 16 9.5 17.5 11 16" />
    <polyline points="13 8 14.5 6.5 16 8" />
    <polyline points="13 16 14.5 17.5 16 16" />
  </svg>
);

interface BaseProps {
  buildingId: string;
  readOnlyKey: string;
}

const useEditing = (initial = false) => {
  const [editing, setEditing] = useState(initial);
  return { editing, setEditing };
};

// ---------- Comptabilité ----------
interface AccountingProps extends BaseProps {
  value: AccountingInfo;
  onSave: (next: AccountingInfo) => Promise<void>;
}

export const AccountingForm = ({ buildingId, value, onSave }: AccountingProps) => {
  const [data, setData] = useState<AccountingInfo>(value ?? emptyAccounting());
  const { editing, setEditing } = useEditing(false);
  const readOnly = !editing;
  const update = <K extends keyof AccountingInfo>(k: K, v: AccountingInfo[K]) =>
    setData((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(data);
    setEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comptabilité</CardTitle>
        <CardDescription>Informations comptables de l'immeuble.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-3">
            <FieldWithNA label="Nom du comptable" field={data.accountantName} onChange={(v) => update("accountantName", v)} readOnly={readOnly} />
            <FieldWithNA label="Périodicité comptable" field={data.periodicity} onChange={(v) => update("periodicity", v)} readOnly={readOnly} />
            <FieldWithNA label="Nom du vérificateur aux comptes" field={data.auditorName} onChange={(v) => update("auditorName", v)} readOnly={readOnly} />
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-4">
              <FieldWithNA label="Date du dernier décompte" field={data.lastStatementDate} onChange={(v) => update("lastStatementDate", v)} type="date" readOnly={readOnly} />
            </div>
            <div className="space-y-4">
              <FieldWithNA label="Date du dernier appel de provision" field={data.lastProvisionCallDate} onChange={(v) => update("lastProvisionCallDate", v)} type="date" readOnly={readOnly} />
              <FieldWithNA label="Montant du dernier appel de provision" field={data.lastProvisionCallAmount} onChange={(v) => update("lastProvisionCallAmount", v)} readOnly={readOnly} />
            </div>
            <div className="space-y-4">
              <FieldWithNA label="Date du dernier appel de fonds de réserve" field={data.lastReserveFundCallDate} onChange={(v) => update("lastReserveFundCallDate", v)} type="date" readOnly={readOnly} />
              <FieldWithNA label="Montant du dernier appel de fonds de réserve" field={data.lastReserveFundCallAmount} onChange={(v) => update("lastReserveFundCallAmount", v)} readOnly={readOnly} />
            </div>
            <div className="space-y-4">
              <FieldWithNA label="Date du dernier appel de fonds extraordinaire" field={data.lastExtraordinaryCallDate} onChange={(v) => update("lastExtraordinaryCallDate", v)} type="date" readOnly={readOnly} />
              <FieldWithNA label="Montant du dernier appel de fonds extraordinaire" field={data.lastExtraordinaryCallAmount} onChange={(v) => update("lastExtraordinaryCallAmount", v)} readOnly={readOnly} />
            </div>
          </div>
          <FieldWithNA label="Budget validé lors de la dernière assemblée" field={data.lastApprovedBudget} onChange={(v) => update("lastApprovedBudget", v)} type="textarea" readOnly={readOnly} />

          <DocumentsList buildingId={buildingId} section="accounting" title="Documents comptables (PDF)" readOnly={readOnly} />

          <div className="flex justify-end gap-2 pt-2">
            {readOnly ? (
              <Button type="button" onClick={() => setEditing(true)}>
                <Pencil /> Apporter des modifications
              </Button>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={() => { setData(value); setEditing(false); }}>Annuler</Button>
                <Button type="submit">Enregistrer</Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// ---------- Ascenseur ----------
interface ElevatorProps extends BaseProps {
  value: ElevatorInfo;
  onSave: (next: ElevatorInfo) => Promise<void>;
  buildingName?: string;
  buildingAddress?: string;
}

export const ElevatorForm = ({ buildingId, value, onSave, buildingName, buildingAddress }: ElevatorProps) => {
  const [data, setData] = useState<ElevatorInfo>(value ?? emptyElevator());
  const { editing, setEditing } = useEditing(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [breakdownIdx, setBreakdownIdx] = useState<number | null>(null);
  const [breakdownComment, setBreakdownComment] = useState("");
  const [technicianContacted, setTechnicianContacted] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState<string | null>(null);
  const [breakdowns, setBreakdowns] = useState<ElevatorBreakdown[]>([]);
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [resolutionComment, setResolutionComment] = useState("");

  const refreshBreakdowns = async (idx: number) => {
    try {
      const list = await listBreakdowns(buildingId, idx);
      setBreakdowns(list);
    } catch (e) {
      toast({ title: "Erreur", description: String(e), variant: "destructive" });
    }
  };

  useEffect(() => {
    if (breakdownIdx !== null) {
      refreshBreakdowns(breakdownIdx);
    } else {
      setBreakdowns([]);
      setResolvingId(null);
      setResolutionComment("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [breakdownIdx]);
  const readOnly = !editing;
  const update = <K extends keyof ElevatorInfo>(k: K, v: ElevatorInfo[K]) =>
    setData((p) => ({ ...p, [k]: v }));

  const countNum = Math.max(0, Math.min(20, parseInt(data.count?.value ?? "", 10) || 0));
  const units: ElevatorUnit[] = Array.from({ length: countNum }, (_, i) => data.units?.[i] ?? emptyElevatorUnit());

  const updateUnit = (idx: number, next: ElevatorUnit) => {
    const arr = [...units];
    arr[idx] = next;
    setData((p) => ({ ...p, units: arr }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({ ...data, units });
    setEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ascenseur</CardTitle>
        <CardDescription>Informations sur les ascenseurs et leur entretien.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-6">
          <FieldWithNA label="Nombre d'ascenseurs" field={data.count} onChange={(v) => update("count", v)} type="number" readOnly={readOnly} />

          {countNum > 0 && (
            <div className="flex flex-wrap gap-2">
              {units.map((u, idx) => {
                const access = u.linkedAccess?.value?.trim();
                return (
                  <div key={idx} className="flex flex-col gap-1">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpenIdx(idx)}
                      className="h-auto py-2"
                    >
                      <ElevatorIcon />
                      <span className="flex flex-col items-start leading-tight">
                        <span>Ascenseur {idx + 1}</span>
                        {access && <span className="text-xs text-muted-foreground">Accès : {access}</span>}
                      </span>
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        setBreakdownIdx(idx);
                        setBreakdownComment("");
                        setTechnicianContacted(false);
                        setGeneratedMessage(null);
                      }}
                    >
                      <AlertTriangle /> Panne
                    </Button>
                  </div>
                );
              })}
            </div>
          )}

          <div className="space-y-4 rounded-md border p-4">
            <p className="text-sm font-medium">Société d'entretien</p>
            <FieldWithNA label="Nom de la société" field={data.maintenanceCompanyName} onChange={(v) => update("maintenanceCompanyName", v)} readOnly={readOnly} />
            <FieldWithNA label="Email" field={data.maintenanceCompanyEmail} onChange={(v) => update("maintenanceCompanyEmail", v)} readOnly={readOnly} />
            <FieldWithNA label="Téléphone" field={data.maintenanceCompanyPhone} onChange={(v) => update("maintenanceCompanyPhone", v)} readOnly={readOnly} />
            <FieldWithNA label="Téléphone d'urgence" field={data.maintenanceCompanyEmergencyPhone} onChange={(v) => update("maintenanceCompanyEmergencyPhone", v)} readOnly={readOnly} />
          </div>

          <FieldWithNA label="Société de contrôle périodique" field={data.inspectionCompany} onChange={(v) => update("inspectionCompany", v)} type="textarea" readOnly={readOnly} />

          <DocumentsList buildingId={buildingId} section="elevator" title="Documents ascenseur (PDF)" readOnly={readOnly} />

          <div className="flex justify-end gap-2 pt-2">
            {readOnly ? (
              <Button type="button" onClick={() => setEditing(true)}>
                <Pencil /> Apporter des modifications
              </Button>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={() => { setData(value); setEditing(false); }}>Annuler</Button>
                <Button type="submit">Enregistrer</Button>
              </>
            )}
          </div>
        </form>

        <Dialog open={openIdx !== null} onOpenChange={(o) => !o && setOpenIdx(null)}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Ascenseur {openIdx !== null ? openIdx + 1 : ""}</DialogTitle>
              <DialogDescription>Informations spécifiques à cet ascenseur.</DialogDescription>
            </DialogHeader>
            {openIdx !== null && (
              <div className="space-y-4">
                {(() => {
                  const u = units[openIdx];
                  const upd = <K extends keyof ElevatorUnit>(k: K, v: ElevatorUnit[K]) =>
                    updateUnit(openIdx, { ...u, [k]: v });
                  return (
                    <>
                      <div className="grid gap-4 md:grid-cols-2">
                        <FieldWithNA label="Marque" field={u.brand} onChange={(v) => upd("brand", v)} readOnly={readOnly} />
                        <FieldWithNA label="Modèle" field={u.model} onChange={(v) => upd("model", v)} readOnly={readOnly} />
                        <FieldWithNA label="Numéro de série" field={u.serialNumber} onChange={(v) => upd("serialNumber", v)} readOnly={readOnly} />
                        <FieldWithNA label="Année de mise en service" field={u.commissioningYear} onChange={(v) => upd("commissioningYear", v)} type="number" readOnly={readOnly} />
                        <FieldWithNA label="Capacité (kg / personnes)" field={u.capacity} onChange={(v) => upd("capacity", v)} readOnly={readOnly} />
                        <FieldWithNA label="Étages desservis" field={u.floorsServed} onChange={(v) => upd("floorsServed", v)} readOnly={readOnly} />
                      </div>
                      <FieldWithNA label="Emplacement" field={u.location} onChange={(v) => upd("location", v)} readOnly={readOnly} />
                      <FieldWithNA label="Accès lié" field={u.linkedAccess} onChange={(v) => upd("linkedAccess", v)} readOnly={readOnly} />
                      <FieldWithNA label="Commentaires" field={u.comments} onChange={(v) => upd("comments", v)} type="textarea" readOnly={readOnly} />
                      <DocumentsList buildingId={buildingId} section="elevator" label={`unit:${openIdx + 1}`} title={`Documents ascenseur ${openIdx + 1} (PDF)`} readOnly={readOnly} />
                    </>
                  );
                })()}
              </div>
            )}
            <DialogFooter>
              <Button type="button" onClick={() => setOpenIdx(null)}>Fermer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={breakdownIdx !== null} onOpenChange={(o) => { if (!o) { setBreakdownIdx(null); setGeneratedMessage(null); } }}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Pannes — Ascenseur {breakdownIdx !== null ? breakdownIdx + 1 : ""}</DialogTitle>
              <DialogDescription>Signaler une nouvelle panne, marquer comme résolu, et consulter l'historique.</DialogDescription>
            </DialogHeader>
            {breakdownIdx !== null && (
              <div className="space-y-6">
                <div className="space-y-3 rounded-md border p-4">
                  <p className="text-sm font-medium">Nouvelle panne</p>
                  <div className="space-y-2">
                    <Label>Type de panne / commentaire</Label>
                    <Textarea
                      value={breakdownComment}
                      onChange={(e) => setBreakdownComment(e.target.value)}
                      placeholder="Décrivez la panne..."
                      rows={3}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="tech-contacted"
                      checked={technicianContacted}
                      onCheckedChange={(c) => setTechnicianContacted(c === true)}
                    />
                    <Label htmlFor="tech-contacted" className="cursor-pointer">
                      Le technicien a été contacté pour intervention
                    </Label>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      onClick={async () => {
                        if (breakdownIdx === null) return;
                        const num = breakdownIdx + 1;
                        const access = units[breakdownIdx]?.linkedAccess?.value?.trim();
                        const techLine = technicianContacted
                          ? "Le technicien d'entretien a été contacté et interviendra dans les meilleurs délais."
                          : "Le technicien d'entretien sera contacté dans les meilleurs délais pour intervention.";
                        const bName = buildingName?.trim();
                        const bAddress = buildingAddress?.trim();
                        const msg = `Bonjour,\n\nNous vous informons qu'une panne a été signalée sur l'ascenseur ${num}${access ? ` (accès : ${access})` : ""}.${bName ? `\n\nImmeuble : ${bName}` : ""}${bAddress ? `\nAdresse : ${bAddress}` : ""}\n\nDescription de la panne :\n${breakdownComment || "(non précisée)"}\n\n${techLine}\n\nNous vous prions de bien vouloir nous excuser pour la gêne occasionnée et vous tiendrons informés de l'évolution de la situation.\n\nCordialement,`;
                        try {
                          await createBreakdown({
                            buildingId,
                            elevatorIndex: breakdownIdx,
                            comment: breakdownComment,
                            technicianContacted,
                          });
                          await refreshBreakdowns(breakdownIdx);
                          setBreakdownComment("");
                          setTechnicianContacted(false);
                          setGeneratedMessage(msg);
                          toast({ title: "Panne enregistrée" });
                        } catch (e) {
                          toast({ title: "Erreur", description: String(e), variant: "destructive" });
                        }
                      }}
                    >
                      Enregistrer & générer le message
                    </Button>
                  </div>
                  {generatedMessage && (
                    <div className="space-y-2">
                      <Label>Message à envoyer aux clients</Label>
                      <Textarea value={generatedMessage} onChange={(e) => setGeneratedMessage(e.target.value)} rows={8} />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          navigator.clipboard.writeText(generatedMessage);
                          toast({ title: "Message copié", description: "Le message a été copié dans le presse-papier." });
                        }}
                      >
                        <Copy /> Copier le message
                      </Button>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <p className="text-sm font-medium">Historique des pannes</p>
                  {breakdowns.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Aucune panne enregistrée.</p>
                  ) : (
                    <div className="space-y-3">
                      {breakdowns.map((b) => {
                        const resolved = !!b.resolved_date;
                        return (
                          <div key={b.id} className="rounded-md border p-3 space-y-2">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div className="text-sm">
                                <div>
                                  <span className="font-medium">Panne du :</span>{" "}
                                  {new Date(b.breakdown_date).toLocaleDateString("fr-FR")}
                                </div>
                                {resolved && (
                                  <div className="text-emerald-700 dark:text-emerald-400">
                                    <span className="font-medium">Résolue le :</span>{" "}
                                    {new Date(b.resolved_date as string).toLocaleDateString("fr-FR")}
                                  </div>
                                )}
                                {!resolved && (
                                  <div className="text-destructive font-medium">En cours</div>
                                )}
                              </div>
                              <div className="flex gap-2">
                                {!resolved && (
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      setResolvingId(b.id);
                                      setResolutionComment("");
                                    }}
                                  >
                                    <CheckCircle2 /> Panne résolue
                                  </Button>
                                )}
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="ghost"
                                  onClick={async () => {
                                    if (!confirm("Supprimer cette panne ?")) return;
                                    try {
                                      await deleteBreakdown(b.id);
                                      if (breakdownIdx !== null) await refreshBreakdowns(breakdownIdx);
                                    } catch (e) {
                                      toast({ title: "Erreur", description: String(e), variant: "destructive" });
                                    }
                                  }}
                                >
                                  <Trash2 />
                                </Button>
                              </div>
                            </div>
                            {b.comment && (
                              <div className="text-sm">
                                <span className="font-medium">Commentaire :</span> {b.comment}
                              </div>
                            )}
                            <div className="text-xs text-muted-foreground">
                              Technicien contacté : {b.technician_contacted ? "Oui" : "Non"}
                            </div>
                            {resolved && b.resolution_comment && (
                              <div className="text-sm">
                                <span className="font-medium">Résolution :</span> {b.resolution_comment}
                              </div>
                            )}
                            {resolvingId === b.id && (
                              <div className="space-y-2 pt-2 border-t">
                                <Label>Commentaire de résolution</Label>
                                <Textarea
                                  value={resolutionComment}
                                  onChange={(e) => setResolutionComment(e.target.value)}
                                  rows={3}
                                  placeholder="Décrivez comment la panne a été résolue..."
                                />
                                <div className="flex gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => { setResolvingId(null); setResolutionComment(""); }}
                                  >
                                    Annuler
                                  </Button>
                                  <Button
                                    type="button"
                                    size="sm"
                                    onClick={async () => {
                                      if (breakdownIdx === null) return;
                                      try {
                                        await resolveBreakdown(b.id, resolutionComment);
                                        await refreshBreakdowns(breakdownIdx);
                                        const num = breakdownIdx + 1;
                                        const access = units[breakdownIdx]?.linkedAccess?.value?.trim();
                                        const bName = buildingName?.trim();
                                        const bAddress = buildingAddress?.trim();
                                        const msg = `Bonjour,\n\nNous avons le plaisir de vous informer que la panne signalée sur l'ascenseur ${num}${access ? ` (accès : ${access})` : ""} a été résolue.${bName ? `\n\nImmeuble : ${bName}` : ""}${bAddress ? `\nAdresse : ${bAddress}` : ""}\n\nL'ascenseur est de nouveau pleinement opérationnel.${resolutionComment ? `\n\nDétails de la résolution :\n${resolutionComment}` : ""}\n\nNous vous remercions pour votre patience et votre compréhension.\n\nCordialement,`;
                                        setGeneratedMessage(msg);
                                        setResolvingId(null);
                                        setResolutionComment("");
                                        toast({ title: "Panne résolue" });
                                      } catch (e) {
                                        toast({ title: "Erreur", description: String(e), variant: "destructive" });
                                      }
                                    }}
                                  >
                                    Confirmer & générer le message
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            )}
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => { setBreakdownIdx(null); setGeneratedMessage(null); }}>Fermer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

// ---------- Accès ----------
interface AccessProps extends BaseProps {
  value: AccessInfo;
  onSave: (next: AccessInfo) => Promise<void>;
}

const DoorIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 21V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17" />
    <line x1="4" y1="21" x2="20" y2="21" />
    <circle cx="15" cy="12" r="0.8" fill="currentColor" />
  </svg>
);

export const AccessForm = ({ buildingId, value, onSave }: AccessProps) => {
  const [data, setData] = useState<AccessInfo>(value ?? emptyAccess());
  const { editing, setEditing } = useEditing(false);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const readOnly = !editing;
  const update = <K extends keyof AccessInfo>(k: K, v: AccessInfo[K]) =>
    setData((p) => ({ ...p, [k]: v }));

  const countNum = Math.max(0, Math.min(20, parseInt(data.accessCount?.value ?? "", 10) || 0));
  const units: AccessUnit[] = Array.from({ length: countNum }, (_, i) => data.units?.[i] ?? emptyAccessUnit());

  const updateUnit = (idx: number, next: AccessUnit) => {
    const arr = [...units];
    arr[idx] = next;
    setData((p) => ({ ...p, units: arr }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({ ...data, units });
    setEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Accès</CardTitle>
        <CardDescription>Modalités d'accès à l'immeuble.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-6">
          <FieldWithNA label="Nombre d'accès à l'immeuble" field={data.accessCount} onChange={(v) => update("accessCount", v)} type="number" readOnly={readOnly} />

          {countNum > 0 && (
            <div className="flex flex-wrap gap-2">
              {units.map((u, idx) => {
                const name = u.name?.value?.trim();
                const lots = u.linkedLots?.value?.trim();
                return (
                  <Button
                    key={idx}
                    type="button"
                    variant="outline"
                    onClick={() => setOpenIdx(idx)}
                    className="h-auto py-2"
                  >
                    <DoorIcon />
                    <span className="flex flex-col items-start leading-tight">
                      <span>{name || `Accès ${idx + 1}`}</span>
                      {lots && <span className="text-xs text-muted-foreground">Lots : {lots}</span>}
                    </span>
                  </Button>
                );
              })}
            </div>
          )}

          <YesNoFieldWithDoc
            label="Carte de reproduction de clé"
            value={data.keyReproductionCard}
            onChange={(v) => update("keyReproductionCard", v)}
            readOnly={readOnly}
            buildingId={buildingId}
            section="access"
            docLabel="keyReproductionCard"
            docDescription="Téléverser la carte de reproduction (PDF)."
          />

          <YesNoFieldWithDoc
            label="Badge d'accès"
            value={data.accessBadge}
            onChange={(v) => update("accessBadge", v)}
            readOnly={readOnly}
            buildingId={buildingId}
            section="access"
            docLabel="accessBadge"
            docDescription="Téléverser la liste des badges (PDF)."
          />

          <YesNoFieldWithDoc
            label="Télécommandes"
            value={data.remoteControls}
            onChange={(v) => update("remoteControls", v)}
            readOnly={readOnly}
            buildingId={buildingId}
            section="access"
            docLabel="remoteControls"
            docDescription="Téléverser la liste des télécommandes (PDF)."
          />

          <FieldWithNA label="Personne de contact pour donner accès" field={data.contactPerson} onChange={(v) => update("contactPerson", v)} type="textarea" readOnly={readOnly} />

          <DocumentsList buildingId={buildingId} section="access" label="general" title="Autres documents accès (PDF)" readOnly={readOnly} />

          <div className="flex justify-end gap-2 pt-2">
            {readOnly ? (
              <Button type="button" onClick={() => setEditing(true)}>
                <Pencil /> Apporter des modifications
              </Button>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={() => { setData(value); setEditing(false); }}>Annuler</Button>
                <Button type="submit">Enregistrer</Button>
              </>
            )}
          </div>
        </form>

        <Dialog open={openIdx !== null} onOpenChange={(o) => !o && setOpenIdx(null)}>
          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{openIdx !== null ? (units[openIdx]?.name?.value?.trim() || `Accès ${openIdx + 1}`) : ""}</DialogTitle>
              <DialogDescription>Informations spécifiques à cet accès.</DialogDescription>
            </DialogHeader>
            {openIdx !== null && (() => {
              const u = units[openIdx];
              const upd = <K extends keyof AccessUnit>(k: K, v: AccessUnit[K]) =>
                updateUnit(openIdx, { ...u, [k]: v });
              return (
                <div className="space-y-4">
                  <FieldWithNA label="Nom de l'accès" field={u.name} onChange={(v) => upd("name", v)} readOnly={readOnly} />
                  <FieldWithNA label="Lots liés à cet accès" field={u.linkedLots} onChange={(v) => upd("linkedLots", v)} type="textarea" readOnly={readOnly} />
                  <FieldWithNA label="Commentaires" field={u.comments} onChange={(v) => upd("comments", v)} type="textarea" readOnly={readOnly} />
                  <DocumentsList buildingId={buildingId} section="access" label={`unit:${openIdx + 1}`} title={`Documents accès ${openIdx + 1} (PDF)`} readOnly={readOnly} />
                </div>
              );
            })()}
            <DialogFooter>
              <Button type="button" onClick={() => setOpenIdx(null)}>Fermer</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

// ---------- Chauffage ----------
interface HeatingProps extends BaseProps {
  value: HeatingInfo;
  onSave: (next: HeatingInfo) => Promise<void>;
}

export const HeatingForm = ({ buildingId, value, onSave }: HeatingProps) => {
  const [data, setData] = useState<HeatingInfo>(value ?? emptyHeating());
  const { editing, setEditing } = useEditing(false);
  const readOnly = !editing;
  const update = <K extends keyof HeatingInfo>(k: K, v: HeatingInfo[K]) =>
    setData((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(data);
    setEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chauffage</CardTitle>
        <CardDescription>Informations sur le chauffage et son entretien.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-6">
          <FieldWithNA label="Nombre d'équipements" field={data.equipmentCount} onChange={(v) => update("equipmentCount", v)} type="number" readOnly={readOnly} />
          <FieldWithNA label="Type de chauffage" field={data.heatingType} onChange={(v) => update("heatingType", v)} readOnly={readOnly} />

          <div className="space-y-4 rounded-md border p-4">
            <p className="text-sm font-medium">Société d'entretien</p>
            <FieldWithNA label="Nom de la société" field={data.maintenanceCompanyName} onChange={(v) => update("maintenanceCompanyName", v)} readOnly={readOnly} />
            <FieldWithNA label="Email" field={data.maintenanceCompanyEmail} onChange={(v) => update("maintenanceCompanyEmail", v)} readOnly={readOnly} />
            <FieldWithNA label="Téléphone" field={data.maintenanceCompanyPhone} onChange={(v) => update("maintenanceCompanyPhone", v)} readOnly={readOnly} />
            <FieldWithNA label="Téléphone d'urgence" field={data.maintenanceCompanyEmergencyPhone} onChange={(v) => update("maintenanceCompanyEmergencyPhone", v)} readOnly={readOnly} />
          </div>

          <FieldWithNA label="Date du dernier entretien" field={data.lastMaintenanceDate} onChange={(v) => update("lastMaintenanceDate", v)} type="date" readOnly={readOnly} />
          <FieldWithNA label="Fréquence d'entretien" field={data.maintenanceFrequency} onChange={(v) => update("maintenanceFrequency", v)} readOnly={readOnly} />

          <HeatingMaintenanceLogs buildingId={buildingId} />

          <DocumentsList buildingId={buildingId} section="heating" title="Autres documents chauffage (PDF)" readOnly={readOnly} />

          <div className="flex justify-end gap-2 pt-2">
            {readOnly ? (
              <Button type="button" onClick={() => setEditing(true)}>
                <Pencil /> Apporter des modifications
              </Button>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={() => { setData(value); setEditing(false); }}>Annuler</Button>
                <Button type="submit">Enregistrer</Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// ---------- Attestation ----------
interface AttestationProps extends BaseProps {
  value: AttestationInfo;
  onSave: (next: AttestationInfo) => Promise<void>;
}

export const AttestationForm = ({ buildingId, value, onSave }: AttestationProps) => {
  const [data, setData] = useState<AttestationInfo>(value ?? emptyAttestation());
  const { editing, setEditing } = useEditing(false);
  const readOnly = !editing;
  const update = <K extends keyof AttestationInfo>(k: K, v: AttestationInfo[K]) =>
    setData((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(data);
    setEditing(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attestation</CardTitle>
        <CardDescription>
          Suivi des attestations réglementaires avec calcul automatique des dates d'échéance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-6">
          <CertificateDateField
            label="Analyse de risque ascenseur"
            field={data.elevatorRiskAnalysisDate}
            onChange={(v) => update("elevatorRiskAnalysisDate", v)}
            readOnly={readOnly}
            expiry={{ yearsToAdd: 15, alertWithinDays: 365 }}
            buildingId={buildingId}
            section="attestation"
            docLabel="elevatorRiskAnalysis"
          />

          <CertificateDateField
            label="Dernier contrôle périodique ascenseur"
            field={data.elevatorPeriodicInspectionDate}
            onChange={(v) => update("elevatorPeriodicInspectionDate", v)}
            readOnly={readOnly}
            buildingId={buildingId}
            section="attestation"
            docLabel="elevatorPeriodicInspection"
          />

          <CertificateYesNoDateField
            label="Permis d'environnement"
            value={data.environmentPermit}
            onChange={(v) => update("environmentPermit", v)}
            readOnly={readOnly}
            expiry={{ yearsToAdd: 15, alertWithinDays: Math.round(1.5 * 365) }}
            buildingId={buildingId}
            section="attestation"
            docLabel="environmentPermit"
          />

          <CertificateDateField
            label="Attestation conformité électrique"
            field={data.electricalConformityDate}
            onChange={(v) => update("electricalConformityDate", v)}
            readOnly={readOnly}
            expiry={{ yearsToAdd: 5, alertWithinDays: 90 }}
            buildingId={buildingId}
            section="attestation"
            docLabel="electricalConformity"
          />

          <CertificateYesNoDateField
            label="Attestation entretien chaudière"
            value={data.boilerMaintenance}
            onChange={(v) => update("boilerMaintenance", v)}
            readOnly={readOnly}
            redWhenPast
            buildingId={buildingId}
            section="attestation"
            docLabel="boilerMaintenance"
          />

          <DocumentsList
            buildingId={buildingId}
            section="attestation"
            label="general"
            title="Autres documents (PDF)"
            readOnly={readOnly}
          />

          <div className="flex justify-end gap-2 pt-2">
            {readOnly ? (
              <Button type="button" onClick={() => setEditing(true)}>
                <Pencil /> Apporter des modifications
              </Button>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={() => { setData(value); setEditing(false); }}>Annuler</Button>
                <Button type="submit">Enregistrer</Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// ---------- Technique ----------
interface TechnicalProps extends BaseProps {
  value: TechnicalInfo;
  onSave: (next: TechnicalInfo) => Promise<void>;
}

const SimpleYesNo = ({
  label,
  value,
  onChange,
  readOnly,
}: {
  label: string;
  value: { status: FieldStatus; value: YesNo };
  onChange: (v: { status: FieldStatus; value: YesNo }) => void;
  readOnly?: boolean;
}) => (
  <div className="space-y-1">
    <Label className="text-sm font-medium">{label}</Label>
    <RadioGroup
      value={value.status === "filled" ? value.value : ""}
      onValueChange={(v) => onChange({ status: "filled", value: v as YesNo })}
      disabled={readOnly}
      className="flex gap-4"
    >
      <div className="flex items-center gap-2">
        <RadioGroupItem id={`${label}-y`} value="yes" />
        <Label htmlFor={`${label}-y`} className="text-sm cursor-pointer">Oui</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem id={`${label}-n`} value="no" />
        <Label htmlFor={`${label}-n`} className="text-sm cursor-pointer">Non</Label>
      </div>
    </RadioGroup>
  </div>
);

export const TechnicalForm = ({ buildingId, value, onSave }: TechnicalProps) => {
  const [data, setData] = useState<TechnicalInfo>(value ?? emptyTechnical());
  const { editing, setEditing } = useEditing(false);
  const readOnly = !editing;
  const update = <K extends keyof TechnicalInfo>(k: K, v: TechnicalInfo[K]) =>
    setData((p) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(data);
    setEditing(false);
  };

  // Alert: today's month in passageMeters.readingMonths
  const currentMonth = new Date().getMonth();
  const showMeterAlert =
    data.passageMeters.status === "filled" &&
    data.passageMeters.value === "yes" &&
    data.passageMeters.readingMonths.includes(currentMonth as never);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technique</CardTitle>
        <CardDescription>Équipements et installations techniques de l'immeuble.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit} className="space-y-6">
          {showMeterAlert && (
            <div className="rounded-md border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
              <strong>Tâche gestionnaire :</strong> nous sommes en {MONTHS[currentMonth]} —
              le relevé des compteurs de passage doit être effectué ce mois-ci.
            </div>
          )}

          {/* Boîte à clé */}
          <div className="space-y-3 rounded-md border p-4">
            <SimpleYesNo
              label="Boîte à clé"
              value={data.keyBox}
              onChange={(v) => update("keyBox", v)}
              readOnly={readOnly}
            />
            {data.keyBox.value === "yes" && (
              <div className="space-y-3 pt-2">
                <FieldWithNA label="Code de la boîte à clé" field={data.keyBoxCode} onChange={(v) => update("keyBoxCode", v)} readOnly={readOnly} />
                <FieldWithNA label="Emplacement" field={data.keyBoxLocation} onChange={(v) => update("keyBoxLocation", v)} readOnly={readOnly} />
                <FieldWithNA label="Commentaire" field={data.keyBoxComment} onChange={(v) => update("keyBoxComment", v)} type="textarea" readOnly={readOnly} />
              </div>
            )}
          </div>

          {/* Compteurs de passage */}
          <div className="space-y-3 rounded-md border p-4">
            <SimpleYesNo
              label="Compteurs de passage"
              value={{ status: data.passageMeters.status, value: data.passageMeters.value }}
              onChange={(v) =>
                update("passageMeters", { ...data.passageMeters, status: v.status, value: v.value })
              }
              readOnly={readOnly}
            />
            {data.passageMeters.value === "yes" && (
              <div className="space-y-4 pt-2">
                <PassageMetersList
                  meters={data.passageMeters.meters}
                  onChange={(meters) => update("passageMeters", { ...data.passageMeters, meters })}
                  readOnly={readOnly}
                />
                <ReadingMonthsPicker
                  value={data.passageMeters.readingMonths}
                  onChange={(readingMonths) =>
                    update("passageMeters", { ...data.passageMeters, readingMonths })
                  }
                  readOnly={readOnly}
                />
              </div>
            )}
          </div>

          <SimpleYesNo label="Présence d'extincteurs" value={data.fireExtinguishers} onChange={(v) => update("fireExtinguishers", v)} readOnly={readOnly} />

          {/* Porte de garage */}
          <div className="space-y-3 rounded-md border p-4">
            <SimpleYesNo
              label="Porte de garage"
              value={data.garageDoor}
              onChange={(v) => update("garageDoor", v)}
              readOnly={readOnly}
            />
            {data.garageDoor.value === "yes" && (
              <div className="space-y-3 pt-2">
                <FieldWithNA label="Société de maintenance" field={data.garageDoorCompany} onChange={(v) => update("garageDoorCompany", v)} readOnly={readOnly} />
                <DocumentsList buildingId={buildingId} section="technical" label="garageDoorContract" title="Contrat porte de garage (PDF)" single readOnly={readOnly} />
              </div>
            )}
          </div>

          {/* Adoucisseur */}
          <div className="space-y-3 rounded-md border p-4">
            <SimpleYesNo
              label="Adoucisseur"
              value={data.waterSoftener}
              onChange={(v) => update("waterSoftener", v)}
              readOnly={readOnly}
            />
            {data.waterSoftener.value === "yes" && (
              <div className="space-y-3 pt-2">
                <FieldWithNA label="Société d'entretien" field={data.waterSoftenerMaintenanceCompany} onChange={(v) => update("waterSoftenerMaintenanceCompany", v)} readOnly={readOnly} />
                <FieldWithNA label="Société de livraison de sel" field={data.waterSoftenerSaltCompany} onChange={(v) => update("waterSoftenerSaltCompany", v)} readOnly={readOnly} />
              </div>
            )}
          </div>

          <SimpleYesNo label="Présence de lumières de secours" value={data.emergencyLighting} onChange={(v) => update("emergencyLighting", v)} readOnly={readOnly} />
          <SimpleYesNo label="Présence d'un exutoire de fumée" value={data.smokeVent} onChange={(v) => update("smokeVent", v)} readOnly={readOnly} />
          <SimpleYesNo label="Présence d'un dévidoir" value={data.hoseReel} onChange={(v) => update("hoseReel", v)} readOnly={readOnly} />
          <SimpleYesNo label="Présence d'une pompe de relevage" value={data.liftPump} onChange={(v) => update("liftPump", v)} readOnly={readOnly} />
          <SimpleYesNo label="Présence d'un suppresseur" value={data.pressureBooster} onChange={(v) => update("pressureBooster", v)} readOnly={readOnly} />

          {/* Caméras */}
          <div className="space-y-3 rounded-md border p-4">
            <SimpleYesNo
              label="Présence de caméras"
              value={data.cameras}
              onChange={(v) => update("cameras", v)}
              readOnly={readOnly}
            />
            {data.cameras.value === "yes" && (
              <FieldWithNA label="Commentaire (fonctionnement, emplacement)" field={data.camerasComment} onChange={(v) => update("camerasComment", v)} type="textarea" readOnly={readOnly} />
            )}
          </div>

          {/* Installations supplémentaires */}
          <div className="space-y-3 rounded-md border p-4">
            <p className="text-sm font-medium">Installations</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <SimpleYesNo label="Panneaux solaires" value={data.solarPanels} onChange={(v) => update("solarPanels", v)} readOnly={readOnly} />
              <SimpleYesNo label="Pompe à chaleur" value={data.heatPump} onChange={(v) => update("heatPump", v)} readOnly={readOnly} />
              <SimpleYesNo label="Cogénération" value={data.cogeneration} onChange={(v) => update("cogeneration", v)} readOnly={readOnly} />
              <SimpleYesNo label="Adoucisseur" value={data.waterSoftener} onChange={(v) => update("waterSoftener", v)} readOnly={readOnly} />
              <SimpleYesNo label="Compteur de passage eau" value={data.waterPassageMeter} onChange={(v) => update("waterPassageMeter", v)} readOnly={readOnly} />
              <SimpleYesNo label="Compteur de passage électricité" value={data.electricityPassageMeter} onChange={(v) => update("electricityPassageMeter", v)} readOnly={readOnly} />
              <SimpleYesNo label="Ascenseur à voiture" value={data.carElevator} onChange={(v) => update("carElevator", v)} readOnly={readOnly} />
              <SimpleYesNo label="Bornes de recharge" value={data.chargingStations} onChange={(v) => update("chargingStations", v)} readOnly={readOnly} />
              <SimpleYesNo label="Location d'une partie du bâtiment" value={data.partialRental} onChange={(v) => update("partialRental", v)} readOnly={readOnly} />
              <SimpleYesNo label="Installation PMR" value={data.pmrInstallation} onChange={(v) => update("pmrInstallation", v)} readOnly={readOnly} />
              <SimpleYesNo label="Piscine" value={data.pool} onChange={(v) => update("pool", v)} readOnly={readOnly} />
              <SimpleYesNo label="Sauna" value={data.sauna} onChange={(v) => update("sauna", v)} readOnly={readOnly} />
              <SimpleYesNo label="Local vélo" value={data.bikeRoom} onChange={(v) => update("bikeRoom", v)} readOnly={readOnly} />
              <SimpleYesNo label="Local poubelle" value={data.trashRoom} onChange={(v) => update("trashRoom", v)} readOnly={readOnly} />
              <SimpleYesNo label="Autre local technique" value={data.otherTechnicalRoom} onChange={(v) => update("otherTechnicalRoom", v)} readOnly={readOnly} />
              <SimpleYesNo label="Barrière d'accès" value={data.accessBarrier} onChange={(v) => update("accessBarrier", v)} readOnly={readOnly} />
            </div>
          </div>

          {/* Équipe de nettoyage */}
          <div className="space-y-3 rounded-md border p-4">
            <p className="text-sm font-medium">Équipe de nettoyage</p>
            <div className="space-y-2">
              <Label className="text-xs">Type</Label>
              <Select
                value={data.cleaningTeam.type || undefined}
                onValueChange={(v) =>
                  update("cleaningTeam", { ...data.cleaningTeam, type: v as "owner" | "company", name: "" })
                }
                disabled={readOnly}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner…" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="owner">Un propriétaire</SelectItem>
                  <SelectItem value="company">Une société</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {data.cleaningTeam.type === "owner" && (
              <div className="space-y-1">
                <Label className="text-xs">Nom du propriétaire</Label>
                <Input
                  value={data.cleaningTeam.name}
                  onChange={(e) => update("cleaningTeam", { ...data.cleaningTeam, name: e.target.value })}
                  disabled={readOnly}
                />
              </div>
            )}
            {data.cleaningTeam.type === "company" && (
              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs">Nom de la société</Label>
                  <Input
                    value={data.cleaningTeam.name}
                    onChange={(e) => update("cleaningTeam", { ...data.cleaningTeam, name: e.target.value })}
                    disabled={readOnly}
                  />
                </div>
                <DocumentsList buildingId={buildingId} section="technical" label="cleaningCompanyContract" title="Contrat société de nettoyage (PDF)" single readOnly={readOnly} />
              </div>
            )}
          </div>

          <DocumentsList buildingId={buildingId} section="technical" label="general" title="Autres documents techniques (PDF)" readOnly={readOnly} />

          <div className="flex justify-end gap-2 pt-2">
            {readOnly ? (
              <Button type="button" onClick={() => setEditing(true)}>
                <Pencil /> Apporter des modifications
              </Button>
            ) : (
              <>
                <Button type="button" variant="outline" onClick={() => { setData(value); setEditing(false); }}>Annuler</Button>
                <Button type="submit">Enregistrer</Button>
              </>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
