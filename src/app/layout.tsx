import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, TITULO, DESCRICAO } from "@/lib/seo";
import { Analytics } from "@/components/Analytics";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const mao = Caveat({ subsets: ["latin"], variable: "--font-mao", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITULO,
  description: DESCRICAO,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITULO, description: DESCRICAO, url: SITE_URL, siteName: "Adverta", locale: "pt_BR", type: "website",
    images: [{ url: "/ariela-estudio.jpg", width: 1200, height: 1800, alt: "Ariela Felícia, fundadora da Adverta" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${mao.variable} ${mono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
