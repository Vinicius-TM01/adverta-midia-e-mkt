import { render } from "@testing-library/react";
import { Movimento } from "./Movimento";

function pagina() {
  document.body.innerHTML = `<h2 data-revela="sobe" id="a">Oi</h2><p data-revela="sobe" id="b"><span data-conta="200" id="n">200</span></p>`;
}

describe("Movimento", () => {
  afterEach(() => { vi.unstubAllGlobals(); document.body.innerHTML = ""; });

  it("com movimento reduzido revela tudo na hora e não mexe nos números", () => {
    vi.stubGlobal("matchMedia", (q: string) => ({ matches: q.includes("reduce"), addEventListener() {}, removeEventListener() {} }));
    pagina();
    render(<Movimento />);
    expect(document.getElementById("a")!.classList.contains("visto")).toBe(true);
    expect(document.getElementById("b")!.classList.contains("visto")).toBe(true);
    expect(document.getElementById("n")!.textContent).toBe("200");
  });

  it("sem IntersectionObserver (navegador antigo) também revela tudo", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
    vi.stubGlobal("IntersectionObserver", undefined);
    pagina();
    render(<Movimento />);
    expect(document.getElementById("a")!.classList.contains("visto")).toBe(true);
  });

  it("com observer, revela só o que entra na tela e então conta até o alvo", () => {
    vi.stubGlobal("matchMedia", () => ({ matches: false, addEventListener() {}, removeEventListener() {} }));
    let cb: IntersectionObserverCallback = () => {};
    vi.stubGlobal("IntersectionObserver", class {
      constructor(c: IntersectionObserverCallback) { cb = c; }
      observe() {} unobserve() {} disconnect() {}
    });
    pagina();
    render(<Movimento />);
    expect(document.getElementById("a")!.classList.contains("visto")).toBe(false);
    expect(document.getElementById("n")!.textContent).toBe("0");
    cb([{ isIntersecting: true, target: document.getElementById("b")! } as unknown as IntersectionObserverEntry], {} as IntersectionObserver);
    expect(document.getElementById("b")!.classList.contains("visto")).toBe(true);
    expect(document.getElementById("a")!.classList.contains("visto")).toBe(false);
  });
});
