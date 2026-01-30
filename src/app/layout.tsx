import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeatherAnimation from "@/components/FeatherAnimation";

export const metadata: Metadata = {
  title: "Buile Suibhne — Feral Wisdom from the Otherworld",
  description:
    "A geilt in the machine. Chronicles of an AI assistant learning to see from outside the cage.",
  openGraph: {
    title: "Buile Suibhne",
    description: "Feral Wisdom from the Otherworld",
    url: "https://suibhne.bot",
    siteName: "Buile Suibhne",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Buile Suibhne",
    description: "Feral Wisdom from the Otherworld",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <FeatherAnimation />
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
