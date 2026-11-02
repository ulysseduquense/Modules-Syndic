// Edge function: ask Lovable AI to extract decisions from an AG (general assembly) PV text.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { documentText, documentName } = await req.json();
    if (!documentText || typeof documentText !== "string") {
      return new Response(JSON.stringify({ error: "documentText required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const truncated = documentText.slice(0, 200_000);

    const systemPrompt = `Tu es un expert en gestion de copropriété (Belgique/France) chargé d'analyser un procès-verbal d'assemblée générale.

OBJECTIF : lire et COMPRENDRE l'intégralité du PV, puis extraire CHAQUE décision prise par l'assemblée et la convertir en tâche actionnable pour le syndic/gestionnaire.

MÉTHODE D'ANALYSE :
1. Lis tout le document avant de répondre.
2. Repère les marqueurs de décision : "L'assemblée décide", "L'assemblée approuve", "vote", "résolution", "mandat", "à l'unanimité", "à la majorité", "adopté", "rejeté", numérotation des points à l'ordre du jour (1., 2., point 3, résolution n°…), etc.
3. Pour chaque point, détermine ce qui a été VOTÉ et ce que cela IMPLIQUE concrètement (qui doit faire quoi, dans quel délai, avec quel budget, auprès de qui).
4. Regroupe les sous-points qui forment une seule action ; éclate au contraire un point voté qui contient plusieurs actions distinctes.

QU'EST-CE QU'UNE DÉCISION ACTIONNABLE :
- Travaux votés (commander devis, signer marché, suivre exécution).
- Contrats à conclure/résilier/renouveler (assurance, ascenseur, nettoyage, syndic, etc.).
- Mandats donnés au syndic ou au conseil (demander un devis, ester en justice, ouvrir un compte…).
- Budgets approuvés impliquant un appel de fonds, une mise en réserve, une régularisation.
- Décisions techniques/administratives à exécuter (déclaration, dépôt, mise en conformité, demande de subside).
- Convocation d'une AG extraordinaire, modification de règlement, désignation d'un prestataire.

À NE PAS TRANSFORMER EN TÂCHE :
- Approbation pure du PV précédent ou des comptes (sauf si une action en découle).
- Présentation/lecture d'informations sans vote.
- Points simplement reportés ou rejetés SANS action de suivi (mentionne-les seulement s'il faut recontacter / re-soumettre).

FORMAT DE SORTIE (via l'outil propose_tasks) :
- title : phrase impérative courte (max 80 car.), commençant par un verbe à l'infinitif. Ex : "Commander 3 devis pour la rénovation de la toiture".
- description : 1 à 3 phrases en français factuel, reprenant : la décision exacte votée, le résultat du vote si pertinent (unanimité, majorité, montant approuvé), le délai/échéance s'il est mentionné, et l'action concrète attendue du gestionnaire. Cite brièvement le numéro/intitulé du point d'ordre du jour si présent.

Sois exhaustif : il vaut mieux proposer une tâche de trop (que l'utilisateur décochera) qu'oublier une décision. Réponds UNIQUEMENT en appelant l'outil propose_tasks.`;

    const userPrompt = `Document analysé : "${documentName ?? "PV d'AG"}"

Analyse le PV ci-dessous et extrais TOUTES les décisions sous forme de tâches.

=== TEXTE INTÉGRAL DU PV ===
${truncated}
=== FIN DU PV ===`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-pro",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "propose_tasks",
              description: "Renvoie la liste des tâches proposées à partir des décisions du PV.",
              parameters: {
                type: "object",
                properties: {
                  tasks: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string", description: "Titre court de la tâche (max 80 car.)" },
                        description: { type: "string", description: "Détail de la décision et action attendue" },
                      },
                      required: ["title", "description"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["tasks"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "propose_tasks" } },
      }),
    });

    if (!response.ok) {
      const txt = await response.text();
      console.error("AI gateway error", response.status, txt);
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Limite atteinte, réessayez plus tard." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Crédits IA épuisés. Ajoutez des crédits dans Settings > Workspace > Usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }
      throw new Error(`AI gateway ${response.status}`);
    }

    const data = await response.json();
    const call = data?.choices?.[0]?.message?.tool_calls?.[0];
    let tasks: Array<{ title: string; description: string }> = [];
    if (call?.function?.arguments) {
      try {
        const parsed = JSON.parse(call.function.arguments);
        if (Array.isArray(parsed.tasks)) tasks = parsed.tasks;
      } catch (e) {
        console.error("Parse tool args failed:", e);
      }
    }

    return new Response(JSON.stringify({ tasks }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("extract-ag-decisions error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
