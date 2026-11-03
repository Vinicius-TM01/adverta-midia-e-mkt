import type { Metadata } from "next";
import Image from "next/image";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import s from "./scopo.module.css";

// Apresentação privada para a cliente: fora do menu, do sitemap e da busca.
export const metadata: Metadata = {
  title: "Scopo · Proposta de marca | Adverta",
  description: "Apresentação da nova marca da Scopo Soluções Empresariais, feita pela Adverta.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: { canonical: "/apresentacao/scopo" },
  openGraph: {
    title: "Scopo · Proposta de marca",
    description: "Quatro opções para a nova marca da Scopo Soluções Empresariais.",
    images: [{ url: "/apresentacao/scopo/compartilhar.jpg", width: 1200, height: 630, alt: "Logo da Scopo em caixa alta com o alvo no lugar do O" }],
    type: "website", locale: "pt_BR", siteName: "Adverta",
  },
};

const OPCOES = [
  { n: 1, nome: "Alvo em destaque", texto: "O alvo do logo atual vira o O do nome, um pouco maior que as letras." },
  { n: 2, nome: "Alvo protagonista", texto: "O alvo cresce e vira o protagonista; as letras abrem espaço para ele." },
  { n: 3, nome: "Alvo fincado", texto: "O alvo apoiado na linha das letras, como um pino fincado no nome." },
  { n: 4, nome: "Sóbria e espaçada", texto: "Letras mais abertas, com o alvo em destaque. A versão mais institucional." },
];

const SRC = "/apresentacao/scopo";

export default function ApresentacaoScopo() {
  const whats = buildWhatsAppUrl("Oi! Vi a apresentação da nova marca da Scopo. A opção que mais combina com a gente é a ");
  return (
    <main className={s.pagina}>
      <header className={s.topo}>
        <span className={s.marca}>Adverta</span>
        <span className={s.rotulo}>Proposta de marca · Scopo Soluções Empresariais</span>
      </header>

      <section className={s.abertura}>
        <p className={s.kicker}>Rebranding · novembro de 2026</p>
        <h1>A nova marca da <em>Scopo</em></h1>
        <p className={s.lead}>
          Mantivemos o alvo, que é a essência da marca, e o trouxemos para dentro do nome. Caixa alta para uma presença mais séria,
          o subtítulo Soluções Empresariais e as cores bordô e azul-marinho mais profundas. São quatro opções; cada uma aparece com a marca e aplicada.
        </p>
        <nav className={s.indice} aria-label="Opções">
          {OPCOES.map((o) => (
            <a key={o.n} href={`#opcao-${o.n}`}><b>0{o.n}</b>{o.nome}</a>
          ))}
        </nav>
      </section>

      <figure className={s.slide}>
        <a href={`${SRC}/00-visao-geral.webp`} target="_blank" rel="noopener" aria-label="Abrir em tamanho cheio"><Image src={`${SRC}/00-visao-geral.webp`} alt="As quatro opções de logo da Scopo lado a lado, em fundo claro, bordô e marinho" width={2400} height={1700} sizes="(max-width: 1440px) 100vw, 1360px" priority /></a>
        <figcaption>As quatro opções lado a lado · toque para ampliar</figcaption>
      </figure>

      {OPCOES.map((o) => (
        <section key={o.n} id={`opcao-${o.n}`} className={s.opcao}>
          <div className={s.cab}>
            <span className={s.num}>0{o.n}</span>
            <div><h2>{o.nome}</h2><p>{o.texto}</p></div>
          </div>
          <figure className={s.slide}>
            <a href={`${SRC}/${o.n}-marca.webp`} target="_blank" rel="noopener" aria-label="Abrir em tamanho cheio"><Image src={`${SRC}/${o.n}-marca.webp`} alt={`Opção ${o.n}, ${o.nome}: logo, versões em bordô e marinho, ícones e paleta`} width={1920} height={1080} sizes="(max-width: 1440px) 100vw, 1360px" /></a>
            <figcaption>A marca</figcaption>
          </figure>
          <figure className={s.slide}>
            <a href={`${SRC}/${o.n}-aplicacoes.webp`} target="_blank" rel="noopener" aria-label="Abrir em tamanho cheio"><Image src={`${SRC}/${o.n}-aplicacoes.webp`} alt={`Opção ${o.n}, ${o.nome}: recepção, cartões, outdoor, uniforme e Instagram`} width={1920} height={1080} sizes="(max-width: 1440px) 100vw, 1360px" /></a>
            <figcaption>Aplicações</figcaption>
          </figure>
        </section>
      ))}

      <section className={s.fecho}>
        <h2>Qual opção é a cara da Scopo?</h2>
        <p>Escolha uma, ou combine detalhes de duas. A partir dela fechamos o desenho final, papelaria, redes, uniforme e o outdoor de janeiro.</p>
        <a className={s.cta} href={whats}>Responder pelo WhatsApp →</a>
      </section>

      <footer className={s.rodape}>Adverta · Mídia e Marketing</footer>
    </main>
  );
}
