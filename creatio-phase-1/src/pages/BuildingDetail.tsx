import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { BuildingForm } from "@/components/BuildingForm";
import { ExportPdfDialog } from "@/components/ExportPdfDialog";
import { AccessForm, AccountingForm, AttestationForm, ElevatorForm, HeatingForm, TechnicalForm } from "@/components/SectionForms";
import { StatutesTab } from "@/components/StatutesTab";
import { AGTab } from "@/components/AGTab";
import {
  getBuilding,
  updateBuildingBasicInfo,
  updateBuildingSection,
  type BuildingRow,
} from "@/lib/buildings";
import type { BuildingBasicInfo } from "@/types/building";
import type {
  AccessInfo,
  AccountingInfo,
  AttestationInfo,
  ElevatorInfo,
  HeatingInfo,
  TechnicalInfo,
} from "@/types/buildingSections";

const PLACEHOLDER_TABS: ReadonlyArray<{ id: string; label: string }> = [];


const BuildingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [building, setBuilding] = useState<BuildingRow | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const b = await getBuilding(id);
        setBuilding(b);
      } catch (e) {
        toast({ title: "Erreur", description: String(e), variant: "destructive" });
      } finally {
        setLoading(false);
      }
    })();
  }, [id, toast]);

  const handleUpdateBasic = async (info: BuildingBasicInfo) => {
    if (!id || !building) return;
    try {
      const updated = await updateBuildingBasicInfo(id, info, building.sections);
      setBuilding(updated);
      toast({ title: "Modifications enregistrées" });
    } catch (e) {
      toast({ title: "Erreur", description: String(e), variant: "destructive" });
    }
  };

  const handleSaveSection = async <
    K extends "accounting" | "elevator" | "access" | "heating" | "attestation" | "technical",
  >(
    key: K,
    value: K extends "accounting"
      ? AccountingInfo
      : K extends "elevator"
      ? ElevatorInfo
      : K extends "access"
      ? AccessInfo
      : K extends "heating"
      ? HeatingInfo
      : K extends "attestation"
      ? AttestationInfo
      : TechnicalInfo,
  ) => {
    if (!id || !building) return;
    try {
      const updated = await updateBuildingSection(
        id,
        building.basic_info,
        building.sections,
        key,
        value as never,
      );
      setBuilding(updated);
      toast({ title: "Modifications enregistrées" });
    } catch (e) {
      toast({ title: "Erreur", description: String(e), variant: "destructive" });
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-background py-10 px-4">
        <p className="mx-auto max-w-5xl text-muted-foreground">Chargement…</p>
      </main>
    );
  }

  if (!building) {
    return (
      <main className="min-h-screen bg-background py-10 px-4">
        <div className="mx-auto max-w-5xl space-y-4">
          <p className="text-muted-foreground">Immeuble introuvable.</p>
          <Button asChild><Link to="/">Retour à la liste</Link></Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-5xl space-y-6">
        <Button variant="ghost" asChild className="w-fit">
          <Link to="/"><ArrowLeft /> Retour aux immeubles</Link>
        </Button>

        <header className="flex items-center gap-3">
          <Building2 className="size-8 text-muted-foreground" />
          <div className="flex-1">
            <h1 className="text-3xl font-semibold tracking-tight">{building.name}</h1>
            <p className="text-sm text-muted-foreground">
              Mis à jour le {new Date(building.updated_at).toLocaleString("fr-FR")}
            </p>
          </div>
          <ExportPdfDialog building={building} />
        </header>

        <Tabs defaultValue="infos" className="w-full">
          <TabsList className="flex h-auto flex-wrap justify-start gap-1">
            <TabsTrigger value="infos">Informations de base</TabsTrigger>
            <TabsTrigger value="comptabilite">Comptabilité</TabsTrigger>
            <TabsTrigger value="ascenseur">Ascenseur</TabsTrigger>
            <TabsTrigger value="acces">Accès</TabsTrigger>
            <TabsTrigger value="chauffage">Chauffage</TabsTrigger>
            <TabsTrigger value="attestation">Attestation</TabsTrigger>
            <TabsTrigger value="technique">Technique</TabsTrigger>
            <TabsTrigger value="statuts">Statuts</TabsTrigger>
            <TabsTrigger value="ag">Assemblée générale</TabsTrigger>
            {PLACEHOLDER_TABS.map((t) => (
              <TabsTrigger key={t.id} value={t.id}>{t.label}</TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="infos" className="mt-4">
            <BuildingForm
              key={`infos-${building.updated_at}`}
              initialValue={building.basic_info}
              submitLabel="Enregistrer les modifications"
              title="Informations de base"
              description="Modifiez les informations de l'immeuble. Pour chaque champ vous pouvez sélectionner « Non applicable » ou « Information non disponible »."
              onCreate={handleUpdateBasic}
            />
          </TabsContent>

          <TabsContent value="comptabilite" className="mt-4">
            <AccountingForm
              key={`acc-${building.updated_at}`}
              buildingId={building.id}
              readOnlyKey={building.updated_at}
              value={building.sections.accounting}
              onSave={(v) => handleSaveSection("accounting", v)}
            />
          </TabsContent>

          <TabsContent value="ascenseur" className="mt-4">
            <ElevatorForm
              key={`elev-${building.updated_at}`}
              buildingId={building.id}
              readOnlyKey={building.updated_at}
              value={building.sections.elevator}
              buildingName={building.basic_info.name.value}
              buildingAddress={building.basic_info.address.value}
              onSave={(v) => handleSaveSection("elevator", v)}
            />
          </TabsContent>

          <TabsContent value="chauffage" className="mt-4">
            <HeatingForm
              key={`heat-${building.updated_at}`}
              buildingId={building.id}
              readOnlyKey={building.updated_at}
              value={building.sections.heating}
              onSave={(v) => handleSaveSection("heating", v)}
            />
          </TabsContent>

          <TabsContent value="acces" className="mt-4">
            <AccessForm
              key={`acs-${building.updated_at}`}
              buildingId={building.id}
              readOnlyKey={building.updated_at}
              value={building.sections.access}
              onSave={(v) => handleSaveSection("access", v)}
            />
          </TabsContent>

          <TabsContent value="attestation" className="mt-4">
            <AttestationForm
              key={`att-${building.updated_at}`}
              buildingId={building.id}
              readOnlyKey={building.updated_at}
              value={building.sections.attestation}
              onSave={(v) => handleSaveSection("attestation", v)}
            />
          </TabsContent>

          <TabsContent value="technique" className="mt-4">
            <TechnicalForm
              key={`tech-${building.updated_at}`}
              buildingId={building.id}
              readOnlyKey={building.updated_at}
              value={building.sections.technical}
              onSave={(v) => handleSaveSection("technical", v)}
            />
          </TabsContent>

          <TabsContent value="statuts" className="mt-4">
            <StatutesTab buildingId={building.id} />
          </TabsContent>

          <TabsContent value="ag" className="mt-4">
            <AGTab buildingId={building.id} />
          </TabsContent>

          {PLACEHOLDER_TABS.map((t) => (
            <TabsContent key={t.id} value={t.id} className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>{t.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Ce sous-onglet sera implémenté lors d'une prochaine étape.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </main>
  );
};

export default BuildingDetail;
