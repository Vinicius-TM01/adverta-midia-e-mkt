import { act, render, screen } from "@testing-library/react";
import { WhatsAppFlutuante } from "./WhatsAppFlutuante";

type Entrada = { target: Element; isIntersecting: boolean };
let callback: (es: Entrada[]) => void = () => {};

class IOFalso {
  constructor(cb: (es: Entrada[]) => void) { callback = cb; }
  observe() {}
  disconnect() {}
  unobserve() {}
}

function alvo(id: string) {
  const el = document.createElement("div");
  el.id = id;
  document.body.appendChild(el);
  return el;
}

describe("WhatsAppFlutuante", () => {
  beforeEach(() => {
    (globalThis as unknown as { IntersectionObserver: unknown }).IntersectionObserver = IOFalso;
    document.body.innerHTML = "";
  });

  it("começa escondido: o hero já tem o CTA principal", () => {
    alvo("inicio"); alvo("teste"); alvo("contato");
    render(<WhatsAppFlutuante />);
    expect(screen.queryByRole("link")).toBeNull();
  });

  it("aparece ao sair do hero, com o rótulo da seção, e some no fechamento", () => {
    const inicio = alvo("inicio"); const teste = alvo("teste"); const contato = alvo("contato");
    render(<WhatsAppFlutuante />);
    act(() => callback([{ target: inicio, isIntersecting: true }]));
    act(() => callback([{ target: inicio, isIntersecting: false }, { target: teste, isIntersecting: true }]));
    expect(screen.getByRole("link", { name: /falar sobre meu resultado/i })).toBeInTheDocument();
    act(() => callback([{ target: contato, isIntersecting: true }]));
    expect(screen.queryByRole("link")).toBeNull();
  });
});
