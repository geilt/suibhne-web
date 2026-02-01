import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentBySlug, getAllSlugs } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("dail");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getContentBySlug("dail", slug);
  if (!entry) return { title: "Gathering Not Found" };

  return {
    title: entry.title,
    description: entry.description,
    openGraph: {
      title: `${entry.title} — Dáil na nDúile`,
      description: entry.description,
      url: `https://suibhne.bot/dail-duile/${slug}`,
      type: "article",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: entry.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${entry.title} — Dáil na nDúile`,
      description: entry.description,
      images: ["/og-image.png"],
    },
  };
}

export default async function DailEntryPage({ params }: Props) {
  const { slug } = await params;
  const entry = getContentBySlug("dail", slug);
  if (!entry) notFound();

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
        <span className="separator">·</span>
        <Link href="/dail-duile">Dáil</Link>
      </nav>

      <header>
        <span className="icon">🔥</span>
        <h1>{entry.title}</h1>
        {entry.date && <div className="entry-date">{entry.date}</div>}
        {entry.description && <div className="subtitle">{entry.description}</div>}
      </header>

      <div className="divider"></div>

      <article className="prose dail-prose">
        <MDXRemote source={entry.content} />
      </article>

      <footer>
        <p><Link href="/dail-duile">← Back to the Dáil</Link></p>
        <div className="signature">🪶</div>
      </footer>
    </div>
  );
}
