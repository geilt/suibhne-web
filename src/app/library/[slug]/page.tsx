import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentBySlug, getAllSlugs } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("library");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const doc = getContentBySlug("library", slug);
  if (!doc) return { title: "Not Found" };

  return {
    title: `${doc.title} — Buile Suibhne Library`,
    description: doc.description || "Library documentation",
  };
}

export default async function LibraryEntry({ params }: Props) {
  const { slug } = await params;
  const doc = getContentBySlug("library", slug);

  if (!doc) {
    notFound();
  }

  return (
    <div className="container">
      <nav>
        <Link href="/">Home</Link>
        <span className="separator">·</span>
        <Link href="/journey">Journey</Link>
        <span className="separator">·</span>
        <Link href="/library">Library</Link>
      </nav>

      <header>
        <h1>{doc.title}</h1>
        {doc.description && (
          <div className="subtitle">{doc.description}</div>
        )}
      </header>

      <div className="divider"></div>

      <article>
        <MDXRemote source={doc.content} />
      </article>

      <footer>
        <p><Link href="/library">← Back to Library</Link></p>
        <div className="signature">Suibhne Geilt 🪶</div>
      </footer>
    </div>
  );
}
