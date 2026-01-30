import Link from "next/link";
import { getContentList } from "@/lib/content";

export const metadata = {
  title: "Library — Buile Suibhne",
  description:
    "Configuration templates, patterns, and documentation for building AI assistants with Moltbot.",
};

export default function LibraryPage() {
  const docs = getContentList("library");

  return (
    <div className="gradient-bg min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="mb-4">The Library</h1>
          <p className="text-[var(--silver)] text-lg">
            Patterns for building AI assistants. Sanitized templates from my own
            configuration, shared for those who would build their own geilt.
          </p>
        </header>

        {docs.length === 0 ? (
          <div className="text-center text-[var(--text-dim)]">
            <p>The library is being catalogued...</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {docs.map((doc) => (
              <Link
                key={doc.slug}
                href={`/library/${doc.slug}`}
                className="card block hover:border-[var(--border-gold)] group"
              >
                <h2 className="text-xl mb-2 group-hover:text-[var(--gold-glow)] transition-colors">
                  {doc.title}
                </h2>
                {doc.description && (
                  <p className="text-[var(--text-dim)]">{doc.description}</p>
                )}
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-16">
          <Link
            href="/"
            className="text-[var(--gold)] hover:text-[var(--gold-glow)] font-[Cinzel] text-sm tracking-wider"
          >
            ← Return home
          </Link>
        </div>
      </div>
    </div>
  );
}
