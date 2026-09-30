import type { Metadata, Viewport } from "next";
import { Archivo, Inter } from "next/font/google";
import "./globals.css";
import "@/styles/nav.css";
import "@/styles/hero.css";
import "@/styles/climb.css";
import "@/styles/problem.css";
import "@/styles/vida.css";
import "@/styles/always-on.css";
import "@/styles/services.css";
import "@/styles/niches.css";
import "@/styles/steps.css";
import "@/styles/founder.css";
import "@/styles/proof.css";
import "@/styles/booking.css";
import "@/styles/faq.css";
import "@/styles/final.css";
import { SITE } from "@/lib/site";

/* Archivo é a fonte da marca (títulos do site atual e da arte OG). O eixo
 * `wdth` entrega a versão condensada dos cartazes — "NO GOOGLE." — sem
 * carregar uma segunda família. */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "HR Digital · Seu negócio em primeiro lugar no Google",
  description:
    "Transformamos o Google no vendedor 24h da sua empresa. Diagnóstico gratuito de 15 minutos pelo WhatsApp com Hiago Ribeiro, fundador da HR Digital.",
  keywords: [
    "Google Meu Negócio",
    "Perfil da Empresa no Google",
    "marketing local",
    "SEO local",
    "primeiro lugar no Google",
    "HR Digital",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "HR Digital",
    title: "HR Digital · O renascimento do marketing local",
    description: "O seu negócio em primeiro lugar no Google. Diagnóstico gratuito em 15 minutos pelo WhatsApp.",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#07090f",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${inter.variable}`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
