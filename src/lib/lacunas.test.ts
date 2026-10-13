import { DECISOES, resumoLacunas, mensagemLacunas } from "./lacunas";

describe("lacunas do planejamento", () => {
  it("são as quatro decisões que o PDF diz que faltam antes de postar", () => {
    expect(DECISOES.map((d) => d.id)).toEqual(["comunicar", "publico", "posicionamento", "objetivo"]);
  });
  it("resumo muda conforme quantas estão em aberto", () => {
    expect(resumoLacunas([])).toMatch(/marque/i);
    expect(resumoLacunas(["publico"])).toMatch(/1 de 4/);
    expect(resumoLacunas(["publico", "objetivo", "comunicar"])).toMatch(/3 de 4/);
    expect(resumoLacunas(DECISOES.map((d) => d.id))).toMatch(/as quatro/i);
  });
  it("mensagem lista só o que foi marcado, na ordem das decisões", () => {
    const m = mensagemLacunas(["objetivo", "publico"]);
    expect(m).toContain("para quem");
    expect(m).toContain("com qual objetivo");
    expect(m.indexOf("para quem")).toBeLessThan(m.indexOf("com qual objetivo"));
    expect(m).not.toContain("posicionamento");
  });
  it("ignora ids desconhecidos", () => {
    expect(mensagemLacunas(["x"])).toBe(mensagemLacunas([]));
  });
});
