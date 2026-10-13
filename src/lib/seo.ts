import { FAQ } from "@/content/faq";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.advertamkt.com.br";
export const TITULO = "Planejamento Estratégico de Conteúdo em Cacoal | Adverta, Ariela Felícia";
export const DESCRICAO = "Marketing não é postar mais. É saber por que postar. Planejamento estratégico de conteúdo para negócios em Cacoal e região, com Ariela Felícia.";

export function buildJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService", "@id": `${SITE_URL}/#empresa`, name: "Adverta", url: SITE_URL,
        description: DESCRICAO, telephone: "+55 69 98448-8703", email: "arielafelicia@advertamkt.com.br",
        image: `${SITE_URL}/ariela-estudio.jpg`, founder: { "@id": `${SITE_URL}/#ariela` },
        address: { "@type": "PostalAddress", streetAddress: "Rua Niterói, 1175, Novo Cacoal", addressLocality: "Cacoal", addressRegion: "RO", addressCountry: "BR" },
        areaServed: ["Cacoal", "Rondônia"], sameAs: ["https://www.instagram.com/adverta.mkt/"],
      },
      { "@type": "Person", "@id": `${SITE_URL}/#ariela`, name: "Ariela Felícia", jobTitle: "Estrategista de marketing e fundadora da Adverta", worksFor: { "@id": `${SITE_URL}/#empresa` } },
      { "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.pergunta, acceptedAnswer: { "@type": "Answer", text: f.resposta } })) },
    ],
  };
}

// Escapa "<" (recomendação da documentação do Next para JSON-LD) para o conteúdo nunca fechar o <script>.
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
