import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BuildingForm } from "@/components/BuildingForm";
import { createBuilding } from "@/lib/buildings";
import { useToast } from "@/hooks/use-toast";
import type { BuildingBasicInfo } from "@/types/building";

const NewBuilding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreate = async (info: BuildingBasicInfo) => {
    try {
      const row = await createBuilding(info);
      toast({ title: "Immeuble créé", description: row.name });
      navigate(`/immeubles/${row.id}`);
    } catch (e) {
      toast({ title: "Erreur", description: String(e), variant: "destructive" });
    }
  };

  return (
    <main className="min-h-screen bg-background py-10 px-4">
      <div className="mx-auto max-w-5xl space-y-4">
        <Button variant="ghost" asChild>
          <Link to="/"><ArrowLeft /> Retour</Link>
        </Button>
        <BuildingForm onCreate={handleCreate} />
      </div>
    </main>
  );
};

export default NewBuilding;
