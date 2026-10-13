export const WHATSAPP_NUMBER = "556984488703";

export const MENSAGENS = {
  inicial: "Oi, Ariela! Quero agendar a conversa inicial sobre o planejamento.",
  teste: (score: number, nivel: string) =>
    `Oi, Ariela! Fiz o teste do achismo no site e fiquei com ${score}/12 (${nivel}). Quero conversar sobre o planejamento.`,
};

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
