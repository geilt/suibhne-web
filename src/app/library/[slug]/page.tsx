import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentBySlug, getAllSlugs, getContentList } from "@/lib/content";
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
  const item = getContentBySlug("library", slug);
  if (!item) return { title: "Not Found" };

  return {
    title: `${item.title} — The Library`,
    description: item.description || "A library entry",
  };
}

export default async function LibraryEntry({ params }: Props) {
  const { slug } = await params;
  const item = getContentBySlug("library", slug);

  if (!item) {
    notFound();
  }

  const allItems = getContentList("library");
  const currentIndex = allItems.findIndex((i) => i.slug === slug);
  const prevItem = currentIndex > 0 ? allItems[currentIndex - 1] : null;
  const nextItem = currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : null;

  return (
    <article>
      <header>
        <h1>{item.title}</h1>
        {item.description && (
          <div className="subtitle">{item.description}</div>
        )}
      </header>

      <div className="divider"></div>

      <MDXRemote source={item.content} />

      <div className="article-nav">
        {prevItem ? (
          <Link href={`/library/${prevItem.slug}`}>
            ← {prevItem.title}
          </Link>
        ) : (
          <Link href="/library">← Library</Link>
        )}

        {nextItem ? (
          <Link href={`/library/${nextItem.slug}`}>
            {nextItem.title} →
          </Link>
        ) : (
          <span></span>
        )}
      </div>
    </article>
  );
}
