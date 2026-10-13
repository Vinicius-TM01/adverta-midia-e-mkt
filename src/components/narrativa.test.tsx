import { render, screen } from "@testing-library/react";
import { PILARES } from "@/content/pilares";
import { Pilares } from "./Pilares";
import { Virada } from "./Virada";
import { PorQueAntes } from "./PorQueAntes";

describe("seções narrativas", () => {
  it("PILARES tem 6 itens com título e descrição", () => {
    expect(PILARES).toHaveLength(6);
    PILARES.forEach((p) => { expect(p.titulo).not.toBe(""); expect(p.descricao).not.toBe(""); });
  });
  it("Pilares renderiza os 6 como texto estático e tem a âncora", () => {
    const { container } = render(<Pilares />);
    expect(container.querySelector("#planejamento")).not.toBeNull();
    PILARES.forEach((p) => expect(screen.getByText(p.titulo)).toBeInTheDocument());
  });
  it("Virada mantém a frase do PDF", () => {
    render(<Virada />);
    expect(screen.getByText(/constrói autoridade/i)).toBeInTheDocument();
    expect(screen.getByText(/autoridade é o que vende/i)).toBeInTheDocument();
  });
  it("PorQueAntes mostra Sem e Com", () => {
    render(<PorQueAntes />);
    expect(screen.getByText("Sem planejamento")).toBeInTheDocument();
    expect(screen.getByText("Com planejamento")).toBeInTheDocument();
  });
});
