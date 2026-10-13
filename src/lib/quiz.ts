export type Opcao = { texto: string; pontos: 0 | 1 | 2 };
export type Pergunta = { pilar: string; texto: string; opcoes: [Opcao, Opcao, Opcao] };
export type Nivel = { id: "achismo" | "caminho" | "direcao"; nome: string; texto: string };

export const PERGUNTAS: Pergunta[] = [
  { pilar: "Posicionamento", texto: "O que faz um cliente escolher você, e não outro profissional da área?",
    opcoes: [{ texto: "Não sei dizer com clareza", pontos: 0 }, { texto: "Tenho uma ideia, mas nunca coloquei no papel", pontos: 1 }, { texto: "Está definido e aparece na minha comunicação", pontos: 2 }] },
  { pilar: "Público prioritário", texto: "Você sabe dizer, em uma frase, quem vale mais atrair, e quem evitar?",
    opcoes: [{ texto: "Atendo quem aparecer", pontos: 0 }, { texto: "Sei mais ou menos", pontos: 1 }, { texto: "Tenho o público prioritário definido", pontos: 2 }] },
  { pilar: "Jornada do cliente", texto: "Você sabe como alguém descobre seu negócio, confia e fecha com você?",
    opcoes: [{ texto: "Não acompanho esse caminho", pontos: 0 }, { texto: "Conheço partes dele", pontos: 1 }, { texto: "Conheço cada etapa e o que comunicar nela", pontos: 2 }] },
  { pilar: "Territórios e temas", texto: "Como você decide o que postar?",
    opcoes: [{ texto: "No dia, conforme a inspiração", pontos: 0 }, { texto: "Sigo tendências e datas comemorativas", pontos: 1 }, { texto: "Tenho temas definidos para construir autoridade", pontos: 2 }] },
  { pilar: "Canais certos", texto: "Você escolheu onde estar com base no seu público e no seu setor?",
    opcoes: [{ texto: "Estou onde todo mundo está", pontos: 0 }, { texto: "Escolhi alguns canais, sem critério claro", pontos: 1 }, { texto: "Cada canal tem uma função definida", pontos: 2 }] },
  { pilar: "Indicadores", texto: "O que você acompanha para saber se está funcionando?",
    opcoes: [{ texto: "Curtidas e seguidores", pontos: 0 }, { texto: "Alguns números, sem rotina", pontos: 1 }, { texto: "Indicadores ligados a contato e venda", pontos: 2 }] },
];

const NIVEIS: Record<Nivel["id"], Nivel> = {
  achismo: { id: "achismo", nome: "Achismo puro", texto: "Hoje seu marketing depende de inspiração. Antes de postar mais, vale definir a base: o que comunicar, para quem e com qual objetivo." },
  caminho: { id: "caminho", nome: "Meio caminho", texto: "Você já tem partes da direção, mas elas ainda não formam um mapa. Planejar costura o que existe e mostra o que falta." },
  direcao: { id: "direcao", nome: "Direção em construção", texto: "Você já pensa com estratégia. Uma conversa ajuda a refinar os pontos mais fracos e a medir o que importa." },
};

export function pontuar(respostas: number[]): { total: number; nivel: Nivel } {
  if (respostas.length !== PERGUNTAS.length) throw new Error("Respostas incompletas");
  let total = 0;
  respostas.forEach((idx, i) => {
    const opcao = PERGUNTAS[i].opcoes[idx];
    if (!opcao) throw new Error(`Opção inválida na pergunta ${i + 1}`);
    total += opcao.pontos;
  });
  const id = total <= 4 ? "achismo" : total <= 8 ? "caminho" : "direcao";
  return { total, nivel: NIVEIS[id] };
}
