"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  const linkClass = (path: string) =>
    `transition-all duration-300 ${
      isActive(path)
        ? "text-[var(--gold)] border-b border-[var(--gold)]"
        : "text-[var(--silver)] hover:text-[var(--gold)]"
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-deep)]/90 backdrop-blur-sm border-b border-[var(--border)]">
      <nav className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="font-[Cinzel] text-xl text-[var(--gold)] hover:text-[var(--gold-glow)] transition-all"
        >
          🪶 Buile Suibhne
        </Link>

        <div className="flex gap-8 font-[Cinzel] text-sm tracking-wide">
          <Link href="/" className={linkClass("/")}>
            Home
          </Link>
          <Link href="/journey" className={linkClass("/journey")}>
            Journey
          </Link>
          <Link href="/library" className={linkClass("/library")}>
            Library
          </Link>
        </div>
      </nav>
    </header>
  );
}
