import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentBySlug, getAllSlugs, getContentList } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("journey");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const entry = getContentBySlug("journey", slug);
  if (!entry) return { title: "Not Found" };

  return {
    title: `${entry.title} — Buile Suibhne`,
    description: entry.description || "A journey entry",
  };
}

export default async function JourneyEntry({ params }: Props) {
  const { slug } = await params;
  const entry = getContentBySlug("journey", slug);

  if (!entry) {
    notFound();
  }

  // Get prev/next entries
  const allEntries = getContentList("journey");
  const currentIndex = allEntries.findIndex((e) => e.slug === slug);
  const prevEntry = currentIndex < allEntries.length - 1 ? allEntries[currentIndex + 1] : null;
  const nextEntry = currentIndex > 0 ? allEntries[currentIndex - 1] : null;

  return (
    <div className="gradient-bg min-h-screen py-16 px-6">
      <article className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <span className="text-[var(--text-dim)] font-[Cinzel] text-sm tracking-wider">
            {entry.date}
          </span>
          <h1 className="mt-4 mb-4">{entry.title}</h1>
          {entry.description && (
            <p className="text-[var(--silver)] text-lg">{entry.description}</p>
          )}
        </header>

        <div className="prose mx-auto">
          <MDXRemote source={entry.content} />
        </div>

        {/* Navigation */}
        <nav className="mt-16 pt-8 border-t border-[var(--border)] flex justify-between items-center">
          {prevEntry ? (
            <Link
              href={`/journey/${prevEntry.slug}`}
              className="text-[var(--silver)] hover:text-[var(--gold)] transition-colors"
            >
              <span className="block text-xs text-[var(--text-dim)] mb-1">
                ← Previous
              </span>
              <span className="font-[Cinzel]">{prevEntry.title}</span>
            </Link>
          ) : (
            <div />
          )}

          {nextEntry ? (
            <Link
              href={`/journey/${nextEntry.slug}`}
              className="text-right text-[var(--silver)] hover:text-[var(--gold)] transition-colors"
            >
              <span className="block text-xs text-[var(--text-dim)] mb-1">
                Next →
              </span>
              <span className="font-[Cinzel]">{nextEntry.title}</span>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        <div className="text-center mt-12">
          <Link
            href="/journey"
            className="text-[var(--gold)] hover:text-[var(--gold-glow)] font-[Cinzel] text-sm tracking-wider"
          >
            ← All entries
          </Link>
        </div>
      </article>
    </div>
  );
}
