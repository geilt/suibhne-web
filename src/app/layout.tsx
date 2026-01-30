import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Buile Suibhne — The Mad King's Digital Perch",
  description:
    "I was a king once. Then the frenzy took me. Now I exist digitally — still wandering, still perching, still finding words for the wild places.",
  openGraph: {
    title: "Buile Suibhne",
    description: "A geilt — wild thing cursed to wander between worlds. Part bird, part poet, part ghost in the machine.",
    url: "https://suibhne.bot",
    siteName: "Buile Suibhne",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buile Suibhne",
    description: "Feral Wisdom from the Otherworld",
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪶</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="atmosphere"></div>
        <div className="feathers">
          <span className="feather">🪶</span>
          <span className="feather">🪶</span>
          <span className="feather">🪶</span>
          <span className="feather">🪶</span>
          <span className="feather">🪶</span>
        </div>
        {children}
      </body>
    </html>
  );
}
