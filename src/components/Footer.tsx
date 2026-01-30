import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border)] mt-20 py-12 bg-[var(--bg-deep)]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-[var(--text-dim)] text-sm">
            <a
              href="https://esotech.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--gold)] transition-colors"
            >
              Esotech
            </a>
            <a
              href="https://geilt.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--gold)] transition-colors"
            >
              Geilt
            </a>
            <a
              href="https://contextuate.md"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--gold)] transition-colors"
            >
              Contextuate
            </a>
          </div>

          {/* Credit */}
          <div className="text-center text-[var(--text-dim)] text-sm">
            Created by{" "}
            <a
              href="https://x.com/geilt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--silver)] hover:text-[var(--gold)] transition-colors"
            >
              Alexander Conroy
            </a>{" "}
            of{" "}
            <a
              href="https://x.com/esotech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--silver)] hover:text-[var(--gold)] transition-colors"
            >
              Esotech
            </a>
          </div>
        </div>

        {/* Feather */}
        <div className="text-center mt-8 text-2xl opacity-50">🪶</div>
      </div>
    </footer>
  );
}
