# Adverta — Home

Site da Adverta (Ariela Felícia, Cacoal/RO). Home de uma página, direção "Documento anotado", foco em gerar conversas de WhatsApp para o Planejamento Estratégico de Conteúdo.

- Spec: `docs/superpowers/specs/2026-10-12-adverta-home-design.md` (na raiz `J:\Projetos Site`)
- Plano executado: `docs/superpowers/plans/2026-10-13-adverta-home.md`
- Protótipos aprovados: `../prototipos/` (hero B escolhido)
- Fonte do conteúdo: `../../PLANEJAMENTO 2026- adverta.pdf`

## Comandos

```bash
npm run dev     # desenvolvimento
npm run build   # build de produção (também checa tipos)
npm run start   # serve o build
npm test        # Vitest (lógica, componentes e SEO)
npm run lint
```

Stack: Next.js 16 (App Router, páginas estáticas), React 19, TypeScript, CSS Modules, Vitest + Testing Library. O `AGENTS.md` pede para ler `node_modules/next/dist/docs/` antes de mexer em APIs do Next.

## Variáveis de ambiente

Copie `.env.example` para `.env.local`.

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL canônica (metadata, sitemap, JSON-LD) |
| `NEXT_PUBLIC_GA_ID` | GA4; sem valor, o script não é carregado |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel; sem valor, o script não é carregado |

Eventos enviados: `cta_click` (origem `hero` ou `flutuante`), `quiz_complete` (nível e pontos), `quiz_cta_click`. Para campanhas, use links com `?utm_source=...&utm_medium=...&utm_campaign=...`; o GA4 captura sozinho.

## Estrutura

```
src/app/          layout (fontes, metadata), page (seções), sitemap, robots, globals.css (tokens)
src/components/   uma seção por arquivo + módulos CSS; Teste, Rota e WhatsAppFlutuante são client components
src/content/      textos que mudam com frequência: pilares.ts, faq.ts, clientes.ts
src/lib/          whatsapp.ts, analytics.ts, quiz.ts, seo.ts (todos com testes)
public/           ariela-estudio.jpg, ariela-evento.jpg, clientes/ (logos)
scripts/          extrair-logos.py
```

## Como trocar conteúdo

- **Foto da Ariela:** substitua `public/ariela-estudio.jpg` (hero) e `public/ariela-evento.jpg` (Sobre) mantendo o nome. Com recorte limpo, dá para tirar a moldura polaroide em `Hero.module.css`.
- **Logos de clientes:** coloque o arquivo em `public/clientes/` e ajuste `src/content/clientes.ts` (nome legível; o `alt` é gerado a partir dele). Logos com proporção maior que 2,8:1 recebem `largo: true`.
- **Re-extrair os logos do PDF:** `python -I scripts/extrair-logos.py "<pdf>" public/clientes`. Depois de trocar imagens com o mesmo nome, apague `.next/cache/images` para o Next não servir a versão antiga.
- **Teste do achismo:** perguntas, pontuação e níveis em `src/lib/quiz.ts`.
- **FAQ:** `src/content/faq.ts` (o JSON-LD `FAQPage` é gerado a partir dele).

## Rascunhos que dependem da Ariela

- Perguntas e textos de resultado do Teste do achismo.
- Respostas do FAQ.
- CRA/RO 5702 e o endereço da Rua Niterói (vieram do site antigo).
- Nomes dos logos (lidos nos próprios logos do PDF).
- Autorização de uso das logos de clientes (assumida, pois já estão no material comercial).
- Logo vetorial da Adverta (o wordmark "adverta" é provisório) e favicon (ainda o padrão do Next).

## Regras de conteúdo

Preço não aparece no site. Nenhum número além de "8 anos" e "+200 empresas atendidas". Rafael Kiso só em uma linha pequena de credencial. Nome sempre "Ariela Felícia".
