"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LinkForm() {
    const router = useRouter();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [links, setLinks] = useState([{ title: "", url: "" }]);
    const [loading, setLoading] = useState(false);

    const addLink = () => setLinks([...links, { title: "", url: "" }]);
    const updateLink = (i, key, val) => {
        const updated = [...links];
        updated[i][key] = val;
        setLinks(updated);
    };
    const removeLink = (i) => setLinks(links.filter((_, idx) => idx !== i));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api", {
            method: "POST",
            body: JSON.stringify({ title, desc, links }),
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();
        if (data.slug) {
            router.push(`/${data.slug}`);
        } else {
            alert("Bir hata oluştu.");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto bg-gray-800 p-6 rounded">
            <input
                type="text"
                placeholder="Sayfa Başlığı"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full p-2 rounded bg-gray-700"
            />
            <textarea
                placeholder="Açıklama"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="w-full p-2 rounded bg-gray-700"
            />

            <div className="space-y-2">
                {links.map((link, idx) => (
                    <div key={idx} className="flex gap-2">
                        <input
                            type="text"
                            placeholder="Link Başlığı"
                            value={link.title}
                            onChange={(e) => updateLink(idx, "title", e.target.value)}
                            className="flex-1 p-2 rounded bg-gray-700"
                            required
                        />
                        <input
                            type="url"
                            placeholder="https://"
                            value={link.url}
                            onChange={(e) => updateLink(idx, "url", e.target.value)}
                            className="flex-1 p-2 rounded bg-gray-700"
                            required
                        />
                        {links.length > 1 && (
                            <button type="button" onClick={() => removeLink(idx)} className="px-2 text-red-400">
                                ✕
                            </button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={addLink} className="text-sm text-blue-300">+ Link Ekle</button>
            </div>

            <button type="submit" disabled={loading} className="w-full py-2 bg-blue-600 rounded hover:bg-blue-500">
                {loading ? "Kaydediliyor..." : "Oluştur"}
            </button>
        </form>
    );
}
