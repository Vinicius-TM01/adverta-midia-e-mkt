type Caixa = { left: number; top: number; width: number; height: number };

const limita = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Contagem com saída suave (rápida no começo, assenta no fim). t em 0..1. */
export function valorContagem(t: number, alvo: number): number {
  const k = limita(t, 0, 1);
  return Math.round(alvo * (1 - Math.pow(1 - k, 3)));
}

/** Posição do ponteiro dentro de uma caixa, de -1 a 1 em cada eixo. */
export function ponteiroRelativo(x: number, y: number, r: Caixa): { x: number; y: number } {
  const nx = limita(((x - r.left) / r.width) * 2 - 1, -1, 1);
  const ny = limita(((y - r.top) / r.height) * 2 - 1, -1, 1);
  return { x: nx + 0 || 0, y: ny + 0 || 0 };
}

/** Quanto um elemento "puxa" em direção ao cursor quando ele chega perto. */
export function puxao(x: number, y: number, r: Caixa, alcance: number, maximo: number): { x: number; y: number } {
  const cx = r.left + r.width / 2;
  const cy = r.top + r.height / 2;
  const dx = x - cx;
  const dy = y - cy;
  const foraX = Math.max(0, Math.abs(dx) - r.width / 2);
  const foraY = Math.max(0, Math.abs(dy) - r.height / 2);
  if (Math.hypot(foraX, foraY) > alcance) return { x: 0, y: 0 };
  return { x: limita(dx / 8, -maximo, maximo), y: limita(dy / 8, -maximo, maximo) };
}
