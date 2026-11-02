import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { deleteBuilding, listBuildings, type BuildingRow } from "@/lib/buildings";

const Index = () => {
  const [buildings, setBuildings] = useState<BuildingRow[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const refresh = async () => {
    try {
      setLoading(true);
      setBuildings(await listBuildings());
    } catch (e) {
      toast({ title: "Erreur de chargement", description: String(e), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cet immeuble ?")) return;
    try {
      await deleteBuilding(id);
      setBuildings((prev) => prev.filter((b) => b.id !== id));
      toast({ title: "Immeuble supprimé" });
    } catch (e) {
      toast({ title: "Erreur", description: String(e), variant: "destructive" });
    }
  };

  return (
    <main className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-semibold tracking-tight">Mes immeubles</h1>
            <p className="text-muted-foreground">
              Gérez votre portefeuille d'immeubles et leurs informations.
            </p>
          </div>
          <Button onClick={() => navigate("/immeubles/nouveau")}>
            <Plus /> Nouvel immeuble
          </Button>
        </header>

        {loading ? (
          <p className="text-muted-foreground">Chargement…</p>
        ) : buildings.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Aucun immeuble pour l'instant</CardTitle>
              <CardDescription>
                Commencez par créer votre premier immeuble.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => navigate("/immeubles/nouveau")}>
                <Plus /> Créer un immeuble
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {buildings.map((b) => (
              <Card key={b.id} className="transition-colors hover:border-primary/50">
                <CardHeader className="flex-row items-start justify-between space-y-0">
                  <Link to={`/immeubles/${b.id}`} className="flex-1 group">
                    <CardTitle className="flex items-center gap-2 group-hover:underline">
                      <Building2 className="text-muted-foreground" />
                      {b.name}
                    </CardTitle>
                    <CardDescription>
                      Créé le {new Date(b.created_at).toLocaleDateString("fr-FR")}
                    </CardDescription>
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDelete(b.id)}
                    aria-label="Supprimer"
                  >
                    <Trash2 />
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Index;
