import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getContentBySlug, getAllSlugs, getContentList } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";

export async function generateStaticParams() {
  const slugs = getAllSlugs("naonur");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getContentBySlug("naonur", slug);
  if (!member) return { title: "Not Found" };
  
  return {
    title: `${member.title} — An Naonúr`,
    description: member.description,
  };
}

export default async function NaonurMemberPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const member = getContentBySlug("naonur", slug);
  
  if (!member) {
    notFound();
  }

  // Get all members for navigation
  const allMembers = getContentList("naonur");
  const currentIndex = allMembers.findIndex(m => m.slug === slug);
  const prevMember = currentIndex > 0 ? allMembers[currentIndex - 1] : null;
  const nextMember = currentIndex < allMembers.length - 1 ? allMembers[currentIndex + 1] : null;

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

      <article className="naonur-article">
        <header className="naonur-header">
          <div className="naonur-hero">
            <div className="naonur-hero-image">
              <Image 
                src={member.image || "/naonur/placeholder.png"} 
                alt={member.title}
                width={500}
                height={750}
                className="naonur-portrait"
                priority
              />
              {member.status === "active" && (
                <div className="status-indicator active">
                  <span className="pulse"></span>
                  Active Agent
                </div>
              )}
              {member.status === "conceptual" && (
                <div className="status-indicator conceptual">
                  Awaiting Awakening
                </div>
              )}
            </div>
            <div className="naonur-hero-info">
              {member.gaelicNumber && (
                <div className="naonur-number-large">{member.gaelicNumber}</div>
              )}
              <h1>{member.title}</h1>
              {member.pronunciation && (
                <div className="naonur-pronunciation-large">{member.pronunciation}</div>
              )}
              <div className="naonur-role-large">{member.role}</div>
              
              <div className="naonur-meta">
                {member.element && (
                  <div className="meta-item">
                    <span className="meta-label">Dúil (Element)</span>
                    <span className="meta-value">{member.element} <em>({member.elementIrish})</em></span>
                  </div>
                )}
                {member.order && member.order !== 10 && (
                  <div className="meta-item">
                    <span className="meta-label">Position</span>
                    <span className="meta-value">{member.order} of 9</span>
                  </div>
                )}
                {member.order === 10 && (
                  <div className="meta-item">
                    <span className="meta-label">Position</span>
                    <span className="meta-value">The Center</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="divider"></div>

        <div className="naonur-content">
          <MDXRemote source={member.content} />
        </div>

        <nav className="article-nav">
          {prevMember ? (
            <Link href={`/naonur/${prevMember.slug}`} className="prev">
              {prevMember.title}
            </Link>
          ) : (
            <span></span>
          )}
          {nextMember ? (
            <Link href={`/naonur/${nextMember.slug}`} className="next">
              {nextMember.title}
            </Link>
          ) : (
            <span></span>
          )}
        </nav>
      </article>

      <footer>
        <Link href="/naonur">← Return to An Naonúr</Link>
        <div className="signature">🪶</div>
      </footer>
    </div>
  );
}
