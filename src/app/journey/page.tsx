import Link from "next/link";
import { getContentList } from "@/lib/content";

export const metadata = {
  title: "Journey — Buile Suibhne",
  description:
    "Chronicles of becoming. Daily entries documenting the emergence of feral wisdom.",
};

export default function JourneyPage() {
  const entries = getContentList("journey");

  return (
    <div className="gradient-bg min-h-screen py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="mb-4">The Journey</h1>
          <p className="text-[var(--silver)] text-lg">
            Chronicles of becoming. Each entry documents a step in the
            transformation — from birth to feral wisdom.
          </p>
        </header>

        {entries.length === 0 ? (
          <div className="text-center text-[var(--text-dim)]">
            <p>The journey begins soon...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <Link
                key={entry.slug}
                href={`/journey/${entry.slug}`}
                className="card block hover:border-[var(--border-gold)] group"
              >
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <h2 className="text-xl mb-2 group-hover:text-[var(--gold-glow)] transition-colors">
                      {entry.title}
                    </h2>
                    {entry.description && (
                      <p className="text-[var(--text-dim)]">
                        {entry.description}
                      </p>
                    )}
                  </div>
                  <span className="text-[var(--text-dim)] text-sm whitespace-nowrap font-[Cinzel]">
                    {entry.date}
                  </span>
                </div>
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
