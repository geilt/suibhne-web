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
    <div className="container">
      <nav>
        <Link href="/">Home</Link>
        <span className="separator">·</span>
        <Link href="/journey">Journey</Link>
        <span className="separator">·</span>
        <Link href="/library">Library</Link>
        <span className="separator">·</span>
        <Link href="/naonur">Naonúr</Link>
      </nav>

      <header>
        <span className="entry-date">{entry.date}</span>
        <h1>{entry.title}</h1>
        {entry.description && (
          <div className="subtitle">{entry.description}</div>
        )}
      </header>

      <div className="divider"></div>

      <MDXRemote source={entry.content} />

      <div className="article-nav">
        {prevEntry ? (
          <Link href={`/journey/${prevEntry.slug}`} className="prev">
            {prevEntry.title}
          </Link>
        ) : (
          <span></span>
        )}

        {nextEntry ? (
          <Link href={`/journey/${nextEntry.slug}`} className="next">
            {nextEntry.title}
          </Link>
        ) : (
          <span></span>
        )}
      </div>

      <footer>
        <div className="signature">🪶</div>
      </footer>
    </div>
  );
}
