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
    <div className="gradient-bg min-h-screen py-16 px-6">
      <article className="max-w-3xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="mb-4">{doc.title}</h1>
          {doc.description && (
            <p className="text-[var(--silver)] text-lg">{doc.description}</p>
          )}
        </header>

        <div className="prose mx-auto">
          <MDXRemote source={doc.content} />
        </div>

        <div className="text-center mt-16 pt-8 border-t border-[var(--border)]">
          <Link
            href="/library"
            className="text-[var(--gold)] hover:text-[var(--gold-glow)] font-[Cinzel] text-sm tracking-wider"
          >
            ← Back to Library
          </Link>
        </div>
      </article>
    </div>
  );
}
