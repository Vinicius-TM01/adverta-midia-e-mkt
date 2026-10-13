export const DECISOES = [
  { id: "comunicar", rotulo: "O que comunicar", frase: "o que comunicar" },
  { id: "publico", rotulo: "Para quem", frase: "para quem" },
  { id: "posicionamento", rotulo: "Com qual posicionamento", frase: "com qual posicionamento" },
  { id: "objetivo", rotulo: "Com qual objetivo", frase: "com qual objetivo" },
] as const;

export function resumoLacunas(ids: string[]): string {
  const n = DECISOES.filter((d) => ids.includes(d.id)).length;
  if (n === 0) return "Marque o que ainda não está definido no seu negócio.";
  if (n === DECISOES.length) return "As quatro. É exatamente por aqui que o planejamento começa.";
  return `${n} de 4 ainda no escuro. O mapa resolve isso antes do primeiro post.`;
}

export function mensagemLacunas(ids: string[]): string {
  const frases = DECISOES.filter((d) => ids.includes(d.id)).map((d) => d.frase);
  if (frases.length === 0) return "Oi, Ariela! Quero agendar a conversa inicial sobre o planejamento.";
  const lista = frases.length === 1 ? frases[0] : `${frases.slice(0, -1).join(", ")} e ${frases[frases.length - 1]}`;
  return `Oi, Ariela! Vi no site que meu negócio ainda não definiu ${lista}. Quero conversar sobre o planejamento.`;
}
