import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Teste } from "./Teste";

async function responderTudo(indice: number) {
  const user = userEvent.setup();
  for (let i = 0; i < 6; i++) {
    const opcoes = screen.getAllByRole("radio");
    await user.click(opcoes[indice]);
    await user.click(screen.getByRole("button", { name: i === 5 ? /ver resultado/i : /próxima/i }));
  }
}

describe("Teste do achismo", () => {
  it("começa na pergunta 1 de 6 e exige uma resposta", async () => {
    render(<Teste />);
    expect(screen.getByText(/pergunta 1 de 6/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /próxima/i })).toBeDisabled();
  });
  it("tudo na primeira opção → Achismo puro, 0/12, link de WhatsApp com a pontuação", async () => {
    render(<Teste />);
    await responderTudo(0);
    expect(screen.getByText("Achismo puro")).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /conversar com a ariela/i });
    expect(decodeURIComponent(link.getAttribute("href")!)).toContain("0/12");
  });
  it("tudo na última opção → Direção em construção, 12/12", async () => {
    render(<Teste />);
    await responderTudo(2);
    expect(screen.getByText("Direção em construção")).toBeInTheDocument();
    expect(screen.getByText(/12\s*\/\s*12/)).toBeInTheDocument();
  });
  it("permite refazer", async () => {
    render(<Teste />);
    await responderTudo(1);
    await userEvent.setup().click(screen.getByRole("button", { name: /refazer/i }));
    expect(screen.getByText(/pergunta 1 de 6/i)).toBeInTheDocument();
  });
});
