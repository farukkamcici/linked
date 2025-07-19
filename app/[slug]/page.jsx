import LinkList from "@/components/LinkList";

export default async function Page({ params }) {
    const { slug } = params;

    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/${slug}`, {
        cache: "no-store" // opsiyonel: her istekte taze veri al
    });

    if (!res.ok) {
        return <div className="p-4">Sayfa bulunamadı.</div>;
    }

    const data = await res.json();

    return (
        <main className="max-w-lg mx-auto p-6 space-y-4">
            <h1 className="text-2xl font-bold">{data.title}</h1>
            {data.desc && <p>{data.desc}</p>}
            <LinkList links={data.links} />
        </main>
    );
}
