import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE } from "@/lib/constants";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://rega-ecru.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl.endsWith("/") ? siteUrl.slice(0, -1) : siteUrl),
  title: `${SITE.name} | Auto usate a Treviglio`,
  description:
    "Compro e vendo auto usate a Treviglio (BG). Vetrina aggiornata, stima gratuita e contatto diretto su WhatsApp.",
  robots: { index: true, follow: true },
  openGraph: {
    title: `${SITE.name} | Auto usate a Treviglio`,
    description:
      "Guarda le auto in vendita o stima la tua. Contatto diretto su WhatsApp. Treviglio e provincia di Bergamo.",
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
    <html lang="it" className={`${inter.variable} h-full`}>
      <body className="min-h-full bg-slate-50 font-sans text-slate-900 antialiased tracking-tight">
        {children}
      </body>
    </html>
  );
}
