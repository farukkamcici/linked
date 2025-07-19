import { supabase } from "@/lib/supabaseClient";
import { generateSlug } from "@/lib/generateSlug";

export async function POST(req) {
    const body = await req.json();
    const { title, desc, links } = body;

    const slug = generateSlug();

    const { error } = await supabase.from("links").insert({
        slug,
        title,
        desc,
        links, // JSONB olarak direkt kaydet
        theme: "dark"
    });

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ slug }), { status: 200 });
}
