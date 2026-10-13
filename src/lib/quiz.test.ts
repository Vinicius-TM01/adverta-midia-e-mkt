import { PERGUNTAS, pontuar } from "./quiz";

describe("quiz", () => {
  it("tem uma pergunta por pilar, com 3 opções 0/1/2", () => {
    expect(PERGUNTAS).toHaveLength(6);
    for (const p of PERGUNTAS) expect(p.opcoes.map(o => o.pontos)).toEqual([0, 1, 2]);
  });
  it("tudo 0 cai em achismo, total 0", () => {
    const r = pontuar([0, 0, 0, 0, 0, 0]);
    expect(r.total).toBe(0); expect(r.nivel.id).toBe("achismo");
  });
  it("tudo 2 cai em direcao, total 12", () => {
    const r = pontuar([2, 2, 2, 2, 2, 2]);
    expect(r.total).toBe(12); expect(r.nivel.id).toBe("direcao");
  });
  it("limites: 4 achismo, 5 caminho, 8 caminho, 9 direcao", () => {
    expect(pontuar([2, 2, 0, 0, 0, 0]).nivel.id).toBe("achismo");
    expect(pontuar([2, 2, 1, 0, 0, 0]).nivel.id).toBe("caminho");
    expect(pontuar([2, 2, 2, 2, 0, 0]).nivel.id).toBe("caminho");
    expect(pontuar([2, 2, 2, 2, 1, 0]).nivel.id).toBe("direcao");
  });
  it("rejeita respostas incompletas ou inválidas", () => {
    expect(() => pontuar([0, 0])).toThrow();
    expect(() => pontuar([0, 0, 0, 0, 0, 3])).toThrow();
  });
});
