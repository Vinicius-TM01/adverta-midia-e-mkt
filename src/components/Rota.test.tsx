import { render } from "@testing-library/react";
import { Rota } from "./Rota";

describe("Rota", () => {
  it("é decorativa (aria-hidden) e monta sem erro mesmo sem getTotalLength", () => {
    const { container } = render(<Rota />);
    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
  it("desenha pelo scroll: dashoffset acompanha o progresso quando há suporte", () => {
    const original = (SVGElement.prototype as unknown as { getTotalLength?: () => number }).getTotalLength;
    (SVGElement.prototype as unknown as { getTotalLength: () => number }).getTotalLength = () => 1000;
    window.matchMedia = ((q: string) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false })) as typeof window.matchMedia;
    const { container } = render(<Rota />);
    const path = container.querySelector("path") as SVGPathElement;
    expect(path.style.strokeDasharray).toBe("1000");
    // sem scroll possível (jsdom: alturas 0) o traço aparece completo
    expect(path.style.strokeDashoffset).toBe("0");
    if (original) (SVGElement.prototype as unknown as { getTotalLength?: () => number }).getTotalLength = original;
    else delete (SVGElement.prototype as unknown as { getTotalLength?: () => number }).getTotalLength;
  });
});
