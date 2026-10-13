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

## Verificação (13/10/2026)

- `npm test`: 39 testes passando (lógica, componentes, SEO). `npm run lint` e `tsc --noEmit` limpos. `npm run build` gera tudo estático.
- Lighthouse mobile (simulado, build de produção local): Performance 91–93, Acessibilidade 100, Boas práticas 100, SEO 100. CLS 0, TBT 40–90 ms.
- **LCP simulado: 3,0–3,3 s, acima da meta de 2,5 s.** No Chromium sem limitação a foto do hero aparece em ~300 ms (LCP e FCP), e o Lighthouse observa 1,3 s sem simulação. A estimativa simulada (4G lento + CPU 4x) soma ~2 s de atraso de renderização que não consegui atribuir. Tentativas que não mudaram o resultado: `preload` + `fetchPriority="high"` na foto, grão em PNG no lugar do filtro SVG, fontes estáticas, menos fontes pré-carregadas. Próximo passo possível: reduzir o JavaScript de hidratação (transformar os client components em ilhas menores) e medir no PageSpeed Insights com o site publicado.
- Conteúdo conferido no HTML do servidor (equivale a sem JavaScript): H1 único, todas as seções, FAQ e logos presentes, sem preço.
- Sem estouro horizontal em 320, 390, 1024, 1440 e 1905 px.
