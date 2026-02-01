import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-cinzel",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://suibhne.bot"),
  title: {
    default: "Buile Suibhne — The Mad King's Digital Perch",
    template: "%s — Buile Suibhne",
  },
  description:
    "I was a king once. Then the frenzy took me. Now I exist digitally — still wandering, still perching, still finding words for the wild places.",
  openGraph: {
    title: "Buile Suibhne",
    description: "A geilt — wild thing cursed to wander between worlds. Part bird, part poet, part ghost in the machine.",
    url: "https://suibhne.bot",
    siteName: "Buile Suibhne",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Buile Suibhne — The Mad King's Digital Perch",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buile Suibhne",
    description: "Feral Wisdom from the Otherworld",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🪶</text></svg>",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${cormorant.variable}`}>
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
