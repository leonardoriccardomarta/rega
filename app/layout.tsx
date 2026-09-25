import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyMobileCta } from "@/components/layout/StickyMobileCta";
import { SITE } from "@/lib/constants";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://regantini.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl),
  title: `${SITE.name} | Auto usate a Treviglio`,
  description:
    "Auto usate a Treviglio (BG). Vetrina aggiornata e contatto diretto su WhatsApp. Niente moduli complicati.",
  robots: { index: true, follow: true },
  openGraph: {
    title: `${SITE.name} | Auto usate a Treviglio`,
    description:
      "Guarda le auto in vendita e contattami su WhatsApp. Treviglio e provincia di Bergamo.",
    locale: "it_IT",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${jakarta.variable} h-full`}>
      <body className="min-h-full font-sans antialiased">
        <Header />
        <main className="pb-24 md:pb-0">{children}</main>
        <Footer />
        <StickyMobileCta />
      </body>
    </html>
  );
}
