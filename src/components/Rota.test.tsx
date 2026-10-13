import { render } from "@testing-library/react";
import { Rota } from "./Rota";

type Proto = { getTotalLength?: () => number };

function proximoFrame() {
  return new Promise<void>((r) => requestAnimationFrame(() => r()));
}

describe("Rota", () => {
  const original = (SVGElement.prototype as unknown as Proto).getTotalLength;
  beforeEach(() => {
    window.matchMedia = ((q: string) => ({ matches: false, media: q, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, onchange: null, dispatchEvent: () => false })) as typeof window.matchMedia;
  });
  afterEach(() => {
    if (original) (SVGElement.prototype as unknown as Proto).getTotalLength = original;
    else delete (SVGElement.prototype as unknown as Proto).getTotalLength;
  });

  it("é decorativa (aria-hidden) e monta sem erro mesmo sem getTotalLength", () => {
    const { container } = render(<Rota />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
  });

  it("desenha pelo scroll: sem scroll possível (jsdom) o traço aparece completo", async () => {
    (SVGElement.prototype as unknown as Proto).getTotalLength = () => 1000;
    const { container } = render(<Rota />);
    const path = container.querySelector("path") as SVGPathElement;
    expect(path.style.strokeDasharray).toBe("1000");
    await proximoFrame();
    expect(path.style.strokeDashoffset).toBe("0");
  });

  it("não lê o layout de forma síncrona na montagem (evita reflow forçado)", async () => {
    (SVGElement.prototype as unknown as Proto).getTotalLength = () => 1000;
    let leituras = 0;
    const alturaOriginal = Object.getOwnPropertyDescriptor(Element.prototype, "scrollHeight")!;
    Object.defineProperty(document.documentElement, "scrollHeight", { configurable: true, get() { leituras++; return 0; } });
    try {
      render(<Rota />);
      expect(leituras).toBe(0);
      await proximoFrame();
      expect(leituras).toBeGreaterThan(0);
    } finally {
      delete (document.documentElement as unknown as Record<string, unknown>).scrollHeight;
      Object.defineProperty(Element.prototype, "scrollHeight", alturaOriginal);
    }
  });
});
