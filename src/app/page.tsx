import { Hero } from "@/components/Hero";
import { Erro } from "@/components/Erro";
import { Virada } from "@/components/Virada";
import { OPlano } from "@/components/OPlano";
import { Pilares } from "@/components/Pilares";
import { PorQueAntes } from "@/components/PorQueAntes";
import { Teste } from "@/components/Teste";
import { Sobre } from "@/components/Sobre";
import { Prova } from "@/components/Prova";
import { Execucao } from "@/components/Execucao";
import { Faq } from "@/components/Faq";
import { Fechamento } from "@/components/Fechamento";
import { Faixa } from "@/components/Faixa";
import { Movimento } from "@/components/Movimento";
import { Rota } from "@/components/Rota";
import { WhatsAppFlutuante } from "@/components/WhatsAppFlutuante";
import { buildJsonLd, serializeJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd()) }} />
      <main className="papel" style={{ position: "relative" }}>
        <Rota />
        <Hero />
        <Faixa />
        <Erro />
        <Virada />
        <OPlano />
        <Pilares />
        <PorQueAntes />
        <Teste />
        <Sobre />
        <Prova />
        <Execucao />
        <Faq />
      </main>
      <Fechamento />
      <WhatsAppFlutuante />
      <Movimento />
    </>
  );
}
