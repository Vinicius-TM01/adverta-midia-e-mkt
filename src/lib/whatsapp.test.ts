import { buildWhatsAppUrl, MENSAGENS, WHATSAPP_NUMBER } from "./whatsapp";

describe("buildWhatsAppUrl", () => {
  it("usa o número da Ariela e codifica a mensagem", () => {
    const url = buildWhatsAppUrl("Oi, Ariela! Quer #1? Sim & não");
    expect(url.startsWith(`https://wa.me/${WHATSAPP_NUMBER}?text=`)).toBe(true);
    const text = new URL(url).searchParams.get("text");
    expect(text).toBe("Oi, Ariela! Quer #1? Sim & não");
    expect(url).not.toMatch(/[ #]/);
  });
  it("mantém acentos", () => {
    expect(new URL(buildWhatsAppUrl("Felícia")).searchParams.get("text")).toBe("Felícia");
  });
  it("mensagem do teste inclui pontuação e nível", () => {
    const m = MENSAGENS.teste(7, "Meio caminho");
    expect(m).toContain("7/12");
    expect(m).toContain("Meio caminho");
  });
});
