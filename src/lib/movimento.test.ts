import { valorContagem, ponteiroRelativo, puxao } from "./movimento";

describe("movimento", () => {
  it("contagem começa em 0, termina no alvo e nunca passa dele", () => {
    expect(valorContagem(0, 200)).toBe(0);
    expect(valorContagem(1, 200)).toBe(200);
    expect(valorContagem(2, 200)).toBe(200);
    expect(valorContagem(0.5, 200)).toBeGreaterThan(100); // easeOut: mais rápido no começo
  });
  it("ponteiro relativo vai de -1 a 1 e é limitado", () => {
    const r = { left: 100, top: 100, width: 200, height: 100 };
    expect(ponteiroRelativo(200, 150, r)).toEqual({ x: 0, y: 0 });
    expect(ponteiroRelativo(300, 200, r)).toEqual({ x: 1, y: 1 });
    expect(ponteiroRelativo(900, -50, r)).toEqual({ x: 1, y: -1 });
  });
  it("puxão só atua perto do elemento e limita o deslocamento", () => {
    const r = { left: 100, top: 100, width: 100, height: 40 };
    expect(puxao(1000, 1000, r, 80, 6)).toEqual({ x: 0, y: 0 });
    const p = puxao(190, 120, r, 80, 6);
    expect(Math.abs(p.x)).toBeLessThanOrEqual(6);
    expect(p.x).toBeGreaterThan(0);
  });
});
