import { supabase } from "@/lib/supabaseClient";

export async function GET(req, { params }) {
    const { slug } = params;

    const { data, error } = await supabase
        .from("links")
        .select("*")
        .eq("slug", slug)
        .single();

    if (error || !data) {
        return new Response("Not found", { status: 404 });
    }

    // Expire kontrolü (opsiyonel)
    if (data.expired_at && new Date(data.expired_at) < new Date()) {
        return new Response("Expired", { status: 410 });
    }

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
}
