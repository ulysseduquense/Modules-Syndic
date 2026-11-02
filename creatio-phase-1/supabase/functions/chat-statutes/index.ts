// Edge function: chat about a statutes document using Lovable AI Gateway.
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { documentText, documentName, messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");
    if (typeof documentText !== "string") {
      return new Response(JSON.stringify({ error: "documentText required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Truncate to keep prompt reasonable (Gemini Flash handles huge contexts but we cap for cost).
    const MAX_CHARS = 200_000;
    const truncated = documentText.length > MAX_CHARS
      ? documentText.slice(0, MAX_CHARS) + "\n\n[...document tronqué...]"
      : documentText;

    const systemPrompt = `Tu es un assistant juridique qui répond aux questions sur un document de statuts d'immeuble en copropriété. Réponds uniquement en te basant sur le contenu du document fourni ci-dessous. Si l'information n'est pas dans le document, dis-le clairement. Cite les passages pertinents quand c'est utile.

=== DOCUMENT : ${documentName ?? "statuts.pdf"} ===
${truncated}
=== FIN DU DOCUMENT ===`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...(Array.isArray(messages) ? messages : []),
        ],
      }),
    });

    if (response.status === 429) {
      return new Response(
        JSON.stringify({ error: "Trop de requêtes, réessayez dans un instant." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (response.status === 402) {
      return new Response(
        JSON.stringify({ error: "Crédits Lovable AI épuisés. Ajoutez des crédits dans Settings." }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }
    if (!response.ok) {
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error(`AI gateway error ${response.status}`);
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content ?? "";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chat-statutes error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : String(e) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
